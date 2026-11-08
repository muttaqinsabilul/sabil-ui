"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { ChevronRightIcon } from "lucide-react"

const sections = [
  {
    title: "Notifications",
    body: "Choose which events send you an email. Product updates, security alerts and weekly summaries can be turned off at any time.",
  },
  {
    title: "Privacy",
    body: "Your profile is visible to members of your workspace only. Public links expire after 30 days.",
  },
  {
    title: "Advanced",
    body: "Webhooks, API tokens and audit logs live here. Changes apply to every project in the workspace.",
  },
]

const ease = [0.77, 0, 0.175, 1] as const

export default function MotionCollapseDemo() {
  const [open, setOpen] = React.useState<number | null>(0)

  return (
    <div className="w-full max-w-md divide-y rounded-xl border bg-card shadow-xs">
      {sections.map((s, i) => {
        const isOpen = open === i
        return (
          <div key={s.title}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm font-medium"
            >
              <ChevronRightIcon
                className="size-4 text-muted-foreground transition-transform duration-200 ease-out"
                style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
              />
              {s.title}
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ height: { duration: 0.25, ease }, opacity: { duration: 0.2 } }}
                  className="overflow-hidden"
                >
                  <p className="px-4 pb-4 pl-10 text-sm leading-6 text-muted-foreground">{s.body}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
