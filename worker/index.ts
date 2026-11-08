/**
 * Sabil UI — Cloudflare Worker.
 *
 * Every path is a static file (free, unlimited) except /mcp, which runs this
 * script: a stateless MCP server for AI assistants (Claude Code, Cursor,
 * VS Code...). Its tools read the same generated files the site serves
 * (/docs/**.md, /r/*.json, /tokens.json, /llms.txt), so the MCP server is
 * always in sync with the docs.
 */
import { McpServer } from "@modelcontextprotocol/server"
import { createMcpHandler } from "agents/mcp/server"
import { z } from "zod"

interface Env {
  ASSETS: Fetcher
}

const SITE = "https://ui.muttaqinsabilul.my.id"

/** Reads a generated file from the static assets. */
async function asset(env: Env, path: string): Promise<string | null> {
  const res = await env.ASSETS.fetch(new Request(new URL(path, SITE)))
  return res.ok ? res.text() : null
}

const text = (t: string) => ({ content: [{ type: "text" as const, text: t }] })
const fail = (t: string) => ({ content: [{ type: "text" as const, text: t }], isError: true })

const slugify = (name: string) =>
  name
    .trim()
    .toLowerCase()
    .replace(/\.(tsx|json|md)$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")

// Registry file names that differ from their docs page.
const docsAlias: Record<string, string> = { sonner: "toast" }
const sourceAlias: Record<string, string> = { toast: "sonner", "data-table": "table", "date-picker": "calendar" }

/** Keeps the summary, Usage and the first example of a component page. */
function usageOnly(md: string) {
  const head = md.split("\n## ")[0]
  const usage = md.match(/\n## Usage\n[\s\S]*?(?=\n## |$)/)?.[0] ?? ""
  const examples = md.match(/\n## Examples\n([\s\S]*)$/)?.[1] ?? ""
  const first = examples.split(/\n(?=### )/).find((b) => b.startsWith("### ")) ?? ""
  return [head.trim(), usage.trim(), first ? `## Example\n\n${first.trim()}` : ""].filter(Boolean).join("\n\n")
}

function buildServer(env: Env) {
  const server = new McpServer(
    { name: "sabil-ui", title: "Sabil UI", version: "1.0.0", websiteUrl: SITE },
    {
      instructions:
        "Sabil UI is a React + Tailwind CSS v4 design system (Radix primitives) with a plain HTML/CSS/JS edition. " +
        "Before building any UI with it, call get_rules. Use list_components and get_component to pick and use components, " +
        "get_component_source to write a component file into a project, and get_tokens for exact values.",
    }
  )

  const readOnly = { readOnlyHint: true, openWorldHint: false }

  server.registerTool(
    "get_rules",
    {
      title: "Design rules",
      description:
        "The rules an assistant must follow to build UI with Sabil UI: stack, tokens, sizes, surfaces, which component to use, motion and things to avoid. Call this first.",
      annotations: readOnly,
    },
    async () => text((await asset(env, "/docs/ai.md")) ?? "Rules not found.")
  )

  server.registerTool(
    "list_components",
    {
      title: "List components",
      description: "Every Sabil UI component with a one-line description.",
      annotations: readOnly,
    },
    async () => text((await asset(env, "/docs/components.md")) ?? "Component list not found.")
  )

  server.registerTool(
    "get_component",
    {
      title: "Get component docs",
      description:
        "Docs for one component: import line, examples and, with detail='full', its complete source and all examples.",
      inputSchema: z.object({
        name: z.string().describe('Component name, e.g. "button", "dropdown-menu", "Navigation Menu"'),
        detail: z
          .enum(["usage", "full"])
          .default("usage")
          .describe('"usage" = import + one example (short). "full" = source + every example (long).'),
      }),
      annotations: readOnly,
    },
    async ({ name, detail }) => {
      const slug = docsAlias[slugify(name)] ?? slugify(name)
      const md = await asset(env, `/docs/components/${slug}.md`)
      if (!md) return fail(`No component "${name}". Call list_components to see the names.`)
      return text(detail === "full" ? md : usageOnly(md))
    }
  )

  server.registerTool(
    "get_component_source",
    {
      title: "Get component source",
      description:
        "The files to write into a project for one component (path + full content), its npm dependencies and the other Sabil UI files it needs.",
      inputSchema: z.object({
        name: z.string().describe('Component or file name, e.g. "button", "sonner", "use-mobile", "theme"'),
      }),
      annotations: readOnly,
    },
    async ({ name }) => {
      const slug = sourceAlias[slugify(name)] ?? slugify(name)
      const raw = await asset(env, `/r/${slug}.json`)
      if (!raw) return fail(`No registry item "${name}". Call list_components, or try "theme" for the foundation.`)
      const item = JSON.parse(raw) as {
        name: string
        dependencies: string[]
        registryDependencies: string[]
        files: { path: string; content: string }[]
      }
      const parts = [
        `# ${item.name}`,
        item.dependencies.length ? `Install: \`npm install ${item.dependencies.join(" ")}\`` : "No npm dependencies.",
        item.registryDependencies.length
          ? `Also needs these Sabil UI files (fetch each with get_component_source): ${item.registryDependencies.join(", ")}`
          : "",
        ...item.files.map((f) => `## ${f.path}\n\n\`\`\`${f.path.split(".").pop()}\n${f.content.trimEnd()}\n\`\`\``),
      ]
      return text(parts.filter(Boolean).join("\n\n"))
    }
  )

  server.registerTool(
    "get_tokens",
    {
      title: "Get design tokens",
      description: "All design tokens (colors with light and dark values, radius, sizes, fonts, shadow, gradient, easing, durations) as W3C Design Tokens JSON.",
      annotations: readOnly,
    },
    async () => text((await asset(env, "/tokens.json")) ?? "Tokens not found.")
  )

  server.registerTool(
    "get_setup",
    {
      title: "Get setup guide",
      description: "How to add Sabil UI to a Next.js + Tailwind CSS v4 project, including the foundation CSS (globals.css and variants.css).",
      annotations: readOnly,
    },
    async () => {
      const guide = (await asset(env, "/docs/installation.md")) ?? ""
      const theme = await asset(env, "/r/theme.json")
      const files = theme
        ? (JSON.parse(theme).files as { path: string; content: string }[])
            .map((f) => `## ${f.path}\n\n\`\`\`css\n${f.content.trimEnd()}\n\`\`\``)
            .join("\n\n")
        : ""
      return text([guide, files].filter(Boolean).join("\n\n"))
    }
  )

  server.registerTool(
    "get_motion",
    {
      title: "Get motion guidance",
      description:
        "Motion foundation (easing, durations, rules) or one animation pattern with specs and code. Patterns: press, hover, enter-exit, popover-origin, stagger, collapse, tab-indicator, crossfade, number-ticker, skeleton-shimmer, toast-stack, drawer, hold-to-confirm, swipe-to-dismiss, scroll-reveal, layout-shift.",
      inputSchema: z.object({
        pattern: z.string().optional().describe("Pattern slug. Leave empty for the overview and foundations."),
      }),
      annotations: readOnly,
    },
    async ({ pattern }) => {
      if (!pattern) {
        const pages = await Promise.all(
          ["/motion.md", "/motion/principles.md", "/motion/easing.md", "/motion/duration.md"].map((p) => asset(env, p))
        )
        return text(pages.filter(Boolean).join("\n\n---\n\n"))
      }
      const md = await asset(env, `/motion/${slugify(pattern)}.md`)
      return md ? text(md) : fail(`No motion pattern "${pattern}". Call get_motion without a pattern to see the list.`)
    }
  )

  server.registerTool(
    "get_html_edition",
    {
      title: "Get the HTML, CSS & JS edition",
      description:
        "Sabil UI without React or Tailwind: setup, s-* classes, the Sabil JavaScript API and the HTML of every component. Use for Laravel, Django, Rails, Vue, WordPress or plain HTML.",
      annotations: readOnly,
    },
    async () => text((await asset(env, "/docs/html-css.md")) ?? "Not found.")
  )

  server.registerTool(
    "search_docs",
    {
      title: "Search docs",
      description: "Find docs pages (components, motion patterns, guides) matching a query. Returns titles, descriptions and Markdown links.",
      inputSchema: z.object({ query: z.string().describe('What to look for, e.g. "modal", "date input", "loading state"') }),
      annotations: readOnly,
    },
    async ({ query }) => {
      const index = (await asset(env, "/llms.txt")) ?? ""
      const entries = [...index.matchAll(/^- \[([^\]]+)\]\(([^)]+)\)(?::\s*(.*))?$/gm)].map((m) => ({
        title: m[1],
        url: m[2],
        description: m[3] ?? "",
      }))
      const words = query.toLowerCase().split(/\W+/).filter((w) => w.length > 1)
      const scored = entries
        .map((e) => {
          const hay = `${e.title} ${e.description}`.toLowerCase()
          const score = words.reduce(
            (s, w) => s + (e.title.toLowerCase().includes(w) ? 3 : 0) + (hay.includes(w) ? 1 : 0),
            0
          )
          return { ...e, score }
        })
        .filter((e) => e.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 8)
      if (!scored.length) return text(`No match for "${query}". Try list_components or get_rules.`)
      return text(scored.map((e) => `- [${e.title}](${e.url}): ${e.description}`).join("\n"))
    }
  )

  return server
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url)
    if (url.pathname === "/mcp") {
      const handler = createMcpHandler(() => buildServer(env), {
        route: "/mcp",
        allowedHostnames: ["ui.muttaqinsabilul.my.id", "localhost", "127.0.0.1"],
      })
      return handler(request, env, ctx)
    }
    // Anything else that reached the Worker: serve it as a static file.
    return env.ASSETS.fetch(request)
  },
} satisfies ExportedHandler<Env>
