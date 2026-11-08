"use client"

import * as React from "react"
import { CalendarIcon, CodeIcon, LightbulbIcon, PenLineIcon } from "lucide-react"

import { Suggestion, Suggestions } from "@/components/ui/suggestions"

const items = [
  { icon: PenLineIcon, label: "Write a launch email" },
  { icon: CodeIcon, label: "Explain this error" },
  { icon: CalendarIcon, label: "Plan my week" },
  { icon: LightbulbIcon, label: "Name my product" },
]

export default function SuggestionsDemo() {
  const [picked, setPicked] = React.useState<string | null>(null)

  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <Suggestions>
        {items.map(({ icon: Icon, label }) => (
          <Suggestion key={label} onClick={() => setPicked(label)}>
            <Icon />
            {label}
          </Suggestion>
        ))}
      </Suggestions>
      <p className="text-sm text-muted-foreground">{picked ? `Sent: ${picked}` : "Pick a suggestion."}</p>
    </div>
  )
}
