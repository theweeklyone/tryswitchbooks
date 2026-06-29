import { PlaceholderImage } from "./PlaceholderImage";
import { clsx } from "@/lib/utils";

// Lightweight hero for inner pages (services, team, contact, etc.).
// The homepage uses a richer custom hero, see app/page.tsx.

export function PageHero({
  eyebrow,
  title,
  description,
  imageStyle = "default",
  image,
  imageAlt,
  align = "left",
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  imageStyle?: "default" | "blush" | "mocha";
  /** Optional real photo path; falls back to the brand gradient when absent. */
  image?: string;
  imageAlt?: string;
  align?: "left" | "center";
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-28 lg:pt-36">
      {/* Soft blush wash fading down from the top, warmth without touching text contrast. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-gradient-to-b from-blush-100/55 via-blush-50/40 to-transparent"
      />
      <div className="container-luxe relative grid gap-10 pb-16 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-20 lg:pb-24">
        <div className={clsx(align === "center" && "text-center mx-auto max-w-3xl")}>
          {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
          <h1 className="text-balance font-serif text-5xl leading-[1.04] text-cocoa-300 sm:text-6xl md:text-[4.5rem]">
            {title}
          </h1>
          {description ? (
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-cocoa-50">
              {description}
            </p>
          ) : null}
          {children ? <div className="mt-8 flex flex-wrap gap-3">{children}</div> : null}
        </div>
        <div className="relative">
          <PlaceholderImage
            variant={imageStyle}
            className="aspect-[4/5] w-full"
            label={imageAlt ?? title}
            priority
            src={image}
            seed={
              image
                ? undefined
                : `page-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 60)}`
            }
          />
        </div>
      </div>
      <div className="divider-soft" />
    </section>
  );
}
