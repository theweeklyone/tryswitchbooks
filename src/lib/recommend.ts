import { getService, services } from "@/data/services";
import type {
  ConsultationRecommendation,
  ConsultationSubmission,
} from "@/lib/types/consultation";

// Maps a finished Business Review into a recommendation: the most relevant
// Switch Books service to lead with, a secondary, and a "what good looks like"
// summary tailored to the frustrations they told us about.

const NEED_TO_SLUG: Record<string, string> = {
  bookkeeping: "bookkeeping",
  "year-end-accounts": "year-end-accounts",
  "tax-and-vat": "tax-and-vat",
  payroll: "payroll",
  advisory: "advisory",
};

// When someone says "I'm not sure", infer a sensible starting point.
function inferPrimary(sub: ConsultationSubmission): string {
  if (sub.frustrations.includes("no-advice") || sub.satisfaction === "leaving") return "advisory";
  if (sub.businessType === "limited") return "year-end-accounts";
  return "bookkeeping";
}

const FRUSTRATION_FIX: Record<string, string> = {
  communication: "A named adviser who replies, usually same day.",
  reactive: "Regular, proactive contact through the year, not just at deadlines.",
  "surprise-bills": "Fees agreed up front, so the bill is never a shock.",
  "no-advice": "Real advice on tax, cash flow and growth, not just compliance.",
  errors: "Accurate work, filed early, double-checked.",
  "too-expensive": "Clear value for what you pay, scoped to what you need.",
  ignored: "Support that treats your business as important, because to us it is.",
  outgrown: "Capacity and expertise to grow with you.",
};

export function recommend(sub: ConsultationSubmission): ConsultationRecommendation {
  const wanted = sub.servicesWanted.filter((s) => s !== "unsure");
  const primaryNeed = sub.primaryNeed && sub.primaryNeed !== "unsure"
    ? sub.primaryNeed
    : wanted[0] ?? inferPrimary(sub);

  // Personal tax has no standalone service page — present it as its own named
  // recommendation, linked to the closest page (Tax & VAT).
  const isPersonalTax = primaryNeed === "personal-tax";

  const primarySlug = isPersonalTax ? "tax-and-vat" : NEED_TO_SLUG[primaryNeed] ?? "advisory";
  const baseService = getService(primarySlug) ?? services[0];
  const primaryService = isPersonalTax
    ? {
        slug: "tax-and-vat",
        name: "Personal Tax & Self-Assessment",
        short:
          "Self-assessment and personal tax handled and planned ahead, so it's accurate, on time and as efficient as the rules allow.",
      }
    : baseService;

  const secondaryNeed = wanted.find((s) => s !== primaryNeed);
  const secondarySlug = secondaryNeed ? NEED_TO_SLUG[secondaryNeed] : undefined;
  const secondaryService = secondarySlug ? getService(secondarySlug) : undefined;

  // Build "what good looks like" from their frustrations, then top up with
  // strong defaults so there are always at least four points.
  const fromFrustrations = sub.frustrations
    .map((f) => FRUSTRATION_FIX[f])
    .filter(Boolean) as string[];
  const defaults = [
    "Books and deadlines handled, so you stop carrying them.",
    "Your numbers explained in plain English.",
    "A fully managed switch: the firm handles the handover end to end.",
  ];
  const whatGoodLooksLike = Array.from(new Set([...fromFrustrations, ...defaults])).slice(0, 5);

  const leaving = sub.satisfaction === "leaving" || sub.satisfaction === "frustrated";
  const summary = leaving
    ? `From what you've told us, ${sub.businessName || "your business"} deserves more than it's getting. We'll prioritise matching you with a local firm that's strong on ${primaryService.name.toLowerCase()} and proactive all year round.`
    : `Based on your answers, we'll match you with a local firm that's a great fit for ${sub.businessName || "your business"}, starting with ${primaryService.name.toLowerCase()}, with room to grow into fuller support as you need it.`;

  return {
    primary: {
      serviceSlug: primaryService.slug,
      serviceName: primaryService.name,
      why: primaryService.short,
    },
    secondary: secondaryService
      ? {
          serviceSlug: secondaryService.slug,
          serviceName: secondaryService.name,
          reason: secondaryService.short,
        }
      : undefined,
    whatGoodLooksLike,
    callStatus: sub.timeline === "exploring" ? "recommended" : "required",
    summary,
  };
}
