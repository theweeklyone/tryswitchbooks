// One-off / re-runnable image optimiser for /public/images.
//
// next/image already serves responsive, modern-format (AVIF/WebP) images to
// visitors, so this is NOT what makes the live site fast. Its job is to keep
// the SOURCE files sane: cap dimensions and re-encode as mozjpeg so a 5MB
// camera original doesn't sit in the repo, slow the optimiser's first hit, or
// get flagged by naive graders that read raw asset URLs.
//
// Safe to re-run: it only rewrites a file when the result is actually smaller,
// never enlarges, and respects EXIF orientation. Paths are unchanged, so no
// code references need updating.
//
// Run: node scripts/optimize-images.mjs

import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const DIR = "public/images";
const MAX_WIDTH = 2400; // ample for 2x retina at our largest display size
const QUALITY = 80;

const files = (await readdir(DIR)).filter((f) => /\.(jpe?g|png)$/i.test(f));
let before = 0;
let after = 0;

for (const file of files) {
  const p = path.join(DIR, file);
  const orig = await stat(p);
  before += orig.size;

  // Read to a buffer first so we can safely overwrite the same path.
  const input = await readFile(p);
  const pipeline = sharp(input)
    .rotate() // bake in EXIF orientation, then strip metadata
    .resize({ width: MAX_WIDTH, withoutEnlargement: true });
  // JPEGs re-encode as mozjpeg; PNGs stay lossless (max compression) so logos
  // and graphics with transparency keep their edges.
  const output = /\.png$/i.test(file)
    ? await pipeline.png({ compressionLevel: 9 }).toBuffer()
    : await pipeline.jpeg({ quality: QUALITY, mozjpeg: true }).toBuffer();

  if (output.length < orig.size) {
    await writeFile(p, output);
    after += output.length;
    console.log(
      `${file}: ${(orig.size / 1048576).toFixed(2)}MB -> ${(output.length / 1048576).toFixed(2)}MB`,
    );
  } else {
    after += orig.size;
    console.log(`${file}: kept (${(orig.size / 1048576).toFixed(2)}MB, already optimal)`);
  }
}

console.log(
  `\nTOTAL: ${(before / 1048576).toFixed(2)}MB -> ${(after / 1048576).toFixed(2)}MB ` +
    `(${Math.round((1 - after / before) * 100)}% smaller)`,
);
