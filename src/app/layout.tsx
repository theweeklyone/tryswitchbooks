import type { Metadata } from "next";
import { Lora, Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AttributionInit } from "@/components/AttributionInit";
import { PrivacyNotice } from "@/components/PrivacyNotice";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { PreviewBanner } from "@/components/PreviewBanner";
import { RevealController } from "@/components/RevealController";
import { PageTransition } from "@/components/PageTransition";
import { site } from "@/data/site";

// Headings — a trustworthy, established-firm serif.
const display = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

// Wordmark font, elegant serif used only on the logo.
const wordmark = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-wordmark",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tryswitchbooks.co.uk"),
  title: {
    default: `${site.name} · ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} · ${site.tagline}`,
    description: site.description,
    siteName: site.name,
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · ${site.tagline}`,
    description: site.description,
  },
  // Google Search Console verification. Renders
  // <meta name="google-site-verification" content="..."> in <head>.
  verification: {
    google: "Os1T-afprDwZkgiMnKLFzGuZD-1s6HXCuC_UfrPT-4A",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${wordmark.variable}`}
    >
      <body>
        {/* Never hide content if JS is unavailable. */}
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              "<style>.reveal{opacity:1 !important;transform:none !important}.media-img{opacity:1 !important;filter:none !important}</style>",
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-cocoa-300 focus:px-4 focus:py-2 focus:text-cream-50"
        >
          Skip to content
        </a>
        <AttributionInit />
        <GoogleAnalytics />
        <Header />
        <main id="main">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <PrivacyNotice />
        <PreviewBanner />
        <RevealController />
      </body>
    </html>
  );
}
