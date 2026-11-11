# KADS Support: Design Plan

Status: **approved 11 Nov 2026 and implemented.** Imagery: on-brand SVG illustrations stand in for photography until licensed images are supplied. Based on `AUDIT.md` (11 Nov 2026).

## 1. Who the site is for

Ranked by how often they decide a placement:

1. **Referring professionals**: local-authority social workers, leaving-care teams, YOT and placement officers. They need to know quickly: who you take, where, what support, how to refer, and how fast. They often read on a phone between visits.
2. **Young people (16+)** who have been referred or are thinking about moving in. They need to feel the place is safe, calm, respectful and somewhere they'd want to live. Plain language, no jargon.
3. **Partners & funders**: employers, colleges, councils. They need credibility, values and a contact.
4. **Prospective staff** (later, if the client wants a careers section).

**Design consequence:** every page gives professionals a clear route to *Make a referral* or *Call us*, while the tone and imagery speak warmly to young people.

## 2. Positioning & tone

**Idea: "A steady place to grow from."**
The current site's own message is a personalised plan → confidence → life skills → independence. The new site tells that as a calm, grown-up journey, not a charity appeal and not a corporate brochure.

Tone of voice:
- Warm, direct, respectful. Speak *about* young people with dignity ("young people we support", never "service users" in headlines).
- Short sentences, UK spelling, reading age around 12 for young-people-facing copy.
- **No unverifiable promises** ("we guarantee", "transform lives", outcome statistics). We describe what we *do*, not results we can't evidence.
- Rewrite the existing copy for clarity, but keep every factual claim traceable to the current site or to client confirmation (see AUDIT §12).

## 3. Visual identity

### Colour: built from the existing logo, not invented

| Token | Hex | Use | Contrast |
|---|---|---|---|
| `ink` (deep navy) | `#0E2A3D` | Headings, body text, dark sections, footer | 13.5:1 on paper |
| `navy` (logo navy) | `#0B4260` | Secondary dark surface, links on paper | 9.75:1 on paper |
| `teal-600` | `#1C6F85` | Links, icons, focus ring on light | 5.2:1 on paper (AA) |
| `teal-400` (logo teal) | `#278CA5` | Decorative only: shapes, illustration, large display | 3.9:1, **not for body text** |
| `orange` (logo orange) | `#EA924A` | Accent: primary CTA on navy, highlights, the "warm" signal | 6.1:1 on ink; **never as text on white** |
| `orange-700` | `#A85A1C` | Orange text on light backgrounds when needed | 4.6:1 on paper |
| `paper` (warm off-white) | `#F7F4EE` | Main background, replacing harsh white | (none) |
| `mist` | `#E3EEF1` | Soft teal tint for alternating sections, cards | ink 12.5:1 |
| `slate` | `#3D4F5C` | Secondary text | 7.7:1 on paper |

Ratio of use: mostly **paper + ink**, teal as the quiet supporting colour, orange used sparingly for "do this" moments. No gradients except very subtle tonal ones on dark sections. No glassmorphism.

### Typography
- **Headings:** *Plus Jakarta Sans* (600–800). Friendly, rounded geometry that echoes the logo's soft figures, and it holds up at very large sizes. Tight tracking on display sizes.
- **Body & UI:** *Inter* (400/500/600), 17–18px base, line-height 1.6, max line length ~68ch.
- **Editorial accent (optional, recommended):** *Fraunces* italic, used *only* for pull quotes and the occasional emphasised word in a headline. It replaces the Caveat handwriting font with something warmer and more grown-up. One weight, subset.
- Loaded with `next/font` (self-hosted, subset, `display: swap`, variable fonts). Three families at most; no unused weights.

Type scale (fluid with `clamp`): Display 56–88px · H1 44–64 · H2 32–44 · H3 22–26 · Body 17–18 · Small 14.

### Shape, space & texture
- **Radius:** 14px cards, 10px inputs, full-pill buttons. Matches the logo's rounded heads without looking bubbly.
- **The "three figures" motif:** the logo's three overlapping rounded shapes become a recurring graphic device: a section divider, image masks (photos cropped into the rounded "figure" arch shape), and a small mark next to section eyebrows. This is what makes the site feel *KADS* and not a template.
- **Section transitions:** sections are not separated by Divi-style diagonal slants. Instead, colour blocks step on an arched top edge (from the figure shape) or simply change background with generous space. Each page uses 2–3 transitions at most.
- **Spacing:** 8px base grid; section padding 96–160px desktop, 64–96px mobile. A 12-column grid with deliberately asymmetric editorial layouts (e.g. heading on 5 columns, body offset on 6).
- **Shadows:** almost none. Depth comes from colour blocks and overlap, with one soft shadow token for lifted cards on hover.

### Imagery
- **No reuse of the current stock** until its licence is confirmed.
- Build with **properly licensed placeholders** (Unsplash/Pexels licence, credited in `content/image-credits.ts`), chosen to be **non-identifying or clearly adult models**: hands cooking, keys in a door, a tidy bedroom, a notebook and laptop, a garden plot, a bike, tools on a workbench. This avoids implying real KADS residents and fits safeguarding norms.
- Every placeholder is labelled in code (`placeholder: true`) and listed in the QA report so the client can swap in real photography.
- Treatment: warm natural light, a slight paper-tone grade so photos sit with the palette; arch and rounded masks from the logo motif.
- Icons: **Lucide**, 1.75px stroke, sitting in a soft `mist` circle, always paired with text.

### Logo
- Redraw the PNG as a clean **SVG** with two variants: *on-dark* (original colours with white lettering) and *on-light* (lettering in ink). Labelled "traced: awaiting client approval or original artwork".
- Favicon set and OG image generated from the figure mark.

## 4. Layout ideas per page (each page different, one system)

| Page | Hero treatment | Signature section |
|---|---|---|
| **Home** | Split editorial hero: big headline on paper, photo in an arched "figure" mask, three logo shapes overlapping its edge. Primary CTA *Make a referral*, secondary *Call 0203 657 5651* | "Our approach" journey: Arrive → Settle → Build skills → Move on, shown as a horizontal stepped path (vertical on mobile) |
| **Accommodation** | Full-bleed photo (keys/door) with a navy panel overlapping it | "What every young person has": 6 features as an asymmetric bento grid; emergency-placement callout in orange on navy |
| **Employment & Training** | Typographic hero, "From basic skills to a trade" with the words set on a stepped baseline | Pathway: Basic skills → Trade skills → Horticulture → Employment, as connected cards |
| **Advice & Support** | Soft `mist` hero, calmer and quieter on purpose | Counselling (topics as a tag cloud, not a bullet wall) + Mentoring as a numbered 3-stage timeline |
| **Our Objectives** | Large Fraunces pull-quote hero ("a sense of home") | 8 objectives as a numbered editorial list in two columns with large numerals, not icon cards (avoids repeating the services pattern) |
| **About us** | Portrait-style layout: who we are, plus a manager section (only if approved) | Referral & admissions as a clear 4-step process with what to send |
| **Contact** | Split: contact details and helplines on navy, form on paper | Enquiry-type selector that changes guidance (referral vs general vs partnership) |

## 5. Motion (Motion for React)

Principles: **quick, quiet, meaningful.** Motion supports reading order; it never hides content.
- **Content is never invisible by default.** Reveals start at `opacity: 0.001 → 1` with an 8–16px rise, 0.5s, triggered `once` when 15% in view. Server-rendered HTML is fully visible if JS fails. (This directly fixes the current site's blank-screen bug.)
- Hero: staggered headline lines (60ms), image mask "opens" upward from the arch shape (clip-path), figures drift in from slightly offset.
- Header: transparent on paper → solid with a hairline border and slightly reduced height after scrolling 24px.
- Cards: 2–4px lift, icon nudges, arrow slides 4px. Pressed state scales to 0.98.
- Page transitions: a brief cross-fade (≤200ms) through `template.tsx`, not slide-ins.
- Mobile drawer: slides from the right with a staggered link list; focus is trapped, and Esc closes it.
- `prefers-reduced-motion`: all transforms off, opacity fades only (or none), no parallax.
- **No Three.js.** Nothing here gains from 3D, and it would hurt mobile performance for a mostly mobile audience.

## 6. Components (to build)

`SiteHeader` · `MobileNav` (shadcn Sheet) · `SiteFooter` · `Button` (primary/secondary/ghost/link, shadcn) · `Section` (tone: paper/mist/navy) · `Eyebrow` (with figure mark) · `PageHero` (variants: split, fullbleed, typographic, quote, soft) · `ArchImage` · `ServiceCard` · `FeatureGrid` (bento) · `ProcessSteps` (horizontal/vertical) · `NumberedList` · `PullQuote` · `CtaBand` · `ContactForm` · `HelplineList` · `Reveal` (motion wrapper with reduced-motion handling) · `PlaceholderNotice` (dev-only badge on unapproved content/images)

## 7. Accessibility commitments (WCAG 2.2 AA)

Zoom allowed · skip link · landmarks · one H1 per page with a logical heading order · visible 3px focus ring (teal on light, orange on dark) · 44×44 targets · labelled form fields with inline and summary errors · `tel:`/`mailto:` links · descriptive link text ("Read about accommodation", not "Learn more") · alt text written per image · contrast tokens above · reduced motion · no information conveyed by colour alone.

## 8. Content model

All copy in `content/*.ts` as typed objects (site details, navigation, services, objectives, helplines, FAQs, partners). Every item that needs client confirmation carries `status: "verified" | "confirm" | "placeholder"`, so it is easy to find and swap, and a build-time report lists every unconfirmed item. No CMS or Supabase. Content changes rarely, and a typed content layer is cheaper and safer. We can revisit if the client wants to edit it themselves.

## 9. What I will not do without approval

- State Ofsted registration, ratings, accreditations, partner names, staff names/qualifications or "24/7" unless confirmed (until then each is shown in neutral wording or marked as a placeholder in development)
- Write privacy, cookie, terms, safeguarding or complaints content. These pages get a clear "awaiting approved content" state.
- Use the current stock photos
- Connect the form to any mailbox or service
