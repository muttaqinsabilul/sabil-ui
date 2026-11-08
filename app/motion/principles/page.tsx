import type { Metadata } from "next"

import { motionPages } from "@/lib/motion"
import { DocPage, H2, InlineCode, P, Section } from "@/components/docs/doc-page"

export const metadata: Metadata = { title: "Principles · Motion" }

const frequency = [
  ["100+ times a day", "Command palette, keyboard shortcuts", "No animation"],
  ["Tens of times a day", "Hover, list navigation, tabs", "Very short or none"],
  ["Occasionally", "Dialogs, drawers, toasts", "Standard animation"],
  ["Rarely", "Onboarding, success states", "Room for delight"],
]

const purposes = [
  ["Feedback", "A button scales down on press. The interface heard you."],
  ["Spatial consistency", "A toast leaves the way it came, so swiping it away feels natural."],
  ["State change", "A label crossfades from Copy to Copied."],
  ["Continuity", "A card grows into its detail view, so you never lose your place."],
  ["Preventing jumps", "Content below a collapsing panel slides up instead of snapping."],
]

const rules = [
  <>Nothing appears from <InlineCode>scale(0)</InlineCode>. Start at <InlineCode>0.95</InlineCode> with zero opacity.</>,
  <>Never use <InlineCode>ease-in</InlineCode> for interface motion. It starts slow, exactly when the user is watching.</>,
  <>Popovers grow from their trigger. Dialogs stay centered.</>,
  <>Exit faster than you enter. The user already decided.</>,
  <>Animate <InlineCode>transform</InlineCode> and <InlineCode>opacity</InlineCode>. Never <InlineCode>transition: all</InlineCode>.</>,
  <>Use transitions, not keyframes, for things that can be interrupted. Transitions retarget, keyframes restart.</>,
  <>Gate hover motion behind <InlineCode>(hover: hover) and (pointer: fine)</InlineCode>.</>,
  <>Never block input while an animation plays.</>,
]

export default function PrinciplesPage() {
  return (
    <DocPage
      href="/motion/principles"
      pages={motionPages}
      eyebrow="Motion · Foundations"
      title="Principles"
      description="Before animating anything, answer two questions: how often will people see it, and what is it for?"
      toc={[
        { id: "frequency", title: "Frequency" },
        { id: "purpose", title: "Purpose" },
        { id: "rules", title: "Rules" },
      ]}
    >
      <Section>
        <H2 id="frequency">Frequency</H2>
        <P>The more often something happens, the less it should move. Animation that delights once becomes friction the hundredth time.</P>
        <div className="overflow-hidden rounded-xl border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left text-muted-foreground">
              <tr>
                <th className="px-4 py-2.5 font-medium">Seen</th>
                <th className="px-4 py-2.5 font-medium">Examples</th>
                <th className="px-4 py-2.5 font-medium">Decision</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {frequency.map(([seen, ex, d]) => (
                <tr key={seen}>
                  <td className="px-4 py-2.5 font-medium">{seen}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{ex}</td>
                  <td className="px-4 py-2.5">{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section>
        <H2 id="purpose">Purpose</H2>
        <P>Every animation needs a reason. If the only reason is that it looks nice, and people see it often, leave it out.</P>
        <div className="grid gap-3 sm:grid-cols-2">
          {purposes.map(([t, d]) => (
            <div key={t} className="rounded-xl border p-5">
              <h3 className="font-medium">{t}</h3>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <H2 id="rules">Rules</H2>
        <ol className="flex flex-col gap-2.5 text-[15px] leading-7 text-foreground/80">
          {rules.map((r, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-muted font-mono text-[11px] text-muted-foreground">
                {i + 1}
              </span>
              <span>{r}</span>
            </li>
          ))}
        </ol>
      </Section>
    </DocPage>
  )
}
