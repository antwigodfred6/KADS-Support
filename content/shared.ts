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

export const partners: Flagged<string[]> = {
  status: "verified",
  note: "From the old homepage. Confirm which are current, formal partnerships and approved to be named.",
  source: "/ (Our Partners)",
  value: [
    "Spear (employment programme)",
    "City Harvest",
    "West London Alliance",
    "London Councils",
    "Local colleges",
    "Police",
    "Children's social services",
    "Youth Offending Teams (YOT)",
    "CAMHS",
    "National Citizen Service",
    "Connexions",
  ],
};
