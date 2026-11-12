import Image from "next/image";
import { cn } from "cn";
import { scenes, type SceneName } from "./scenes";

export type SiteImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /**
   * Records that the image is AI-generated or stock (not a KADS home), for the site's own records.
   * Not shown on the page: KADS chose on 11 Nov 2026 to remove the visible "Illustrative image" label.
   */
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
}: {
  scene?: SceneName;
  image?: SiteImage;
  className?: string;
  shape?: "arch" | "rounded" | "card";
  priority?: boolean;
  /** CSS-only entrance (runs before hydration, respects reduced motion) */
  animate?: boolean;
  sizes?: string;
}) {
  const Scene = scenes[scene];
  // Below-the-fold photos open up as they scroll into view; card photos keep their hover zoom instead.
  const scrollFx = Boolean(image) && !priority && !animate && shape !== "card";
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden bg-paper-deep",
        shape === "arch" && "rounded-t-[999px] rounded-b-(--radius-card)",
        shape === "rounded" && "rounded-[28px]",
        shape === "card" && "rounded-[10px]",
        animate && "motion-safe:animate-[arch-reveal_1s_var(--ease-out-soft)_both]",
        scrollFx && "frame-scroll",
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
            className={cn("size-full object-cover", priority && "frame-kenburns")}
          />
        </>
      ) : (
        <Scene className="size-full" />
      )}
    </div>
  );
}
