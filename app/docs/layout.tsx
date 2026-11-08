import { DocsNav } from "@/components/docs/docs-nav"

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex max-w-screen-2xl gap-10 px-4 md:px-6 lg:gap-14">
      <aside className="sticky top-14 hidden h-[calc(100svh-3.5rem)] w-56 shrink-0 overflow-y-auto py-8 pr-2 [scrollbar-width:thin] md:block">
        <DocsNav />
      </aside>
      <main className="min-w-0 flex-1 py-8 md:py-12">{children}</main>
    </div>
  )
}
