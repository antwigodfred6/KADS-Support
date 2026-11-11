import Image from "next/image";
import { cn } from "cn";
import { scenes, type SceneName } from "./scenes";

export type SiteImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** AI-generated or stock: shows an "Illustrative image" label so it isn't mistaken for a KADS home */
  illustrative?: boolean;
};

/**
 * Image slot. Pass `image` for a photograph (with written alt text); otherwise
 * a decorative brand scene is shown as a placeholder.
 * Shapes: "arch" (rounded top, from the logo's figures), "rounded", "card"
 * (smaller radius, for photos inside cards).
 */
export function ArchFrame({
  scene = "doorway",
  image,
  className,
  shape = "arch",
  priority,
  animate = false,
  sizes = "(min-width: 1024px) 40vw, 90vw",
  labelPosition = "bottom",
}: {
  scene?: SceneName;
  image?: SiteImage;
  className?: string;
  shape?: "arch" | "rounded" | "card";
  priority?: boolean;
  /** CSS-only entrance (runs before hydration, respects reduced motion) */
  animate?: boolean;
  sizes?: string;
  /** Where the "Illustrative image" label sits; use "top" when something overlaps the bottom */
  labelPosition?: "top" | "bottom";
}) {
  const Scene = scenes[scene];
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden bg-paper-deep",
        shape === "arch" && "rounded-t-[999px] rounded-b-(--radius-card)",
        shape === "rounded" && "rounded-[28px]",
        shape === "card" && "rounded-[10px]",
        animate && "motion-safe:animate-[arch-reveal_1s_var(--ease-out-soft)_both]",
        className
      )}
    >
      {image ? (
        <>
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            priority={priority}
            sizes={sizes}
            className="size-full object-cover"
          />
          {image.illustrative && (
            <span className={cn("absolute right-2.5 rounded-full", labelPosition === "top" ? "top-2.5" : "bottom-2.5", "bg-ink/75 px-2.5 py-1 font-sans text-[0.7rem] font-medium tracking-wide text-paper backdrop-blur-sm")}>
              Illustrative image
            </span>
          )}
        </>
      ) : (
        <Scene className="size-full" />
      )}
    </div>
  );
}
