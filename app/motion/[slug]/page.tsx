import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CheckIcon, XIcon } from "lucide-react"

import { getMotionPattern, motionPages, motionPatterns } from "@/lib/motion"
import { ComponentPreview } from "@/components/docs/component-preview"
import { DocPage, H2, H3, P, Section } from "@/components/docs/doc-page"

export function generateStaticParams() {
  return motionPatterns.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps<"/motion/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const pattern = getMotionPattern(slug)
  return pattern ? { title: `${pattern.title} · Motion`, description: pattern.description } : {}
}

export default async function MotionPatternPage({ params }: PageProps<"/motion/[slug]">) {
  const { slug } = await params
  const pattern = getMotionPattern(slug)
  if (!pattern) notFound()

  const [hero, ...rest] = pattern.examples

  return (
    <DocPage
      href={`/motion/${slug}`}
      pages={motionPages}
      eyebrow={`Motion · ${pattern.group}`}
      title={pattern.title}
      description={pattern.description}
      toc={[
        { id: "specs", title: "Specs" },
        { id: "guidelines", title: "Guidelines" },
        ...(rest.length ? [{ id: "examples", title: "Examples" }] : []),
      ]}
    >
      <ComponentPreview name={hero.name} />

      <Section>
        <H2 id="specs">Specs</H2>
        <div className="overflow-hidden rounded-xl border">
          <table className="w-full text-sm">
            <tbody className="divide-y">
              {pattern.specs.map((s) => (
                <tr key={s.label}>
                  <td className="w-40 bg-muted/50 px-4 py-2.5 align-top text-muted-foreground">{s.label}</td>
                  <td className="px-4 py-2.5 font-mono text-[13px]">{s.value}</td>
                </tr>
              ))}
              <tr>
                <td className="w-40 bg-muted/50 px-4 py-2.5 text-muted-foreground">Built with</td>
                <td className="px-4 py-2.5">{pattern.engine === "CSS" ? "CSS only" : pattern.engine}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section>
        <H2 id="guidelines">Guidelines</H2>
        <div className="grid gap-3 sm:grid-cols-2">
          <List title="Use for" items={pattern.use} tone="do" />
          <List title="Avoid" items={pattern.avoid} tone="dont" />
        </div>
      </Section>

      {rest.length > 0 && (
        <Section>
          <H2 id="examples">Examples</H2>
          {rest.map((ex) => (
            <div key={ex.name} className="flex flex-col gap-3">
              <H3 id={ex.name}>{ex.title}</H3>
              {ex.description && <P className="text-sm">{ex.description}</P>}
              <ComponentPreview name={ex.name} />
            </div>
          ))}
        </Section>
      )}
    </DocPage>
  )
}

function List({ title, items, tone }: { title: string; items: string[]; tone: "do" | "dont" }) {
  const Icon = tone === "do" ? CheckIcon : XIcon
  return (
    <div className="flex flex-col gap-3 rounded-xl border p-5">
      <h3 className="flex items-center gap-2 text-sm font-medium">
        <span
          className={
            tone === "do"
              ? "flex size-5 items-center justify-center rounded-full bg-primary/10 text-primary"
              : "flex size-5 items-center justify-center rounded-full bg-destructive/10 text-destructive"
          }
        >
          <Icon className="size-3" />
        </span>
        {title}
      </h3>
      <ul className="flex flex-col gap-2 text-sm leading-6 text-foreground/80">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  )
}
