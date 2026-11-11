"use client";

import Link from "next/link";
import { useState } from "react";
import * as m from "motion/react-m";
import { useReducedMotion } from "motion/react";
import { Mail, Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/brand/logo";
import { mainNav, type NavLink } from "@/content/navigation";
import { site } from "@/content/site";
import { routes } from "@/lib/routes";

/** Mobile drawer: Radix Dialog handles focus trapping, Esc and focus return. */
export function MobileNav({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const links: NavLink[] = mainNav.flatMap((item) => ("children" in item ? item.children : [item]));
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
          <Menu aria-hidden="true" className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-sm gap-0 border-l-0 bg-paper p-0 sm:max-w-sm">
        <div className="flex h-20 items-center border-b border-line px-6">
          <Logo />
        </div>
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription className="sr-only">Site navigation and contact details</SheetDescription>
        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-4">
          <ul>
            {links.map((link, i) => {
              const active = pathname === link.href;
              return (
                <m.li
                  key={link.href}
                  initial={reduce ? false : { opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i + 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    onNavigate={close}
                    aria-current={active ? "page" : undefined}
                    className="flex min-h-13 items-center rounded-[10px] px-3 font-display text-xl font-semibold text-ink transition-colors hover:bg-ink/5 aria-[current=page]:text-teal-600"
                  >
                    {link.label}
                  </Link>
                </m.li>
              );
            })}
          </ul>
        </nav>
        <div className="space-y-3 border-t border-line p-6">
          <Button asChild className="w-full">
            <Link href={routes.referrals} onNavigate={close}>
              Make a referral
            </Link>
          </Button>
          <a href={site.phone.href} className="flex min-h-11 items-center gap-3 font-medium text-ink">
            <Phone aria-hidden="true" className="size-5 text-teal-600" />
            {site.phone.display}
          </a>
          <a href={site.email.href} className="flex min-h-11 items-center gap-3 font-medium text-ink">
            <Mail aria-hidden="true" className="size-5 text-teal-600" />
            {site.email.display}
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
