import Link from "next/link"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"

import { allPages } from "@/lib/registry"
import { cn } from "@/lib/utils"
import { Toc, type TocItem } from "@/components/docs/toc"

/** Shared frame for every docs page: header, body, pager, table of contents. */
export function DocPage({
  href,
  title,
  description,
  toc = [],
  eyebrow,
  pages = allPages,
  children,
}: {
  href: string
  title: string
  description?: string
  toc?: TocItem[]
  eyebrow?: string
  /** Ordered pages used for the Previous / Next links. */
  pages?: { href: string; title: string }[]
  children: React.ReactNode
}) {
  const index = pages.findIndex((p) => p.href === href)
  const prev = index > 0 ? pages[index - 1] : undefined
  const next = index >= 0 && index < pages.length - 1 ? pages[index + 1] : undefined

  return (
    <div className="flex gap-12 xl:gap-16">
      <article className="min-w-0 flex-1 pb-24">
        <header className="flex flex-col gap-3 pb-10">
          {eyebrow && <p className="text-sm font-medium text-brand">{eyebrow}</p>}
          <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{title}</h1>
          {description && (
            <p className="max-w-2xl text-base text-pretty text-muted-foreground sm:text-lg">{description}</p>
          )}
        </header>
        <div className="flex flex-col gap-12">{children}</div>
        <nav className="mt-16 flex items-center justify-between gap-4 border-t pt-6">
          {prev ? <PagerLink href={prev.href} title={prev.title} dir="prev" /> : <span />}
          {next ? <PagerLink href={next.href} title={next.title} dir="next" /> : <span />}
        </nav>
      </article>
      {toc.length > 0 && (
        <aside className="sticky top-20 hidden h-fit w-52 shrink-0 xl:block">
          <Toc items={toc} />
        </aside>
      )}
    </div>
  )
}

function PagerLink({ href, title, dir }: { href: string; title: string; dir: "prev" | "next" }) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col gap-1 rounded-xl px-1 py-1 text-sm",
        dir === "next" && "items-end text-right"
      )}
    >
      <span className="text-xs text-muted-foreground">{dir === "prev" ? "Previous" : "Next"}</span>
      <span className="flex items-center gap-1.5 font-medium">
        {dir === "prev" && (
          <ArrowLeftIcon className="size-4 transition-transform duration-200 ease-out group-hover:-translate-x-0.5" />
        )}
        {title}
        {dir === "next" && (
          <ArrowRightIcon className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
        )}
      </span>
    </Link>
  )
}

/** Section heading with an anchor id, used by the TOC. */
export function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-24 text-xl font-semibold tracking-tight">
      <a href={`#${id}`} className="group inline-flex items-center gap-2">
        {children}
        <span className="text-muted-foreground opacity-0 transition-opacity duration-150 group-hover:opacity-100">#</span>
      </a>
    </h2>
  )
}

export function H3({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h3 id={id} className="scroll-mt-24 text-base font-semibold tracking-tight">
      {children}
    </h3>
  )
}

export function P({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("leading-7 text-pretty text-foreground/80", className)}>{children}</p>
}

export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">{children}</code>
  )
}

export function Section({ children }: { children: React.ReactNode }) {
  return <section className="flex flex-col gap-4">{children}</section>
}
