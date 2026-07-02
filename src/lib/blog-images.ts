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

  // --- Switching cluster ---
  // NOTE: the three marked INTERIM reuse an existing photo as a stop-gap so no
  // article is imageless. Replace with the unique uploads listed for the author
  // (see the checklist in data/blog.ts) so nothing repeats across the site.
  "how-to-switch-accountants-step-by-step": {
    src: "/images/advisory-meeting-4.jpg",
    alt: "A business owner meeting their new accountant to begin the switch",
  },
  "professional-clearance-explained": {
    src: "/images/office-exterior.jpg",
    alt: "The office of an accountancy firm handling a professional clearance request",
  },
  "changing-accountants-mid-year": {
    src: "/images/business-reports-3.jpg",
    alt: "Mid-year business figures being reviewed by a newly appointed accountant",
  },
  "cost-of-switching-accountants": {
    src: "/images/meeting-report.jpg", // INTERIM (reused)
    alt: "An accountant explaining fees and switching costs to a business owner",
  },
  "best-time-to-switch-accountants": {
    src: "/images/advisory-meeting.jpg", // INTERIM (reused)
    alt: "A business owner and accountant planning the right time of year to switch",
  },
  "switching-accountants-limited-company": {
    src: "/images/office-2.jpg", // INTERIM (reused)
    alt: "A limited company director reviewing accounts with a new firm",
  },
};
