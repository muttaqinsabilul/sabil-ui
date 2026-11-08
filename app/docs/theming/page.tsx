import type { Metadata } from "next"

import { Code } from "@/components/docs/code"
import { DocPage, H2, InlineCode, P, Section } from "@/components/docs/doc-page"
import { readSource } from "@/components/docs/source"

export const metadata: Metadata = { title: "Theming" }

const colorGroups = [
  {
    title: "Base",
    tokens: [
      ["background", "Page background"],
      ["foreground", "Default text"],
      ["card", "Card surface"],
      ["popover", "Menus, popovers"],
    ],
  },
  {
    title: "Actions",
    tokens: [
      ["primary", "Default button, emphasis"],
      ["ring", "Focus ring"],
      ["secondary", "Low-emphasis fills"],
      ["destructive", "Danger, errors"],
    ],
  },
  {
    title: "Neutrals",
    tokens: [
      ["muted", "Subtle fills"],
      ["muted-foreground", "Secondary text"],
      ["accent", "Hover fills"],
      ["border", "Hairlines"],
    ],
  },
  {
    title: "Charts",
    tokens: [
      ["chart-1", "Series 1"],
      ["chart-2", "Series 2"],
      ["chart-3", "Series 3"],
      ["chart-4", "Series 4"],
    ],
  },
]

const radii = [
  ["sm", "rounded-sm"],
  ["md", "rounded-md"],
  ["lg", "rounded-lg"],
  ["xl", "rounded-xl"],
  ["2xl", "rounded-2xl"],
  ["full", "rounded-full"],
]

export default async function ThemingPage() {
  const css = (await readSource("app/globals.css")) ?? ""

  return (
    <DocPage
      href="/docs/theming"
      eyebrow="Foundation"
      title="Theming"
      description="Every visual decision lives in a CSS variable. Components only read tokens, so one change restyles the whole system."
      toc={[
        { id: "colors", title: "Colors" },
        { id: "surfaces", title: "Surfaces" },
        { id: "radius", title: "Radius" },
        { id: "typography", title: "Typography" },
        { id: "source", title: "Full source" },
      ]}
    >
      <Section>
        <H2 id="colors">Colors</H2>
        <P>
          Text is pure near-black <InlineCode>#0a0a0a</InlineCode>. Fills and tracks use cool slate, and one
          blue, <InlineCode>#056dff</InlineCode>, carries every primary action. Hairlines and hover fills are
          transparent black, so they sit well on any surface. Every pair follows the{" "}
          <InlineCode>name</InlineCode> / <InlineCode>name-foreground</InlineCode> convention.
        </P>
        <div className="flex flex-col gap-8">
          {colorGroups.map((g) => (
            <div key={g.title} className="flex flex-col gap-3">
              <h3 className="text-sm font-medium text-muted-foreground">{g.title}</h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {g.tokens.map(([name, use]) => (
                  <div key={name} className="flex flex-col gap-2">
                    <div
                      className="h-16 rounded-xl ring-1 ring-foreground/10 ring-inset"
                      style={{ background: `var(--${name})` }}
                    />
                    <div className="flex flex-col">
                      <code className="font-mono text-xs">--{name}</code>
                      <span className="text-xs text-muted-foreground">{use}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <H2 id="surfaces">Surfaces</H2>
        <P>
          Depth is a token too. The primary surface is a vertical gradient from <InlineCode>#3c86ff</InlineCode> to{" "}
          <InlineCode>#056dff</InlineCode> with a 1px inner edge. Raised controls are white with a hairline ring and a{" "}
          <InlineCode>0 1px 2px</InlineCode> shadow. Tracks are flat slate. Panels are warm off-white.
        </P>
        <div className="grid grid-cols-2 gap-3 rounded-2xl border bg-dots p-6 sm:grid-cols-4">
          {[
            ["surface-sunken", "text-muted-foreground"],
            ["surface-raised", ""],
            ["surface-primary", "text-primary-foreground"],
            ["bg-panel", ""],
          ].map(([cls, text]) => (
            <div key={cls} className={`flex h-24 items-end rounded-xl p-3 font-mono text-xs ${cls} ${text}`}>
              {cls}
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <H2 id="radius">Radius</H2>
        <P>
          One base value, <InlineCode>--radius: 0.5rem</InlineCode>. The scale is md 6px (tab trigger), lg 8px
          (controls, menu items), xl 12px (menus, popovers) and 2xl 16px (cards, bubbles). Nested shapes use a smaller
          step than their container.
        </P>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {radii.map(([name, cls]) => (
            <div key={name} className="flex flex-col items-center gap-2">
              <div className={`size-16 border-2 border-foreground/70 bg-muted ${cls}`} />
              <code className="font-mono text-xs text-muted-foreground">{name}</code>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <H2 id="typography">Typography</H2>
        <P>
          Inter for interface text, Geist Mono for code. Buttons use <InlineCode>-0.01em</InlineCode> tracking, headings
          use tight tracking.
        </P>
        <div className="flex flex-col divide-y rounded-2xl border">
          {[
            ["text-4xl font-semibold tracking-tight", "Display", "36 / 600"],
            ["text-2xl font-semibold tracking-tight", "Heading", "24 / 600"],
            ["text-lg font-medium", "Title", "18 / 500"],
            ["text-sm", "Body text for interfaces", "14 / 400"],
            ["text-xs text-muted-foreground", "Caption and helper text", "12 / 400"],
            ["text-[11px] text-foreground/60", "Menu item description", "11 / 400 · 60%"],
            ["font-mono text-[13px]", "const radius = '0.5rem'", "Mono 13"],
          ].map(([cls, sample, spec]) => (
            <div key={spec} className="flex items-baseline justify-between gap-4 px-5 py-4">
              <span className={cls}>{sample}</span>
              <span className="shrink-0 font-mono text-xs text-muted-foreground">{spec}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <H2 id="source">Full source</H2>
        <P>The complete foundation file. Copy it into your project.</P>
        <Code code={css} lang="css" title="app/globals.css" maxHeight="28rem" />
      </Section>
    </DocPage>
  )
}
