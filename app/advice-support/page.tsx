import { ArchFrame } from "@/components/art/arch-frame";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { HeroSoft } from "@/components/sections/page-hero";
import { ArrowLink, ContentFlag, Eyebrow, Section } from "@/components/sections/primitives";
import { RelatedServices } from "@/components/sections/related-services";
import { IconBadge } from "@/components/brand/icon";
import { advice } from "@/content/pages";
import { values } from "@/content/shared";
import { routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Advice & support: counselling and mentoring",
  description:
    "Confidential one-to-one counselling and a mentoring programme for young people aged 16 to 22 in London, helping them work through challenges and reach their goals.",
  path: routes.advice,
});

export default function AdvicePage() {
  const { hero, counselling, mentoring } = advice;
  return (
    <>
      <HeroSoft eyebrow={hero.eyebrow} title={hero.title} lead={hero.lead} trail={[{ label: "Advice & Support", href: routes.advice }]} scene="conversation" image={hero.image}>
        <div className="flex flex-wrap gap-x-8">
          <ArrowLink href="#counselling">1:1 counselling</ArrowLink>
          <ArrowLink href="#mentoring">Mentoring programme</ArrowLink>
        </div>
      </HeroSoft>

      <Section id="counselling" labelledBy="counselling-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow>Counselling</Eyebrow>
            <h2 id="counselling-title" className="text-h2">
              {counselling.title}
              <ContentFlag status={counselling.flag.status} note={counselling.flag.note} />
            </h2>
            <p className="mt-5 text-lead text-slate">{counselling.lead}</p>
            <ArchFrame image={counselling.image} shape="rounded" sizes="(min-width: 1024px) 40vw, 100vw" className="mt-8 aspect-[4/3] w-full" />
          </Reveal>
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.1}>
            <p className="font-display font-semibold">{counselling.topicsIntro}</p>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {counselling.topics.map((t, i) => (
                <li
                  key={t}
                  className={
                    i % 3 === 0
                      ? "rounded-full bg-mist px-4 py-2.5 text-ink"
                      : i % 3 === 1
                        ? "rounded-full border border-line bg-white px-4 py-2.5 text-ink"
                        : "rounded-full bg-orange-100 px-4 py-2.5 text-ink"
                  }
                >
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-8 rounded-(--radius-card) border-l-4 border-teal-600 bg-white p-5 text-slate">
              Counselling is confidential and takes place in a safe setting. If you need help urgently, see the{" "}
              <a href={`${routes.contact}#helplines`} className="font-semibold text-teal-600 underline underline-offset-4">
                helplines on our contact page
              </a>
              .
            </p>
          </Reveal>
        </div>
      </Section>

      <Section id="mentoring" tone="ink" labelledBy="mentoring-title">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-7">
            <Eyebrow onDark>Mentoring · ages 16–22</Eyebrow>
            <h2 id="mentoring-title" className="text-h2">
              {mentoring.title}
            </h2>
            <p className="mt-5 text-lead text-on-dark-muted">{mentoring.lead}</p>
            <p className="mt-4 text-on-dark-muted">{mentoring.intro}</p>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={0.1}>
            <ArchFrame image={mentoring.image} shape="arch" sizes="(min-width: 1024px) 35vw, 100vw" className="mx-auto aspect-[4/5] w-full max-w-md lg:aspect-[4/5]" />
          </Reveal>
        </div>
        <ol className="mt-14 grid gap-px overflow-hidden rounded-(--radius-card) bg-paper/15 md:grid-cols-3">
          {mentoring.stages.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.1} className="bg-ink p-8 md:p-10">
              <span className="font-serif text-6xl leading-none text-orange italic">{i + 1}</span>
              <h3 className="mt-6 text-h3">{s.title}</h3>
              <p className="mt-3 text-on-dark-muted">{s.body}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section tone="deep" labelledBy="believe-title">
        <Reveal className="max-w-2xl">
          <Eyebrow>We believe</Eyebrow>
          <h2 id="believe-title" className="text-h2">
            What guides our advice.
          </h2>
        </Reveal>
        <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <RevealItem key={v.title} className="rounded-(--radius-card) bg-white p-6">
              <IconBadge name={v.icon} />
              <h3 className="mt-5 font-display text-lg font-bold">{v.title}</h3>
              <p className="mt-2 text-[0.98rem] text-slate">{v.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <RelatedServices current="advice" />
      <CtaBand />
    </>
  );
}
