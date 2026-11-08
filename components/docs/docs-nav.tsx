"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { aiComponentSlugs, components, gettingStarted } from "@/lib/registry"
import { cn } from "@/lib/utils"

const aiComponents = aiComponentSlugs.flatMap((slug) => components.filter((c) => c.slug === slug))
const otherComponents = components.filter((c) => !aiComponentSlugs.includes(c.slug))

export function DocsNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-6 text-sm">
      <NavGroup title="Getting Started">
        {gettingStarted.map((p) => (
          <NavLink key={p.href} href={p.href} active={pathname === p.href} onNavigate={onNavigate}>
            {p.title}
          </NavLink>
        ))}
      </NavGroup>
      <NavGroup title="AI">
        {aiComponents.map((c) => {
          const href = `/docs/components/${c.slug}`
          return (
            <NavLink key={c.slug} href={href} active={pathname === href} onNavigate={onNavigate}>
              {c.title}
              {c.isNew && (
                <span className="ml-auto size-1.5 rounded-full bg-brand" aria-label="New" />
              )}
            </NavLink>
          )
        })}
      </NavGroup>
      <NavGroup title="Components">
        <NavLink href="/docs/components" active={pathname === "/docs/components"} onNavigate={onNavigate}>
          Overview
        </NavLink>
        {otherComponents.map((c) => {
          const href = `/docs/components/${c.slug}`
          return (
            <NavLink key={c.slug} href={href} active={pathname === href} onNavigate={onNavigate}>
              {c.title}
              {c.isNew && (
                <span className="ml-auto size-1.5 rounded-full bg-brand" aria-label="New" />
              )}
            </NavLink>
          )
        })}
      </NavGroup>
    </nav>
  )
}

function NavGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5">
      <h4 className="mb-1.5 px-2.5 text-xs font-medium text-muted-foreground">{title}</h4>
      {children}
    </div>
  )
}

function NavLink({
  href,
  active,
  children,
  onNavigate,
}: {
  href: string
  active: boolean
  children: React.ReactNode
  onNavigate?: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex h-8 items-center gap-2 rounded-lg px-2.5 text-foreground/70 transition-colors duration-150 hover:bg-accent hover:text-foreground",
        active && "bg-accent font-medium text-foreground"
      )}
    >
      {children}
    </Link>
  )
}
