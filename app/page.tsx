import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Phone } from "lucide-react";
import { ArchFrame } from "@/components/art/arch-frame";
import { DriftShapes } from "@/components/art/drift-shapes";
import { Marquee } from "@/components/motion/marquee";
import { TextReveal } from "@/components/motion/text-reveal";
import { IconBadge } from "@/components/brand/icon";
import { LogoMark } from "@/components/brand/logo";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { ArrowLink, ContentFlag, Eyebrow, Section } from "@/components/sections/primitives";
import { Button } from "@/components/ui/button";
import { home } from "@/content/pages";
import { journey, partnerOrganisations, partnerServices, services, values } from "@/content/shared";
import { site } from "@/content/site";
import { routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { cn } from "cn";

export const metadata = pageMetadata({
  description: site.description,
  path: routes.home,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <Services />
      <Marquee
        className="border-y border-line bg-paper"
        items={["A safe home", "Training", "Mentoring", "Respect", "Independence", "Counselling", "Personal development", "Skilled support"]}
      />
      <Approach />
      <Independence />
      <Partners />
      <CtaBand title={home.cta.title} body={home.cta.body} />
    </>
  );
}

function Hero() {
  const { hero } = home;
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pt-6 pb-20 md:pt-10 md:pb-28">
      <div aria-hidden="true" className="dots absolute inset-x-0 top-0 h-[70%] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <DriftShapes />
      <div className="container-site relative grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          <div className="animate-rise">
            <Eyebrow>
              {hero.eyebrow}
              <ContentFlag status={site.ageRange.status} note="Age range 16+ from the old About page." />
            </Eyebrow>
          </div>
          <h1 id="hero-title" className="animate-rise text-display [animation-delay:80ms]">
            A steady place to find{" "}
            <span className="relative whitespace-nowrap font-serif font-normal text-navy italic">
              your own path.
              <svg aria-hidden="true" viewBox="0 0 300 14" preserveAspectRatio="none" className="absolute -bottom-1 left-0 h-3 w-full text-orange">
                <path d="M2 10 C 70 2, 160 2, 298 8" pathLength={1} className="draw-path" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="animate-rise mt-7 max-w-xl text-lead text-slate [animation-delay:160ms]">{hero.lead}</p>
          <div className="animate-rise mt-10 flex flex-col gap-3 sm:flex-row [animation-delay:240ms]">
            <Button asChild size="lg">
              <Link href={routes.referrals}>
                Make a referral
                <ArrowRight aria-hidden="true" className="transition-transform group-hover/button:translate-x-0.5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={site.phone.href}>
                <Phone aria-hidden="true" />
                Call {site.phone.display}
              </a>
            </Button>
          </div>
          <ul className="animate-rise mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem] text-slate [animation-delay:320ms]">
            {["Semi-independent supported accommodation", "Training and employment", "Counselling and mentoring"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Check aria-hidden="true" className="size-4 text-teal-600" strokeWidth={2.5} />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <ArchFrame scene="doorway" image={home.hero.image} sizes="(min-width: 1024px) 40vw, 90vw" animate priority className="aspect-[4/5] w-full" />
          <div aria-hidden="true" className="animate-rise absolute -bottom-6 -left-4 [animation-delay:600ms] sm:-left-8">
            <div className="float flex items-center gap-3 rounded-full bg-white py-3 pr-5 pl-3 shadow-lift">
              <LogoMark className="h-9" />
              <span className="font-display text-sm font-semibold text-ink">A personalised plan for every young person</span>
              <span className="pulse-ring ml-1 size-2.5 shrink-0 rounded-full bg-orange" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Intro() {
  const { intro } = home;
  return (
    <Section tone="mist" arch labelledBy="intro-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <Eyebrow>{intro.eyebrow}</Eyebrow>
          <h2 id="intro-title" className="text-h2">
            {intro.title}
          </h2>
          <div className="mt-6 space-y-4 text-lead text-slate">
            {intro.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-x-8">
            <ArrowLink href={routes.about}>About KADS Support</ArrowLink>
            <ArrowLink href={routes.objectives}>Our objectives</ArrowLink>
          </div>
        </Reveal>

        <div className="lg:col-span-6 lg:col-start-7">
          <h3 className="sr-only">Our four core beliefs</h3>
          <RevealGroup className="grid gap-px overflow-hidden rounded-(--radius-card) bg-teal-200/60 sm:grid-cols-2">
            {values.map((v) => (
              <RevealItem key={v.title} className="bg-mist p-7 md:p-8">
                <IconBadge name={v.icon} tone="orange" />
                <p className="mt-5 font-display text-h3 font-bold text-ink">{v.title}</p>
                <p className="mt-2 text-slate">{v.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </Section>
  );
}

function Services() {
  return (
    <Section labelledBy="services-title">
      <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <Eyebrow>What we offer</Eyebrow>
          <h2 id="services-title" className="text-h2">
            <TextReveal text="Support that fits around each young person." />
          </h2>
        </div>
        <p className="max-w-sm text-slate">Three connected services, so a young person can find a home, learn and get guidance in one place.</p>
      </Reveal>

      <RevealGroup className="mt-12 grid gap-5 lg:grid-cols-2 lg:grid-rows-[1fr_1fr]">
        {services.map((s, i) => {
          const featured = i === 0;
          return (
            <RevealItem key={s.slug} className={cn(featured && "lg:row-span-2")}>
              <Link
                href={s.href}
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden rounded-(--radius-card) p-7 transition-[transform,box-shadow] duration-300 ease-(--ease-out-soft) hover:-translate-y-1 hover:shadow-lift md:p-9",
                  featured ? "on-dark bg-navy text-paper" : "border border-line bg-white"
                )}
              >
                {featured && (
                  <ArchFrame scene="doorKey" image={home.serviceImage} sizes="(min-width: 1024px) 40vw, 90vw" className="mb-8 aspect-[5/4] w-full max-w-md transition-transform duration-500 group-hover:scale-[1.02] lg:aspect-[16/11]" />
                )}
                {!featured && s.slug !== "accommodation" && (
                  <ArchFrame
                    image={home.serviceCardImages[s.slug]}
                    shape="card"
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="-mx-7 -mt-7 mb-6 aspect-[16/7] rounded-none md:-mx-9 md:-mt-9 [&_img]:transition-transform [&_img]:duration-700 [&_img]:ease-(--ease-out-soft) group-hover:[&_img]:scale-[1.03]"
                  />
                )}
                <span className={cn("font-display text-sm font-semibold tracking-[0.14em]", featured ? "text-orange" : "text-teal-600")}>
                  0{i + 1}
                </span>
                <span className="mt-3 flex items-start justify-between gap-4">
                  <span className={cn("font-display text-h3 font-bold", featured ? "text-paper" : "text-ink")}>{s.title}</span>
                  <IconBadge name={s.icon} tone={featured ? "dark" : "mist"} className="group-hover:scale-110" />
                </span>
                <span className={cn("mt-3 block", featured ? "text-on-dark-muted" : "text-slate")}>{s.summary}</span>
                <span className="mt-6 flex flex-wrap gap-2">
                  {s.points.map((p) => (
                    <span
                      key={p}
                      className={cn("rounded-full px-3 py-1 text-sm", featured ? "bg-paper/10 text-paper" : "bg-paper-deep text-ink")}
                    >
                      {p}
                    </span>
                  ))}
                </span>
                <span
                  className={cn(
                    "mt-auto inline-flex items-center gap-2 pt-8 font-display font-semibold",
                    featured ? "text-paper" : "text-teal-600"
                  )}
                >
                  {s.linkLabel}
                  <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}

function Approach() {
  return (
    <Section tone="ink" labelledBy="approach-title" className="overflow-hidden">
      <div aria-hidden="true" className="dots-dark absolute inset-0" />
      <div className="relative">
        <Reveal className="max-w-2xl">
          <Eyebrow onDark>Our approach</Eyebrow>
          <h2 id="approach-title" className="text-h2">
            <TextReveal text="From the first visit to the next chapter." />
          </h2>
          <p className="mt-5 text-lead text-on-dark-muted">
            Moving can be unsettling. We keep each step clear and calm, and the young person is involved in decisions throughout.
          </p>
        </Reveal>

        <ol className="relative mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <span aria-hidden="true" className="grow-x absolute top-6 right-[12%] left-6 hidden h-0.5 bg-gradient-to-r from-paper/30 via-teal-400 to-orange lg:block" />
          {journey.map((j, i) => (
            <Reveal as="li" key={j.step} delay={i * 0.1} className="relative">
              <span
                className={cn(
                  "relative grid size-12 place-items-center rounded-full font-display font-bold",
                  i === journey.length - 1 ? "pulse-ring bg-orange text-ink" : "bg-navy text-paper ring-1 ring-paper/25"
                )}
              >
                {j.step}
              </span>
              <h3 className="mt-6 text-h3">{j.title}</h3>
              <p className="mt-3 text-on-dark-muted">{j.body}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-14">
          <ArrowLink href={routes.referrals} onDark>
            How referrals work
          </ArrowLink>
        </Reveal>
      </div>
    </Section>
  );
}

function Independence() {
  const skills = ["Cooking and nutrition", "Laundry and looking after a home", "Budgeting", "Education, training or work", "Health, benefits and housing"];
  return (
    <Section labelledBy="independence-title">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="order-2 lg:order-1">
          <ArchFrame scene="steps" image={home.independenceImage} sizes="(min-width: 1024px) 45vw, 90vw" shape="rounded" className="aspect-[5/4] w-full lg:aspect-[4/5]" />
        </Reveal>
        <Reveal className="order-1 lg:order-2">
          <Eyebrow>Building independence</Eyebrow>
          <h2 id="independence-title" className="text-h2">
            <TextReveal text="Confidence, one everyday skill at a time." />
          </h2>
          <p className="mt-6 text-lead text-slate">
            Independence is built in ordinary moments. Staff work alongside each young person, and with their wider professional team, on
            the practical skills that make living alone feel possible.
          </p>
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {skills.map((s) => (
              <li key={s} className="flex items-center gap-4 py-4 font-medium">
                <span aria-hidden="true" className="size-2.5 shrink-0 rounded-full bg-orange" />
                {s}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-slate">
            Our team is available around the clock.
            <ContentFlag status={site.staffed247.status} note={site.staffed247.note} />
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

function Partners() {
  const { partners: copy } = home;
  return (
    <Section tone="deep" labelledBy="partners-title" className="py-16 md:py-24">
      <div className="grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h2 id="partners-title" className="text-h2">
            {copy.title}
          </h2>
          <p className="mt-5 text-slate">{copy.body}</p>
        </Reveal>
        <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.1}>
          <h3 className="font-display text-lg font-semibold text-ink">Organisations we work alongside</h3>
          <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {partnerOrganisations.map((org) => (
              <li key={org.name}>
                <a
                  href={org.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full min-h-28 flex-col justify-between rounded-(--radius-card) border border-line bg-white p-4 transition-[border-color,box-shadow,transform] duration-300 ease-(--ease-out-soft) hover:-translate-y-0.5 hover:border-transparent hover:shadow-lift"
                >
                  <span className="font-display text-[1.02rem] leading-tight font-bold text-ink">{org.name}</span>
                  <span className="mt-3 flex items-end justify-between gap-2 text-sm text-slate">
                    <span>{org.description}</span>
                    <ArrowUpRight aria-hidden="true" className="size-4 shrink-0 text-teal-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                {org.note ? <ContentFlag status="confirm" note={org.note} className="mt-1.5 ml-0" /> : null}
              </li>
            ))}
          </ul>
          <p className="mt-8 font-display font-semibold text-ink">
            We also work closely with:
            {partnerServices.note ? <ContentFlag status="confirm" note={partnerServices.note} /> : null}
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {partnerServices.value.map((p) => (
              <li key={p} className="rounded-full border border-line bg-white px-4 py-2 text-[0.95rem] text-ink">
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-slate">
            Want to help a young person unlock their potential?{" "}
            <Link href={routes.contact} className="font-semibold text-teal-600 underline underline-offset-4">
              Get in touch about partnering with us
            </Link>
            .
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
