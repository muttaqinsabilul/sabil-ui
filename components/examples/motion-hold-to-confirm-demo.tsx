"use client"

import * as React from "react"
import { CheckIcon, Trash2Icon } from "lucide-react"

const HOLD_MS = 1500

/**
 * The red overlay is revealed with clip-path. While pressed it fills over
 * 1.5s linear; on release it snaps back in 200ms. A timer confirms the action.
 */
export default function MotionHoldToConfirmDemo() {
  const [done, setDone] = React.useState(false)
  const timer = React.useRef<ReturnType<typeof setTimeout>>(undefined)

  function start() {
    if (done) return
    timer.current = setTimeout(() => {
      setDone(true)
      setTimeout(() => setDone(false), 2000)
    }, HOLD_MS)
  }

  function cancel() {
    clearTimeout(timer.current)
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <style>{`
        .hold-overlay { clip-path: inset(0 100% 0 0); transition: clip-path 200ms var(--ease-out); }
        .hold-button:active .hold-overlay { clip-path: inset(0 0 0 0); transition: clip-path ${HOLD_MS}ms linear; }
      `}</style>
      <button
        type="button"
        onPointerDown={start}
        onPointerUp={cancel}
        onPointerLeave={cancel}
        className="hold-button relative h-10 w-48 overflow-hidden rounded-lg bg-destructive/10 text-sm font-medium text-destructive transition-transform duration-150 ease-out select-none active:scale-[0.97]"
      >
        <span className="flex items-center justify-center gap-2">
          <Trash2Icon className="size-4" />
          Hold to delete
        </span>
        <span
          aria-hidden="true"
          className={
            done
              ? "absolute inset-0 flex items-center justify-center gap-2 bg-destructive text-white"
              : "hold-overlay absolute inset-0 flex items-center justify-center gap-2 bg-destructive text-white"
          }
        >
          {done ? <CheckIcon className="size-4" /> : <Trash2Icon className="size-4" />}
          {done ? "Deleted" : "Hold to delete"}
        </span>
      </button>
      <p className="text-xs text-muted-foreground">Press and hold for 1.5 seconds.</p>
    </div>
  )
}
