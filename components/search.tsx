"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import { SearchIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Kbd, KbdGroup } from "@/components/ui/kbd"

const SearchDialog = dynamic(
  () => import("./search-dialog").then((m) => m.SearchDialog),
  { ssr: false }
)

export function Search({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false)
  // Becomes true on first open and stays true, so the dialog code loads once.
  const [loaded, setLoaded] = React.useState(false)
  if (open && !loaded) setLoaded(true)

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (
        (e.key === "k" && (e.metaKey || e.ctrlKey)) ||
        (e.key === "/" && !isTyping(e.target))
      ) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search documentation"
        className={cn(
          "inline-flex h-8 w-8 items-center justify-center gap-2 rounded-lg border bg-muted/50 text-sm text-muted-foreground transition-colors duration-150 hover:bg-muted sm:w-56 sm:justify-start sm:pr-1.5 sm:pl-2.5",
          className
        )}
      >
        <SearchIcon className="size-3.5" />
        <span className="hidden flex-1 text-left sm:inline">
          Search docs...
        </span>
        <KbdGroup className="hidden sm:inline-flex">
          <Kbd>Ctrl</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </button>
      {/* The dialog code loads on first open, not with every page. */}
      {loaded && <SearchDialog open={open} onOpenChange={setOpen} />}
    </>
  )
}

function isTyping(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable ||
      ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
  )
}
