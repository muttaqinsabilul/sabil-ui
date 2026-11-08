"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { motionFoundations, motionGroups, motionPatterns } from "@/lib/motion"
import { cn } from "@/lib/utils"

export function MotionNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-6 text-sm">
      <Group title="Foundations">
        {motionFoundations.map((p) => (
          <Item key={p.href} href={p.href} active={pathname === p.href} onNavigate={onNavigate}>
            {p.title}
          </Item>
        ))}
      </Group>
      {motionGroups.map((g) => (
        <Group key={g} title={g}>
          {motionPatterns
            .filter((p) => p.group === g)
            .map((p) => {
              const href = `/motion/${p.slug}`
              return (
                <Item key={p.slug} href={href} active={pathname === href} onNavigate={onNavigate}>
                  {p.title}
                </Item>
              )
            })}
        </Group>
      ))}
    </nav>
  )
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5">
      <h4 className="mb-1.5 px-2.5 text-xs font-medium text-muted-foreground">{title}</h4>
      {children}
    </div>
  )
}

function Item({
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
        "flex h-8 items-center rounded-lg px-2.5 text-foreground/70 transition-colors duration-150 hover:bg-accent hover:text-foreground",
        active && "bg-accent font-medium text-foreground"
      )}
    >
      {children}
    </Link>
  )
}
