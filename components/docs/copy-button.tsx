"use client"

import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function CopyButton({
  value,
  className,
}: {
  value: string
  className?: string
}) {
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 1600)
    return () => clearTimeout(t)
  }, [copied])

  return (
    <Button
      size="icon-sm"
      variant="ghost"
      aria-label={copied ? "Copied" : "Copy code"}
      className={cn("relative text-muted-foreground", className)}
      onClick={() => {
        navigator.clipboard.writeText(value).then(() => setCopied(true))
      }}
    >
      {/* Icons cross-fade with a touch of blur so the swap reads as one motion. */}
      <CopyIcon
        className={cn(
          "absolute transition-[opacity,filter,transform] duration-200 ease-out",
          copied ? "scale-75 opacity-0 blur-[2px]" : "scale-100 opacity-100 blur-0"
        )}
      />
      <CheckIcon
        className={cn(
          "absolute text-foreground transition-[opacity,filter,transform] duration-200 ease-out",
          copied ? "scale-100 opacity-100 blur-0" : "scale-75 opacity-0 blur-[2px]"
        )}
      />
    </Button>
  )
}
