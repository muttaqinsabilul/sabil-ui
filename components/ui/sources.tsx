"use client"

import * as React from "react"
import { cn } from "cn"
import { ChevronRightIcon } from "lucide-react"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

function Sources({ className, ...props }: React.ComponentProps<typeof Collapsible>) {
  return <Collapsible data-slot="sources" className={cn("flex w-full min-w-0 flex-col", className)} {...props} />
}

function SourcesTrigger({
  count,
  className,
  children,
  ...props
}: React.ComponentProps<typeof CollapsibleTrigger> & { count: number }) {
  return (
    <CollapsibleTrigger
      data-slot="sources-trigger"
      className={cn(
        "group/sources flex w-fit items-center gap-1 rounded-md text-sm text-muted-foreground transition-colors duration-150 outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50",
        className
      )}
      {...props}
    >
      {children ?? `Used ${count} ${count === 1 ? "source" : "sources"}`}
      <ChevronRightIcon
        aria-hidden="true"
        className="size-4 transition-transform duration-200 ease-out group-aria-expanded/sources:rotate-90"
      />
    </CollapsibleTrigger>
  )
}

function SourcesContent({ className, ...props }: React.ComponentProps<typeof CollapsibleContent>) {
  return (
    <CollapsibleContent
      data-slot="sources-content"
      className={cn(
        "mt-2 flex flex-col gap-1 overflow-hidden duration-200 [--radix-accordion-content-height:var(--radix-collapsible-content-height)] data-open:animate-accordion-down data-closed:animate-accordion-up",
        className
      )}
      {...props}
    />
  )
}

/** One source: a numbered link with the site's host under the title. */
function Source({
  index,
  href,
  title,
  className,
  ...props
}: Omit<React.ComponentProps<"a">, "title"> & { index?: number; href: string; title: React.ReactNode }) {
  let host = href
  try {
    host = new URL(href).hostname.replace(/^www\./, "")
  } catch {}

  return (
    <a
      data-slot="source"
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "flex min-w-0 items-center gap-3 rounded-lg px-2 py-1.5 transition-colors duration-150 outline-none hover:bg-accent focus-visible:bg-accent",
        className
      )}
      {...props}
    >
      {index !== undefined && (
        <span className="flex size-5 shrink-0 items-center justify-center rounded-md bg-muted text-[11px] font-medium text-muted-foreground tabular-nums">
          {index}
        </span>
      )}
      <span className="flex min-w-0 flex-col">
        <span className="truncate text-sm font-medium">{title}</span>
        <span className="truncate text-xs text-muted-foreground">{host}</span>
      </span>
    </a>
  )
}

/** Small numbered pill placed inline in an answer, linking to a source. */
function Citation({ className, children, ...props }: React.ComponentProps<"a">) {
  return (
    <a
      data-slot="citation"
      target="_blank"
      rel="noreferrer"
      className={cn(
        "mx-0.5 inline-flex h-4 min-w-4 -translate-y-px items-center justify-center rounded-[5px] bg-muted px-1 align-middle text-[10px] font-medium text-muted-foreground tabular-nums no-underline transition-colors duration-150 hover:bg-primary hover:text-primary-foreground",
        className
      )}
      {...props}
    >
      {children}
    </a>
  )
}

export { Sources, SourcesTrigger, SourcesContent, Source, Citation }
