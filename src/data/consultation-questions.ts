// The free Business Review, expressed as data so the flow component is generic.
// Order matters; the flow renders top to bottom. A question with `showIf` only
// appears when an earlier answer matches.
//
// Ordering note: the engaging, qualifying questions come FIRST to build a bit of
// investment, and we ask for contact details LAST. Cold visitors (e.g. someone
// searching for a specific service) are far more likely to finish when the
// name/email/phone ask comes after they've told us what they need, not before.

import type { QuizQuestion } from "@/lib/types/consultation";

export const questions: QuizQuestion[] = [
  {
    id: "businessType",
    type: "single",
    title: "How is your business set up?",
    subtitle: "Pick the closest. We'll confirm the detail later.",
    options: [
      { value: "limited", label: "Limited company" },
      { value: "sole-trader", label: "Sole trader" },
      { value: "partnership", label: "Partnership / LLP" },
      { value: "not-trading", label: "Not trading yet / just starting" },
    ],
    required: true,
  },
  {
    id: "industry",
    type: "industry",
    title: "What industry are you in?",
    subtitle: "Start typing to find yours. If it's not listed, just type it in.",
    options: [
      {
        value: "Construction & trades",
        label: "Construction & trades",
        keywords: ["builder", "building", "plumber", "plumbing", "electrician", "electrical", "joiner", "carpenter", "roofer", "plasterer", "scaffolding", "groundworks", "contractor", "tradesman"],
      },
      {
        value: "Property & lettings",
        label: "Property & lettings",
        keywords: ["landlord", "letting", "lettings", "estate agent", "rental", "property management", "real estate", "developer"],
      },
      {
        value: "Retail & shops",
        label: "Retail & shops",
        keywords: ["shop", "store", "boutique", "retailer", "newsagent", "off licence"],
      },
      {
        value: "E-commerce & online selling",
        label: "E-commerce & online selling",
        keywords: ["online", "ecommerce", "e-commerce", "amazon", "etsy", "ebay", "shopify", "dropshipping"],
      },
      {
        value: "Hospitality & food service",
        label: "Hospitality & food service",
        keywords: ["restaurant", "cafe", "café", "coffee", "pub", "bar", "catering", "takeaway", "food truck", "chef"],
      },
      {
        value: "Hotels & accommodation",
        label: "Hotels & accommodation",
        keywords: ["hotel", "b&b", "bed and breakfast", "airbnb", "guesthouse", "holiday let", "travel"],
      },
      {
        value: "Health & care",
        label: "Health & care",
        keywords: ["doctor", "gp", "dentist", "dental", "physio", "physiotherapy", "care home", "clinic", "medical", "nursing", "therapist", "optician", "pharmacy", "vet", "veterinary"],
      },
      {
        value: "Beauty & wellbeing",
        label: "Beauty & wellbeing",
        keywords: ["hair", "hairdresser", "salon", "barber", "spa", "nails", "beautician", "aesthetics", "massage", "wellbeing"],
      },
      {
        value: "Fitness & sport",
        label: "Fitness & sport",
        keywords: ["gym", "personal trainer", "pt", "coach", "yoga", "pilates", "sports", "fitness"],
      },
      {
        value: "Professional & consulting",
        label: "Professional & consulting",
        keywords: ["consultant", "consulting", "lawyer", "solicitor", "architect", "surveyor", "hr", "recruitment", "accountant", "bookkeeper"],
      },
      {
        value: "Financial & insurance",
        label: "Financial & insurance",
        keywords: ["finance", "mortgage", "insurance", "ifa", "financial adviser", "broker", "wealth"],
      },
      {
        value: "Technology & IT",
        label: "Technology & IT",
        keywords: ["software", "it", "developer", "saas", "tech", "web", "app", "cyber", "data"],
      },
      {
        value: "Marketing, media & design",
        label: "Marketing, media & design",
        keywords: ["marketing", "design", "agency", "pr", "advertising", "social media", "branding", "photographer", "videographer", "copywriter"],
      },
      {
        value: "Creative & entertainment",
        label: "Creative & entertainment",
        keywords: ["artist", "music", "musician", "film", "events", "performer", "production", "theatre"],
      },
      {
        value: "Manufacturing & engineering",
        label: "Manufacturing & engineering",
        keywords: ["manufacturer", "manufacturing", "factory", "engineering", "production", "fabrication", "machining"],
      },
      {
        value: "Wholesale & distribution",
        label: "Wholesale & distribution",
        keywords: ["wholesale", "distributor", "import", "export", "supplier", "trade supplier"],
      },
      {
        value: "Transport & logistics",
        label: "Transport & logistics",
        keywords: ["haulage", "courier", "delivery", "logistics", "taxi", "driver", "freight", "removals", "transport"],
      },
      {
        value: "Motor trade",
        label: "Motor trade",
        keywords: ["garage", "mechanic", "car", "vehicle", "mot", "bodyshop", "dealership", "valeting"],
      },
      {
        value: "Agriculture & farming",
        label: "Agriculture & farming",
        keywords: ["farm", "farmer", "agriculture", "agricultural", "equestrian", "horticulture"],
      },
      {
        value: "Education & childcare",
        label: "Education & childcare",
        keywords: ["tutor", "tuition", "school", "training", "teacher", "coaching", "nursery", "childcare", "childminder"],
      },
      {
        value: "Cleaning & home services",
        label: "Cleaning & home services",
        keywords: ["cleaner", "cleaning", "gardener", "gardening", "landscaping", "handyman", "pest control", "decorator", "window cleaner"],
      },
      {
        value: "Charity & non-profit",
        label: "Charity & non-profit",
        keywords: ["charity", "non-profit", "not for profit", "cic", "social enterprise", "community"],
      },
    ],
    required: true,
  },
  {
    id: "currentSituation",
    type: "single",
    title: "Who looks after your accounts at the moment?",
    options: [
      { value: "accountant", label: "I have an accountant" },
      { value: "diy", label: "I do it myself (spreadsheets / software)" },
      { value: "in-house", label: "Someone employed within the business" },
      { value: "none", label: "No one currently" },
    ],
    required: true,
  },
  {
    id: "satisfaction",
    type: "single",
    title: "How do you feel about your current setup?",
    subtitle: "Be honest. This is what we want to understand.",
    showIf: { id: "currentSituation", equals: ["accountant", "in-house"] },
    options: [
      { value: "happy-exploring", label: "Reasonably happy, but open to better" },
      { value: "frustrated", label: "Frustrated, it's not working well" },
      { value: "leaving", label: "Actively looking to move on" },
      { value: "unsure", label: "Not sure, that's why I'm here" },
    ],
    required: true,
  },
  {
    id: "frustrations",
    type: "multi",
    title: "What's not working for you right now?",
    subtitle: "Choose as many as apply. This is the bit we really want to hear.",
    options: [
      { value: "communication", label: "Poor communication / hard to reach" },
      { value: "reactive", label: "Only hear from them at deadlines" },
      { value: "surprise-bills", label: "Surprise bills, no warning" },
      { value: "no-advice", label: "No proactive advice, just compliance" },
      { value: "errors", label: "Mistakes or late filings" },
      { value: "too-expensive", label: "Feels expensive for what I get" },
      { value: "ignored", label: "Feel like a small fish / ignored" },
      { value: "outgrown", label: "I've outgrown them" },
      { value: "none", label: "Nothing major, just starting fresh" },
    ],
    required: true,
  },
  {
    id: "currentProvider",
    type: "text",
    title: "Who are you with at the moment?",
    subtitle:
      "Optional, and kept completely private. It just helps us understand the market you're used to.",
    microcopy:
      "Don't worry, we'd never match you back to your current accountant. That would be awkward for everyone!",
    placeholder: "Your current accountant (optional)",
    showIf: { id: "currentSituation", equals: ["accountant", "in-house"] },
    required: false,
  },
  {
    id: "currentSpend",
    type: "single",
    title: "Roughly what do you pay for accounting now?",
    subtitle: "A ballpark is fine. It helps us pitch the right level of support.",
    options: [
      { value: "under-100", label: "Under £100 / month" },
      { value: "100-250", label: "£100 – £250 / month" },
      { value: "250-500", label: "£250 – £500 / month" },
      { value: "500-plus", label: "£500+ / month" },
      { value: "annual", label: "A one-off annual fee" },
      { value: "unknown", label: "Not sure / nothing currently" },
    ],
    required: true,
  },
  {
    id: "annualFeeValue",
    type: "text",
    title: "Roughly how much is that annual fee?",
    subtitle: "A ballpark figure really helps us pitch the right level of support.",
    placeholder: "e.g. £1,200",
    showIf: { id: "currentSpend", equals: "annual" },
    required: false,
  },
  {
    id: "servicesWanted",
    type: "multi",
    title: "What would you most like help with?",
    subtitle: "Pick everything that's on your mind.",
    options: [
      { value: "bookkeeping", label: "Bookkeeping" },
      { value: "year-end-accounts", label: "Year-end accounts" },
      { value: "tax-and-vat", label: "Tax & VAT" },
      { value: "personal-tax", label: "Personal tax" },
      { value: "payroll", label: "Payroll" },
      { value: "advisory", label: "Advice & planning" },
      { value: "unsure", label: "Not sure yet" },
    ],
    required: true,
  },
  {
    id: "turnover",
    type: "single",
    title: "Roughly what's your annual turnover?",
    subtitle: "An estimate is fine. It helps us understand your scale.",
    options: [
      { value: "under-90k", label: "Under £90k (below the VAT threshold)" },
      { value: "90k-250k", label: "£90k – £250k" },
      { value: "250k-500k", label: "£250k – £500k" },
      { value: "500k-1m", label: "£500k – £1m" },
      { value: "1m-5m", label: "£1m – £5m" },
      { value: "5m-plus", label: "£5m+" },
      { value: "15m-plus", label: "£15m+ (above the audit threshold)" },
      { value: "private", label: "Prefer not to say" },
    ],
    required: true,
  },
  {
    id: "budget",
    type: "single",
    title: "What monthly budget feels right for the right support?",
    subtitle: "We'll never push you above this, and we'll be honest about what's realistic.",
    microcopy:
      "Please be fair and honest here. If the budget doesn't reflect the support you need, we won't be able to find a firm that can deliver it. The relationship has to work for both sides.",
    options: [
      { value: "under-100", label: "Under £100 / month" },
      { value: "100-250", label: "£100 – £250 / month" },
      { value: "250-500", label: "£250 – £500 / month" },
      { value: "500-1000", label: "£500 – £1,000 / month" },
      { value: "1000-2000", label: "£1,000 – £2,000 / month" },
      { value: "2000-plus", label: "£2,000+ / month" },
      { value: "guidance", label: "I'd like guidance on this" },
    ],
    required: true,
  },
  {
    id: "timeline",
    type: "single",
    title: "When are you hoping to make a change?",
    options: [
      { value: "asap", label: "As soon as possible" },
      { value: "1-3-months", label: "In the next 1–3 months" },
      { value: "year-end", label: "Around my year-end" },
      { value: "exploring", label: "Just exploring for now" },
    ],
    required: true,
  },
  {
    id: "notes",
    type: "textarea",
    title: "Anything else you'd like us to know?",
    subtitle: "Optional. The little details often matter most.",
    placeholder: "What's prompting the change, what 'good' would look like for you…",
    maxLength: 600,
    required: false,
  },
  // --- Contact details, asked last, once they've told us what they need ---
  {
    id: "firstName",
    type: "text",
    title: "Almost done. What's your first name?",
    subtitle: "Just so we can keep it personal when we're in touch.",
    placeholder: "First name",
    required: true,
  },
  {
    id: "lastName",
    type: "text",
    title: "And your last name?",
    placeholder: "Last name",
    required: true,
  },
  {
    id: "businessName",
    type: "text",
    title: "The name of your business?",
    subtitle: "If you trade under your own name, that's fine, just pop that.",
    placeholder: "Your business name",
    required: true,
  },
  {
    id: "companies",
    type: "companies",
    title: "Your limited company details",
    subtitle:
      "Add the company you're a director of. If you're a director of more than one, add them all.",
    microcopy:
      "You can find your company number on the Companies House register. It's an 8-digit reference.",
    showIf: { id: "businessType", equals: "limited" },
    required: true,
  },
  {
    id: "town",
    type: "text",
    title: "Which town are you based in?",
    subtitle: "So we can match you with a firm that's genuinely local.",
    placeholder: "e.g. Worthing",
    required: true,
  },
  {
    id: "county",
    type: "text",
    title: "And which county?",
    placeholder: "e.g. West Sussex",
    required: true,
  },
  {
    id: "dateOfBirth",
    type: "date",
    title: "Your date of birth",
    subtitle:
      "Optional. It helps the firm we match you with get their onboarding checks done faster.",
    required: false,
  },
  {
    id: "email",
    type: "email",
    title: "Where shall we send your match?",
    subtitle: "Your email. We'll use it to send your result and follow up. Never shared.",
    placeholder: "you@yourbusiness.co.uk",
    required: true,
  },
  {
    id: "phone",
    type: "tel",
    title: "And the best number to reach you on?",
    subtitle: "Only used to arrange a quick, no-pressure chat.",
    placeholder: "07000 000000",
    required: true,
  },
];
