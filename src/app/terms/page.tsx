import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `The terms on which ${site.name} provides its free accountant-matching service and this website.`,
  alternates: { canonical: "/terms" },
};

// Plain-English terms for a free introduction/matching service. Data-driven
// from site.ts so the business name and contact details stay in sync.
//
// NOTE FOR OWNER: please confirm these match how the service actually operates
// — especially the sections on introductions, the relationship with the firms
// we recommend, and that we may be paid by those firms. Written to be fair and
// clear, but not a substitute for formal legal advice if you want it checked.

const LAST_UPDATED = "29 June 2026";

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Terms & Conditions"
        title="Clear, fair terms for using our service."
        description={`The terms on which ${site.name} provides its free accountant-matching service and this website. Please take a moment to read them.`}
        image="/images/office-3.jpg"
        imageAlt="A professional office reception"
      />

      <section className="bg-cream-50 py-16 sm:py-20">
        <div className="container-luxe max-w-3xl">
          <p className="text-xs uppercase tracking-widest text-cocoa-50/70">
            Last updated: {LAST_UPDATED}
          </p>

          <div className="prose-luxe mt-10 space-y-6 text-base leading-[1.85] text-cocoa-50 sm:text-lg">
            <p>
              These terms apply to the service provided by {site.name}{" "}
              (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) and to your use of this
              website. By using the site or our free review, you agree to these terms.
              Nothing in them affects your statutory rights as a consumer.
            </p>

            <h2 className="!mt-12 font-serif text-3xl text-cocoa-300 sm:text-4xl">
              What we do
            </h2>
            <p>
              {site.name} is a free introduction service. We get to know what your business
              needs and, with your agreement, introduce you to one or more local accounting
              firms that we believe are a good fit. We are not accountants and we do not
              provide accounting, bookkeeping, tax, payroll or financial advice ourselves.
              Our service is free to you; we may receive a fee from the firms we partner with
              when an introduction leads to them taking on a client.
            </p>

            <h2 className="!mt-12 font-serif text-3xl text-cocoa-300 sm:text-4xl">
              Not professional advice
            </h2>
            <p>
              The information on this website, including our insight articles and the result
              of the review, is general information only. It is not accounting, tax, legal or
              financial advice and should not be relied on as such. Always take advice from a
              qualified professional, such as the firm we introduce you to, before acting.
            </p>

            <h2 className="!mt-12 font-serif text-3xl text-cocoa-300 sm:text-4xl">
              Introductions and the firms we recommend
            </h2>
            <p>
              We select firms in good faith based on the information you give us, but we do
              not guarantee that a suitable match will always be available, or any particular
              outcome. Any engagement for accounting services is a separate agreement between
              you and the firm; we are not a party to it. You are free to choose whether to
              proceed with any firm we introduce, and to compare them as you wish. We are not
              responsible for the services, advice, fees or conduct of the firms we introduce
              you to; any concerns about their work should be raised with them directly.
            </p>

            <h2 className="!mt-12 font-serif text-3xl text-cocoa-300 sm:text-4xl">
              Your information
            </h2>
            <p>
              To make an introduction we share relevant details with the firm or firms we
              connect you with, as explained in our{" "}
              <Link href="/privacy" className="link-underline text-cocoa-300">
                Privacy Policy
              </Link>
              . By using the review you agree to us doing so. If you&rsquo;d prefer us not to
              make an introduction, just let us know.
            </p>

            <h2 className="!mt-12 font-serif text-3xl text-cocoa-300 sm:text-4xl">
              Using this website
            </h2>
            <p>
              This website is provided for general information about our service. We work to
              keep it accurate and up to date, but we do not guarantee that everything is
              complete or error-free, and details may change. The content, branding, images
              and design of this site are owned by {site.name} or used with permission, and
              may not be copied or reused without our consent. Where we link to other
              websites, we are not responsible for their content or terms.
            </p>

            <h2 className="!mt-12 font-serif text-3xl text-cocoa-300 sm:text-4xl">
              Our responsibility to you
            </h2>
            <p>
              Nothing in these terms limits or excludes our liability for death or personal
              injury caused by our negligence, for fraud, or for anything else that cannot
              lawfully be limited. Subject to that, and because our service is free and
              limited to making introductions, we are not responsible for losses that were
              not reasonably foreseeable, for the services or advice of any firm we introduce,
              or for losses arising from information you did not share with us.
            </p>

            <h2 className="!mt-12 font-serif text-3xl text-cocoa-300 sm:text-4xl">
              Changes to these terms
            </h2>
            <p>
              We may update these terms from time to time. The version published on this
              page, with the &ldquo;last updated&rdquo; date above, applies to your use of the
              service. These terms are governed by the law of England and Wales.
            </p>

            <h2 className="!mt-12 font-serif text-3xl text-cocoa-300 sm:text-4xl">
              Contact us
            </h2>
            <p>
              If you have any questions about these terms, please contact us at{" "}
              <a href={site.contact.emailHref} className="link-underline text-cocoa-300">
                {site.contact.emailDisplay}
              </a>{" "}
              or by phone on{" "}
              <a href={site.contact.phoneHref} className="link-underline text-cocoa-300">
                {site.contact.phoneDisplay}
              </a>
              .
            </p>

            <p className="!mt-12">
              <Link href="/contact" className="link-underline text-cocoa-300">
                Get in touch
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
