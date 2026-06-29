import { site } from "@/data/site";

// Email notifications for new website leads (contact form + consultation quiz).
// Sends via Resend's REST API directly with fetch, no SDK dependency.
//
// Fully gated on env: with no RESEND_API_KEY set this is a no-op, so the
// feature stays dormant until configured. It also swallows its own errors and
// never throws, so a mail problem can never break a customer's submission
// (the lead is already saved to the dashboard before this runs).
//
// To enable, set on the host (Vercel), and optionally .env.local for testing:
//   RESEND_API_KEY    re_...               (required to switch it on)
//   LEAD_NOTIFY_TO    info@tryswitchbooks.co.uk     (optional; defaults below)
//   LEAD_NOTIFY_FROM  "Switch Books <enquiries@tryswitchbooks.co.uk>"
//                                            (optional; must be a Resend-
//                                             verified domain sender)
//
// The email is a branded, form-style layout: a header with the team name, then
// grouped sections of label/value rows (each answer stacked under its label so
// it stays readable no matter how long or short it is), then any free-text
// message. Built with inline styles + tables for email-client compatibility.

type Field = { label: string; value?: string | null };
type Section = { title: string; fields: Field[] };

type LeadEmail = {
  subject: string;
  /** Recipient. Defaults to the owner's LEAD_NOTIFY_TO inbox. */
  to?: string;
  /** Small label above the title. Defaults to "New enquiry". */
  eyebrow?: string;
  /** Main heading shown inside the email. Defaults to the subject. */
  title?: string;
  /** Flat fields, rendered as one block. Use this OR sections. */
  fields?: Field[];
  /** Grouped fields, each group with a heading. */
  sections?: Section[];
  /** Free-text block (e.g. the enquiry message), shown after the fields. */
  message?: string;
  /** Label above the free-text block. */
  messageLabel?: string;
  /** Reply-To so the team can reply straight to the enquirer. */
  replyTo?: string;
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Brand palette (email clients ignore <style>/classes, so colours are inlined).
const C = {
  ink: "#14213D",
  cream: "#FAF8F3",
  cream2: "#F3EFE6",
  sand: "#E6DECF",
  rowLine: "#EDE7DA",
  muted: "#5A6478",
  accent: "#C9A24B",
  gold: "#C9A24B",
};

const SERIF = "Georgia,'Times New Roman',serif";
const SANS = "-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

function hasValue(f: Field): boolean {
  return f.value != null && String(f.value).trim() !== "";
}

function fieldRowHtml(f: Field): string {
  return (
    `<div style="padding:10px 0;border-bottom:1px solid ${C.rowLine}">` +
    `<div style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:${C.muted}">${escapeHtml(f.label)}</div>` +
    `<div style="font-size:15px;color:${C.ink};margin-top:3px;line-height:1.5;word-break:break-word">${escapeHtml(String(f.value))}</div>` +
    `</div>`
  );
}

function sectionsFrom(email: LeadEmail): Section[] {
  return email.sections ?? [{ title: "", fields: email.fields ?? [] }];
}

function bodyHtml(email: LeadEmail): string {
  return sectionsFrom(email)
    .map((s) => {
      const filled = s.fields.filter(hasValue);
      if (!filled.length) return "";
      const heading = s.title
        ? `<div style="font-family:${SERIF};font-size:13px;text-transform:uppercase;letter-spacing:2px;color:${C.accent};margin:22px 0 2px">${escapeHtml(s.title)}</div>`
        : "";
      return heading + filled.map(fieldRowHtml).join("");
    })
    .join("");
}

function messageHtml(email: LeadEmail): string {
  if (!email.message || !email.message.trim()) return "";
  return (
    `<div style="margin-top:22px">` +
    `<div style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:${C.muted};margin-bottom:6px">${escapeHtml(email.messageLabel ?? "Their message")}</div>` +
    `<div style="background:${C.cream2};border-left:3px solid ${C.accent};border-radius:6px;padding:14px 16px;font-size:15px;color:${C.ink};line-height:1.6;white-space:pre-wrap;word-break:break-word">${escapeHtml(email.message)}</div>` +
    `</div>`
  );
}

function buildHtml(email: LeadEmail): string {
  const title = email.title ?? email.subject;
  return (
    `<!doctype html><html><body style="margin:0;padding:0;background:${C.cream2}">` +
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.cream2};padding:24px 12px">` +
    `<tr><td align="center">` +
    `<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:${C.cream};border:1px solid ${C.sand};border-radius:16px;overflow:hidden;font-family:${SANS}">` +
    // Header
    `<tr><td style="background:${C.ink};padding:26px 32px;text-align:center">` +
    `<div style="font-family:${SERIF};font-size:24px;letter-spacing:1px;color:${C.cream}">${escapeHtml(site.name)}</div>` +
    `<div style="font-size:10px;letter-spacing:3px;text-transform:uppercase;color:${C.gold};margin-top:6px">${escapeHtml(site.location.short)}</div>` +
    `</td></tr>` +
    // Title
    `<tr><td style="padding:24px 32px 0">` +
    `<div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${C.accent}">${escapeHtml(email.eyebrow ?? "New enquiry")}</div>` +
    `<div style="font-family:${SERIF};font-size:22px;color:${C.ink};margin-top:4px;line-height:1.3">${escapeHtml(title)}</div>` +
    `</td></tr>` +
    // Body
    `<tr><td style="padding:6px 32px 10px">${bodyHtml(email)}${messageHtml(email)}</td></tr>` +
    // Footer
    `<tr><td style="padding:20px 32px;background:${C.cream2};border-top:1px solid ${C.sand};font-size:11px;line-height:1.6;color:${C.muted};text-align:center">` +
    `Sent from the ${escapeHtml(site.name)} website` +
    (email.replyTo ? `. Reply to this email to contact ${escapeHtml(email.replyTo)}` : "") +
    `.</td></tr>` +
    `</table></td></tr></table></body></html>`
  );
}

function buildText(email: LeadEmail): string {
  const lines: string[] = [email.title ?? email.subject];
  for (const s of sectionsFrom(email)) {
    const filled = s.fields.filter(hasValue);
    if (!filled.length) continue;
    if (s.title) lines.push("", s.title.toUpperCase());
    for (const f of filled) lines.push(`${f.label}: ${f.value}`);
  }
  if (email.message && email.message.trim()) {
    lines.push("", `${email.messageLabel ?? "Their message"}:`, email.message);
  }
  return lines.join("\n").trim();
}

export async function sendLeadEmail(email: LeadEmail): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return; // not configured, quietly skip

  const domain = site.contact.emailDisplay.split("@")[1] ?? "tryswitchbooks.co.uk";
  const to = email.to || process.env.LEAD_NOTIFY_TO || site.contact.emailDisplay;
  const from = process.env.LEAD_NOTIFY_FROM || `Switch Books <leads@${domain}>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: email.subject,
        text: buildText(email),
        html: buildHtml(email),
        ...(email.replyTo ? { reply_to: email.replyTo } : {}),
      }),
    });
    if (!res.ok) {
      console.error("[sendLeadEmail] Resend responded", res.status, await res.text());
    }
  } catch (err) {
    console.error("[sendLeadEmail] threw", err);
  }
}
