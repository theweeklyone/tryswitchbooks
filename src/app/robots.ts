import type { MetadataRoute } from "next";

const SITE = "https://www.tryswitchbooks.co.uk";

// FUTURE: when the client portal launches with real auth, the /client/*
// rules can stay (those routes will still be auth-gated and noindex). The
// /dashboard/* rules also stay; that route is internal-only.

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard/",
          "/client/",
          "/products/recommendations",
        ],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
