"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import * as m from "motion/react-m";
import { AnimatePresence, useReducedMotion } from "motion/react";
import { ChevronDown, Phone } from "lucide-react";
import { cn } from "cn";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { mainNav, type NavLink } from "@/content/navigation";
import { site } from "@/content/site";
import { routes } from "@/lib/routes";
import { MobileNav } from "./mobile-nav";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-300",
        scrolled ? "bg-paper/92 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md" : "bg-paper"
      )}
    >
      <div
        className={cn(
          "container-site flex items-center justify-between gap-6 transition-[height] duration-300",
          scrolled ? "h-[4.25rem]" : "h-20 lg:h-24"
        )}
      >
        <Link href={routes.home} className="-m-1 rounded-md p-1">
          <Logo homeLabel />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-0.5 xl:gap-1">
            {mainNav.map((item) =>
              "children" in item ? (
                <li key={item.label}>
                  <NavDisclosure label={item.label} items={item.children} pathname={pathname} />
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className="relative inline-flex min-h-11 items-center rounded-full px-2.5 text-[0.95rem] font-medium whitespace-nowrap xl:px-3.5 text-ink transition-colors hover:bg-ink/5 aria-[current=page]:font-semibold aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-2.5 xl:aria-[current=page]:after:inset-x-3.5 aria-[current=page]:after:bottom-1.5 aria-[current=page]:after:h-0.5 aria-[current=page]:after:rounded-full aria-[current=page]:after:bg-orange"
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm" className="hidden xl:inline-flex">
            <a href={site.phone.href}>
              <Phone aria-hidden="true" />
              {site.phone.display}
            </a>
          </Button>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href={routes.referrals}>Make a referral</Link>
          </Button>
          <Button asChild variant="ghost" size="icon" className="lg:hidden">
            <a href={site.phone.href} aria-label={`Call ${site.phone.display}`}>
              <Phone aria-hidden="true" />
            </a>
          </Button>
          <MobileNav pathname={pathname} />
        </div>
      </div>
    </header>
  );
}

/** Accessible disclosure menu (button + list of links), not an ARIA menu. */
function NavDisclosure({ label, items, pathname }: { label: string; items: NavLink[]; pathname: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const id = useId();
  const reduce = useReducedMotion();
  const active = items.some((i) => isActive(pathname, i.href));

  // Close when this component is hidden by Activity (route preserved in background)
  useLayoutEffect(() => () => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "inline-flex min-h-11 items-center gap-1 rounded-full px-2.5 text-[0.95rem] font-medium whitespace-nowrap xl:px-3.5 text-ink transition-colors hover:bg-ink/5",
          active && "font-semibold"
        )}
      >
        {label}
        <ChevronDown aria-hidden="true" className={cn("size-4 transition-transform duration-200", open && "rotate-180")} />
      </button>
      <AnimatePresence>
        {open && (
          <m.div
            id={id}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -4 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-1/2 z-50 mt-2 w-80 -translate-x-1/2 rounded-(--radius-card) border border-line bg-white p-2 shadow-lift"
          >
            <ul>
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onNavigate={() => setOpen(false)}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className="block rounded-[10px] px-4 py-3 transition-colors hover:bg-mist aria-[current=page]:bg-mist"
                  >
                    <span className="block font-display font-semibold text-ink">{item.label}</span>
                    {item.description && <span className="block text-sm text-slate">{item.description}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
