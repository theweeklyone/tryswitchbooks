import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { subServicesFor } from "@/data/sub-services";
import { ServiceCard } from "@/components/ServiceCard";
import { CTASection } from "@/components/CTASection";
import { PageFAQ } from "@/components/PageFAQ";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Accounting & Advisory Services",
  description:
    "Bookkeeping, year-end accounts, tax & VAT, payroll and proactive advisory support for UK and Sussex business owners. Take the free 2-minute review.",
  alternates: { canonical: "/services" },
};

const faqs = [
  {
    q: "Do I have to commit to anything to start?",
    a: "No. The best first step is our free, no-obligation review: a few quick questions about your business and what's frustrating you about your current setup. There's nothing to sign and no pressure.",
  },
  {
    q: "Can the firm you match me with take over from my current accountant?",
    a: "Yes, and it's usually far simpler than owners expect. The firm handles the professional handover and the paperwork. You don't need an awkward conversation. The transition is managed discreetly.",
  },
  {
    q: "Do you only cover Sussex businesses?",
    a: "We're Sussex-based and love matching local owners, but we work with trusted firms across the UK. If remote suits you better, that's no problem at all.",
  },
  {
    q: "What does it cost me?",
    a: "Nothing. Being matched is completely free for business owners. We're paid by the firms we partner with, and only when it's a good fit. The review captures your budget, so we only ever introduce firms whose fees suit you.",
  },
  {
    q: "What if I'm not sure exactly what I need?",
    a: "That's completely normal, and it's what the review is for. Tell us what's not working and what you're hoping for, and we'll match you with the right firm to sort it.",
  },
];

export default function ServicesPage() {
  const grouped = services.reduce<Record<string, typeof services>>((acc, s) => {
    (acc[s.category] ||= []).push(s);
    return acc;
  }, {});

  return (
    <>
      <PageHero
        eyebrow="What we'll match you with"
        title="Whatever your business needs, we'll find a firm that's great at it."
        description="From the day-to-day books to proactive, forward-looking advice. Tell us where it hurts and we'll connect you with a local firm that's strong in the areas that matter to you."
        imageStyle="default"
        image="/images/business-reports.jpg"
        imageAlt="Clear financial reports being reviewed at a meeting"
      >
        <Link href={site.consultationUrl} className="btn-primary">
          Take the free review
        </Link>
        <Link href="/how-it-works" className="btn-secondary">
          How it works
        </Link>
      </PageHero>

      {/* Not sure? Quiz prompt */}
      <section className="py-12">
        <div className="container-luxe">
          <div className="card-luxe flex flex-col items-start justify-between gap-5 bg-blush-50/60 p-7 sm:flex-row sm:items-center sm:p-8">
            <div className="max-w-2xl">
              <p className="eyebrow">Not sure what you need?</p>
              <p className="mt-2 font-serif text-2xl leading-tight text-cocoa-300 sm:text-3xl">
                Take the free business review and we'll point you to the right support.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-cocoa-50">
                A few quick questions, under two minutes. Your answers stay private.
              </p>
            </div>
            <Link href={site.consultationUrl} className="btn-primary whitespace-nowrap">
              Start the review
            </Link>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-20 sm:py-24">
        <div className="container-luxe grid gap-10 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            eyebrow="Our approach"
            title="We don't do your accounts. We find you someone brilliant who does."
          />
          <div className="space-y-5 text-base leading-relaxed text-cocoa-50 sm:text-lg">
            <p>
              Most owners don't leave their accountant because of one big mistake. They
              leave because of the silence: no proactive advice, no warning before a
              tax bill, no sense that anyone's really looking at their business.
            </p>
            <p>
              Switch Books fixes that. We get to know what's not working and what you need,
              then match you with a local firm that handles compliance early, explains
              things in plain English, and stays in touch through the year with ideas,
              not just invoices.
            </p>
            <p>
              The result is fewer surprises, less admin and a clearer head, so you can
              get on with the part you enjoy.
            </p>
          </div>
        </div>
      </section>

      {/* Services by category — pillar card + the full breadth it covers */}
      <section className="bg-blush-50 py-20 sm:py-24">
        <div className="container-luxe space-y-12 lg:space-y-16">
          {Object.entries(grouped).map(([category, items]) => {
            const pillar = items[0];
            const subs = subServicesFor(pillar.slug);
            return (
              <div
                key={category}
                className="grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12"
              >
                <ServiceCard service={pillar} />
                <div>
                  <div className="mb-5 flex items-baseline justify-between gap-3">
                    <h2 className="font-serif text-2xl text-cocoa-300 sm:text-3xl">{category}</h2>
                    <span className="whitespace-nowrap text-xs uppercase tracking-widest text-cocoa-50/70">
                      {subs.length} services
                    </span>
                  </div>
                  <p className="mb-5 text-sm leading-relaxed text-cocoa-50">
                    The kind of {category.toLowerCase()} work we'll match you with a firm to handle:
                  </p>
                  <ul className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                    {subs.map((sub) => (
                      <li key={sub.slug}>
                        <Link
                          href={`/services/${pillar.slug}/${sub.slug}`}
                          className="group flex items-start gap-2.5 text-sm text-cocoa-100 transition-colors hover:text-cocoa-300"
                        >
                          <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-champagne-dark transition-transform group-hover:translate-x-0.5" strokeWidth={2} aria-hidden />
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <PageFAQ items={faqs} title="Questions owners usually ask first." />

      <CTASection
        eyebrow="When you're ready"
        title="See what good looks like."
        description="Take the free review and we'll show you where you stand, and what proper support could do for your business."
        primaryLabel="Take the free review"
        primaryHref={site.consultationUrl}
        secondaryLabel="Talk to us"
        secondaryHref="/contact"
      />
    </>
  );
}
