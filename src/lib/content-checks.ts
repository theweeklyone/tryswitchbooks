// Build-time content guardrails for insight articles.
//
// WHY: articles are authored in data/blog.ts while their imagery lives in
// lib/blog-images.ts, keyed by slug. That decoupling made it possible to add a
// post with NO matching image — which shipped once. assertContentValid() closes
// that gap: it runs during `next build` (called from app/sitemap.ts, which is
// always generated) and THROWS on a missing image, so an imageless or
// un-optimised article can never reach production. SEO-hygiene issues are logged
// as warnings so they surface in the build log without breaking deploys.
//
// To add a new article: add the post in data/blog.ts AND an image entry in
// lib/blog-images.ts. If you forget the image, the build will fail here.
//
// It also enforces meta-description length on service, sub-service and town
// pages (Google truncates long descriptions), so an over-long one fails the build.

import { blogPosts } from "@/data/blog";
import { blogImages } from "@/lib/blog-images";
import { services } from "@/data/services";
import { subServices } from "@/data/sub-services";
import { locations } from "@/data/locations";
import { sectors } from "@/data/sectors";

// SEO soft limits (warn, don't fail). Titles read best under ~60 chars in SERPs;
// excerpts double as the meta description, ideal ~110–160 chars.
const TITLE_MAX = 60;
const EXCERPT_MIN = 110;
const EXCERPT_MAX = 160;
// Hard limit: Google truncates meta descriptions around here, so block the build.
const DESC_MAX = 160;

let checked = false;

export function assertContentValid(): void {
  // Run once per process; cheap and idempotent.
  if (checked) return;
  checked = true;

  const errors: string[] = [];
  const warnings: string[] = [];

  for (const post of blogPosts) {
    const img = blogImages[post.slug];

    // HARD REQUIREMENTS — a violation fails the build.
    if (!img?.src) {
      errors.push(`"${post.slug}" has no image (add an entry in lib/blog-images.ts).`);
    }
    if (img?.src && !img.alt) {
      errors.push(`"${post.slug}" image is missing alt text (needed for a11y + SEO).`);
    }
    if (!post.title.trim()) errors.push(`"${post.slug}" has an empty title.`);
    if (!post.excerpt.trim()) errors.push(`"${post.slug}" has an empty excerpt.`);
    if (!post.body.some((b) => b.type === "h2")) {
      errors.push(`"${post.slug}" has no h2 headings (needed for structure + rich results).`);
    }

    // SOFT SEO GUIDANCE — warn only.
    if (post.excerpt.length < EXCERPT_MIN || post.excerpt.length > EXCERPT_MAX) {
      warnings.push(
        `"${post.slug}" excerpt is ${post.excerpt.length} chars (aim ${EXCERPT_MIN}–${EXCERPT_MAX} for the meta description).`,
      );
    }
  }

  // Meta descriptions on service, sub-service and town pages must not exceed the
  // length Google truncates at. A violation fails the build.
  const metaSources = [
    ...services.map((s) => ({ what: `service "${s.slug}"`, desc: s.metaDescription })),
    ...subServices.map((s) => ({ what: `sub-service "${s.slug}"`, desc: s.metaDescription })),
    ...locations.map((l) => ({ what: `town "${l.slug}"`, desc: l.metaDescription })),
    ...sectors.map((s) => ({ what: `sector "${s.slug}"`, desc: s.metaDescription })),
  ];
  for (const { what, desc } of metaSources) {
    if (desc.length > DESC_MAX) {
      errors.push(`${what} meta description is ${desc.length} chars (max ${DESC_MAX}).`);
    }
  }

  // <title> length. Article titles render without the brand suffix; town
  // metaTitles already include the brand — both are the literal <title>, so keep
  // them within the SERP truncation limit. A violation fails the build.
  const titleSources = [
    ...blogPosts.map((p) => ({ what: `article "${p.slug}"`, title: p.title })),
    ...locations.map((l) => ({ what: `town "${l.slug}"`, title: l.metaTitle })),
    ...sectors.map((s) => ({ what: `sector "${s.slug}"`, title: s.metaTitle })),
  ];
  for (const { what, title } of titleSources) {
    if (title.length > TITLE_MAX) {
      errors.push(`${what} <title> is ${title.length} chars (max ${TITLE_MAX}).`);
    }
  }

  if (warnings.length) {
    console.warn("\n[content-checks] SEO warnings:\n  - " + warnings.join("\n  - ") + "\n");
  }
  if (errors.length) {
    throw new Error(
      "[content-checks] Article content is invalid — build blocked:\n  - " +
        errors.join("\n  - "),
    );
  }
}
