import { FileClock, Mail, Phone } from "lucide-react";
import { site } from "@/content/site";
import { Eyebrow } from "./primitives";

/**
 * Honest holding page for legal/organisational content that must be
 * supplied or approved by the client. We never invent policy text.
 * These routes are noindex until real content is added.
 */
export function AwaitingContent({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return (
    <section aria-labelledby="page-title" className="py-16 md:py-24">
      <div className="container-site max-w-3xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 id="page-title" className="text-h1">
          {title}
        </h1>
        <div className="mt-10 rounded-(--radius-card) border border-line bg-white p-8 md:p-10">
          <FileClock aria-hidden="true" className="size-8 text-teal-600" strokeWidth={1.75} />
          <p className="mt-5 text-lead text-ink">This page is being updated.</p>
          <p className="mt-3 text-slate">{intro}</p>
          <ul className="mt-6 space-y-2">
            <li>
              <a href={site.phone.href} className="inline-flex min-h-11 items-center gap-3 font-semibold text-teal-600 underline underline-offset-4">
                <Phone aria-hidden="true" className="size-5" />
                {site.phone.display}
              </a>
            </li>
            <li>
              <a href={site.email.href} className="inline-flex min-h-11 items-center gap-3 font-semibold text-teal-600 underline underline-offset-4">
                <Mail aria-hidden="true" className="size-5" />
                {site.email.display}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
