import * as React from "react"
import { cn } from "cn"

const fieldBase =
  "w-full min-w-0 rounded-(--radius-field) border border-input bg-white px-4 text-base text-ink transition-[border-color,box-shadow] outline-none placeholder:text-slate/70 hover:border-ink/60 focus-visible:border-teal-600 focus-visible:ring-4 focus-visible:ring-teal-600/20 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60 aria-invalid:border-destructive aria-invalid:ring-4 aria-invalid:ring-destructive/15"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(fieldBase, "h-12", className)}
      {...props}
    />
  )
}

export { Input, fieldBase }
