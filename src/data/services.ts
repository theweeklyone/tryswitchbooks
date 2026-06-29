// Service catalogue for Switch Books.
// Each entry powers its own /services/[slug] page, the services overview, the
// homepage card grid and the footer links.
//
// IMPORTANT FRAMING: Switch Books does NOT provide these services. It matches the
// owner with a local accounting firm that does. Copy describes what GOOD looks
// like and what we'll match you with, never "we'll do your books".
// Deliberately price-free; the quiz captures budget privately. Icons are
// lucide-react icon names, mapped in the UI.

export type ServiceCategory =
  | "Compliance"
  | "Day-to-day"
  | "Tax"
  | "People"
  | "Advisory";

export type Service = {
  slug: string;
  name: string;
  category: ServiceCategory;
  /** lucide-react icon name, resolved in components/ServiceIcon. */
  icon: string;
  short: string;
  metaDescription: string;

  hero: {
    eyebrow: string;
    headline: string;
    subheading: string;
  };

  // The frustrations this takes away (the "sound familiar?" hooks).
  problems: string[];
  // What a great firm delivers in this area (what we'll match you to).
  whatYouGet: string[];
  // The specific tasks that sit under this area (the full breadth a firm can
  // take off your plate). Shown as a list on the services pages.
  includes: string[];
  // Who this matters most for.
  forWho: string[];

  outcome: {
    summary: string;
    bullets: string[];
  };

  faq: { q: string; a: string }[];

  relatedServiceSlugs: string[];
};

export const services: Service[] = [
  {
    slug: "bookkeeping",
    name: "Bookkeeping",
    category: "Day-to-day",
    icon: "Receipt",
    short:
      "Clean, up-to-date books you can trust, so you always know where the business stands.",
    metaDescription:
      "Behind on your bookkeeping or never sure your numbers are right? Switch Books matches you with a local firm that keeps your books clean and real-time. Take the free review.",
    hero: {
      eyebrow: "Bookkeeping",
      headline: "Books that are always up to date, and always right.",
      subheading:
        "If your books are weeks behind, or you only really know how you're doing once a year, you've probably outgrown your setup. We'll match you with a local firm that keeps everything current, reconciled and ready, so the numbers are there the moment you need them.",
    },
    problems: [
      "You're never quite sure your figures are accurate.",
      "Receipts and invoices pile up until panic sets in.",
      "Your software is a mess no one set up properly.",
      "You can't get a straight answer on how the business is doing right now.",
    ],
    whatYouGet: [
      "Cloud software set up and tidied properly (Xero, QuickBooks or FreeAgent).",
      "Regular reconciliation so the books are always current.",
      "Bank feeds, receipt capture and chasing automated where it makes sense.",
      "A clear monthly snapshot of where you stand, in plain English.",
    ],
    includes: [
      "Cloud bookkeeping (Xero, QuickBooks, FreeAgent)",
      "Bank and card reconciliation",
      "Sales invoicing and credit control",
      "Supplier bills and payment runs",
      "Expense and receipt management",
      "Software setup, clean-up and training",
    ],
    forWho: [
      "Owners drowning in admin who'd rather be running the business.",
      "Businesses that have outgrown a spreadsheet.",
      "Anyone who's lost confidence that their current books are accurate.",
    ],
    outcome: {
      summary:
        "Books you don't have to think about, and numbers you can finally trust.",
      bullets: [
        "Real-time view of cash and performance",
        "No more year-end scramble",
        "Less admin, fewer late nights",
        "A foundation for proper tax planning and advice",
      ],
    },
    faq: [
      {
        q: "Can the firm take over partway through the year?",
        a: "Yes. The firms we match you with will tidy up what's there, reconcile everything and bring the books fully up to date. Most handovers are smoother than owners expect.",
      },
      {
        q: "Will I have to switch software?",
        a: "Only if it helps. A good firm works with what you've got when it's fine, explains clearly when a change is worth it, and handles the migration for you.",
      },
    ],
    relatedServiceSlugs: ["year-end-accounts", "tax-and-vat", "advisory"],
  },
  {
    slug: "year-end-accounts",
    name: "Year-End Accounts",
    category: "Compliance",
    icon: "FileText",
    short:
      "Accounts and filings prepared early and explained clearly. No last-minute panic, no jargon.",
    metaDescription:
      "Dreading another year-end? Switch Books matches you with a local firm that prepares your accounts early and explains what they mean. UK & Sussex. Take the free review.",
    hero: {
      eyebrow: "Year-End Accounts",
      headline: "Year-end done early, explained properly.",
      subheading:
        "Statutory accounts and Companies House filings shouldn't arrive as a deadline scramble and a surprise bill. We'll match you with a firm that prepares everything ahead of time and walks you through what the numbers mean for you.",
    },
    problems: [
      "Year-end is a stressful, last-minute rush every time.",
      "You get a set of accounts you don't really understand.",
      "Deadlines creep up and bills land without warning.",
      "You only hear from your accountant when something's due.",
    ],
    whatYouGet: [
      "Statutory accounts prepared and filed with Companies House.",
      "Corporation tax return (CT600) prepared and submitted.",
      "A plain-English walkthrough of what your results mean.",
      "Deadlines tracked for you, comfortably ahead of time.",
    ],
    includes: [
      "Statutory year-end accounts",
      "Corporation tax return (CT600)",
      "Companies House filing and confirmation statement",
      "Sole trader and partnership accounts",
      "Dormant and micro-entity accounts",
      "Registered office and company secretarial",
    ],
    forWho: [
      "Limited companies that want certainty, not surprises.",
      "Owners tired of accounts that arrive late and unexplained.",
      "Businesses that want their numbers to inform decisions, not just tick a box.",
    ],
    outcome: {
      summary:
        "Compliance handled early, with a clear understanding of where you stand.",
      bullets: [
        "Filed well before the deadline",
        "No nasty surprises on tax or fees",
        "Accounts explained in language that makes sense",
        "Time to plan, not just react",
      ],
    },
    faq: [
      {
        q: "When will my accounts be done?",
        a: "The firms we match you with aim for comfortably ahead of the filing deadline, never the night before. You'll know your position with time to plan around it.",
      },
      {
        q: "Will I understand them?",
        a: "Yes. A good firm talks you through your results in plain English and what they mean for tax, drawings and the year ahead. That's the standard we match you to.",
      },
    ],
    relatedServiceSlugs: ["tax-and-vat", "bookkeeping", "advisory"],
  },
  {
    slug: "tax-and-vat",
    name: "Tax & VAT",
    category: "Tax",
    icon: "Calculator",
    short:
      "Tax planned ahead, not just reported after the fact, so you keep more of what you earn.",
    metaDescription:
      "Paying more tax than you expected and getting no advice? Switch Books matches you with a firm that plans tax and VAT ahead for UK & Sussex businesses. Take the free review.",
    hero: {
      eyebrow: "Tax & VAT",
      headline: "Tax planned in advance, not explained in hindsight.",
      subheading:
        "Good tax work happens before the year ends, not after. We'll match you with a firm that handles the returns and the VAT but also looks ahead, so you're never blindsided by a bill, and never paying more than you need to.",
    },
    problems: [
      "Tax bills arrive bigger than expected, with no warning.",
      "Nobody ever suggests ways to plan ahead.",
      "VAT and Making Tax Digital feel like a minefield.",
      "You suspect you're paying too much but don't know where to start.",
    ],
    whatYouGet: [
      "Corporation tax, self-assessment and VAT returns handled.",
      "Making Tax Digital compliance sorted.",
      "Proactive planning around profit extraction, allowances and timing.",
      "Advance warning of what's due and when. No surprises.",
    ],
    includes: [
      "VAT returns and Making Tax Digital",
      "VAT registration and scheme advice",
      "Corporation tax and planning",
      "Personal tax and self-assessment",
      "Capital gains tax",
      "R&D tax relief claims",
      "HMRC enquiry and investigation support",
    ],
    forWho: [
      "Owners who feel their tax is reactive, not planned.",
      "Directors weighing up salary vs dividends and the most efficient route.",
      "VAT-registered businesses wanting it simply handled.",
    ],
    outcome: {
      summary:
        "A tax position that's planned, predictable and as efficient as the rules allow.",
      bullets: [
        "No surprise bills",
        "Savings you weren't told about before",
        "VAT and MTD off your plate",
        "Confidence you're set up the right way",
      ],
    },
    faq: [
      {
        q: "Could the right firm save me money?",
        a: "Often, yes. Through planning that should have been offered to you already. The firm we match you with will be honest about what's realistic for your situation.",
      },
      {
        q: "Is this all above board?",
        a: "Always. We only match you with reputable, qualified firms using the reliefs and allowances you're entitled to, never anything that puts you at risk with HMRC.",
      },
    ],
    relatedServiceSlugs: ["year-end-accounts", "advisory", "bookkeeping"],
  },
  {
    slug: "payroll",
    name: "Payroll & Auto-Enrolment",
    category: "People",
    icon: "Users",
    short:
      "Your team paid correctly and on time, with pensions and RTI handled quietly in the background.",
    metaDescription:
      "Payroll a monthly headache? Switch Books matches you with a firm that runs payroll, RTI and auto-enrolment for UK & Sussex businesses. Take the free review.",
    hero: {
      eyebrow: "Payroll & Auto-Enrolment",
      headline: "Your team paid right, every time.",
      subheading:
        "Payroll going wrong erodes trust fast. We'll match you with a firm that runs it accurately and on time: payslips, RTI submissions, pensions and auto-enrolment, all handled so you never have to think about it.",
    },
    problems: [
      "Payroll is a stressful monthly job you dread.",
      "You worry about getting deductions or pensions wrong.",
      "Auto-enrolment and RTI feel like extra risk.",
      "Mistakes have knocked your team's confidence before.",
    ],
    whatYouGet: [
      "Full monthly (or weekly) payroll run and payslips.",
      "RTI submissions to HMRC handled on time.",
      "Workplace pension and auto-enrolment compliance.",
      "Starters, leavers and changes managed smoothly.",
    ],
    includes: [
      "Weekly or monthly payroll and payslips",
      "RTI submissions to HMRC",
      "Workplace pensions and auto-enrolment",
      "CIS returns for construction",
      "Director payroll and dividends",
      "P11D and benefits in kind",
      "Statutory pay (SSP, SMP, SPP)",
    ],
    forWho: [
      "Employers who want payroll off their desk entirely.",
      "Growing teams adding their first or next employees.",
      "Owners who've been caught out by payroll errors before.",
    ],
    outcome: {
      summary: "Payroll that just works: accurate, compliant and invisible.",
      bullets: [
        "Team paid correctly and on time",
        "Pensions and RTI fully compliant",
        "No more month-end stress",
        "A clear point of contact for any query",
      ],
    },
    faq: [
      {
        q: "How many employees can be covered?",
        a: "From a single director's payroll up to larger teams. We'll match you with a firm that fits your headcount and pay frequency.",
      },
      {
        q: "Is the pension side handled too?",
        a: "Yes. The firms we match you with handle auto-enrolment, contributions and the ongoing compliance as part of payroll.",
      },
    ],
    relatedServiceSlugs: ["bookkeeping", "tax-and-vat", "advisory"],
  },
  {
    slug: "advisory",
    name: "Advisory & Planning",
    category: "Advisory",
    icon: "TrendingUp",
    short:
      "Regular, forward-looking conversations about your numbers: the proactive advice most owners never get.",
    metaDescription:
      "Wish your accountant advised you, not just filed for you? Switch Books matches you with a firm offering proactive advisory and planning for UK & Sussex owners. Take the free review.",
    hero: {
      eyebrow: "Advisory & Planning",
      headline: "The proactive advice you were promised but never got.",
      subheading:
        "Most accountants disappear until the next deadline. We'll match you with a firm that does the opposite, with regular conversations about cash flow, profit, growth and what the numbers are telling you, so you make decisions with a clear head and good information.",
    },
    problems: [
      "Your accountant only contacts you when something is due.",
      "You make big decisions without solid numbers behind them.",
      "Nobody helps you plan for cash flow, growth or profit.",
      "You feel like a file on a shelf, not a client.",
    ],
    whatYouGet: [
      "Regular review meetings, quarterly or monthly, your call.",
      "Management accounts and cash-flow forecasting.",
      "Budgeting, scenario planning and goal tracking.",
      "A real sounding board who picks up the phone.",
    ],
    includes: [
      "Management accounts and KPI reporting",
      "Cash-flow forecasting",
      "Budgeting and scenario planning",
      "Virtual Finance Director (FD) support",
      "Funding and loan applications",
      "Profit, pricing and margin reviews",
      "Exit, succession and business valuations",
    ],
    forWho: [
      "Owners with ambitions who want a partner, not a once-a-year filer.",
      "Businesses navigating growth, change or a big decision.",
      "Anyone who's felt ignored by their current accountant.",
    ],
    outcome: {
      summary:
        "A clear financial picture and a trusted adviser in your corner all year round.",
      bullets: [
        "Decisions backed by real numbers",
        "Cash-flow surprises spotted early",
        "Proactive ideas, not just compliance",
        "Someone who knows your business",
      ],
    },
    faq: [
      {
        q: "How often would we talk?",
        a: "As often as is useful: typically quarterly, or monthly for faster-moving businesses. We match you with firms that make regular contact part of how they work, not an afterthought.",
      },
      {
        q: "Is this only for bigger businesses?",
        a: "Not at all. Smaller owners often benefit most, because they've never had this kind of support before, and we match accordingly.",
      },
    ],
    relatedServiceSlugs: ["tax-and-vat", "year-end-accounts", "bookkeeping"],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
