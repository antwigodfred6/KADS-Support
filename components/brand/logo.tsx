import Image from "next/image";
import { cn } from "cn";

/**
 * KADS Support logo: the client's ORIGINAL artwork (house outline, three
 * figures, "KADS SUPPORT" wordmark), taken from the existing website's PNG.
 * Do not redraw or restyle it.
 *
 * Two colourways made from the same file (public/brand/):
 *  - on-dark:  the original, with white outline and lettering
 *  - on-light: identical, but the white parts are the logo's slate (#323f48)
 * Source: docs/source-assets/kads-logo-original.png
 */

const LOGO = { width: 688, height: 778 };
const MARK = { width: 688, height: 533 };

/** Full logo (house, figures and wordmark). Height-driven; width follows. */
export function Logo({
  tone = "light",
  className,
  homeLabel = false,
  priority = false,
}: {
  /** "light" = for light backgrounds, "dark" = for navy/slate backgrounds */
  tone?: "light" | "dark";
  className?: string;
  /** Adds ", home" to the accessible name (for the header link) */
  homeLabel?: boolean;
  priority?: boolean;
}) {
  return (
    <Image
      src={`/brand/kads-logo-on-${tone}.png`}
      alt={homeLabel ? "KADS Support, home" : "KADS Support"}
      width={LOGO.width}
      height={LOGO.height}
      priority={priority}
      // Shown at most ~88px tall (≈78px wide); 2x screens get the 256px file
      sizes="88px"
      className={cn("h-14 w-auto", className)}
    />
  );
}

/** House-and-figures mark without the wordmark, for small or decorative uses. */
export function LogoMark({
  tone = "light",
  className,
  decorative = true,
  sizes = "(min-width: 768px) 480px, 320px",
}: {
  tone?: "light" | "dark";
  className?: string;
  decorative?: boolean;
  /** Pass the real display width for small uses, so a smaller file is sent */
  sizes?: string;
}) {
  return (
    <Image
      src={`/brand/kads-mark-on-${tone}.png`}
      alt={decorative ? "" : "KADS Support"}
      aria-hidden={decorative || undefined}
      width={MARK.width}
      height={MARK.height}
      sizes={sizes}
      className={cn("w-auto", className)}
    />
  );
}
