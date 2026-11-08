"use client"

import * as React from "react"
import { motion, useSpring, useTransform } from "motion/react"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const prices = { monthly: 24, yearly: 240 }
const users = { monthly: 1284, yearly: 15420 }

function Ticker({ value, prefix = "" }: { value: number; prefix?: string }) {
  const spring = useSpring(value, { stiffness: 90, damping: 20 })
  const text = useTransform(spring, (v) => prefix + Math.round(v).toLocaleString("en-US"))

  React.useEffect(() => {
    spring.set(value)
  }, [spring, value])

  return <motion.span className="tabular-nums">{text}</motion.span>
}

export default function MotionNumberTickerDemo() {
  const [period, setPeriod] = React.useState<"monthly" | "yearly">("monthly")

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Tabs value={period} onValueChange={(v) => setPeriod(v as "monthly" | "yearly")}>
        <TabsList className="w-full">
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="yearly">Yearly</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border bg-card p-4 shadow-xs">
          <p className="text-xs text-muted-foreground">Price</p>
          <p className="mt-1 text-3xl font-semibold tracking-tight">
            <Ticker value={prices[period]} prefix="$" />
          </p>
        </div>
        <div className="rounded-xl border bg-card p-4 shadow-xs">
          <p className="text-xs text-muted-foreground">Active users</p>
          <p className="mt-1 text-3xl font-semibold tracking-tight">
            <Ticker value={users[period]} />
          </p>
        </div>
      </div>
    </div>
  )
}
