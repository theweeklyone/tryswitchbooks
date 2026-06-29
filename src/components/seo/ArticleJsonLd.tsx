// BlogPosting JSON-LD for insight articles. Eligible for article rich results
// and strengthens topical authority around accounting advice for local search.

import type { BlogPost } from "@/data/blog";
import { site } from "@/data/site";
import { blogImages } from "@/lib/blog-images";

const SITE_URL = "https://www.tryswitchbooks.co.uk";

const MONTHS: Record<string, string> = {
  january: "01",
  february: "02",
  march: "03",
  april: "04",
  may: "05",
  june: "06",
  july: "07",
  august: "08",
  september: "09",
  october: "10",
  november: "11",
  december: "12",
};

// "March 2026" -> "2026-03-01". Returns undefined for unrecognised formats.
function toIsoDate(publishedOn: string): string | undefined {
  const m = publishedOn.trim().toLowerCase().match(/^([a-z]+)\s+(\d{4})$/);
  if (!m) return undefined;
  const month = MONTHS[m[1]];
  return month ? `${m[2]}-${month}-01` : undefined;
}

export function ArticleJsonLd({ post }: { post: BlogPost }) {
  const datePublished = toIsoDate(post.publishedOn);
  const image = blogImages[post.slug]?.src;
  const imageUrl = image
    ? image.startsWith("http")
      ? image
      : `${SITE_URL}${image}`
    : undefined;

  const ld = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    articleSection: post.category,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/advice/${post.slug}`,
    },
    author: {
      "@type": "Organization",
      name: site.name,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/apple-icon.png`,
      },
    },
    ...(datePublished ? { datePublished, dateModified: datePublished } : {}),
    ...(imageUrl ? { image: imageUrl } : {}),
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
    />
  );
}
