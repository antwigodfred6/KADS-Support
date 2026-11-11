# KADS Support: website

Redesigned website for **KADS Support**, which provides supported accommodation, training and guidance for young people aged 16+.
It replaces the WordPress/Divi site at https://kadssupport.com. **That site is untouched**; see `MIGRATION.md` before changing anything live.

| Document | What it covers |
|---|---|
| `AUDIT.md` | Audit of the current site, content inventory, open questions for the client |
| `DESIGN_PLAN.md` | Audience, tone, colour, type, layout and motion decisions |
| `SITEMAP.md` | Pages, navigation, URL and redirect plan |
| `QA_REPORT.md` | What was tested, results, and outstanding issues |
| `MIGRATION.md` | Step-by-step, reversible plan for moving the domain (not executed) |

## Stack

Next.js 16 (App Router, Turbopack, Cache Components) · React 19 · TypeScript (strict) · Tailwind CSS 4 · shadcn/ui (Radix) · Motion for React · Lucide · Zod · pnpm.
No database, CMS or Supabase: the site is fully static, and content lives in typed files.

> Next.js 16 differs from older versions. Version-matched docs ship in `node_modules/next/dist/docs/` (see `AGENTS.md`).

## Getting started

Requires Node.js 20.9+ (tested on 24) and pnpm.

```bash
pnpm install
```

```bash
cp .env.example .env.local
```

```bash
pnpm dev
```

Then open http://localhost:3000.

| Command | Purpose |
|---|---|
| `pnpm dev` | Development server |
| `pnpm build` | Production build (all pages prerender as static) |
| `pnpm start` | Serve the production build |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | Generate route types and run `tsc --noEmit` |

## Project structure

```
app/                 Routes (one folder per page), metadata, sitemap, robots, OG image
  contact/actions.ts Server action for the contact form
components/
  art/               Brand illustrations (placeholders for photography) + ArchFrame image slot
  brand/             Logo (client's original artwork) and icon badge
  contact/           Contact form (client component)
  motion/            Reveal helpers and Motion provider (reduced-motion aware)
  sections/          Page heroes, sections, CTA band, related links, holding page
  site/              Header, mobile drawer, footer
  ui/                shadcn/ui primitives (restyled)
content/             ALL editable copy: organisation details, pages, helplines, navigation
lib/                 Routes and redirects, SEO helpers, contact schema, mailer
docs/source-*        Snapshot of the old site's text and logo (reference only)
```

## Editing content

All copy is in `content/`. Change the text there; components don't need touching.

Anything that makes a factual claim carries a status:

- `verified`: confirmed from the live site or a public record
- `confirm`: from the old site but may be out of date; **needs client sign-off**
- `placeholder`: new wording; must be approved or replaced

With `NEXT_PUBLIC_SHOW_CONTENT_FLAGS=true`, unconfirmed items show a small dashed badge, so the client can review them on a preview. To find them all:

```bash
grep -rn 'status: "confirm"\|status: "placeholder"' content app
```

## Logo

The site uses the client's **original logo artwork** (house outline, three figures, "KADS SUPPORT"), taken from the existing website's PNG (`docs/source-assets/kads-logo-original.png`). It must not be redrawn or restyled. Files in `public/brand/`:

| File | Use |
|---|---|
| `kads-logo-on-light.png` | Full logo on light backgrounds (header). White parts recoloured to the logo's slate `#323f48`; nothing else changed |
| `kads-logo-on-dark.png` | Full logo on dark backgrounds (footer, link preview); the original |
| `kads-mark-on-light.png` / `kads-mark-on-dark.png` | House and figures only, for small or decorative uses |

`app/icon.png` (favicon) and `app/apple-icon.png` show the house and figures on the logo's slate. If the client supplies a vector file (SVG/AI/EPS), regenerate these from it for sharper print use.

## Images

The current site's stock photos have an **unknown licence** and are not used. Every image slot (`ArchFrame`) shows an on-brand illustration and accepts a real photo:

```tsx
<ArchFrame scene="doorKey" image={{ src: "/images/house.jpg", alt: "Describe the photo", width: 1600, height: 2000 }} />
```

Use only photos the client owns or has licensed, and get consent for anyone identifiable. Put files in `public/images/`; `next/image` optimises them.

## Contact form

The form sends through KADS Support's existing **Zoho Mail (EU)** mailbox over authenticated SMTP (`lib/mailer.ts`, using nodemailer). **It is switched off until the settings below are added in Vercel.** Until then, visitors are told plainly that online messages aren't switched on and are shown the phone number and email. **It never shows a fake success.**

How it behaves:
- Each enquiry arrives as an email from "KADS Support website", with **Reply-To set to the visitor**, so staff can simply press Reply.
- Referrals can go to a separate inbox (`CONTACT_REFERRAL_TO_EMAIL`); otherwise everything goes to `CONTACT_TO_EMAIL`.
- Visitor input is HTML-escaped and stripped of line breaks in headers.
- If Zoho can't be reached, the visitor is told their message was **not** sent, and what they typed is kept. Logs record only the error code, never names, emails or message text.
- Anti-spam: honeypot field, minimum fill time and a basic per-IP rate limit. Cloudflare Turnstile is a recommended addition before launch.

### Switching it on (needs the client's Zoho admin)

1. In **Zoho Mail**, choose the mailbox that will send the email (e.g. `info@` or a dedicated `website@kadssupport.com`).
2. Turn on two-factor authentication for that mailbox if it isn't already, then create an **app-specific password**: Zoho Accounts → Security → App Passwords → "Generate new password", named "KADS website".
3. In **Vercel → kads-support → Settings → Environment Variables**, add these for **Production** (and Preview only if you want previews to send real email). Mark `ZOHO_SMTP_PASS` as **Sensitive**:

| Variable | Value |
|---|---|
| `CONTACT_DELIVERY` | `zoho` |
| `ZOHO_SMTP_USER` | the sending mailbox address |
| `ZOHO_SMTP_PASS` | the app-specific password (secret) |
| `CONTACT_TO_EMAIL` | the inbox that should receive enquiries |
| `CONTACT_REFERRAL_TO_EMAIL` | optional, separate inbox for referrals |

4. Redeploy, then send one real test message from the live site and check that it arrives (and isn't in spam).
5. **Fix SPF first, or at the same time** (see MIGRATION.md §4): kadssupport.com's SPF record currently authorises Hostinger only, not Zoho. Mail Zoho sends may be marked as spam until `include:zoho.eu` is added. That's a DNS change and needs the client's approval.

Never put the password in the code, in `.env.example`, or in a `NEXT_PUBLIC_` variable.

## Environment variables

See `.env.example`. Only `ZOHO_SMTP_PASS` is secret: keep it in Vercel, marked Sensitive.

| Variable | Preview | Production (after approval) |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Vercel preview URL | `https://kadssupport.com` |
| `NEXT_PUBLIC_SHOW_CONTENT_FLAGS` | `true` | `false` |
| `ALLOW_INDEXING` | unset (robots.txt blocks all) | `true` |
| `CONTACT_DELIVERY` | unset | `zoho`, plus the Zoho variables above |

## URLs and redirects

New clean URLs (SITEMAP.md, Option B). Old WordPress URLs return a **301** to their new home. The rules are in `lib/routes.ts` (`legacyRedirects`) and applied in `next.config.ts`:

| Old | New |
|---|---|
| `/our-services/` | `/accommodation` |
| `/support-programs/` | `/advice-support` |
| `/about-dacs/` | `/about` |
| `/sample-page/`, `/blog/`, `/shop/`, `/basket/`, `/checkout/`, `/my-account/` | `/` |
| `/employment-training/`, `/our-objectives/`, `/contact/` | same path, trailing slash removed |

## Deploying (not done; needs approval)

Nothing has been pushed or deployed. When approved:

1. Create a **dedicated** GitHub repository for the client and push this project (no secrets are in the repo; `.env*` files are ignored).
2. In Vercel, create a **new, separate project** from that repository. Framework: Next.js. Install command: `pnpm install`. Build: `pnpm build`.
3. Set the environment variables for **Preview** as in the table above.
4. Share the preview URL with the client for review. Unconfirmed content shows its badges there.
5. **Do not add the kadssupport.com domain** until the client signs off and `MIGRATION.md` has been followed.

## Accessibility

Built to WCAG 2.2 AA: zoom allowed, skip link, landmarks, one H1 per page, visible focus, 44px+ targets, labelled form fields with an error summary, reduced-motion support, and checked contrast tokens. Results are in `QA_REPORT.md`.
