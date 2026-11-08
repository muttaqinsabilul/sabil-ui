"use client"

import * as React from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

const tabs = ["Overview", "Analytics", "Reports", "Settings"]

export default function MotionTabIndicatorDemo() {
  const [active, setActive] = React.useState(tabs[0])
  const [plan, setPlan] = React.useState("Monthly")

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-8">
      {/* Segmented: a white pill slides on the slate track. */}
      <div className="flex w-full gap-0.5 rounded-lg bg-muted p-0.5">
        {["Monthly", "Yearly"].map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPlan(p)}
            className={cn(
              "relative h-8 flex-1 rounded-md text-sm font-medium transition-colors duration-150",
              plan === p ? "text-secondary-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {plan === p && (
              <motion.span
                layoutId="segment-pill"
                transition={{ type: "spring", duration: 0.35, bounce: 0.15 }}
                className="absolute inset-0 rounded-md bg-background shadow-xs dark:bg-white/10"
              />
            )}
            <span className="relative">{p}</span>
          </button>
        ))}
      </div>

      {/* Line: an underline slides under the active tab. */}
      <div className="flex w-full border-b">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setActive(t)}
            className={cn(
              "relative px-3 pb-2.5 text-sm font-medium transition-colors duration-150",
              active === t ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {t}
            {active === t && (
              <motion.span
                layoutId="tab-underline"
                transition={{ type: "spring", duration: 0.35, bounce: 0.15 }}
                className="absolute inset-x-1 -bottom-px h-0.5 rounded-full bg-primary"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
