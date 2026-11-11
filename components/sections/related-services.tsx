import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { IconBadge } from "@/components/brand/icon";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { services, type ServiceSummary } from "@/content/shared";
import { Eyebrow, Section } from "./primitives";

/** "Other ways we help": links to the services that aren't the current page. */
export function RelatedServices({ current }: { current: ServiceSummary["slug"] }) {
  const others = services.filter((s) => s.slug !== current);
  return (
    <Section tone="deep" labelledBy="related-title" className="py-16 md:py-20 lg:py-24">
      <Eyebrow>Keep exploring</Eyebrow>
      <h2 id="related-title" className="text-h2">
        Other ways we help.
      </h2>
      <RevealGroup className="mt-10 grid gap-4 md:grid-cols-2">
        {others.map((s) => (
          <RevealItem key={s.slug}>
            <Link
              href={s.href}
              className="group flex h-full items-start gap-5 rounded-(--radius-card) border border-line bg-white p-6 transition-[transform,box-shadow,border-color] duration-300 ease-(--ease-out-soft) hover:-translate-y-1 hover:border-transparent hover:shadow-lift md:p-8"
            >
              <IconBadge name={s.icon} className="group-hover:scale-110" />
              <span className="flex-1">
                <span className="flex items-center justify-between gap-4 font-display text-h3 font-bold">
                  {s.title}
                  <ArrowUpRight aria-hidden="true" className="size-5 shrink-0 text-teal-600 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
                <span className="mt-2 block text-slate">{s.summary}</span>
              </span>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
