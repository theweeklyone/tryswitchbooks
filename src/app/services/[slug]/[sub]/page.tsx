import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Check, ArrowRight, ArrowLeft } from "lucide-react";
import { getService } from "@/data/services";
import { subServices, getSubService, subServicesFor } from "@/data/sub-services";
import { site } from "@/data/site";
import { ServiceIcon } from "@/components/ServiceIcon";
import { PageFAQ } from "@/components/PageFAQ";
import { CTASection } from "@/components/CTASection";
import { SectionHeading } from "@/components/SectionHeading";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

export function generateStaticParams() {
  return subServices.map((s) => ({ slug: s.parentSlug, sub: s.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string; sub: string };
}): Metadata {
  const sub = getSubService(params.slug, params.sub);
  if (!sub) return {};
  return {
    title: sub.metaTitle,
    description: sub.metaDescription,
    alternates: { canonical: `/services/${sub.parentSlug}/${sub.slug}` },
  };
}

export default function SubServicePage({
  params,
}: {
  params: { slug: string; sub: string };
}) {
  const sub = getSubService(params.slug, params.sub);
  const parent = getService(params.slug);
  if (!sub || !parent) notFound();

  const siblings = subServicesFor(parent.slug).filter((s) => s.slug !== sub.slug);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: parent.name, path: `/services/${parent.slug}` },
          { name: sub.name, path: `/services/${parent.slug}/${sub.slug}` },
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
            <Link href="/services" className="hover:text-cocoa-300">Services</Link>
            <span aria-hidden>/</span>
            <Link href={`/services/${parent.slug}`} className="hover:text-cocoa-300">
              {parent.name}
            </Link>
          </nav>
          <span className="mt-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blush-50 text-champagne-dark">
            <ServiceIcon name={parent.icon} className="h-7 w-7" />
          </span>
          <p className="eyebrow mt-6">{parent.name}</p>
          <h1 className="mt-3 max-w-3xl text-balance font-serif text-4xl leading-[1.05] text-cocoa-300 sm:text-5xl md:text-[3.5rem]">
            {sub.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-cocoa-50">
            {sub.intro}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={site.consultationUrl} className="btn-primary">
              Take the free review
            </Link>
            <Link href="/contact" className="btn-secondary">
              Talk to us
            </Link>
          </div>
        </div>
        <div className="divider-soft" />
      </section>

      {/* What's involved */}
      <section className="py-20 sm:py-24">
        <div className="container-luxe grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading eyebrow="What's involved" title={`What ${sub.name.toLowerCase()} covers.`} />
          </div>
          <ul className="space-y-4">
            {sub.whatItCovers.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-champagne-dark" strokeWidth={2} aria-hidden />
                <span className="text-base leading-relaxed text-cocoa-100">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why it matters */}
      <section className="bg-blush-50 py-20 sm:py-24">
        <div className="container-luxe max-w-3xl">
          <p className="eyebrow">Why it matters</p>
          <p className="mt-4 font-serif text-2xl leading-snug text-cocoa-300 sm:text-3xl">
            {sub.whyItMatters}
          </p>
        </div>
      </section>

      <PageFAQ items={sub.faq} title="Good to know." />

      {/* More in this area */}
      {siblings.length ? (
        <section className="bg-blush-50 py-20 sm:py-24">
          <div className="container-luxe">
            <SectionHeading eyebrow={parent.name} title="More in this area." />
            <ul className="mt-12 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
              {siblings.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${parent.slug}/${s.slug}`}
                    className="group flex items-start gap-3 border-b border-sand-100/70 pb-3 text-base text-cocoa-100 transition-colors hover:text-cocoa-300"
                  >
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-champagne-dark transition-transform group-hover:translate-x-0.5" strokeWidth={2} aria-hidden />
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={`/services/${parent.slug}`}
              className="mt-10 inline-flex items-center gap-2 text-sm uppercase tracking-widest text-champagne-dark hover:text-cocoa-300"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.5} /> Back to {parent.name}
            </Link>
          </div>
        </section>
      ) : null}

      <CTASection
        eyebrow="One small step"
        title="Get matched with a firm that handles this."
        description="Take the free, no-obligation review. Tell us what you need and we'll introduce you to a local firm that does it well."
        primaryLabel="Take the free review"
        primaryHref={site.consultationUrl}
        secondaryLabel="Talk to us"
        secondaryHref="/contact"
      />
    </>
  );
}
