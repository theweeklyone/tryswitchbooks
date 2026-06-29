import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects your personal information, and your rights under UK data protection law.`,
  alternates: { canonical: "/privacy" },
};

// Plain-English UK GDPR privacy policy. Content is data-driven from site.ts so
// the business name and contact details stay in sync everywhere.
//
// NOTE FOR OWNER: please read this through and confirm it matches how the
// service actually handles data — in particular the section on sharing details
// with the accounting firms we introduce you to, and retention periods. It is
// written to be accurate and ICO-friendly, but is not a substitute for formal
// legal advice if you want it checked.

const LAST_UPDATED = "29 June 2026";

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy Policy"
        title="Your information, handled with care."
        description={`How ${site.name} collects, uses and protects your personal information, and the rights you have over it.`}
        image="/images/office-2.jpg"
        imageAlt="A calm, professional workspace"
      />

      <section className="bg-cream-50 py-16 sm:py-20">
        <div className="container-luxe max-w-3xl">
          <p className="text-xs uppercase tracking-widest text-cocoa-50/70">
            Last updated: {LAST_UPDATED}
          </p>

          <div className="prose-luxe mt-10 space-y-6 text-base leading-[1.85] text-cocoa-50 sm:text-lg">
            <p>
              {site.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is a free
              service that matches business owners with local accounting firms. We are
              committed to protecting your privacy. This policy explains what personal
              information we collect, why we collect it, how we use and protect it, and the
              rights you have under UK data protection law (the UK GDPR and the Data
              Protection Act 2018). We are the data controller responsible for your personal
              information.
            </p>

            <h2 className="!mt-12 font-serif text-3xl text-cocoa-300 sm:text-4xl">
              Information we collect
            </h2>
            <p>
              <strong className="text-cocoa-300">Information you give us.</strong>{" "}
              When you contact us or complete our free business review, you may provide your
              name, business name, email address, phone number, details about your business
              and current accounting arrangements, what you&rsquo;re looking for, your
              budget, and anything else you choose to tell us in a message.
            </p>
            <p>
              <strong className="text-cocoa-300">
                Information we collect automatically.
              </strong>{" "}
              When you visit the site we may collect limited technical information through
              cookies and similar technologies, such as your device type, browser, and how
              you use the site. See{" "}
              <a href="#cookies" className="link-underline text-cocoa-300">
                Cookies and analytics
              </a>{" "}
              below.
            </p>

            <h2 className="!mt-12 font-serif text-3xl text-cocoa-300 sm:text-4xl">
              How we use your information
            </h2>
            <p>We use your personal information to:</p>
            <ul className="space-y-3">
              {[
                "Respond to your enquiries and messages",
                "Understand your needs so we can match you with a suitable local accounting firm",
                "Introduce you to one or more accounting firms and share your details with them so they can help you (see below)",
                "Improve our website and understand how it is used",
                "Meet our legal and regulatory obligations",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden className="mt-3 inline-block h-px w-5 shrink-0 bg-champagne" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p>
              Our lawful bases for processing are: your{" "}
              <strong className="text-cocoa-300">consent</strong> (for example, optional
              analytics cookies, and introducing you to an accounting firm); our{" "}
              <strong className="text-cocoa-300">legitimate interests</strong> in running and
              improving this service and responding to your enquiry; and where necessary to
              comply with a <strong className="text-cocoa-300">legal obligation</strong>.
            </p>

            <h2 className="!mt-12 font-serif text-3xl text-cocoa-300 sm:text-4xl">
              Sharing your details with accounting firms
            </h2>
            <p>
              Our service works by introducing you to a suitable local accounting firm. With
              your agreement, we share the relevant details from your review (such as your
              contact details, business information and what you need) with the firm or firms
              we introduce you to, so they can contact you and discuss helping your business.
              Once introduced, that firm becomes responsible for the information you share
              with them directly under their own privacy policy. If you would prefer us not
              to make an introduction, just let us know.
            </p>

            <h2
              id="cookies"
              className="!mt-12 font-serif text-3xl text-cocoa-300 sm:text-4xl"
            >
              Cookies and analytics
            </h2>
            <p>
              We use a small number of essential cookies that are necessary to make the site
              work. With your consent, we also use analytics cookies to understand which
              parts of the site are useful so we can improve it. We will ask for your consent
              before any non-essential cookies are set, and you can change your mind at any
              time by clearing the cookies in your browser. For full details, see our{" "}
              <Link href="/cookies" className="link-underline text-cocoa-300">
                Cookie Policy
              </Link>
              .
            </p>

            <h2 className="!mt-12 font-serif text-3xl text-cocoa-300 sm:text-4xl">
              Who else we share it with
            </h2>
            <p>
              We do not sell your personal information. Aside from the accounting firms we
              introduce you to (above), we share it only with trusted service providers who
              help us run this website, and who are required to protect it and use it only on
              our instructions, for example our website and database hosting provider, our
              email delivery provider and, where you have consented, our analytics provider.
              We may also disclose information where required by law.
            </p>

            <h2 className="!mt-12 font-serif text-3xl text-cocoa-300 sm:text-4xl">
              How long we keep it
            </h2>
            <p>
              We keep your personal information only for as long as we need it for the
              purposes set out in this policy, or for as long as the law requires. Review and
              enquiry records are kept while we are in contact with you and for a reasonable
              period afterwards. When information is no longer needed, we securely delete or
              anonymise it.
            </p>

            <h2 className="!mt-12 font-serif text-3xl text-cocoa-300 sm:text-4xl">
              Your rights
            </h2>
            <p>Under UK data protection law you have the right to:</p>
            <ul className="space-y-3">
              {[
                "Access the personal information we hold about you",
                "Ask us to correct information that is inaccurate or incomplete",
                "Ask us to delete your information in certain circumstances",
                "Object to or restrict how we use your information",
                "Withdraw consent at any time, where we rely on consent",
                "Ask for a copy of your information in a portable format",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden className="mt-3 inline-block h-px w-5 shrink-0 bg-champagne" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p>
              To exercise any of these rights, please contact us using the details below. You
              also have the right to complain to the Information Commissioner&rsquo;s Office
              (ICO), the UK supervisory authority, at{" "}
              <a
                href="https://ico.org.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-cocoa-300"
              >
                ico.org.uk
              </a>
              .
            </p>

            <h2 className="!mt-12 font-serif text-3xl text-cocoa-300 sm:text-4xl">
              Keeping your information secure
            </h2>
            <p>
              We take appropriate technical and organisational measures to protect your
              personal information against unauthorised access, loss or misuse. No method of
              transmission over the internet is completely secure, but we work to protect
              your information and keep it safe.
            </p>

            <h2 className="!mt-12 font-serif text-3xl text-cocoa-300 sm:text-4xl">
              Changes to this policy
            </h2>
            <p>
              We may update this policy from time to time. Any changes will be posted on this
              page with a revised &ldquo;last updated&rdquo; date.
            </p>

            <h2 className="!mt-12 font-serif text-3xl text-cocoa-300 sm:text-4xl">
              Contact us
            </h2>
            <p>
              If you have any questions about this policy or how we handle your personal
              information, please contact us at{" "}
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
