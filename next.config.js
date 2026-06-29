/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  // Don't advertise the framework in response headers (minor info-leak hygiene).
  poweredByHeader: false,
  images: {
    // Hosts allowed through the next/image optimiser:
    //  - Supabase Storage serves dashboard-managed images
    //  - picsum.photos backs the deterministic stock placeholders
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
    ],
  },
};

module.exports = nextConfig;
