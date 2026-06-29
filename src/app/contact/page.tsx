import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "./ContactForm";
import { site } from "@/data/site";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { getContentMap, cval } from "@/lib/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Contact",
  description: `Talk to ${site.name} about your accounting and advisory needs. Sussex-based, supporting business owners across the UK. Or take the free 2-minute review.`,
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const content = await getContentMap();
  return (
    <>
      <PageHero
        eyebrow={cval(content, "contact.hero.eyebrow")}
        title={cval(content, "contact.hero.title")}
        description={cval(content, "contact.hero.intro")}
        imageStyle="default"
        image="/images/office.jpg"
        imageAlt="A welcoming professional office"
      >
        <Link href={site.consultationUrl} className="btn-primary">
          Take the free review
        </Link>
        <a href={site.contact.phoneHref} className="btn-secondary">
          Call {site.contact.phoneDisplay}
        </a>
      </PageHero>

      {/* Contact details */}
      <section className="py-16 sm:py-20">
        <div className="container-luxe grid gap-6 lg:grid-cols-3">
          <div className="card-luxe p-8 sm:p-10">
            <p className="eyebrow flex items-center gap-2">
              <MapPin className="h-4 w-4" strokeWidth={1.5} aria-hidden /> Where we work
            </p>
            <p className="mt-3 font-serif text-2xl leading-relaxed text-cocoa-300">
              {site.location.short}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-cocoa-50">
              Sussex-based, supporting business owners across the UK, in person locally
              or remotely wherever you are.
            </p>
          </div>
          <div className="card-luxe p-8 sm:p-10">
            <p className="eyebrow flex items-center gap-2">
              <Clock className="h-4 w-4" strokeWidth={1.5} aria-hidden /> Hours
            </p>
            <ul className="mt-3 space-y-2 tabular-nums">
              {site.hours.map((row) => (
                <li
                  key={row.day}
                  className="flex justify-between border-b border-sand-100/70 pb-2 text-sm text-cocoa-300 last:border-0"
                >
                  <span>{row.day}</span>
                  <span className="whitespace-nowrap text-cocoa-50/80">{row.hours}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card-luxe flex flex-col p-8 sm:p-10">
            <p className="eyebrow">Get in touch</p>
            <a
              href={site.contact.phoneHref}
              className="mt-3 font-serif text-2xl text-cocoa-300 hover:text-champagne-dark"
            >
              {site.contact.phoneDisplay}
            </a>
            <a
              href={site.contact.emailHref}
              className="mt-2 text-base text-cocoa-50 hover:text-cocoa-300"
            >
              {site.contact.emailDisplay}
            </a>
            <p className="mt-6 text-xs leading-relaxed text-cocoa-50/80">
              We reply to most messages within one working day. Prefer the easy route?
              The free review tells us everything we need to get started.
            </p>
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section className="py-20 sm:py-24">
        <div className="container-luxe grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col">
            <p className="eyebrow">Say hello</p>
            <h2 className="mt-3 font-serif text-4xl leading-[1.05] text-cocoa-300 sm:text-5xl">
              Send us a message.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-cocoa-50 sm:text-lg">
              Whether you have a quick question or you're ready to switch, we'd love to hear
              from you. No call centres, no sales scripts, just a straight conversation.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-cocoa-50">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-champagne-dark" strokeWidth={1.5} aria-hidden />
                {site.contact.phoneDisplay}
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-champagne-dark" strokeWidth={1.5} aria-hidden />
                {site.contact.emailDisplay}
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-champagne-dark" strokeWidth={1.5} aria-hidden />
                {site.location.short}
              </li>
            </ul>
            <div className="mt-8 rounded-2xl border border-sand-100 bg-blush-50/60 p-6">
              <p className="font-serif text-xl text-cocoa-300">Not sure where to start?</p>
              <p className="mt-2 text-sm leading-relaxed text-cocoa-50">
                The free 2-minute review is the easiest way in. Tell us what's not working
                and we'll come back with honest next steps.
              </p>
              <Link href={site.consultationUrl} className="btn-primary mt-4">
                Take the free review
              </Link>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      <CTASection
        eyebrow="The easy first step"
        title="See where you stand. Free, no obligation."
        primaryLabel="Take the free review"
        primaryHref={site.consultationUrl}
        secondaryLabel="Back to home"
        secondaryHref="/"
      />
    </>
  );
}
