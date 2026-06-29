// Insight articles for business owners. Each item powers /advice and
// /advice/[slug]. Content is matching-service friendly: we help owners choose
// and switch accountants, we don't provide the accounting ourselves.

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
};

export const blogPosts: BlogPost[] = [
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
