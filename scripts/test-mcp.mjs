// Smoke test for the MCP server.
// Usage: node scripts/test-mcp.mjs [url]   (default http://127.0.0.1:8787/mcp)
import { Client } from "@modelcontextprotocol/sdk/client/index.js"
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js"

const url = new URL(process.argv[2] ?? "http://127.0.0.1:8787/mcp")
const client = new Client({ name: "sabil-ui-smoke-test", version: "1.0.0" })
await client.connect(new StreamableHTTPClientTransport(url))

const info = client.getServerVersion()
console.log(`server: ${info?.name} ${info?.version}`)

const { tools } = await client.listTools()
console.log(`tools (${tools.length}): ${tools.map((t) => t.name).join(", ")}`)

const calls = [
  ["get_rules", {}],
  ["list_components", {}],
  ["get_component", { name: "Dropdown Menu" }],
  ["get_component", { name: "button", detail: "full" }],
  ["get_component", { name: "nope" }],
  ["get_component_source", { name: "button" }],
  ["get_component_source", { name: "toast" }],
  ["get_tokens", {}],
  ["get_setup", {}],
  ["get_motion", {}],
  ["get_motion", { pattern: "drawer" }],
  ["get_html_edition", {}],
  ["search_docs", { query: "modal dialog" }],
]

let failed = 0
for (const [name, args] of calls) {
  const res = await client.callTool({ name, arguments: args })
  const text = res.content?.[0]?.text ?? ""
  const expectError = args.name === "nope"
  const ok = expectError ? res.isError === true : !res.isError && text.length > 0
  if (!ok) failed++
  const first = text.split("\n").find((l) => l.trim()) ?? ""
  console.log(`${ok ? "ok  " : "FAIL"} ${name}(${JSON.stringify(args)}) ${text.length} chars | ${first.slice(0, 70)}`)
}

await client.close()
console.log(failed ? `${failed} failed` : "all passed")
process.exit(failed ? 1 : 0)
