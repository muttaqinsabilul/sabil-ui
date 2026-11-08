"use client"

import * as React from "react"
import { cn } from "cn"
import { BrainIcon, ChevronRightIcon } from "lucide-react"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

function Reasoning({ className, ...props }: React.ComponentProps<typeof Collapsible>) {
  return (
    <Collapsible
      data-slot="reasoning"
      className={cn("flex w-full min-w-0 flex-col", className)}
      {...props}
    />
  )
}

/**
 * Shows "Thinking…" with a shimmer while `streaming`, then "Thought for Ns".
 * Pass children to use your own label.
 */
function ReasoningTrigger({
  streaming = false,
  duration,
  className,
  children,
  ...props
}: React.ComponentProps<typeof CollapsibleTrigger> & { streaming?: boolean; duration?: number }) {
  const label =
    children ??
    (streaming ? "Thinking…" : duration ? `Thought for ${duration}s` : "Thought for a few seconds")

  return (
    <CollapsibleTrigger
      data-slot="reasoning-trigger"
      data-streaming={streaming || undefined}
      className={cn(
        "group/reasoning flex w-fit items-center gap-2 rounded-md text-sm text-muted-foreground transition-colors duration-150 outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50",
        className
      )}
      {...props}
    >
      <BrainIcon className="size-4 shrink-0" aria-hidden="true" />
      <span className={cn(streaming && "shimmer motion-reduce:shimmer-none")}>{label}</span>
      <ChevronRightIcon
        className="size-4 shrink-0 transition-transform duration-200 ease-out group-aria-expanded/reasoning:rotate-90"
        aria-hidden="true"
      />
    </CollapsibleTrigger>
  )
}

function ReasoningContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CollapsibleContent>) {
  return (
    <CollapsibleContent
      data-slot="reasoning-content"
      className="min-w-0 overflow-hidden duration-200 [--radix-accordion-content-height:var(--radix-collapsible-content-height)] data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}
    >
      <div
        className={cn(
          "mt-2 ml-[calc(--spacing(2)-1px)] border-l pl-4 text-sm leading-relaxed text-muted-foreground",
          className
        )}
      >
        {children}
      </div>
    </CollapsibleContent>
  )
}

export { Reasoning, ReasoningTrigger, ReasoningContent }
