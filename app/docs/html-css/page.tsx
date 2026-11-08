import type { Metadata } from "next"

import { htmlComponents } from "@/lib/html-components"
import { Code } from "@/components/docs/code"
import { DocPage, H2, H3, InlineCode, P, Section } from "@/components/docs/doc-page"
import { HtmlFrame } from "@/components/docs/html-frame"
import { PreviewTabs } from "@/components/docs/preview-tabs"
import { readSource } from "@/components/docs/source"

export const metadata: Metadata = { title: "HTML & CSS" }

export default async function HtmlCssPage() {
  const css = (await readSource("public/kanvas.css")) ?? ""

  return (
    <DocPage
      href="/docs/html-css"
      eyebrow="Getting Started"
      title="HTML & CSS"
      description="The same foundation as one plain CSS file. No React, no Tailwind, no build step. Link it and use the k-* classes."
      toc={[
        { id: "setup", title: "Setup" },
        { id: "dark-mode", title: "Dark mode" },
        { id: "components", title: "Components" },
        ...htmlComponents.map((c) => ({ id: `html-${c.id}`, title: c.title, depth: 3 as const })),
        { id: "source", title: "Full source" },
      ]}
    >
      <Section>
        <H2 id="setup">Setup</H2>
        <P>
          Download <a href="/kanvas.css" download className="font-medium text-primary underline underline-offset-4">kanvas.css</a>{" "}
          and link it with the Inter font. Add <InlineCode>k-body</InlineCode> to <InlineCode>&lt;body&gt;</InlineCode> for
          the base font and colors. Every class starts with <InlineCode>k-</InlineCode> and every token with{" "}
          <InlineCode>--k-</InlineCode>, so the file never clashes with other CSS.
        </P>
        <Code
          lang="html"
          code={`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400..700&display=swap">
    <link rel="stylesheet" href="kanvas.css">
  </head>
  <body class="k-body">
    <button class="k-btn">Sign in</button>
  </body>
</html>`}
        />
        <P className="text-sm">
          What is included: buttons, form controls, checkbox, radio, switch, segmented control, badge, card, alert, avatar,
          accordion, table, breadcrumb, pagination, progress, skeleton, spinner, tooltip, kbd and empty state. Components
          that need real JavaScript, such as dropdown menus, dialogs, comboboxes and data tables, stay in the React
          edition.
        </P>
      </Section>

      <Section>
        <H2 id="dark-mode">Dark mode</H2>
        <P>
          Add <InlineCode>class=&quot;dark&quot;</InlineCode> or <InlineCode>data-theme=&quot;dark&quot;</InlineCode> to{" "}
          <InlineCode>&lt;html&gt;</InlineCode>. The previews below follow the theme of this site.
        </P>
        <Code
          lang="html"
          code={`<html lang="en" class="dark">`}
        />
      </Section>

      <Section>
        <H2 id="components">Components</H2>
        <P className="text-sm">
          Each preview runs in an isolated frame that loads only <InlineCode>kanvas.css</InlineCode>.
        </P>
        <div className="flex flex-col gap-12">
          {htmlComponents.map((c) => (
            <div key={c.id} className="flex flex-col gap-3">
              <H3 id={`html-${c.id}`}>{c.title}</H3>
              <P className="text-sm">{c.description}</P>
              <PreviewTabs
                preview={<HtmlFrame html={c.html} title={`${c.title} preview`} />}
                code={<Code code={c.html} lang="html" maxHeight="28rem" />}
                className="[&_[data-slot=tabs-content]>div]:min-h-0 [&_[data-slot=tabs-content]>div]:border-0 [&_[data-slot=tabs-content]>div]:bg-none [&_[data-slot=tabs-content]>div]:p-0"
              />
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <H2 id="source">Full source</H2>
        <Code code={css} lang="css" title="kanvas.css" maxHeight="28rem" />
      </Section>
    </DocPage>
  )
}
