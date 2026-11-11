import { IconBadge } from "@/components/brand/icon";
import { ArchFrame } from "@/components/art/arch-frame";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { HeroType } from "@/components/sections/page-hero";
import { ContentFlag, Eyebrow, Section } from "@/components/sections/primitives";
import { RelatedServices } from "@/components/sections/related-services";
import { employment } from "@/content/pages";
import { routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Employment & training",
  description:
    "Training and employment support for young people: basic literacy and numeracy, trade skills such as bricklaying, decorating, plumbing and carpentry, horticulture, and routes into work.",
  path: routes.employment,
});

export default function EmploymentPage() {
  const { hero, training, employment: jobs, staff } = employment;
  return (
    <>
      <HeroType
        eyebrow={hero.eyebrow}
        lines={["From basic", "skills to", "a trade."]}
        lead={hero.lead}
        trail={[{ label: "Employment & Training", href: routes.employment }]}
      />

      <Section tone="deep" arch labelledBy="training-title">
        <Reveal className="max-w-2xl">
          <Eyebrow>Training</Eyebrow>
          <h2 id="training-title" className="text-h2">
            Learning that builds on itself.
          </h2>
          <p className="mt-5 text-lead text-slate">Each step lays the ground for the next, from the essentials to skills that lead to work.</p>
        </Reveal>

        {/* Pathway: connected cards with a running line */}
        <ol className="relative mt-14 grid gap-5 lg:grid-cols-3">
          <span aria-hidden="true" className="absolute top-0 bottom-0 left-6 w-px bg-teal-400/40 lg:top-6 lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto" />
          {training.map((t, i) => (
            <Reveal as="li" key={t.title} delay={i * 0.1} className="relative pl-16 lg:pt-16 lg:pl-0">
              <span className="absolute top-0 left-0 grid size-12 place-items-center rounded-full bg-ink font-display font-bold text-paper lg:top-0">
                {i + 1}
              </span>
              <div className="rounded-(--radius-card) bg-white p-7 md:p-8">
                <IconBadge name={t.icon} />
                <h3 className="mt-5 text-h3">
                  {t.title}
                  {"flag" in t && t.flag ? <ContentFlag status={t.flag.status} note={t.flag.note} /> : null}
                </h3>
                <p className="mt-3 text-slate">{t.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section labelledBy="employment-title">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-5">
            <ArchFrame scene="steps" className="mx-auto aspect-[4/5] w-full max-w-sm" />
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <Eyebrow>Employment</Eyebrow>
              <h2 id="employment-title" className="text-h2">
                Routes into work.
              </h2>
            </Reveal>
            <RevealGroup className="mt-10 space-y-4">
              {jobs.map((j) => (
                <RevealItem key={j.title} className="flex gap-5 rounded-(--radius-card) border border-line bg-white p-6 md:p-7">
                  <IconBadge name={j.icon} tone="orange" />
                  <div>
                    <h3 className="text-h3">
                      {j.title}
                      {"flag" in j && j.flag ? <ContentFlag status={j.flag.status} note={j.flag.note} /> : null}
                    </h3>
                    <p className="mt-2 text-slate">{j.body}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Section>

      <Section tone="mist" labelledBy="staff-title" className="py-16 md:py-20 lg:py-24">
        <Reveal className="grid gap-6 lg:grid-cols-12">
          <h2 id="staff-title" className="text-h2 lg:col-span-4">
            {staff.title}
          </h2>
          <p className="text-lead text-slate lg:col-span-7 lg:col-start-6">{staff.body}</p>
        </Reveal>
      </Section>

      <RelatedServices current="employment" />
      <CtaBand />
    </>
  );
}
