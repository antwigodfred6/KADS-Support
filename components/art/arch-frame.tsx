import Image from "next/image";
import { cn } from "cn";
import { scenes, type SceneName } from "./scenes";

/**
 * Image slot with the arched "figure" crop from the logo.
 * Pass `image` for a real photograph (with written alt text), otherwise a
 * decorative brand scene is shown as a placeholder.
 */
export function ArchFrame({
  scene,
  image,
  className,
  shape = "arch",
  priority,
  animate = false,
}: {
  scene: SceneName;
  image?: { src: string; alt: string; width: number; height: number };
  className?: string;
  shape?: "arch" | "rounded";
  priority?: boolean;
  /** CSS-only entrance (runs before hydration, respects reduced motion) */
  animate?: boolean;
}) {
  const Scene = scenes[scene];
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden",
        shape === "arch" ? "rounded-t-[999px] rounded-b-(--radius-card)" : "rounded-[28px]",
        animate && "motion-safe:animate-[arch-reveal_1s_var(--ease-out-soft)_both]",
        className
      )}
    >
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          priority={priority}
          sizes="(min-width: 1024px) 40vw, 90vw"
          className="size-full object-cover"
        />
      ) : (
        <Scene className="size-full" />
      )}
    </div>
  );
}
