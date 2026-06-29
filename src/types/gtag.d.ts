// Global typings for the Google Analytics (gtag.js) globals injected at runtime.
export {};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
