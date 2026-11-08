"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Reasoning, ReasoningContent, ReasoningTrigger } from "@/components/ui/reasoning"

const thought =
  "Reading the error log. The build fails in the type check step. The types folder was written by a dev server, so it is stale. Deleting it and building again should fix it."

export default function ReasoningStreaming() {
  const [text, setText] = React.useState("")
  const [streaming, setStreaming] = React.useState(false)
  const [open, setOpen] = React.useState(true)
  const timer = React.useRef<ReturnType<typeof setInterval>>(undefined)

  React.useEffect(() => () => clearInterval(timer.current), [])

  function run() {
    const words = thought.split(" ")
    let i = 0
    setText("")
    setOpen(true)
    setStreaming(true)
    timer.current = setInterval(() => {
      i++
      setText(words.slice(0, i).join(" "))
      if (i >= words.length) {
        clearInterval(timer.current)
        setStreaming(false)
        setOpen(false)
      }
    }, 90)
  }

  return (
    <div className="flex w-full max-w-md flex-col items-start gap-4">
      <Reasoning open={open} onOpenChange={setOpen}>
        <ReasoningTrigger streaming={streaming} duration={4} />
        <ReasoningContent>{text || "Press Run to start."}</ReasoningContent>
      </Reasoning>
      <Button variant="outline" size="sm" onClick={run} disabled={streaming}>
        Run
      </Button>
    </div>
  )
}
