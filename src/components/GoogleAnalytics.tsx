"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { CONSENT_GRANTED_EVENT, hasAnalyticsConsent } from "@/lib/consent";

// Google Analytics 4 loader.
//
// - Does nothing unless NEXT_PUBLIC_GA_ID is set (so dev/preview stay clean).
// - Loads gtag.js only AFTER the visitor accepts the cookie notice, and starts
//   immediately for returning visitors who accepted in a previous session.
// - Sends a page_view on client-side route changes (the initial view is sent
//   automatically by the config snippet).
//
// All the site's existing conversion events (booking_click, lead_submitted,
// consultation_completed, etc.) are forwarded to GA4 from lib/tracking.ts,
// which is a no-op until gtag has loaded here.

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(false);
  const pathname = usePathname();
  const initialPath = useRef<string | null>(null);

  // Enable once consent is given (now or in a previous session).
  useEffect(() => {
    if (hasAnalyticsConsent()) setEnabled(true);
    const onGrant = () => setEnabled(true);
    window.addEventListener(CONSENT_GRANTED_EVENT, onGrant);
    return () => window.removeEventListener(CONSENT_GRANTED_EVENT, onGrant);
  }, []);

  // page_view on navigation. The first path is already counted by the config
  // snippet's automatic page_view, so we skip it here to avoid double-counting.
  useEffect(() => {
    if (!enabled || !GA_ID || !pathname) return;
    if (initialPath.current === null) {
      initialPath.current = pathname;
      return;
    }
    if (pathname === initialPath.current) return;
    initialPath.current = pathname;
    if (typeof window.gtag === "function") {
      window.gtag("event", "page_view", { page_path: pathname });
    }
  }, [enabled, pathname]);

  if (!GA_ID || !enabled) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
