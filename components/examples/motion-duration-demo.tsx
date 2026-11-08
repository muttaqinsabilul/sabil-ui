"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const speeds = [120, 180, 300, 500]

export default function MotionDurationDemo() {
  return (
    <div className="grid w-full max-w-2xl grid-cols-2 gap-6 sm:grid-cols-4">
      {speeds.map((ms) => (
        <Menu key={ms} ms={ms} />
      ))}
    </div>
  )
}

function Menu({ ms }: { ms: number }) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="relative flex flex-col items-center gap-2">
      <Button variant="outline" size="sm" className="w-full" onClick={() => setOpen((o) => !o)}>
        {ms}ms
      </Button>
      <div
        className={cn(
          "w-full origin-top rounded-xl bg-popover p-1 shadow-lg ring-1 shadow-black/[0.06] ring-overlay-border",
          open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        )}
        style={{ transition: `transform ${ms}ms var(--ease-out), opacity ${ms}ms var(--ease-out)` }}
      >
        {["Profile", "Billing", "Settings"].map((i) => (
          <div key={i} className="rounded-lg px-2.5 py-1.5 text-sm">
            {i}
          </div>
        ))}
      </div>
    </div>
  )
}
