"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { CheckCircle2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"

type Toast = { id: number; title: string; text: string }

const messages = [
  { title: "Invoice sent", text: "Sent to billing@acme.com." },
  { title: "Changes saved", text: "Your profile is up to date." },
  { title: "Export ready", text: "report-q3.csv is ready to download." },
  { title: "Member invited", text: "maya@acme.com will get an email." },
]

const GAP = 8
const HEIGHT = 64
const spring = { type: "spring", duration: 0.4, bounce: 0 } as const

export default function MotionToastStackDemo() {
  const [toasts, setToasts] = React.useState<Toast[]>([])
  const [expanded, setExpanded] = React.useState(false)
  const count = React.useRef(0)

  function add() {
    const m = messages[count.current % messages.length]
    count.current += 1
    setToasts((t) => [{ id: count.current, ...m }, ...t].slice(0, 5))
  }

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-6">
      <Button variant="outline" onClick={add}>
        Show a toast
      </Button>
      <ol
        className="relative h-56 w-full"
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        <AnimatePresence initial={false}>
          {toasts.map((t, i) => {
            const hidden = i > 2
            return (
              <motion.li
                key={t.id}
                initial={{ opacity: 0, y: 48, scale: 1 }}
                animate={{
                  opacity: hidden ? 0 : 1,
                  y: expanded ? -i * (HEIGHT + GAP) : -i * 10,
                  scale: expanded ? 1 : 1 - i * 0.05,
                }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
                transition={spring}
                style={{ zIndex: toasts.length - i, transformOrigin: "bottom center" }}
                className="absolute inset-x-0 bottom-0 flex h-16 items-center gap-3 rounded-xl border bg-popover px-4 shadow-lg shadow-black/[0.06]"
              >
                <CheckCircle2Icon className="size-4 shrink-0 text-primary" />
                <div className="min-w-0">
                  <p className="text-sm font-medium">{t.title}</p>
                  <p className="truncate text-sm text-muted-foreground">{t.text}</p>
                </div>
              </motion.li>
            )
          })}
        </AnimatePresence>
      </ol>
      <p className="text-xs text-muted-foreground">Add a few, then hover the stack.</p>
    </div>
  )
}
