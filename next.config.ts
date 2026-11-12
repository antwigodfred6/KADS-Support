import type { NextConfig } from "next";
import { legacyRedirects } from "./lib/routes";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Old WordPress URLs → new URLs (SITEMAP.md, Option B). 301 for search engines.
  // Old URLs with a trailing slash (e.g. /our-services/) first get Next's built-in
  // 308 to the slash-less path, then this 301. Search engines follow the 2-hop chain.
  async redirects() {
    return legacyRedirects.map(({ from, to }) => ({ source: from, destination: to, statusCode: 301 as const }));
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
        ],
      },
      {
        // Only kadssupport.com should appear in search results. Even with
        // ALLOW_INDEXING=true in production, the *.vercel.app copies stay out.
        source: "/:path*",
        has: [{ type: "host", value: ".*\\.vercel\\.app" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
