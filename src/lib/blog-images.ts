// Real imagery for insight articles, keyed by slug. The same `src` is used for
// the card thumbnail (/advice and "more reading") and the in-article hero, so
// each article carries at least one captioned, alt-described photo for SEO.
//
// Each photo here is unique to its article and is NOT used as a page hero
// elsewhere on the site, so nothing repeats across the site.
export const blogImages: Record<string, { src?: string; alt?: string }> = {
  "signs-its-time-to-switch-accountants": {
    src: "/images/business-advisor.jpg",
    alt: "An accountant reviewing a business owner's figures across a desk",
  },
  "switching-accountant-easier-than-you-think": {
    src: "/images/advisory-meeting-2.jpg",
    alt: "A relaxed handover meeting between a business owner and their new accountant",
  },
  "questions-to-ask-before-hiring-an-accountant": {
    src: "/images/business-advisor-2.jpg",
    alt: "A business owner asking questions in a first meeting with an accountant",
  },
  "proactive-tax-planning-beats-year-end-surprises": {
    src: "/images/business-reports-2.jpg",
    alt: "Tax figures and reports being reviewed well ahead of the year-end",
  },
  "bookkeeping-basics-getting-your-numbers-right": {
    src: "/images/business-reports-4.jpg",
    alt: "Clear, well-kept bookkeeping records and reports on a desk",
  },
  "what-good-business-advice-actually-looks-like": {
    src: "/images/advisory-meeting-3.jpg",
    alt: "A proactive advisory conversation about a growing business",
  },
};
