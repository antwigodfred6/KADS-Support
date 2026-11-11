import Link from "next/link";
import { ArchFrame } from "@/components/art/arch-frame";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/sections/primitives";
import { routes } from "@/lib/routes";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section aria-labelledby="nf-title" className="py-16 md:py-24">
      <div className="container-site grid items-center gap-12 lg:grid-cols-2">
        <div>
          <Eyebrow>Page not found</Eyebrow>
          <h1 id="nf-title" className="text-h1">
            We can&rsquo;t find that page.
          </h1>
          <p className="mt-6 max-w-lg text-lead text-slate">
            It may have moved when we updated our website. Try one of these instead, or get in touch and we&rsquo;ll help.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href={routes.home}>Go to the homepage</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={routes.contact}>Contact us</Link>
            </Button>
          </div>
        </div>
        <ArchFrame scene="path" className="mx-auto aspect-[4/5] w-full max-w-xs" />
      </div>
    </section>
  );
}
