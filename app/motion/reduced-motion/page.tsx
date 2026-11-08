import type { Metadata } from "next"

import { motionPages } from "@/lib/motion"
import { Code } from "@/components/docs/code"
import { ComponentPreview } from "@/components/docs/component-preview"
import { DocPage, H2, InlineCode, P, Section } from "@/components/docs/doc-page"

export const metadata: Metadata = { title: "Reduced Motion · Motion" }

export default function ReducedMotionPage() {
  return (
    <DocPage
      href="/motion/reduced-motion"
      pages={motionPages}
      eyebrow="Motion · Foundations"
      title="Reduced Motion"
      description="Some people get dizzy from movement on screen. When they ask for less motion, remove movement but keep the fades that explain what changed."
      toc={[
        { id: "css", title: "In CSS" },
        { id: "motion", title: "In Motion" },
        { id: "try", title: "Try it" },
      ]}
    >
      <Section>
        <H2 id="css">In CSS</H2>
        <P>
          The foundation shortens every CSS animation and transition when <InlineCode>prefers-reduced-motion</InlineCode>{" "}
          is set. Nothing to do per component.
        </P>
        <Code
          lang="css"
          code={`@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 1ms !important;
    transition-duration: 1ms !important;
  }
}`}
        />
      </Section>

      <Section>
        <H2 id="motion">In Motion</H2>
        <P>
          JavaScript animations do not see that CSS rule. Read the preference with <InlineCode>useReducedMotion</InlineCode>{" "}
          and swap movement for a fade.
        </P>
        <Code
          code={`import { motion, useReducedMotion } from "motion/react"

export function Panel() {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 16 }}
      animate={{ opacity: 1, y: 0 }}
    />
  )
}`}
        />
      </Section>

      <Section>
        <H2 id="try">Try it</H2>
        <P>Toggle the switch to see the same entrance with and without movement.</P>
        <ComponentPreview name="motion-reduced-motion-demo" />
      </Section>
    </DocPage>
  )
}
