import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { motionGroups, motionPages, motionPatterns } from "@/lib/motion"
import { Code } from "@/components/docs/code"
import { DocPage, H2, InlineCode, P, Section } from "@/components/docs/doc-page"

export const metadata: Metadata = { title: "Motion" }

export default function MotionOverviewPage() {
  return (
    <DocPage
      href="/motion"
      pages={motionPages}
      eyebrow="Motion"
      title="Motion Foundation"
      description="How things move in Sabil UI. Short, purposeful animation that gives feedback, keeps space consistent and never gets in the way."
      toc={[
        { id: "tokens", title: "Tokens" },
        { id: "tools", title: "Tools" },
        ...motionGroups.map((g) => ({ id: g.toLowerCase().replace(/[^a-z]+/g, "-"), title: g })),
      ]}
    >
      <Section>
        <H2 id="tokens">Tokens</H2>
        <P>
          Three curves cover almost every case. They override Tailwind&apos;s <InlineCode>ease-out</InlineCode> and{" "}
          <InlineCode>ease-in-out</InlineCode>, so every component uses them without extra classes.
        </P>
        <Code
          lang="css"
          code={`@theme {
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);     /* enter, exit, feedback */
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1); /* movement on screen */
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);  /* sheets and drawers */
}`}
        />
      </Section>

      <Section>
        <H2 id="tools">Tools</H2>
        <P>
          Use CSS for anything predetermined: press, hover, overlays, shimmer. CSS runs off the main thread and stays
          smooth while the page is busy. Use <InlineCode>motion</InlineCode> for what CSS cannot do: springs, gestures,
          exit animations, height auto and shared layout.
        </P>
        <Code code="npm install motion" lang="bash" />
      </Section>

      {motionGroups.map((g) => (
        <Section key={g}>
          <H2 id={g.toLowerCase().replace(/[^a-z]+/g, "-")}>{g}</H2>
          <div className="grid gap-3 sm:grid-cols-2">
            {motionPatterns
              .filter((p) => p.group === g)
              .map((p) => (
                <Link
                  key={p.slug}
                  href={`/motion/${p.slug}`}
                  className="group flex flex-col gap-1.5 rounded-xl border p-5 transition-colors duration-150 hover:bg-accent"
                >
                  <span className="flex items-center justify-between font-medium">
                    {p.title}
                    <ArrowRightIcon className="size-4 text-muted-foreground transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
                  </span>
                  <span className="text-sm leading-6 text-muted-foreground">{p.description}</span>
                  <span className="mt-1 font-mono text-[11px] text-muted-foreground">{p.engine}</span>
                </Link>
              ))}
          </div>
        </Section>
      ))}
    </DocPage>
  )
}
