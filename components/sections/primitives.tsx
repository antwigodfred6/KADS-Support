import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "cn";
import type { ContentStatus } from "@/content/types";

type Tone = "paper" | "mist" | "deep" | "navy" | "ink";

const toneClass: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  mist: "bg-mist text-ink",
  deep: "bg-paper-deep text-ink",
  navy: "on-dark bg-navy text-paper [&_h2]:text-paper [&_h3]:text-paper",
  ink: "on-dark bg-ink text-paper [&_h2]:text-paper [&_h3]:text-paper",
};

export function Section({
  tone = "paper",
  className,
  children,
  id,
  labelledBy,
  arch = false,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
  id?: string;
  labelledBy?: string;
  /** Arched top edge, echoing the logo's rounded heads */
  arch?: boolean;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("relative py-20 md:py-28 lg:py-32", toneClass[tone], arch && "arch-top -mt-px", className)}
    >
      <div className="container-site">{children}</div>
    </section>
  );
}

/** Small label above headings, with the three-dot figure mark. */
export function Eyebrow({ children, onDark = false, className }: { children: React.ReactNode; onDark?: boolean; className?: string }) {
  return (
    <p
      className={cn(
        "mb-5 inline-flex items-center gap-2.5 font-display text-[0.8rem] font-semibold tracking-[0.14em] uppercase",
        onDark ? "text-on-dark-muted" : "text-teal-600",
        className
      )}
    >
      <span aria-hidden="true" className="flex -space-x-1">
        <span className="size-2.5 rounded-full bg-teal-400 ring-2 ring-current/0" />
        <span className="size-2.5 rounded-full bg-orange" />
        <span className={cn("size-2.5 rounded-full", onDark ? "bg-paper" : "bg-navy")} />
      </span>
      {children}
    </p>
  );
}

const showFlags = process.env.NEXT_PUBLIC_SHOW_CONTENT_FLAGS === "true";

/**
 * Review marker for unconfirmed content. Visible only when
 * NEXT_PUBLIC_SHOW_CONTENT_FLAGS=true (dev / client-review previews).
 */
export function ContentFlag({ status, note, className }: { status: ContentStatus; note?: string; className?: string }) {
  if (!showFlags || status === "verified") return null;
  const label = status === "confirm" ? "Client to confirm" : "Placeholder";
  return (
    <span
      title={note}
      className={cn(
        "ml-2 inline-flex translate-y-[-2px] items-center rounded-full border border-dashed px-2 py-0.5 align-middle font-sans text-[0.68rem] font-semibold tracking-normal normal-case",
        status === "confirm" ? "border-orange-700/50 bg-orange-100 text-ink" : "border-ink/40 bg-white text-ink",
        className
      )}
    >
      {/* Short label only: the full note stays in the tooltip so headings aren't read out with long review notes */}
      <span className="sr-only">(</span>
      {label}
      <span className="sr-only">)</span>
    </span>
  );
}

export function ArrowLink({
  href,
  children,
  className,
  onDark = false,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group/arrow inline-flex min-h-11 items-center gap-2 font-display font-semibold",
        onDark ? "text-paper" : "text-teal-600",
        className
      )}
    >
      <span className="link-underline">{children}</span>
      <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 ease-(--ease-out-soft) group-hover/arrow:translate-x-1" />
    </Link>
  );
}
