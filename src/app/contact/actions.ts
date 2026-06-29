"use server";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { sendLeadEmail } from "@/lib/notify";

export type SubmitContactResult =
  | { ok: true; messageId: string }
  | { ok: false; error: string };

export async function submitContactMessage(formData: FormData): Promise<SubmitContactResult> {
  const name = String(formData.get("name") ?? "").trim();
  const businessName = String(formData.get("businessName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const service = String(formData.get("service") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { ok: false, error: "Please fill in your name, email and message." };
  }
  if (!/.+@.+\..+/.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  const messageId = `msg_${Date.now().toString(36)}`;

  // Best-effort persistence — never blocks the message or the email.
  try {
    const supabase = createSupabaseAdminClient();
    await supabase.from("contact_messages").insert({
      name,
      business_name: businessName || null,
      email,
      phone: phone || null,
      service: service || null,
      message,
    });
  } catch (err) {
    console.warn("[submitContactMessage] Supabase not available:", err instanceof Error ? err.message : err);
  }

  // Notify the owner (no-op until RESEND_API_KEY is configured; never throws).
  try {
    await sendLeadEmail({
      subject: `New website enquiry: ${businessName || name}`,
      title: `${name}${businessName ? ` · ${businessName}` : ""} (contact form)`,
      sections: [
        {
          title: "Contact",
          fields: [
            { label: "Name", value: name },
            { label: "Business", value: businessName },
            { label: "Email", value: email },
            { label: "Phone", value: phone },
            { label: "Area of interest", value: service },
          ],
        },
      ],
      message,
      messageLabel: "Their message",
      replyTo: email,
    });
  } catch (err) {
    console.error("[submitContactMessage] email failed", err);
  }

  return { ok: true, messageId };
}
