/**
 * Single source of truth for every URL on the site.
 * SITEMAP.md, Option B: clean URLs with 301s from the old WordPress paths.
 * The redirects themselves live in next.config.ts (legacyRedirects).
 */
export const routes = {
  home: "/",
  accommodation: "/accommodation",
  employment: "/employment-training",
  advice: "/advice-support",
  objectives: "/our-objectives",
  about: "/about",
  referrals: "/referrals",
  contact: "/contact",
  privacy: "/privacy-policy",
  cookies: "/cookie-policy",
  accessibility: "/accessibility",
} as const;

export type RoutePath = (typeof routes)[keyof typeof routes];

/** Old WordPress URL → new URL. Kept as data so it can be tested and documented. */
export const legacyRedirects: { from: string; to: RoutePath }[] = [
  { from: "/our-services", to: routes.accommodation },
  { from: "/support-programs", to: routes.advice },
  { from: "/about-dacs", to: routes.about },
  { from: "/sample-page", to: routes.home },
  { from: "/blog", to: routes.home },
  { from: "/shop", to: routes.home },
  { from: "/basket", to: routes.home },
  { from: "/checkout", to: routes.home },
  { from: "/my-account", to: routes.home },
];
