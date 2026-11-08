import * as React from "react"
import { cn } from "cn"

/** A row of prompt chips. Scrolls sideways when it runs out of room. */
function Suggestions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="suggestions"
      className={cn("flex w-full gap-2 overflow-x-auto [scrollbar-width:none]", className)}
      {...props}
    />
  )
}

function Suggestion({ className, type = "button", ...props }: React.ComponentProps<"button">) {
  return (
    <button
      data-slot="suggestion"
      type={type}
      className={cn(
        "inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border bg-background px-3.5 text-[13px] font-medium whitespace-nowrap text-foreground/80 shadow-xs transition-[transform,background-color,color] duration-150 ease-out outline-none hover:bg-accent hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-3.5 [&_svg]:shrink-0 [&_svg]:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export { Suggestions, Suggestion }
