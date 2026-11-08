"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MenuIcon } from "lucide-react"

import { siteConfig } from "@/lib/registry"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { DocsNav } from "@/components/docs/docs-nav"
import { MotionNav } from "@/components/docs/motion-nav"
import { Logo } from "@/components/logo"
import { Search } from "@/components/search"
import { ThemeToggle } from "@/components/theme-toggle"

const links = [
  { href: "/docs", label: "Docs", match: (p: string) => p.startsWith("/docs") && !/^\/docs\/(components|ai|html-css)/.test(p) },
  { href: "/docs/components", label: "Components", match: (p: string) => p.startsWith("/docs/components") },
  { href: "/motion", label: "Motion", match: (p: string) => p.startsWith("/motion") },
  { href: "/docs/html-css", label: "HTML, CSS & JS", match: (p: string) => p.startsWith("/docs/html-css") },
  { href: "/docs/ai", label: "AI", match: (p: string) => p.startsWith("/docs/ai") },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-lg supports-backdrop-filter:bg-background/65">
      <div className="mx-auto flex h-14 max-w-screen-2xl items-center gap-2 px-4 md:px-6">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon-sm" className="md:hidden" aria-label="Open menu">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 overflow-y-auto p-0">
            <SheetHeader className="border-b">
              <SheetTitle className="flex items-center gap-2">
                <Logo /> {siteConfig.name}
              </SheetTitle>
            </SheetHeader>
            <div className="p-3">
              {pathname.startsWith("/motion") ? (
                <MotionNav onNavigate={() => setOpen(false)} />
              ) : (
                <DocsNav onNavigate={() => setOpen(false)} />
              )}
            </div>
          </SheetContent>
        </Sheet>

        <Link href="/" className="mr-4 flex items-center gap-2 font-semibold tracking-tight">
          <Logo />
          <span>{siteConfig.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 text-sm md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-lg px-2.5 py-1.5 text-foreground/65 transition-colors duration-150 hover:text-foreground",
                l.match(pathname) && "text-foreground"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <Search />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
