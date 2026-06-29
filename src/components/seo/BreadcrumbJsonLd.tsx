// Reusable BreadcrumbList JSON-LD. Helps Google render breadcrumb trails in
// the SERP and reinforces site structure. Used on service and
// advice detail pages. (Local SEO pages emit their own breadcrumb inline.)

const SITE_URL = "https://www.tryswitchbooks.co.uk";

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path === "/" ? "" : it.path}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
    />
  );
}
