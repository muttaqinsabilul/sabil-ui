"use client"

import * as React from "react"
import { cn } from "cn"
import { CheckIcon, ChevronDownIcon, CircleIcon, WrenchIcon, XIcon } from "lucide-react"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Spinner } from "@/components/ui/spinner"

type ToolCallStatus = "pending" | "running" | "done" | "error"

const statusLabel: Record<ToolCallStatus, string> = {
  pending: "Pending",
  running: "Running",
  done: "Done",
  error: "Error",
}

function ToolCall({ className, ...props }: React.ComponentProps<typeof Collapsible>) {
  return (
    <Collapsible
      data-slot="tool-call"
      className={cn("w-full min-w-0 overflow-hidden rounded-xl border bg-card text-sm", className)}
      {...props}
    />
  )
}

function StatusIcon({ status }: { status: ToolCallStatus }) {
  if (status === "running") return <Spinner className="size-3.5" />
  if (status === "done") return <CheckIcon className="size-3.5" />
  if (status === "error") return <XIcon className="size-3.5" />
  return <CircleIcon className="size-3" />
}

/** Tool name on the left, status on the right. Click to show input and output. */
function ToolCallHeader({
  name,
  status = "done",
  icon,
  className,
  ...props
}: Omit<React.ComponentProps<typeof CollapsibleTrigger>, "children"> & {
  name: React.ReactNode
  status?: ToolCallStatus
  icon?: React.ReactNode
}) {
  return (
    <CollapsibleTrigger
      data-slot="tool-call-header"
      data-status={status}
      className={cn(
        "group/tool-call flex h-11 w-full items-center gap-2.5 px-3.5 text-left outline-none transition-colors duration-150 hover:bg-accent focus-visible:bg-accent",
        className
      )}
      {...props}
    >
      <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground [&_svg:not([class*='size-'])]:size-3.5">
        {icon ?? <WrenchIcon />}
      </span>
      <span className="min-w-0 flex-1 truncate font-mono text-[13px] font-medium">{name}</span>
      <span
        className={cn(
          "flex shrink-0 items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium",
          status === "pending" && "bg-muted text-muted-foreground",
          status === "running" && "bg-primary/10 text-primary",
          status === "done" && "bg-muted text-foreground/80",
          status === "error" && "bg-destructive/10 text-destructive"
        )}
      >
        <StatusIcon status={status} />
        {statusLabel[status]}
      </span>
      <ChevronDownIcon
        aria-hidden="true"
        className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 ease-out group-aria-expanded/tool-call:rotate-180"
      />
    </CollapsibleTrigger>
  )
}

function ToolCallContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CollapsibleContent>) {
  return (
    <CollapsibleContent
      data-slot="tool-call-content"
      className="overflow-hidden duration-200 [--radix-accordion-content-height:var(--radix-collapsible-content-height)] data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}
    >
      <div className={cn("flex flex-col gap-3 border-t p-3.5", className)}>{children}</div>
    </CollapsibleContent>
  )
}

/** A labelled block of data, e.g. the tool's input or its result. */
function ToolCallSection({
  label,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { label: React.ReactNode }) {
  return (
    <div data-slot="tool-call-section" className={cn("flex min-w-0 flex-col gap-1.5", className)} {...props}>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <pre className="max-h-56 overflow-auto rounded-lg bg-muted/60 px-3 py-2.5 font-mono text-xs leading-relaxed whitespace-pre-wrap">
        {children}
      </pre>
    </div>
  )
}

export { ToolCall, ToolCallHeader, ToolCallContent, ToolCallSection }
export type { ToolCallStatus }
