import { cn } from "cn";

/**
 * A slow ribbon of words that scrolls sideways. Decorative: everything it says
 * is also written elsewhere on the page, so it is hidden from screen readers.
 * Pauses on hover, and stands still for reduced motion.
 */
export function Marquee({ items, className }: { items: string[]; className?: string }) {
  const row = (copy: number) => (
    <ul className="marquee-track flex shrink-0 items-center gap-10 pr-10 md:gap-14 md:pr-14" data-copy={copy}>
      {items.map((item, i) => (
        <li key={`${item}-${copy}`} className="flex shrink-0 items-center gap-10 md:gap-14">
          <span
            className={cn(
              "font-display text-[clamp(2rem,1.2rem+3vw,4rem)] leading-none font-extrabold tracking-[-0.03em] whitespace-nowrap",
              i % 2 === 1 ? "text-outline" : "text-ink"
            )}
          >
            {item}
          </span>
          <span className="flex -space-x-1.5">
            <span className="size-3.5 rounded-full bg-teal-400" />
            <span className="size-3.5 rounded-full bg-orange" />
            <span className="size-3.5 rounded-full bg-navy" />
          </span>
        </li>
      ))}
    </ul>
  );
  return (
    <div aria-hidden="true" className={cn("marquee group flex overflow-hidden py-10 md:py-14", className)}>
      {row(1)}
      {row(2)}
    </div>
  );
}
