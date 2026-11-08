"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { FileTextIcon, SearchIcon, SparklesIcon } from "lucide-react"

import { motionPages } from "@/lib/motion"
import { allPages } from "@/lib/registry"
import { cn } from "@/lib/utils"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Kbd, KbdGroup } from "@/components/ui/kbd"

export function Search({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

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

  const docs = allPages.filter((p) => !p.href.startsWith("/docs/components/"))
  const comps = allPages.filter((p) => p.href.startsWith("/docs/components/"))

  function go(href: string) {
    setOpen(false)
    router.push(href)
  }

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
      {/* Opened from the keyboard many times a day: no enter/exit animation. */}
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search documentation"
        className="sm:max-w-lg data-open:animate-none data-closed:animate-none"
      >
        <Command>
          <CommandInput placeholder="Search components and pages..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Getting Started">
              {docs.map((p) => (
                <CommandItem
                  key={p.href}
                  value={p.title}
                  onSelect={() => go(p.href)}
                >
                  <FileTextIcon />
                  {p.title}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="Motion">
            {motionPages.map((p) => (
              <CommandItem key={p.href} value={`Motion ${p.title}`} onSelect={() => go(p.href)}>
                <SparklesIcon />
                {p.title}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Components">
              {comps.map((p) => (
                <CommandItem
                  key={p.href}
                  value={p.title}
                  onSelect={() => go(p.href)}
                >
                  <span className="size-4 rounded-[5px] border border-current opacity-40" />
                  {p.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
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
