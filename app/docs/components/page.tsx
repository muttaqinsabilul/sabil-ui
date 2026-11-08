import type { Metadata } from "next"
import Link from "next/link"

import { components } from "@/lib/registry"
import { DocPage } from "@/components/docs/doc-page"

export const metadata: Metadata = { title: "Components" }

export default function ComponentsIndex() {
  return (
    <DocPage
      href="/docs/components"
      eyebrow="Components"
      title="Components"
      description={`${components.length} components, all built on the same foundation. Pick one to see it live, read the source and copy it.`}
    >
      <div className="grid gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
        {components.map((c) => (
          <Link
            key={c.slug}
            href={`/docs/components/${c.slug}`}
            className="group flex items-center gap-2 border-b py-3 text-[15px] transition-colors duration-150 hover:text-brand"
          >
            {c.title}
            {c.isNew && (
              <span className="rounded-full bg-brand/10 px-1.5 py-px text-[11px] font-medium text-brand">New</span>
            )}
          </Link>
        ))}
      </div>
    </DocPage>
  )
}
