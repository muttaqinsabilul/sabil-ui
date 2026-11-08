"use client"

import * as React from "react"
import { AnimatePresence, motion, useMotionValue, useTransform, type PanInfo } from "motion/react"
import { BellIcon, RotateCcwIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

const initial = [
  { id: 1, title: "Maya commented", text: "Looks great, ship it." },
  { id: 2, title: "Build passed", text: "main · 2m 14s" },
  { id: 3, title: "New sign-in", text: "Chrome on Windows, Jakarta" },
  { id: 4, title: "Invoice paid", text: "#1043 · $240.00" },
]

export default function MotionSwipeToDismissDemo() {
  const [items, setItems] = React.useState(initial)
  const [dir, setDir] = React.useState(1)

  function dismiss(id: number, direction: number) {
    setDir(direction)
    setItems((list) => list.filter((i) => i.id !== id))
  }

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-4">
      <ul className="relative flex min-h-72 w-full flex-col gap-2">
        <AnimatePresence mode="popLayout" custom={dir}>
          {items.map((item) => (
            <Card key={item.id} item={item} onDismiss={dismiss} />
          ))}
        </AnimatePresence>
      </ul>
      <Button variant="outline" size="sm" onClick={() => setItems(initial)} disabled={items.length === initial.length}>
        <RotateCcwIcon data-icon="inline-start" />
        Reset
      </Button>
    </div>
  )
}

const Card = React.forwardRef<
  HTMLLIElement,
  { item: (typeof initial)[number]; onDismiss: (id: number, dir: number) => void }
>(function Card({ item, onDismiss }, ref) {
  const x = useMotionValue(0)
  const opacity = useTransform(x, [-220, 0, 220], [0.2, 1, 0.2])

  function onDragEnd(_: unknown, info: PanInfo) {
    // Dismiss on distance (40% of a ~320px card) or on a quick flick.
    if (Math.abs(info.offset.x) > 128 || Math.abs(info.velocity.x) > 500) {
      onDismiss(item.id, Math.sign(info.offset.x || info.velocity.x))
    }
  }

  return (
    <motion.li
      ref={ref}
      layout
      style={{ x, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      dragTransition={{ bounceStiffness: 400, bounceDamping: 30 }}
      onDragEnd={onDragEnd}
      variants={{ exit: (d: number) => ({ x: d * 360, opacity: 0, transition: { duration: 0.2 } }) }}
      exit="exit"
      transition={{ layout: { type: "spring", duration: 0.35, bounce: 0.15 } }}
      className="flex cursor-grab items-center gap-3 rounded-xl border bg-card p-3.5 shadow-xs select-none active:cursor-grabbing"
    >
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
        <BellIcon className="size-4 text-muted-foreground" />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-medium">{item.title}</p>
        <p className="truncate text-sm text-muted-foreground">{item.text}</p>
      </div>
    </motion.li>
  )
})
