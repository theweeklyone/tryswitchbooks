"use client";

import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { site } from "@/data/site";
import { Logo } from "@/components/Logo";
import type {
  ConsultationRecommendation,
  ConsultationSubmission,
} from "@/lib/types/consultation";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/advice", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

export function RecommendationView({
  submission,
  recommendation,
  onStartOver,
}: {
  submission: ConsultationSubmission;
  recommendation: ConsultationRecommendation;
  onStartOver: () => void;
}) {
  const { primary, secondary, whatGoodLooksLike, summary } = recommendation;

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header so they can keep exploring the site from the result page. */}
      <header className="sticky top-0 z-30 border-b border-sand-100/70 bg-cream-50/95 backdrop-blur">
        <div className="container-luxe flex h-16 items-center justify-between gap-6 lg:h-20">
          <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
            <Logo size="sm" />
          </Link>
          <nav className="flex items-center gap-4 sm:gap-6" aria-label="Primary">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs uppercase tracking-widest text-cocoa-50 transition-colors hover:text-cocoa-300 sm:text-sm sm:tracking-wide"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <div className="container-luxe py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Thank you, {submission.firstName}</p>
          <h1 className="mt-4 font-serif text-4xl leading-[1.08] text-cocoa-300 sm:text-5xl">
            We're finding your match.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-cocoa-50">
            We've got everything we need. We're now finding the right local accounting firm
            for you. Someone from Switch Books will be in touch shortly to confirm a couple of
            details and make the introduction. No pressure, no hard sell. We've also
            emailed a copy of your review to{" "}
            <span className="text-cocoa-300">{submission.email}</span>.
          </p>
        </div>

        {/* Summary + primary recommendation */}
        <div className="mx-auto mt-12 max-w-3xl">
          <div className="card-luxe p-8 sm:p-10">
            <p className="eyebrow">What we'll match you on</p>
            <h2 className="mt-3 font-serif text-2xl text-cocoa-300 sm:text-3xl">
              {primary.serviceName}
            </h2>
            <p className="mt-4 leading-relaxed text-cocoa-50">{summary}</p>
            {primary.serviceSlug ? (
              <Link
                href={`/services/${primary.serviceSlug}`}
                className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-widest text-champagne-dark hover:text-cocoa-300"
              >
                More on {primary.serviceName} <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </Link>
            ) : null}
          </div>

          {/* What good looks like */}
          <div className="mt-6 rounded-3xl border border-champagne/40 bg-cocoa-300 p-8 text-cream-50 sm:p-10">
            <p className="text-xs uppercase tracking-widest text-champagne-light">
              What good looks like for you
            </p>
            <ul className="mt-6 space-y-4">
              {whatGoodLooksLike.map((item) => (
                <li key={item} className="flex items-start gap-3 text-cream-100/90">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-champagne-light" strokeWidth={2} aria-hidden />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {secondary ? (
            <p className="mt-6 text-center text-sm text-cocoa-50">
              We'd likely also look at{" "}
              <span className="text-cocoa-300">{secondary.serviceName}</span> for you.
            </p>
          ) : null}

          {/* Next steps */}
          <div className="mt-10 flex flex-col items-center gap-4">
            <a href={site.contact.phoneHref} className="btn-primary">
              Prefer to talk now? Call us
            </a>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
              <Link href="/" className="link-underline text-cocoa-300">
                Back to home
              </Link>
              <button
                type="button"
                onClick={onStartOver}
                className="link-underline text-cocoa-50 hover:text-cocoa-300"
              >
                Start the review again
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
