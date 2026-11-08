import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRightIcon, BoxesIcon, LayersIcon, PaletteIcon, ZapIcon } from "lucide-react"

import { siteConfig } from "@/lib/registry"
import { DocPage, H2, P, Section } from "@/components/docs/doc-page"

export const metadata: Metadata = { title: "Introduction" }

const principles = [
  {
    icon: BoxesIcon,
    title: "Open code",
    text: "Every component is a file in your project. Read it, change it, delete what you do not need.",
  },
  {
    icon: LayersIcon,
    title: "One foundation",
    text: "Color, radius, depth and motion live in tokens. Components only read tokens, never raw values.",
  },
  {
    icon: PaletteIcon,
    title: "Tactile surfaces",
    text: "Primary actions use a blue gradient with a 1px inner edge. Secondary actions sit on a raised white surface.",
  },
  {
    icon: ZapIcon,
    title: "Fast by default",
    text: "Motion is short and purposeful. Overlays enter with a strong ease-out, buttons answer on press.",
  },
]

export default function IntroductionPage() {
  return (
    <DocPage
      href="/docs"
      eyebrow="Getting Started"
      title="Introduction"
      description={siteConfig.description}
      toc={[
        { id: "principles", title: "Principles" },
        { id: "how-it-works", title: "How it works" },
        { id: "next-steps", title: "Next steps" },
      ]}
    >
      <Section>
        <P>
          {siteConfig.name} is not a package you install. It is a collection of components you copy into
          your app and own. It is built on Radix primitives for accessibility and Tailwind CSS for styling,
          with a design foundation of its own on top.
        </P>
      </Section>

      <Section>
        <H2 id="principles">Principles</H2>
        <div className="grid gap-3 sm:grid-cols-2">
          {principles.map((p) => (
            <div key={p.title} className="flex flex-col gap-2 rounded-2xl border p-5">
              <p.icon className="size-5 text-brand" />
              <h3 className="font-medium">{p.title}</h3>
              <p className="text-sm leading-6 text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <H2 id="how-it-works">How it works</H2>
        <P>
          Each component page shows a live preview, the exact code of that preview, and the full source of
          the component. Copy the source into <code className="font-mono text-sm">components/ui</code>, install
          the listed dependencies, and import it. Because the code is yours, there is no version to upgrade
          and nothing to override.
        </P>
      </Section>

      <Section>
        <H2 id="next-steps">Next steps</H2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { href: "/docs/installation", title: "Installation", text: "Set up a new or existing project." },
            { href: "/docs/theming", title: "Theming", text: "Tokens for color, radius and surfaces." },
            { href: "/docs/motion", title: "Motion", text: "Easing curves, durations and rules." },
            { href: "/docs/components", title: "Components", text: "Browse every component." },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group flex items-center justify-between gap-4 rounded-2xl border p-5 transition-colors duration-150 hover:bg-muted/50"
            >
              <div className="flex flex-col gap-1">
                <span className="font-medium">{l.title}</span>
                <span className="text-sm text-muted-foreground">{l.text}</span>
              </div>
              <ArrowRightIcon className="size-4 text-muted-foreground transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </Section>
    </DocPage>
  )
}
