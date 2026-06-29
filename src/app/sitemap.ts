import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { subServices } from "@/data/sub-services";
import { locations } from "@/data/locations";
import { blogPosts } from "@/data/blog";

const SITE = "https://www.tryswitchbooks.co.uk";

// Public routes only. Dashboard, sign-in, auth and the review-flow result are
// deliberately excluded (auth-gated or noindex).

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { url: `${SITE}/`, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${SITE}/services`, priority: 0.9 },
    { url: `${SITE}/accountants`, priority: 0.9 },
    { url: `${SITE}/how-it-works`, priority: 0.8 },
    { url: `${SITE}/advice`, priority: 0.7 },
    { url: `${SITE}/contact`, priority: 0.7 },
    { url: `${SITE}/consultation`, priority: 0.6 },
    { url: `${SITE}/privacy`, priority: 0.3 },
    { url: `${SITE}/terms`, priority: 0.3 },
    { url: `${SITE}/cookies`, priority: 0.3 },
  ];

  const serviceRoutes = services.map((s) => ({
    url: `${SITE}/services/${s.slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  }));

  const subServiceRoutes = subServices.map((s) => ({
    url: `${SITE}/services/${s.parentSlug}/${s.slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  const locationRoutes = locations.map((l) => ({
    url: `${SITE}/accountants/${l.slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  }));

  const blogRoutes = blogPosts.map((p) => ({
    url: `${SITE}/advice/${p.slug}`,
    priority: 0.5,
    changeFrequency: "monthly" as const,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...subServiceRoutes,
    ...locationRoutes,
    ...blogRoutes,
  ];
}
