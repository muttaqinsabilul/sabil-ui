import { cn } from "@/lib/utils"
import { highlightCode } from "@/lib/highlighter"
import { CopyButton } from "@/components/docs/copy-button"

/** Server-rendered, syntax-highlighted code block with a copy button. */
export async function Code({
  code,
  lang = "tsx",
  title,
  className,
  maxHeight,
}: {
  code: string
  lang?: string
  title?: string
  className?: string
  maxHeight?: string
}) {
  const value = code.replace(/\n$/, "")
  const lines = (await highlightCode(value, lang)) ?? value.split("\n")

  return (
    <div
      className={cn(
        "group/code relative overflow-hidden rounded-xl border bg-muted/40 dark:bg-card",
        className
      )}
    >
      {title && (
        <div className="flex h-10 items-center border-b px-4 font-mono text-xs text-muted-foreground">
          {title}
        </div>
      )}
      <CopyButton value={value} className="absolute top-1.5 right-1.5 z-10" />
      <pre
        className="overflow-auto py-3.5 font-mono text-[13px] leading-6"
        style={maxHeight ? { maxHeight } : undefined}
      >
        <code className="grid min-w-full">
          {lines.map((line, i) => (
            <span key={i} className="min-h-6 px-4 pr-12 whitespace-pre">
              {line}
            </span>
          ))}
        </code>
      </pre>
    </div>
  )
}
