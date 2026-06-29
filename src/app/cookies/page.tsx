import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `How ${site.name} uses cookies on this website, the cookies we set, and how to control them.`,
  alternates: { canonical: "/cookies" },
};

// Plain-English UK cookie policy. Describes the actual cookie behaviour: a few
// essential cookies always; Google Analytics only after the visitor accepts
// the on-site cookie notice (see components/PrivacyNotice.tsx + lib/consent.ts).
//
// NOTE FOR OWNER: keep this in step with the analytics you actually run. It
// currently describes essential cookies + optional Google Analytics 4. If you
// add any other tools (ads, embedded maps that set cookies, social pixels),
// list them here too.

const LAST_UPDATED = "16 June 2026";

export default function CookiePolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Cookie Policy"
        title="How we use cookies."
        description={`A clear explanation of the cookies ${site.name} uses on this website, and how you stay in control of them.`}
        image="/images/business-reports-2.jpg"
        imageAlt="A tidy desk with business paperwork"
      />

      <section className="bg-cream-50 py-16 sm:py-20">
        <div className="container-luxe max-w-3xl">
          <p className="text-xs uppercase tracking-widest text-cocoa-50/70">
            Last updated: {LAST_UPDATED}
          </p>

          <div className="prose-luxe mt-10 space-y-6 text-base leading-[1.85] text-cocoa-50 sm:text-lg">
            <p>
              This policy explains how {site.name} uses cookies and similar
              technologies on this website. It sits alongside our{" "}
              <Link href="/privacy" className="link-underline text-cocoa-300">
                Privacy Policy
              </Link>
              , which explains how we handle your personal information more
              generally.
            </p>

            <h2 className="!mt-12 font-serif text-3xl text-cocoa-300 sm:text-4xl">
              What cookies are
            </h2>
            <p>
              Cookies are small text files that a website stores on your device
              when you visit. They are widely used to make websites work, to
              remember your preferences, and to help site owners understand how
              their site is used. Some are essential; others are optional and
              only set with your agreement. We also use similar technologies,
              such as your browser&rsquo;s local storage, to remember your cookie
              choice.
            </p>

            <h2 className="!mt-12 font-serif text-3xl text-cocoa-300 sm:text-4xl">
              The cookies we use
            </h2>
            <p>
              <strong className="text-cocoa-300">Essential cookies.</strong>{" "}
              These are necessary for the site to function and to remember the
              choices you make, including your cookie preference itself, and to
              keep our own admin area secure. They do not track you
              and are always on, because the site cannot work properly without
              them. We do not need your consent for these.
            </p>
            <p>
              <strong className="text-cocoa-300">Analytics cookies.</strong>{" "}
              With your agreement, we use Google Analytics to understand which
              pages are useful and how the site is performing, so we can improve
              it. These cookies collect information such as the pages you visit,
              roughly where you are, and the type of device and browser you use.
              We do not use this information to identify you personally, and{" "}
              <strong className="text-cocoa-300">
                these cookies are only set once you choose &ldquo;Accept&rdquo;
              </strong>{" "}
              on our cookie notice. If you choose &ldquo;Essential only&rdquo;,
              no analytics cookies are set.
            </p>

            <h2 className="!mt-12 font-serif text-3xl text-cocoa-300 sm:text-4xl">
              How we ask for your consent
            </h2>
            <p>
              The first time you visit, a short notice appears at the bottom of
              the screen. You can choose{" "}
              <strong className="text-cocoa-300">Accept</strong> to allow
              analytics cookies, or{" "}
              <strong className="text-cocoa-300">Essential only</strong> to keep
              just the necessary ones. We remember your choice so the notice does
              not keep reappearing, and we never set analytics cookies before you
              have agreed.
            </p>

            <h2 className="!mt-12 font-serif text-3xl text-cocoa-300 sm:text-4xl">
              Changing your mind
            </h2>
            <p>
              You can withdraw or change your choice at any time. The simplest way
              is to clear this site&rsquo;s cookies and stored data in your
              browser, which brings the notice back so you can choose again. You
              can also block or delete cookies through your browser settings at
              any time, though some essential features may not work as well if you
              block everything. Guidance for managing cookies in common browsers
              is available at{" "}
              <a
                href="https://www.aboutcookies.org"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-cocoa-300"
              >
                aboutcookies.org
              </a>
              .
            </p>

            <h2 className="!mt-12 font-serif text-3xl text-cocoa-300 sm:text-4xl">
              Third-party services
            </h2>
            <p>
              Our analytics are provided by Google. You can read about how Google
              uses information from sites that use its services at{" "}
              <a
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-cocoa-300"
              >
                policies.google.com
              </a>
              .
            </p>

            <h2 className="!mt-12 font-serif text-3xl text-cocoa-300 sm:text-4xl">
              Changes to this policy
            </h2>
            <p>
              We may update this policy from time to time. Any changes will be
              posted on this page with a revised &ldquo;last updated&rdquo; date.
            </p>

            <h2 className="!mt-12 font-serif text-3xl text-cocoa-300 sm:text-4xl">
              Contact us
            </h2>
            <p>
              If you have any questions about our use of cookies, please contact
              us at{" "}
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
              <Link href="/privacy" className="link-underline text-cocoa-300">
                Read our Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
