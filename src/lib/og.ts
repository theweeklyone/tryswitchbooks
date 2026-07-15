import type { Metadata } from "next";

const SITE_URL = "https://www.tryswitchbooks.co.uk";

// The default social-share image (the app-root opengraph-image.jpg), declared
// explicitly. Next replaces a route's `openGraph` wholesale rather than merging
// it, so any page that sets its own openGraph must re-include the image or it
// silently drops off (this is why the /advice articles had no og:image).
const OG_IMAGE = {
  url: `${SITE_URL}/opengraph-image.jpg`,
  width: 3800,
  height: 2138,
  type: "image/jpeg",
  alt: "Switch Books — the right local accountant, matched to your business. A free service connecting UK and Sussex business owners with trusted local accounting firms.",
};

// Build a complete, valid Open Graph block for a page. Always includes og:url
// (a required OG property that the SEO audit flagged missing on every page),
// plus site name, locale and the share image. og:title / og:description fall
// back to the page's own title / description automatically.
export function og(
  path: string,
  type: "website" | "article" = "website",
): NonNullable<Metadata["openGraph"]> {
  return {
    type,
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    siteName: "Switch Books",
    locale: "en_GB",
    images: [OG_IMAGE],
  } as NonNullable<Metadata["openGraph"]>;
}
