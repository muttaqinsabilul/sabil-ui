"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { CheckCircle2Icon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

const ease = [0.23, 1, 0.32, 1] as const

export default function MotionEnterExitDemo() {
  const [show, setShow] = React.useState(true)

  return (
    <div className="flex h-40 w-full max-w-sm flex-col items-center gap-4">
      <Button variant="outline" size="sm" onClick={() => setShow((s) => !s)}>
        {show ? "Hide" : "Show"} banner
      </Button>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.2, ease } }}
            exit={{ opacity: 0, scale: 0.97, filter: "blur(2px)", transition: { duration: 0.15, ease } }}
            className="flex w-full items-start gap-3 rounded-xl border bg-card p-4 shadow-sm"
          >
            <CheckCircle2Icon className="mt-0.5 size-4 text-primary" />
            <div className="flex-1">
              <p className="text-sm font-medium">Changes saved</p>
              <p className="text-sm text-muted-foreground">Your profile is up to date.</p>
            </div>
            <Button variant="ghost" size="icon-xs" aria-label="Close" onClick={() => setShow(false)}>
              <XIcon />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
