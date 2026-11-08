"use client"

import * as React from "react"
import { AnimatePresence, motion, type PanInfo } from "motion/react"

import { Button } from "@/components/ui/button"

const drawerEase = [0.32, 0.72, 0, 1] as const

/** A bottom sheet inside a phone frame. Drag it down, or flick it. */
export default function MotionDrawerDemo() {
  const [open, setOpen] = React.useState(false)
  const sheet = React.useRef<HTMLDivElement>(null)

  function onDragEnd(_: unknown, info: PanInfo) {
    const height = sheet.current?.offsetHeight ?? 300
    if (info.offset.y > height * 0.3 || info.velocity.y > 500) setOpen(false)
  }

  return (
    <div className="relative h-[440px] w-[260px] overflow-hidden rounded-[32px] border-[6px] border-foreground/90 bg-background shadow-xl">
      <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
        <p className="text-sm font-medium">Order #1043</p>
        <p className="text-xs text-muted-foreground">Arriving tomorrow</p>
        <Button size="sm" onClick={() => setOpen(true)}>
          Manage order
        </Button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="absolute inset-0 bg-black/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              ref={sheet}
              className="absolute inset-x-0 bottom-0 flex cursor-grab flex-col gap-3 rounded-t-3xl bg-background p-4 pb-6 shadow-2xl active:cursor-grabbing"
              initial={{ y: "100%" }}
              animate={{ y: 0, transition: { duration: 0.4, ease: drawerEase } }}
              exit={{ y: "100%", transition: { duration: 0.25, ease: drawerEase } }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0.1, bottom: 1 }}
              onDragEnd={onDragEnd}
            >
              <div className="mx-auto h-1.5 w-10 rounded-full bg-muted-foreground/30" />
              <p className="text-sm font-medium">Manage order</p>
              {["Change address", "Reschedule delivery", "Cancel order"].map((a) => (
                <Button key={a} variant="outline" size="sm" className="justify-start">
                  {a}
                </Button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
