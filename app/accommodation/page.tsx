import Link from "next/link";
import { AlertCircle, Phone } from "lucide-react";
import { IconBadge } from "@/components/brand/icon";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { HeroPanel } from "@/components/sections/page-hero";
import { ContentFlag, Eyebrow, Section } from "@/components/sections/primitives";
import { RelatedServices } from "@/components/sections/related-services";
import { Button } from "@/components/ui/button";
import { accommodation } from "@/content/pages";
import { site } from "@/content/site";
import { routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { cn } from "cn";

export const metadata = pageMetadata({
  title: "Supported accommodation for young people",
  description:
    "Semi-independent supported accommodation for young people aged 16+: shared accommodation, stand-alone units and 24-hour support units, plus emergency placements where suitable.",
  path: routes.accommodation,
});

export default function AccommodationPage() {
  const { hero, types, features, emergency } = accommodation;
  return (
    <>
      <HeroPanel eyebrow={hero.eyebrow} title={hero.title} lead={hero.lead} trail={[{ label: "Accommodation", href: routes.accommodation }]} scene="doorKey">
        <Button asChild variant="accent">
          <Link href={routes.referrals}>How to refer</Link>
        </Button>
      </HeroPanel>

      <Section labelledBy="types-title" className="pt-4 md:pt-8 lg:pt-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-4">
            <h2 id="types-title" className="text-h2">
              The accommodation we offer.
            </h2>
          </Reveal>
          <RevealGroup className="grid gap-4 sm:grid-cols-3 lg:col-span-8">
            {types.map((t) => (
              <RevealItem key={t.title} className="flex items-center gap-4 rounded-(--radius-card) border border-line bg-white p-5">
                <IconBadge name={t.icon} />
                <span className="font-display font-semibold">{t.title}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <Section tone="mist" arch labelledBy="features-title">
        <Reveal className="max-w-2xl">
          <Eyebrow>Living with us</Eyebrow>
          <h2 id="features-title" className="text-h2">
            What every young person has.
          </h2>
        </Reveal>
        {/* Bento grid: varied card sizes so the six features don't read as a template */}
        <RevealGroup className="mt-12 grid gap-4 md:grid-cols-6">
          {features.map((f, i) => (
            <RevealItem
              key={f.title}
              className={cn(
                "rounded-(--radius-card) p-7 md:p-8",
                i === 0 && "bg-navy text-paper md:col-span-3 md:row-span-2",
                i === 1 && "bg-white md:col-span-3",
                i === 2 && "bg-white md:col-span-3",
                i === 3 && "bg-orange-100 md:col-span-2",
                i === 4 && "bg-white md:col-span-2",
                i === 5 && "bg-white md:col-span-2"
              )}
            >
              <IconBadge name={f.icon} tone={i === 0 ? "dark" : i === 3 ? "orange" : "mist"} />
              <h3 className={cn("mt-6 text-h3", i === 0 && "text-paper lg:mt-24 lg:text-h2")}>
                {f.title}
                {"flag" in f && f.flag ? <ContentFlag status={f.flag.status} note={f.flag.note} /> : null}
              </h3>
              <p className={cn("mt-3", i === 0 ? "max-w-md text-lead text-on-dark-muted" : "text-slate")}>{f.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section labelledBy="emergency-title">
        <Reveal className="on-dark relative overflow-hidden rounded-[28px] bg-ink p-8 text-paper md:p-14">
          <div aria-hidden="true" className="absolute -top-24 -right-24 size-72 rounded-full bg-orange/15" />
          <div className="relative grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="inline-flex items-center gap-2 rounded-full bg-orange px-3 py-1 font-display text-sm font-semibold text-ink">
                <AlertCircle aria-hidden="true" className="size-4" />
                Respite and emergencies
              </p>
              <h2 id="emergency-title" className="mt-6 text-h2 text-paper">
                {emergency.title}
              </h2>
              <p className="mt-5 text-lead text-on-dark-muted">{emergency.body}</p>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="font-display font-semibold text-paper">Need an urgent placement?</p>
              <p className="mt-2 text-on-dark-muted">Call our team to discuss suitability.</p>
              <Button asChild variant="accent" size="lg" className="mt-6 w-full">
                <a href={site.phone.href}>
                  <Phone aria-hidden="true" />
                  {site.phone.display}
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>

      <RelatedServices current="accommodation" />
      <CtaBand />
    </>
  );
}
