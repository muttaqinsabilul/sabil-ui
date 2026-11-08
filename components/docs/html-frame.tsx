"use client"

import * as React from "react"
import { useTheme } from "next-themes"

const noop = () => () => {}

/**
 * Renders plain HTML inside an iframe that loads only /kanvas.css and /kanvas.js.
 * Nothing from the docs site (Tailwind, React components) leaks in,
 * so the preview shows exactly what a plain HTML page would get.
 */
export function HtmlFrame({ html, title, minHeight = 160 }: { html: string; title: string; minHeight?: number }) {
  const { resolvedTheme } = useTheme()
  // The theme is only known in the browser, so the frame renders after mount.
  const mounted = React.useSyncExternalStore(noop, () => true, () => false)
  const ref = React.useRef<HTMLIFrameElement>(null)
  const [height, setHeight] = React.useState(Math.max(200, minHeight))

  const doc = `<!doctype html>
<html lang="en" class="${resolvedTheme === "dark" ? "dark" : ""}">
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400..700&display=swap">
<link rel="stylesheet" href="/kanvas.css">
<script src="/kanvas.js"></script>
<style>
  html { background: var(--k-bg); overflow: hidden; }
  body { padding: 40px 24px; display: flex; flex-direction: column; align-items: center; gap: 16px; }
</style>
</head>
<body class="k-body">${html}</body>
</html>`

  React.useEffect(() => {
    const frame = ref.current
    if (!frame) return
    let observer: ResizeObserver | undefined

    function measure() {
      const root = frame?.contentDocument?.documentElement
      if (root) setHeight(Math.max(minHeight, root.scrollHeight))
    }

    function onLoad() {
      measure()
      observer?.disconnect()
      const body = frame?.contentDocument?.body
      if (body) {
        observer = new ResizeObserver(measure)
        observer.observe(body)
      }
    }

    frame.addEventListener("load", onLoad)
    return () => {
      frame.removeEventListener("load", onLoad)
      observer?.disconnect()
    }
  }, [doc, mounted, minHeight])

  if (!mounted) {
    return <div className="w-full rounded-2xl border bg-background" style={{ height }} />
  }

  return (
    <iframe
      ref={ref}
      title={title}
      srcDoc={doc}
      className="block w-full rounded-2xl border bg-background"
      style={{ height }}
    />
  )
}
