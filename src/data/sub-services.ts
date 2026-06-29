// Sub-service SEO pages. Each sits under a pillar service (parentSlug) and has
// its own route /services/[parentSlug]/[slug]. Unique content per page so they
// stand as proper landing pages, not thin doorway pages.
//
// Framing (as everywhere): Switch Books matches the owner with a local firm
// that provides the service. We don't provide it ourselves.

export type SubServiceFaq = { q: string; a: string };

export type SubService = {
  slug: string;
  parentSlug: string;
  name: string;
  headline: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  whatItCovers: string[];
  whyItMatters: string;
  faq: SubServiceFaq[];
};

export const subServices: SubService[] = [
  // ─── Bookkeeping ──────────────────────────────────────────────────────────
  {
    slug: "cloud-bookkeeping",
    parentSlug: "bookkeeping",
    name: "Cloud Bookkeeping",
    headline: "Cloud bookkeeping that keeps your numbers current",
    metaTitle: "Cloud Bookkeeping",
    metaDescription:
      "Get matched with a local firm for cloud bookkeeping in Xero, QuickBooks or FreeAgent. Your numbers, always up to date. Take the free review.",
    intro:
      "Cloud bookkeeping keeps your accounts live and accurate, so you always know where your business stands. No more shoeboxes of receipts or scrambling at year end.",
    whatItCovers: [
      "Setting up and running your books in Xero, QuickBooks or FreeAgent",
      "Daily or weekly recording of sales, purchases and bank transactions",
      "Bank feeds connected so transactions flow in automatically",
      "Categorising income and expenses correctly for your tax return",
      "Keeping records ready for VAT returns and Making Tax Digital",
      "Real-time reports you can check from your phone or laptop",
    ],
    whyItMatters:
      "When your books are current, you make better decisions and avoid nasty surprises at year end. A good local firm sets the software up properly and keeps it tidy, so your accountant has clean figures to work from and HMRC deadlines never catch you out.",
    faq: [
      {
        q: "Which cloud software will I need?",
        a: "Most firms work with Xero, QuickBooks or FreeAgent. The firm we match you with will recommend the one that suits your business and handle the setup.",
      },
      {
        q: "Do I still need to keep paper receipts?",
        a: "Usually not. Once your records are digital and stored in the cloud, you can capture receipts by photo and meet Making Tax Digital rules without the paperwork.",
      },
    ],
  },
  {
    slug: "bank-reconciliation",
    parentSlug: "bookkeeping",
    name: "Bank Reconciliation",
    headline: "Bank reconciliation done right, every month",
    metaTitle: "Bank Reconciliation",
    metaDescription:
      "Get matched with a local firm for bank reconciliation that keeps your accounts accurate and your records matched. Take the free review.",
    intro:
      "Bank reconciliation matches every transaction in your accounts against your actual bank statements. It catches errors, missed payments and duplicates before they become a problem.",
    whatItCovers: [
      "Matching bank feed transactions to invoices, bills and receipts",
      "Spotting duplicates, missing entries and uncategorised items",
      "Checking the closing balance agrees with your bank statement",
      "Reviewing card payments, direct debits and standing orders",
      "Flagging unusual transactions that need your attention",
      "Keeping a clean audit trail for your accountant and HMRC",
    ],
    whyItMatters:
      "Unreconciled accounts hide mistakes and make your reports useless. A good local firm reconciles your books regularly, so your figures can be trusted and your VAT and tax returns are built on solid numbers.",
    faq: [
      {
        q: "How often should my bank be reconciled?",
        a: "Most businesses benefit from monthly reconciliation, though high-volume traders often do it weekly. The firm we match you with will set a rhythm that fits your business.",
      },
    ],
  },
  {
    slug: "invoicing-credit-control",
    parentSlug: "bookkeeping",
    name: "Invoicing & Credit Control",
    headline: "Invoicing and credit control to get you paid faster",
    metaTitle: "Invoicing & Credit Control",
    metaDescription:
      "Get matched with a local firm for invoicing and credit control that chases late payers and improves your cash flow. Take the free review.",
    intro:
      "Late payments choke cash flow and eat your time. Good invoicing and credit control gets bills out promptly and chases what you are owed, so the money lands when it should.",
    whatItCovers: [
      "Raising and sending professional invoices through your accounting software",
      "Setting clear payment terms and automated reminders",
      "Tracking who owes you and how overdue each invoice is",
      "Chasing late payers by email, statement and phone",
      "Allocating payments received against the right invoices",
      "Reporting on your debtor days and outstanding balances",
    ],
    whyItMatters:
      "Cash flow is what keeps your business alive, and unpaid invoices are cash you have already earned. A good local firm keeps your invoicing tidy and chases politely but firmly, so you spend less time on awkward calls and more time running your business.",
    faq: [
      {
        q: "Will chasing customers damage my relationships?",
        a: "Done well, it does the opposite. A good firm chases professionally and consistently, which most customers respect, and it keeps the conversation about the invoice rather than you.",
      },
      {
        q: "Can reminders be sent automatically?",
        a: "Yes. Xero, QuickBooks and FreeAgent can send automatic reminders as invoices fall due, and the firm we match you with will set these up for you.",
      },
    ],
  },
  {
    slug: "supplier-payments",
    parentSlug: "bookkeeping",
    name: "Supplier Bills & Payment Runs",
    headline: "Supplier bills and payment runs, handled on time",
    metaTitle: "Supplier Bills & Payment Runs",
    metaDescription:
      "Get matched with a local firm for supplier bills and payment runs that keep records tidy and suppliers paid on time. Take the free review.",
    intro:
      "Managing supplier bills and payment runs means every invoice is recorded, approved and paid on schedule. Nothing gets missed, double paid or left until a supplier chases you.",
    whatItCovers: [
      "Recording supplier invoices in your accounting software",
      "Capturing bills by email or photo and filing them digitally",
      "Checking invoices against orders and agreed prices",
      "Preparing scheduled payment runs for your approval",
      "Tracking what you owe and when each bill is due",
      "Keeping supplier statements reconciled and up to date",
    ],
    whyItMatters:
      "Paying suppliers late risks your reputation and your supply, while paying twice wastes money you cannot easily get back. A good local firm keeps your purchase ledger accurate and your payment runs organised, so you keep control of cash without the last-minute panic.",
    faq: [
      {
        q: "Will the firm pay my suppliers directly?",
        a: "Most firms prepare the payment run and the figures for you to approve and release, so you keep full control of your bank. Some can arrange wider access if you want them to.",
      },
    ],
  },
  {
    slug: "expense-management",
    parentSlug: "bookkeeping",
    name: "Expense & Receipt Management",
    headline: "Expense and receipt management without the shoebox",
    metaTitle: "Expense & Receipt Management",
    metaDescription:
      "Get matched with a local firm for expense and receipt management that captures every claim and keeps you compliant. Take the free review.",
    intro:
      "Expense and receipt management captures every business cost the moment it happens, so nothing is lost and no allowable claim is missed. Photograph the receipt and the rest is handled.",
    whatItCovers: [
      "Capturing receipts by photo through apps like Dext or Hubdoc",
      "Recording and categorising staff and business expenses",
      "Matching expenses to the right transactions in your books",
      "Tracking mileage, subsistence and out-of-pocket claims",
      "Keeping digital records that meet Making Tax Digital rules",
      "Reclaiming the right VAT on qualifying purchases",
    ],
    whyItMatters:
      "Lost receipts mean lost tax relief, and messy expense records cost you time and money at year end. A good local firm puts a simple capture process in place and keeps it tidy, so every allowable cost is claimed and your records stand up to HMRC scrutiny.",
    faq: [
      {
        q: "Do I need to keep the paper receipt?",
        a: "In most cases no. Once a receipt is captured digitally and stored, it satisfies HMRC and Making Tax Digital, so you can recycle the paper copy.",
      },
      {
        q: "Which apps are used to capture receipts?",
        a: "Dext and Hubdoc are common, and Xero, QuickBooks and FreeAgent have built-in capture too. The firm we match you with will set up whichever fits your routine.",
      },
    ],
  },
  {
    slug: "software-setup-training",
    parentSlug: "bookkeeping",
    name: "Accounting Software Setup & Training",
    headline: "Accounting software setup and training done for you",
    metaTitle: "Software Setup & Training",
    metaDescription:
      "Get matched with a local firm for accounting software setup and training on Xero, QuickBooks or FreeAgent. Take the free review.",
    intro:
      "Getting your accounting software set up correctly from the start saves months of mess later. The right setup and a bit of training means you and your team use it with confidence.",
    whatItCovers: [
      "Choosing the right package: Xero, QuickBooks or FreeAgent",
      "Setting up your chart of accounts, VAT settings and bank feeds",
      "Migrating data and opening balances from your old system",
      "Connecting apps for receipts, payments and reporting",
      "Hands-on training for you and your team on day-to-day tasks",
      "Configuring Making Tax Digital so VAT returns file correctly",
    ],
    whyItMatters:
      "Software set up badly creates errors that take time and money to unpick, and poor training means features go unused. A good local firm configures everything properly and shows you how to use it, so you get clean records and real value from what you are paying for.",
    faq: [
      {
        q: "I am switching from spreadsheets. Can my data be moved over?",
        a: "Yes. A good firm will migrate your opening balances and history so you start clean, then train you on the new system before you go live.",
      },
      {
        q: "How long does setup and training take?",
        a: "A straightforward setup often takes a few days, with training in short sessions afterwards. The firm we match you with will give you a clear timescale for your business.",
      },
    ],
  },

  // ─── Year-End Accounts ────────────────────────────────────────────────────
  {
    slug: "statutory-accounts",
    parentSlug: "year-end-accounts",
    name: "Statutory Year-End Accounts",
    headline: "Statutory year-end accounts, filed right by a local firm",
    metaTitle: "Statutory Year-End Accounts",
    metaDescription:
      "Get matched with a local firm for statutory year-end accounts to Companies House and HMRC. Free, UK-wide. Take the free review.",
    intro:
      "Your statutory accounts have to balance, follow the right standard, and land on time. We match you with a local accounting firm that prepares and files them properly.",
    whatItCovers: [
      "Full statutory accounts prepared to FRS 102 or FRS 105 as your size requires",
      "Balance sheet, profit and loss, and the notes that go with them",
      "Filing of accounts with Companies House before your deadline",
      "Director approval and the right disclosures for your company size",
      "IXBRL tagging where it is needed for online filing",
      "A check that your year-end figures line up with your corporation tax return",
    ],
    whyItMatters:
      "Late or incorrect statutory accounts mean automatic penalties from Companies House that grow the longer you wait. A local firm keeps your filing accurate and on time. You stay compliant without chasing the detail yourself.",
    faq: [
      {
        q: "When are my statutory accounts due at Companies House?",
        a: "For a private limited company, they are usually due nine months after your accounting reference date. Your first set after incorporation runs to a longer deadline. The firm we match you with will confirm your exact date.",
      },
      {
        q: "What is the difference between statutory accounts and management accounts?",
        a: "Statutory accounts are the formal year-end accounts filed with Companies House and HMRC. Management accounts are internal reports you use to run the business. The firm can prepare both.",
      },
    ],
  },
  {
    slug: "corporation-tax-return",
    parentSlug: "year-end-accounts",
    name: "Corporation Tax Return (CT600)",
    headline: "Corporation tax return (CT600) prepared and filed for you",
    metaTitle: "Corporation Tax Return CT600",
    metaDescription:
      "Get matched with a local firm to prepare and file your Corporation Tax Return (CT600) with HMRC. Free service. Take the free review.",
    intro:
      "Your CT600 sets out what your company owes HMRC and why. We match you with a local firm that prepares it, claims what you are due, and files it on time.",
    whatItCovers: [
      "Preparation of your CT600 and the supporting computations",
      "Filing with HMRC online with the required iXBRL tags",
      "Calculating your corporation tax bill and your payment deadline",
      "Claiming capital allowances, including the Annual Investment Allowance",
      "Checking R&D and other reliefs you may qualify for",
      "Adjusting your accounts profit to the correct taxable figure",
    ],
    whyItMatters:
      "A CT600 filed late triggers HMRC penalties, and a return that misses reliefs means you pay more tax than you need to. A local firm gets the figures right and the claims in. You keep more of what your company earns.",
    faq: [
      {
        q: "When do I need to file my CT600?",
        a: "Your CT600 is normally due twelve months after the end of your accounting period. Your corporation tax bill is due earlier, usually nine months and one day after the period end. The firm will set out both dates for you.",
      },
      {
        q: "Do I still file a CT600 if my company made a loss?",
        a: "Yes. You still file a return even with no tax to pay, and recording the loss can reduce tax in other years. The firm we match you with will handle the claim.",
      },
    ],
  },
  {
    slug: "companies-house-filing",
    parentSlug: "year-end-accounts",
    name: "Companies House Filing & Confirmation Statement",
    headline: "Companies House filing and confirmation statement sorted",
    metaTitle: "Companies House Filing & Confirmation",
    metaDescription:
      "Get matched with a local firm for Companies House filing and your confirmation statement. Free, UK-wide. Take the free review.",
    intro:
      "Companies House needs your records kept current and your confirmation statement filed every year. We match you with a local firm that keeps it all up to date.",
    whatItCovers: [
      "Filing your annual confirmation statement (form CS01) on time",
      "Keeping your registered details, SIC codes, and share capital current",
      "Updating the register of people with significant control (PSC)",
      "Filing changes to directors and the registered office address",
      "Reminders before each Companies House deadline",
      "A check that your public record matches your actual business",
    ],
    whyItMatters:
      "A confirmation statement that is more than fourteen days overdue can lead to your company being struck off the register. A local firm tracks the dates and files for you. Your company stays in good standing.",
    faq: [
      {
        q: "How often do I file a confirmation statement?",
        a: "At least once every twelve months, even if nothing has changed. It confirms your company details are correct on the public register. The firm we match you with will file it and flag the due date.",
      },
      {
        q: "Is the confirmation statement the same as my accounts?",
        a: "No. The confirmation statement checks your company details, while accounts report your finances. They have separate deadlines, and the firm can manage both.",
      },
    ],
  },
  {
    slug: "sole-trader-partnership-accounts",
    parentSlug: "year-end-accounts",
    name: "Sole Trader & Partnership Accounts",
    headline: "Sole trader and partnership accounts, done locally",
    metaTitle: "Sole Trader & Partnership Accounts",
    metaDescription:
      "Get matched with a local firm for sole trader and partnership accounts plus Self Assessment. Free service. Take the free review.",
    intro:
      "Running as a sole trader or in a partnership means your accounts feed straight into your tax return. We match you with a local firm that prepares both.",
    whatItCovers: [
      "Year-end accounts for sole traders and partnerships",
      "Your Self Assessment tax return (SA100) and the partnership return (SA800)",
      "Working out your taxable profit and your tax and National Insurance",
      "Recording allowable business expenses correctly",
      "Guidance on the move to Making Tax Digital for Income Tax",
      "Splitting profit and reporting each partner's share",
    ],
    whyItMatters:
      "Your business accounts decide the tax you pay, so getting the profit and expenses right matters. A local firm keeps your figures accurate and your Self Assessment on time. You avoid penalties and overpaid tax.",
    faq: [
      {
        q: "Do sole traders file accounts at Companies House?",
        a: "No. As a sole trader you report through Self Assessment, not Companies House. You still need accurate accounts to work out your profit, which the firm we match you with prepares.",
      },
      {
        q: "How is a partnership taxed?",
        a: "The partnership files its own return, then each partner pays tax on their share of the profit through their own Self Assessment. The firm handles both sides for you.",
      },
    ],
  },
  {
    slug: "dormant-company-accounts",
    parentSlug: "year-end-accounts",
    name: "Dormant & Micro-Entity Accounts",
    headline: "Dormant and micro-entity accounts filed correctly",
    metaTitle: "Dormant & Micro-Entity Accounts",
    metaDescription:
      "Get matched with a local firm for dormant company and micro-entity accounts under FRS 105. Free, UK-wide. Take the free review.",
    intro:
      "A dormant or very small company still has to file the right accounts with Companies House. We match you with a local firm that keeps it simple and compliant.",
    whatItCovers: [
      "Dormant company accounts (form AA02) for companies with no transactions",
      "Micro-entity accounts prepared under FRS 105",
      "Confirming whether your company truly counts as dormant for filing",
      "Filing with Companies House before your deadline",
      "Keeping your confirmation statement in step with your accounts",
      "Advice on what would end dormant status",
    ],
    whyItMatters:
      "Even a dormant company faces the same late filing penalties as any other, and the rules on what counts as dormant catch people out. A local firm files the correct format and keeps you within the micro-entity thresholds. You stay compliant for very little cost.",
    faq: [
      {
        q: "What makes a company dormant?",
        a: "A company is dormant for Companies House when it has had no significant accounting transactions in the period. Even small fees or interest can break it. The firm we match you with will confirm your status.",
      },
      {
        q: "Who can use micro-entity accounts under FRS 105?",
        a: "Very small companies that meet at least two of the size thresholds for turnover, balance sheet total, and employees. FRS 105 allows a simpler, shorter set of accounts. The firm will check if you qualify.",
      },
    ],
  },
  {
    slug: "company-secretarial",
    parentSlug: "year-end-accounts",
    name: "Registered Office & Company Secretarial",
    headline: "Registered office and company secretarial support",
    metaTitle: "Registered Office & Company Secretarial",
    metaDescription:
      "Get matched with a local firm for registered office and company secretarial services. Free, UK-wide. Take the free review.",
    intro:
      "Your company has statutory records to keep and filings to make beyond the accounts. We match you with a local firm that handles the company secretarial side.",
    whatItCovers: [
      "A registered office address for your company's official post",
      "Maintaining your statutory registers, including the PSC register",
      "Filing director, shareholder, and registered office changes at Companies House",
      "Preparing board minutes and resolutions when decisions are made",
      "Managing share issues, transfers, and changes to share capital",
      "Keeping your confirmation statement and company record accurate",
    ],
    whyItMatters:
      "Company secretarial duties are easy to overlook until a filing is missed or a register is out of date. A local firm keeps your statutory records correct and your changes filed on time. Your company meets its legal obligations without you tracking every form.",
    faq: [
      {
        q: "Do I need a company secretary?",
        a: "Private companies are not required to appoint one, but the secretarial duties still have to be done. A local firm can carry out that work on your behalf so nothing is missed.",
      },
      {
        q: "Can I use the accountant's address as my registered office?",
        a: "Many firms offer a registered office address service, which keeps your home address off the public register and routes official post to them. The firm we match you with can set this up.",
      },
    ],
  },

  // ─── Tax & VAT ────────────────────────────────────────────────────────────
  {
    slug: "vat-returns",
    parentSlug: "tax-and-vat",
    name: "VAT Returns & Making Tax Digital",
    headline: "VAT returns and Making Tax Digital, handled by a local firm",
    metaTitle: "VAT Returns & Making Tax Digital",
    metaDescription:
      "Get matched with a local firm for VAT returns and Making Tax Digital filing. Accurate, on time, MTD-compliant. Take the free review.",
    intro:
      "Filing VAT returns under Making Tax Digital means keeping digital records and submitting through compatible software every quarter. We match you with a local accounting firm that does the lot for you.",
    whatItCovers: [
      "Quarterly VAT return preparation and submission to HMRC",
      "Making Tax Digital compliant record keeping and software setup",
      "Checking which VAT you can reclaim on purchases and expenses",
      "Reviewing your VAT scheme to make sure it still suits you",
      "Sorting late returns and correcting errors on past submissions",
      "Keeping you on top of deadlines so you avoid surcharges",
    ],
    whyItMatters:
      "Miss a VAT deadline or get a figure wrong and HMRC can charge penalties and interest. A local firm keeps your returns accurate and submitted on time, and makes sure your records meet MTD rules. That frees you to run the business.",
    faq: [
      {
        q: "Do I have to use Making Tax Digital software?",
        a: "Yes. If you are VAT registered you must keep digital records and file through MTD-compatible software. The firm we match you with will set this up and file on your behalf.",
      },
      {
        q: "What happens if I have missed VAT returns?",
        a: "A local firm can bring your filings up to date, correct earlier errors where allowed, and deal with HMRC about any penalties. The free review is the quickest way to get matched with one.",
      },
    ],
  },
  {
    slug: "vat-registration",
    parentSlug: "tax-and-vat",
    name: "VAT Registration & Scheme Advice",
    headline: "VAT registration and scheme advice from a local firm",
    metaTitle: "VAT Registration & Scheme Advice",
    metaDescription:
      "Get matched with a local firm for VAT registration and scheme advice, including flat rate and cash accounting. Take the free review.",
    intro:
      "Once your turnover passes the VAT threshold you must register, but the scheme you choose can make a real difference to your admin and cash flow. We match you with a local firm that registers you and picks the scheme that fits.",
    whatItCovers: [
      "Checking whether you need to register or could benefit from registering early",
      "Handling your VAT registration with HMRC from start to finish",
      "Comparing schemes: standard, flat rate, cash accounting and annual accounting",
      "Working out the flat rate percentage for your trade",
      "Advising on registration when you trade across borders",
      "Setting you up with MTD-ready software once you are registered",
    ],
    whyItMatters:
      "Registering at the wrong time, or on the wrong scheme, can cost you money and create extra admin. A local firm checks your numbers against the current threshold and recommends the scheme that suits how you trade. You start on the right footing.",
    faq: [
      {
        q: "When do I have to register for VAT?",
        a: "You must register once your VAT taxable turnover passes the current registration threshold in any rolling 12-month period, or if you expect to pass it soon. A local firm can confirm where you stand and register you.",
      },
      {
        q: "Is the flat rate scheme worth it?",
        a: "It depends on your costs and trade. It simplifies your VAT but is not always cheaper. The firm we match you with will compare the schemes against your actual figures.",
      },
    ],
  },
  {
    slug: "corporation-tax-planning",
    parentSlug: "tax-and-vat",
    name: "Corporation Tax Planning",
    headline: "Corporation tax planning with a local accounting firm",
    metaTitle: "Corporation Tax Planning",
    metaDescription:
      "Get matched with a local firm for corporation tax planning, allowances and reliefs to reduce your company's bill legally. Take the free review.",
    intro:
      "Corporation tax is charged on your company profits, but how you plan through the year affects what you owe. We match you with a local firm that prepares your return and plans ahead to keep the bill as low as the rules allow.",
    whatItCovers: [
      "Preparing and filing your CT600 corporation tax return with HMRC",
      "Claiming capital allowances on equipment, vehicles and assets",
      "Using reliefs and allowances available to your company",
      "Planning the timing of profits, dividends and director pay",
      "Reviewing whether R&D or other specialist reliefs apply",
      "Forecasting your bill so you can set money aside in good time",
    ],
    whyItMatters:
      "Many companies pay more corporation tax than they need to because allowances and reliefs go unclaimed. A local firm plans across the year rather than scrambling at the deadline. You keep more profit in the business, legally.",
    faq: [
      {
        q: "When is corporation tax due?",
        a: "For most companies it is due nine months and one day after the end of your accounting period, with the return filed within twelve months. A local firm will track both dates for you.",
      },
      {
        q: "Can planning really reduce my bill?",
        a: "Sensible planning around allowances, reliefs, timing and remuneration can reduce what you owe within the rules. The firm we match you with focuses on legitimate planning, never anything that puts you at risk with HMRC.",
      },
    ],
  },
  {
    slug: "self-assessment",
    parentSlug: "tax-and-vat",
    name: "Personal Tax & Self-Assessment",
    headline: "Personal tax and self-assessment sorted by a local firm",
    metaTitle: "Personal Tax & Self-Assessment",
    metaDescription:
      "Get matched with a local firm for personal tax and self-assessment. Accurate returns, claimed expenses, filed on time. Take the free review.",
    intro:
      "If you are self-employed, a director or have income outside PAYE, you likely need to file a self-assessment return each year. We match you with a local firm that prepares it, claims what you are due and files it for you.",
    whatItCovers: [
      "Preparing and filing your self-assessment tax return with HMRC",
      "Reporting self-employment, rental, dividend and other income",
      "Claiming allowable expenses and reliefs you are entitled to",
      "Working out your tax and payments on account",
      "Handling returns for sole traders, landlords and company directors",
      "Meeting the 31 January deadline to avoid penalties",
    ],
    whyItMatters:
      "Getting self-assessment wrong, or filing late, leads to penalties and interest from HMRC. A local firm makes sure your income is reported correctly and every allowable expense is claimed. You pay the right amount and not a penny more.",
    faq: [
      {
        q: "Do I need to file a self-assessment return?",
        a: "Usually yes if you are self-employed, a company director, a landlord, or have untaxed income above the reporting limits. A local firm can confirm whether you need to file and handle it for you.",
      },
      {
        q: "What is the self-assessment deadline?",
        a: "Online returns are due by 31 January following the end of the tax year, with any tax owed due the same day. Filing late triggers an automatic penalty, so a local firm keeps you ahead of it.",
      },
    ],
  },
  {
    slug: "capital-gains-tax",
    parentSlug: "tax-and-vat",
    name: "Capital Gains Tax",
    headline: "Capital gains tax advice from a local accounting firm",
    metaTitle: "Capital Gains Tax",
    metaDescription:
      "Get matched with a local firm for capital gains tax on property, shares and business sales, using allowances and reliefs. Take the free review.",
    intro:
      "Capital gains tax applies when you sell or dispose of an asset that has gone up in value, such as property, shares or a business. We match you with a local firm that calculates the gain, applies the right reliefs and reports it correctly.",
    whatItCovers: [
      "Working out the gain on property, shares, investments and business sales",
      "Applying your annual exempt amount and allowable costs",
      "Claiming reliefs such as Business Asset Disposal Relief where eligible",
      "Reporting and paying CGT on UK property within the 60-day window",
      "Planning disposals across tax years to use allowances well",
      "Reporting gains correctly through self-assessment",
    ],
    whyItMatters:
      "CGT rules and deadlines catch people out, especially the 60-day reporting window on UK residential property. A local firm makes sure your gain is calculated correctly and every relief is applied. You meet the deadlines and avoid overpaying.",
    faq: [
      {
        q: "When do I have to report capital gains tax?",
        a: "Gains on UK residential property must be reported and paid within 60 days of completion. Other gains usually go through self-assessment. A local firm will tell you which applies and handle the reporting.",
      },
      {
        q: "Can I reduce my capital gains tax bill?",
        a: "Often yes, by using your annual exempt amount, allowable costs and reliefs you qualify for, and by timing disposals. The firm we match you with will apply everything you are entitled to within the rules.",
      },
    ],
  },
  {
    slug: "rd-tax-relief",
    parentSlug: "tax-and-vat",
    name: "R&D Tax Relief",
    headline: "R&D tax relief claims handled by a local firm",
    metaTitle: "R&D Tax Relief",
    metaDescription:
      "Get matched with a local firm for R&D tax relief claims that meet HMRC rules and stand up to scrutiny. Take the free review.",
    intro:
      "R&D tax relief rewards companies that work on solving technical or scientific problems, and it is not just for labs and tech firms. We match you with a local firm that checks if you qualify and prepares a claim that holds up with HMRC.",
    whatItCovers: [
      "Checking whether your projects meet HMRC's definition of R&D",
      "Identifying qualifying costs such as staff, software and subcontractors",
      "Preparing the technical narrative and cost calculations",
      "Submitting the claim and required additional information to HMRC",
      "Advising on the merged scheme and rules now in force",
      "Supporting the claim if HMRC asks questions",
    ],
    whyItMatters:
      "HMRC has tightened the rules and is checking R&D claims far more closely than before. A weak or overstated claim can be rejected and lead to an enquiry. A local firm builds a claim that is accurate, well evidenced and defensible.",
    faq: [
      {
        q: "Does my business qualify for R&D tax relief?",
        a: "You may qualify if you have tried to resolve a technical or scientific uncertainty, even if the project did not succeed. It applies across many sectors, not just tech. A local firm can assess your projects honestly.",
      },
      {
        q: "Are R&D claims being checked more closely now?",
        a: "Yes. HMRC has increased scrutiny and introduced stricter requirements. The firm we match you with prepares claims to meet the current rules and stand up to questions.",
      },
    ],
  },
  {
    slug: "hmrc-enquiry-support",
    parentSlug: "tax-and-vat",
    name: "HMRC Enquiry & Investigation Support",
    headline: "HMRC enquiry and investigation support from a local firm",
    metaTitle: "HMRC Enquiry & Investigation Support",
    metaDescription:
      "Get matched with a local firm for HMRC enquiry and investigation support. Expert representation and clear advice. Take the free review.",
    intro:
      "An HMRC enquiry or investigation can be stressful and the way you respond matters. We match you with a local firm that deals with HMRC on your behalf and guides you through it.",
    whatItCovers: [
      "Responding to HMRC enquiry letters and information requests",
      "Reviewing what HMRC is asking for and what you must provide",
      "Representing you in dealings and meetings with HMRC",
      "Handling VAT, PAYE, self-assessment and corporation tax enquiries",
      "Negotiating settlements, penalties and payment arrangements",
      "Helping you put things right under disclosure where needed",
    ],
    whyItMatters:
      "How you handle an HMRC enquiry affects the outcome, the penalties and how long it drags on. A local firm speaks HMRC's language, keeps your responses accurate and protects your position. You are not left to face it alone.",
    faq: [
      {
        q: "What should I do if HMRC opens an enquiry?",
        a: "Do not ignore it and be careful what you send without advice. Get an accountant involved early. A local firm can review the request and respond to HMRC properly on your behalf.",
      },
      {
        q: "Can you help if I need to make a disclosure?",
        a: "Yes. If something has been reported wrongly, a local firm can help you make a disclosure to HMRC in the right way, which usually reduces penalties compared with HMRC finding it first.",
      },
    ],
  },

  // ─── Payroll & Auto-Enrolment ─────────────────────────────────────────────
  {
    slug: "payroll-payslips",
    parentSlug: "payroll",
    name: "Payroll & Payslips",
    headline: "Payroll and payslips, run accurately by a local firm",
    metaTitle: "Payroll & Payslips",
    metaDescription:
      "Get matched with a local firm that runs your payroll and payslips accurately, on time, and fully PAYE compliant. Take the free review.",
    intro:
      "Running payroll is more than paying wages. It is tax codes, deductions, and HMRC deadlines that have to be right every single time. We match you with a local accounting firm that handles all of it for your business.",
    whatItCovers: [
      "Calculating gross to net pay, tax, and National Insurance for every employee",
      "Producing clear payslips and distributing them on your chosen pay date",
      "Applying the correct tax codes and processing starters and leavers",
      "Handling student loan deductions, pension contributions, and attachment of earnings",
      "Year-end forms including P60s for your staff",
      "Keeping you compliant with HMRC PAYE rules as rates and thresholds change",
    ],
    whyItMatters:
      "Payroll errors knock employee trust and can trigger HMRC penalties. A late or wrong submission costs you money and time you do not have. The right local firm runs it quietly in the background so your people get paid correctly every pay run.",
    faq: [
      {
        q: "Can a firm take over payroll part-way through the tax year?",
        a: "Yes. A good local firm will collect your year-to-date figures, check them, and pick up your next pay run without disrupting anything for your staff.",
      },
      {
        q: "What if I only have one or two employees?",
        a: "Size is not a problem. We match small employers with firms that price fairly for low headcounts, so you still get accurate payroll without paying over the odds.",
      },
    ],
  },
  {
    slug: "rti-submissions",
    parentSlug: "payroll",
    name: "RTI Submissions to HMRC",
    headline: "RTI submissions to HMRC, filed on time by a local firm",
    metaTitle: "RTI Submissions to HMRC",
    metaDescription:
      "Get matched with a local firm that files your RTI submissions to HMRC accurately and on time, every pay run. Take the free review.",
    intro:
      "Every time you pay staff, HMRC expects a Real Time Information submission on or before that pay date. Miss it and the penalties stack up. We match you with a local firm that files your RTI correctly each pay run.",
    whatItCovers: [
      "Submitting your Full Payment Submission (FPS) on or before each pay date",
      "Filing Employer Payment Summaries (EPS) when you reclaim or report nil payments",
      "Reporting starters, leavers, and changes to pay accurately to HMRC",
      "Reconciling what you owe HMRC each month so there are no surprises",
      "Correcting earlier errors and submitting amendments properly",
      "Keeping you clear of late filing and late payment penalties",
    ],
    whyItMatters:
      "RTI is unforgiving on timing. A single late FPS can land you with a penalty, and repeated slips raise your risk of an HMRC review. The right local firm builds your submissions into the pay run so filing is never an afterthought.",
    faq: [
      {
        q: "What happens if I have missed RTI submissions already?",
        a: "A local firm can review what was filed, submit any outstanding or corrected returns, and help you deal with HMRC on penalties so you get back on track.",
      },
    ],
  },
  {
    slug: "workplace-pensions",
    parentSlug: "payroll",
    name: "Workplace Pensions & Auto-Enrolment",
    headline: "Workplace pensions and auto-enrolment handled by a local firm",
    metaTitle: "Workplace Pensions & Auto-Enrolment",
    metaDescription:
      "Get matched with a local firm that runs your workplace pension and auto-enrolment duties in line with The Pensions Regulator. Take the free review.",
    intro:
      "Auto-enrolment is a legal duty, not an optional extra. You have to assess staff, enrol the right people, and keep The Pensions Regulator updated. We match you with a local firm that manages the whole process.",
    whatItCovers: [
      "Assessing your workforce and identifying who must be enrolled",
      "Setting up or working with your chosen workplace pension scheme",
      "Calculating employer and employee contributions each pay run",
      "Handling opt-ins, opt-outs, and re-enrolment every three years",
      "Submitting your declaration of compliance to The Pensions Regulator",
      "Issuing the statutory letters your staff are entitled to receive",
    ],
    whyItMatters:
      "The Pensions Regulator can fine employers who get auto-enrolment wrong, and the duties never really stop. Re-enrolment and ongoing assessment catch a lot of business owners out. The right local firm keeps you compliant without you having to track every threshold.",
    faq: [
      {
        q: "Do I still have duties if nobody qualifies for auto-enrolment?",
        a: "Yes. You still have to assess staff and submit a declaration of compliance. A local firm makes sure those duties are met even when no one needs enrolling.",
      },
      {
        q: "What is re-enrolment and why does it matter?",
        a: "Roughly every three years you must re-enrol eligible staff who opted out and file a new declaration. Miss it and you risk a penalty, so a firm tracks the date for you.",
      },
    ],
  },
  {
    slug: "cis-returns",
    parentSlug: "payroll",
    name: "CIS Returns for Construction",
    headline: "CIS returns for construction, filed right by a local firm",
    metaTitle: "CIS Returns for Construction",
    metaDescription:
      "Get matched with a local firm that handles your CIS returns, subcontractor verification, and monthly HMRC filing. Take the free review.",
    intro:
      "The Construction Industry Scheme has its own rules on deductions, verification, and monthly filing. Get it wrong and HMRC notices fast. We match you with a local firm that runs your CIS returns properly.",
    whatItCovers: [
      "Verifying subcontractors with HMRC to apply the correct deduction rate",
      "Calculating and deducting CIS tax at 20%, 30%, or gross status",
      "Filing your monthly CIS returns to HMRC by the deadline",
      "Producing payment and deduction statements for your subcontractors",
      "Reclaiming CIS deductions suffered if you are a limited company subcontractor",
      "Keeping your contractor and subcontractor records HMRC ready",
    ],
    whyItMatters:
      "CIS penalties start the moment a monthly return is late, and they grow quickly. Wrong deduction rates or missed verifications create disputes with the people doing your work. The right local firm keeps your filings on time and your subcontractors paid correctly.",
    faq: [
      {
        q: "I work as both a contractor and a subcontractor. Can one firm handle both?",
        a: "Yes. A local firm can manage your monthly returns as a contractor and reclaim the CIS deductions suffered on your own income, keeping both sides aligned.",
      },
    ],
  },
  {
    slug: "director-payroll",
    parentSlug: "payroll",
    name: "Director Payroll & Dividends",
    headline: "Director payroll and dividends set up tax-efficiently",
    metaTitle: "Director Payroll & Dividends",
    metaDescription:
      "Get matched with a local firm that structures your director salary and dividends tax-efficiently and within HMRC rules. Take the free review.",
    intro:
      "As a director, how you take money from your company affects your tax bill. The right balance of salary and dividends can save you a real amount. We match you with a local firm that gets the mix right for your business.",
    whatItCovers: [
      "Setting a director salary that uses your allowances without overpaying tax",
      "Processing director payroll and the RTI submissions that go with it",
      "Planning dividend payments that sit within available profits",
      "Preparing proper dividend vouchers and board minutes",
      "Factoring in dividend tax rates and your personal allowance",
      "Keeping salary and dividends in line with your wider company position",
    ],
    whyItMatters:
      "Take too much as salary and you pay needless National Insurance. Take dividends without enough retained profit and you create problems with HMRC. The right local firm structures your pay so it is tax-efficient and properly documented.",
    faq: [
      {
        q: "Is it better to take salary or dividends as a director?",
        a: "Usually a mix of both works best, with a modest salary plus dividends. The right split depends on your profits and personal income, which a local firm can work out for you.",
      },
      {
        q: "Do dividends go through payroll?",
        a: "No, dividends are paid from profits and recorded separately, while your salary goes through payroll with RTI submissions. A firm keeps both correctly documented.",
      },
    ],
  },
  {
    slug: "p11d-benefits",
    parentSlug: "payroll",
    name: "P11D & Benefits in Kind",
    headline: "P11D and benefits in kind reported correctly by a local firm",
    metaTitle: "P11D & Benefits in Kind",
    metaDescription:
      "Get matched with a local firm that prepares and files your P11D forms and benefits in kind reporting to HMRC. Take the free review.",
    intro:
      "Company cars, private medical cover, and interest-free loans all count as benefits in kind that HMRC wants reported. The P11D is where they go. We match you with a local firm that prepares and files yours correctly.",
    whatItCovers: [
      "Identifying which benefits and expenses are reportable on a P11D",
      "Calculating the cash equivalent of company cars, fuel, and medical cover",
      "Preparing and filing P11D forms with HMRC by the July deadline",
      "Working out the Class 1A National Insurance you owe on benefits",
      "Filing the P11D(b) and advising on payment to HMRC",
      "Reviewing whether payrolling benefits would suit your business better",
    ],
    whyItMatters:
      "P11D mistakes mean you either underpay tax, which HMRC will chase, or overstate benefits and cost your staff. The deadlines are fixed and penalties apply for late filing. The right local firm gets the figures right and submits everything on time.",
    faq: [
      {
        q: "When are P11D forms due?",
        a: "P11D and P11D(b) forms are due by 6 July after the tax year ends, with Class 1A National Insurance payable shortly after. A local firm tracks both dates for you.",
      },
    ],
  },
  {
    slug: "statutory-pay",
    parentSlug: "payroll",
    name: "Statutory Pay (SSP, SMP, SPP)",
    headline: "Statutory pay handled by a local firm: SSP, SMP and SPP",
    metaTitle: "Statutory Pay (SSP, SMP, SPP)",
    metaDescription:
      "Get matched with a local firm that calculates and processes statutory pay including SSP, SMP and SPP correctly through payroll. Take the free review.",
    intro:
      "Sick pay, maternity pay, and paternity pay come with strict rules on eligibility, rates, and what you can reclaim. Get it wrong and staff lose out or you overpay. We match you with a local firm that handles statutory pay properly.",
    whatItCovers: [
      "Checking eligibility for SSP, SMP, SPP, and shared parental pay",
      "Calculating the correct statutory amounts and qualifying periods",
      "Processing statutory payments through payroll with the right tax and NI",
      "Reclaiming statutory parental pay from HMRC where you are entitled",
      "Applying small employers' relief where it is available to you",
      "Keeping the records HMRC expects for each statutory payment",
    ],
    whyItMatters:
      "Statutory pay rules change each tax year and the eligibility tests are easy to misread. Underpay and you have an unhappy employee and a possible claim. Overpay and you cannot always reclaim it. The right local firm calculates each case correctly and processes it through your payroll.",
    faq: [
      {
        q: "Can I reclaim statutory maternity or paternity pay?",
        a: "Most employers can reclaim a large share of statutory parental pay, and smaller employers may reclaim more through small employers' relief. A local firm makes sure you claim what you are due.",
      },
      {
        q: "How much SSP does an employee get?",
        a: "Statutory sick pay is set at a weekly rate by HMRC and paid for qualifying days once the waiting days are served. A local firm applies the current rate and rules to each case.",
      },
    ],
  },

  // ─── Advisory & Planning ──────────────────────────────────────────────────
  {
    slug: "management-accounts",
    parentSlug: "advisory",
    name: "Management Accounts & KPI Reporting",
    headline: "Management accounts and KPI reporting you'll actually use",
    metaTitle: "Management Accounts & KPI Reporting",
    metaDescription:
      "Get clear monthly management accounts and KPI reporting matched to a local firm that knows your numbers. Take the free review.",
    intro:
      "Annual accounts tell you what happened last year. Management accounts tell you what is happening now, so you can act while it still counts.",
    whatItCovers: [
      "Monthly or quarterly profit and loss, balance sheet and cash position",
      "KPI dashboards tracking margins, debtor days and overheads",
      "Variance reporting against budget and prior periods",
      "Department or product line breakdowns where it helps decisions",
      "Plain commentary that explains what the figures mean for you",
      "Reports timed to land before your board or planning meetings",
    ],
    whyItMatters:
      "Running a business on year-old figures is guesswork. Regular management accounts show you which lines make money and which quietly drain it. We match you with a local firm that builds reporting around the decisions you need to make.",
    faq: [
      {
        q: "How often should I get management accounts?",
        a: "Most SMEs find monthly or quarterly works best. A local firm can advise on the right rhythm for your size and sector, then set it up so the numbers arrive on time every period.",
      },
      {
        q: "Will I understand the reports?",
        a: "Yes. A good firm writes plain commentary alongside the figures, so you see what changed and why without needing an accounting background.",
      },
    ],
  },
  {
    slug: "cash-flow-forecasting",
    parentSlug: "advisory",
    name: "Cash-Flow Forecasting",
    headline: "Cash-flow forecasting to keep your business solvent",
    metaTitle: "Cash-Flow Forecasting",
    metaDescription:
      "Get a clear cash-flow forecast matched to a local firm that spots shortfalls early. Plan ahead with confidence. Take the free review.",
    intro:
      "Profit on paper means nothing if you cannot pay the VAT bill in March. A cash-flow forecast shows you what is coming and when.",
    whatItCovers: [
      "Rolling 12-week and 12-month cash projections",
      "Timing of VAT, PAYE, Corporation Tax and supplier payments",
      "Debtor collection patterns and the effect of late payers",
      "Headroom checks against your overdraft or facility limits",
      "Early warning of pinch points before they become a crisis",
      "Scenarios for hiring, equipment or a big new contract",
    ],
    whyItMatters:
      "Most businesses that fail are profitable right up to the point they run out of cash. A forecast turns nasty surprises into planned decisions. We match you with a local firm that keeps your forecast current and useful.",
    faq: [
      {
        q: "How is cash flow different from profit?",
        a: "Profit is what you earn over a period. Cash flow is the actual money moving in and out, including tax bills and loan repayments. You can be profitable and still short of cash, which is why forecasting matters.",
      },
      {
        q: "How far ahead should a forecast look?",
        a: "A short 12-week view handles day-to-day pressure, while a 12-month view supports bigger plans. A local firm can build both and update them as things change.",
      },
    ],
  },
  {
    slug: "budgeting-scenario-planning",
    parentSlug: "advisory",
    name: "Budgeting & Scenario Planning",
    headline: "Budgeting and scenario planning for confident decisions",
    metaTitle: "Budgeting & Scenario Planning",
    metaDescription:
      "Build a working budget and test what-if scenarios with a local firm matched to your business. Plan for any outcome. Take the free review.",
    intro:
      "A budget is not a box-ticking exercise. Done well, it is the plan you measure every month against and the tool that tells you if you can afford that next move.",
    whatItCovers: [
      "Annual budgets built from your real cost and revenue drivers",
      "Best case, worst case and likely scenarios side by side",
      "The numbers behind hiring, premises or expansion decisions",
      "Break-even analysis for new products or sites",
      "Cost modelling for rising wages, energy and supplier prices",
      "Monthly tracking so you spot drift early and adjust",
    ],
    whyItMatters:
      "Plans rarely survive first contact with reality, so the value is in testing options before you commit. Scenario planning shows you the downside before it costs you. We match you with a local firm that builds budgets you will actually use.",
    faq: [
      {
        q: "What is scenario planning?",
        a: "It means modelling several versions of the future, such as a slow year, a strong year and a major change, so you know how each one affects cash and profit. It helps you make decisions with your eyes open.",
      },
      {
        q: "My business changes too fast for a budget. Is it still worth it?",
        a: "Yes, and arguably more so. A flexible budget you revisit each quarter gives you a baseline to react from, rather than running blind.",
      },
    ],
  },
  {
    slug: "virtual-fd",
    parentSlug: "advisory",
    name: "Virtual Finance Director (FD)",
    headline: "Virtual finance director support for growing businesses",
    metaTitle: "Virtual Finance Director (FD)",
    metaDescription:
      "Get senior finance direction without a full-time salary, matched to a local virtual FD firm. Strategy on tap. Take the free review.",
    intro:
      "You need finance leadership to grow, but a full-time FD costs six figures. A virtual FD gives you that experience for a few days a month.",
    whatItCovers: [
      "Strategic input on growth, margins and major decisions",
      "Board-level reporting and the story behind the numbers",
      "Funding strategy and conversations with banks or investors",
      "Pricing, profitability and cost structure reviews",
      "Building and managing your finance function and systems",
      "A senior sounding board for the decisions that keep you up at night",
    ],
    whyItMatters:
      "There is a gap between a bookkeeper who records the past and a director who shapes the future. A virtual FD fills it without the full-time cost. We match you with a local firm that provides FD-level support scaled to where you are now.",
    faq: [
      {
        q: "What does a virtual FD do that my accountant does not?",
        a: "Your accountant keeps the records and files the returns. A virtual FD uses those numbers to drive strategy, funding and pricing, acting as a part-time member of your leadership team.",
      },
      {
        q: "How much time do I need?",
        a: "Many growing SMEs start with one or two days a month and scale up around funding rounds or big projects. A local firm can right-size the commitment for you.",
      },
    ],
  },
  {
    slug: "funding-loan-applications",
    parentSlug: "advisory",
    name: "Funding & Loan Applications",
    headline: "Funding and loan applications done properly",
    metaTitle: "Funding & Loan Applications",
    metaDescription:
      "Prepare a lender-ready funding and loan application with a local firm matched to your business. Borrow on better terms. Take the free review.",
    intro:
      "Lenders back numbers they trust. A weak application gets a no or a worse rate, even when the business is sound.",
    whatItCovers: [
      "Choosing the right finance: term loans, asset finance, invoice finance or grants",
      "Forecasts and figures presented the way lenders expect",
      "A clear business case that answers the questions before they are asked",
      "Affordability and serviceability modelling",
      "Preparing for bank, broker or investor questions",
      "Help comparing offers so you understand the real cost",
    ],
    whyItMatters:
      "The difference between a sharp application and a rushed one can be the rate, the amount, or whether you get funded at all. We match you with a local firm that puts your case in the strongest light and knows what lenders look for.",
    faq: [
      {
        q: "Will applying through an accountant improve my chances?",
        a: "Often, yes. Lenders respond well to forecasts and accounts prepared by a qualified firm, because it signals the numbers are reliable. It can affect both approval and the rate you are offered.",
      },
      {
        q: "What types of funding can you help with?",
        a: "A local firm can advise across bank loans, asset and invoice finance, and grants, then help you apply for the option that fits your plans and cash position.",
      },
    ],
  },
  {
    slug: "profit-pricing-reviews",
    parentSlug: "advisory",
    name: "Profit, Pricing & Margin Reviews",
    headline: "Profit, pricing and margin reviews to lift your bottom line",
    metaTitle: "Profit, Pricing & Margin Reviews",
    metaDescription:
      "Find hidden margin with a profit, pricing and margin review from a local firm matched to your business. Charge what you are worth. Take the free review.",
    intro:
      "Plenty of busy businesses make far less than they should. Often the problem is not sales, it is pricing and margin.",
    whatItCovers: [
      "Gross and net margin analysis by product, service or client",
      "Spotting work that costs more to deliver than it earns",
      "Pricing strategy and the case for a considered increase",
      "The true cost of discounts and how they erode profit",
      "Benchmarking your margins against your sector",
      "Identifying your most and least profitable lines",
    ],
    whyItMatters:
      "A small, well-judged price rise can drop straight to the bottom line, while one loss-making product can quietly eat a year of effort. We match you with a local firm that finds the margin you are leaving on the table.",
    faq: [
      {
        q: "I am worried a price rise will lose customers. What now?",
        a: "A measured review looks at where you have room to move and which lines justify it, so increases are targeted rather than blanket. Often the customers you fear losing are the ones costing you money.",
      },
      {
        q: "How do I know which products actually make money?",
        a: "By analysing the full cost of delivering each line, not just the headline price. A local firm can break this down so you see real profit per product or client.",
      },
    ],
  },
  {
    slug: "exit-succession-valuations",
    parentSlug: "advisory",
    name: "Exit, Succession & Business Valuations",
    headline: "Exit, succession and business valuations planned early",
    metaTitle: "Exit, Succession & Valuations",
    metaDescription:
      "Plan your exit, succession or business valuation with a local firm matched to your goals. Sell on your terms. Take the free review.",
    intro:
      "Whether you sell, hand over to family or step back, the best exits are planned years ahead. Leave it late and you give away value.",
    whatItCovers: [
      "A realistic valuation based on your sector and your numbers",
      "Steps to make the business more attractive and easier to buy",
      "Succession planning for family or management buyouts",
      "Tidying figures and systems so the business stands on its own",
      "Tax-efficient structuring of a sale or handover",
      "Working alongside solicitors and corporate finance advisers",
    ],
    whyItMatters:
      "A buyer pays for a business that runs without you, with clean numbers and predictable profit. Building that takes time, which is why early planning is worth so much. We match you with a local firm that prepares your business and your exit properly.",
    faq: [
      {
        q: "When should I start planning my exit?",
        a: "Ideally three to five years out. That gives time to grow value, reduce reliance on you and get the figures in order, all of which lift the price a buyer will pay.",
      },
      {
        q: "How is my business valued?",
        a: "Valuation usually blends profitability, assets, recurring revenue and sector norms. A local firm can give you a grounded figure and show you what would move it upward.",
      },
    ],
  },
];

export function subServicesFor(parentSlug: string): SubService[] {
  return subServices.filter((s) => s.parentSlug === parentSlug);
}

export function getSubService(parentSlug: string, slug: string): SubService | undefined {
  return subServices.find((s) => s.parentSlug === parentSlug && s.slug === slug);
}
