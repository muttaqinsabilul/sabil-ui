"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export type TocItem = { id: string; title: string; depth?: 2 | 3 }

/** "On this page" list. Highlights the heading closest to the top of the viewport. */
export function Toc({ items }: { items: TocItem[] }) {
  const [active, setActive] = React.useState(items[0]?.id)

  React.useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => !!el)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length) setActive(visible[0].target.id)
      },
      { rootMargin: "-80px 0px -70% 0px" }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [items])

  if (!items.length) return null

  return (
    <div className="flex flex-col gap-2 text-sm">
      <p className="text-xs font-medium text-muted-foreground">On this page</p>
      <ul className="flex flex-col gap-0.5 border-l">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "-ml-px block border-l border-transparent py-1 text-foreground/60 transition-colors duration-150 hover:text-foreground",
                item.depth === 3 ? "pl-6" : "pl-3",
                active === item.id && "border-foreground font-medium text-foreground"
              )}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
