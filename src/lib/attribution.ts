// UTM + click-id attribution helpers.
// SSR-safe: every function guards on `typeof window === "undefined"` so it
// can be imported from server components without breaking prerendering.
// Captures attribution on first visit and persists to localStorage so it can
// be attached to any lead created later in the same browser.
//
// FUTURE:
//  - persist to Supabase against the visitor's session id, so attribution
//    survives across devices once a client signs in
//  - dedupe identical campaigns and keep first-touch + last-touch separately
//  - clear automatically after lead conversion to keep cohorts clean

import type { Attribution } from "@/lib/types/tracking";

const STORAGE_KEY = "switchbooks-attribution-v1";
const ATTRIBUTION_PARAMS: (keyof Attribution)[] = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "fbclid",
];

function safeRead(): Attribution | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
}

function safeWrite(value: Attribution) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // localStorage may be unavailable (private mode quota etc.)
  }
}

export function getStoredAttribution(): Attribution | null {
  return safeRead();
}

/** Read the current URL, capture any attribution params, persist them.
 *  First-touch: only writes if no attribution is already stored. */
export function storeAttributionFromUrl(): Attribution | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);

  const captured: Attribution = {};
  for (const key of ATTRIBUTION_PARAMS) {
    const value = params.get(key);
    if (value) captured[key] = value;
  }

  // No tracking params on the URL → don't touch existing stored attribution.
  if (Object.keys(captured).length === 0) return safeRead();

  // First-touch: only persist if we don't already have something.
  const existing = safeRead();
  if (existing) return existing;

  const enriched: Attribution = {
    ...captured,
    firstLandingPath: window.location.pathname,
    capturedAt: new Date().toISOString(),
  };
  safeWrite(enriched);
  return enriched;
}

export function clearAttribution() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

/** Append stored attribution onto a lead-like object. Pure, side-effect free. */
export function appendAttributionToLead<T extends Record<string, unknown>>(
  lead: T,
): T & { attribution?: Attribution } {
  const attribution = safeRead() ?? undefined;
  if (!attribution) return lead;
  return { ...lead, attribution };
}
