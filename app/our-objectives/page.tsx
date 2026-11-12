import { ArchFrame } from "@/components/art/arch-frame";
import { Reveal } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { HeroQuote } from "@/components/sections/page-hero";
import { ArrowLink, Eyebrow, Section } from "@/components/sections/primitives";
import { objectives } from "@/content/pages";
import { routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our objectives: ethos and values",
  description:
    "The ethos and values behind KADS Support: stable accommodation, safety, freedom of expression, identity, privacy, development, community, and involving young people in decisions.",
  path: routes.objectives,
});

export default function ObjectivesPage() {
  const { hero, items, approach } = objectives;
  return (
    <>
      <HeroQuote eyebrow={hero.eyebrow} quote={hero.quote} lead={hero.lead} trail={[{ label: "Our objectives", href: routes.objectives }]} />

      <Section labelledBy="objectives-title">
        <Reveal className="max-w-2xl">
          <Eyebrow>Core objectives</Eyebrow>
          <h2 id="objectives-title" className="text-h2">
            Eight commitments to every young person.
          </h2>
        </Reveal>
        {/* Numbered editorial list: deliberately different from the icon cards used on service pages */}
        <ol className="mt-14 grid gap-x-16 md:grid-cols-2">
          {items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={(i % 2) * 0.08} className="grid grid-cols-[4.5rem_1fr] gap-4 border-t border-line py-8 md:grid-cols-[5.5rem_1fr]">
              <span aria-hidden="true" className="font-display text-[3.25rem] leading-none font-extrabold tracking-[-0.04em] text-teal-200 md:text-[4rem]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-h3">{item.title}</h3>
                <p className="mt-2 text-slate">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section tone="mist" arch labelledBy="approach-title">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <Eyebrow>How our staff help</Eyebrow>
            <h2 id="approach-title" className="text-h2">
              {approach.title}
            </h2>
            <div className="mt-6 space-y-4 text-lead text-slate">
              {approach.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-x-8">
              <ArrowLink href={routes.about}>About us</ArrowLink>
              <ArrowLink href={routes.accommodation}>Our accommodation</ArrowLink>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.1}>
            <ArchFrame scene="house" image={approach.image} sizes="(min-width: 1024px) 35vw, 90vw" className="mx-auto aspect-[4/5] w-full max-w-sm" />
          </Reveal>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
