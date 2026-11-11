# KADS Support: QA Report

**Date:** 11 November 2026 · **Build:** local, Next.js 16.4.6 · **Tested by:** Claude (automated + scripted browser checks)
Nothing has been deployed. All tests ran against `pnpm dev` (port 3210) and a local production build, `pnpm build && pnpm start` (port 3211).

## Summary

| Check | Result |
|---|---|
| TypeScript (`pnpm typecheck`, strict) | ✅ Pass, 0 errors |
| ESLint (`pnpm lint`) | ✅ Pass, 0 errors, 0 warnings |
| Production build (`pnpm build`) | ✅ Pass. 18 routes, all prerendered static, no build warnings |
| Internal links (all hrefs on 12 pages) | ✅ 13/13 unique internal links return 200 |
| Legacy redirects (13 old URLs) | ✅ All reach their new page (details below) |
| Status codes | ✅ All pages 200; unknown URL → custom 404 with status 404 |
| Accessibility: axe-core 4.10 (WCAG 2.0/2.1/2.2 A+AA + best practice) | ✅ 0 violations on all 10 content pages, 404 page, and the contact form in its error state |
| Keyboard | ✅ Skip link first, visible 3px focus ring, About dropdown opens/closes with Escape and returns focus, drawer traps focus |
| Responsive (375, 768, 1024, 1440) | ✅ No horizontal scrolling on any page at 375px; layouts checked visually |
| Contact form | ✅ Validation, error summary, focus management, honest "not sent" in production |
| Metadata / SEO | ✅ Unique title + description per page, canonical, Open Graph + image, JSON-LD (Organization, BreadcrumbList), sitemap, robots |
| Console | ✅ No errors on fresh loads (one hydration warning was found and fixed; see below) |

## Details

### Redirects (production server)

| Request | Result |
|---|---|
| `/our-services` | 301 → `/accommodation` |
| `/our-services/`, `/support-programs/`, `/about-dacs/`, `/sample-page/`, `/blog/`, `/shop/`, `/basket/`, `/checkout/`, `/my-account/` | 308 (strip slash) → 301 → new page |
| `/employment-training/`, `/our-objectives/`, `/contact/` | 308 → same page without slash |

Trailing-slash URLs take two hops (Next.js's built-in slash removal, then our 301). Search engines follow this. Making it a single hop would need Next's `skipTrailingSlashRedirect` plus a Proxy, which Next.js advises against for most projects.

### Accessibility

- axe-core ran in the browser on every page after all animations finished (so faded-in text couldn't hide contrast problems). It was installed temporarily as a local dev dependency and removed afterwards.
- Issues found **and fixed** during QA: homepage was missing its `<title>` (metadata helper bug); logo link's `aria-label` didn't match its visible text; the dev-only review badge had 4.19:1 contrast; contact-form focus relied on `requestAnimationFrame`.
- Manual checks: one H1 per page (12/12), landmarks (`header`, `nav` ×3 labelled, `main`, `footer`), zoom not restricted, 44px+ tap targets on nav, buttons and links, `tel:`/`mailto:` links, reduced-motion handling (CSS + Motion `reducedMotion="user"`).
- **Not yet done:** testing with a real screen reader (VoiceOver/NVDA) and real devices. Recommended before launch.

### Contact form

| Scenario | Result |
|---|---|
| Submit empty | 5 inline errors + linked error summary; fields marked `aria-invalid`; focus moves to the summary |
| Valid, dev (`CONTACT_DELIVERY=log`) | "Test complete: not sent". Server log has only enquiry type, message length and has-phone (no personal data) |
| Valid, production (no delivery configured) | Alert: "Our online form isn't switched on yet, so your message has not been sent…" plus phone and email; typed values are kept |
| Honeypot filled / submitted < 3s | Rejected with a neutral message, nothing delivered |
| Rate limit | 5 submissions per IP per 10 minutes (in-memory, per instance) |

### Performance (local production build, homepage)

- HTML ≈ 21 KB gzipped (CSS is inlined); 2 font files preloaded (Jakarta, Inter); Fraunces loads without preload.
- JavaScript ≈ 255 KB gzipped on first load. Most is React DOM and Next.js runtime (~150 KB); Motion ≈ 50 KB; Radix + Lucide ≈ 30 KB.
  Tried: `LazyMotion` with `m` components and asynchronously loaded features (kept; saved ~5 KB). A further option, if Lighthouse flags it on the preview: replace Motion scroll reveals with CSS (`animation-timeline: view()`), which would save ~50 KB.
- No raster images yet (illustrations are inline SVG), so image weight is ~0. When real photos are added, `next/image` serves AVIF/WebP at the right sizes.
- Above-the-fold content uses CSS-only entrance animations, so **the first screen is never blank while JavaScript loads**. This fixes the old site's 1–3 second blank screen on mobile.
- Lighthouse on the live preview: 100 performance on mobile and desktop (see "Live preview" below). Real-user Core Web Vitals will only exist after launch.

### SEO

- Titles and descriptions are written per page; canonical uses `NEXT_PUBLIC_SITE_URL`.
- `robots.txt` **blocks all crawling unless `ALLOW_INDEXING=true`**, so previews can't be indexed.
- Holding pages (privacy, cookies, safeguarding, accessibility draft) and the 404 are `noindex` and left out of the sitemap.
- JSON-LD uses verified facts only (name, URL, phone, email, registered office, company number). `legalName` is added automatically once it's marked verified.

## Live preview: Lighthouse 13.6.0 (11 Nov 2026, https://kads-support.vercel.app)

| Page | Device | Performance | Accessibility | Best practices | SEO | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|---|
| Home | Mobile | 100 | 100 | 100 | 66* | 0.9 s | 10 ms | 0 |
| Home | Desktop | 100 | 100 | 100 | 66* | 0.5 s | 0 ms | 0 |
| Accommodation | Mobile | 100 | 100 | 100 | 66* | 0.9 s | 10 ms | 0 |
| Contact | Mobile | 100 | 100 | 100 | 66* | 0.9 s | 0 ms | 0 |

\* The only failing SEO audit is `is-crawlable`: robots.txt blocks crawlers **on purpose** while this is a preview. It passes once `ALLOW_INDEXING=true` is set at launch. Remaining advisory "insights" (legacy JS, unused JS, render-blocking CSS) come mainly from the Next.js runtime and didn't reduce any score.

Deployment: `dpl_5rfyVbWuisadAapU9WmbMNKPCmUG`, commit `6676991`, built on Vercel with pnpm 12.10.1 / Node 24; all 18 routes generated; no build errors. The public preview URL serves all pages, the 404, redirects, sitemap, robots and security headers (incl. HSTS) as expected.

## Bugs found and fixed during QA

1. Homepage had no `<title>`, because `pageMetadata()` passed `title: undefined`
2. Hydration mismatch from the Motion page-transition wrapper (fixed by replacing it with a CSS fade)
3. Services grid left an empty cell on desktop
4. Accommodation hero panel covered the breadcrumb (desktop) and most of the image (mobile)
5. Advice hero illustration blended into its background
6. Desktop nav labels wrapped at 1024px
7. Logo link accessible name mismatch; review-badge contrast; error-summary focus timing
8. Social image used unsupported `z-index`

## Outstanding: needs the client

These are flagged in the UI (dashed "Client to confirm" / "Placeholder" badges, with `NEXT_PUBLIC_SHOW_CONTENT_FLAGS=true`) and listed in `AUDIT.md` §12:

| Item | Where |
|---|---|
| Legal name (Companies House says KADS Support Services Ltd) | Footer |
| "Since 2018" vs incorporation April 2023 | About |
| Age range 16+, area served (London?), "staffed 24/7" | Home, Accommodation |
| Manager name and qualification wording | About |
| Partner list: which are current and approved to name | Home |
| Spear description (old one was a copy-paste error) | Employment |
| Putting Down Roots project still running? Trade courses accredited? | Employment |
| Who delivers counselling, and their qualifications | Advice |
| Whether shared amenities apply to all homes | Accommodation |
| Referral eligibility, areas, referral email/form, response time | Referrals |
| **Ofsted registration status**: not mentioned anywhere until confirmed | (none) |
| Privacy policy, cookie statement, safeguarding summary + DSL contact | Holding pages |
| Approve the accessibility statement draft | /accessibility |
| Original logo artwork (current one is a redrawn SVG; house outline omitted) | Header, footer, favicon |
| Licensed or own photography (illustrations are placeholders) | All image slots |
| Contact form provider and recipient address | `lib/mailer.ts` |

## Outstanding: technical, before launch

- Connect the contact form once a provider is approved, and add Cloudflare Turnstile
- Real-device testing on the Vercel preview (Lighthouse done: see above)
- Screen-reader pass (VoiceOver iOS/macOS, NVDA)
- Set production env vars (`ALLOW_INDEXING=true`, `NEXT_PUBLIC_SHOW_CONTENT_FLAGS=false`, `NEXT_PUBLIC_SITE_URL`)
- Follow `MIGRATION.md`; separately, raise the SPF/Zoho issue with the client

## Content changes from the old site (for client review)

- Phone shown in standard UK format: **020 3657 5651** (old site: 0203 657 5651)
- Helplines corrected: NHS Direct (closed 2014) → **NHS 111**; Coram Voice → **0808 800 5792**; FRANK → **0300 123 6600** (checked on the official sites, 11 Nov 2026)
- Copy rewritten for clarity and consistency; every factual claim traces to the old page noted in `content/pages.ts`
- New wording without an old-site source: hero headline, section headings, the four-step "journey" framing (built from verified statements), referral step 1 "Get in touch", accessibility statement draft
