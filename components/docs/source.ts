import "server-only"

import { promises as fs } from "fs"
import path from "path"

const root = process.cwd()

export async function readSource(relativePath: string) {
  try {
    return await fs.readFile(path.join(root, relativePath), "utf8")
  } catch {
    return null
  }
}

/** Names exported by a component file, e.g. `export { Card, CardHeader }`. */
export function getExports(source: string) {
  const block = source.match(/export\s*\{([^}]*)\}/)
  if (!block) return []
  return block[1]
    .split(",")
    .map((x) => x.trim())
    .filter((x) => x && !x.startsWith("type ") && !/^use[A-Z]/.test(x) && !/Variants$/.test(x))
}

/** Third-party packages imported by a file (not React, not local aliases). */
export function getDependencies(source: string) {
  const deps = new Set<string>()
  for (const m of source.matchAll(/from\s+["']([^"']+)["']/g)) {
    const spec = m[1]
    if (spec.startsWith(".") || spec.startsWith("@/") || spec === "react" || spec === "react-dom") continue
    const name = spec.startsWith("@") ? spec.split("/").slice(0, 2).join("/") : spec.split("/")[0]
    deps.add(name)
  }
  return [...deps]
}
