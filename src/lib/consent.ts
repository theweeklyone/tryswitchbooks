// Single source of truth for the visitor's cookie/analytics consent.
//
// The cookie notice (PrivacyNotice) writes the decision here; GoogleAnalytics
// reads it and only loads gtag.js once consent has been *granted*. Analytics
// therefore never fire unless the visitor explicitly accepts.
//
// We store an explicit "granted" | "denied" so that choosing "Essential only"
// is remembered too, the banner won't reappear, but analytics stay off.

export const CONSENT_STORAGE_KEY = "switchbooks-cookie-consent-v2";
export const CONSENT_GRANTED_EVENT = "switchbooks:analytics-consent-granted";

type ConsentDecision = "granted" | "denied";

export function getConsentDecision(): ConsentDecision | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

// Has the visitor made any choice yet? Drives whether the banner shows.
export function hasMadeConsentChoice(): boolean {
  return getConsentDecision() !== null;
}

// Has the visitor agreed to analytics? Drives whether GA4 loads.
export function hasAnalyticsConsent(): boolean {
  return getConsentDecision() === "granted";
}

function storeDecision(decision: ConsentDecision): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, decision);
  } catch {
    // ignore storage failures (private mode etc.)
  }
}

// Records consent and notifies listeners (GoogleAnalytics) in the same session
// so analytics can start without a page reload.
export function grantAnalyticsConsent(): void {
  storeDecision("granted");
  try {
    window.dispatchEvent(new Event(CONSENT_GRANTED_EVENT));
  } catch {
    // ignore
  }
}

// Records a "no thanks", essential cookies only. Nothing to start.
export function denyAnalyticsConsent(): void {
  storeDecision("denied");
}
