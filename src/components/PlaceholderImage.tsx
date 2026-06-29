"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { clsx } from "@/lib/utils";

type Style = "default" | "blush" | "mocha";

const styleClass: Record<Style, string> = {
  default: "image-placeholder",
  blush: "image-placeholder-blush",
  mocha: "image-placeholder-mocha",
};

/**
 * Build a deterministic Lorem Picsum URL for a given seed. Grayscale by
 * default so stock placeholders read as quiet, editorial and clearly not
 * final photography.
 */
export function stockPlaceholderUrl(
  seed: string,
  options?: { width?: number; height?: number; grayscale?: boolean },
): string {
  const w = options?.width ?? 1200;
  const h = options?.height ?? 1500;
  const grayscale = options?.grayscale ?? true;
  const safe = encodeURIComponent(`switchbooks-${seed}`);
  const qs = grayscale ? "?grayscale" : "";
  return `https://picsum.photos/seed/${safe}/${w}/${h}${qs}`;
}

// Brand-aligned image in a fixed frame.
//
// Behaviour:
//   - `src` renders a real photo. `seed` renders a deterministic stock image.
//     Either way the photo sits in an overflow-hidden frame, scales gently on
//     hover (non-touch), and blurs up as it loads. Otherwise the brand
//     gradient shows. The gradient also sits behind every photo as the load
//     placeholder.

export function PlaceholderImage({
  variant = "default",
  className,
  label,
  rounded = "rounded-3xl",
  seed,
  src,
  grayscale = false,
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  variant?: Style;
  className?: string;
  label?: string;
  rounded?: string;
  /** Optional seed for the deterministic stock image. */
  seed?: string;
  /** Optional explicit image URL. Wins over seed. */
  src?: string;
  /** Render the photo in black & white (e.g. an editorial founder portrait). */
  grayscale?: boolean;
  /** Preload as the LCP image (above-the-fold heroes). Skips the blur-up so it
   *  paints immediately. */
  priority?: boolean;
  /** Responsive sizes hint for the optimiser. Override for full-bleed images. */
  sizes?: string;
}) {
  const imageSrc = src ?? (seed ? stockPlaceholderUrl(seed) : null);
  // A real, final photo (explicit `src`) renders clean, no placeholder caption
  // or grain. `label` becomes its alt text.
  const isRealPhoto = Boolean(src);

  // Priority (LCP) images skip the blur-up so they are visible the instant they
  // paint, rather than waiting on hydration to clear the loading state.
  const [loaded, setLoaded] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Images served from cache can finish before onLoad attaches.
    if (imgRef.current?.complete) setLoaded(true);
  }, [imageSrc]);

  return (
    <div
      role="img"
      aria-label={label ?? "Switch Books imagery"}
      className={clsx(
        "media-frame relative overflow-hidden",
        !isRealPhoto && "grain",
        styleClass[variant],
        rounded,
        className,
      )}
    >
      {imageSrc ? (
        <Image
          ref={imgRef}
          src={imageSrc}
          alt={label ?? ""}
          fill
          sizes={sizes}
          priority={priority}
          onLoad={() => setLoaded(true)}
          className={clsx(
            "media-img object-cover",
            grayscale && "grayscale",
            !loaded && "is-loading",
          )}
        />
      ) : null}
      {!isRealPhoto ? (
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-cocoa-300/15" />
      ) : null}
      {label && !isRealPhoto ? (
        <div className="absolute bottom-4 left-5 right-5 flex justify-between text-[10px] uppercase tracking-widest text-cream-50/80 mix-blend-overlay">
          <span>{label}</span>
          <span>Switch Books</span>
        </div>
      ) : null}
    </div>
  );
}
