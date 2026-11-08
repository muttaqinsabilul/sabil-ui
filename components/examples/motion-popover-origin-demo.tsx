"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

/**
 * Two identical menus. The left one scales from its center, the right one
 * from the top-left corner where its trigger is. Radix components expose the
 * right origin as var(--radix-<component>-content-transform-origin).
 */
export default function MotionPopoverOriginDemo() {
  return (
    <div className="grid w-full max-w-md grid-cols-2 gap-8">
      <Menu label="Center" origin="center" />
      <Menu label="Trigger" origin="top left" />
    </div>
  )
}

function Menu({ label, origin }: { label: string; origin: string }) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="relative flex h-48 flex-col items-start gap-2">
      <p className="text-xs text-muted-foreground">origin: {origin}</p>
      <Button variant="outline" size="sm" onClick={() => setOpen((o) => !o)}>
        {label}
      </Button>
      <div
        style={{ transformOrigin: origin, transition: "transform 300ms var(--ease-out), opacity 300ms var(--ease-out)" }}
        className={cn(
          "w-40 rounded-xl bg-popover p-1 shadow-lg ring-1 shadow-black/[0.06] ring-overlay-border",
          open ? "scale-100 opacity-100" : "pointer-events-none scale-75 opacity-0"
        )}
      >
        {["Rename", "Duplicate", "Archive"].map((i) => (
          <div key={i} className="rounded-lg px-2.5 py-1.5 text-sm">
            {i}
          </div>
        ))}
      </div>
    </div>
  )
}
