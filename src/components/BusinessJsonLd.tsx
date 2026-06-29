import { site } from "@/data/site";

// Primary structured data, rendered on the homepage.
//
// Switch Books is a FREE MATCHING SERVICE that connects business owners with local
// accounting firms — not an accountancy practice itself. So the schema is an
// Organization that provides a "Service" of type "Accountant matching service",
// serving Sussex and the wider UK. The owner is anonymous, so no street address
// is published — only the service area. No self-declared rating.

const SITE_URL = "https://www.tryswitchbooks.co.uk";

export function BusinessJsonLd() {
  const sameAs = [site.social.linkedin].filter(Boolean);

  const areaServed = [
    "Sussex",
    "East Sussex",
    "West Sussex",
    "Brighton",
    "Eastbourne",
    "Hastings",
    "Lewes",
    "Chichester",
    "Crawley",
    "Worthing",
    "United Kingdom",
  ].map((name) => ({ "@type": "AdministrativeArea", name }));

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#org`,
        name: site.name,
        description: site.description,
        url: SITE_URL,
        email: site.contact.emailDisplay,
        telephone: site.contact.phoneDisplay,
        areaServed,
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        "@type": "Service",
        "@id": `${SITE_URL}/#service`,
        name: "Accountant matching service",
        serviceType: "Accountant matching service",
        description:
          "A free service that matches UK and Sussex business owners with the right local accounting firm for their needs and budget.",
        provider: { "@id": `${SITE_URL}/#org` },
        areaServed,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "GBP",
          description: "Free for business owners. There is no charge to be matched.",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: site.name,
        inLanguage: "en-GB",
        publisher: { "@id": `${SITE_URL}/#org` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
