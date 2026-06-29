import Link from "next/link";
import { site } from "@/data/site";
import { PlaceholderImage } from "./PlaceholderImage";
import { clsx } from "@/lib/utils";

type Variant = "default" | "soft" | "dark";

// Reusable CTA block. Drop in at the bottom of any page.
// FUTURE: lead-capture form variant will render here behind a feature flag.

export function CTASection({
  eyebrow = "Ready when you are",
  title = "Let’s match you with the right accountant.",
  description = "Take the free, no-pressure review and we'll find you a local firm that fits.",
  primaryLabel = "Take the free review",
  primaryHref = site.consultationUrl,
  secondaryLabel = "Talk to us",
  secondaryHref = "/contact",
  variant = "default",
  image = "/images/business-advisor-2.jpg",
  imageAlt = "A business adviser reviewing figures with a client",
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  variant?: Variant;
  /** Override the bottom photo (defaults to the shared styling-detail shot). */
  image?: string;
  imageAlt?: string;
}) {
  const isDark = variant === "dark";

  return (
    <section
      className={clsx(
        "relative overflow-hidden",
        // Soft blush wash on the light variants, keeps dark text/buttons fully legible.
        variant === "default" && "bg-blush-50",
        variant === "soft" && "bg-blush-100/70",
        isDark && "bg-cocoa-300 text-cream-50",
      )}
    >
      <div className="container-luxe relative grid gap-10 py-20 sm:py-28 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20">
        <div className="relative">
          <p
            className={clsx(
              "eyebrow",
              isDark && "text-champagne-light",
            )}
          >
            {eyebrow}
          </p>
          <h2
            className={clsx(
              "mt-4 text-balance text-4xl leading-[1.05] sm:text-5xl md:text-[3.75rem]",
              isDark && "text-cream-50",
            )}
          >
            {title}
          </h2>
          <p
            className={clsx(
              "mt-6 max-w-xl text-pretty text-base leading-relaxed sm:text-lg",
              isDark ? "text-cream-100/80" : "text-cocoa-50",
            )}
          >
            {description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={primaryHref ?? site.bookingUrl}
              target={primaryHref ? undefined : "_blank"}
              rel={primaryHref ? undefined : "noopener noreferrer"}
              className={clsx(
                "btn-primary",
                isDark && "bg-champagne",
              )}
            >
              {primaryLabel}
            </a>
            {secondaryLabel ? (
              <Link
                href={secondaryHref}
                className={clsx(
                  "btn-secondary",
                  isDark && "border-cream-100/40 text-cream-50 hover:bg-cream-50 hover:text-cocoa-300",
                )}
              >
                {secondaryLabel}
              </Link>
            ) : null}
          </div>
        </div>

        <div className="relative">
          <PlaceholderImage
            variant={isDark ? "default" : "blush"}
            src={image}
            className="aspect-[4/5] w-full"
            label={imageAlt}
          />
          <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-cream-50 p-5 shadow-xl shadow-cocoa-300/10 lg:block">
            <p className="text-xs uppercase tracking-widest text-champagne-dark">No cost to you</p>
            <p className="mt-1 font-serif text-xl text-cocoa-300">Free to be matched</p>
          </div>
        </div>
      </div>
    </section>
  );
}
