import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, Check, MapPin } from "lucide-react";
import { locations, getLocation } from "@/data/locations";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { ServiceIcon } from "@/components/ServiceIcon";
import { PageFAQ } from "@/components/PageFAQ";
import { CTASection } from "@/components/CTASection";
import { SectionHeading } from "@/components/SectionHeading";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

const SITE_URL = "https://www.tryswitchbooks.co.uk";

export function generateStaticParams() {
  return locations.map((l) => ({ town: l.slug }));
}

export function generateMetadata({ params }: { params: { town: string } }): Metadata {
  const loc = getLocation(params.town);
  if (!loc) return {};
  return {
    title: { absolute: loc.metaTitle },
    description: loc.metaDescription,
    alternates: { canonical: `/accountants/${loc.slug}` },
  };
}

export default function LocationPage({ params }: { params: { town: string } }) {
  const loc = getLocation(params.town);
  if (!loc) notFound();

  // Service area schema. Switch Books is a free matching service with no
  // premises, so this advertises the service and its areaServed only, never a
  // postal address. provider points back to the homepage Organization node.
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Accountant matching service in ${loc.name}`,
    serviceType: "Accountant matching service",
    description: loc.metaDescription,
    url: `${SITE_URL}/accountants/${loc.slug}`,
    provider: { "@type": "Organization", "@id": `${SITE_URL}/#org`, name: site.name },
    areaServed: [
      { "@type": "City", name: loc.name },
      ...loc.nearbyAreas.map((name) => ({ "@type": "Place", name })),
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Find an accountant", path: "/accountants" },
          { name: loc.name, path: `/accountants/${loc.slug}` },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 lg:pt-36">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-gradient-to-b from-blush-100/55 via-blush-50/40 to-transparent"
        />
        <div className="container-luxe relative pb-16 lg:pb-20">
          <nav className="flex flex-wrap items-center gap-1.5 text-xs uppercase tracking-widest text-cocoa-50/70">
            <Link href="/accountants" className="hover:text-cocoa-300">Find an accountant</Link>
            <span aria-hidden>/</span>
            <span className="text-cocoa-100">{loc.name}</span>
          </nav>
          <p className="eyebrow mt-6 inline-flex items-center gap-2">
            <MapPin className="h-4 w-4 text-champagne-dark" strokeWidth={2} aria-hidden />
            {loc.county}
          </p>
          <h1 className="mt-3 max-w-3xl text-balance font-serif text-4xl leading-[1.05] text-cocoa-300 sm:text-5xl md:text-[3.75rem]">
            {loc.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-cocoa-50">
            {loc.intro}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={site.consultationUrl} className="btn-primary">
              Take the free review
            </Link>
            <Link href="/contact" className="btn-secondary">
              Talk to us
            </Link>
          </div>
          <p className="mt-5 text-sm text-cocoa-50/80">
            Free for business owners. No sign-up required, just leave the details you would like
            someone to contact you on and we will handle the rest.
          </p>
        </div>
        <div className="divider-soft" />
      </section>

      {/* Local context */}
      <section className="py-20 sm:py-24">
        <div className="container-luxe grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <SectionHeading
            eyebrow={`Business in ${loc.name}`}
            title={`We know what ${loc.name} owners need from an accountant.`}
          />
          <div className="space-y-5 text-base leading-relaxed text-cocoa-50 sm:text-lg">
            <p>{loc.localContext}</p>
            <p>{loc.whyLocal}</p>
          </div>
        </div>
      </section>

      {/* Sectors we match for */}
      <section className="bg-blush-50 py-20 sm:py-24">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Local know-how"
            title={`Common ${loc.name} businesses we match.`}
            description={`Whatever you run, we'll find a firm that has worked with businesses like yours in and around ${loc.name}.`}
          />
          <ul className="mt-10 flex flex-wrap gap-3">
            {loc.sectors.map((s) => (
              <li
                key={s}
                className="rounded-full border border-sand-100 bg-cream-50 px-5 py-2.5 text-sm text-cocoa-100"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What we'll match you with — links to the service pillars */}
      <section className="py-20 sm:py-24">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="What we'll match you with"
            title={`Every kind of accounting support, matched locally to ${loc.name}.`}
            description="Tell us where it hurts and we'll connect you with a firm that's strong in exactly that area."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="card-luxe group flex flex-col gap-3 p-7 transition-colors hover:border-champagne"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blush-50 text-champagne-dark">
                  <ServiceIcon name={s.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-1 font-serif text-xl text-cocoa-300">{s.name}</h3>
                <p className="flex-1 text-sm leading-relaxed text-cocoa-50">{s.short}</p>
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-champagne-dark">
                  Explore
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby areas */}
      <section className="bg-blush-50 py-16">
        <div className="container-luxe">
          <p className="eyebrow">We also cover nearby</p>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-cocoa-50">
            Based just outside {loc.name}? We match owners across the surrounding area too, including{" "}
            {loc.nearbyAreas.slice(0, -1).join(", ")} and {loc.nearbyAreas[loc.nearbyAreas.length - 1]}.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {loc.nearbyAreas.map((a) => (
              <span
                key={a}
                className="inline-flex items-center gap-1.5 text-sm text-cocoa-100"
              >
                <Check className="h-4 w-4 text-champagne-dark" strokeWidth={2} aria-hidden />
                {a}
              </span>
            ))}
          </div>
        </div>
      </section>

      <PageFAQ items={loc.faq} title={`Accountants in ${loc.name}: your questions.`} />

      <CTASection
        eyebrow="One small step"
        title={`Find your ${loc.name} accountant. Free, no obligation.`}
        description="Take the free 2-minute review. Tell us what's not working and we'll match you with a local firm that fixes it."
        primaryLabel="Take the free review"
        primaryHref={site.consultationUrl}
        secondaryLabel="Talk to us"
        secondaryHref="/contact"
      />
    </>
  );
}
