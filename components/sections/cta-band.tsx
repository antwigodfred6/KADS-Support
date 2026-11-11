import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/brand/logo";
import { Reveal } from "@/components/motion/reveal";
import { site } from "@/content/site";
import { routes } from "@/lib/routes";

/** Closing call to action used at the foot of most pages. */
export function CtaBand({
  title = "Talk to our team.",
  body = "Whether you're a professional making a referral, a young person, or an organisation that wants to help, we'd like to hear from you.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="on-dark relative overflow-hidden bg-ink py-20 text-paper md:py-28">
      <div aria-hidden="true" className="dots-dark absolute inset-0" />
      <LogoMark tone="dark" className="pointer-events-none absolute -right-16 -bottom-10 h-[22rem] w-auto opacity-[0.12] md:right-[6%] md:h-[30rem]" />
      <div className="container-site relative">
        <Reveal className="max-w-2xl">
          <h2 id="cta-title" className="text-h2 text-paper">
            {title}
          </h2>
          <p className="mt-5 text-lead text-on-dark-muted">{body}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild variant="accent" size="lg">
              <a href={site.phone.href}>
                <Phone aria-hidden="true" />
                Call {site.phone.display}
              </a>
            </Button>
            <Button asChild variant="onDark" size="lg">
              <a href={site.email.href}>
                <Mail aria-hidden="true" />
                {site.email.display}
              </a>
            </Button>
          </div>
          <p className="mt-6 text-sm text-on-dark-muted">
            Prefer to write?{" "}
            <Link href={routes.contact} className="font-semibold text-paper underline underline-offset-4">
              Send us a message
            </Link>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
