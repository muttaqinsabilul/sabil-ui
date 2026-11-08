/**
 * Design rules for AI assistants. One source for the /docs/ai page and
 * its Markdown version (/docs/ai.md), which is also included in llms.txt.
 */
export type RuleSection = {
  id: string
  title: string
  intro?: string
  rules?: string[]
  table?: { head: string[]; rows: string[][] }
  code?: { lang: string; code: string }
}

export const aiIntro =
  "Paste this page (or its Markdown at /docs/ai.md) into any AI assistant before asking it to build UI. It tells the model exactly how Sabil UI looks and which pieces to use."

export const aiRules: RuleSection[] = [
  {
    id: "stack",
    title: "Stack",
    rules: [
      "React with Tailwind CSS v4 and Radix UI primitives. Components live in `@/components/ui/<name>` and are imported by name, e.g. `import { Button } from \"@/components/ui/button\"`.",
      "Merge class names with `cn` from `@/lib/utils`.",
      "Icons come from `lucide-react`. Inside buttons, icons are 16px and need no size class.",
      "Motion: CSS for press, hover and overlays; the `motion` package (`import { motion } from \"motion/react\"`) for springs, gestures, exit and layout animation.",
      "Without React or Tailwind, use the plain edition: `sabil.css` + `sabil.js` with `s-*` classes (see /docs/html-css).",
    ],
  },
  {
    id: "tokens",
    title: "Use tokens, never raw values",
    intro: "Always use the semantic Tailwind classes below. Never hard-code hex colors, pixel radii or shadows.",
    table: {
      head: ["Purpose", "Class", "Light", "Dark"],
      rows: [
        ["Page background", "bg-background", "#ffffff", "#0a0a0a"],
        ["Text", "text-foreground", "#0a0a0a", "#fafafa"],
        ["Secondary text", "text-muted-foreground", "#45556c", "#a1a1a6"],
        ["Primary action (blue)", "bg-primary / text-primary", "#056dff", "#2b7bff"],
        ["Subtle fill, tracks", "bg-muted / bg-secondary", "#f1f5f9", "#1d1d1f"],
        ["Hover fill", "bg-accent", "#0a0a0a 4%", "#ffffff 6%"],
        ["Hairline", "border / border-border", "#0a0a0a 8%", "#ffffff 9%"],
        ["Danger", "bg-destructive / text-destructive", "#e7000b", "#ff6467"],
        ["Cards, popovers", "bg-card / bg-popover", "#ffffff", "#121212 / #161616"],
        ["Warm preview panel", "bg-panel", "#f9f8f6", "#1a1918"],
      ],
    },
  },
  {
    id: "shape",
    title: "Size and shape",
    table: {
      head: ["Element", "Value", "Class"],
      rows: [
        ["Buttons, inputs, selects (default)", "40px high", "built into the components"],
        ["Small controls", "32px high", 'size="sm"'],
        ["Tab trigger", "6px radius", "rounded-md"],
        ["Controls, menu items", "8px radius", "rounded-lg"],
        ["Menus, popovers, dialogs, cards", "12px radius", "rounded-xl"],
        ["Large cards, chat bubbles", "16px radius", "rounded-2xl"],
        ["Font", "Inter; Geist Mono for code", "font-sans / font-mono"],
        ["Body text", "14px", "text-sm"],
        ["Button text", "14px, 500, -0.01em tracking", "built in"],
        ["Headings", "semibold, tight tracking", "font-semibold tracking-tight"],
      ],
    },
  },
  {
    id: "surfaces",
    title: "Surfaces",
    rules: [
      "Primary actions use `<Button>` (default variant): a blue vertical gradient (#3c86ff → #056dff) with a 1px inner edge. Do not restyle it with bg-blue-*.",
      "Secondary actions use `<Button variant=\"outline\">`: white, hairline ring, `0 1px 2px` shadow.",
      "One primary button per view or form. Everything else is outline, secondary or ghost.",
      "Segmented controls and tabs sit on a flat slate track (`bg-muted`, 2px padding); the active item is white with `shadow-xs`.",
      "Menus and popovers: `bg-popover`, `rounded-xl`, a 6% hairline ring and a soft `shadow-lg`. Items are `rounded-lg`.",
      "Utilities available: `surface-primary`, `surface-raised`, `surface-sunken`, `bg-dots` (dotted canvas).",
    ],
  },
  {
    id: "components",
    title: "Pick the right component",
    intro: "Prefer an existing component over custom markup. All 66 are listed at /docs/components.",
    table: {
      head: ["Need", "Use"],
      rows: [
        ["Action", "Button, ButtonGroup"],
        ["Form field", "Field + Label + Input / Textarea / Select / Checkbox / Switch / RadioGroup"],
        ["Pick one of a few options", "Tabs (segmented) or ToggleGroup"],
        ["Search a long list", "Combobox or Command"],
        ["Confirm a destructive action", "AlertDialog"],
        ["Form or details on top of the page", "Dialog (desktop) or Drawer / Sheet (mobile, side panels)"],
        ["Actions behind a button", "DropdownMenu"],
        ["Site navigation with previews", "NavigationMenu"],
        ["Status or feedback", "Badge, Alert, Toast (sonner), Progress, Spinner, Skeleton"],
        ["Content block", "Card, Item, Empty"],
        ["Data", "Table, DataTable, Chart"],
        ["Chat UI", "Message, Bubble, MessageScroller, Attachment"],
      ],
    },
  },
  {
    id: "motion",
    title: "Motion",
    rules: [
      "Easing: `ease-out` for enter, exit and feedback (it is overridden to cubic-bezier(0.23, 1, 0.32, 1)); `ease-in-out` for movement on screen. Never `ease-in`.",
      "Durations: press 150ms, tooltips and menus 150–200ms, dialogs 200–300ms, drawers 400ms. Keep interface motion under 300ms.",
      "Pressable elements scale to 0.97 on press. Buttons already do this.",
      "Enter from `scale(0.95)` + `opacity: 0`, never from `scale(0)`. Exit faster than enter.",
      "Animate `transform` and `opacity` only. Never `transition: all`.",
      "No animation on things opened from the keyboard many times a day (command palettes, shortcuts).",
      "Respect `prefers-reduced-motion`: in Motion, read `useReducedMotion()` and drop movement.",
    ],
  },
  {
    id: "dont",
    title: "Do not",
    rules: [
      "Do not use raw Tailwind palette colors (`bg-blue-500`, `text-gray-600`, `border-zinc-200`). Use the tokens.",
      "Do not add borders to primary buttons or change button heights by hand.",
      "Do not mix radii: controls `rounded-lg`, containers `rounded-xl`.",
      "Do not use pure black text on white for secondary copy; use `text-muted-foreground`.",
      "Do not use more than one primary (blue) button in a group.",
      "Do not invent new shadows. Use `shadow-xs` for raised controls and `shadow-lg` for overlays.",
    ],
  },
  {
    id: "example",
    title: "Example",
    intro: "A sign-in card that follows every rule above.",
    code: {
      lang: "tsx",
      code: `import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function SignIn() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>Use your work email.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="you@example.com" />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input id="password" type="password" />
        </Field>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button className="w-full">Sign in</Button>
        <Button variant="outline" className="w-full">Continue with SSO</Button>
      </CardFooter>
    </Card>
  )
}`,
    },
  },
]

/** The rules as one Markdown document. */
export function aiRulesMarkdown(siteUrl: string) {
  const out: string[] = [
    "# Sabil UI — rules for AI assistants",
    "",
    aiIntro,
    "",
    `Docs: ${siteUrl}/docs · Components: ${siteUrl}/docs/components · Tokens: ${siteUrl}/tokens.json`,
    "",
  ]
  for (const s of aiRules) {
    out.push(`## ${s.title}`, "")
    if (s.intro) out.push(s.intro, "")
    if (s.rules) out.push(...s.rules.map((r) => `- ${r}`), "")
    if (s.table) {
      out.push(`| ${s.table.head.join(" | ")} |`, `| ${s.table.head.map(() => "---").join(" | ")} |`)
      out.push(...s.table.rows.map((r) => `| ${r.map((c) => c.replace(/\|/g, "\\|")).join(" | ")} |`), "")
    }
    if (s.code) out.push("```" + s.code.lang, s.code.code, "```", "")
  }
  return out.join("\n")
}
