import { routes } from "@/lib/routes";
import type { Flagged, IconName } from "./types";

/** The four core beliefs. Source: home page and /support-programs/ (verified wording, lightly edited). */
export const values: { title: string; body: string; icon: IconName }[] = [
  {
    title: "Respect",
    icon: "hand-heart",
    body: "Every young person has a fundamental right to be respected as an individual, whatever their sex, age, religion, race, culture, sexual orientation or language.",
  },
  {
    title: "Skilled support",
    icon: "shield",
    body: "A dedicated, skilled team working to high professional standards, so each young person has the best possible chance of a good outcome.",
  },
  {
    title: "Independence",
    icon: "key",
    body: "Building the confidence and everyday living skills needed for a smooth move into living independently.",
  },
  {
    title: "Personal development",
    icon: "sprout",
    body: "Advice on wider support needs, and encouragement to take up opportunities for personal growth and achievement.",
  },
];

export type ServiceSummary = {
  slug: "accommodation" | "employment" | "advice";
  title: string;
  href: string;
  summary: string;
  points: string[];
  icon: IconName;
  linkLabel: string;
};

/** Service summaries used on the homepage and in related links. */
export const services: ServiceSummary[] = [
  {
    slug: "accommodation",
    title: "Accommodation",
    href: routes.accommodation,
    icon: "home",
    summary:
      "Quality semi-independent supported accommodation: a safe, nurturing place to settle, with emergency placements where suitable.",
    points: ["Shared accommodation", "Stand-alone units", "24-hour support units"],
    linkLabel: "Explore accommodation",
  },
  {
    slug: "employment",
    title: "Employment & Training",
    href: routes.employment,
    icon: "hammer",
    summary:
      "From literacy and numeracy to practical trade skills, with routes into work through partner organisations.",
    points: ["Basic skills", "Trade skills", "Gardening & horticulture"],
    linkLabel: "Explore employment & training",
  },
  {
    slug: "advice",
    title: "Advice & Support",
    href: routes.advice,
    icon: "heart-handshake",
    summary:
      "One-to-one counselling and a mentoring programme that help young people work through what's holding them back and plan ahead.",
    points: ["1:1 counselling", "Mentoring (ages 16–22)", "Advocacy"],
    linkLabel: "Explore advice & support",
  },
];

/** The journey, built only from verified statements across the old site. */
export const journey: { step: string; title: string; body: string }[] = [
  {
    step: "01",
    title: "A considered move-in",
    body: "Referrals come through the local authority. The young person visits with their social worker, and we talk through their needs together before anything is decided.",
  },
  {
    step: "02",
    title: "A plan that's theirs",
    body: "Each young person has a personalised support plan, built around their goals, and a welcome pack explaining how everything works.",
  },
  {
    step: "03",
    title: "Everyday skills",
    body: "Day-to-day guidance with cooking, laundry, budgeting, education or work, and finding information on health, benefits and housing.",
  },
  {
    step: "04",
    title: "Ready for what's next",
    body: "The aim throughout is confidence: the life skills needed to move into independence and adulthood.",
  },
];

export type PartnerOrganisation = {
  name: string;
  /** What the organisation does, in a few words */
  description: string;
  /** Official website (checked 12 Nov 2026) */
  url: string;
  /**
   * Logo: ONLY add once the organisation has given written permission.
   * Put the file they supply in public/partners/ and fill in src/width/height.
   */
  logo?: { src: string; width: number; height: number };
  note?: string;
};

/**
 * Partners confirmed by KADS (11 Nov 2026). Named organisations can show a logo
 * once permission is given; until then a styled name card is shown.
 */
export const partnerOrganisations: PartnerOrganisation[] = [
  { name: "Spear", description: "Employment programme", url: "https://www.spear.org.uk/" },
  { name: "City Harvest", description: "Food charity", url: "https://cityharvest.org.uk/" },
  { name: "West London Alliance", description: "West London boroughs working together", url: "https://wla.london/" },
  { name: "London Councils", description: "London local government", url: "https://www.londoncouncils.gov.uk/" },
  {
    name: "National Citizen Service",
    description: "Youth programme",
    url: "https://www.gov.uk/government/organisations/national-citizen-service",
    // KADS confirmed on 12 Nov 2026 to keep NCS listed.
  },
];

/** Services KADS works alongside: shown as text only (no logos: NHS, police and council branding is restricted). */
export const partnerServices: Flagged<string[]> = {
  status: "verified",
  // KADS confirmed on 12 Nov 2026 to keep Connexions listed.
  source: "/ (Our Partners)",
  value: [
    "Local colleges",
    "Police",
    "Children's social services",
    "Youth Offending Teams (YOT)",
    "CAMHS",
    "Connexions",
  ],
};
