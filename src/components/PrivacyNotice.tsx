"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "@/lib/utils";
import {
  denyAnalyticsConsent,
  grantAnalyticsConsent,
  hasMadeConsentChoice,
} from "@/lib/consent";

// Cookie / privacy notice.
// Shows on every public page until the visitor makes a choice. "Accept" grants
// analytics consent (which unlocks GA4 in components/GoogleAnalytics.tsx);
// "Essential only" records a refusal so the banner doesn't reappear but
// analytics stay off.
//
// FUTURE:
//   - distinguish necessary vs analytics vs marketing categories
//   - log the consent decision against the visitor's session id once
//     Supabase events are wired up (GDPR / UK GDPR audit trail)

export function PrivacyNotice() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!hasMadeConsentChoice()) setVisible(true);
  }, []);

  // Hide on focused experiences where the banner would compete with the UI.
  if (
    pathname?.startsWith("/consultation") ||
    pathname?.startsWith("/dashboard") ||
    pathname?.startsWith("/products/recommendations") ||
    pathname?.startsWith("/client") ||
    pathname === "/coming-soon"
  ) {
    return null;
  }

  if (!visible) return null;

  const accept = () => {
    grantAnalyticsConsent();
    setVisible(false);
  };

  const essentialOnly = () => {
    denyAnalyticsConsent();
    setVisible(false);
  };

  return (
    <div
      role="region"
      aria-label="Cookie and privacy notice"
      className={clsx(
        "fixed inset-x-3 bottom-3 z-[55] rounded-2xl border border-sand-100 bg-cream-50 p-5 shadow-2xl shadow-cocoa-300/20",
        "lg:inset-x-auto lg:right-6 lg:max-w-md",
      )}
    >
      <p className="text-[11px] uppercase tracking-widest text-champagne-dark">
        Privacy
      </p>
      <p className="mt-2 text-sm leading-relaxed text-cocoa-300">
        We use essential cookies to make this site work. With your agreement we
        also use a few measurement cookies (Google Analytics) to understand
        which parts of the site are useful so we can improve it. Read more in our{" "}
        <Link href="/cookies" className="underline hover:text-cocoa-200">
          cookie policy
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/privacy"
          className="text-[11px] uppercase tracking-widest text-cocoa-50 hover:text-cocoa-300"
        >
          Privacy policy
        </Link>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={essentialOnly}
            className="rounded-full border border-cocoa-300/30 px-4 py-2 text-[11px] uppercase tracking-widest text-cocoa-300 transition-colors hover:border-cocoa-300"
          >
            Essential only
          </button>
          <button
            type="button"
            onClick={accept}
            className="rounded-full bg-cocoa-300 px-4 py-2 text-[11px] uppercase tracking-widest text-cream-50 hover:bg-cocoa-200"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
