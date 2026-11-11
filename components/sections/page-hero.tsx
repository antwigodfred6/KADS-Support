import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "cn";
import { ArchFrame, type SiteImage } from "@/components/art/arch-frame";
import type { SceneName } from "@/components/art/scenes";
import { site } from "@/content/site";
import { JsonLd } from "@/lib/seo";
import { Eyebrow } from "./primitives";

type Crumb = { label: string; href: string };

function Breadcrumbs({ trail, onDark }: { trail: Crumb[]; onDark?: boolean }) {
  const all = [{ label: "Home", href: "/" }, ...trail];
  return (
    <>
      <nav aria-label="Breadcrumb" className="animate-rise mb-8">
        <ol className={cn("flex flex-wrap items-center gap-1 text-sm", onDark ? "text-on-dark-muted" : "text-slate")}>
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.href} className="flex items-center gap-1">
                {last ? (
                  <span aria-current="page" className={cn("font-medium", onDark ? "text-paper" : "text-ink")}>
                    {c.label}
                  </span>
                ) : (
                  <>
                    <Link href={c.href} className="underline-offset-4 hover:underline">
                      {c.label}
                    </Link>
                    <ChevronRight aria-hidden="true" className="size-3.5" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label,
            item: `${site.url}${c.href === "/" ? "" : c.href}`,
          })),
        }}
      />
    </>
  );
}

type BaseProps = {
  eyebrow: string;
  title: React.ReactNode;
  lead: string;
  trail: Crumb[];
  children?: React.ReactNode;
};

/** Split: copy left, arched illustration right. */
export function HeroSplit({ eyebrow, title, lead, trail, scene, children }: BaseProps & { scene: SceneName }) {
  return (
    <section aria-labelledby="page-title" className="relative overflow-hidden pt-8 pb-16 md:pb-24">
      <div className="container-site grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <Breadcrumbs trail={trail} />
          <div className="animate-rise [animation-delay:60ms]">
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
          <h1 id="page-title" className="animate-rise text-h1 [animation-delay:120ms]">
            {title}
          </h1>
          <p className="animate-rise mt-6 max-w-xl text-lead text-slate [animation-delay:180ms]">{lead}</p>
          {children && <div className="animate-rise mt-9 [animation-delay:240ms]">{children}</div>}
        </div>
        <ArchFrame scene={scene} animate priority className="mx-auto aspect-[4/5] w-full max-w-sm lg:max-w-md" />
      </div>
    </section>
  );
}

/** Panel: full-width illustration band with a navy text panel overlapping it. */
export function HeroPanel({ eyebrow, title, lead, trail, scene, image, children }: BaseProps & { scene: SceneName; image?: SiteImage }) {
  return (
    <section aria-labelledby="page-title" className="relative pt-8 pb-16 md:pb-24">
      <div className="container-site">
        <Breadcrumbs trail={trail} />
        <div className="relative grid lg:grid-cols-12">
          <ArchFrame
            scene={scene}
            image={image}
            sizes="(min-width: 1024px) 75vw, 100vw"
            shape="rounded"
            priority
            className="animate-rise aspect-[4/3] w-full sm:aspect-[16/8] lg:col-span-9 lg:col-start-4 lg:my-12 lg:aspect-[16/8]"
          />
          <div className="on-dark animate-rise relative z-10 -mt-10 mr-3 ml-3 rounded-(--radius-card) bg-navy p-8 text-paper shadow-lift sm:-mt-28 sm:mr-auto sm:max-w-xl md:p-12 lg:absolute lg:top-1/2 lg:left-0 lg:mt-0 lg:ml-0 lg:w-[46%] lg:max-w-none lg:-translate-y-1/2 [animation-delay:150ms]">
            <Eyebrow onDark>{eyebrow}</Eyebrow>
            <h1 id="page-title" className="text-h1 text-paper">
              {title}
            </h1>
            <p className="mt-6 text-lead text-on-dark-muted">{lead}</p>
            {children && <div className="mt-8">{children}</div>}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Typographic: large statement with a stepped baseline, no image. */
export function HeroType({ eyebrow, lines, lead, trail, image, children }: Omit<BaseProps, "title"> & { lines: string[]; image?: SiteImage }) {
  return (
    <section aria-labelledby="page-title" className="relative overflow-hidden pt-8 pb-16 md:pb-24">
      <div aria-hidden="true" className="dots absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
      <div className="container-site relative">
        <Breadcrumbs trail={trail} />
        <div className="animate-rise [animation-delay:60ms]">
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
        <h1 id="page-title" className="text-display">
          {lines.map((line, i) => (
            <span
              key={line}
              className="animate-rise block"
              style={{ paddingLeft: `min(${i * 9}vw, ${i * 7}rem)`, animationDelay: `${120 + i * 90}ms` }}
            >
              {i === lines.length - 1 ? <span className="font-serif font-normal text-teal-600 italic">{line}</span> : line}
              {/* Real space so screen readers don't run the lines together ("basicskills") */}
              {i < lines.length - 1 ? " " : null}
            </span>
          ))}
        </h1>
        <div className="mt-10 grid gap-8 md:grid-cols-12">
          <p className="animate-rise text-lead text-slate [animation-delay:400ms] md:col-span-6 md:col-start-6">{lead}</p>
        </div>
        {image && (
          <ArchFrame
            image={image}
            shape="rounded"
            priority
            sizes="(min-width: 1280px) 1240px, 100vw"
            className="animate-rise mt-12 aspect-[4/3] w-full [animation-delay:480ms] sm:aspect-[21/9]"
          />
        )}
        {children}
      </div>
    </section>
  );
}

/** Soft: calm tinted hero for sensitive topics. */
export function HeroSoft({ eyebrow, title, lead, trail, scene, image, children }: BaseProps & { scene: SceneName; image?: SiteImage }) {
  return (
    <section aria-labelledby="page-title" className="relative bg-mist pt-8 pb-16 md:pb-24">
      <div className="container-site grid items-end gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Breadcrumbs trail={trail} />
          <div className="animate-rise [animation-delay:60ms]">
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
          <h1 id="page-title" className="animate-rise text-h1 [animation-delay:120ms]">
            {title}
          </h1>
          <p className="animate-rise mt-6 max-w-2xl text-lead text-slate [animation-delay:180ms]">{lead}</p>
          {children && <div className="animate-rise mt-9 [animation-delay:240ms]">{children}</div>}
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <ArchFrame scene={scene} image={image} sizes="(min-width: 1024px) 30vw, 320px" animate priority shape="rounded" className="mx-auto aspect-square w-full max-w-xs rounded-full lg:max-w-none" />
        </div>
      </div>
    </section>
  );
}

/** Quote: an editorial pull-quote as the page's headline. */
export function HeroQuote({ eyebrow, quote, lead, trail }: { eyebrow: string; quote: string; lead: string; trail: Crumb[] }) {
  return (
    <section aria-labelledby="page-title" className="relative overflow-hidden bg-paper-deep pt-8 pb-20 md:pb-28">
      <div className="container-site">
        <Breadcrumbs trail={trail} />
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <div className="animate-rise [animation-delay:60ms]">
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>
            <h1 id="page-title" className="animate-rise [animation-delay:120ms]">
              <span className="sr-only">Our objectives: </span>
              <span aria-hidden="true" className="block font-serif text-[clamp(5rem,3rem+8vw,10rem)] leading-[0.6] font-normal text-orange">
                &ldquo;
              </span>
              <span className="block font-serif text-display font-normal tracking-[-0.02em] italic">{quote}</span>
            </h1>
          </div>
          <p className="animate-rise text-lead text-slate [animation-delay:240ms] lg:col-span-4">{lead}</p>
        </div>
      </div>
    </section>
  );
}
