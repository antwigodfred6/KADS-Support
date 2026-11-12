import { Mail, Phone } from "lucide-react";
import { IconBadge } from "@/components/brand/icon";
import { Reveal } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { HeroSplit } from "@/components/sections/page-hero";
import { Eyebrow, Section } from "@/components/sections/primitives";
import { Button } from "@/components/ui/button";
import { referrals } from "@/content/pages";
import { site } from "@/content/site";
import { routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { TextReveal } from "@/components/motion/text-reveal";

export const metadata = pageMetadata({
  title: "Making a referral",
  description:
    "How local authority professionals refer a young person to KADS Support: what to send, the visit and needs meeting, and what happens when a young person moves in.",
  path: routes.referrals,
});

export default function ReferralsPage() {
  const { hero, steps } = referrals;
  return (
    <>
      <HeroSplit eyebrow={hero.eyebrow} title={hero.title} lead={hero.lead} trail={[{ label: "Referrals", href: routes.referrals }]} scene="path">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button asChild size="lg">
            <a href={site.phone.href}>
              <Phone aria-hidden="true" />
              Call {site.phone.display}
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href={site.email.href}>
              <Mail aria-hidden="true" />
              Email us
            </a>
          </Button>
        </div>
      </HeroSplit>

      <Section tone="mist" arch labelledBy="steps-title">
        <Reveal className="max-w-2xl">
          <Eyebrow>The process</Eyebrow>
          <h2 id="steps-title" className="text-h2">
            <TextReveal text="Four steps from first call to moving in." />
          </h2>
        </Reveal>
        <ol className="mt-14 space-y-4">
          {steps.map((s, i) => (
            <Reveal
              as="li"
              key={s.title}
              delay={i * 0.06}
              className="grid gap-5 rounded-(--radius-card) bg-white p-6 sm:grid-cols-[auto_1fr] sm:items-start md:grid-cols-[5rem_auto_1fr] md:p-8"
            >
              <span aria-hidden="true" className="hidden font-display text-5xl font-extrabold tracking-[-0.04em] text-teal-200 md:block">
                {i + 1}
              </span>
              <IconBadge name={s.icon} tone={i === steps.length - 1 ? "orange" : "mist"} />
              <div>
                <h3 className="text-h3">
                  <span className="sr-only">Step {i + 1}: </span>
                  {s.title}
                </h3>
                <p className="mt-2 max-w-3xl text-slate">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      <CtaBand title="Ready to discuss a referral?" body="Call or email our team. We'll talk through the young person's needs and whether we're the right fit." />
    </>
  );
}
