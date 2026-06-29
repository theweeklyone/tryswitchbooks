import Link from "next/link";
import type { Metadata } from "next";
import { ClipboardCheck, Search, Handshake, HeartHandshake } from "lucide-react";
import { site } from "@/data/site";
import { PageHero } from "@/components/PageHero";
import { PageFAQ } from "@/components/PageFAQ";
import { CTASection } from "@/components/CTASection";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Finding the right accountant is simpler than you think. Take the free review, we match you with a trusted local firm, and they handle the switch. Sussex & UK-wide.",
  alternates: { canonical: "/how-it-works" },
};

const steps = [
  {
    icon: ClipboardCheck,
    n: "01",
    title: "Take the free review",
    body: "A couple of private minutes. Tell us how your business is set up, what's frustrating you about your current accountant, and what you want. There's nothing to sign.",
  },
  {
    icon: Search,
    n: "02",
    title: "We find your match",
    body: "We shortlist trusted local firms that fit your needs, your sector and your budget, and we'll only ever put forward a firm we'd be happy to use ourselves.",
  },
  {
    icon: Handshake,
    n: "03",
    title: "A warm introduction",
    body: "We introduce you to the right firm. No cold calls, no obligation. If you decide to go ahead, the firm manages the entire handover from your current accountant for you.",
  },
  {
    icon: HeartHandshake,
    n: "04",
    title: "Support that shows up",
    body: "You get the proactive, plain-English accountant you deserve, and we check in afterwards to make sure it's working. If it isn't, we'll find you a better fit.",
  },
];

const faqs = [
  {
    q: "What does it cost me?",
    a: "Nothing. Being matched is completely free for business owners. We're paid by the firms we partner with, and only when it's a good fit, so there's never any pressure or cost to you.",
  },
  {
    q: "Do I have to tell my current accountant myself?",
    a: "No. Once you're happy to proceed, the firm we introduce you to manages the handover and the professional formalities. You don't need an uncomfortable conversation.",
  },
  {
    q: "How do you choose which firms to recommend?",
    a: "We match on what matters: your location, your sector, your size and your budget. And we only work with established, reputable firms. We're not just sending you to whoever's nearest.",
  },
  {
    q: "What does the free review commit me to?",
    a: "Nothing at all. It's there so we understand your situation and can introduce the right firm. If we don't think we can help, we'll tell you straight.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title="Finding the right accountant is simpler than you think."
        description="Four straightforward steps from frustrated to properly matched, with us doing the legwork of finding the firm that fits."
        imageStyle="default"
        image="/images/meeting-report.jpg"
        imageAlt="An adviser talking a business owner through a report"
      >
        <Link href={site.consultationUrl} className="btn-primary">
          Take the free review
        </Link>
        <Link href="/contact" className="btn-secondary">
          Talk to us
        </Link>
      </PageHero>

      <section className="py-20 sm:py-24">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="The process"
            title="From first click to the right firm."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {steps.map((s) => (
              <Reveal key={s.n} className="h-full">
                <div className="card-luxe flex h-full gap-5 p-7 sm:p-8">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blush-50 text-champagne-dark">
                    <s.icon className="h-6 w-6" strokeWidth={1.5} aria-hidden />
                  </span>
                  <div>
                    <p className="font-serif text-2xl text-champagne-dark">{s.n}</p>
                    <h3 className="mt-1 font-serif text-2xl text-cocoa-300">{s.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-cocoa-50">{s.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <PageFAQ items={faqs} title="The bits people ask about." />

      <CTASection
        eyebrow="Ready when you are"
        title="Start with the free review."
        description="Tell us what's not working. We'll match you with a local firm that fits, and they'll handle the rest."
        primaryLabel="Take the free review"
        primaryHref={site.consultationUrl}
        secondaryLabel="Talk to us"
        secondaryHref="/contact"
      />
    </>
  );
}
