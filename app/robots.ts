import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/** Preview deployments must never be indexed: only allow crawling when explicitly enabled. */
export default function robots(): MetadataRoute.Robots {
  const allow = process.env.ALLOW_INDEXING === "true";
  return allow
    ? { rules: { userAgent: "*", allow: "/" }, sitemap: `${site.url}/sitemap.xml`, host: site.url }
    : { rules: { userAgent: "*", disallow: "/" } };
}
