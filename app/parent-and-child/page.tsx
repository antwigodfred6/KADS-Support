import Image from "next/image";
import { IconBadge } from "@/components/brand/icon";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { HeroSoft } from "@/components/sections/page-hero";
import { ArrowLink, ContentFlag, Eyebrow, Section } from "@/components/sections/primitives";
import { RelatedServices } from "@/components/sections/related-services";
import { parentChild } from "@/content/pages";
import { routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Parent & child supported accommodation",
  description:
    "Supported accommodation in Hounslow where a young parent can live with their child, with a personalised support plan and help with skills for family life.",
  path: routes.parentChild,
});

export default function ParentChildPage() {
  const { hero, offer, where } = parentChild;
  return (
    <>
      <HeroSoft eyebrow={hero.eyebrow} title={hero.title} lead={hero.lead} trail={[{ label: "Parent & Child", href: routes.parentChild }]} scene="house" image={hero.image}>
        <div className="flex flex-wrap gap-x-8">
          <ArrowLink href="#offer">What we offer</ArrowLink>
          <ArrowLink href={routes.referrals}>Make a referral</ArrowLink>
        </div>
      </HeroSoft>

      <Section id="offer" labelledBy="offer-title">
        <Reveal className="max-w-2xl">
          <Eyebrow>{offer.eyebrow}</Eyebrow>
          <h2 id="offer-title" className="text-h2">
            <TextReveal text={offer.title} />
            <ContentFlag status={offer.flag.status} note={offer.flag.note} />
          </h2>
          <p className="mt-5 text-lead text-slate">{offer.lead}</p>
        </Reveal>
        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2">
          {offer.points.map((p) => (
            <RevealItem key={p.title} className="rounded-(--radius-card) border border-line bg-white p-6 md:p-8">
              <IconBadge name={p.icon} />
              <h3 className="mt-5 font-display text-h3 font-bold">{p.title}</h3>
              <p className="mt-2 text-slate">{p.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section tone="deep" labelledBy="where-title">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-6">
            <Eyebrow>{where.eyebrow}</Eyebrow>
            <h2 id="where-title" className="text-h2">
              <TextReveal text={where.title} />
            </h2>
            <p className="mt-5 text-lead text-slate">{where.body}</p>
          </Reveal>
          <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.1}>
            <p className="rounded-(--radius-card) border-l-4 border-teal-600 bg-white p-5 text-slate">{where.privacy}</p>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              <ArrowLink href={`${routes.accommodation}#homes`}>See all our homes</ArrowLink>
              <ArrowLink href={routes.referrals}>How referrals work</ArrowLink>
            </div>
          </Reveal>
        </div>

        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-3">
          {where.photos.map((ph) => (
            <RevealItem key={ph.src}>
              <a href={ph.src} target="_blank" rel="noopener" className="group block overflow-hidden rounded-(--radius-card) bg-paper">
                <Image
                  src={ph.src}
                  alt={ph.alt}
                  width={ph.width}
                  height={ph.height}
                  sizes="(min-width: 640px) 33vw, 100vw"
                  style={"focus" in ph ? { objectPosition: ph.focus } : undefined}
                  className="aspect-[3/4] w-full object-cover transition-transform duration-700 ease-(--ease-out-soft) group-hover:scale-[1.03]"
                />
                <span className="sr-only"> (view larger photo, opens in a new tab)</span>
              </a>
              <p className="mt-2 text-center text-sm text-slate">{ph.caption}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <RelatedServices current="parentChild" />
      <CtaBand />
    </>
  );
}
