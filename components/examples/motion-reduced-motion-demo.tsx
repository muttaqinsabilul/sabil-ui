"use client"

import * as React from "react"
import { motion } from "motion/react"
import { RotateCcwIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function MotionReducedMotionDemo() {
  // In a real app, read this with useReducedMotion() from "motion/react".
  const [reduce, setReduce] = React.useState(false)
  const [key, setKey] = React.useState(0)

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-6">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Switch id="reduce" checked={reduce} onCheckedChange={setReduce} />
          <Label htmlFor="reduce">Reduce motion</Label>
        </div>
        <Button variant="outline" size="sm" onClick={() => setKey((k) => k + 1)}>
          <RotateCcwIcon data-icon="inline-start" />
          Replay
        </Button>
      </div>
      <div className="flex w-full flex-col gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`${key}-${i}`}
            initial={{ opacity: 0, y: reduce ? 0 : 24, scale: reduce ? 1 : 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: reduce ? 0.2 : 0.5, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
            className="h-12 rounded-xl border bg-card shadow-xs"
          />
        ))}
      </div>
    </div>
  )
}
