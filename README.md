# Sabil UI

A component library and documentation site with its own design foundation.
Built with Next.js, Tailwind CSS v4 and Radix UI.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. The docs live at `/docs`.

## Structure

| Path | What it holds |
| --- | --- |
| `app/globals.css` | The foundation: color, radius, surface and motion tokens |
| `components/ui/` | The components. Copy these into other projects |
| `components/examples/` | Live examples shown on the docs pages |
| `components/docs/` | Docs site parts: preview, code block, table of contents |
| `lib/registry.ts` | The list of components, titles and descriptions |
| `scripts/gen-examples.mjs` | Builds the example index. Runs before `dev` and `build` |

## Add a component

1. Put the component in `components/ui/<name>.tsx`.
2. Add a line for it in `lib/registry.ts`.
3. Add examples in `components/examples/<name>-demo.tsx` (and `<name>-*.tsx` for more).
4. Run `npm run dev`. The example index regenerates and the page appears at `/docs/components/<name>`.

## Licenses

MIT. Some parts are adapted from other open-source projects; see
`THIRD-PARTY-LICENSES.md`.
