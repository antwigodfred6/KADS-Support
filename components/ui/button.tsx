import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

/**
 * KADS buttons: pill shape, 48px minimum target, brand variants.
 * - primary:   ink on light backgrounds
 * - accent:    orange with ink text (use on navy/ink backgrounds, or sparingly on paper)
 * - outline:   hairline ink border on light
 * - onDark:    paper outline for dark sections
 * - ghost/link for low-emphasis actions
 */
const buttonVariants = cva(
  "group/button relative inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-display font-semibold whitespace-nowrap transition-[background-color,color,border-color,transform,box-shadow] duration-200 ease-(--ease-out-soft) select-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[1.1em]",
  {
    variants: {
      variant: {
        primary: "bg-ink text-paper hover:bg-navy",
        accent: "bg-orange text-ink hover:bg-[#f0a465]",
        outline: "border border-ink/25 bg-transparent text-ink hover:border-ink hover:bg-white/60",
        onDark: "border border-paper/35 bg-transparent text-paper hover:border-paper hover:bg-paper/10",
        ghost: "text-ink hover:bg-ink/5",
        link: "rounded-none px-0 text-teal-600 underline-offset-4 hover:underline",
      },
      size: {
        default: "min-h-12 px-6 text-[0.98rem]",
        lg: "min-h-14 px-7 text-[1.05rem]",
        sm: "min-h-11 px-4 text-sm",
        icon: "size-12",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
