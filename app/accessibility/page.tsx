import { Eyebrow } from "@/components/sections/primitives";
import { ContentFlag } from "@/components/sections/primitives";
import { site } from "@/content/site";
import { routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

// DRAFT FOR CLIENT APPROVAL: describes the website only. noindex until approved.
export const metadata = pageMetadata({
  title: "Accessibility statement",
  description: "Accessibility of the KADS Support website and how to get information in another format.",
  path: routes.accessibility,
  noindex: true,
});

export default function AccessibilityPage() {
  return (
    <section aria-labelledby="page-title" className="py-16 md:py-24">
      <div className="container-site">
        <Eyebrow>Accessibility</Eyebrow>
        <h1 id="page-title" className="text-h1">
          Accessibility statement
          <ContentFlag status="placeholder" note="Draft written for the new site. Client to approve, and add a date of last review." />
        </h1>
        <div className="prose-kads mt-10 text-slate">
          <p>
            We want everyone who visits the {site.name} website to be able to find information and contact us, whatever device or
            assistive technology they use.
          </p>
          <h2 className="text-ink">How we&rsquo;ve built this website</h2>
          <p>This website has been designed to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA. For example:</p>
          <ul>
            <li>you can zoom in up to 400% without content being cut off</li>
            <li>you can navigate using only a keyboard, with a clearly visible focus indicator</li>
            <li>text and buttons meet colour contrast requirements</li>
            <li>animations are reduced if you have turned on &ldquo;reduce motion&rdquo; on your device</li>
            <li>form fields have labels and clear error messages</li>
            <li>phone numbers and email addresses are tappable links</li>
          </ul>
          <h2 className="text-ink">Getting information in another format</h2>
          <p>
            If you need information from this website in a different format, or find something difficult to use, please call{" "}
            <a href={site.phone.href}>{site.phone.display}</a> or email <a href={site.email.href}>{site.email.display}</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
