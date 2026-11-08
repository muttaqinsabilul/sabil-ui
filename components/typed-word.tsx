"use client"

import * as React from "react"
import { cn } from "cn"

/**
 * Types each word, waits, deletes it, then types the next one.
 * Screen readers get the first word only; reduced motion swaps words without typing.
 */
export function TypedWord({ words, className }: { words: string[]; className?: string }) {
  const [index, setIndex] = React.useState(0)
  const [text, setText] = React.useState(words[0])
  const [deleting, setDeleting] = React.useState(false)

  React.useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const word = words[index]
    let delay: number
    let next: () => void

    if (reduce) {
      delay = 5000
      next = () => {
        const i = (index + 1) % words.length
        setIndex(i)
        setText(words[i])
      }
    } else if (!deleting && text === word) {
      delay = 5000 // hold the full word
      next = () => setDeleting(true)
    } else if (deleting && text === "") {
      delay = 700
      next = () => {
        setDeleting(false)
        setIndex((index + 1) % words.length)
      }
    } else {
      delay = deleting ? 90 : 150
      next = () => setText(deleting ? text.slice(0, -1) : word.slice(0, text.length + 1))
    }

    const id = setTimeout(next, delay)
    return () => clearTimeout(id)
  }, [words, index, text, deleting])

  return (
    <span className={cn("whitespace-nowrap", className)}>
      <span className="sr-only">{words[0]}</span>
      <span aria-hidden="true">
        {text}
        <span className="ml-0.5 inline-block h-[0.85em] w-[3px] translate-y-[0.08em] animate-caret-blink rounded-full bg-primary align-baseline" />
      </span>
    </span>
  )
}
