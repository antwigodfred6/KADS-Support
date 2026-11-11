# KADS Support: Website Audit & Content Inventory

**Site audited:** https://kadssupport.com
**Date:** 11 November 2026
**Method:** Read-only public crawl. I fetched the WordPress sitemap, every listed page, robots.txt, public DNS lookups and the Companies House public record, and did a visual check at 1440px desktop and 375px mobile. I declined optional cookies on the banner and logged in to nothing. Nothing on the live site, hosting, DNS or email was changed.

Raw text from each page is saved in `docs/source-content/`. The original logo is in `docs/source-assets/`.

**Labels used below**
- ✅ **Verified**: seen on the live site or in a public record today
- ⚠️ **Confirm**: on the site, but possibly out of date or inconsistent; the client must confirm
- ❓ **Missing**: needed for the new site and not available publicly

---

## 1. Platform & infrastructure (observed, not touched)

| Item | Finding | Status |
|---|---|---|
| CMS | WordPress 7.1.4 (version shown publicly in a `generator` tag) | ✅ |
| Theme | Divi (Elegant Themes) with a `K-Pro` child theme | ✅ |
| Plugins visible | CookieYes / `cookie-law-info`, plus WooCommerce pages (shop/basket/checkout) | ✅ |
| Hosting | Hostinger (`server: hcdn`, LiteSpeed cache, `cdn.hstgr.net`) | ✅ |
| Nameservers | `nebula.dns-parking.com`, `aurora.dns-parking.com` (Hostinger DNS) | ✅ |
| Registrar | Namecheap (from your brief; not checked) | ⚠️ |
| Email (MX) | Zoho EU: `mx.zoho.eu` (10), `mx2.zoho.eu` (20), `mx3.zoho.eu` (50) | ✅ |
| SPF | `v=spf1 include:_spf.mail.hostinger.com ~all`, which **does not include Zoho** | ⚠️ see §10 |
| DMARC | `v=DMARC1; p=none` (monitor only) | ✅ |
| DKIM | Nothing found at the common Zoho selectors (`zmail`, `zoho`, `default`); the real selector may be different | ❓ |
| Analytics | None found in the page source | ✅ |
| Original credit | Footer says "Designed and Produced by KandianPRO Pvt LTD" | ✅ |

**Important for migration:** DNS is served by **Hostinger**, not Namecheap. Namecheap only points the domain at Hostinger's nameservers. Any future web change will probably happen in Hostinger's DNS zone, not in Namecheap. See `MIGRATION.md` (later phase).

---

## 2. Pages & URLs

From `wp-sitemap.xml` and the WordPress REST API. Most content was last edited **10 Nov 2018**.

| URL | Title | Nav label | Content | Last modified | Decision |
|---|---|---|---|---|---|
| `/` | KADS Supports young people | (logo) | Full homepage | 19 Jun 2023 | **Keep** |
| `/our-services/` | Accommodation \| KADS Support | Accommodation | Full | 10 Nov 2018 | Keep, possible rename (see SITEMAP) |
| `/employment-training/` | Employment & Training | Employment & Training | Full | 10 Nov 2018 | **Keep URL** |
| `/support-programs/` | Advice & Support | Advice & Support | Full (counselling + mentoring) | 10 Nov 2018 | Keep, possible rename |
| `/our-objectives/` | Our Objectives | Our Objectives | Full | 10 Nov 2018 | **Keep URL** |
| `/about-dacs/` | About us | About us | Full (management, policies, referrals) | 10 Nov 2018 | Rename → 301 |
| `/contact/` | Contact | Contact | Form + FAQ + helplines | 10 Nov 2018 | **Keep URL** |
| `/about` | (none) | (none) | 301 → `/about-dacs/` | (none) | Keep redirect |
| `/blog/` | Blog | Not in nav | **Empty** | 10 Nov 2018 | Drop → 301 to `/` |
| `/shop/` | Shop | Not in nav | **Empty** WooCommerce | 20 Nov 2020 | Drop → 301 to `/` |
| `/basket/` | Basket | Not in nav | `[woocommerce_cart]` shortcode only | 20 Nov 2020 | Drop → 301 to `/` |
| `/checkout/` | Checkout | Not in nav | `[woocommerce_checkout]` only | 20 Nov 2020 | Drop → 301 to `/` |
| `/my-account/` | My account | Not in nav | `[woocommerce_my_account]` only | 20 Nov 2020 | Drop → 301 to `/` |
| `/sample-page/` | Sample Page | Not in nav | **WordPress default placeholder text** (publicly indexed) | 1 Jun 2023 | Drop → 301 to `/` |

Other observations:
- The homepage's internal slug is `dacs-support`, and the About URL is `/about-dacs/`. "DACS" looks like an earlier name or a leftover from a template. ❓ Ask the client.
- `/privacy-policy`, `/terms-and-conditions`, `/cookie-policy`, `/faq`, `/referrals` and `/accommodation` all return **404**.

---

## 3. Navigation & footer

**Header nav (desktop):** Accommodation · Employment & Training · Advice & Support · Our Objectives · About us · Contact
Logo top-left links home. No dropdowns, no call-to-action button, no phone number in the header.

**Footer:**
- `info@kadssupport.com` and `0203 657 5651` (plain text, **not clickable** `mailto:` or `tel:` links)
- "> Terms & Conditions > Privacy Policy" is **plain text, not links**, so these pages do not exist
- "KADS Support limited is registered in England. Company No: 14819315. Our registered office is located at The Mille, 1000 Great West Road, Brentford, TW8 9DW."
- "Designed and Produced by KandianPRO Pvt LTD"
- No social media links anywhere on the site

---

## 4. Organisation & brand identity

| Item | Live site says | Public record / note | Status |
|---|---|---|---|
| Trading name | KADS Support | (none) | ✅ |
| Legal name | "KADS Support limited" | Companies House: **KADS SUPPORT SERVICES LTD** | ⚠️ Mismatch |
| Company no. | 14819315 | Matches. Active, private limited | ✅ |
| Founded | "established since July 2018" | Company **incorporated 21 April 2023** | ⚠️ May be an older business that incorporated later. Confirm the wording |
| Registered office | The Mille, 1000 Great West Road, Brentford, TW8 9DW | Companies House matches (1000 Great West Road, TW8 9DW) | ✅ |
| Nature of business | (none) | SIC 87900: Other residential care activities n.e.c. | ✅ (public record) |
| Visiting address? | Shown on the contact page as "How can I get in touch?" | It is a business centre. Can people visit, or is it a registered office only? | ❓ |
| Phone | 0203 657 5651 | (none) | ✅ (confirm it is still staffed) |
| Email | info@kadssupport.com | Zoho mailbox | ✅ |
| Manager | Doreen Kajura, Registered Social Worker (QSW) | Not checked against Social Work England, and I won't claim it without client approval | ⚠️ Confirm still current, and confirm the wording |

### Logo
- `kads-support-logo-2-1.png`, 688×778 transparent PNG. Three overlapping figures (teal, deep navy, orange) inside a house outline, with "KADS SUPPORT" lettering. Part of the lettering is white, so it **only works on dark backgrounds**.
- No SVG, no favicon set, no Open Graph image found.
- ❓ **Need:** an original vector (SVG/AI/EPS) and a version for light backgrounds. Without them I'll trace a clean SVG for the build, labelled for client approval.

### Colours in use
| Role | Hex | Source |
|---|---|---|
| Teal (logo figure, accents) | `#278CA5` | Logo / CSS |
| Deep navy (logo figure) | ≈ `#0B4260` | Logo |
| Orange (logo letters, buttons) | `#EA924A` | Logo / CSS |
| Slate header/footer | ≈ `#2F3B4C` | Visual |
| Divi default blues | `#1863DC`, `#2EA3F2` | Theme defaults, not brand |

### Fonts in use
Lato (headings/nav), Open Sans (body), Caveat (handwritten hero quote). All Google Fonts, loaded with every weight (heavy).

### Imagery
11 images, all generic stock photos uploaded in Nov 2018 (`life-coach-03/09/33.jpg`, `Categories-01…04.jpg`, `1804.jpg`, `15338.jpg`, `Group-Small.jpg`). The filenames match Divi "Life Coach" layout-pack assets.
- ⚠️ **Licence unknown.** I won't reuse them in the new build unless the client confirms a licence.
- No real photos of KADS homes, staff or activities. (Showing young people needs consent and safeguarding anyway, so licensed stock or non-identifying photography is the safer default.)

---

## 5. Services & content inventory

### Home (`/`)
- **H1:** "Helping Young People Find & Forge Your Own Path" (mixes "their" and "your")
- **Quote:** "We support young people with a personalised support plan to gain the confidence and develop life skills needed to transition into independence and to move forward in to adulthood" (KADS Support Team)
- **Section:** "We empower individuals to live independently". Staff work in line with best practice and current legislation; "4 core beliefs":
  - **Respect**: every young person has a fundamental right to respect regardless of sex, age, religion, race, culture, sexual orientation and language
  - **Skilled support**: dedicated, skilled, high professional standards
  - **Independence**: confidence and living skills for a smooth transition to independent living
  - **Personal Development**: advise on wider support needs, encourage personal development
- **Service teasers:** Accommodation (semi-independent supported accommodation; emergency placement) · Training & Employment (basic skills → trade skills; employment through partners) · Counselling & Mentoring · Advice & Support ("staffed 24/7")
- **Partners:** "growing body of partnerships including local councils to private organisations". Named: Spear (employment programme), City Harvest, West London Alliance, London Councils, colleges, police, children's social services, YOT, CAMHS, National Citizen Service, Connexions. ⚠️ Confirm each one is a **current formal partnership** before I name it. Some (e.g. police, CAMHS) are more likely agencies they work alongside. Connexions has largely closed in London.
- **CTA:** "Contact our management team on 0203 657 5651" + contact form

### Accommodation (`/our-services/`)
- "Nurturing, therapeutic environment where the young person can feel safe and comfortable"
- Types: shared accommodation · stand-alone units · 24-hour support units
- Young people will have: own space (own bedroom, storage, choose décor) · security (lockable bedroom, own key) · shared amenities (living room, kitchen with food, dining room, bathroom and 2 toilets, washer, dryer) · 24/7 access to support · links with the community · life skills (cooking, laundry, budgeting, education/work, health, benefits, housing)
- **Emergency placements:** respite or emergency placement "if deemed suitable"; paperwork and risk assessments needed on arrival
- ⚠️ "Bathroom and 2 toilets" describes one specific property. Confirm whether it still applies, or generalise.
- ❓ Locations/boroughs served, number of homes, age range for accommodation (16+ stated elsewhere), and **Ofsted registration status**. Since Oct 2023, supported accommodation for looked-after 16–17-year-olds and care leavers in England must be Ofsted-registered. The site says nothing about this. **I won't state or imply any registration** until the client confirms it.

### Employment & Training (`/employment-training/`)
- "Knowledge, Training and Employment all go hand in hand"
- **Training:** Basic Skills (literacy, numeracy) · Train & Trade (bricklaying, decorating, plumbing, carpentry) · Gardening & Horticulture ("Putting Down Roots for Young People", funded by the Big Lottery Fund through Our Bright Future)
- **Employment:** Spear · Multiple Disadvantage Employment
- **How our staff help:** work with referring agencies
- ⚠️ The Spear description is a **copy-paste error** (it repeats the "Personal Development" belief text).
- ⚠️ The Big Lottery Fund is now The National Lottery Community Fund, and "Our Bright Future" was a time-limited programme. Is this project still running?
- ⚠️ Are the trade-skills programmes delivered by KADS or by partners? Accredited?

### Advice & Support (`/support-programs/`)
- "Constructive advice & support is the cornerstone of personal development"
- **We believe:** Respect · Skilled Support · Skill Development · Advice & Encouragement (same text as the home beliefs, **duplicated**)
- **1:1 Counselling:** promotes good mental health in a confidential, safe setting. Lists 10 issue areas (depression, anxiety, substance use, anger, relationships, self-esteem, bereavement, work/education, sex/sexuality/gender identity, difficult past experiences)
- **Mentoring Programme:** ages **16–22**, in London. Stages: (1) link research and connection, (2) facilitation / circle of support, (3) negotiation and advocacy
- ❓ Who delivers counselling (qualified/registered counsellors? in-house or partner)? This matters before publishing a list of clinical issues.

### Our Objectives (`/our-objectives/`)
- **H1:** "Our Ethos & Values"
- **Core objectives (8):** Accommodation (16+, stable, "sense of home") · Safety · Freedom of Expression · Develop Identity · Privacy · Development (health, education) · Community · Feedback & Involvement
- **How our staff help:** holistic approach; staffed 24/7; working alongside the young person's professional team and KADS policies
- Note: the first objective's heading is missing in the HTML (blank `h4`).

### About us (`/about-dacs/`)
- Established July 2018; private provider; young people aged 16+ (⚠️ see §4)
- **Management:** Doreen Kajura, qualified Registered Social Worker
- **Policies & procedures:** comprehensive safeguarding policies; safer recruitment and whistleblowing policies (⚠️ the policies themselves are not published)
- **Referrals & admissions:** referrals through the local authority with a recent risk assessment → young person visits with their social worker/care manager → needs meeting → welcome pack with User's Guide (support, house rules, complaints procedure, useful numbers)

### Contact (`/contact/`)
- Contact form + FAQ (3 questions) + helplines + address
- **Helplines listed:**
  | Listed | Status |
  |---|---|
  | Childline 0800 11 11 | ✅ Current |
  | Coram Voice 020 7833 5792 | ⚠️ Probably the office line; the young people's helpline is a freephone 0808 number. Verify |
  | Drugs helpline 0800 77 66 00 | ⚠️ Old FRANK number; FRANK now uses 0300 123 6600. Verify |
  | NHS Direct 0845 46 47 | ❌ **Out of date.** NHS Direct closed in 2014; replace with NHS 111 |
  | Emergency services 999 | ✅ |

  I'll verify each number against its official source before the new site goes live.

---

## 6. Contact forms

| Item | Finding |
|---|---|
| Location | Homepage and `/contact/` (Divi contact module, posts to the same page) |
| Fields | Email Address, Full Name, Phone Number, Message (placeholder text only) |
| Labels | No visible `<label>`s, only placeholders (accessibility fail) |
| Required/validation | No `required` attributes in the HTML; validation is JS-only |
| Email input type | `type="text"`, not `type="email"` (no mobile email keyboard) |
| Consent / privacy notice | None. **No privacy policy exists**, yet the form collects personal data |
| Anti-spam | Only a nonce; no captcha or honeypot found |
| Recipient | ❓ Unknown (configured in the WordPress admin, probably info@kadssupport.com) |
| Enquiry type | None. Referrers, young people and partners all use one form |

---

## 7. Downloads, social & metadata

- **Downloadable resources:** none (no PDFs, no referral form, no policies)
- **Social media:** none linked. ❓ Does KADS have any accounts?
- **Metadata:**
  - Home has `description` ("Supporting young people through Accommodation, Training, Employment, Mentoring and Counselling.") and `keywords` (misspelled "Accomodation")
  - **Inner pages have no meta description**
  - Canonical tags present on all pages ✅
  - **No Open Graph or Twitter tags**, so link previews on WhatsApp, LinkedIn etc. show no image
  - **No structured data** (JSON-LD)
  - **No favicon** found
  - `robots.txt` is the WordPress default; the sitemap includes the junk pages (sample, shop, basket…)

---

## 8. Calls to action

| CTA | Where | Issue |
|---|---|---|
| "Learn More" × 4 | Home service cards | Generic link text (WCAG 2.4.4); card headings hidden behind image overlays |
| "Our Objectives" | Home | (none) |
| Phone number as text | Home, footer, contact | Not tappable on mobile |
| "Send Message" | Home, contact | No referral-specific route |

There is **no clear CTA for professionals making a referral**, even though referrals come through local authorities. This is the most important audience.

---

## 9. Accessibility & mobile usability issues

Checked by hand plus DOM inspection. A full axe/Lighthouse run comes in QA.

| # | Issue | Severity | WCAG 2.2 |
|---|---|---|---|
| 1 | Viewport set to `maximum-scale=1, user-scalable=0`, so **pinch-zoom is disabled** | High | 1.4.4 Resize Text |
| 2 | Content hidden until entrance animations run; on mobile the hero and Accommodation pages are **blank for 1–3 seconds**, and there is no reduced-motion handling | High | 2.3.3 / 2.2.2 (best practice) |
| 3 | Form fields have no labels, only placeholders | High | 1.3.1, 3.3.2 |
| 4 | Low-contrast text: white text on light image overlays (partners list, service cards), pale orange quote text | High | 1.4.3 |
| 5 | Page H1 "ACCOMMODATION" **overflows off-screen** at 375px | Medium | 1.4.10 Reflow |
| 6 | Logo overlaps the first nav item at ~800px widths | Medium | (none) |
| 7 | No `<main>` landmark, no skip link | Medium | 2.4.1 |
| 8 | Phone and email not linked (`tel:`/`mailto:`) | Medium | Usability |
| 9 | Decorative/background images with empty alt, but the logo appears twice (one empty alt); acceptable but inconsistent | Low | 1.1.1 |
| 10 | Heading order skips (h2 → h4) and phone numbers marked up as `h1`/`h2` on the contact page (multiple H1s) | Medium | 1.3.1 |
| 11 | "Learn More" ×4 link text | Medium | 2.4.4 |
| 12 | Hero heading mixes "young people" and "your own path" | Low | Content |

**Performance (light check):** the Accommodation page loaded 23 resources at ~47 KB transfer (LiteSpeed cache helps), but it ships full Lato/Open Sans/Caveat families and the Divi framework. Stock images are 130–340 KB JPGs with no WebP/AVIF.

---

## 10. Things to protect during migration (do not change)

- **MX records → Zoho EU.** Email must keep working.
- **SPF currently authorises Hostinger mail only, not Zoho.** Outgoing Zoho mail may already be failing SPF. This is an **existing issue, not caused by us**. Raise it with the client or their IT contact; don't fix it as part of the website work without approval.
- **DMARC `p=none`.** Leave as is.
- **DKIM:** selector unknown. Record whatever exists before any DNS work.
- DNS is hosted at **Hostinger** (dns-parking.com nameservers). Changing the website should only need the `@` and `www` web records to change, not the nameservers.

---

## 11. Content gaps & duplication

**Duplicated**
- The 4 beliefs appear on Home and on Advice & Support with near-identical text (and partly again in Objectives)
- "How our staff help" appears on both Employment & Training and Our Objectives
- The Spear description duplicates the Personal Development text (error)

**Gaps**
- Referral process for professionals (eligibility, how to refer, what to send, response time)
- Areas/boroughs served
- Regulatory status (Ofsted registration for supported accommodation, if applicable)
- Safeguarding statement and Designated Safeguarding Lead contact
- Privacy policy (needed by UK GDPR because the form collects personal data), cookie policy, terms
- Complaints procedure (the welcome pack mentions one; the site doesn't)
- Accessibility statement
- Up-to-date helpline numbers
- Real photography or a licensed image set
- Favicon, OG image, SVG logo

---

## 12. Questions for the client

**Organisation & claims**
1. Legal name: "KADS Support Services Ltd" (Companies House) or "KADS Support Limited"? Which should appear in the footer?
2. "Established July 2018": still accurate (trading since 2018, incorporated 2023)?
3. Is Doreen Kajura still the manager? May we name her and state "Registered Social Worker"?
4. Is the supported accommodation **Ofsted-registered**? If yes, URN and rating to display? If not applicable, why (e.g. 18+ only)?
5. Which partners are **current** and approved to be named? Any logos we may use?
6. Is the "Putting Down Roots" / Big Lottery project still running?
7. Who delivers counselling, and what qualifications or memberships do they hold?
8. Is the service still staffed 24/7?

**Operations**
9. Which boroughs/areas do you serve? Age ranges per service?
10. How should professionals refer: email, phone, a form? Is there a referral form document?
11. Is 1000 Great West Road a visiting address, or registered office only?
12. Who should receive website enquiries, and should referrals go somewhere separate?
13. Any social media accounts?

**Assets & legal**
14. Original logo files (SVG/AI/EPS) and any brand guidelines?
15. Are the current stock photos licensed? Any real photography we can use?
16. Approved privacy policy, cookie policy, terms, safeguarding policy summary, complaints procedure? I'll mark these pages "awaiting approved content" rather than write legal text.
17. Where does "DACS" in the URLs come from?
