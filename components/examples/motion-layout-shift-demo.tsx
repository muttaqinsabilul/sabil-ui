"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

const cards = [
  { id: "a", title: "Northern Lights", place: "Tromsø, Norway", tone: "from-[#3c86ff] to-[#1447e6]" },
  { id: "b", title: "Desert Dunes", place: "Wadi Rum, Jordan", tone: "from-[#fdba74] to-[#ea580c]" },
  { id: "c", title: "Rice Terraces", place: "Bali, Indonesia", tone: "from-[#86efac] to-[#15803d]" },
  { id: "d", title: "Glacier Lake", place: "Banff, Canada", tone: "from-[#a5f3fc] to-[#0e7490]" },
]

const spring = { type: "spring", duration: 0.4, bounce: 0.1 } as const

export default function MotionLayoutShiftDemo() {
  const [open, setOpen] = React.useState<string | null>(null)
  const current = cards.find((c) => c.id === open)

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <div className="relative h-[400px] w-full max-w-md">
      <div className="grid grid-cols-2 gap-3">
        {cards.map((c) => (
          <motion.button
            key={c.id}
            type="button"
            layoutId={`card-${c.id}`}
            transition={spring}
            onClick={() => setOpen(c.id)}
            className="relative flex h-44 flex-col justify-end overflow-hidden rounded-2xl text-left"
          >
            <motion.div layoutId={`bg-${c.id}`} transition={spring} className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${c.tone}`} />
            <motion.div layoutId={`text-${c.id}`} transition={spring} className="relative p-3 text-white">
              <p className="text-sm font-medium">{c.title}</p>
              <p className="text-xs text-white/80">{c.place}</p>
            </motion.div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {current && (
          <>
            <motion.div
              className="absolute -inset-2 z-10 rounded-3xl bg-background/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(null)}
            />
            <motion.div
              layoutId={`card-${current.id}`}
              transition={spring}
              className="absolute inset-0 z-20 flex flex-col overflow-hidden rounded-2xl border bg-card shadow-2xl"
            >
              <div className="relative h-44 shrink-0">
                <motion.div layoutId={`bg-${current.id}`} transition={spring} className={`absolute inset-0 bg-gradient-to-br ${current.tone}`} />
                <motion.div layoutId={`text-${current.id}`} transition={spring} className="absolute bottom-0 p-4 text-white">
                  <p className="text-lg font-semibold">{current.title}</p>
                  <p className="text-sm text-white/80">{current.place}</p>
                </motion.div>
                <Button
                  variant="outline"
                  size="icon-sm"
                  aria-label="Close"
                  className="absolute top-3 right-3"
                  onClick={() => setOpen(null)}
                >
                  <XIcon />
                </Button>
              </div>
              {/* Text fades in after the morph so it never reflows mid-motion. */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.15, duration: 0.25 } }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                className="flex flex-col gap-3 p-4"
              >
                <p className="text-sm leading-6 text-muted-foreground">
                  Best visited between November and March. Book a guided tour to get the most out of the trip,
                  and pack layers — evenings get cold.
                </p>
                <Button size="sm" className="self-start">
                  Plan a trip
                </Button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
