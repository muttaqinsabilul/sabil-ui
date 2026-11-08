"use client"

import * as React from "react"
import { FileIcon, GlobeIcon, PaperclipIcon, XIcon } from "lucide-react"

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type PickedFile = { id: string; file: File; preview?: string }

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

function fileType(file: File) {
  return file.name.split(".").pop()?.toUpperCase() ?? "FILE"
}

export default function PromptInputDemo() {
  const [value, setValue] = React.useState("")
  const [files, setFiles] = React.useState<PickedFile[]>([])
  const [streaming, setStreaming] = React.useState(false)
  const fileInput = React.useRef<HTMLInputElement>(null)
  const timer = React.useRef<ReturnType<typeof setTimeout>>(undefined)
  const filesRef = React.useRef(files)
  filesRef.current = files

  // Free image previews when the demo unmounts.
  React.useEffect(
    () => () => {
      clearTimeout(timer.current)
      filesRef.current.forEach((f) => f.preview && URL.revokeObjectURL(f.preview))
    },
    []
  )

  function addFiles(list: FileList | null) {
    if (!list) return
    const picked = Array.from(list).map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
    }))
    setFiles((prev) => [...prev, ...picked])
  }

  function removeFile(id: string) {
    setFiles((prev) => {
      const target = prev.find((f) => f.id === id)
      if (target?.preview) URL.revokeObjectURL(target.preview)
      return prev.filter((f) => f.id !== id)
    })
  }

  function submit(event: React.FormEvent) {
    event.preventDefault()
    if (!value.trim() && files.length === 0) return
    files.forEach((f) => f.preview && URL.revokeObjectURL(f.preview))
    setValue("")
    setFiles([])
    setStreaming(true)
    timer.current = setTimeout(() => setStreaming(false), 2500)
  }

  function stop() {
    clearTimeout(timer.current)
    setStreaming(false)
  }

  const empty = !value.trim() && files.length === 0

  return (
    <PromptInput onSubmit={submit} className="max-w-xl">
      {files.length > 0 && (
        <AttachmentGroup className="px-1">
          {files.map(({ id, file, preview }) => (
            <Attachment key={id} size="sm" className="w-52">
              <AttachmentMedia variant={preview ? "image" : "icon"}>
                {preview ? <img src={preview} alt={file.name} /> : <FileIcon />}
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>{file.name}</AttachmentTitle>
                <AttachmentDescription>
                  {fileType(file)} · {formatSize(file.size)}
                </AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions>
                <AttachmentAction aria-label={`Remove ${file.name}`} onClick={() => removeFile(id)}>
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
        <PromptInputSubmit streaming={streaming} onStop={stop} disabled={!streaming && empty} />
      </PromptInputToolbar>
    </PromptInput>
  )
}
