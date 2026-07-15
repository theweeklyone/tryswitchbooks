// Insight articles for business owners. Each item powers /advice and
// /advice/[slug]. Content is matching-service friendly: we help owners choose
// and switch accountants, we don't provide the accounting ourselves.
//
// ADDING AN ARTICLE — required for the build to pass (enforced by
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

export function findPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

// "More reading" suggestions. Prefers posts in the same category so topical
// clusters (e.g. the switching guides) interlink strongly, then fills with the
// most recent others. Keeps the current post out.
export function relatedPosts(slug: string, limit = 2): BlogPost[] {
  const current = findPost(slug);
  const rest = blogPosts.filter((p) => p.slug !== slug);
  if (!current) return rest.slice(0, limit);
  const sameCategory = rest.filter((p) => p.category === current.category);
  const others = rest.filter((p) => p.category !== current.category);
  return [...sameCategory, ...others].slice(0, limit);
}
