import Link from "next/link";
import { LogoMark } from "@/components/brand/logo";
import { Reveal } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { HeroSplit } from "@/components/sections/page-hero";
import { ArrowLink, ContentFlag, Eyebrow, Section } from "@/components/sections/primitives";
import { Button } from "@/components/ui/button";
import { about, referrals } from "@/content/pages";
import { values } from "@/content/shared";
import { site } from "@/content/site";
import { routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About us",
  description:
    "KADS Support is a private provider offering a safe, therapeutic, nurturing and empowering environment for young people aged 16 and over.",
  path: routes.about,
});

export default function AboutPage() {
  const { hero, manager } = about;
  return (
    <>
      <HeroSplit eyebrow={hero.eyebrow} title={hero.title} lead={hero.lead} trail={[{ label: "About us", href: routes.about }]} scene="circle" image={hero.image}>
        <p className="text-slate">
          Supporting young people since {site.established.value}.
          <ContentFlag status={site.established.status} note={site.established.note} />
        </p>
      </HeroSplit>

      <Section tone="mist" arch labelledBy="values-title">
        <Reveal className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>What we stand for</Eyebrow>
            <h2 id="values-title" className="text-h2">
              Four core beliefs.
            </h2>
            <ArrowLink href={routes.objectives} className="mt-6">
              Read our objectives
            </ArrowLink>
          </div>
          <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {values.map((v) => (
              <div key={v.title} className="border-t-2 border-ink pt-5">
                <dt className="font-display text-h3 font-bold">{v.title}</dt>
                <dd className="mt-2 text-slate">{v.body}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Section>

      <Section labelledBy="manager-title">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            {/* No staff photo is used until one is supplied with consent. */}
            <div className="relative grid aspect-square w-full max-w-sm place-items-center overflow-hidden rounded-full bg-paper-deep">
              <LogoMark className="h-1/2" />
            </div>
          </Reveal>
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.1}>
            <Eyebrow>Management</Eyebrow>
            <h2 id="manager-title" className="text-h2">
              Led by experience.
              <ContentFlag status={manager.status} note={manager.note} />
            </h2>
            <p className="mt-6 font-display text-h3 font-bold">
              {manager.value.name}
              <span className="block font-sans text-base font-medium text-slate">{manager.value.role}</span>
            </p>
            <p className="mt-4 text-lead text-slate">{manager.value.body}</p>
          </Reveal>
        </div>
      </Section>

      <Section labelledBy="referrals-title">
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>Referrals &amp; admissions</Eyebrow>
            <h2 id="referrals-title" className="text-h2">
              A smooth, considered move.
            </h2>
            <p className="mt-5 text-lead text-slate">
              We know moving can be unsettling and stressful for a young person, so we aim to keep the transition as smooth as possible.{" "}
              {referrals.hero.lead}
            </p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href={routes.referrals}>See the referral process</Link>
            </Button>
          </div>
        </Reveal>
      </Section>

      <CtaBand />
    </>
  );
}
