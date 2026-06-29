import Link from "next/link";
import { Service } from "@/data/services";
import { ServiceIcon } from "./ServiceIcon";

// Fully clickable card via the "stretched link" pattern: the link's
// after-pseudo-element covers the whole card, while the anchor text stays
// short and unique per card (good for SEO/accessibility).

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="card-luxe group relative flex h-full flex-col p-7 sm:p-8">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blush-50 text-champagne-dark">
        <ServiceIcon name={service.icon} className="h-6 w-6" />
      </span>
      <p className="eyebrow mt-6">{service.category}</p>
      <h3 className="mt-2 font-serif text-2xl text-cocoa-300 sm:text-[1.65rem]">
        <Link
          href={`/services/${service.slug}`}
          className="after:absolute after:inset-0 after:content-['']"
        >
          {service.name}
        </Link>
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-cocoa-50">{service.short}</p>
      <div className="mt-auto pt-6">
        <span
          aria-hidden
          className="text-xs uppercase tracking-widest text-cocoa-300 transition-transform duration-300 group-hover:translate-x-1"
        >
          Learn more →
        </span>
      </div>
    </article>
  );
}
