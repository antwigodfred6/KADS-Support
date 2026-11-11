import Link from "next/link";
import { AlertCircle, MapPin, Phone, ShieldCheck } from "lucide-react";
import { ArchFrame } from "@/components/art/arch-frame";
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
  const { hero, types, features, homes, emergency } = accommodation;
  return (
    <>
      <HeroPanel eyebrow={hero.eyebrow} title={hero.title} lead={hero.lead} trail={[{ label: "Accommodation", href: routes.accommodation }]} scene="doorKey" image={hero.image}>
        <Button asChild variant="accent">
          <Link href={routes.referrals}>How to refer</Link>
        </Button>
      </HeroPanel>

      <Section labelledBy="types-title" className="pt-4 md:pt-8 lg:pt-8">
        <Reveal className="max-w-2xl">
          <h2 id="types-title" className="text-h2">
            The accommodation we offer.
          </h2>
        </Reveal>
        <RevealGroup className="mt-10 grid gap-5 md:grid-cols-3">
          {types.map((t) => (
            <RevealItem key={t.title} className="group flex h-full flex-col overflow-hidden rounded-(--radius-card) border border-line bg-white">
              <ArchFrame
                image={t.image}
                shape="card"
                sizes="(min-width: 768px) 33vw, 100vw"
                className="aspect-[4/3] w-full rounded-none [&_img]:transition-transform [&_img]:duration-700 [&_img]:ease-(--ease-out-soft) group-hover:[&_img]:scale-[1.03]"
              />
              <div className="flex flex-1 items-start gap-4 p-6">
                <IconBadge name={t.icon} />
                <div>
                  <h3 className="text-h3">
                    {t.title}
                    {"flag" in t && t.flag ? <ContentFlag status={t.flag.status} note={t.flag.note} /> : null}
                  </h3>
                  <p className="mt-2 text-slate">{t.body}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section tone="deep" labelledBy="homes-title" className="py-16 md:py-24 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow>{homes.eyebrow}</Eyebrow>
            <h2 id="homes-title" className="text-h2">
              {homes.title}
            </h2>
            <p className="mt-5 text-lead text-slate">
              {homes.lead}
              <ContentFlag status={homes.lead_flag.status} note={homes.lead_flag.note} />
            </p>
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <RevealGroup className="grid gap-3 sm:grid-cols-2">
              {homes.areas.map((h) => (
                <RevealItem key={h.district} className="flex h-full items-start gap-4 rounded-(--radius-card) border border-line bg-white p-5">
                  <span aria-hidden="true" className="grid size-11 shrink-0 place-items-center rounded-full bg-orange-100 text-orange-700">
                    <MapPin className="size-5" strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-bold">{h.area}</h3>
                    <p className="mt-1 font-display font-semibold text-ink">{h.offer}</p>
                    <p className="mt-1 text-[0.95rem] text-slate">{h.council}</p>
                    <p className="mt-1 text-sm font-semibold tracking-wide text-teal-600 tabular-nums">{h.district}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
            <Reveal delay={0.1} className="mt-4 flex items-start gap-3 rounded-(--radius-card) bg-mist p-5 text-[0.95rem] text-ink">
              <ShieldCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-teal-600" strokeWidth={1.75} />
              <p>
                {homes.privacy}{" "}
                <Link href={routes.referrals} className="font-semibold text-teal-600 underline underline-offset-4">
                  How referrals work
                </Link>
              </p>
            </Reveal>
          </div>
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
                "flex flex-col rounded-(--radius-card) p-7 md:p-8",
                i === 0 && "bg-navy text-paper md:col-span-3 md:row-span-2",
                i === 1 && "bg-white md:col-span-3",
                i === 2 && "bg-white md:col-span-3",
                i === 3 && "bg-orange-100 md:col-span-2",
                i === 4 && "bg-white md:col-span-2",
                i === 5 && "bg-white md:col-span-2"
              )}
            >
              {"image" in f && f.image ? (
                <ArchFrame
                  image={f.image}
                  shape="card"
                  sizes={i === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 100vw"}
                  className={cn("-mx-2 -mt-2 mb-6 aspect-[4/3] md:-mx-3 md:-mt-3", i === 0 ? "md:aspect-auto md:min-h-72 md:flex-1" : "md:aspect-[16/9]")}
                />
              ) : null}
              <IconBadge name={f.icon} tone={i === 0 ? "dark" : i === 3 ? "orange" : "mist"} />
              <h3 className={cn("mt-6 text-h3", i === 0 && "text-paper lg:text-h2")}>
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
