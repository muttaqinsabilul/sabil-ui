"use client"

import * as React from "react"
import { cn } from "cn"
import { ArrowUpIcon, SquareIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

function PromptInput({ className, ...props }: React.ComponentProps<"form">) {
  return (
    <form
      data-slot="prompt-input"
      className={cn(
        "flex w-full flex-col gap-1 rounded-2xl border border-input bg-background p-2 shadow-xs transition-[border-color,box-shadow] duration-150 ease-out focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 has-[textarea:disabled]:opacity-60 dark:bg-input/30",
        className
      )}
      {...props}
    />
  )
}

/** Grows with its content. Enter submits the form, Shift+Enter adds a line. */
function PromptInputTextarea({
  className,
  onKeyDown,
  ...props
}: React.ComponentProps<"textarea">) {
  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    onKeyDown?.(event)
    if (event.defaultPrevented) return
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault()
      event.currentTarget.form?.requestSubmit()
    }
  }

  return (
    <textarea
      data-slot="prompt-input-textarea"
      rows={1}
      onKeyDown={handleKeyDown}
      className={cn(
        "field-sizing-content max-h-48 min-h-10 w-full resize-none bg-transparent px-2 py-1.5 text-base outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed md:text-sm",
        className
      )}
      {...props}
    />
  )
}

function PromptInputToolbar({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="prompt-input-toolbar"
      className={cn("flex items-center justify-between gap-2", className)}
      {...props}
    />
  )
}

function PromptInputTools({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="prompt-input-tools"
      className={cn("flex min-w-0 items-center gap-1", className)}
      {...props}
    />
  )
}

/** Send button. While `streaming`, it turns into a stop button. */
function PromptInputSubmit({
  streaming = false,
  onStop,
  className,
  ...props
}: React.ComponentProps<typeof Button> & { streaming?: boolean; onStop?: () => void }) {
  if (streaming) {
    return (
      <Button
        data-slot="prompt-input-submit"
        type="button"
        size="icon-sm"
        aria-label="Stop"
        onClick={onStop}
        className={cn("rounded-full", className)}
        {...props}
      >
        <SquareIcon className="size-3 fill-current" />
      </Button>
    )
  }

  return (
    <Button
      data-slot="prompt-input-submit"
      type="submit"
      size="icon-sm"
      aria-label="Send"
      className={cn("rounded-full", className)}
      {...props}
    >
      <ArrowUpIcon />
    </Button>
  )
}

export { PromptInput, PromptInputTextarea, PromptInputToolbar, PromptInputTools, PromptInputSubmit }
