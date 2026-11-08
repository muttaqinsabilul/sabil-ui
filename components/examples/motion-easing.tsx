"use client"

import * as React from "react"
import { PlayIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

const curves = [
  { name: "ease (CSS default)", value: "ease" },
  { name: "--ease-out", value: "var(--ease-out)" },
  { name: "--ease-in-out", value: "var(--ease-in-out)" },
  { name: "--ease-drawer", value: "var(--ease-drawer)" },
]

/** Compare the foundation curves against the CSS default, same duration. */
export default function MotionEasing() {
  const [on, setOn] = React.useState(false)

  return (
    <div className="flex w-full max-w-lg flex-col gap-4">
      {curves.map((c) => (
        <div key={c.name} className="flex flex-col gap-1.5">
          <code className="font-mono text-xs text-muted-foreground">{c.name}</code>
          <div className="relative h-8 rounded-lg surface-sunken">
            <div
              className="absolute top-1 left-1 size-6 rounded-md surface-primary"
              style={{
                transform: on ? "translateX(calc(min(32rem, 80vw) - 4.5rem))" : "translateX(0)",
                transition: `transform 600ms ${c.value}`,
              }}
            />
          </div>
        </div>
      ))}
      <Button variant="outline" className="self-start" onClick={() => setOn((v) => !v)}>
        <PlayIcon data-icon="inline-start" />
        Play
      </Button>
    </div>
  )
}
