/** MCP server info, shared by the /docs/mcp page and its Markdown twin. */
export const mcpUrl = "https://ui.muttaqinsabilul.my.id/mcp"

export const mcpTools = [
  ["get_rules", "Design rules to follow. Assistants call this first."],
  ["list_components", "Every component with a one-line description."],
  ["get_component", "Import line and example for one component; detail \"full\" adds its source and all examples."],
  ["get_component_source", "Files to write into a project, with npm and internal dependencies."],
  ["get_tokens", "All design tokens as W3C Design Tokens JSON."],
  ["get_setup", "Project setup and the foundation CSS."],
  ["get_motion", "Motion foundations, or one of 16 animation patterns with code."],
  ["get_html_edition", "The plain HTML, CSS & JS edition."],
  ["search_docs", "Find components and guides by keyword."],
] as const

export const mcpClients = [
  {
    id: "claude-code",
    name: "Claude Code",
    note: "Run once in your terminal. Add --scope project to share it with your team through .mcp.json.",
    lang: "bash",
    code: `claude mcp add --transport http sabil-ui ${mcpUrl}`,
  },
  {
    id: "cursor",
    name: "Cursor",
    note: "Add to .cursor/mcp.json in your project, or ~/.cursor/mcp.json for every project.",
    lang: "json",
    code: `{
  "mcpServers": {
    "sabil-ui": {
      "url": "${mcpUrl}"
    }
  }
}`,
  },
  {
    id: "vscode",
    name: "VS Code",
    note: "Add to .vscode/mcp.json, then click Start above the server. Works with GitHub Copilot in agent mode.",
    lang: "json",
    code: `{
  "servers": {
    "sabil-ui": {
      "type": "http",
      "url": "${mcpUrl}"
    }
  }
}`,
  },
  {
    id: "claude-desktop",
    name: "Claude Desktop & claude.ai",
    note: "Settings → Connectors → Add custom connector. Name it Sabil UI and paste the URL.",
    lang: "text",
    code: mcpUrl,
  },
]

export const mcpPrompts = [
  "Build a pricing page with Sabil UI.",
  "Add a Sabil UI dialog to edit the user profile in this project.",
  "Which Sabil UI component should I use for picking a date range?",
  "Animate this list with the Sabil UI stagger pattern.",
]

export function mcpMarkdown() {
  return [
    "Sabil UI has a remote MCP server. Add one URL to your AI tool and it can read the rules, components, tokens and motion patterns on demand. No install, no API key.",
    "",
    `URL: ${mcpUrl}`,
    "",
    "## Setup",
    "",
    ...mcpClients.flatMap((c) => [`### ${c.name}`, "", c.note, "", "```" + c.lang, c.code, "```", ""]),
    "## Tools",
    "",
    "| Tool | What it returns |",
    "| --- | --- |",
    ...mcpTools.map(([n, d]) => `| ${n} | ${d.replace(/\|/g, "\\|")} |`),
    "",
    "## Try",
    "",
    ...mcpPrompts.map((p) => `- ${p}`),
  ].join("\n")
}
