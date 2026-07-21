/** @type {import('next').NextConfig} */

// Content-Security-Policy allowlist. Kept in sync with the only external hosts
// the browser actually contacts:
//   - Supabase (auth, data, storage images, realtime websocket)
//   - Google Tag Manager / Analytics / Ads (loaded only after cookie consent)
//   - picsum.photos (deterministic stock placeholders)
//   - Vercel Speed Insights beacon
// 'unsafe-inline' is required for Next.js hydration scripts, JSON-LD blocks and
// the gtag init snippet (we don't use nonces because the marketing pages are
// statically generated). Everything else is denied by default-src 'self'.
const ContentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.googleadservices.com https://googleads.g.doubleclick.net",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.supabase.co https://picsum.photos https://*.picsum.photos https://www.google-analytics.com https://www.googletagmanager.com https://googleads.g.doubleclick.net https://www.google.com",
  "font-src 'self' data:",
  "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://www.google-analytics.com https://analytics.google.com https://*.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://www.google.com https://vitals.vercel-insights.com",
  "frame-src 'self' https://td.doubleclick.net https://www.googletagmanager.com",
  "upgrade-insecure-requests",
].join("; ");

// Applied to every response. HSTS is intentionally omitted: Vercel already sets
// Strict-Transport-Security for custom domains, so we don't double it up.
const securityHeaders = [
  { key: "Content-Security-Policy", value: ContentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig = {
  reactStrictMode: true,
  // Don't advertise the framework in response headers (minor info-leak hygiene).
  poweredByHeader: false,
  images: {
    // Serve images as-is instead of through Vercel's image optimiser. That
    // optimiser has a per-plan transformation quota, and once it's exhausted it
    // returns 402 (OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED) — which silently
    // blanked every photo on the site. A crawl of 100+ pages burns through the
    // allowance quickly. Everything in public/images is pre-compressed (longest
    // edge 1600px, ~100–250KB), so serving directly is fast and has no quota.
    unoptimized: true,
    // Hosts allowed through the next/image optimiser:
    //  - Supabase Storage serves dashboard-managed images
    //  - picsum.photos backs the deterministic stock placeholders
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

module.exports = nextConfig;
