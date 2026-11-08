"use client"

import * as React from "react"
import { motion } from "motion/react"
import { FileIcon, FolderIcon, RotateCcwIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

const files = [
  { name: "app", folder: true },
  { name: "components", folder: true },
  { name: "lib", folder: true },
  { name: "globals.css", folder: false },
  { name: "package.json", folder: false },
  { name: "README.md", folder: false },
]

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
}

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.23, 1, 0.32, 1] as const } },
}

export default function MotionStaggerDemo() {
  const [key, setKey] = React.useState(0)

  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <motion.ul
        key={key}
        variants={list}
        initial="hidden"
        animate="show"
        className="flex flex-col rounded-xl border bg-card p-1.5 shadow-xs"
      >
        {files.map((f) => (
          <motion.li key={f.name} variants={item} className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm hover:bg-accent">
            {f.folder ? <FolderIcon className="size-4 text-primary" /> : <FileIcon className="size-4 text-muted-foreground" />}
            {f.name}
          </motion.li>
        ))}
      </motion.ul>
      <Button variant="outline" size="sm" className="self-center" onClick={() => setKey((k) => k + 1)}>
        <RotateCcwIcon data-icon="inline-start" />
        Replay
      </Button>
    </div>
  )
}
