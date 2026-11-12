import { cn } from "cn";

/**
 * Slow-drifting background shapes taken from the logo: rounded "figure"
 * arches, a sun and small dots. Pure CSS animation, decorative only, and
 * still for visitors who turn on reduced motion.
 */
export function DriftShapes({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const dark = tone === "dark";
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {/* Sun */}
      <span
        className={cn(
          "drift drift-a absolute -top-24 right-[8%] size-72 rounded-full blur-2xl md:size-96",
          dark ? "bg-orange/10" : "bg-orange-100/80"
        )}
      />
      {/* Teal glow */}
      <span
        className={cn(
          "drift drift-b absolute bottom-[-6rem] left-[-5rem] size-80 rounded-full blur-3xl",
          dark ? "bg-teal-400/15" : "bg-teal-200/40"
        )}
      />
      {/* Figure arch, like the rounded heads and bodies in the logo */}
      <svg viewBox="0 0 120 200" className={cn("drift drift-c absolute right-[3%] bottom-[6%] hidden h-28 w-auto lg:block", dark ? "opacity-[0.08]" : "opacity-[0.12]")}>
        <circle cx="60" cy="34" r="26" fill="currentColor" className={dark ? "text-paper" : "text-teal-400"} />
        <path d="M14 200 V112 A46 46 0 0 1 106 112 V200 Z" fill="currentColor" className={dark ? "text-paper" : "text-teal-400"} />
      </svg>
      {/* Small dots */}
      <span className={cn("drift drift-b absolute top-[30%] right-[30%] size-3 rounded-full", dark ? "bg-orange/50" : "bg-orange/70")} />
      <span className={cn("drift drift-a absolute bottom-[22%] left-[38%] size-2 rounded-full", dark ? "bg-paper/30" : "bg-navy/30")} />
      <span className={cn("drift drift-c absolute top-[5%] left-[2%] size-2.5 rounded-full", dark ? "bg-teal-200/40" : "bg-teal-400/50")} />
    </div>
  );
}
