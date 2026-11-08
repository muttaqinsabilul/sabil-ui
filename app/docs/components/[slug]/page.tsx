import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { components, getComponent } from "@/lib/registry"
import { Code } from "@/components/docs/code"
import { ComponentPreview } from "@/components/docs/component-preview"
import { DocPage, H2, H3, InlineCode, P, Section } from "@/components/docs/doc-page"
import { getDependencies, getExports, readSource } from "@/components/docs/source"

export const dynamicParams = false

export function generateStaticParams() {
  return components.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: PageProps<"/docs/components/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const component = getComponent(slug)
  return component ? { title: component.title, description: component.description } : {}
}

export default async function ComponentPage({ params }: PageProps<"/docs/components/[slug]">) {
  const { slug } = await params
  const component = getComponent(slug)
  if (!component) notFound()

  const [hero, ...rest] = component.examples

  // Source of every ui file this component needs.
  const sources = (
    await Promise.all(
      component.files.map(async (file) => ({
        file,
        source: await readSource(`components/ui/${file}.tsx`),
      }))
    )
  ).filter((s): s is { file: string; source: string } => !!s.source)

  const deps = [...new Set(sources.flatMap((s) => getDependencies(s.source)))].filter(
    (d) => d !== "next"
  )
  const main = sources[0]
  const exportsList = main ? getExports(main.source) : []
  const importLine = main
    ? exportsList.length > 3
      ? `import {\n${exportsList.map((e) => `  ${e},`).join("\n")}\n} from "@/components/ui/${main.file}"`
      : `import { ${exportsList.join(", ")} } from "@/components/ui/${main.file}"`
    : null

  const toc = [
    ...(sources.length ? [{ id: "installation", title: "Installation" }] : []),
    ...(importLine ? [{ id: "usage", title: "Usage" }] : []),
    ...(rest.length ? [{ id: "examples", title: "Examples" }] : []),
    ...rest.map((e) => ({ id: e.name, title: e.title, depth: 3 as const })),
  ]

  return (
    <DocPage
      href={`/docs/components/${slug}`}
      eyebrow="Components"
      title={component.title}
      description={component.description}
      toc={toc}
    >
      <ComponentPreview name={hero.name} />

      {sources.length > 0 && (
        <Section>
          <H2 id="installation">Installation</H2>
          <ol className="flex flex-col gap-8 border-l pl-6 [counter-reset:step]">
            {deps.length > 0 && (
              <Step title="Install the dependencies">
                <Code code={`npm install ${deps.join(" ")}`} lang="bash" />
              </Step>
            )}
            <Step title="Copy the source into your project">
              {sources.map((s) => (
                <Code key={s.file} code={s.source} title={`components/ui/${s.file}.tsx`} maxHeight="22rem" />
              ))}
            </Step>
            <Step title="Make sure the foundation is in place">
              <P>
                Components read their colors, radius and surfaces from the tokens in{" "}
                <InlineCode>app/globals.css</InlineCode>. See{" "}
                <a href="/docs/theming" className="font-medium underline underline-offset-4">Theming</a>.
              </P>
            </Step>
          </ol>
        </Section>
      )}

      {importLine && (
        <Section>
          <H2 id="usage">Usage</H2>
          <Code code={importLine} />
        </Section>
      )}

      {rest.length > 0 && (
        <Section>
          <H2 id="examples">Examples</H2>
          <div className="flex flex-col gap-12">
            {rest.map((ex) => (
              <div key={ex.name} className="flex flex-col gap-3">
                <H3 id={ex.name}>{ex.title}</H3>
                {ex.description && <P className="text-sm">{ex.description}</P>}
                <ComponentPreview name={ex.name} />
              </div>
            ))}
          </div>
        </Section>
      )}
    </DocPage>
  )
}

function Step({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <li className="relative flex flex-col gap-3 [counter-increment:step] before:absolute before:top-0 before:-left-[37px] before:flex before:size-6 before:items-center before:justify-center before:rounded-full before:border before:bg-background before:font-mono before:text-xs before:text-muted-foreground before:content-[counter(step)]">
      <h3 className="font-medium">{title}</h3>
      {children}
    </li>
  )
}
