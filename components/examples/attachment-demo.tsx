"use client"

import * as React from "react"
import { FileTextIcon, PaperclipIcon, XIcon } from "lucide-react"

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
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

type Item = { id: string; name: string; meta: string; src?: string; local?: boolean }

const initial: Item[] = [
  {
    id: "1",
    name: "workspace.png",
    meta: "PNG · 820 KB",
    src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=300&auto=format&fit=crop&q=80",
  },
  { id: "2", name: "brief.pdf", meta: "PDF · 1.4 MB" },
]

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

/** Files attached to a chat message before it is sent. */
export default function AttachmentDemo() {
  const [items, setItems] = React.useState(initial)
  const [value, setValue] = React.useState("Can you turn this brief into a landing page?")
  const fileInput = React.useRef<HTMLInputElement>(null)

  function addFiles(list: FileList | null) {
    if (!list) return
    const added = Array.from(list).map((file) => ({
      id: crypto.randomUUID(),
      name: file.name,
      meta: `${file.name.split(".").pop()?.toUpperCase() ?? "FILE"} · ${formatSize(file.size)}`,
      src: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
      local: true,
    }))
    setItems((prev) => [...prev, ...added])
  }

  function remove(id: string) {
    setItems((prev) => {
      const item = prev.find((i) => i.id === id)
      if (item?.local && item.src) URL.revokeObjectURL(item.src)
      return prev.filter((i) => i.id !== id)
    })
  }

  return (
    <PromptInput onSubmit={(e) => e.preventDefault()} className="max-w-xl">
      {items.length > 0 && (
        <AttachmentGroup className="px-1">
          {items.map((item) => (
            <Attachment key={item.id} size="sm" className="w-52">
              <AttachmentMedia variant={item.src ? "image" : "icon"}>
                {item.src ? <img src={item.src} alt={item.name} /> : <FileTextIcon />}
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>{item.name}</AttachmentTitle>
                <AttachmentDescription>{item.meta}</AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions>
                <AttachmentAction aria-label={`Remove ${item.name}`} onClick={() => remove(item.id)}>
                  <XIcon />
                </AttachmentAction>
              </AttachmentActions>
            </Attachment>
          ))}
        </AttachmentGroup>
      )}
      <PromptInputTextarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Ask anything…"
        aria-label="Message"
      />
      <PromptInputToolbar>
        <PromptInputTools>
          <input
            ref={fileInput}
            type="file"
            multiple
            hidden
            onChange={(e) => {
              addFiles(e.target.files)
              e.target.value = ""
            }}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Attach files"
            onClick={() => fileInput.current?.click()}
          >
            <PaperclipIcon />
          </Button>
        </PromptInputTools>
        <PromptInputSubmit disabled={!value.trim() && items.length === 0} />
      </PromptInputToolbar>
    </PromptInput>
  )
}
