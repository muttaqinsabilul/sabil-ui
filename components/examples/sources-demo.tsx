import { Citation, Source, Sources, SourcesContent, SourcesTrigger } from "@/components/ui/sources"

const sources = [
  { title: "Lazy loading Client Components", href: "https://nextjs.org/docs/app/guides/lazy-loading" },
  { title: "Code splitting", href: "https://developer.mozilla.org/en-US/docs/Glossary/Code_splitting" },
  { title: "React.lazy", href: "https://react.dev/reference/react/lazy" },
]

export default function SourcesDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <p className="text-sm leading-relaxed">
        Load heavy components only when a page needs them. In Next.js, use <code>next/dynamic</code>
        <Citation href={sources[0].href}>1</Citation>. It splits the code into its own chunk
        <Citation href={sources[1].href}>2</Citation> and wraps <code>React.lazy</code>
        <Citation href={sources[2].href}>3</Citation>.
      </p>
      <Sources defaultOpen>
        <SourcesTrigger count={sources.length} />
        <SourcesContent>
          {sources.map((s, i) => (
            <Source key={s.href} index={i + 1} href={s.href} title={s.title} />
          ))}
        </SourcesContent>
      </Sources>
    </div>
  )
}
