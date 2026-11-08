"use client"

import * as React from "react"
import { RotateCcwIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

/** A placeholder block with a highlight sweeping across it. */
function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-[shimmer_1.4s_linear_infinite] rounded-md bg-[linear-gradient(90deg,var(--muted)_0%,color-mix(in_oklab,var(--muted),var(--background)_70%)_50%,var(--muted)_100%)] bg-[length:200%_100%]",
        className
      )}
    />
  )
}

export default function MotionSkeletonShimmerDemo() {
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (!loading) return
    const t = setTimeout(() => setLoading(false), 2200)
    return () => clearTimeout(t)
  }, [loading])

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-4">
      <style>{`@keyframes shimmer { from { background-position: 100% 0 } to { background-position: -100% 0 } }`}</style>
      <div className="relative w-full rounded-xl border bg-card p-4 shadow-xs">
        {loading ? (
          <div className="flex gap-3">
            <Shimmer className="size-10 rounded-full" />
            <div className="flex flex-1 flex-col gap-2 pt-1">
              <Shimmer className="h-3.5 w-2/5" />
              <Shimmer className="h-3 w-4/5" />
              <Shimmer className="h-3 w-3/5" />
            </div>
          </div>
        ) : (
          <div className="flex animate-in gap-3 duration-200 fade-in-0">
            <Avatar className="size-10">
              <AvatarFallback>ML</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-medium">Maya Lestari</p>
              <p className="text-sm leading-5 text-muted-foreground">
                Shipped the new onboarding flow. Conversion is up 12% this week.
              </p>
            </div>
          </div>
        )}
      </div>
      <Button variant="outline" size="sm" onClick={() => setLoading(true)} disabled={loading}>
        <RotateCcwIcon data-icon="inline-start" />
        Reload
      </Button>
    </div>
  )
}
