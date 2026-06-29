import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Check, ArrowRight } from "lucide-react";
import { services, getService } from "@/data/services";
import { subServicesFor } from "@/data/sub-services";
import { site } from "@/data/site";
import { ServiceIcon } from "@/components/ServiceIcon";
import { ServiceCard } from "@/components/ServiceCard";
import { PageFAQ } from "@/components/PageFAQ";
import { CTASection } from "@/components/CTASection";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = getService(params.slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = getService(params.slug);
  if (!service) notFound();

  const related = service.relatedServiceSlugs
    .map((slug) => getService(slug))
    .filter(Boolean) as typeof services;

  const subs = subServicesFor(service.slug);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 lg:pt-36">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-gradient-to-b from-blush-100/55 via-blush-50/40 to-transparent"
        />
        <div className="container-luxe relative pb-16 lg:pb-20">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blush-50 text-champagne-dark">
            <ServiceIcon name={service.icon} className="h-7 w-7" />
          </span>
          <p className="eyebrow mt-6">{service.hero.eyebrow}</p>
          <h1 className="mt-3 max-w-3xl text-balance font-serif text-4xl leading-[1.05] text-cocoa-300 sm:text-5xl md:text-[3.75rem]">
            {service.hero.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-cocoa-50">
            {service.hero.subheading}
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

      {/* Sound familiar? The frustrations this takes away */}
      <section className="py-20 sm:py-24">
        <div className="container-luxe grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <SectionHeading
            eyebrow="Sound familiar?"
            title="If any of this rings true, you're not alone."
            description="These are the things owners tell us they're tired of. We'll match you with a firm that makes them go away."
          />
          <ul className="space-y-4">
            {service.problems.map((p) => (
              <li
                key={p}
                className="card-luxe flex items-start gap-3 p-5 text-cocoa-100"
              >
                <span aria-hidden className="mt-1 font-serif text-xl text-champagne-dark">
                  &ldquo;
                </span>
                <span className="text-sm leading-relaxed sm:text-base">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What you get */}
      <section className="bg-blush-50 py-20 sm:py-24">
        <div className="container-luxe grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading eyebrow="What good looks like" title="What a great firm delivers." />
            <ul className="mt-8 space-y-4">
              {service.whatYouGet.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-champagne-dark" strokeWidth={2} aria-hidden />
                  <span className="text-base leading-relaxed text-cocoa-100">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card-luxe p-8 sm:p-10">
            <p className="eyebrow">The outcome</p>
            <p className="mt-3 font-serif text-2xl leading-snug text-cocoa-300">
              {service.outcome.summary}
            </p>
            <ul className="mt-6 space-y-3">
              {service.outcome.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-cocoa-50">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-champagne-dark" strokeWidth={2} aria-hidden />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Everything this area covers — links to the sub-service pages */}
      {subs.length ? (
        <section className="py-20 sm:py-24">
          <div className="container-luxe">
            <SectionHeading
              eyebrow="The full picture"
              title="Everything this area can cover."
              description="One firm, the whole area off your plate. Tap any service to see how it works, then we'll match you with a firm that handles the parts you need."
            />
            <ul className="mt-12 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
              {subs.map((sub) => (
                <li key={sub.slug}>
                  <Link
                    href={`/services/${service.slug}/${sub.slug}`}
                    className="group flex items-start gap-3 border-b border-sand-100/70 pb-3 text-base text-cocoa-100 transition-colors hover:text-cocoa-300"
                  >
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-champagne-dark transition-transform group-hover:translate-x-0.5" strokeWidth={2} aria-hidden />
                    {sub.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* Who it's for */}
      <section className="bg-blush-50 py-20 sm:py-24">
        <div className="container-luxe">
          <SectionHeading eyebrow="Who it's for" title="A good fit if you're…" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {service.forWho.map((w, i) => (
              <Reveal key={w} className="h-full">
                <div className="card-luxe h-full p-7">
                  <p className="font-serif text-3xl text-champagne-dark">0{i + 1}</p>
                  <p className="mt-4 text-sm leading-relaxed text-cocoa-50">{w}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <PageFAQ items={service.faq} title="Good to know." />

      {/* Related services */}
      {related.length ? (
        <section className="bg-blush-50 py-20 sm:py-24">
          <div className="container-luxe">
            <SectionHeading eyebrow="Works well with" title="The rest of the picture." />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s) => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CTASection
        eyebrow="One small step"
        title="See where you stand. Free, no obligation."
        description="The 2-minute review tells us what's not working and what you're hoping for. We'll come back with honest, practical next steps."
        primaryLabel="Take the free review"
        primaryHref={site.consultationUrl}
        secondaryLabel="Talk to us"
        secondaryHref="/contact"
      />
    </>
  );
}
