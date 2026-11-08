"use client"

import * as React from "react"
import { GlobeIcon, PaperclipIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  PromptInput,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from "@/components/ui/prompt-input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PromptInputDemo() {
  const [value, setValue] = React.useState("")
  const [streaming, setStreaming] = React.useState(false)
  const timer = React.useRef<ReturnType<typeof setTimeout>>(undefined)

  React.useEffect(() => () => clearTimeout(timer.current), [])

  function submit(event: React.FormEvent) {
    event.preventDefault()
    if (!value.trim()) return
    setValue("")
    setStreaming(true)
    timer.current = setTimeout(() => setStreaming(false), 2500)
  }

  function stop() {
    clearTimeout(timer.current)
    setStreaming(false)
  }

  return (
    <PromptInput onSubmit={submit} className="max-w-xl">
      <PromptInputTextarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Ask anything…"
        aria-label="Message"
      />
      <PromptInputToolbar>
        <PromptInputTools>
          <Button type="button" variant="ghost" size="icon-sm" aria-label="Attach file">
            <PaperclipIcon />
          </Button>
          <Button type="button" variant="ghost" size="sm">
            <GlobeIcon />
            Search
          </Button>
          <Select defaultValue="fast">
            <SelectTrigger size="sm" className="border-none bg-transparent shadow-none hover:bg-accent dark:bg-transparent">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fast">Fast</SelectItem>
              <SelectItem value="balanced">Balanced</SelectItem>
              <SelectItem value="deep">Deep</SelectItem>
            </SelectContent>
          </Select>
        </PromptInputTools>
        <PromptInputSubmit streaming={streaming} onStop={stop} disabled={!streaming && !value.trim()} />
      </PromptInputToolbar>
    </PromptInput>
  )
}
