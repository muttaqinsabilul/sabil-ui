import type { Metadata } from "next"

import { mcpClients, mcpPrompts, mcpTools, mcpUrl } from "@/lib/mcp"
import { Code } from "@/components/docs/code"
import { CopyButton } from "@/components/docs/copy-button"
import { DocPage, H2, H3, InlineCode, P, Section } from "@/components/docs/doc-page"

export const metadata: Metadata = { title: "MCP Server" }

export default function McpPage() {
  return (
    <DocPage
      href="/docs/mcp"
      eyebrow="Getting Started"
      title="MCP Server"
      description="Add one URL to Claude Code, Cursor or VS Code and your assistant can read Sabil UI's rules, components, tokens and motion patterns on demand. No install, no API key."
      toc={[
        { id: "url", title: "Server URL" },
        { id: "setup", title: "Setup" },
        ...mcpClients.map((c) => ({ id: c.id, title: c.name, depth: 3 as const })),
        { id: "tools", title: "Tools" },
        { id: "try", title: "Try it" },
      ]}
    >
      <Section>
        <H2 id="url">Server URL</H2>
        <div className="flex items-center justify-between gap-3 rounded-xl border bg-muted/40 py-2 pr-2 pl-4">
          <code className="truncate font-mono text-sm">{mcpUrl}</code>
          <CopyButton value={mcpUrl} />
        </div>
        <P className="text-sm">
          Remote MCP over Streamable HTTP. It reads the same files as this site, so it is always up to date. Prefer no
          MCP? Point your assistant to <InlineCode>/llms.txt</InlineCode> or the <a href="/docs/ai" className="font-medium underline underline-offset-4">AI rules</a> instead.
        </P>
      </Section>

      <Section>
        <H2 id="setup">Setup</H2>
        <div className="flex flex-col gap-8">
          {mcpClients.map((c) => (
            <div key={c.id} className="flex flex-col gap-3">
              <H3 id={c.id}>{c.name}</H3>
              <P className="text-sm">{c.note}</P>
              <Code code={c.code} lang={c.lang === "text" ? "bash" : c.lang} />
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <H2 id="tools">Tools</H2>
        <div className="overflow-hidden rounded-xl border">
          <table className="w-full text-sm">
            <tbody className="divide-y">
              {mcpTools.map(([name, description]) => (
                <tr key={name}>
                  <td className="w-52 bg-muted/50 px-4 py-2.5 align-top font-mono text-[13px]">{name}</td>
                  <td className="px-4 py-2.5 text-foreground/80">{description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section>
        <H2 id="try">Try it</H2>
        <P>After adding the server, ask your assistant:</P>
        <ul className="flex flex-col gap-2">
          {mcpPrompts.map((p) => (
            <li key={p} className="rounded-xl border px-4 py-3 text-sm">
              {p}
            </li>
          ))}
        </ul>
      </Section>
    </DocPage>
  )
}
