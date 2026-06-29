import Link from "next/link";
import { Fragment } from "react";
import { ArrowRight, ArrowDown, Check, X, MapPin, Gift, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { ServiceCard } from "@/components/ServiceCard";
import { CTASection } from "@/components/CTASection";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { BusinessJsonLd } from "@/components/BusinessJsonLd";

export const metadata: Metadata = {
  title: {
    absolute:
      "Find the Right Local Accountant for Your Business | Switch Books",
  },
  description:
    "Switch Books is a free service that matches UK and Sussex business owners with the right local accounting firm: proactive support at a fair price, explained in plain English. Take the free 2-minute review.",
  alternates: { canonical: "/" },
};

const trustPoints = [
  { icon: MapPin, label: "Sussex-based, UK-wide" },
  { icon: Gift, label: "Free for business owners" },
  { icon: ShieldCheck, label: "Trusted local firms" },
];

const valueProps = [
  {
    title: "Completely free to you",
    body: "Finding your match costs you nothing. We're paid by the firms we work with, and only when it's a good fit.",
  },
  {
    title: "Local and trusted",
    body: "We match you with established firms in your area. Real people you can sit across a table from, not a faceless call centre.",
  },
  {
    title: "Matched to your needs",
    body: "Your sector, your size, your budget. We shortlist firms that suit you, not just whoever happens to be nearest.",
  },
  {
    title: "We stay in your corner",
    body: "We check in after the introduction to make sure it's working. If it isn't, we'll find you a better fit. No awkwardness.",
  },
];

const comparison = {
  them: [
    "Only get in touch when something's due",
    "Accounts arrive late, and unexplained",
    "Surprise tax bills, no warning",
    "Emails ignored for days",
    "No advice, just compliance and invoices",
  ],
  us: [
    "Regular contact and useful ideas",
    "Accounts filed early and talked through",
    "Tax planned ahead, no surprises",
    "A named adviser who replies",
    "Advice that helps you grow and keep more",
  ],
};

const journeySteps = [
  {
    n: "01",
    title: "Take the free review",
    body: "A couple of private minutes on how your business is set up, what's frustrating you, and what you need.",
  },
  {
    n: "02",
    title: "We find your match",
    body: "We shortlist trusted local firms that fit your needs, your sector and your budget.",
  },
  {
    n: "03",
    title: "A warm introduction",
    body: "We introduce you to the right firm. No cold calls, no pressure, no obligation to go ahead.",
  },
  {
    n: "04",
    title: "Support that shows up",
    body: "You get the proactive, plain-English accountant you deserve, and we check in to make sure it's working.",
  },
];

export default function Home() {
  return (
    <>
      <BusinessJsonLd />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 lg:pt-36">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[28rem] bg-gradient-to-b from-blush-100/55 via-blush-50/40 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-0 -z-10 h-[26rem] w-[26rem] rounded-full bg-champagne/15 blur-3xl"
        />
        <div className="container-luxe relative grid items-center gap-10 pb-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-24">
          <div className="relative animate-fadeUp">
            <p className="eyebrow">
              {site.brandPromise} · {site.location.short}
            </p>
            <h1 className="mt-5 text-balance font-serif text-[2.75rem] leading-[1.02] text-cocoa-300 sm:text-6xl md:text-[4.75rem] lg:text-[5.25rem]">
              Find an accountant who{" "}
              <em className="not-italic text-champagne-dark">shows up</em> for your business.
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-cocoa-50">
              Switch Books is a free service that matches UK business owners with the right
              local accounting firm. Proactive, plain-English, and priced fairly. Tell us
              what's not working and we'll find you better.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={site.consultationUrl} className="btn-primary">
                Take the free review
              </Link>
              <Link href="/how-it-works" className="btn-secondary">
                See how it works
              </Link>
            </div>
            <p className="mt-4 text-sm text-cocoa-50/80">
              No sign-up required. Just leave the details you'd like to be contacted on, and we'll handle the rest.
            </p>
            <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3">
              {trustPoints.map((t) => (
                <li key={t.label} className="flex items-center gap-2 text-sm text-cocoa-50">
                  <t.icon className="h-4 w-4 text-champagne-dark" strokeWidth={1.5} aria-hidden />
                  {t.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative animate-fadeIn">
            <div className="relative">
              <PlaceholderImage
                variant="blush"
                className="aspect-[4/5] w-full"
                label="A business owner talking through their numbers with an adviser"
                priority
                src="/images/advisory-meeting.jpg"
              />
              <div className="absolute -bottom-6 -left-4 rounded-2xl bg-cream-50 p-4 shadow-xl shadow-cocoa-300/10 sm:-left-6 sm:p-5">
                <p className="text-[10px] uppercase tracking-widest text-champagne-dark">The review</p>
                <p className="mt-1 font-serif text-lg text-cocoa-300 sm:text-xl">Takes 2 minutes</p>
              </div>
              <div className="absolute -right-4 top-8 hidden rounded-2xl bg-cream-50 p-4 shadow-xl shadow-cocoa-300/10 sm:block">
                <p className="text-[10px] uppercase tracking-widest text-champagne-dark">Your cost</p>
                <p className="mt-1 font-serif text-xl text-cocoa-300">Nothing</p>
                <p className="text-[10px] text-cocoa-50">Free to be matched</p>
              </div>
            </div>
          </div>
        </div>
        <div className="divider-soft" />
      </section>

      {/* Sound familiar? — empathy hook */}
      <section className="py-20 sm:py-28">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Sound familiar?"
            title="When did your accountant last pick up the phone to you?"
            description="If any of this rings true, you're not being fussy. You're being underserved. Tell us about it and we'll match you with a firm that does it properly."
          />
          <div className="reveal mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "I only hear from them when something's due.",
              "I dread year-end and the bill that comes with it.",
              "Tax surprises keep catching me out.",
              "I email and wait days for a reply.",
              "I get compliance, but never any advice.",
              "I've outgrown them, but switching feels like hassle.",
            ].map((quote) => (
              <div key={quote} className="card-luxe flex items-start gap-3 p-6">
                <span aria-hidden className="font-serif text-2xl leading-none text-champagne-dark">
                  &ldquo;
                </span>
                <p className="text-sm leading-relaxed text-cocoa-100">{quote}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link href={site.consultationUrl} className="btn-primary">
              Tell us what's not working
            </Link>
          </div>
        </div>
      </section>

      {/* What we'll match you with */}
      <section className="bg-blush-50 py-20 sm:py-28">
        <div className="container-luxe">
          <div className="flex flex-col items-end justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="What we'll match you with"
              title="Whatever your business needs, we'll find a firm that's great at it."
              description="Tell us where it hurts. We'll connect you with a local firm that's strong in the areas that matter to you."
            />
            <Link
              href="/services"
              className="link-underline whitespace-nowrap text-sm uppercase tracking-widest text-cocoa-300"
            >
              View all areas
            </Link>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Reveal key={s.slug} className="h-full">
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The difference — comparison */}
      <section className="py-20 sm:py-28">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="What you should expect"
            title="There's a better way to be looked after."
            description="Two ways of being treated by an accountant. We match you with firms that deliver the right-hand column."
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-sand-100 bg-cream-50 p-8">
              <p className="text-xs uppercase tracking-widest text-cocoa-50/70">What you might be getting</p>
              <ul className="mt-6 space-y-4">
                {comparison.them.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-cocoa-50">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-cocoa-50/50" strokeWidth={2} aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-champagne/40 bg-cocoa-300 p-8 text-cream-50">
              <p className="text-xs uppercase tracking-widest text-champagne-light">What you should expect</p>
              <ul className="mt-6 space-y-4">
                {comparison.us.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-cream-100/90">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-champagne-light" strokeWidth={2} aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Local matters */}
      <section className="bg-blush-50 py-20 sm:py-28">
        <div className="container-luxe grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative order-2 lg:order-1">
            <PlaceholderImage
              variant="default"
              className="aspect-[4/3] w-full"
              label="The Sussex countryside, where we match you with local firms"
              src="/images/sussex-hills.jpg"
            />
            <div className="mt-4 grid grid-cols-2 gap-4">
              <PlaceholderImage
                variant="default"
                className="aspect-[3/2] w-full"
                label="Brighton, part of our Sussex coverage"
                src="/images/brighton-i360.jpg"
              />
              <PlaceholderImage
                variant="default"
                className="aspect-[3/2] w-full"
                label="Chichester, part of our Sussex coverage"
                src="/images/chichester.jpg"
              />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="Local matters"
              title="An accountant who knows your patch."
              description="We work with trusted firms right across Sussex and the wider UK. You get someone close to home who understands your area and your sector, not a distant processing centre."
            />
            <ul className="mt-8 space-y-3">
              {[
                "Established firms in your area",
                "People you can meet face to face",
                "Matched to your sector and stage",
                "Vetted before we ever introduce them",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-base text-cocoa-100">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-champagne-dark" strokeWidth={2} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <Link href={site.consultationUrl} className="btn-primary mt-8">
              Find my local match
            </Link>
          </div>
        </div>
      </section>

      {/* Why Switch Books value props */}
      <section className="py-20 sm:py-28">
        <div className="container-luxe">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start lg:gap-20">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                eyebrow="Why Switch Books"
                title="A simpler way to find a better accountant."
                description="We take the legwork out of finding the right firm, and we've no reason to send you anywhere but the best fit for you."
              />
              <Link href={site.consultationUrl} className="btn-primary mt-8">
                Take the free review
              </Link>
            </div>
            <ul className="reveal grid gap-1 sm:grid-cols-2 sm:gap-6">
              {valueProps.map((v, i) => (
                <li key={v.title} className="card-luxe p-7 sm:p-8" style={{ animationDelay: `${i * 80}ms` }}>
                  <p className="font-serif text-3xl text-champagne-dark">0{i + 1}</p>
                  <h3 className="mt-4 font-serif text-2xl text-cocoa-300">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-cocoa-50">{v.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-blush-50 py-20 sm:py-28">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="How it works"
            title="From frustrated to properly matched, in four steps."
            description="No commitment to start. Just an honest look at what you need and who's right for it."
          />
          <div className="reveal mt-14 flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-0">
            {journeySteps.map((step, i) => (
              <Fragment key={step.n}>
                <div className="card-luxe flex flex-1 flex-col p-7 sm:p-8">
                  <span className="font-serif text-3xl text-champagne-dark">{step.n}</span>
                  <h3 className="mt-3 font-serif text-2xl text-cocoa-300">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-cocoa-50">{step.body}</p>
                </div>
                {i < journeySteps.length - 1 ? (
                  <div aria-hidden className="flex items-center justify-center text-champagne-dark lg:px-2 xl:px-3">
                    <ArrowDown className="h-5 w-5 shrink-0 lg:hidden" strokeWidth={1.5} />
                    <ArrowRight className="hidden h-5 w-5 shrink-0 lg:block" strokeWidth={1.5} />
                  </div>
                ) : null}
              </Fragment>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-3">
            <Link href={site.consultationUrl} className="btn-primary">
              Take the free review
            </Link>
            <Link href="/how-it-works" className="btn-secondary">
              Read the full process
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Your time back, the right firm found"
        title="Let's match you with an accountant who fits."
        description="Take the free, no-pressure review. Tell us what's frustrating you and what you want, and we'll find you a local firm that delivers it."
        primaryLabel="Take the free review"
        primaryHref={site.consultationUrl}
        secondaryLabel="Talk to us"
        secondaryHref="/contact"
      />
    </>
  );
}
