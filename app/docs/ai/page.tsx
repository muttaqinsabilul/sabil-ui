import type { Metadata } from "next"

import { aiIntro, aiRules, aiRulesMarkdown } from "@/lib/ai-rules"
import { siteConfig } from "@/lib/registry"
import { Code } from "@/components/docs/code"
import { CopyButton } from "@/components/docs/copy-button"
import { DocPage, H2, InlineCode, P, Section } from "@/components/docs/doc-page"

export const metadata: Metadata = { title: "AI & LLMs" }

/** Renders `code` spans inside a plain rule string. */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(`[^`]+`)/g).map((part, i) =>
        part.startsWith("`") ? <InlineCode key={i}>{part.slice(1, -1)}</InlineCode> : part
      )}
    </>
  )
}

const prompt = `Build a settings page for a SaaS app with Sabil UI.
Follow the rules at ${siteConfig.url}/docs/ai.md and use only its components and tokens.`

export default function AiPage() {
  const md = aiRulesMarkdown(siteConfig.url)

  return (
    <DocPage
      href="/docs/ai"
      eyebrow="Getting Started"
      title="AI & LLMs"
      description={aiIntro}
      toc={[
        { id: "quick-start", title: "Quick start" },
        { id: "files", title: "Machine-readable files" },
        ...aiRules.map((s) => ({ id: s.id, title: s.title })),
      ]}
    >
      <Section>
        <H2 id="quick-start">Quick start</H2>
        <P>Give your assistant the link to the rules together with your request:</P>
        <Code code={prompt} lang="markdown" />
        <div className="flex flex-wrap items-center gap-3 rounded-xl border bg-muted/40 p-3 pl-4 text-sm">
          <span className="mr-auto text-muted-foreground">Or copy all rules as Markdown and paste them into the chat.</span>
          <span className="flex items-center gap-1 font-medium">
            Copy rules
            <CopyButton value={md} />
          </span>
        </div>
      </Section>

      <Section>
        <H2 id="files">Machine-readable files</H2>
        <div className="overflow-hidden rounded-xl border">
          <table className="w-full text-sm">
            <tbody className="divide-y">
              {[
                ["/llms.txt", "Index of every page, for assistants that read links."],
                ["/llms-full.txt", "All docs in one file: rules, foundation, components, motion."],
                ["/docs/ai.md", "These rules as Markdown."],
                ["<any page>.md", "Every page has a Markdown twin, e.g. /docs/components/button.md."],
                ["/tokens.json", "Design tokens in the W3C Design Tokens format."],
                ["/r/index.json", "Component registry: source, dependencies and files of every component."],
              ].map(([path, text]) => (
                <tr key={path}>
                  <td className="w-48 bg-muted/50 px-4 py-2.5 align-top">
                    {path.startsWith("/") ? (
                      <a href={path} className="font-mono text-[13px] text-primary underline-offset-4 hover:underline">
                        {path}
                      </a>
                    ) : (
                      <span className="font-mono text-[13px]">{path}</span>
                    )}
                  </td>
                  <td className="px-4 py-2.5 text-foreground/80">{text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {aiRules.map((s) => (
        <Section key={s.id}>
          <H2 id={s.id}>{s.title}</H2>
          {s.intro && <P>{s.intro}</P>}
          {s.rules && (
            <ul className="flex list-disc flex-col gap-2 pl-5 leading-7 text-foreground/80 marker:text-muted-foreground">
              {s.rules.map((r) => (
                <li key={r}>
                  <Rich text={r} />
                </li>
              ))}
            </ul>
          )}
          {s.table && (
            <div className="overflow-x-auto rounded-xl border">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-left text-muted-foreground">
                  <tr>
                    {s.table.head.map((h) => (
                      <th key={h} className="px-4 py-2.5 font-medium whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {s.table.rows.map((row) => (
                    <tr key={row.join()}>
                      {row.map((cell, i) => (
                        <td key={i} className={i === 0 ? "px-4 py-2.5" : "px-4 py-2.5 font-mono text-[13px]"}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {s.code && <Code code={s.code.code} lang={s.code.lang} />}
        </Section>
      ))}
    </DocPage>
  )
}
