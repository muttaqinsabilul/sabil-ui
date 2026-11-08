"use client"

import * as React from "react"
import { CheckIcon, ChevronDownIcon, CopyIcon, FileTextIcon, SparklesIcon } from "lucide-react"

import { siteConfig } from "@/lib/registry"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

/** "Copy page" for AI assistants, plus links to the Markdown twin. */
export function PageActions({ href }: { href: string }) {
  const md = `${href}.md`
  const [copied, setCopied] = React.useState(false)

  async function copy() {
    try {
      // Passing a promise keeps the click's permission in Safari while the file loads.
      if (typeof ClipboardItem !== "undefined" && navigator.clipboard.write) {
        const blob = fetch(md).then((r) => r.text()).then((t) => new Blob([t], { type: "text/plain" }))
        await navigator.clipboard.write([new ClipboardItem({ "text/plain": blob })])
      } else {
        await navigator.clipboard.writeText(await fetch(md).then((r) => r.text()))
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      // Clipboard blocked (e.g. page not focused): open the Markdown instead.
      window.open(md, "_blank", "noreferrer")
    }
  }

  const prompt = encodeURIComponent(
    `Read ${siteConfig.url}${md} and ${siteConfig.url}/docs/ai.md, then help me build with Sabil UI.`
  )

  return (
    <ButtonGroup>
      <Button variant="outline" size="sm" onClick={copy}>
        {copied ? <CheckIcon data-icon="inline-start" /> : <CopyIcon data-icon="inline-start" />}
        {copied ? "Copied" : "Copy page"}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon-sm" aria-label="More page actions">
            <ChevronDownIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem asChild>
            <a href={md} target="_blank" rel="noreferrer">
              <FileTextIcon />
              View as Markdown
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a href={`https://claude.ai/new?q=${prompt}`} target="_blank" rel="noreferrer">
              <SparklesIcon />
              Open in Claude
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a href={`https://chatgpt.com/?q=${prompt}`} target="_blank" rel="noreferrer">
              <SparklesIcon />
              Open in ChatGPT
            </a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}
