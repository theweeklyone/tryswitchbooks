// Insight articles for business owners. Each item powers /advice and
// /advice/[slug]. Content is matching-service friendly: we help owners choose
// and switch accountants, we don't provide the accounting ourselves.
//
// ADDING AN ARTICLE: required for the build to pass (enforced by
// lib/content-checks.ts, run from app/sitemap.ts):
//   1. Add ONE image entry for the slug in lib/blog-images.ts (src + alt).
//      A post with no image FAILS the build.
//   2. Include at least one { type: "h2" } heading.
//   3. Keep the title ≤ ~60 chars and the excerpt ~110–160 chars (the excerpt
//      is the meta description). Outside these you'll get a build warning.
//   4. Add `related` links to build the topical cluster and pass link equity.

export const blogCategories = [
  "Choosing an accountant",
  "Switching",
  "Tax & planning",
  "Bookkeeping & software",
  "Growth & advice",
] as const;

export type BlogCategory = (typeof blogCategories)[number];

export type BlogPost = {
  slug: string;
  title: string;
  category: BlogCategory;
  excerpt: string;
  readingTime: string;
  publishedOn: string;
  author: string;
  imageStyle: "default" | "blush" | "mocha";
  body: { type: "p" | "h2" | "ul"; text?: string; items?: string[] }[];
  // Hand-picked internal links rendered as a "Related reading" block in the
  // article. Point these at other posts and money pages (services, town hubs,
  // the review) to build topical clusters and pass link equity to key pages.
  related?: { label: string; href: string }[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "complete-guide-to-switching-accountants",
    title: "The complete guide to switching accountants",
    category: "Switching",
    excerpt:
      "Everything you need to switch accountants with confidence: when to move, what it really costs, how the handover works, plus a free step-by-step checklist.",
    readingTime: "9 min read",
    publishedOn: "August 2026",
    author: "The Switch Books team",
    imageStyle: "mocha",
    body: [
      {
        type: "p",
        text: "Switching accountants is one of those jobs business owners put off for years, usually over a worry that turns out to be unfounded. It won't disrupt your accounts. You won't be landed with a bill from two firms. And you don't have to have an awkward conversation with your current accountant. This is the complete guide: the myths, the timing, the exact process, the real costs, and a checklist you can work through at your own pace.",
      },
      { type: "h2", text: "First, the honest question: should you switch?" },
      {
        type: "p",
        text: "Not every gripe is a reason to move. But some are. You've probably outgrown your accountant if:",
      },
      {
        type: "ul",
        items: [
          "You only ever hear from them at the deadline, never before it",
          "You're the one chasing, for answers, for figures, for a call back",
          "They file what you send and nothing more: no advice, no planning, no \"have you thought about…\"",
          "You've had a late filing or a penalty that felt avoidable",
          "Your business has changed, with new staff, a limited company, VAT or property, and they haven't kept up",
          "You dread the annual bill because you're never sure what it's for",
        ],
      },
      {
        type: "p",
        text: "One of these on its own might just need a frank conversation. Several together is a pattern, and a pattern is a reason to move. For the full picture, read [the signs it's time to switch accountants](/advice/signs-its-time-to-switch-accountants).",
      },
      { type: "h2", text: "The three myths that keep owners stuck" },
      {
        type: "p",
        text: "Myth one: \"I have to wait until my year-end.\" You don't. You can switch at any point in the year, and your new firm picks up mid-cycle without anything falling through the cracks. Here's [why you can switch mid-year](/advice/changing-accountants-mid-year).",
      },
      {
        type: "p",
        text: "Myth two: \"It'll cost me a fortune, or I'll pay twice.\" You don't pay two firms for the same work. In most cases the changeover itself costs you nothing. Your new firm does the legwork and your old firm must release your records free of charge. Here's [what switching actually costs](/advice/cost-of-switching-accountants).",
      },
      {
        type: "p",
        text: "Myth three: \"It's a huge hassle.\" The active work on your side is an hour or two, spread over a couple of weeks; your new accountant does almost everything else. It really is [easier than you think](/advice/switching-accountant-easier-than-you-think).",
      },
      { type: "h2", text: "When is the best time to switch?" },
      {
        type: "p",
        text: "The short answer: sooner than you think, and you don't need a perfect moment. That said, a few windows are especially clean: after your year-end accounts are filed, before the busy run-up to the 31 January self-assessment deadline, or at the start of a new VAT quarter. The worst time to switch is never: staying another year with a firm that isn't serving you costs more than any timing quirk. Here's [the best time to switch, explained](/advice/best-time-to-switch-accountants).",
      },
      { type: "h2", text: "How switching works, step by step" },
      {
        type: "p",
        text: "The whole process is more of a formality than a project. Here's the full sequence:",
      },
      {
        type: "ul",
        items: [
          "Choose your new accountant first: never resign from your current firm until the next one is lined up. Get the fit right before anything else.",
          "Sign up and give your details: your new firm runs standard anti-money-laundering identity checks and sends a letter of engagement setting out scope and price.",
          "They request professional clearance: your new accountant writes to your old one, a routine letter asking whether there's any reason they shouldn't act and requesting your records. You don't make that call yourself.",
          "Your records are handed over: previous accounts and tax returns, trial balance, payroll and VAT records, tax references. Reputable firms do this promptly and free.",
          "You authorise them with HMRC: usually via a code HMRC posts to you, or their agent services account. From there, your new firm takes over.",
        ],
      },
      {
        type: "p",
        text: "For the full walkthrough with timings, see [how to switch accountants, step by step](/advice/how-to-switch-accountants-step-by-step), and for the clearance letter itself, [professional clearance explained](/advice/professional-clearance-explained).",
      },
      { type: "h2", text: "What it costs" },
      {
        type: "p",
        text: "In most cases the switch itself is free: your old firm can't charge you to release your records, and your new firm folds the handover into taking you on. Where cost comes in is the ongoing fee for the new relationship, and there a slightly higher fee that includes proactive advice and planning is usually far better value than the cheapest quote on the table. Here's [the real cost of switching](/advice/cost-of-switching-accountants).",
      },
      { type: "h2", text: "If you run a limited company" },
      {
        type: "p",
        text: "There's a little more to hand over, like Companies House filing authority, corporation tax, directors' payroll and confirmation statements, but the process is the same, and your new accountant manages the extra steps. Here's what's different when [switching accountants for a limited company](/advice/switching-accountants-limited-company).",
      },
      { type: "h2", text: "How to choose the right new firm" },
      {
        type: "p",
        text: "This is the part worth slowing down for. Before you commit, get clear answers to:",
      },
      {
        type: "ul",
        items: [
          "Who, specifically, will look after my account, and how do I reach them?",
          "How quickly do you typically reply to a question?",
          "What's included in the fee, and what's billed as an extra?",
          "Will you contact me before deadlines with things to consider, or only at them?",
          "Do you have experience with businesses like mine: my sector, my size?",
          "How do you like to work: cloud software, meetings, email?",
        ],
      },
      {
        type: "p",
        text: "For the full list, see [the questions to ask before you hire an accountant](/advice/questions-to-ask-before-hiring-an-accountant).",
      },
      { type: "h2", text: "The switching checklist" },
      {
        type: "p",
        text: "Work through this in order and you can't go wrong. We've turned it into a free, branded one-page checklist you can print or save as a PDF. [Download the switching checklist](/switching-checklist).",
      },
      {
        type: "ul",
        items: [
          "Write down what's not working now, so you know what \"better\" looks like",
          "Shortlist firms that fit your sector, size and working style",
          "Ask each the questions above; compare scope, not just price",
          "Choose your new firm, before resigning from the old one",
          "Complete their ID checks and sign the letter of engagement",
          "Let them request professional clearance from your old firm",
          "Confirm your records have been handed over",
          "Authorise the new firm with HMRC (and Companies House, if a limited company)",
          "Diarise your next filing dates with the new firm",
          "Cancel any direct debit or standing order to the old firm",
        ],
      },
      { type: "h2", text: "The easiest way to switch" },
      {
        type: "p",
        text: "The hardest part of switching is simply choosing who to switch to. That's the bit Switch Books removes. We're a free service that matches business owners with the right local accounting firm. Tell us what's frustrating you and what you need, and we'll connect you with a firm that fits, who'll then handle the switch for you. There's no cost and no obligation.",
      },
    ],
    related: [
      { label: "How to switch accountants, step by step", href: "/advice/how-to-switch-accountants-step-by-step" },
      { label: "Signs it's time to switch", href: "/advice/signs-its-time-to-switch-accountants" },
      { label: "What switching actually costs", href: "/advice/cost-of-switching-accountants" },
      { label: "Download the free switching checklist", href: "/switching-checklist" },
      { label: "Get matched with a local firm", href: "/consultation" },
    ],
  },
  {
    slug: "do-you-need-an-accountant-for-self-assessment",
    title: "Do you need an accountant for self assessment?",
    category: "Tax & planning",
    excerpt:
      "Can you file a self assessment tax return yourself, or is it worth paying an accountant? When to do it alone, when to get help, and what it costs.",
    readingTime: "6 min read",
    publishedOn: "August 2026",
    author: "The Switch Books team",
    imageStyle: "blush",
    body: [
      {
        type: "p",
        text: "Every year millions of people file a self assessment tax return. Plenty do it themselves; plenty pay an accountant. Neither is right or wrong, it depends on how complex your affairs are and how much time and risk you want to carry. Here's how to decide which camp you're in.",
      },
      { type: "h2", text: "What is a self assessment tax return?" },
      {
        type: "p",
        text: "Self assessment is how HMRC collects tax from people whose income isn't taxed automatically through PAYE. You report your income and gains for the year, and the system works out what you owe. The key dates: register by 5 October if it's your first time, file a paper return by 31 October, or file online and pay by 31 January.",
      },
      { type: "h2", text: "Can you file it yourself?" },
      {
        type: "p",
        text: "For a simple situation, yes, and HMRC's online service is free. Doing it yourself is usually fine if your tax affairs are straightforward: you're employed with a little untaxed side income, you have a single rental property with simple figures, or you're a sole trader with tidy records and few expenses. If that's you, an accountant may be more than you need.",
      },
      { type: "h2", text: "When it's worth getting an accountant" },
      {
        type: "p",
        text: "The more moving parts your return has, the more an accountant earns their fee. It's usually worth getting help if any of these apply:",
      },
      {
        type: "ul",
        items: [
          "You have several sources of income to pull together",
          "You're self-employed with real expenses and want to claim everything you're entitled to",
          "You're a limited company director taking salary and dividends",
          "You're a landlord, especially with more than one property or the mortgage-interest rules to handle",
          "You have capital gains to report, from selling a property, shares or crypto",
          "Your income triggers the child benefit charge or personal-allowance tapering",
          "It's your first return and you're not confident you'll get it right",
          "You've had a penalty, or a letter from HMRC you don't fully understand",
          "You simply don't have the time, or the stress isn't worth it",
        ],
      },
      {
        type: "p",
        text: "The value isn't just filling in the boxes. A good accountant spots allowances and expenses you'd miss, keeps you the right side of the rules, and often saves you more than they charge, especially the first year they tidy things up.",
      },
      { type: "h2", text: "What does it cost?" },
      {
        type: "p",
        text: "A straightforward self assessment handled by an accountant is usually a modest one-off fee, with more complex returns costing more. Weigh that against the hours it would take you and the cost of getting it wrong: the penalty for filing late starts at £100 and climbs from there, before you count any interest on unpaid tax.",
      },
      { type: "h2", text: "How to choose the right accountant" },
      {
        type: "p",
        text: "If you decide to get help, look for a firm that regularly handles returns like yours, replies quickly, is clear about price, and tells you about things to consider before deadlines rather than at them. Our guide to [the questions to ask before you hire an accountant](/advice/questions-to-ask-before-hiring-an-accountant) covers exactly what to check, and [proactive tax planning](/advice/proactive-tax-planning-beats-year-end-surprises) explains the difference a forward-looking firm makes.",
      },
      {
        type: "p",
        text: "Switch Books isn't an accountancy firm. We're a free service that matches you with a local one that handles self assessment properly. Tell us about your situation and we'll connect you with a firm that fits, at no cost and no obligation.",
      },
    ],
    related: [
      { label: "Questions to ask before you hire an accountant", href: "/advice/questions-to-ask-before-hiring-an-accountant" },
      { label: "Proactive tax planning beats year-end surprises", href: "/advice/proactive-tax-planning-beats-year-end-surprises" },
      { label: "Get matched with a local firm", href: "/consultation" },
    ],
  },
  {
    slug: "payroll-services-small-business",
    title: "Payroll services for small business: what to look for",
    category: "Choosing an accountant",
    excerpt:
      "Looking at payroll services for your small business? Here's what's included, what it should cost, and how to choose a provider that fits.",
    readingTime: "5 min read",
    publishedOn: "July 2026",
    author: "The Switch Books team",
    imageStyle: "blush",
    body: [
      {
        type: "p",
        text: "Payroll looks simple until you run it. The moment you take on staff, getting people paid becomes a monthly deadline with HMRC filings, pension duties and statutory payments attached, and the penalties for getting it wrong land on you, not your employees. Here's what payroll services for a small business actually cover, roughly what they cost, and how to pick a provider that fits.",
      },
      { type: "h2", text: "What payroll services actually cover" },
      {
        type: "p",
        text: "A good payroll service does far more than produce payslips. For most small businesses it should include all of the following as standard:",
      },
      {
        type: "ul",
        items: [
          "Running each pay run and issuing compliant payslips",
          "Real Time Information (RTI) submissions to HMRC on or before each payday",
          "Workplace pension auto-enrolment: assessing staff, deductions and uploads to your provider",
          "Statutory payments, including sick, maternity, paternity and adoption pay",
          "Starters and leavers, tax codes and P45s",
          "Year-end filing and P60s for your team",
          "Directors' payroll and a sensible salary and dividend split",
          "CIS returns if you work in construction",
        ],
      },
      { type: "h2", text: "Signs you've outgrown doing it yourself" },
      {
        type: "ul",
        items: [
          "You've taken on your first employees and the rules suddenly matter",
          "It's quietly eating an evening every month",
          "You've had a late filing, or an HMRC penalty letter",
          "Pension re-enrolment is due and you're not sure what's required",
          "Staff questions about tax codes or statutory pay leave you guessing",
        ],
      },
      { type: "h2", text: "What payroll services cost for a small business" },
      {
        type: "p",
        text: "Most providers charge a small monthly base fee plus a per-payslip amount, so cost scales with headcount rather than landing as one big bill. For a handful of employees paid monthly, it's usually a modest monthly figure. What pushes it up is frequency (weekly payroll costs more than monthly), pension administration, CIS, and anything treated as an extra rather than included.",
      },
      {
        type: "p",
        text: "The number that matters isn't the headline price, it's what's inside it. A slightly higher fee that covers auto-enrolment, statutory pay and year-end is usually better value than a cheap quote with three add-ons bolted on later.",
      },
      { type: "h2", text: "Questions to ask a payroll provider" },
      {
        type: "ul",
        items: [
          "Is pension auto-enrolment included, or billed separately?",
          "Who deals with HMRC if there's a query, a penalty or a coding error?",
          "What's your deadline for me to send hours and changes each period?",
          "Are statutory sick and family pay calculations part of the service?",
          "What happens at year end, and is that included in the fee?",
          "Can my staff access their own payslips and P60s?",
        ],
      },
      { type: "h2", text: "Software you run, or a firm that runs it for you" },
      {
        type: "p",
        text: "There are two routes. Payroll software you operate yourself is cheaper, but the compliance stays your problem: your deadlines, your filings, your penalties. A firm running payroll for you costs more, but the deadlines and pension duties become their job, and you get someone to ask when something unusual comes up. Once you're past a couple of employees, most owners find the second option pays for itself in time and avoided mistakes.",
      },
      { type: "h2", text: "Choosing the right firm" },
      {
        type: "p",
        text: "Payroll is a monthly relationship, not a once-a-year filing, so responsiveness matters more here than almost anywhere else. Look for a firm that answers quickly, tells you its cut-off dates clearly, and handles pensions without being chased.",
      },
      {
        type: "p",
        text: "Switch Books isn't a payroll bureau. We're a free service that matches you with a local accounting firm that runs payroll properly. Tell us your team size and how often you pay them, and we'll find a firm that fits.",
      },
    ],
    related: [
      { label: "Payroll & auto-enrolment services", href: "/services/payroll" },
      {
        label: "Questions to ask before you hire an accountant",
        href: "/advice/questions-to-ask-before-hiring-an-accountant",
      },
      { label: "Get matched with a local firm", href: "/consultation" },
    ],
  },
  {
    slug: "how-to-switch-accountants-step-by-step",
    title: "How to switch accountants: a simple step-by-step guide",
    category: "Switching",
    excerpt:
      "Switching accountants is far easier than most owners fear. Here's exactly how it works, step by step, and how long each stage really takes.",
    readingTime: "6 min read",
    publishedOn: "July 2026",
    author: "The Switch Books team",
    imageStyle: "default",
    body: [
      {
        type: "p",
        text: "Most business owners stay with an accountant they've outgrown for one reason: they think leaving will be a hassle. It isn't. Your new accountant does almost all of the work, and you can switch at any point in the year without disrupting your accounts. Here's the whole process, start to finish, so you know exactly what to expect.",
      },
      { type: "h2", text: "Step 1: Choose your new accountant first" },
      {
        type: "p",
        text: "Never resign from your current firm until you've lined up the next one. Once you've chosen a new accountant, they lead the changeover. Take your time getting the choice right, because a good fit for your sector, size and the way you like to work matters far more than saving a few pounds a month.",
      },
      { type: "h2", text: "Step 2: Sign up and give your details" },
      {
        type: "p",
        text: "Your new firm will run standard anti-money-laundering identity checks and ask you to sign a letter of engagement. This sets out what they'll do and what it costs. It's the point where a good firm shows its colours: clear scope, clear price, no surprises.",
      },
      { type: "h2", text: "Step 3: They request professional clearance" },
      {
        type: "p",
        text: "Your new accountant writes to your old one, a formality called professional clearance. It asks whether there's any reason they shouldn't act for you, and requests your records and information. You don't have to have an awkward conversation yourself. Your old firm is professionally obliged to hand over your paperwork.",
      },
      { type: "h2", text: "Step 4: Records are handed over" },
      {
        type: "p",
        text: "Once clearance is granted, your old accountant passes on the essentials: previous accounts and tax returns, your trial balance, payroll and VAT records, and any tax reference details. Reputable firms do this promptly and free of charge.",
      },
      { type: "h2", text: "Step 5: Authorise them with HMRC" },
      {
        type: "p",
        text: "Finally, you authorise your new accountant to deal with HMRC on your behalf, usually via a code HMRC posts to you, or through their agent services account. From there, they take over filing and correspondence.",
      },
      { type: "h2", text: "How long does it take?" },
      {
        type: "p",
        text: "The active work on your side is an hour or two, spread over a couple of weeks. The main variable is how quickly your old accountant responds to the clearance letter. Most switches complete comfortably within two to four weeks.",
      },
      {
        type: "ul",
        items: [
          "You don't need to wait for your year-end to switch",
          "You don't pay two firms at once for the same work",
          "Your new firm handles the handover and HMRC authorisation",
          "Your old firm must release your records",
        ],
      },
      {
        type: "p",
        text: "The hardest part is simply deciding to do it. If you'd like the choice made easier, tell us what's not working and we'll match you with a local firm that fits, then they'll handle the switch for you.",
      },
    ],
    related: [
      { label: "Professional clearance, explained", href: "/advice/professional-clearance-explained" },
      { label: "Can you switch mid-year?", href: "/advice/changing-accountants-mid-year" },
      { label: "What does switching cost?", href: "/advice/cost-of-switching-accountants" },
      { label: "Get matched with a local firm", href: "/consultation" },
    ],
  },
  {
    slug: "professional-clearance-explained",
    title: "Professional clearance: what it is and how it works",
    category: "Switching",
    excerpt:
      "The bit of the switch that sounds formal but takes you almost no effort. Here's what professional clearance is, who does it, and what to expect.",
    readingTime: "4 min read",
    publishedOn: "July 2026",
    author: "The Switch Books team",
    imageStyle: "blush",
    body: [
      {
        type: "p",
        text: "When you move accountants, you'll hear the phrase \"professional clearance\". It sounds like red tape, but it's actually the mechanism that makes switching painless, because it puts the work on your new accountant, not you.",
      },
      { type: "h2", text: "What professional clearance actually is" },
      {
        type: "p",
        text: "Professional clearance is a standard letter your new accountant sends to your old one. It does two things: it asks whether there are any professional reasons they shouldn't take you on, and it requests the records and information needed to act for you. It's a courtesy between firms and a normal part of any changeover.",
      },
      { type: "h2", text: "What you have to do" },
      {
        type: "p",
        text: "Almost nothing. You give your new firm your old accountant's details and sign a short authority so they can request your information. That's it. You don't have to write to your old accountant or explain yourself.",
      },
      { type: "h2", text: "Do you have to tell your old accountant you're leaving?" },
      {
        type: "p",
        text: "It's polite to, and a brief email is plenty, but the clearance letter formally notifies them anyway. There's no need for a difficult conversation. Firms change clients all the time; it's routine.",
      },
      { type: "h2", text: "What if your old firm is slow, or you owe them money?" },
      {
        type: "ul",
        items: [
          "They can't hold your records to ransom, but they can withhold some documents until outstanding fees are paid, so settle any genuine bill",
          "Your basic records and information must still be passed on",
          "If they drag their feet, your new accountant will chase; persistent delays are rare",
        ],
      },
      {
        type: "p",
        text: "In short, professional clearance is the reason switching feels so much lighter than people expect. Choose the right new firm and they carry the process. If you'd like help choosing, take the free review and we'll match you.",
      },
    ],
    related: [
      { label: "How to switch, step by step", href: "/advice/how-to-switch-accountants-step-by-step" },
      { label: "Questions to ask a new accountant", href: "/advice/questions-to-ask-before-hiring-an-accountant" },
      { label: "Get matched with a local firm", href: "/consultation" },
    ],
  },
  {
    slug: "changing-accountants-mid-year",
    title: "Can you change accountants mid-year? Yes, and here's how",
    category: "Switching",
    excerpt:
      "You don't have to wait for your year-end to move. Switching part-way through the year is common, straightforward and often the smart choice.",
    readingTime: "4 min read",
    publishedOn: "June 2026",
    author: "The Switch Books team",
    imageStyle: "mocha",
    body: [
      {
        type: "p",
        text: "One of the most common myths about switching accountants is that you have to wait until your financial year ends. You don't. You can change accountants at any point in the year, and for a lot of owners, mid-year is actually the better time to do it.",
      },
      { type: "h2", text: "Why mid-year switching works fine" },
      {
        type: "p",
        text: "Your accounting records are continuous. When you move, your new firm picks up from wherever you are, using the figures to date and the last set of finalised accounts. Nothing is lost and nothing has to be redone. Bookkeeping software makes the handover smoother still.",
      },
      { type: "h2", text: "When mid-year is the smart choice" },
      {
        type: "ul",
        items: [
          "Your current accountant has gone quiet and a deadline is coming; a proactive firm can steady the ship now rather than in a panic later",
          "You've had a poor year-end experience and don't want a repeat",
          "Your business has changed (new VAT registration, first employee, a big contract) and you need better advice today",
          "You're heading into a busy trading period and want support in place before it hits",
        ],
      },
      { type: "h2", text: "The one thing to check" },
      {
        type: "p",
        text: "Look at what you've already paid your current accountant. If you've paid annually up front, you may have covered work that hasn't been done yet, so it's worth clarifying before you leave. It rarely changes the decision, but it's good to know where you stand.",
      },
      { type: "h2", text: "What about payroll and VAT?" },
      {
        type: "p",
        text: "These carry over cleanly. Your new accountant takes on the filing from an agreed date and coordinates with HMRC so nothing is missed and nothing is filed twice. A tidy handover of payroll and VAT is a good early test of how organised your new firm is.",
      },
      {
        type: "p",
        text: "So don't let the calendar hold you back. If something isn't working now, it's worth fixing now. Take the free review and we'll match you with a firm that can step in whenever suits you.",
      },
    ],
    related: [
      { label: "How to switch, step by step", href: "/advice/how-to-switch-accountants-step-by-step" },
      { label: "The best time of year to switch", href: "/advice/best-time-to-switch-accountants" },
      { label: "Get matched with a local firm", href: "/consultation" },
    ],
  },
  {
    slug: "cost-of-switching-accountants",
    title: "How much does it cost to switch accountants?",
    category: "Switching",
    excerpt:
      "The switch itself is usually free. Here's what you should and shouldn't be charged, and how to compare new quotes without getting stung.",
    readingTime: "4 min read",
    publishedOn: "June 2026",
    author: "The Switch Books team",
    imageStyle: "default",
    body: [
      {
        type: "p",
        text: "Worrying about the cost is one of the biggest reasons owners put off switching. The good news: the act of switching accountants is usually free. What you're really comparing is the ongoing fee for a better service. Here's how to think about both.",
      },
      { type: "h2", text: "The switch itself is normally free" },
      {
        type: "p",
        text: "Reputable firms don't charge you to take you on, and your old firm shouldn't charge to release your records as part of professional clearance. If a firm quotes a setup or onboarding fee, ask exactly what it's for; many good firms have none.",
      },
      { type: "h2", text: "What you might legitimately pay" },
      {
        type: "ul",
        items: [
          "Any outstanding fees you genuinely owe your current accountant for work already done",
          "Work in progress, if your old firm has partly completed your accounts",
          "Occasionally, a small charge for producing extra copies of historic documents",
        ],
      },
      { type: "h2", text: "Comparing ongoing fees the right way" },
      {
        type: "p",
        text: "Don't just compare headline monthly prices. Compare what's included. A slightly higher fee that covers proactive advice, quick replies and tax planning is usually far better value than a cheap fee that only buys bare compliance. Ask each firm to spell out what is and isn't in the price.",
      },
      { type: "h2", text: "Watch for the false economy" },
      {
        type: "p",
        text: "The most expensive accountant is often the cheap one who misses a tax-saving opportunity, files late, or never picks up the phone. Weigh the fee against what a proactive firm could save you and the stress it takes away.",
      },
      {
        type: "p",
        text: "Want a fair comparison without the sales pressure? Tell us your situation and budget, and we'll match you with local firms whose fees and service actually fit, so you can compare like for like.",
      },
    ],
    related: [
      { label: "How to switch, step by step", href: "/advice/how-to-switch-accountants-step-by-step" },
      { label: "What good advice is worth", href: "/advice/what-good-business-advice-actually-looks-like" },
      { label: "See the services firms cover", href: "/services" },
    ],
  },
  {
    slug: "best-time-to-switch-accountants",
    title: "When is the best time to switch accountants?",
    category: "Switching",
    excerpt:
      "You can move any time, but some moments make the handover cleaner. Here's how to pick the right window for your business.",
    readingTime: "3 min read",
    publishedOn: "July 2026",
    author: "The Switch Books team",
    imageStyle: "blush",
    body: [
      {
        type: "p",
        text: "You can switch accountants at any time of year, but if you have a choice, a few moments make the handover especially clean. Here's how to time it well, and why you shouldn't wait too long for the \"perfect\" moment.",
      },
      { type: "h2", text: "Just after your year-end accounts are filed" },
      {
        type: "p",
        text: "This is the tidiest handover point. Your accounts and tax return are done, there's a clear line in the sand, and your new firm starts a fresh year with everything closed off behind them.",
      },
      { type: "h2", text: "Well before a deadline, not during a crisis" },
      {
        type: "p",
        text: "Switching a week before your self-assessment or corporation tax deadline is possible but stressful. Give a new firm a little runway. A few weeks' breathing space means they can take over calmly and spot anything that needs attention.",
      },
      { type: "h2", text: "When something changes in your business" },
      {
        type: "ul",
        items: [
          "You've registered for VAT or are about to",
          "You're taking on your first employee and need payroll",
          "You're changing structure, for example sole trader to limited company",
          "You're planning to grow, raise finance or sell",
        ],
      },
      { type: "h2", text: "Don't wait for perfect" },
      {
        type: "p",
        text: "The single worst time to switch is \"later\", if later means enduring another year of poor service. If your accountant is letting you down now, the best time is soon. A good firm will make whatever timing you choose work.",
      },
      {
        type: "p",
        text: "Not sure when makes sense for you? Take the free review and we'll match you with a local firm and help you plan the timing.",
      },
    ],
    related: [
      { label: "How to switch, step by step", href: "/advice/how-to-switch-accountants-step-by-step" },
      { label: "Can you switch mid-year?", href: "/advice/changing-accountants-mid-year" },
      { label: "Get matched with a local firm", href: "/consultation" },
    ],
  },
  {
    slug: "switching-accountants-limited-company",
    title: "Switching accountants as a limited company: what to know",
    category: "Switching",
    excerpt:
      "Moving firms as a limited company is straightforward, but there are a few extra records and filings to hand over cleanly. Here's the checklist.",
    readingTime: "5 min read",
    publishedOn: "July 2026",
    author: "The Switch Books team",
    imageStyle: "mocha",
    body: [
      {
        type: "p",
        text: "Switching accountants when you run a limited company follows the same simple path as any other switch, but there are a few company-specific pieces to hand over. Get these right and the changeover is seamless.",
      },
      { type: "h2", text: "The process is the same" },
      {
        type: "p",
        text: "You choose a new firm, they request professional clearance from your old one, your records are handed over, and you authorise them with HMRC and Companies House. Your new accountant leads it, just as with a sole trader.",
      },
      { type: "h2", text: "The extra records to make sure you get" },
      {
        type: "ul",
        items: [
          "Statutory accounts and corporation tax (CT600) returns for recent years",
          "Your company's tax reference (UTR) and Companies House authentication code",
          "The company register, share information and any dividend vouchers",
          "Director's payroll and any director's loan account records",
          "VAT and bookkeeping data up to the handover date",
        ],
      },
      { type: "h2", text: "Two authorisations, not one" },
      {
        type: "p",
        text: "As a company you may want your new accountant authorised for both HMRC (corporation tax, VAT, PAYE) and, if they file for you, Companies House. It's routine, but worth confirming so nothing falls between the two.",
      },
      { type: "h2", text: "Don't miss a filing in the gap" },
      {
        type: "p",
        text: "The one risk in any company switch is a deadline slipping through during the handover, a confirmation statement or accounts due to Companies House, say. A good new firm maps your filing dates on day one so nothing is missed. If yours doesn't mention them, ask.",
      },
      { type: "h2", text: "A cleaner set of numbers on the way in" },
      {
        type: "p",
        text: "Switching is also a natural moment to tidy up: agree your chart of accounts, get your bookkeeping onto software both you and the firm can see, and set expectations for management figures through the year.",
      },
      {
        type: "p",
        text: "If you'd like a firm that handles limited company accounts properly and actually advises you through the year, take the free review and we'll match you with the right local option.",
      },
    ],
    related: [
      { label: "How to switch, step by step", href: "/advice/how-to-switch-accountants-step-by-step" },
      { label: "Professional clearance, explained", href: "/advice/professional-clearance-explained" },
      { label: "See the services firms cover", href: "/services" },
    ],
  },
  {
    slug: "signs-its-time-to-switch-accountants",
    title: "7 signs it's time to switch accountants",
    category: "Choosing an accountant",
    excerpt:
      "Not sure if it's them or you? Here are the clearest signs your accountant is holding your business back, and what good should feel like instead.",
    readingTime: "4 min read",
    publishedOn: "June 2026",
    author: "The Switch Books team",
    imageStyle: "default",
    body: [
      {
        type: "p",
        text: "Most owners don't leave their accountant over one dramatic event. They drift for years feeling underserved, telling themselves it's normal. It usually isn't. Here are the signs that it's time to find someone better, and what a good firm should feel like instead.",
      },
      { type: "h2", text: "1. You only hear from them at deadlines" },
      {
        type: "p",
        text: "A good accountant is in touch through the year with ideas and warnings, not just a once-a-year request for your records and an invoice. If the only contact you get is a deadline reminder, you're getting compliance, not advice.",
      },
      { type: "h2", text: "2. Your bills are a surprise" },
      {
        type: "p",
        text: "Fees should be agreed up front and predictable. Surprise charges for 'extra time' or a tax bill you weren't warned about are signs of poor communication, not complex circumstances.",
      },
      { type: "h2", text: "3. You don't understand your own accounts" },
      {
        type: "p",
        text: "If your year-end accounts arrive as a PDF you file away without understanding, your accountant isn't doing their job. Good advisers explain what the numbers mean for you, in plain English.",
      },
      { type: "h2", text: "The other signs to watch for" },
      {
        type: "ul",
        items: [
          "Slow or no replies to emails and calls",
          "Mistakes, or filings that have been late",
          "No proactive tax planning before year-end",
          "You've grown, but the service hasn't kept up",
        ],
      },
      {
        type: "p",
        text: "Recognise a few of these? You're not being fussy. You're being underserved. Our free review takes a couple of minutes and helps us match you with a local firm that does it properly.",
      },
    ],
    related: [
      { label: "How to switch, step by step", href: "/advice/how-to-switch-accountants-step-by-step" },
      { label: "Switching is easier than you think", href: "/advice/switching-accountant-easier-than-you-think" },
      { label: "Get matched with a local firm", href: "/consultation" },
    ],
  },
  {
    slug: "switching-accountant-easier-than-you-think",
    title: "Switching accountant is easier than you think",
    category: "Switching",
    excerpt:
      "The fear of hassle keeps owners with the wrong accountant for years. Here's how a switch works, and why it's far simpler than most expect.",
    readingTime: "3 min read",
    publishedOn: "June 2026",
    author: "The Switch Books team",
    imageStyle: "blush",
    body: [
      {
        type: "p",
        text: "By far the most common reason owners stay with an accountant they've outgrown is the fear of hassle. The good news: switching is a well-trodden, standardised process, and the firm you move to does almost all of it for you.",
      },
      { type: "h2", text: "You don't have to have an awkward conversation" },
      {
        type: "p",
        text: "You don't need to call your current accountant and explain yourself. Your new firm writes to them with a standard 'professional clearance' letter, requesting the information and records they need. It's routine, and it's expected.",
      },
      { type: "h2", text: "What happens in practice" },
      {
        type: "ul",
        items: [
          "You give your new firm the go-ahead and basic details",
          "They request professional clearance and your records",
          "They handle authorisations with HMRC and Companies House",
          "They pick the cleanest point in the year to take over",
        ],
      },
      { type: "h2", text: "How long does it take?" },
      {
        type: "p",
        text: "Most of the work is done within a few weeks, and very little of it lands on you. The main thing you'll notice is that the right firm makes the whole thing feel effortless, which is rather the point.",
      },
      {
        type: "p",
        text: "Want us to find the right firm for you first? Take the free review and we'll match you with a local one that fits your needs and budget.",
      },
    ],
    related: [
      { label: "How to switch, step by step", href: "/advice/how-to-switch-accountants-step-by-step" },
      { label: "Professional clearance, explained", href: "/advice/professional-clearance-explained" },
      { label: "How much does switching cost?", href: "/advice/cost-of-switching-accountants" },
    ],
  },
  {
    slug: "questions-to-ask-before-hiring-an-accountant",
    title: "Questions to ask before you hire an accountant",
    category: "Choosing an accountant",
    excerpt:
      "Before you commit, ask these questions. The answers tell you whether you'll get a proactive partner, or another once-a-year filer.",
    readingTime: "4 min read",
    publishedOn: "May 2026",
    author: "The Switch Books team",
    imageStyle: "default",
    body: [
      {
        type: "p",
        text: "Choosing an accountant on price alone is how owners end up underserved. A few good questions up front tell you far more than a quote ever will.",
      },
      { type: "h2", text: "Ask about communication" },
      {
        type: "ul",
        items: [
          "How often will we speak through the year?",
          "Who is my main point of contact, and how quickly do you reply?",
          "Will you explain my accounts in plain English?",
        ],
      },
      { type: "h2", text: "Ask about fees" },
      {
        type: "ul",
        items: [
          "Is the fee fixed and agreed up front?",
          "What's included, and what counts as 'extra'?",
          "Will you warn me about tax bills in advance?",
        ],
      },
      { type: "h2", text: "Ask about fit" },
      {
        type: "p",
        text: "Do they work with businesses like yours, at your stage and in your sector? A firm that understands your world gives better advice. This is what we screen for when we match you, so you don't have to interview a dozen firms yourself.",
      },
    ],
  },
  {
    slug: "proactive-tax-planning-beats-year-end-surprises",
    title: "Why proactive tax planning beats a year-end surprise",
    category: "Tax & planning",
    excerpt:
      "The best tax work happens before your year ends, not after. Here's why a proactive accountant can save you money a reactive one never will.",
    readingTime: "3 min read",
    publishedOn: "May 2026",
    author: "The Switch Books team",
    imageStyle: "default",
    body: [
      {
        type: "p",
        text: "There's a world of difference between an accountant who reports your tax and one who plans it. The first tells you what you owe after the year has closed. The second helps you arrange things during the year so you pay less, within the rules.",
      },
      { type: "h2", text: "Planning is a year-round job" },
      {
        type: "p",
        text: "Timing of purchases, how you draw money from the business, pension contributions, allowances and reliefs: these only help if they're considered before your year-end, not after. By the time the year has closed, most of the opportunities have closed with it.",
      },
      { type: "h2", text: "It's all above board" },
      {
        type: "p",
        text: "Good planning isn't aggressive or risky. It's simply using the reliefs and allowances you're entitled to, with foresight. A proactive firm builds this in as standard.",
      },
      {
        type: "p",
        text: "If your current accountant has never raised tax planning with you, that tells you something. We can match you with a firm that treats it as part of the job.",
      },
    ],
  },
  {
    slug: "bookkeeping-basics-getting-your-numbers-right",
    title: "Bookkeeping basics: getting your numbers right",
    category: "Bookkeeping & software",
    excerpt:
      "Clean, current books are the foundation of every good decision. Here's what 'good' looks like, and the signs yours need attention.",
    readingTime: "4 min read",
    publishedOn: "April 2026",
    author: "The Switch Books team",
    imageStyle: "blush",
    body: [
      {
        type: "p",
        text: "Bookkeeping isn't glamorous, but it's the foundation everything else sits on. Tax planning, cash-flow forecasting, knowing whether you can afford to hire: none of it works if the underlying numbers are wrong or months out of date.",
      },
      { type: "h2", text: "What good bookkeeping looks like" },
      {
        type: "ul",
        items: [
          "Books reconciled regularly, not once a year",
          "Cloud software set up properly (Xero, QuickBooks, FreeAgent)",
          "Receipts and invoices captured as you go",
          "A clear monthly picture of where you stand",
        ],
      },
      { type: "h2", text: "Signs yours needs attention" },
      {
        type: "p",
        text: "If you're not sure your figures are right, if receipts pile up until panic sets in, or if you can't get a straight answer on how the business is doing right now, your bookkeeping needs help, and probably a fresh pair of hands.",
      },
      {
        type: "p",
        text: "Take the free review and we'll match you with a local firm that gets your books clean, current and trustworthy.",
      },
    ],
  },
  {
    slug: "what-good-business-advice-actually-looks-like",
    title: "What good business advice looks like",
    category: "Growth & advice",
    excerpt:
      "Most owners have never had a proper financial conversation with their accountant. Here's what you should be getting, and what it's worth.",
    readingTime: "3 min read",
    publishedOn: "April 2026",
    author: "The Switch Books team",
    imageStyle: "default",
    body: [
      {
        type: "p",
        text: "Ask most owners what advice they've had from their accountant and you'll get a blank look. Compliance, yes. Advice, rarely. But the right adviser can be one of the most valuable relationships your business has.",
      },
      { type: "h2", text: "Advice is a conversation, not a report" },
      {
        type: "p",
        text: "Good advisory means regular conversations about the things that keep you up at night: cash flow, profit, whether you can afford to grow, and what the numbers are quietly telling you. It's forward-looking, not a post-mortem.",
      },
      { type: "h2", text: "What it should cover" },
      {
        type: "ul",
        items: [
          "Cash-flow forecasting, so surprises are spotted early",
          "Management accounts you understand",
          "Budgeting and scenario planning for big decisions",
          "A sounding board who knows your business",
        ],
      },
      {
        type: "p",
        text: "If that sounds like a step up from what you have now, it probably is. Take the free review and we'll match you with a firm that offers it.",
      },
    ],
  },
];

// Reciprocal cluster linking: the pillar guide links DOWN to every switching
// article from its body; here we ensure every switching article links back UP to
// the pillar (as the first "Related reading" item). Authority then flows both
// ways, which is what makes a pillar page rank. Done in one place so we don't
// hand-edit each article's `related` list.
const PILLAR_SLUG = "complete-guide-to-switching-accountants";
const PILLAR_LINK = {
  label: "The complete guide to switching accountants",
  href: `/advice/${PILLAR_SLUG}`,
};
for (const post of blogPosts) {
  if (post.category !== "Switching" || post.slug === PILLAR_SLUG) continue;
  post.related = post.related ?? [];
  if (!post.related.some((r) => r.href === PILLAR_LINK.href)) {
    post.related.unshift({ ...PILLAR_LINK });
  }
}

export function findPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

// "More reading" suggestions, as a ring: the next `limit` posts after this one
// (wrapping around the end). A ring guarantees every post is linked from exactly
// `limit` other posts, so none get orphaned with a single internal link, which
// a category-preference approach did to posts in singleton categories. Posts are
// ordered with topical clusters (e.g. the switching guides) adjacent, so the
// neighbours stay relevant.
export function relatedPosts(slug: string, limit = 2): BlogPost[] {
  const i = blogPosts.findIndex((p) => p.slug === slug);
  if (i === -1) return blogPosts.slice(0, limit);
  const out: BlogPost[] = [];
  for (let k = 1; k <= limit && k < blogPosts.length; k++) {
    out.push(blogPosts[(i + k) % blogPosts.length]);
  }
  return out;
}
