"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { CheckIcon, CopyIcon, Loader2Icon, PauseIcon, PlayIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

const swap = {
  initial: { opacity: 0, filter: "blur(4px)", y: 6 },
  animate: { opacity: 1, filter: "blur(0px)", y: 0 },
  exit: { opacity: 0, filter: "blur(4px)", y: -6 },
  transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] as const },
}

export default function MotionCrossfadeDemo() {
  const [copied, setCopied] = React.useState(false)
  const [state, setState] = React.useState<"idle" | "saving" | "saved">("idle")
  const [playing, setPlaying] = React.useState(false)

  function copy() {
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  function save() {
    setState("saving")
    setTimeout(() => setState("saved"), 1000)
    setTimeout(() => setState("idle"), 2400)
  }

  const label = { idle: "Save changes", saving: "Saving", saved: "Saved" }[state]

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button variant="outline" onClick={copy} className="w-28 overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span key={copied ? "c" : "n"} {...swap} className="flex items-center gap-2">
            {copied ? <CheckIcon /> : <CopyIcon />}
            {copied ? "Copied" : "Copy"}
          </motion.span>
        </AnimatePresence>
      </Button>

      <Button onClick={save} disabled={state === "saving"} className="w-36 overflow-hidden disabled:opacity-100">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span key={state} {...swap} className="flex items-center gap-2">
            {state === "saving" && <Loader2Icon className="animate-spin" />}
            {state === "saved" && <CheckIcon />}
            {label}
          </motion.span>
        </AnimatePresence>
      </Button>

      <Button
        variant="outline"
        size="icon"
        aria-label={playing ? "Pause" : "Play"}
        onClick={() => setPlaying((p) => !p)}
        className="overflow-hidden"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={playing ? "pause" : "play"}
            initial={{ opacity: 0, scale: 0.6, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.6, filter: "blur(4px)" }}
            transition={{ duration: 0.18 }}
            className="flex"
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </motion.span>
        </AnimatePresence>
      </Button>
    </div>
  )
}
