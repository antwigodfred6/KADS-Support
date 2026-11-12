import Link from "next/link";
import { ContentFlag, Eyebrow } from "@/components/sections/primitives";
import { site } from "@/content/site";
import { routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

/*
 * DRAFT for KADS to approve (prepared 12 Nov 2026).
 * It describes what this website actually does (checked in the code and on the
 * preview: no cookies, no analytics, fonts served from our own site, contact
 * form sent by email). It deliberately makes no claims we can't check.
 *
 * KADS to confirm before this goes live, then remove `noindex` and add the page to app/sitemap.ts:
 *  - ICO registration number (add it under "Who we are", if registered)
 *  - who handles data protection questions (named person or role)
 *  - how long enquiry emails are kept (the "How long we keep it" wording)
 *  - which Zoho data centre the mailbox uses (EU or US) for "Who we share it with"
 */
export const metadata = pageMetadata({
  title: "Privacy policy",
  description: "How KADS Support collects and uses personal information sent through this website.",
  path: routes.privacy,
  noindex: true,
});

const UPDATED = "12 November 2026";

export default function PrivacyPage() {
  const [office1, office2, office3, office4] = site.registeredOffice.value;
  return (
    <section aria-labelledby="page-title" className="py-16 md:py-24">
      <div className="container-site">
        <Eyebrow>Legal</Eyebrow>
        <h1 id="page-title" className="text-h1">
          Privacy policy
          <ContentFlag
            status="confirm"
            note="Draft for KADS to approve: ICO registration number, data protection contact, how long enquiries are kept, and the Zoho data centre."
          />
        </h1>
        <p className="mt-4 text-slate">Last updated {UPDATED}</p>

        <div className="prose-kads mt-10 text-slate">
          <p>
            This notice explains how {site.legalName.value} (&ldquo;{site.name}&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) uses personal
            information that you give us through this website. It covers the website only. If you use our services, we&rsquo;ll explain how we
            use your information at that point.
          </p>

          <h2 className="text-ink">Who we are</h2>
          <p>
            {site.legalName.value} is the data controller for information collected through this website. We are a company registered in
            England and Wales, company number {site.companyNumber.value}. Our registered office is {office1}, {office2}, {office3} {office4}.
          </p>
          <p>
            For any question about your personal information, email <a href={site.email.href}>{site.email.display}</a> or call{" "}
            <a href={site.phone.href}>{site.phone.display}</a>.
          </p>

          <h2 className="text-ink">What we collect</h2>
          <p>
            <strong className="text-ink">If you use our contact form</strong>, we collect what you type into it: your name, email address,
            phone number (optional), what your enquiry is about, and your message.
          </p>
          <p>
            Please don&rsquo;t include sensitive details about yourself or a young person, such as health information, in the form. If a
            referral needs that kind of detail, we&rsquo;ll agree a secure way to share it when we speak.
          </p>
          <p>
            <strong className="text-ink">If you email or phone us</strong>, we receive your contact details and whatever you choose to tell us.
          </p>
          <p>
            <strong className="text-ink">When you visit the website</strong>, our hosting provider records basic technical information, such
            as your IP address, browser type and the pages requested, to keep the site running and secure. To stop the contact form being
            misused, our website briefly checks how many messages have come from your IP address; it doesn&rsquo;t store that.
          </p>
          <p>
            We don&rsquo;t use analytics or advertising tools, and this website doesn&rsquo;t set cookies. See our{" "}
            <Link href={routes.cookies}>cookie policy</Link>.
          </p>

          <h2 className="text-ink">How we use it, and why</h2>
          <ul>
            <li>To reply to your enquiry and, if you&rsquo;re a professional, to discuss a possible referral.</li>
            <li>To keep the website secure and working properly.</li>
          </ul>
          <p>
            We use contact form details because you agree to it when you tick the box on the form (consent). You can withdraw your consent at
            any time by contacting us. We handle technical information because we have a legitimate interest in running a secure website.
          </p>
          <p>We never sell your information or use it for marketing.</p>

          <h2 className="text-ink">Who we share it with</h2>
          <p>We only share your information with organisations that help us run this website and our email, and only so they can do that:</p>
          <ul>
            <li>
              <strong className="text-ink">Vercel Inc.</strong>, which hosts the website. Vercel is based in the United States.
            </li>
            <li>
              <strong className="text-ink">Zoho</strong>, which provides our email. Messages from the contact form are sent to our Zoho
              mailbox.
            </li>
          </ul>
          <p>
            Where a provider handles information outside the UK, we rely on the safeguards UK data protection law requires, such as the
            UK&rsquo;s approved contract clauses or an adequacy decision.
          </p>
          <p>We may also share information if the law requires it, or to protect someone from harm.</p>

          <h2 className="text-ink">How long we keep it</h2>
          <p>
            We keep enquiries only for as long as we need them to deal with your enquiry and any follow-up, and then delete them. Hosting logs
            are kept by Vercel for a short period and then deleted automatically.
          </p>

          <h2 className="text-ink">Your rights</h2>
          <p>Under UK data protection law you have the right to:</p>
          <ul>
            <li>ask for a copy of the personal information we hold about you</li>
            <li>ask us to correct information that&rsquo;s wrong or incomplete</li>
            <li>ask us to delete your information</li>
            <li>ask us to limit how we use your information, or object to how we use it</li>
            <li>withdraw your consent at any time</li>
          </ul>
          <p>
            To use any of these rights, contact us using the details above. We&rsquo;ll reply within one month. There&rsquo;s usually no charge.
          </p>

          <h2 className="text-ink">Complaints</h2>
          <p>
            If you&rsquo;re unhappy with how we&rsquo;ve handled your information, please tell us first so we can put it right. You can also
            complain to the Information Commissioner&rsquo;s Office (ICO) at{" "}
            <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener noreferrer">
              ico.org.uk/make-a-complaint
              <span className="sr-only"> (opens in a new tab)</span>
            </a>{" "}
            or by calling 0303 123 1113.
          </p>

          <h2 className="text-ink">Changes to this notice</h2>
          <p>If we change how we use personal information, we&rsquo;ll update this page and the date at the top.</p>
        </div>
      </div>
    </section>
  );
}
