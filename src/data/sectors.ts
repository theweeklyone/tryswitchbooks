// Industry ("...accountants near me") landing pages. Each targets a sector term
// the site already ranks 11–20 for with no dedicated page. Switch Books is a
// FREE MATCHING SERVICE — copy always says "matched with a local firm", never
// that we do the accounting. Regulatory references are kept general on purpose
// (no rates, dates or thresholds) so nothing goes stale; expand with current
// specifics only if verified.

export type Sector = {
  slug: string; // route + canonical, e.g. "hospitality-accountants"
  name: string; // "Hospitality"
  metaTitle: string; // full <title> incl. brand (set absolute)
  metaDescription: string;
  h1: string;
  intro: string;
  challengesTitle: string;
  challenges: { title: string; body: string }[];
  lookFor: string[];
  faq: { q: string; a: string }[];
  serviceLinks: { slug: string; label: string }[]; // to /services/*
  /** Hub page links out to the sector siblings + all services. */
  isHub?: boolean;
  /** Per-sector hero image (path under /public/images). Falls back to a shared
   *  interim photo until distinct sector photos are supplied. `imageAlt`
   *  overrides the auto-generated alt text. */
  image?: string;
  imageAlt?: string;
};

// Interim hero shared by every sector page until distinct photos are added.
export const SECTOR_FALLBACK_IMAGE = "/images/business-advisor.jpg";

export const sectors: Sector[] = [
  {
    slug: "small-business-accountants",
    name: "Small Business",
    isHub: true,
    image: "/images/small-business-accountants.jpg",
    imageAlt: "A small business owner packing customer orders at their workbench",
    metaTitle: "Small Business Accountants in Sussex | Switch Books",
    metaDescription:
      "Looking for a small business accountant near you? Switch Books matches you, free, with the right local firm for your size, sector and budget. Free review.",
    h1: "Small Business Accountants, Matched to You Locally",
    intro:
      "Every small business needs an accountant, but the right one depends on what you do, how big you are and where you're headed. Switch Books is a free service that matches you with a local firm that fits — your sector, your size, your budget. We're not accountants ourselves; we find you the ones worth talking to.",
    challengesTitle: "What a good small business accountant sorts out",
    challenges: [
      {
        title: "The right structure as you grow",
        body: "Sole trader or limited company? The answer shapes your tax, your paperwork and your risk. A good accountant advises on the right structure as the business grows, not just once at the start.",
      },
      {
        title: "Staying compliant without the stress",
        body: "Self-assessment, corporation tax, VAT, payroll, and Making Tax Digital as it rolls out — a proactive firm keeps you ahead of deadlines instead of chasing them.",
      },
      {
        title: "Advice, not just filing",
        body: "Most owners never get real advice from their accountant. The best firms are a sounding board on pricing, cashflow and growth, not a once-a-year filer.",
      },
      {
        title: "A firm that fits your size",
        body: "A one-person business and a growing team need different things. We match you with a firm used to businesses like yours, so you're never too small to matter.",
      },
    ],
    lookFor: [
      "Experience with businesses your size and in your sector",
      "Proactive advice through the year, not just at deadline time",
      "Clear, fixed fees with no surprise bills",
      "Responsive — actually answers the phone and email",
    ],
    faq: [
      {
        q: "What kind of accountant does a small business need?",
        a: "One that fits your size, sector and budget, and that gives you real advice rather than just filing. That's exactly what our free matching service is built to find.",
      },
      {
        q: "Sole trader or limited company — which is right for me?",
        a: "It depends on your income, your risk and your plans. A good accountant will advise on the best structure for you, and we match you with firms that take the time to do that.",
      },
      {
        q: "How much does Switch Books cost?",
        a: "It's free. We're paid by the firms we work with, only when it's a good match. You agree fees directly with the accountant you choose.",
      },
    ],
    serviceLinks: [
      { slug: "bookkeeping", label: "Bookkeeping" },
      { slug: "year-end-accounts", label: "Year-End Accounts" },
      { slug: "tax-and-vat", label: "Tax & VAT" },
      { slug: "payroll", label: "Payroll & Auto-Enrolment" },
      { slug: "advisory", label: "Advisory & Planning" },
    ],
  },
  {
    slug: "hospitality-accountants",
    name: "Hospitality",
    image: "/images/hospitality-accountants.jpg",
    imageAlt: "The counter and menu boards of a café hospitality business",
    metaTitle: "Hospitality Accountants in Sussex | Switch Books",
    metaDescription:
      "Pubs, hotels, cafés and events businesses need an accountant who gets hospitality. Switch Books matches you, free, with the right local firm. Free review.",
    h1: "Accountants for Hospitality Businesses, Matched Locally",
    intro:
      "Hospitality runs on thin margins, long hours and a wage bill that moves week to week, so a hospitality accountant who understands the trade is worth far more than a generalist. Switch Books is a free service that matches you with a local firm that knows the sector. We don't do the accounting ourselves; we find you the firm that does it well.",
    challengesTitle: "The hospitality-specific things a good firm handles",
    challenges: [
      {
        title: "Tips and tronc",
        body: "Recent tipping rules mean tips and service charge have to be passed on to staff fairly, and how you run a tronc affects tax and National Insurance. A hospitality-aware firm sets this up properly so you stay compliant and your team is treated fairly.",
      },
      {
        title: "Shift payroll and a moving wage bill",
        body: "Casual staff, varying hours, holiday pay and pensions make hospitality payroll one of the fiddliest around. The right firm runs it accurately so payday is never a scramble.",
      },
      {
        title: "Seasonal cashflow",
        body: "Trade that swings with the seasons and the weather makes cashflow hard to plan. A good adviser helps you forecast through the quiet months so a slow winter doesn't catch you out.",
      },
      {
        title: "VAT on food and drink",
        body: "VAT in hospitality is notoriously fiddly — what's standard-rated and what isn't, eat-in versus takeaway. A firm that knows the sector keeps you on the right side of it.",
      },
    ],
    lookFor: [
      "Real hospitality clients on their books, not just 'small businesses'",
      "Confidence with tronc, tips and shift-based payroll",
      "Cashflow forecasting, not just year-end accounts",
      "Quick to reach when a supplier or VAT question can't wait",
    ],
    faq: [
      {
        q: "Do I need a specialist hospitality accountant?",
        a: "Not necessarily a specialist, but a firm that genuinely understands the trade — tips, seasonal cashflow, hospitality VAT and shift payroll — will save you money and stress compared with a generalist. That's who we aim to match you with.",
      },
      {
        q: "Can you help with tips and tronc?",
        a: "Yes. We match you with firms that set up tronc arrangements correctly under the current rules, so tips reach your staff fairly and the tax and NI are handled properly.",
      },
      {
        q: "What does it cost?",
        a: "Nothing to use Switch Books. We're a free matching service, paid by the firms we work with. You agree fees directly with the accountant you choose.",
      },
    ],
    serviceLinks: [
      { slug: "payroll", label: "Payroll & Auto-Enrolment" },
      { slug: "tax-and-vat", label: "Tax & VAT" },
      { slug: "advisory", label: "Advisory & Planning" },
    ],
  },
  {
    slug: "restaurant-accountants",
    name: "Restaurant",
    image: "/images/restaurant-accountants.jpg",
    imageAlt: "Diners at the outdoor pavement tables of a restaurant",
    metaTitle: "Restaurant Accountants in Sussex | Switch Books",
    metaDescription:
      "Running a restaurant or café? Switch Books matches you, free, with a local accountant who understands margins, tips and hospitality VAT. Free review.",
    h1: "Accountants for Restaurants & Cafés, Matched Locally",
    intro:
      "In a restaurant, the difference between a good month and a bad one often hides in the numbers — food cost, wastage, covers, staff hours. A restaurant accountant who reads those numbers with you is worth having. Switch Books matches you, free, with a local firm that understands the trade. We're the matchmaker, not the accountant.",
    challengesTitle: "What a restaurant-savvy firm gets right",
    challenges: [
      {
        title: "Margins and food cost",
        body: "Ingredient prices move constantly, and a few points of food cost is the difference between profit and loss. A restaurant-savvy firm helps you track gross margin and spot leakage before it hurts.",
      },
      {
        title: "Covers, takings and reconciliation",
        body: "Card, cash, delivery apps and tips all have to reconcile back to your takings. The right firm makes that painless and accurate.",
      },
      {
        title: "Tips and staff pay",
        body: "Tips, service charge and a payroll full of part-time and shift workers need handling correctly under the current tipping rules. A good firm keeps it clean.",
      },
      {
        title: "Delivery platforms and VAT",
        body: "Commission from delivery apps, and the VAT treatment of what you sell, add complexity a generalist can easily miss.",
      },
    ],
    lookFor: [
      "Experience with restaurants, cafés or takeaways specifically",
      "Help with margins and food-cost reporting, not just compliance",
      "Comfort with delivery-platform income and reconciliation",
      "Clear on tips, service charge and shift payroll",
    ],
    faq: [
      {
        q: "How is a restaurant accountant different from a normal one?",
        a: "A restaurant-aware firm thinks in covers, food cost and gross margin, and knows how delivery apps, tips and hospitality VAT work. That's more useful day to day than a generalist who only sees you at year-end.",
      },
      {
        q: "Do you cover cafés and takeaways too?",
        a: "Yes. The same challenges apply across restaurants, cafés and takeaways, and we match you with a firm that fits your particular setup.",
      },
      {
        q: "Is Switch Books free?",
        a: "Yes, completely free to you. We match you with a local firm and you agree fees directly with them.",
      },
    ],
    serviceLinks: [
      { slug: "bookkeeping", label: "Bookkeeping" },
      { slug: "tax-and-vat", label: "Tax & VAT" },
      { slug: "advisory", label: "Advisory & Planning" },
    ],
  },
  {
    slug: "retail-accountants",
    name: "Retail",
    image: "/images/retail-accountants.jpg",
    imageAlt: "Products displayed on the shelves of a retail shop",
    metaTitle: "Retail Accountants in Sussex | Switch Books",
    metaDescription:
      "Independent shop or online retailer? Switch Books matches you, free, with a local accountant who knows stock, EPOS and multi-channel VAT. Free review.",
    h1: "Accountants for Retail & Shop Businesses, Matched Locally",
    intro:
      "Retail lives and dies on stock and margin, and increasingly on selling in more than one place at once — the shop, the website, the marketplace. A retail accountant who understands that mix helps you actually know what's making money. Switch Books matches you, free, with a local firm that gets it. We're the matching service, not the accountants.",
    challengesTitle: "What a retail-aware firm helps you with",
    challenges: [
      {
        title: "Stock and inventory",
        body: "Stock is usually a retailer's biggest number and the hardest to value. A retail-aware firm helps you track it properly so your margins and accounts are real, not guesswork.",
      },
      {
        title: "EPOS and daily takings",
        body: "Tills, card machines and daily takings need to reconcile cleanly into your books. The right firm links your EPOS to your accounting so it just flows.",
      },
      {
        title: "Selling across channels",
        body: "Shop, website, Etsy, Amazon, eBay — each channel has its own fees and reporting. A good firm pulls them together so you see the whole picture.",
      },
      {
        title: "Multi-channel VAT",
        body: "VAT across in-store and online sales, and through marketplaces, gets complicated fast. A firm that knows retail keeps it right.",
      },
    ],
    lookFor: [
      "Retail or e-commerce clients, not just service businesses",
      "Comfort with stock and inventory accounting",
      "Experience linking EPOS and online channels to the books",
      "On top of marketplace fees and multi-channel VAT",
    ],
    faq: [
      {
        q: "Do you cover online shops as well as high-street ones?",
        a: "Yes. Whether you sell in a shop, online, through marketplaces, or all three, we match you with a firm that understands multi-channel retail and its VAT.",
      },
      {
        q: "Can a firm help me link my EPOS or Shopify to my accounts?",
        a: "Many can. We match you with firms comfortable connecting tills and online platforms to cloud accounting, so your numbers stay current with less manual work.",
      },
      {
        q: "What does Switch Books charge?",
        a: "Nothing. We're free to use; you pay only the accountant you choose, at fees you agree directly.",
      },
    ],
    serviceLinks: [
      { slug: "bookkeeping", label: "Bookkeeping" },
      { slug: "tax-and-vat", label: "Tax & VAT" },
      { slug: "advisory", label: "Advisory & Planning" },
    ],
  },
];

export function getSector(slug: string): Sector | undefined {
  return sectors.find((s) => s.slug === slug);
}
