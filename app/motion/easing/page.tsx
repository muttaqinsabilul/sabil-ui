import type { Metadata } from "next"

import { motionPages } from "@/lib/motion"
import { ComponentPreview } from "@/components/docs/component-preview"
import { DocPage, H2, InlineCode, P, Section } from "@/components/docs/doc-page"

export const metadata: Metadata = { title: "Easing · Motion" }

const curves: { name: string; bezier: [number, number, number, number]; use: string }[] = [
  { name: "--ease-out", bezier: [0.23, 1, 0.32, 1], use: "Enter, exit, press feedback. The default." },
  { name: "--ease-in-out", bezier: [0.77, 0, 0.175, 1], use: "Elements moving from one place to another on screen." },
  { name: "--ease-drawer", bezier: [0.32, 0.72, 0, 1], use: "Sheets and drawers. Fast start, long soft landing." },
  { name: "ease", bezier: [0.25, 0.1, 0.25, 1], use: "Color and opacity on hover." },
  { name: "linear", bezier: [0, 0, 1, 1], use: "Constant motion only: spinners, progress, hold-to-confirm." },
]

/** Plots a cubic-bezier as a small SVG curve. */
function Curve({ b }: { b: [number, number, number, number] }) {
  const s = 100
  const p = (x: number, y: number) => `${x * s},${s - y * s}`
  return (
    <svg viewBox="-8 -8 116 116" className="size-24 shrink-0 overflow-visible">
      <rect x="0" y="0" width={s} height={s} className="fill-none stroke-border" />
      <line x1="0" y1={s} x2={b[0] * s} y2={s - b[1] * s} className="stroke-muted-foreground/40" strokeDasharray="2 3" />
      <line x1={s} y1="0" x2={b[2] * s} y2={s - b[3] * s} className="stroke-muted-foreground/40" strokeDasharray="2 3" />
      <path d={`M ${p(0, 0)} C ${p(b[0], b[1])} ${p(b[2], b[3])} ${p(1, 1)}`} className="fill-none stroke-primary" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx={b[0] * s} cy={s - b[1] * s} r="3" className="fill-background stroke-primary" strokeWidth="1.5" />
      <circle cx={b[2] * s} cy={s - b[3] * s} r="3" className="fill-background stroke-primary" strokeWidth="1.5" />
    </svg>
  )
}

export default function EasingPage() {
  return (
    <DocPage
      href="/motion/easing"
      pages={motionPages}
      eyebrow="Motion · Foundations"
      title="Easing"
      description="The curve decides how an animation feels more than its duration. Strong ease-out curves start fast, so the interface feels instant."
      toc={[
        { id: "curves", title: "Curves" },
        { id: "compare", title: "Compare" },
        { id: "choosing", title: "Choosing a curve" },
      ]}
    >
      <Section>
        <H2 id="curves">Curves</H2>
        <div className="flex flex-col divide-y rounded-xl border">
          {curves.map((c) => (
            <div key={c.name} className="flex items-center gap-6 p-5">
              <Curve b={c.bezier} />
              <div className="flex min-w-0 flex-col gap-1">
                <code className="font-mono text-sm font-medium">{c.name}</code>
                <code className="font-mono text-xs text-muted-foreground">cubic-bezier({c.bezier.join(", ")})</code>
                <p className="text-sm text-foreground/80">{c.use}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <H2 id="compare">Compare</H2>
        <P>Same distance, same 600ms. Watch how much sooner the foundation curves seem to arrive.</P>
        <ComponentPreview name="motion-easing" />
      </Section>

      <Section>
        <H2 id="choosing">Choosing a curve</H2>
        <ul className="flex list-disc flex-col gap-2 pl-5 leading-7 text-foreground/80 marker:text-muted-foreground">
          <li>Entering or leaving the screen? <InlineCode>--ease-out</InlineCode>.</li>
          <li>Moving or morphing while visible? <InlineCode>--ease-in-out</InlineCode>.</li>
          <li>Changing color on hover? <InlineCode>ease</InlineCode>.</li>
          <li>Spinning or filling at a steady rate? <InlineCode>linear</InlineCode>.</li>
          <li>Never <InlineCode>ease-in</InlineCode>. A 300ms dropdown with ease-in feels slower than the same dropdown with ease-out.</li>
        </ul>
      </Section>
    </DocPage>
  )
}
