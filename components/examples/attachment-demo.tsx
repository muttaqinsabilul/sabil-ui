"use client"

import * as React from "react"
import { FileTextIcon, GlobeIcon, PaperclipIcon } from "lucide-react"

import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"
import { Button } from "@/components/ui/button"
import {
  PromptInput,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from "@/components/ui/prompt-input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const files = [
  {
    name: "workspace.png",
    meta: "PNG · 820 KB",
    src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=300&auto=format&fit=crop&q=80",
  },
  { name: "brief.pdf", meta: "PDF · 1.4 MB" },
]

/** Files attached to a chat message, shown above the prompt. */
export default function AttachmentDemo() {
  const [value, setValue] = React.useState("Can you turn this brief into a landing page?")
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
      <AttachmentGroup className="px-1">
        {files.map((file) => (
          <Attachment key={file.name} size="sm" className="w-52">
            <AttachmentMedia variant={file.src ? "image" : "icon"}>
              {file.src ? <img src={file.src} alt={file.name} /> : <FileTextIcon />}
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>{file.name}</AttachmentTitle>
              <AttachmentDescription>{file.meta}</AttachmentDescription>
            </AttachmentContent>
          </Attachment>
        ))}
      </AttachmentGroup>
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
            <SelectTrigger size="sm" aria-label="Model" className="border-none bg-transparent shadow-none hover:bg-accent dark:bg-transparent">
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
