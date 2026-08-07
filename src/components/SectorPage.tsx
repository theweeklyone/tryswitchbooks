import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Check, ArrowRight } from "lucide-react";
import { getSector, sectors, SECTOR_FALLBACK_IMAGE } from "@/data/sectors";
import { site } from "@/data/site";
import { og } from "@/lib/og";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { PageFAQ } from "@/components/PageFAQ";
import { CTASection } from "@/components/CTASection";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

const SITE_URL = "https://www.tryswitchbooks.co.uk";

// Metadata for an industry page, built from the sector data. Title is absolute
// (already includes the brand); the shared og() helper supplies og:url + image.
export function sectorMetadata(slug: string): Metadata {
  const s = getSector(slug);
  if (!s) return {};
  return {
    title: { absolute: s.metaTitle },
    description: s.metaDescription,
    alternates: { canonical: `/${s.slug}` },
    openGraph: og(`/${s.slug}`),
  };
}

export function SectorPage({ slug }: { slug: string }) {
  const sector = getSector(slug);
  if (!sector) notFound();

  // Full interlink: every industry page links to the other three, so none is
  // left with a single inlink.
  const others = sectors.filter((s) => s.slug !== sector.slug);

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${sector.name} accountant matching service`,
    serviceType: "Accountant matching service",
    description: sector.metaDescription,
    url: `${SITE_URL}/${sector.slug}`,
    provider: { "@type": "Organization", "@id": `${SITE_URL}/#org`, name: site.name },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Sussex" },
      { "@type": "AdministrativeArea", name: "East Sussex" },
      { "@type": "AdministrativeArea", name: "West Sussex" },
      { "@type": "AdministrativeArea", name: "United Kingdom" },
    ],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "GBP",
      description: "Free for business owners. There is no charge to be matched.",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: `${sector.name} accountants`, path: `/${sector.slug}` },
        ]}
      />

      <PageHero
        eyebrow={`${sector.name} accountants`}
        title={sector.h1}
        description={sector.intro}
        imageStyle="default"
        image={sector.image ?? SECTOR_FALLBACK_IMAGE}
        imageAlt={
          sector.imageAlt ?? `An accountant advising a ${sector.name.toLowerCase()} business owner`
        }
      >
        <Link href={site.consultationUrl} className="btn-primary">
          Take the free review
        </Link>
        <Link href="/contact" className="btn-secondary">
          Talk to us
        </Link>
      </PageHero>

      {/* Sector-specific challenges */}
      <section className="py-20 sm:py-24">
        <div className="container-luxe">
          <SectionHeading eyebrow="Why it matters" title={sector.challengesTitle} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {sector.challenges.map((c) => (
              <div key={c.title} className="card-luxe p-7 sm:p-8">
                <h3 className="font-serif text-2xl text-cocoa-300">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cocoa-50 sm:text-base">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to look for */}
      <section className="bg-blush-50 py-20 sm:py-24">
        <div className="container-luxe grid gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            eyebrow="What good looks like"
            title={`What to look for in a ${sector.name.toLowerCase()} accountant.`}
            description="We match you against the things that actually matter for your business, not just the nearest firm."
          />
          <ul className="space-y-4">
            {sector.lookFor.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-champagne-dark" strokeWidth={2} aria-hidden />
                <span className="text-base leading-relaxed text-cocoa-100">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Services a good firm covers */}
      <section className="py-20 sm:py-24">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="What we'll match you with"
            title="The support a good firm brings."
            description="Whatever you need most, we'll connect you with a firm that's strong in exactly that area."
          />
          <ul className="mt-10 flex flex-wrap gap-3">
            {sector.serviceLinks.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-sand-100 bg-cream-50 px-5 py-2.5 text-sm text-cocoa-100 transition-colors hover:border-champagne hover:text-cocoa-300"
                >
                  {s.label}
                  <ArrowRight className="h-3.5 w-3.5 text-champagne-dark" strokeWidth={2} aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PageFAQ items={sector.faq} title={`${sector.name} accountants: your questions.`} background="blush" />

      {/* Other industries — full interlink between the four */}
      <section className="py-20 sm:py-24">
        <div className="container-luxe">
          <SectionHeading eyebrow="Also for" title="Accountants for other industries." />
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/${o.slug}`}
                className="card-luxe group flex flex-col gap-2 p-7 transition-colors hover:border-champagne"
              >
                <h3 className="font-serif text-xl text-cocoa-300">
                  {o.isHub ? "Small business accountants" : `${o.name} accountants`}
                </h3>
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-champagne-dark">
                  Explore
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="One small step"
        title="Find your firm. Free, no obligation."
        description="Take the free 2-minute review. Tell us about your business and we'll match you with a local firm that fits."
        primaryLabel="Take the free review"
        primaryHref={site.consultationUrl}
        secondaryLabel="Talk to us"
        secondaryHref="/contact"
      />
    </>
  );
}
