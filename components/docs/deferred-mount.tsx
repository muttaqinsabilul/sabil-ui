"use client"

import * as React from "react"

// True once the first page has hydrated. Pages reached by client navigation
// mount examples right away; only the first load defers them.
let hydrated = false

/**
 * Keeps the server HTML of an example as static markup during hydration and
 * makes it live only when it comes near the screen. This cuts the work done
 * on page load, most of all on phones where most examples start off screen.
 *
 * `load` must resolve to the component, so the swap from static markup to the
 * live component happens in one render with no empty frame.
 */
export function DeferredMount({
  load,
  fallback: Fallback,
}: {
  load: () => Promise<React.ComponentType>
  /** Rendered on the server and on client navigations. */
  fallback: React.ComponentType
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  // Server: render the example. Client during hydration: keep server markup.
  const [deferred] = React.useState(
    () => typeof window !== "undefined" && !hydrated
  )
  const [Live, setLive] = React.useState<React.ComponentType | null>(null)

  React.useEffect(() => {
    hydrated = true
    if (!deferred) return
    // The wrapper is display: contents and has no box, so watch its parent.
    const target = ref.current?.parentElement
    if (!target) return
    let cancelled = false
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        load().then((Component) => {
          if (!cancelled) setLive(() => Component)
        })
      },
      { rootMargin: "300px" }
    )
    observer.observe(target)
    return () => {
      cancelled = true
      observer.disconnect()
    }
  }, [deferred, load])

  if (Live) {
    return (
      <div ref={ref} className="contents">
        <Live />
      </div>
    )
  }
  if (deferred) {
    // React keeps the server HTML inside this element as it is.
    return (
      <div
        ref={ref}
        className="contents"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: "" }}
      />
    )
  }
  return (
    <div ref={ref} className="contents">
      <Fallback />
    </div>
  )
}
