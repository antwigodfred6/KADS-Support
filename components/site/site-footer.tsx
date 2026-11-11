import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { ContentFlag } from "@/components/sections/primitives";
import { footerNav } from "@/content/navigation";
import { helplines } from "@/content/contact";
import { site } from "@/content/site";
import { routes } from "@/lib/routes";

export function SiteFooter() {
  const urgent = helplines.filter((h) => ["Childline", "NHS 111"].includes(h.name));
  return (
    <footer className="on-dark bg-navy-900 text-on-dark-muted">
      <div className="container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:py-20">
        <div>
          <Logo tone="dark" className="h-24" />
          <p className="mt-5 max-w-xs">{site.tagline}.</p>
          <ul className="mt-6 space-y-1">
            <li>
              <a href={site.phone.href} className="inline-flex min-h-11 items-center font-semibold text-paper hover:underline">
                {site.phone.display}
              </a>
            </li>
            <li>
              <a href={site.email.href} className="inline-flex min-h-11 items-center font-semibold text-paper hover:underline">
                {site.email.display}
              </a>
            </li>
          </ul>
        </div>

        <FooterColumn title="Services" links={footerNav.services} />
        <FooterColumn title="Organisation" links={footerNav.organisation} />

        <div>
          <h2 className="font-display text-sm font-semibold tracking-[0.12em] text-paper uppercase">Need help now?</h2>
          <p className="mt-4">
            In an emergency, call{" "}
            <a href="tel:999" className="font-semibold text-paper underline underline-offset-4">
              999
            </a>
            .
          </p>
          <ul className="mt-3 space-y-1">
            {urgent.map((h) => (
              <li key={h.name}>
                {h.name}:{" "}
                <a href={h.href} className="font-semibold text-paper underline underline-offset-4">
                  {h.number}
                </a>
              </li>
            ))}
          </ul>
          <Link href={`${routes.contact}#helplines`} className="mt-3 inline-flex min-h-11 items-center text-paper underline underline-offset-4">
            More helplines
          </Link>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="container-site flex flex-col gap-6 py-8 text-sm lg:flex-row lg:items-start lg:justify-between">
          <p className="max-w-3xl">
            {site.legalName.value}
            <ContentFlag status={site.legalName.status} note={site.legalName.note} /> is registered in England and Wales,
            company number {site.companyNumber.value}. Registered office: {site.registeredOffice.value.join(", ")}.
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-5 gap-y-1">
              {footerNav.legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-flex min-h-11 items-center hover:text-paper hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="font-display text-sm font-semibold tracking-[0.12em] text-paper uppercase">{title}</h2>
      <ul className="mt-4 space-y-1">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="inline-flex min-h-11 items-center transition-colors hover:text-paper">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
