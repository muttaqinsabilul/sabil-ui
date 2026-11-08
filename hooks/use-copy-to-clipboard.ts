"use client"

import * as React from "react"

export function useCopyToClipboard({ timeout = 2000 }: { timeout?: number } = {}) {
  const [isCopied, setIsCopied] = React.useState(false)

  const copyToClipboard = React.useCallback(
    (value: string) => {
      if (!value || typeof navigator === "undefined" || !navigator.clipboard) return
      navigator.clipboard.writeText(value).then(() => {
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), timeout)
      })
    },
    [timeout]
  )

  return { isCopied, copyToClipboard }
}
