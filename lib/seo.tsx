import type { Metadata } from "next";
import { site } from "@/content/site";
import type { ContentStatus } from "@/content/types";

/** Page-level metadata with canonical URL and Open Graph. */
export function pageMetadata({
  title,
  description,
  path,
  noindex = false,
}: {
  title?: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  return {
    // Omit `title` entirely when not given, so the layout's default title applies
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_GB",
      siteName: site.name,
      url: path,
      title: title ? `${title} | ${site.name}` : site.name,
      description,
    },
    twitter: { card: "summary_large_image" },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}

/**
 * Organization structured data, using verified facts only
 * (name, URL, contact details, registered office). Legal name is included
 * only once the client confirms it.
 */
export function organizationJsonLd() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: `${site.url}/icon.svg`,
    description: site.description,
    telephone: "+44 20 3657 5651",
    email: site.email.display,
    address: {
      "@type": "PostalAddress",
      streetAddress: "The Mille, 1000 Great West Road",
      addressLocality: "Brentford",
      postalCode: "TW8 9DW",
      addressCountry: "GB",
    },
    identifier: {
      "@type": "PropertyValue",
      propertyID: "Companies House company number",
      value: site.companyNumber.value,
    },
  };
  const legalNameStatus = site.legalName.status as ContentStatus;
  if (legalNameStatus === "verified") data.legalName = site.legalName.value;
  return data;
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so the JSON can't break out of the script tag
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
