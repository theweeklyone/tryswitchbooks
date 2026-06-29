// Tracking + attribution types.
// FUTURE: when GA4 / Supabase event storage land, the same payload shapes are
// forwarded; only the transport changes.

export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
  fbclid?: string;
  /** First-touch landing page when attribution was first captured. */
  firstLandingPath?: string;
  capturedAt?: string; // ISO
};

export type TrackingEvent = {
  name: string;
  data: Record<string, unknown>;
  timestamp: string; // ISO
  attribution?: Attribution;
  pagePath?: string;
};

// ── Specific event payload shapes ────────────────────────────────────────

export type ConversionEvent = {
  conversionType:
    | "lead-submitted"
    | "callback-requested"
    | "contact-form-submitted";
  serviceInterest?: string;
  recommendedService?: string;
  budgetRange?: string;
  sourcePage?: string;
};

export type ConsultationEvent = {
  stepName?: string;
  stepNumber?: number;
  selectedAnswer?: string;
  recommendedService?: string;
  consultationRequired?: boolean;
  estimatedPriceRange?: string | null;
  sourcePage?: string;
};
