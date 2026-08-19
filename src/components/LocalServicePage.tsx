import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Check, ArrowRight } from "lucide-react";
import { getService } from "@/data/services";
import { getLocation } from "@/data/locations";
import { getLocalService } from "@/data/local-services";
import { site } from "@/data/site";
import { og } from "@/lib/og";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { PageFAQ } from "@/components/PageFAQ";
import { CTASection } from "@/components/CTASection";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

const SITE_URL = "https://www.tryswitchbooks.co.uk";

export function localServiceMetadata(town: string, service: string): Metadata {
  const combo = getLocalService(town, service);
  if (!combo) return {};
  return {
    title: { absolute: combo.metaTitle },
    description: combo.metaDescription,
    alternates: { canonical: `/accountants/${town}/${service}` },
    openGraph: og(`/accountants/${town}/${service}`),
  };
}

export function LocalServicePage({ town, service }: { town: string; service: string }) {
  const combo = getLocalService(town, service);
  const loc = getLocation(town);
  const svc = getService(service);
  if (!combo || !loc || !svc) notFound();

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: combo.h1,
    serviceType: "Accountant matching service",
    description: combo.metaDescription,
    url: `${SITE_URL}/accountants/${town}/${service}`,
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
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Find an accountant", path: "/accountants" },
          { name: loc.name, path: `/accountants/${loc.slug}` },
          { name: combo.h1, path: `/accountants/${loc.slug}/${svc.slug}` },
        ]}
      />

      <PageHero
        eyebrow={`${svc.name} · ${loc.name}`}
        title={combo.h1}
        description={combo.intro}
        imageStyle="default"
        image="/images/business-reports.jpg"
        imageAlt={`${svc.name} being handled for a ${loc.name} business`}
      >
        <Link href={site.consultationUrl} className="btn-primary">
          Take the free review
        </Link>
        <Link href="/contact" className="btn-secondary">
          Talk to us
        </Link>
      </PageHero>

      {/* What a good firm delivers (service substance) */}
      <section className="py-20 sm:py-24">
        <div className="container-luxe grid gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            eyebrow="What good looks like"
            title={`What a great ${loc.name} firm delivers.`}
            description={svc.outcome.summary}
          />
          <ul className="space-y-4">
            {svc.whatYouGet.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-champagne-dark" strokeWidth={2} aria-hidden />
                <span className="text-base leading-relaxed text-cocoa-100">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Local angle (town substance) */}
      <section className="bg-blush-50 py-20 sm:py-24">
        <div className="container-luxe grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <SectionHeading eyebrow={`Local to ${loc.name}`} title={`Why a ${loc.name} firm helps.`} />
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-cocoa-50 sm:text-lg">{loc.whyLocal}</p>
            <ul className="flex flex-wrap gap-3">
              {loc.sectors.slice(0, 6).map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-sand-100 bg-cream-50 px-4 py-2 text-sm text-cocoa-100"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <PageFAQ items={svc.faq.slice(0, 3)} title={`${svc.name} in ${loc.name}: your questions.`} />

      {/* Links back to the parent service + town pages */}
      <section className="py-16">
        <div className="container-luxe flex flex-wrap gap-3">
          <Link
            href={`/services/${svc.slug}`}
            className="inline-flex items-center gap-2 rounded-full border border-sand-100 bg-cream-50 px-5 py-2.5 text-sm text-cocoa-100 transition-colors hover:border-champagne hover:text-cocoa-300"
          >
            More on {svc.name}
            <ArrowRight className="h-3.5 w-3.5 text-champagne-dark" strokeWidth={2} aria-hidden />
          </Link>
          <Link
            href={`/accountants/${loc.slug}`}
            className="inline-flex items-center gap-2 rounded-full border border-sand-100 bg-cream-50 px-5 py-2.5 text-sm text-cocoa-100 transition-colors hover:border-champagne hover:text-cocoa-300"
          >
            All accountants in {loc.name}
            <ArrowRight className="h-3.5 w-3.5 text-champagne-dark" strokeWidth={2} aria-hidden />
          </Link>
        </div>
      </section>

      <CTASection
        eyebrow="One small step"
        title={`Find your ${loc.name} firm. Free, no obligation.`}
        description="Take the free 2-minute review. Tell us what you need and we'll match you with a local firm that fits."
        primaryLabel="Take the free review"
        primaryHref={site.consultationUrl}
        secondaryLabel="Talk to us"
        secondaryHref="/contact"
      />
    </>
  );
}
