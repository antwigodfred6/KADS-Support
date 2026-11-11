import { cn } from "cn";

/**
 * KADS Support logo, redrawn as SVG from the original PNG
 * (docs/source-assets/kads-logo-original.png).
 * STATUS: traced. Replace with the client's original vector artwork when supplied.
 * The original's house outline is omitted for clarity at small sizes.
 */

/** Body with a rounded top and a flat base, like the logo's figures. */
function figurePath(x1: number, x2: number, top: number, bottom: number, r: number) {
  return `M${x1},${bottom} V${top + r} A${r},${r} 0 0 1 ${x1 + r},${top} H${x2 - r} A${r},${r} 0 0 1 ${x2},${top + r} V${bottom} Z`;
}

export function LogoMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="170 172 286 304"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {/* teal, back left */}
      <circle cx="240" cy="230" r="50" fill="#278CA5" />
      <path d={figurePath(180, 300, 268, 472, 46)} fill="#278CA5" />
      {/* orange, back right */}
      <circle cx="388" cy="248" r="50" fill="#EA924A" />
      <path d={figurePath(330, 446, 286, 472, 46)} fill="#EA924A" />
      {/* navy, front centre */}
      <circle cx="325" cy="290" r="46" fill="#0B4260" />
      <path d={figurePath(268, 381, 324, 472, 46)} fill="#0B4260" />
    </svg>
  );
}

export function Logo({
  tone = "light",
  className,
  homeLabel = false,
}: {
  /** Adds ", home" to the accessible name (for the header link) */
  homeLabel?: boolean;
  /** "light" = for light backgrounds, "dark" = for navy/ink backgrounds */
  tone?: "light" | "dark";
  className?: string;
}) {
  const base = tone === "dark" ? "text-paper" : "text-ink";
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="h-10 w-auto shrink-0" />
      <span className="flex flex-col leading-none" aria-hidden="true">
        <span className={cn("font-display text-[1.45rem] font-extrabold tracking-[-0.02em]", base)}>
          K<span className="text-orange">A</span>D<span className="text-orange">S</span>
        </span>
        <span
          className={cn(
            "mt-0.5 font-display text-[0.62rem] font-semibold tracking-[0.32em] uppercase",
            tone === "dark" ? "text-on-dark-muted" : "text-slate"
          )}
        >
          Support
        </span>
      </span>
      <span className="sr-only">KADS Support{homeLabel ? ", home" : ""}</span>
    </span>
  );
}
