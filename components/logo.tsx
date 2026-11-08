import { cn } from "@/lib/utils"

/** Two offset squares: a canvas and the layer on top of it. */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn("size-5", className)}
    >
      <rect x="2.5" y="2.5" width="13" height="13" rx="3.5" className="fill-foreground/15" />
      <rect x="8.5" y="8.5" width="13" height="13" rx="3.5" className="fill-foreground" />
    </svg>
  )
}
