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
