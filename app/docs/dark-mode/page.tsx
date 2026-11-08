import type { Metadata } from "next"

import { Code } from "@/components/docs/code"
import { DocPage, H2, InlineCode, P, Section } from "@/components/docs/doc-page"

export const metadata: Metadata = { title: "Dark Mode" }

export default function DarkModePage() {
  return (
    <DocPage
      href="/docs/dark-mode"
      eyebrow="Getting Started"
      title="Dark Mode"
      description="Dark mode swaps token values under a .dark class. Components do not change."
      toc={[
        { id: "provider", title: "Theme provider" },
        { id: "layout", title: "Wrap your layout" },
        { id: "toggle", title: "Add a toggle" },
      ]}
    >
      <Section>
        <H2 id="provider">Theme provider</H2>
        <P>
          Use <InlineCode>next-themes</InlineCode> to set the class on <InlineCode>&lt;html&gt;</InlineCode> and
          remember the choice.
        </P>
        <Code
          title="components/theme-provider.tsx"
          code={`"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider(props: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    />
  )
}`}
        />
      </Section>
      <Section>
        <H2 id="layout">Wrap your layout</H2>
        <P>
          Add <InlineCode>suppressHydrationWarning</InlineCode> to <InlineCode>&lt;html&gt;</InlineCode>, because the
          class is set before React hydrates.
        </P>
        <Code
          title="app/layout.tsx"
          code={`export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}`}
        />
      </Section>
      <Section>
        <H2 id="toggle">Add a toggle</H2>
        <P>
          The header of this site uses this toggle. Press <InlineCode>D</InlineCode> anywhere to switch theme.
        </P>
        <Code
          code={`"use client"

import { useTheme } from "next-themes"
import { MoonIcon, SunIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label="Toggle theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <SunIcon className="dark:hidden" />
      <MoonIcon className="hidden dark:block" />
    </Button>
  )
}`}
        />
      </Section>
    </DocPage>
  )
}
