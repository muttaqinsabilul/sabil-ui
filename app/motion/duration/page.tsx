import type { Metadata } from "next"

import { motionPages } from "@/lib/motion"
import { ComponentPreview } from "@/components/docs/component-preview"
import { DocPage, H2, P, Section } from "@/components/docs/doc-page"

export const metadata: Metadata = { title: "Duration · Motion" }

const durations = [
  ["Press feedback", "100–160ms", "--ease-out"],
  ["Tooltip, small popover", "125–200ms", "--ease-out"],
  ["Dropdown, select", "150–250ms", "--ease-out"],
  ["Dialog, sheet", "200–300ms", "--ease-out"],
  ["Drawer", "400ms", "--ease-drawer"],
  ["Hover color", "150ms", "ease"],
  ["Marketing, explanatory", "500ms+", "--ease-out / --ease-in-out"],
]

export default function DurationPage() {
  return (
    <DocPage
      href="/motion/duration"
      pages={motionPages}
      eyebrow="Motion · Foundations"
      title="Duration"
      description="Interface motion stays under 300ms. Faster animation makes the whole product feel faster, even when nothing else changed."
      toc={[
        { id: "scale", title: "Scale" },
        { id: "feel", title: "Feel it" },
        { id: "asymmetry", title: "Enter vs exit" },
      ]}
    >
      <Section>
        <H2 id="scale">Scale</H2>
        <div className="overflow-hidden rounded-xl border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left text-muted-foreground">
              <tr>
                <th className="px-4 py-2.5 font-medium">Element</th>
                <th className="px-4 py-2.5 font-medium">Duration</th>
                <th className="px-4 py-2.5 font-medium">Easing</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {durations.map(([el, d, e]) => (
                <tr key={el}>
                  <td className="px-4 py-2.5">{el}</td>
                  <td className="px-4 py-2.5 font-mono text-xs">{d}</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{e}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section>
        <H2 id="feel">Feel it</H2>
        <P>Open the same menu at four speeds. 180ms feels responsive. 400ms already feels like waiting.</P>
        <ComponentPreview name="motion-duration-demo" />
      </Section>

      <Section>
        <H2 id="asymmetry">Enter vs exit</H2>
        <P>
          Be slow where the user is deciding and fast where the system is responding. Exits are usually 20–30% shorter
          than enters. A hold-to-confirm fills over 1.5s but snaps back in 200ms.
        </P>
      </Section>
    </DocPage>
  )
}
