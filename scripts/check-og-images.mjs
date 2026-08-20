// Build guardrail: social-share (Open Graph / Twitter) images must render.
//
// WHY: when a page URL is pasted into X, LinkedIn, WhatsApp etc., the platform
// builds a preview card from the page's og:image. If that image is missing,
// tiny, or portrait, the card either doesn't show or looks broken. Every
// article's og:image is its entry in lib/blog-images.ts, and the site-wide
// default is src/app/opengraph-image.jpg. This check fails the build if any of
// them isn't a proper landscape share image, so a bad preview can't ship.
//
// Runs before `next build` (see package.json "build"). Sharp stays out of the
// Next bundle by living here.

import sharp from "sharp";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

// Share-card requirements. X/LinkedIn large cards want a landscape image; below
// ~1.4:1 they crop awkwardly or fall back to a tiny card, and small images are
// rejected. 1200px wide is the widely-recommended minimum.
const MIN_WIDTH = 1200;
const MIN_RATIO = 1.4; // width / height

const errors = [];

async function checkImage(label, absPath) {
  try {
    const m = await sharp(absPath).metadata();
    const ratio = m.width / m.height;
    if (m.width < MIN_WIDTH) {
      errors.push(`${label} (${absPath}) is ${m.width}px wide; share images need >= ${MIN_WIDTH}px.`);
    }
    if (ratio < MIN_RATIO) {
      errors.push(
        `${label} (${absPath}) is ${m.width}x${m.height} (${ratio.toFixed(2)}:1); ` +
          `share images must be landscape (>= ${MIN_RATIO}:1) or the preview card breaks.`,
      );
    }
  } catch {
    errors.push(`${label} image not found or unreadable: ${absPath}`);
  }
}

// 1) The site-wide default share image.
await checkImage("default opengraph-image", join(ROOT, "src/app/opengraph-image.jpg"));

// 2) Every article's share image, parsed from lib/blog-images.ts.
const blogImagesSrc = readFileSync(join(ROOT, "src/lib/blog-images.ts"), "utf8");
const srcs = [...blogImagesSrc.matchAll(/src:\s*"(\/images\/[^"]+)"/g)].map((m) => m[1]);
if (srcs.length === 0) {
  errors.push("No article share images found in lib/blog-images.ts (regex matched nothing).");
}
for (const src of srcs) {
  await checkImage(`article image ${src}`, join(ROOT, "public", src));
}

if (errors.length) {
  console.error("\n[check-og-images] Share images invalid, build blocked:\n  - " + errors.join("\n  - ") + "\n");
  process.exit(1);
}
console.log(`[check-og-images] OK: ${srcs.length + 1} share images are landscape and large enough.`);
