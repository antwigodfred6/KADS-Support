import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { routes } from "@/lib/routes";

// Privacy and cookie policies are drafts awaiting KADS approval:
// they stay noindex and out of the sitemap until approved.
const indexable = [
  { path: routes.home, priority: 1 },
  { path: routes.accommodation, priority: 0.9 },
  { path: routes.employment, priority: 0.8 },
  { path: routes.advice, priority: 0.8 },
  { path: routes.referrals, priority: 0.8 },
  { path: routes.about, priority: 0.7 },
  { path: routes.objectives, priority: 0.6 },
  { path: routes.contact, priority: 0.7 },
  { path: routes.accessibility, priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return indexable.map(({ path, priority }) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority,
  }));
}
