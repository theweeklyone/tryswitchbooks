// Central site configuration. Update once, propagates everywhere.
// NOTE: the owner is intentionally anonymous, with no personal name and no fixed
// trading address appear anywhere public. Switch Books is a FREE MATCHING SERVICE:
// it connects business owners with the right local accounting firm, it does not
// provide the accounting itself. Leads are handled privately via the dashboard.
// Replace the placeholder phone/email/domain when live.

export const site = {
  name: "Switch Books",
  shortName: "Switch Books",
  tagline: "The right local accountant, matched to your business",
  brandPromise: "Free, independent matching service",
  description:
    "Switch Books is a free service that matches UK business owners, and Sussex businesses in particular, with the right local accounting firm. Tell us what's frustrating you and what you need, and we'll connect you with a trusted, proactive firm that fits your business and your budget.",
  location: {
    short: "Sussex & the South East",
    // Anonymous: region only, no street address.
    addressLines: ["Switch Books", "Serving Sussex & the South East", "United Kingdom"],
    // General Sussex map reference (no specific premises).
    mapsLink: "https://maps.google.com/?q=Sussex+England",
    directionsLink: "https://maps.google.com/?q=Sussex+England",
  },
  contact: {
    // No public phone number: contact is email-only to keep the owner anonymous.
    // If a forwarding / VoIP number is added later, reintroduce phoneDisplay/phoneHref
    // here and it will flow back to the footer, contact page and JSON-LD.
    emailDisplay: "enquiries@tryswitchbooks.co.uk",
    emailHref: "mailto:enquiries@tryswitchbooks.co.uk",
  },
  hours: [
    { day: "Monday", hours: "09:00 – 17:30" },
    { day: "Tuesday", hours: "09:00 – 17:30" },
    { day: "Wednesday", hours: "09:00 – 17:30" },
    { day: "Thursday", hours: "09:00 – 17:30" },
    { day: "Friday", hours: "09:00 – 17:00" },
    { day: "Saturday", hours: "Closed" },
    { day: "Sunday", hours: "Closed" },
  ],
  // Every primary CTA ("Start your free review", "See what good looks like",
  // "Not happy with your accountant?") routes to the lead-generating quiz.
  // Kept as one value so it can be repointed in a single place.
  bookingUrl: "/consultation",
  consultationUrl: "/consultation",
  // Social profiles for the anonymous brand. Flows to the footer link and the
  // Organization JSON-LD `sameAs` automatically. Add more keys as profiles go live.
  social: {
    linkedin: "https://www.linkedin.com/company/try-switch-books",
    linkedinHandle: "try-switch-books",
    x: "https://x.com/TrySwitchBooks",
    xHandle: "@TrySwitchBooks",
  },
} as const;

export type Site = typeof site;

// Feature flags. Flip a flag and every surface that reads it turns on/off
// together. Legacy features from the base template are disabled.
export const features = {
  // Legacy shop/portal flags: kept off; routes are removed/redirected.
  products: false,
  clientPortal: false,
} as const;
