import type { Metadata } from "next"

import { htmlComponents, type HtmlComponent } from "@/lib/html-components"
import { Code } from "@/components/docs/code"
import { DocPage, H2, H3, InlineCode, P, Section } from "@/components/docs/doc-page"
import { HtmlFrame } from "@/components/docs/html-frame"
import { PreviewTabs } from "@/components/docs/preview-tabs"
import { readSource } from "@/components/docs/source"

export const metadata: Metadata = { title: "HTML, CSS & JS" }

const staticOnes = htmlComponents.filter((c) => !c.interactive)
const interactive = htmlComponents.filter((c) => c.interactive)

function Example({ c }: { c: HtmlComponent }) {
  return (
    <div className="flex flex-col gap-3">
      <H3 id={`html-${c.id}`}>{c.title}</H3>
      <P className="text-sm">{c.description}</P>
      <PreviewTabs
        preview={<HtmlFrame html={c.html} title={`${c.title} preview`} minHeight={c.minHeight} />}
        code={<Code code={c.html} lang="html" maxHeight="28rem" />}
        className="[&_[data-slot=tabs-content]>div]:min-h-0 [&_[data-slot=tabs-content]>div]:border-0 [&_[data-slot=tabs-content]>div]:bg-none [&_[data-slot=tabs-content]>div]:p-0"
      />
    </div>
  )
}

export default async function HtmlCssPage() {
  const css = (await readSource("public/kanvas.css")) ?? ""
  const js = (await readSource("public/kanvas.js")) ?? ""

  return (
    <DocPage
      href="/docs/html-css"
      eyebrow="Getting Started"
      title="HTML, CSS & JS"
      description="The same foundation as one CSS file and one small script. No React, no Tailwind, no build step. Works in plain HTML, Laravel, Django, Rails, Vue, WordPress — anything that renders HTML."
      toc={[
        { id: "setup", title: "Setup" },
        { id: "dark-mode", title: "Dark mode" },
        { id: "javascript-api", title: "JavaScript API" },
        { id: "components", title: "Components" },
        ...staticOnes.map((c) => ({ id: `html-${c.id}`, title: c.title, depth: 3 as const })),
        { id: "interactive", title: "Interactive" },
        ...interactive.map((c) => ({ id: `html-${c.id}`, title: c.title, depth: 3 as const })),
        { id: "source", title: "Full source" },
      ]}
    >
      <Section>
        <H2 id="setup">Setup</H2>
        <P>
          Download{" "}
          <a href="/kanvas.css" download className="font-medium text-primary underline underline-offset-4">
            kanvas.css
          </a>{" "}
          and{" "}
          <a href="/kanvas.js" download className="font-medium text-primary underline underline-offset-4">
            kanvas.js
          </a>
          , then link both with the Inter font. Add <InlineCode>k-body</InlineCode> to{" "}
          <InlineCode>&lt;body&gt;</InlineCode>. Every class starts with <InlineCode>k-</InlineCode> and every token with{" "}
          <InlineCode>--k-</InlineCode>, so nothing clashes with your other CSS. The script has no dependencies and is
          only needed for the interactive components.
        </P>
        <Code
          lang="html"
          code={`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400..700&display=swap">
    <link rel="stylesheet" href="kanvas.css">
    <script src="kanvas.js" defer></script>
  </head>
  <body class="k-body">
    <button class="k-btn" data-k-toast="Hello from Kanvas">Sign in</button>
  </body>
</html>`}
        />
      </Section>

      <Section>
        <H2 id="dark-mode">Dark mode</H2>
        <P>
          Add <InlineCode>class=&quot;dark&quot;</InlineCode> or <InlineCode>data-theme=&quot;dark&quot;</InlineCode> to{" "}
          <InlineCode>&lt;html&gt;</InlineCode>. The previews below follow the theme of this site.
        </P>
        <Code lang="html" code={`<html lang="en" class="dark">`} />
      </Section>

      <Section>
        <H2 id="javascript-api">JavaScript API</H2>
        <P>
          Components wire themselves up from <InlineCode>data-k-*</InlineCode> attributes, including markup added after
          the page loads. When you need code, use the global <InlineCode>Kanvas</InlineCode> object and listen for its
          events.
        </P>
        <Code
          lang="javascript"
          code={`// Toasts
Kanvas.toast("Saved")
Kanvas.toast({ title: "Upload failed", description: "Max 10 MB.", variant: "destructive" })
Kanvas.toast({ title: "Archived", action: { label: "Undo", onClick: () => restore() } })

// Dialogs and sheets
Kanvas.openDialog("edit-profile")
Kanvas.closeDialog("edit-profile")

// After inserting tabs or comboboxes with JavaScript
Kanvas.init(container)

// Events (they bubble)
menu.addEventListener("k-select", (e) => console.log(e.detail.value))
combobox.addEventListener("k-change", (e) => console.log(e.detail.value))
tabs.addEventListener("k-change", (e) => console.log(e.detail.tab))`}
        />
      </Section>

      <Section>
        <H2 id="components">Components</H2>
        <P className="text-sm">
          These need only <InlineCode>kanvas.css</InlineCode>. Each preview runs in an isolated frame, so what you see is
          exactly what a plain HTML page gets.
        </P>
        <div className="flex flex-col gap-12">
          {staticOnes.map((c) => (
            <Example key={c.id} c={c} />
          ))}
        </div>
      </Section>

      <Section>
        <H2 id="interactive">Interactive</H2>
        <P className="text-sm">
          These also need <InlineCode>kanvas.js</InlineCode>. Keyboard support, focus management and enter/exit motion
          are built in. Dialogs and sheets use the native <InlineCode>&lt;dialog&gt;</InlineCode> element.
        </P>
        <div className="flex flex-col gap-12">
          {interactive.map((c) => (
            <Example key={c.id} c={c} />
          ))}
        </div>
      </Section>

      <Section>
        <H2 id="source">Full source</H2>
        <Code code={css} lang="css" title="kanvas.css" maxHeight="24rem" />
        <Code code={js} lang="javascript" title="kanvas.js" maxHeight="24rem" />
      </Section>
    </DocPage>
  )
}
