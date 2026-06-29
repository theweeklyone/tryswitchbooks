import type { Metadata } from "next";
import { site } from "@/data/site";
import { LogoGloss } from "@/components/LogoGloss";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: `${site.name} · coming soon`,
  description: `${site.name} matches UK and Sussex business owners with the right local accounting firm. Our new website is launching soon.`,
  robots: { index: false, follow: false },
};

export default function ComingSoonPage() {
  return (
    <section className="relative flex h-[100svh] min-h-[26rem] flex-col items-center justify-center overflow-hidden bg-blush-100 px-6 py-[clamp(1rem,4vh,2.5rem)] text-center md:bg-blush-50">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-2/3 bg-gradient-to-b from-blush-100/55 via-blush-50/40 to-transparent"
      />

      <LogoGloss tone="ink" size="fluid" />

      <p className="eyebrow mt-[clamp(1rem,4.5vh,3rem)]">{site.brandPromise}</p>
      <h1 className="mt-[clamp(0.5rem,1.6vh,1.25rem)] max-w-4xl text-balance font-serif text-[clamp(1.75rem,5vw,4rem)] leading-[1.08] text-cocoa-300">
        The right local accountant, matched to your business.
      </h1>
      <p className="mt-[clamp(0.5rem,1.4vh,1rem)] max-w-xl text-[clamp(0.85rem,1.1vw,1rem)] leading-relaxed text-cocoa-50">
        Our new website is on its way. In the meantime, get in touch and tell us what's not
        working with your current accountant. We'll help you find better.
      </p>

      <div className="mt-[clamp(1.25rem,4.5vh,3rem)] flex flex-wrap items-center justify-center gap-3">
        <a href={site.contact.phoneHref} className="btn-primary">
          Call {site.contact.phoneDisplay}
        </a>
        <a href={site.contact.emailHref} className="btn-secondary">
          Email us
        </a>
      </div>

      <div className="mt-[clamp(2rem,6vh,4rem)] flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-cocoa-50">
        <span className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-champagne-dark" strokeWidth={1.5} aria-hidden />
          {site.contact.phoneDisplay}
        </span>
        <a href={site.contact.emailHref} className="flex items-center gap-2 hover:text-cocoa-300">
          <Mail className="h-4 w-4 text-champagne-dark" strokeWidth={1.5} aria-hidden />
          {site.contact.emailDisplay}
        </a>
        <span className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-champagne-dark" strokeWidth={1.5} aria-hidden />
          {site.location.short}
        </span>
      </div>

      <p className="mt-[clamp(1.25rem,4.5vh,2.75rem)] text-[clamp(0.6rem,0.9vw,0.7rem)] uppercase tracking-widest text-cocoa-50/50">
        {site.brandPromise} · {site.location.short}
      </p>
    </section>
  );
}
