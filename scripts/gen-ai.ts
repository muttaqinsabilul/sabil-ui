/**
 * Generates the machine-readable side of the site into public/:
 *
 *   llms.txt, llms-full.txt     index + full docs for AI assistants
 *   <page>.md                   Markdown twin of every docs page
 *   tokens.json                 design tokens (W3C Design Tokens format)
 *   r/index.json, r/<name>.json component registry (source + dependencies)
 *   sitemap.xml, robots.txt
 *
 * Run: npx tsx scripts/gen-ai.ts   (runs automatically before dev and build)
 */
import fs from "node:fs"
import path from "node:path"

import { aiRulesMarkdown } from "@/lib/ai-rules"
import { htmlComponents } from "@/lib/html-components"
import { mcpMarkdown, mcpUrl } from "@/lib/mcp"
import { motionFoundations, motionGroups, motionPatterns } from "@/lib/motion"
import { components, gettingStarted, siteConfig } from "@/lib/registry"

const root = path.resolve(import.meta.dirname, "..")
const pub = path.join(root, "public")
const URL_ = siteConfig.url
const NAME = siteConfig.name

/* ------------------------------------------------------------------ */
/* Helpers                                                              */
/* ------------------------------------------------------------------ */

const read = (rel: string) => {
  const p = path.join(root, rel)
  return fs.existsSync(p) ? fs.readFileSync(p, "utf8") : null
}

function write(rel: string, content: string) {
  const p = path.join(pub, rel)
  fs.mkdirSync(path.dirname(p), { recursive: true })
  fs.writeFileSync(p, content.replace(/\r\n/g, "\n"))
}

const fence = (code: string, lang = "tsx") => "```" + lang + "\n" + code.replace(/\s+$/, "") + "\n```"

function exportsOf(source: string) {
  const block = source.match(/export\s*\{([^}]*)\}/)
  if (!block) return []
  return block[1]
    .split(",")
    .map((x) => x.trim())
    .filter((x) => x && !x.startsWith("type ") && !/^use[A-Z]/.test(x) && !/Variants$/.test(x))
}

/** npm packages and local aliases a file imports. */
function importsOf(source: string) {
  const npm = new Set<string>()
  const local = new Set<string>()
  for (const m of source.matchAll(/from\s+["']([^"']+)["']/g)) {
    const spec = m[1]
    if (spec.startsWith("@/")) local.add(spec.slice(2))
    else if (!spec.startsWith(".") && !["react", "react-dom", "next"].includes(spec)) {
      npm.add(spec.startsWith("@") ? spec.split("/").slice(0, 2).join("/") : spec.split("/")[0])
    }
  }
  return { npm: [...npm].sort(), local: [...local] }
}

function exampleSource(name: string) {
  return read(`components/examples/${name}.tsx`)
}

function importLine(file: string, source: string) {
  const ex = exportsOf(source)
  if (!ex.length) return null
  return ex.length > 3
    ? `import {\n${ex.map((e) => `  ${e},`).join("\n")}\n} from "@/components/ui/${file}"`
    : `import { ${ex.join(", ")} } from "@/components/ui/${file}"`
}

/* ------------------------------------------------------------------ */
/* Tokens                                                               */
/* ------------------------------------------------------------------ */

function cssVars(css: string, selector: string) {
  const start = css.indexOf(`${selector} {`)
  if (start < 0) return {}
  const body = css.slice(start, css.indexOf("\n}", start))
  const vars: Record<string, string> = {}
  for (const m of body.matchAll(/--([a-z0-9-]+):\s*([^;]+);/g)) vars[m[1]] = m[2].trim()
  return vars
}

const globals = read("app/globals.css") ?? ""
const light = cssVars(globals, ":root")
const dark = cssVars(globals, ".dark")

function buildTokens() {
  const color: Record<string, unknown> = {}
  for (const [name, value] of Object.entries(light)) {
    if (!value.startsWith("#")) continue
    color[name] = {
      $type: "color",
      $value: value,
      $extensions: { "ui.sabil.modes": { light: value, dark: dark[name] ?? value } },
    }
  }
  const px = (n: number) => ({ $type: "dimension", $value: `${n}px` })
  return {
    $description: `${NAME} design tokens. Colors carry light and dark values under $extensions["ui.sabil.modes"].`,
    color,
    radius: { sm: px(4), md: px(6), lg: px(8), xl: px(12), "2xl": px(16), full: px(9999) },
    size: { control: px(40), "control-sm": px(32), "control-lg": px(44), "tab-trigger": px(32) },
    font: {
      sans: { $type: "fontFamily", $value: ["Inter", "system-ui", "sans-serif"] },
      mono: { $type: "fontFamily", $value: ["Geist Mono", "ui-monospace", "monospace"] },
      body: { $type: "dimension", $value: "14px" },
      "button-tracking": { $type: "dimension", $value: "-0.01em" },
    },
    shadow: {
      xs: { $type: "shadow", $value: { offsetX: "0px", offsetY: "1px", blur: "2px", spread: "0px", color: "#0000000d" } },
    },
    gradient: {
      primary: {
        $type: "gradient",
        $value: [
          { color: light["primary-highlight"] ?? "#3c86ff", position: 0 },
          { color: light.primary ?? "#056dff", position: 1 },
        ],
      },
    },
    easing: {
      out: { $type: "cubicBezier", $value: [0.23, 1, 0.32, 1] },
      "in-out": { $type: "cubicBezier", $value: [0.77, 0, 0.175, 1] },
      drawer: { $type: "cubicBezier", $value: [0.32, 0.72, 0, 1] },
    },
    duration: {
      press: { $type: "duration", $value: "150ms" },
      menu: { $type: "duration", $value: "180ms" },
      dialog: { $type: "duration", $value: "200ms" },
      drawer: { $type: "duration", $value: "400ms" },
    },
  }
}

/* ------------------------------------------------------------------ */
/* Registry                                                             */
/* ------------------------------------------------------------------ */

type Item = {
  name: string
  type: string
  title: string
  description: string
  docs?: string
  dependencies: string[]
  registryDependencies: string[]
  files: { path: string; type: string; content: string }[]
}

function itemFor(rel: string, type: string, name: string): Item | null {
  const content = read(rel)
  if (content === null) return null
  const { npm, local } = importsOf(content)
  const doc = components.find((c) => c.slug === name || c.files[0] === name)
  return {
    name,
    type,
    title: doc?.title ?? name.replace(/(^|-)([a-z])/g, (_, s, c) => (s ? " " : "") + c.toUpperCase()),
    description: doc?.description ?? "",
    docs: doc ? `${URL_}/docs/components/${doc.slug}` : undefined,
    dependencies: npm,
    registryDependencies: local.map((l) => l.split("/").pop()!).filter((n) => n !== name),
    files: [{ path: rel, type, content }],
  }
}

function buildRegistry() {
  const items = new Map<string, Item>()
  const add = (rel: string, type: string, name: string) => {
    if (items.has(name)) return
    const it = itemFor(rel, type, name)
    if (!it) return
    items.set(name, it)
    // Pull in local files this one imports (hooks, lib helpers).
    for (const dep of importsOf(it.files[0].content).local) {
      const [dir, file] = dep.split("/")
      if (dir === "components" ) continue
      const ext = fs.existsSync(path.join(root, `${dir}/${file}.tsx`)) ? "tsx" : "ts"
      add(`${dir}/${file}.${ext}`, dir === "hooks" ? "registry:hook" : "registry:lib", file)
    }
  }
  for (const f of fs.readdirSync(path.join(root, "components/ui")).sort()) {
    if (f.endsWith(".tsx")) add(`components/ui/${f}`, "registry:ui", f.slice(0, -4))
  }
  // The foundation: tokens, variants and motion curves.
  items.set("theme", {
    name: "theme",
    type: "registry:style",
    title: "Theme",
    description: "The Sabil UI foundation: color, radius, surface and motion tokens. Install this first.",
    docs: `${URL_}/docs/theming`,
    dependencies: ["tailwindcss", "tw-animate-css"],
    registryDependencies: [],
    files: [
      { path: "app/globals.css", type: "registry:style", content: read("app/globals.css") ?? "" },
      { path: "app/variants.css", type: "registry:style", content: read("app/variants.css") ?? "" },
    ],
  })
  return [...items.values()]
}

/* ------------------------------------------------------------------ */
/* Markdown pages                                                       */
/* ------------------------------------------------------------------ */

const pages: { href: string; title: string; description: string; md: string; full: string }[] = []

function page(href: string, title: string, description: string, body: string, full = body) {
  const head = `# ${title}\n\n> ${description}\n\nSource: ${URL_}${href}\n\n`
  pages.push({ href, title, description, md: head + body.trim() + "\n", full: `# ${title}\n\n${description}\n\n${full.trim()}\n` })
}

function themingBody() {
  const rows = Object.keys(light)
    .filter((k) => light[k].startsWith("#"))
    .map((k) => `| --${k} | ${light[k]} | ${dark[k] ?? ""} |`)
  return [
    "Every visual decision lives in a CSS variable in `app/globals.css`. Components only read tokens.",
    "",
    "## Colors",
    "",
    "| Token | Light | Dark |",
    "| --- | --- | --- |",
    ...rows,
    "",
    "## Radius",
    "",
    "`--radius: 0.5rem`. Scale: sm 4px, md 6px (tab trigger), lg 8px (controls, menu items), xl 12px (menus, popovers, dialogs), 2xl 16px (cards, bubbles).",
    "",
    "## Surfaces",
    "",
    "- `surface-primary`: vertical gradient from `--primary-highlight` (#3c86ff) to `--primary` (#056dff), inset 0 0 1px edge, 0 1px 2px shadow.",
    "- `surface-raised`: white control with a hairline ring and 0 1px 2px shadow.",
    "- `surface-sunken`: flat slate track.",
    "- `bg-dots`: dotted canvas.",
    "",
    "## Typography",
    "",
    "Inter for interface text, Geist Mono for code. Body 14px. Buttons 14px/500 with -0.01em tracking. Headings semibold with tight tracking.",
    "",
    `Machine-readable: ${URL_}/tokens.json`,
  ].join("\n")
}

function buildPages() {
  page(
    "/docs",
    "Introduction",
    siteConfig.description,
    [
      `${NAME} is a collection of components you copy into your app and own. It is built on Radix primitives and Tailwind CSS v4, with its own design foundation.`,
      "",
      "## Principles",
      "",
      "- Open code: every component is a file in your project.",
      "- One foundation: color, radius, depth and motion live in tokens.",
      "- Tactile surfaces: primary actions use a blue gradient with a 1px inner edge; secondary actions sit on a raised white surface.",
      "- Fast by default: short, purposeful motion.",
      "",
      "## Editions",
      "",
      `- React + Tailwind: ${URL_}/docs/components`,
      `- Plain HTML, CSS & JS: ${URL_}/docs/html-css`,
      `- Rules for AI assistants: ${URL_}/docs/ai`,
    ].join("\n")
  )

  page(
    "/docs/installation",
    "Installation",
    "Set up Next.js, Tailwind CSS v4 and the foundation, then add components.",
    [
      "1. Create a Next.js app with Tailwind CSS v4:",
      "",
      fence("npx create-next-app@latest my-app --typescript --tailwind --app", "bash"),
      "",
      "2. Install the base dependencies:",
      "",
      fence("npm install radix-ui class-variance-authority cn lucide-react tw-animate-css next-themes", "bash"),
      "",
      `3. Replace \`app/globals.css\` with the foundation (${URL_}/r/theme.json contains both files: \`globals.css\` and \`variants.css\`).`,
      "",
      "4. Add the cn helper:",
      "",
      fence('export { cn } from "cn"', "ts"),
      "",
      `5. Add components: copy the source from ${URL_}/r/<name>.json (field \`files[].content\`) into \`components/ui/<name>.tsx\` and install its \`dependencies\`.`,
    ].join("\n")
  )

  page("/docs/theming", "Theming", "Every visual decision lives in a CSS variable.", themingBody())

  page(
    "/docs/dark-mode",
    "Dark Mode",
    "Dark mode swaps token values under a .dark class.",
    [
      "Use `next-themes` with `attribute=\"class\"` and add `suppressHydrationWarning` to `<html>`.",
      "",
      fence(`<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
  {children}
</ThemeProvider>`),
      "",
      "Plain HTML edition: add `class=\"dark\"` or `data-theme=\"dark\"` to `<html>`.",
    ].join("\n")
  )

  page("/docs/ai", "AI & LLMs", "Rules for AI assistants building UI with Sabil UI.", aiRulesMarkdown(URL_).split("\n").slice(4).join("\n"))

  page("/docs/mcp", "MCP Server", "Remote MCP server for Claude Code, Cursor and VS Code.", mcpMarkdown())

  // HTML edition
  const htmlStatic = htmlComponents.filter((c) => !c.interactive)
  const htmlInteractive = htmlComponents.filter((c) => c.interactive)
  const htmlBody = (withCode: boolean) =>
    [
      "Same foundation as one CSS file and one dependency-free script. No React, no Tailwind, no build step.",
      "",
      fence(`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400..700&display=swap">
<link rel="stylesheet" href="${URL_}/sabil.css">
<script src="${URL_}/sabil.js" defer></script>
<body class="s-body">…</body>`, "html"),
      "",
      "Classes start with `s-`, tokens with `--s-`, attributes with `data-s-`. Dark mode: `class=\"dark\"` on `<html>`.",
      "",
      "## JavaScript API",
      "",
      fence(`Sabil.toast({ title, description, variant: "destructive", action: { label, onClick } })
Sabil.openDialog(id); Sabil.closeDialog(id)
Sabil.init(container)  // after inserting tabs or comboboxes
// events: "s-select" (menu), "s-change" (tabs, combobox)`, "javascript"),
      "",
      "## Components (CSS only)",
      "",
      ...htmlStatic.flatMap((c) => [`### ${c.title}`, "", c.description, "", ...(withCode ? [fence(c.html, "html"), ""] : [])]),
      "## Interactive (needs sabil.js)",
      "",
      ...htmlInteractive.flatMap((c) => [`### ${c.title}`, "", c.description, "", ...(withCode ? [fence(c.html, "html"), ""] : [])]),
    ].join("\n")
  page("/docs/html-css", "HTML, CSS & JS", "Sabil UI without React or Tailwind.", htmlBody(true), htmlBody(true))

  // Component index + pages
  page(
    "/docs/components",
    "Components",
    `${components.length} components built on the same foundation.`,
    components.map((c) => `- [${c.title}](${URL_}/docs/components/${c.slug}.md): ${c.description}`).join("\n")
  )

  for (const c of components) {
    const sources = c.files
      .map((f) => ({ f, s: read(`components/ui/${f}.tsx`) }))
      .filter((x): x is { f: string; s: string } => !!x.s)
    const deps = [...new Set(sources.flatMap((x) => importsOf(x.s).npm))]
    const imp = sources[0] ? importLine(sources[0].f, sources[0].s) : null
    const examples = c.examples
      .map((e) => ({ ...e, code: exampleSource(e.name) }))
      .filter((e): e is typeof e & { code: string } => !!e.code)
    const hero = examples[0]

    const install = sources.length
      ? [
          "## Installation",
          "",
          ...(deps.length ? [fence(`npm install ${deps.join(" ")}`, "bash"), ""] : []),
          ...sources.flatMap((x) => [`\`components/ui/${x.f}.tsx\` (also at ${URL_}/r/${x.f}.json)`, "", fence(x.s), ""]),
        ]
      : []
    const usage = imp ? ["## Usage", "", fence(imp), ""] : []

    page(
      `/docs/components/${c.slug}`,
      c.title,
      c.description,
      [
        ...install,
        ...usage,
        "## Examples",
        "",
        ...examples.flatMap((e) => [`### ${e.title}`, "", ...(e.description ? [e.description, ""] : []), fence(e.code), ""]),
      ].join("\n"),
      // Shorter version for llms-full.txt: usage + one example, no full source.
      [
        ...(deps.length ? [`Dependencies: ${deps.join(", ")}. Source: ${URL_}/r/${c.files[0]}.json`, ""] : []),
        ...usage,
        ...(hero ? ["## Example", "", fence(hero.code), ""] : []),
      ].join("\n")
    )
  }

  // Motion
  page(
    "/motion",
    "Motion Foundation",
    "How things move: short, purposeful animation that gives feedback and keeps space consistent.",
    [
      "## Tokens",
      "",
      fence(`--ease-out: cubic-bezier(0.23, 1, 0.32, 1);     /* enter, exit, feedback */
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1); /* movement on screen */
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);  /* sheets and drawers */`, "css"),
      "",
      "CSS for predetermined motion (press, hover, overlays). The `motion` package for springs, gestures, exit and layout animation.",
      "",
      ...motionGroups.flatMap((g) => [
        `## ${g}`,
        "",
        ...motionPatterns.filter((p) => p.group === g).map((p) => `- [${p.title}](${URL_}/motion/${p.slug}.md): ${p.description}`),
        "",
      ]),
    ].join("\n")
  )

  page(
    "/motion/principles",
    "Principles",
    "Decide how often people see it and what it is for, before animating.",
    [
      "| Seen | Examples | Decision |",
      "| --- | --- | --- |",
      "| 100+ times a day | Command palette, shortcuts | No animation |",
      "| Tens of times a day | Hover, list navigation, tabs | Very short or none |",
      "| Occasionally | Dialogs, drawers, toasts | Standard animation |",
      "| Rarely | Onboarding, success states | Room for delight |",
      "",
      "Rules: never scale from 0 (start at 0.95 + opacity 0); never ease-in; popovers grow from their trigger, dialogs stay centered; exit faster than enter; animate transform and opacity only; transitions over keyframes for interruptible UI; gate hover motion behind (hover: hover); never block input during animation.",
    ].join("\n")
  )
  page(
    "/motion/easing",
    "Easing",
    "Strong ease-out curves start fast, so the interface feels instant.",
    [
      "| Curve | Value | Use |",
      "| --- | --- | --- |",
      "| --ease-out | cubic-bezier(0.23, 1, 0.32, 1) | Enter, exit, press feedback (default) |",
      "| --ease-in-out | cubic-bezier(0.77, 0, 0.175, 1) | Movement on screen |",
      "| --ease-drawer | cubic-bezier(0.32, 0.72, 0, 1) | Sheets and drawers |",
      "| ease | — | Color and opacity on hover |",
      "| linear | — | Spinners, progress, hold-to-confirm |",
      "",
      "Never use ease-in for interface motion.",
    ].join("\n")
  )
  page(
    "/motion/duration",
    "Duration",
    "Interface motion stays under 300ms.",
    [
      "| Element | Duration | Easing |",
      "| --- | --- | --- |",
      "| Press feedback | 100–160ms | --ease-out |",
      "| Tooltip, small popover | 125–200ms | --ease-out |",
      "| Dropdown, select | 150–250ms | --ease-out |",
      "| Dialog, sheet | 200–300ms | --ease-out |",
      "| Drawer | 400ms | --ease-drawer |",
      "| Hover color | 150ms | ease |",
      "",
      "Exits are 20–30% shorter than enters.",
    ].join("\n")
  )
  page(
    "/motion/reduced-motion",
    "Reduced Motion",
    "When people ask for less motion, remove movement but keep fades.",
    [
      "CSS: the foundation shortens all animations and transitions under `prefers-reduced-motion: reduce`.",
      "",
      fence(`import { motion, useReducedMotion } from "motion/react"
const reduce = useReducedMotion()
<motion.div initial={{ opacity: 0, y: reduce ? 0 : 16 }} animate={{ opacity: 1, y: 0 }} />`),
    ].join("\n")
  )

  for (const p of motionPatterns) {
    const examples = p.examples
      .map((e) => ({ ...e, code: exampleSource(e.name) }))
      .filter((e): e is typeof e & { code: string } => !!e.code)
    const body = [
      `Group: ${p.group}. Built with: ${p.engine}.`,
      "",
      "## Specs",
      "",
      "| | |",
      "| --- | --- |",
      ...p.specs.map((s) => `| ${s.label} | ${s.value.replace(/\|/g, "\\|")} |`),
      "",
      "## Use for",
      "",
      ...p.use.map((u) => `- ${u}`),
      "",
      "## Avoid",
      "",
      ...p.avoid.map((u) => `- ${u}`),
      "",
    ]
    page(
      `/motion/${p.slug}`,
      p.title,
      p.description,
      [...body, "## Code", "", ...examples.flatMap((e) => [fence(e.code), ""])].join("\n"),
      body.join("\n")
    )
  }
}

/* ------------------------------------------------------------------ */
/* Write everything                                                     */
/* ------------------------------------------------------------------ */

function mdPath(href: string) {
  return `${href.replace(/^\//, "")}.md`
}

function clean() {
  for (const rel of ["llms.txt", "llms-full.txt", "tokens.json", "sitemap.xml", "robots.txt", "docs.md", "motion.md", "docs", "motion", "r"]) {
    fs.rmSync(path.join(pub, rel), { recursive: true, force: true })
  }
}

function main() {
  clean()
  buildPages()

  for (const p of pages) write(mdPath(p.href), p.md)

  const section = (title: string, list: typeof pages) => [
    `## ${title}`,
    "",
    ...list.map((p) => `- [${p.title}](${URL_}/${mdPath(p.href)}): ${p.description}`),
    "",
  ]
  const byPrefix = (pre: string) => pages.filter((p) => p.href.startsWith(pre))
  const startHrefs = new Set([...gettingStarted.map((g) => g.href), "/docs/components"])
  const motionHrefs = new Set(motionFoundations.map((f) => f.href))

  write(
    "llms.txt",
    [
      `# ${NAME}`,
      "",
      `> ${siteConfig.description}`,
      "",
      `Read ${URL_}/docs/ai.md first: it holds the rules an assistant must follow to build UI with ${NAME}.`,
      "",
      `MCP server (Streamable HTTP, no auth): ${mcpUrl} — setup at ${URL_}/docs/mcp.md`,
      "",
      ...section("Getting started", pages.filter((p) => startHrefs.has(p.href))),
      ...section("Components", byPrefix("/docs/components/")),
      ...section("Motion foundations", pages.filter((p) => motionHrefs.has(p.href))),
      ...section("Motion patterns", byPrefix("/motion/").filter((p) => !motionHrefs.has(p.href))),
      "## Machine-readable",
      "",
      `- [Full docs in one file](${URL_}/llms-full.txt)`,
      `- [Design tokens](${URL_}/tokens.json): W3C Design Tokens format, light and dark values`,
      `- [Component registry](${URL_}/r/index.json): every component with its source, npm dependencies and internal dependencies at /r/<name>.json`,
      "",
    ].join("\n")
  )

  const order = [
    ...pages.filter((p) => p.href === "/docs/ai"),
    ...pages.filter((p) => p.href !== "/docs/ai"),
  ]
  write(
    "llms-full.txt",
    [`# ${NAME} — full documentation`, "", `> ${siteConfig.description}`, "", `Site: ${URL_}`, "", ...order.map((p) => p.full + "\n---\n")].join("\n")
  )

  write("tokens.json", JSON.stringify(buildTokens(), null, 2) + "\n")

  const registry = buildRegistry()
  for (const it of registry) write(`r/${it.name}.json`, JSON.stringify(it, null, 2) + "\n")
  write(
    "r/index.json",
    JSON.stringify(
      {
        name: "sabil-ui",
        homepage: URL_,
        items: registry.map(({ files, ...rest }) => ({ ...rest, files: files.map((f) => ({ path: f.path, type: f.type })) })),
      },
      null,
      2
    ) + "\n"
  )

  const urls = ["/", ...pages.map((p) => p.href)]
  write(
    "sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
      .map((u) => `  <url><loc>${URL_}${u === "/" ? "" : u}</loc></url>`)
      .join("\n")}\n</urlset>\n`
  )
  write("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${URL_}/sitemap.xml\n`)

  const size = (rel: string) => (fs.statSync(path.join(pub, rel)).size / 1024).toFixed(0) + " KB"
  console.log(
    `gen-ai: ${pages.length} markdown pages, ${registry.length} registry items, llms.txt ${size("llms.txt")}, llms-full.txt ${size("llms-full.txt")}`
  )
}

main()
