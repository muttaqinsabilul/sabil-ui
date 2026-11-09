"use client"

import { useRouter } from "next/navigation"
import { FileTextIcon, SparklesIcon } from "lucide-react"

import { motionPages } from "@/lib/motion"
import { allPages } from "@/lib/registry"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

const docs = allPages.filter((p) => !p.href.startsWith("/docs/components/"))
const comps = allPages.filter((p) => p.href.startsWith("/docs/components/"))

export function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const router = useRouter()

  function go(href: string) {
    onOpenChange(false)
    router.push(href)
  }

  // Opened from the keyboard many times a day: no enter/exit animation.
  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
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
              <CommandItem
                key={p.href}
                value={`Motion ${p.title}`}
                onSelect={() => go(p.href)}
              >
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
  )
}
