// Service × town landing pages, e.g. "Payroll Services in Worthing". These
// target the "{service} in {town}" / "{service} services near {town}" queries
// Search Console shows real demand for, which the generic service and town pages
// only match tangentially.
//
// Deliberately SELECTIVE, only combos with demonstrated search demand, to keep
// these genuinely useful rather than a thin doorway grid. Each page combines the
// service's substance with the town's local context, plus a hand-written intro,
// so no two read the same. Switch Books MATCHES you with a firm; it never does
// the work itself.

export type LocalService = {
  town: string; // location slug (must exist in locations.ts)
  service: string; // service slug (must exist in services.ts)
  h1: string;
  metaTitle: string; // absolute <title> incl. brand
  metaDescription: string;
  intro: string;
};

export const localServices: LocalService[] = [
  {
    town: "worthing",
    service: "payroll",
    h1: "Payroll Services in Worthing",
    metaTitle: "Payroll Services in Worthing | Switch Books",
    metaDescription:
      "Need payroll services in Worthing? Switch Books matches you, free, with a local firm that runs payroll, RTI and auto-enrolment. Free review.",
    intro:
      "Getting payroll right in Worthing means more than pressing a button: it's RTI deadlines, pension auto-enrolment and staff who expect to be paid correctly and on time, every time. Switch Books is a free service that matches you with a local Worthing accountant who runs payroll properly. We don't run it ourselves; we find you the firm that does.",
  },
  {
    town: "worthing",
    service: "bookkeeping",
    h1: "Bookkeeping in Worthing",
    metaTitle: "Bookkeeping in Worthing | Switch Books",
    metaDescription:
      "Looking for bookkeeping in Worthing? Switch Books matches you, free, with a local firm that keeps your books clean, accurate and up to date. Free review.",
    intro:
      "Worthing's mix of professional firms, tech businesses and independent traders all run on the same thing: books that are current and correct. Good bookkeeping in Worthing means real-time numbers you can trust, not a shoebox sorted out at year-end. Switch Books is a free service that matches you with a local Worthing firm that keeps them that way. We're the matchmaker, not the accountants.",
  },
  {
    town: "bognor-regis",
    service: "bookkeeping",
    h1: "Bookkeeping in Bognor Regis",
    metaTitle: "Bookkeeping in Bognor Regis | Switch Books",
    metaDescription:
      "Need bookkeeping in Bognor Regis? Switch Books matches you, free, with a local firm that keeps your books current, ideal for seasonal trade. Free review.",
    intro:
      "From guesthouses and holiday lets to seafront shops and trades, a lot of Bognor Regis businesses have seasonal takings and cash to stay on top of, which is exactly where good bookkeeping earns its keep. Switch Books is a free service that matches you with a local Bognor Regis firm that keeps your books clean and current. We don't do the bookkeeping ourselves; we find you the firm that does.",
  },
  {
    town: "hastings",
    service: "bookkeeping",
    h1: "Bookkeeping in Hastings",
    metaTitle: "Bookkeeping in Hastings | Switch Books",
    metaDescription:
      "Looking for bookkeeping in Hastings? Switch Books matches you, free, with a local firm that keeps independents' books clean and up to date. Free review.",
    intro:
      "Hastings runs on independents (creative studios, sole traders, the fishing trade, seasonal hospitality) and for all of them, tidy books are the difference between guessing and knowing. Switch Books is a free service that matches you with a local Hastings firm that keeps your bookkeeping clean and up to date. We're the matching service, not the accountants.",
  },
  {
    town: "eastbourne",
    service: "bookkeeping",
    h1: "Bookkeeping in Eastbourne",
    metaTitle: "Bookkeeping in Eastbourne | Switch Books",
    metaDescription:
      "Need bookkeeping in Eastbourne? Switch Books matches you, free, with a local firm that keeps your books accurate and up to date. Free review.",
    intro:
      "Eastbourne's care providers, hotels and retailers deal with steady volumes of transactions that have to be recorded right, and a care business especially can't afford messy books. Good bookkeeping in Eastbourne keeps it all clean and current. Switch Books is a free service that matches you with a local firm that handles it properly. We're the matchmaker, not the accountants.",
  },
  {
    town: "crawley",
    service: "bookkeeping",
    h1: "Bookkeeping in Crawley",
    metaTitle: "Bookkeeping in Crawley | Switch Books",
    metaDescription:
      "Looking for bookkeeping in Crawley? Switch Books matches you, free, with a local firm that keeps busy businesses' books straight. Free review.",
    intro:
      "Crawley's logistics, engineering and airport-linked businesses move a lot of transactions (suppliers, invoices, imports and exports) and keeping the books straight is a real job. That's what good bookkeeping in Crawley is for. Switch Books is a free service that matches you with a local firm that keeps your numbers current and correct. We don't do the books ourselves; we find you the firm that does.",
  },
  {
    town: "chichester",
    service: "bookkeeping",
    h1: "Bookkeeping in Chichester",
    metaTitle: "Bookkeeping in Chichester | Switch Books",
    metaDescription:
      "Need bookkeeping in Chichester? Switch Books matches you, free, with a local firm that keeps your books accurate and up to date. Free review.",
    intro:
      "Chichester's spread of businesses (from hospitality and retail to marine, agriculture and professional firms) all need books that are accurate and up to date. Good bookkeeping in Chichester means knowing where you stand at any point, not just after year-end. Switch Books is a free service that matches you with a local Chichester firm that keeps them that way. We're the matching service, not the accountants.",
  },
];

export function getLocalService(town: string, service: string): LocalService | undefined {
  return localServices.find((l) => l.town === town && l.service === service);
}
