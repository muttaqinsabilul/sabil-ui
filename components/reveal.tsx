"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Fades content up once when it scrolls into view. Slow and soft on
 * purpose: this is for marketing pages, not product UI.
 * Plain CSS transition, so pages that use it don't load an animation library.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [shown, setShown] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          observer.disconnect()
        }
      },
      { rootMargin: "0px 0px -12% 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}s` }}
      className={cn(
        "transition-[opacity,translate,filter] duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:duration-400",
        shown ? "opacity-100" : "opacity-0 motion-safe:translate-y-6 motion-safe:blur-[6px]",
        className
      )}
    >
      {children}
    </div>
  )
}
