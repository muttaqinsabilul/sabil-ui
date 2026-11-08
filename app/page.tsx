import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { components, siteConfig } from "@/lib/registry"
import { Button } from "@/components/ui/button"
import { CopyButton } from "@/components/docs/copy-button"
import { examples } from "@/components/examples"
import { Reveal } from "@/components/reveal"
import { TypedWord } from "@/components/typed-word"

const heroWords = ["interfaces", "dashboards", "products", "AI apps", "websites"]

const aiPrompt = `Build [your app] with ${siteConfig.name}. Read ${siteConfig.url}/docs/ai.md first, then follow its tokens, components and motion rules for every screen.`

// Live components shown on the home page, in three columns.
const showcase = [
  ["card-demo", "field-demo"],
  ["tabs-segmented", "button-callout", "calendar-demo", "item-demo"],
  ["input-otp-demo", "attachment-demo", "toggle-group-demo", "empty-demo"],
]

export default function HomePage() {
  const newCount = components.filter((c) => c.isNew).length

  return (
    <div className="relative">
      {/* Soft dotted backdrop that fades out under the hero. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-dots [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />

      <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 pt-20 pb-14 text-center sm:pt-28">
        <Link
          href="/docs/components"
          className="group inline-flex items-center gap-2 rounded-full border bg-background/80 py-1 pr-3 pl-1 text-sm backdrop-blur transition-colors duration-150 hover:bg-muted"
        >
          <span className="rounded-full bg-brand px-2 py-0.5 text-xs font-medium text-brand-foreground">New</span>
          {newCount} components for chat and agents
          <ArrowRightIcon className="size-3.5 text-muted-foreground transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
        </Link>
        {/* Text fades from full foreground to a soft gray at the bottom (both themes). */}
        <h1 className="bg-linear-to-b from-foreground from-30% to-foreground/55 bg-clip-text pb-1 text-4xl font-semibold tracking-tight text-balance text-transparent sm:text-6xl">
          The foundation for <TypedWord words={heroWords} /> that feel right
        </h1>
        <p className="max-w-xl text-base text-pretty text-muted-foreground sm:text-lg">{siteConfig.description}</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" asChild>
            <Link href="/docs">Get started</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/docs/components">Browse {components.length} components</Link>
          </Button>
        </div>
        <div className="mt-2 flex w-full flex-col items-center gap-2.5">
          <p className="text-xs text-muted-foreground">Paste this prompt into your AI editor</p>
          {/* One line; the text fades out before the copy button. */}
          <div className="relative w-full max-w-2xl rounded-xl border bg-muted/40 text-left dark:bg-card">
            <p className="overflow-hidden py-3.5 pr-14 pl-4 font-mono text-[13px] leading-6 whitespace-nowrap [mask-image:linear-gradient(to_right,black_70%,transparent_calc(100%-3rem))]">
              Build <span className="text-primary">[your app]</span> with {siteConfig.name}. Read{" "}
              {siteConfig.url}/docs/ai.md first, then follow its tokens, components and motion rules for every
              screen.
            </p>
            <CopyButton value={aiPrompt} className="absolute top-1/2 right-1.5 -translate-y-1/2" />
          </div>
          <Link
            href="/docs/ai"
            className="group inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors duration-150 hover:text-foreground"
          >
            Read the rules for AI
            <ArrowRightIcon className="size-3 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-screen-xl px-4 pb-24 md:px-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {showcase.map((col, i) => (
            <div key={i} className={i === 2 ? "flex min-w-0 flex-col gap-4 md:col-span-2 xl:col-span-1" : "flex min-w-0 flex-col gap-4"}>
              {col.map((name, j) => {
                const Example = examples[name]
                return Example ? (
                  // Columns cascade left to right, cards top to bottom.
                  <Reveal key={name} delay={i * 0.12 + Math.min(j, 1) * 0.08}>
                    <div className="flex min-w-0 justify-center overflow-hidden rounded-2xl border bg-card p-4 sm:p-6 *:w-full">
                      <Example />
                    </div>
                  </Reveal>
                ) : null
              })}
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto flex max-w-screen-2xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between md:px-6">
          <p>{siteConfig.name}. Built on Radix and Tailwind CSS. Open code, MIT.</p>
          <p>
            <Link href="/docs" className="underline underline-offset-4 hover:text-foreground">
              Docs
            </Link>{" "}
            ·{" "}
            <Link href="/motion" className="underline underline-offset-4 hover:text-foreground">
              Motion
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
