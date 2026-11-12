import Link from "next/link";
import { Eyebrow } from "@/components/sections/primitives";
import { site } from "@/content/site";
import { routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

/*
 * Approved by KADS on 12 Nov 2026.
 * Checked on the preview on 12 Nov 2026: no page sets a cookie, nothing is saved
 * in browser storage, and no third-party scripts or fonts are loaded.
 * If analytics or any embed (maps, video, social) is ever added, this page must
 * be updated and a consent banner added BEFORE it goes live.
 */
export const metadata = pageMetadata({
  title: "Cookie policy",
  description: "How the KADS Support website uses cookies: it doesn't set any.",
  path: routes.cookies,
});

const UPDATED = "12 November 2026";

export default function CookiesPage() {
  return (
    <section aria-labelledby="page-title" className="py-16 md:py-24">
      <div className="container-site">
        <Eyebrow>Legal</Eyebrow>
        <h1 id="page-title" className="text-h1">
          Cookie policy
        </h1>
        <p className="mt-4 text-slate">Last updated {UPDATED}</p>

        <div className="prose-kads mt-10 text-slate">
          <p className="text-lead text-ink">This website doesn&rsquo;t use cookies.</p>
          <p>
            Cookies are small files that websites save on your device, often to remember you or to track what you do. We&rsquo;ve built this
            website so it doesn&rsquo;t need them. That&rsquo;s why you won&rsquo;t see a cookie banner.
          </p>

          <h2 className="text-ink">What this means</h2>
          <ul>
            <li>We don&rsquo;t use analytics tools to track your visit.</li>
            <li>We don&rsquo;t use advertising or social media tracking.</li>
            <li>We don&rsquo;t save anything else on your device, such as in your browser&rsquo;s storage.</li>
            <li>Our fonts and images come from our own website, not from other companies.</li>
          </ul>
          <p>
            Our hosting provider keeps basic technical records of visits to keep the site secure. This doesn&rsquo;t involve cookies. Our{" "}
            <Link href={routes.privacy}>privacy policy</Link> explains more.
          </p>

          <h2 className="text-ink">Links to other websites</h2>
          <p>
            Some pages link to other organisations&rsquo; websites, such as our partners. Those websites may use cookies. Their own cookie
            policies explain how.
          </p>

          <h2 className="text-ink">Managing cookies</h2>
          <p>
            You can block or delete cookies in your browser settings at any time. This won&rsquo;t affect how this website works, because it
            doesn&rsquo;t use them.
          </p>

          <h2 className="text-ink">If this changes</h2>
          <p>
            If we ever add a feature that uses cookies, we&rsquo;ll update this page first. If those cookies aren&rsquo;t essential, we&rsquo;ll
            ask your permission before setting them.
          </p>

          <h2 className="text-ink">Questions</h2>
          <p>
            Email <a href={site.email.href}>{site.email.display}</a> or call <a href={site.phone.href}>{site.phone.display}</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
