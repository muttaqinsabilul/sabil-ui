// After `next build` (output: "export"), Next writes segment prefetch files as
// nested folders, e.g. out/docs/theming/__next.docs/theming/__PAGE__.txt, while
// the client requests the flat name out/docs/theming/__next.docs.theming.__PAGE__.txt.
// This copies every nested file to its flat name so prefetching works on a
// static host.
import fs from "node:fs"
import path from "node:path"

const out = path.resolve(import.meta.dirname, "..", "out")
let copied = 0

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (!entry.isDirectory()) continue
    if (entry.name.startsWith("__next.")) flatten(dir, full, entry.name)
    else walk(full)
  }
}

// Copies files under `root` (a "__next.*" folder) next to it with "." joins.
function flatten(parent, root, prefix) {
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const full = path.join(root, entry.name)
    const name = `${prefix}.${entry.name}`
    if (entry.isDirectory()) flatten(parent, full, name)
    else {
      fs.copyFileSync(full, path.join(parent, name))
      copied++
    }
  }
}

if (fs.existsSync(out)) {
  walk(out)
  console.log(`fix-export: ${copied} prefetch files flattened`)
}
