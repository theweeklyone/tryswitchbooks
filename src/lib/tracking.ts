// Central tracking utility.
//
// All conversion events flow through `trackEvent()`. PII (email, phone, full
// names) is stripped before any payload leaves the function.
//
// FUTURE:
//   - persist events to a Supabase `events` table with a session_id
//   - forward lead_submitted with attribution into the dashboard lead record
//
// The site must NEVER depend on tracking working. Every call is wrapped in
// a try/catch and silently absorbs failures.

import type {
  Attribution,
  ConsultationEvent,
  ConversionEvent,
  TrackingEvent,
} from "./types/tracking";
import { getStoredAttribution } from "./attribution";

const PII_KEYS = new Set([
  "email",
  "phone",
  "mobile",
  "phoneNumber",
  "firstName",
  "lastName",
  "fullName",
  "name",
  "address",
  "postcode",
]);

function redactPii(input: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(input)) {
    if (PII_KEYS.has(key)) continue;
    if (value === undefined || value === null) continue;
    out[key] = value;
  }
  return out;
}

function currentPath(): string | undefined {
  if (typeof window === "undefined") return undefined;
  return window.location.pathname;
}

function isDev() {
  return typeof process !== "undefined" && process.env.NODE_ENV !== "production";
}

// ── Public API ───────────────────────────────────────────────────────────

export function trackEvent(
  name: string,
  data: Record<string, unknown> = {},
): void {
  try {
    const safeData = redactPii(data);
    const attribution: Attribution | undefined =
      getStoredAttribution() ?? undefined;
    const event: TrackingEvent = {
      name,
      data: safeData,
      timestamp: new Date().toISOString(),
      attribution,
      pagePath: currentPath(),
    };

    // Forward to GA4. `window.gtag` only exists once the visitor has accepted
    // the cookie notice (see components/GoogleAnalytics.tsx), so this is a
    // no-op until consent is given.
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", name, { ...safeData, ...(attribution ?? {}) });
    }

    if (typeof window !== "undefined" && isDev()) {
      // eslint-disable-next-line no-console
      console.info(`[track] ${name}`, event);
    }
  } catch {
    // Tracking must never throw.
  }
}

// ── Typed wrappers per event family ──────────────────────────────────────

export function trackConsultationStarted(payload: ConsultationEvent = {}) {
  trackEvent("review_started", payload);
}

export function trackConsultationStepCompleted(payload: ConsultationEvent) {
  trackEvent("review_step_completed", payload);
}

export function trackConsultationCompleted(payload: ConsultationEvent) {
  trackEvent("review_completed", payload);
}

export function trackConsultationAbandoned(payload: ConsultationEvent) {
  trackEvent("review_abandoned", payload);
}

export function trackLeadSubmitted(payload: ConversionEvent) {
  trackEvent("lead_submitted", payload);
}

export function trackConversion(payload: ConversionEvent) {
  trackEvent(`conversion_${payload.conversionType.replace(/-/g, "_")}`, payload);
}

// ── Google Ads conversion ────────────────────────────────────────────────
//
// Separate from GA4 so Google Ads gets a clean, direct conversion signal for
// bidding. No-op unless BOTH env vars are set (and gtag has loaded after cookie
// consent), so it stays dormant until an ad account exists:
//   NEXT_PUBLIC_GOOGLE_ADS_ID         e.g. AW-1234567890
//   NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL the conversion action's label
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const GOOGLE_ADS_LEAD_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL;

// Rough monthly-fee midpoint per budget band. Used as the conversion `value`
// so Google can bid toward higher-value leads. Relative ordering matters more
// than precision. Unknown/"guidance" falls back to a sensible default.
const BUDGET_MONTHLY_GBP: Record<string, number> = {
  "under-100": 75,
  "100-250": 175,
  "250-500": 375,
  "500-1000": 750,
  "1000-2000": 1500,
  "2000-plus": 2500,
};

/** Annualised estimate of the client's spend, as a lead-quality proxy (GBP). */
export function estimateLeadValueGBP(budget?: string): number {
  const monthly = (budget && BUDGET_MONTHLY_GBP[budget]) || 150;
  return monthly * 12;
}

/** Fire a Google Ads conversion. No-op until the Ads env vars are configured. */
export function trackAdsConversion(value?: number, currency = "GBP"): void {
  try {
    if (!GOOGLE_ADS_ID || !GOOGLE_ADS_LEAD_LABEL) return;
    if (typeof window === "undefined" || typeof window.gtag !== "function") return;
    window.gtag("event", "conversion", {
      send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_LEAD_LABEL}`,
      ...(value ? { value, currency } : {}),
    });
  } catch {
    // Tracking must never throw.
  }
}
