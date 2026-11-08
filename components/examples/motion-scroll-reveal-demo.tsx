"use client"

import * as React from "react"
import { motion } from "motion/react"
import { GaugeIcon, LayersIcon, LockIcon, SparklesIcon, UsersIcon, ZapIcon } from "lucide-react"

const features = [
  { icon: ZapIcon, title: "Fast by default", text: "Pages load in under a second on a 4G connection." },
  { icon: LayersIcon, title: "One foundation", text: "Every component reads the same tokens." },
  { icon: LockIcon, title: "Secure", text: "SSO, audit logs and fine-grained roles." },
  { icon: UsersIcon, title: "Built for teams", text: "Comments, mentions and shared workspaces." },
  { icon: GaugeIcon, title: "Observable", text: "Traces and metrics for every request." },
  { icon: SparklesIcon, title: "Delightful", text: "Motion that helps instead of decorating." },
]

/** Scroll inside the box. Each card reveals once when it enters view. */
export default function MotionScrollRevealDemo() {
  const root = React.useRef<HTMLDivElement>(null)

  return (
    <div ref={root} className="h-80 w-full max-w-md overflow-y-auto rounded-xl border bg-card p-4 [scrollbar-width:thin]">
      <p className="pt-24 pb-28 text-center text-sm text-muted-foreground">Scroll down ↓</p>
      <div className="flex flex-col gap-3">
        {features.map((f) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ root, once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="flex gap-3 rounded-xl border bg-background p-4"
          >
            <f.icon className="mt-0.5 size-4 shrink-0 text-primary" />
            <div>
              <p className="text-sm font-medium">{f.title}</p>
              <p className="text-sm text-muted-foreground">{f.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <p className="py-16 text-center text-xs text-muted-foreground">End</p>
    </div>
  )
}
