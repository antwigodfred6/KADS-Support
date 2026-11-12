import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isDeliveryConfigured } from "@/lib/mailer";
import { ContactForm } from "@/components/contact/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow, Section } from "@/components/sections/primitives";
import { contactFaqs, helplines } from "@/content/contact";
import { site } from "@/content/site";
import { routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { TextReveal } from "@/components/motion/text-reveal";

export const metadata = pageMetadata({
  title: "Contact us",
  description: `Contact KADS Support by phone on ${site.phone.display}, by email at ${site.email.display}, or send us a message. Includes urgent helplines.`,
  path: routes.contact,
});

export default function ContactPage() {
  // The form appears only once Zoho delivery is set up in Vercel (README "Switching it on").
  const formOn = isDeliveryConfigured();
  return (
    <>
      <section aria-labelledby="page-title" className="relative">
        <div className="grid lg:min-h-[44rem] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          {/* Contact details on navy */}
          <div className="on-dark relative overflow-hidden bg-navy text-paper">
            <div aria-hidden="true" className="dots-dark absolute inset-0" />
            <div className="relative mx-auto max-w-xl px-[clamp(1rem,0.4rem+2.6vw,2.5rem)] py-14 md:py-20 lg:ml-auto lg:pr-14">
              <div className="animate-rise">
                <Eyebrow onDark>Contact</Eyebrow>
              </div>
              <h1 id="page-title" className="animate-rise text-h1 text-paper [animation-delay:80ms]">
                Get in touch.
              </h1>
              <p className="animate-rise mt-6 text-lead text-on-dark-muted [animation-delay:140ms]">
                Have a question, or want to talk about a referral? {formOn ? "Call, email or send us a message." : "Call or email us."}
              </p>

              <ul className="animate-rise mt-10 space-y-6 [animation-delay:200ms]">
                <li className="flex gap-4">
                  <Phone aria-hidden="true" className="mt-1 size-6 shrink-0 text-orange" strokeWidth={1.75} />
                  <div>
                    <p className="text-sm text-on-dark-muted">Call us</p>
                    <a href={site.phone.href} className="font-display text-h3 font-bold text-paper underline-offset-4 hover:underline">
                      {site.phone.display}
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Mail aria-hidden="true" className="mt-1 size-6 shrink-0 text-orange" strokeWidth={1.75} />
                  <div>
                    <p className="text-sm text-on-dark-muted">Email us</p>
                    <a href={site.email.href} className="font-display text-xl font-bold break-all text-paper underline-offset-4 hover:underline">
                      {site.email.display}
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <MapPin aria-hidden="true" className="mt-1 size-6 shrink-0 text-orange" strokeWidth={1.75} />
                  <div>
                    <p className="text-sm text-on-dark-muted">
                      Registered office
                    </p>
                    <address className="mt-1 not-italic text-paper">
                      {site.registeredOffice.value.map((l) => (
                        <span key={l} className="block">
                          {l}
                        </span>
                      ))}
                    </address>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Form on paper */}
          <div className="bg-paper">
            <div className="mx-auto max-w-2xl px-[clamp(1rem,0.4rem+2.6vw,2.5rem)] py-14 md:py-20 lg:mr-auto lg:pl-14">
              {formOn ? (
                <>
                  <h2 className="text-h2">Send a message</h2>
                  <div className="mt-8">
                    <ContactForm />
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-h2">The quickest way to reach us</h2>
                  <p className="mt-5 text-lead text-slate">
                    Call us to talk things through, or email us and we&rsquo;ll get back to you. If you&rsquo;re a professional making a
                    referral, a phone call is the best place to start.
                  </p>
                  <div className="mt-9 grid max-w-md gap-4">
                    <a
                      href={site.phone.href}
                      className="group rounded-(--radius-card) border border-line bg-white p-6 transition-[transform,box-shadow] duration-300 ease-(--ease-out-soft) hover:-translate-y-1 hover:shadow-lift"
                    >
                      <Phone aria-hidden="true" className="size-7 text-teal-600" strokeWidth={1.75} />
                      <span className="mt-4 block text-sm text-slate">Call</span>
                      <span className="block font-display text-h3 font-bold text-ink">{site.phone.display}</span>
                    </a>
                    <a
                      href={site.email.href}
                      className="group rounded-(--radius-card) border border-line bg-white p-6 transition-[transform,box-shadow] duration-300 ease-(--ease-out-soft) hover:-translate-y-1 hover:shadow-lift"
                    >
                      <Mail aria-hidden="true" className="size-7 text-teal-600" strokeWidth={1.75} />
                      <span className="mt-4 block text-sm text-slate">Email</span>
                      <span className="block font-display text-h3 font-bold break-words text-ink">{site.email.display}</span>
                    </a>
                  </div>
                  <p className="mt-8 text-slate">
                    Please don&rsquo;t email sensitive details about a young person. We&rsquo;ll agree a secure way to share them when we
                    speak.
                  </p>
                  <Button asChild variant="outline" size="lg" className="mt-8">
                    <a href="#helplines">Need help urgently? See helplines</a>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <Section id="helplines" tone="mist" labelledBy="helplines-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Eyebrow>Need help now?</Eyebrow>
            <h2 id="helplines-title" className="text-h2">
              <TextReveal text="Urgent helplines." />
            </h2>
            <p className="mt-5 text-slate">If you need to talk to someone straight away, these free and confidential services can help.</p>
          </Reveal>
          <Reveal className="lg:col-span-7 lg:col-start-6" delay={0.1}>
            <ul className="divide-y divide-teal-200 overflow-hidden rounded-(--radius-card) bg-white">
              {helplines.map((h) => (
                <li key={h.name} className="flex flex-col gap-1 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 md:px-7">
                  <div>
                    <p className="font-display font-bold text-ink">{h.name}</p>
                    <p className="text-[0.95rem] text-slate">{h.description}</p>
                  </div>
                  <a
                    href={h.href}
                    className="inline-flex min-h-11 shrink-0 items-center font-display text-lg font-bold text-teal-600 underline-offset-4 hover:underline"
                    aria-label={`Call ${h.name} on ${h.number}`}
                  >
                    {h.number}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section labelledBy="faq-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Eyebrow>Questions</Eyebrow>
            <h2 id="faq-title" className="text-h2">
              <TextReveal text="Frequently asked." />
            </h2>
          </Reveal>
          <div className="space-y-3 lg:col-span-7 lg:col-start-6">
            {contactFaqs.map((f) => (
              <details key={f.q} className="group rounded-(--radius-card) border border-line bg-white open:shadow-lift">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 font-display text-lg font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-full bg-mist text-teal-600 transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="px-6 pb-6 text-slate">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
