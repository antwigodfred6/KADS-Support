import * as React from "react"
import { cn } from "cn"
import { fieldBase } from "./input"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(fieldBase, "min-h-36 py-3 leading-relaxed", className)}
      {...props}
    />
  )
}

export { Textarea }
