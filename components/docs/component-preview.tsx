import { examples } from "@/components/examples"
import { Code } from "@/components/docs/code"
import { PreviewTabs } from "@/components/docs/preview-tabs"
import { readSource } from "@/components/docs/source"

/** Live example + its exact source, read from components/examples/<name>.tsx. */
export async function ComponentPreview({
  name,
  align,
  className,
}: {
  name: string
  align?: "center" | "start"
  className?: string
}) {
  const Example = examples[name]
  const source = await readSource(`components/examples/${name}.tsx`)

  if (!Example || !source) {
    return (
      <p className="rounded-xl border border-dashed p-6 text-sm text-muted-foreground">
        Example <code className="font-mono">{name}</code> not found.
      </p>
    )
  }

  return (
    <PreviewTabs
      align={align}
      className={className}
      preview={<Example />}
      code={<Code code={source} maxHeight="32rem" />}
    />
  )
}
