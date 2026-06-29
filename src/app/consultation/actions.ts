"use server";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { sendLeadEmail } from "@/lib/notify";
import { site } from "@/data/site";
import type {
  ConsultationRecommendation,
  ConsultationSubmission,
} from "@/lib/types/consultation";

export type SubmitConsultationResult =
  | { ok: true; leadId: string }
  | { ok: false; error: string };

// Human-readable labels for the option values, used in the email + dashboard.
const LABELS: Record<string, string> = {
  // current spend / budget
  "under-100": "Under £100/mo",
  "100-250": "£100–£250/mo",
  "250-500": "£250–£500/mo",
  "500-plus": "£500+/mo",
  "500-1000": "£500–£1,000/mo",
  "1000-2000": "£1,000–£2,000/mo",
  "2000-plus": "£2,000+/mo",
  annual: "One-off annual fee",
  unknown: "Not sure / none",
  guidance: "Wants guidance",
  // turnover
  "under-90k": "Under £90k",
  "90k-250k": "£90k–£250k",
  "250k-500k": "£250k–£500k",
  "500k-1m": "£500k–£1m",
  "1m-5m": "£1m–£5m",
  "5m-plus": "£5m+",
  "15m-plus": "£15m+ (above audit threshold)",
  private: "Prefer not to say",
  // services / needs
  bookkeeping: "Bookkeeping",
  "year-end-accounts": "Year-end accounts",
  "tax-and-vat": "Business tax & VAT",
  "personal-tax": "Personal tax & self-assessment",
  payroll: "Payroll & pensions",
  advisory: "Advisory & planning",
  // situation / satisfaction / timeline
  accountant: "Has an accountant",
  diy: "DIY",
  "in-house": "In-house",
  none: "No one",
  "happy-exploring": "Happy but exploring",
  frustrated: "Frustrated",
  leaving: "Actively leaving",
  unsure: "Unsure",
  asap: "ASAP",
  "1-3-months": "1–3 months",
  "year-end": "At year-end",
  exploring: "Just exploring",
  limited: "Limited company",
  "sole-trader": "Sole trader",
  partnership: "Partnership / LLP",
  "not-trading": "Not trading yet",
  // frustrations
  communication: "Poor communication",
  reactive: "Reactive only",
  "surprise-bills": "Surprise bills",
  "no-advice": "No proactive advice",
  errors: "Errors / late filings",
  "too-expensive": "Too expensive",
  ignored: "Feels ignored",
  outgrown: "Outgrown them",
};

const label = (v: string) => LABELS[v] ?? v;
const labels = (vals: string[]) => vals.map(label).join(", ");

// Simple lead scoring for accounting: budget + turnover + intent to switch.
function scoreLead(sub: ConsultationSubmission): {
  estimatedLeadValue: number;
  priority: "hot" | "warm" | "cool";
} {
  const budgetMonthly: Record<string, number> = {
    "under-100": 75,
    "100-250": 175,
    "250-500": 375,
    "500-1000": 750,
    "1000-2000": 1500,
    "2000-plus": 2500,
    guidance: 200,
  };
  const monthly = budgetMonthly[sub.budget] ?? 150;
  const estimatedLeadValue = monthly * 12; // indicative annual value

  let intent = 0;
  if (sub.satisfaction === "leaving") intent += 2;
  if (sub.satisfaction === "frustrated") intent += 1;
  if (sub.timeline === "asap") intent += 2;
  if (sub.timeline === "1-3-months" || sub.timeline === "year-end") intent += 1;
  if (sub.frustrations.some((f) => f !== "none")) intent += 1;

  const priority: "hot" | "warm" | "cool" =
    intent >= 3 && monthly >= 175 ? "hot" : intent >= 2 ? "warm" : "cool";

  return { estimatedLeadValue, priority };
}

export async function submitConsultation(input: {
  submission: ConsultationSubmission;
  recommendation: ConsultationRecommendation;
}): Promise<SubmitConsultationResult> {
  const { submission, recommendation } = input;
  const { estimatedLeadValue, priority } = scoreLead(submission);

  // When they told us a one-off annual fee, fold the actual £ value into the
  // spend so it's captured in the dashboard and the alert email.
  const currentSpendDisplay =
    submission.currentSpend === "annual" && submission.annualFeeValue
      ? `One-off annual fee (~${submission.annualFeeValue})`
      : label(submission.currentSpend);

  // Best-effort persistence. Never blocks the user or the email; logs and
  // continues if Supabase isn't configured yet.
  let leadId = submission.submissionId;
  try {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from("leads")
      .insert({
        first_name: submission.firstName,
        business_name: submission.businessName,
        email: submission.email,
        mobile: submission.phone,
        business_type: submission.businessType,
        current_situation: submission.currentSituation,
        satisfaction: submission.satisfaction,
        // current_spend stores the band, or the annual fee with its value.
        frustrations: submission.frustrations,
        current_provider: submission.currentProvider || null,
        current_spend: currentSpendDisplay,
        services_wanted: submission.servicesWanted,
        primary_need: submission.primaryNeed,
        turnover: submission.turnover,
        budget_range: submission.budget,
        timeline: submission.timeline,
        extra_notes: submission.notes || null,
        recommended_service: recommendation.primary.serviceName,
        recommended_service_slug: recommendation.primary.serviceSlug,
        secondary_recommendation: recommendation.secondary?.serviceName ?? null,
        source: submission.source,
        status: "new",
        estimated_lead_value: estimatedLeadValue,
        priority,
      })
      .select("id")
      .single();
    if (error) {
      console.warn("[submitConsultation] Supabase insert skipped/failed:", error.message);
    } else if (data?.id) {
      leadId = String(data.id);
    }
  } catch (err) {
    console.warn("[submitConsultation] Supabase not available:", err instanceof Error ? err.message : err);
  }

  // Email the owner the full picture (no-op until RESEND_API_KEY is set; never
  // throws). This is the primary delivery channel.
  try {
    await sendLeadEmail({
      subject: `New lead: ${submission.businessName || submission.firstName} (${label(priority)} priority)`,
      title: `${submission.firstName} · ${submission.businessName}`,
      sections: [
        {
          title: "Contact",
          fields: [
            { label: "Name", value: submission.firstName },
            { label: "Business", value: submission.businessName },
            { label: "Email", value: submission.email },
            { label: "Phone", value: submission.phone },
            { label: "Setup", value: label(submission.businessType) },
          ],
        },
        {
          title: "Their current situation",
          fields: [
            { label: "Accounts handled by", value: label(submission.currentSituation) },
            { label: "How they feel", value: submission.satisfaction ? label(submission.satisfaction) : undefined },
            { label: "Current provider", value: submission.currentProvider || undefined },
            { label: "Currently paying", value: currentSpendDisplay },
            { label: "Frustrations", value: submission.frustrations.length ? labels(submission.frustrations) : undefined },
          ],
        },
        {
          title: "What they want",
          fields: [
            { label: "Help wanted", value: labels(submission.servicesWanted) },
            { label: "Turnover", value: label(submission.turnover) },
            { label: "Budget", value: label(submission.budget) },
            { label: "Timeline", value: label(submission.timeline) },
          ],
        },
        {
          title: "At a glance",
          fields: [
            { label: "Priority", value: label(priority) },
            { label: "Indicative annual value", value: `£${estimatedLeadValue.toLocaleString()}` },
            { label: "Match on (primary need)", value: recommendation.primary.serviceName },
          ],
        },
      ],
      message: submission.notes,
      messageLabel: "Anything else they told us",
      replyTo: submission.email,
    });
  } catch (err) {
    console.error("[submitConsultation] Owner email failed:", err);
  }

  // Branded confirmation to the business owner who took the review, so the
  // "we've emailed a copy to you" promise on the result page holds true.
  try {
    await sendLeadEmail({
      to: submission.email,
      eyebrow: "Your business review",
      subject: `Thanks ${submission.firstName}, we're finding your match`,
      title: "We've got your review",
      sections: [
        {
          title: "Where we'd start",
          fields: [
            { label: "Suggested starting point", value: recommendation.primary.serviceName },
            { label: "Your budget", value: label(submission.budget) },
          ],
        },
      ],
      message:
        "Thanks for taking the review. We're now finding the right local accounting firm for you, and someone will be in touch shortly to confirm a couple of details and make the introduction. There's no pressure and no obligation. This is about matching you with support that fits.",
      messageLabel: "What happens next",
      replyTo: site.contact.emailDisplay,
    });
  } catch (err) {
    console.error("[submitConsultation] Client confirmation email failed:", err);
  }

  return { ok: true, leadId };
}
