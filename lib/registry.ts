import { examplesBySlug } from "@/lib/examples.generated"

export const siteConfig = {
  name: "Sabil UI",
  description:
    "A set of beautifully crafted, accessible components with a calm, tactile design foundation. Open code. Copy it, own it, ship it.",
  url: "https://ui.muttaqinsabilul.my.id",
}

export type DocExample = {
  /** File name in components/examples, without extension. */
  name: string
  title: string
  description?: string
}

export type DocComponent = {
  slug: string
  title: string
  description: string
  /** Source files in components/ui that this component needs. */
  files: string[]
  /** First example is the hero preview. */
  examples: DocExample[]
  isNew?: boolean
}

/** Components shown in the sidebar's AI group instead of the main list. */
export const aiComponentSlugs = [
  "prompt-input",
  "reasoning",
  "tool-call",
  "sources",
  "suggestions",
  "message",
  "bubble",
  "message-scroller",
  "attachment",
  "trace",
]

export const gettingStarted = [
  { href: "/docs", title: "Introduction" },
  { href: "/docs/installation", title: "Installation" },
  { href: "/docs/theming", title: "Theming" },
  { href: "/docs/dark-mode", title: "Dark Mode" },
  { href: "/docs/html-css", title: "HTML, CSS & JS" },
  { href: "/docs/ai", title: "AI & LLMs" },
  { href: "/docs/mcp", title: "MCP Server" },
]

const exampleInfo: Record<string, { title?: string; description?: string }> = {
  "button-demo": { title: "Default", description: "Primary actions use the blue gradient surface. Secondary actions use the raised white surface." },
  "button-callout": { title: "Callout", description: "A primary and a secondary action side by side, in a tinted banner." },
  "tabs-segmented": { title: "Segmented", description: "Full-width segmented control on a sunken track." },
  "navigation-menu-demo": { title: "Default", description: "A mega menu with a live preview panel, and a simple list with a footer link." },
}

function titleFor(name: string, slug: string) {
  const prefix = slug === "toast" ? "sonner" : slug
  const rest = name === prefix ? "default" : name.slice(prefix.length + 1)
  if (rest === "demo") return "Default"
  return rest
    .split("-")
    .map((w) => (w === "rtl" ? "RTL" : w === "otp" ? "OTP" : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ")
}

const c = (
  slug: string,
  title: string,
  description: string,
  files: string[] = [slug],
  isNew = false
): DocComponent => ({
  slug,
  title,
  description,
  files,
  isNew,
  examples: (examplesBySlug[slug] ?? []).map((name) => ({
    name,
    title: exampleInfo[name]?.title ?? titleFor(name, slug),
    description: exampleInfo[name]?.description,
  })),
})

export const components: DocComponent[] = [
  c("accordion", "Accordion", "A vertically stacked set of interactive headings that each reveal a section of content."),
  c("alert", "Alert", "Displays a callout for user attention."),
  c("alert-dialog", "Alert Dialog", "A modal dialog that interrupts the user with important content and expects a response."),
  c("aspect-ratio", "Aspect Ratio", "Displays content within a desired ratio."),
  c("attachment", "Attachment", "Displays a file, image or link attached to a message or form.", ["attachment"], true),
  c("avatar", "Avatar", "An image element with a fallback for representing the user."),
  c("badge", "Badge", "Displays a badge or a component that looks like a badge."),
  c("breadcrumb", "Breadcrumb", "Displays the path to the current resource using a hierarchy of links."),
  c("bubble", "Bubble", "A chat bubble for conversational interfaces.", ["bubble"], true),
  c("button", "Button", "Displays a button or a component that looks like a button."),
  c("button-group", "Button Group", "A container that groups related buttons together with consistent styling."),
  c("calendar", "Calendar", "A date field component that allows users to enter and edit date."),
  c("card", "Card", "Displays a card with header, content, and footer."),
  c("carousel", "Carousel", "A carousel with motion and swipe built using Embla."),
  c("chart", "Chart", "Beautiful charts. Built using Recharts. Copy and paste into your apps."),
  c("checkbox", "Checkbox", "A control that allows the user to toggle between checked and not checked."),
  c("code-block", "Code Block", "Displays a block of code with syntax highlighting and a copy button.", ["code-block"], true),
  c("collapsible", "Collapsible", "An interactive component which expands or collapses a panel."),
  c("combobox", "Combobox", "Autocomplete input and command palette with a list of suggestions."),
  c("command", "Command", "Fast, composable, unstyled command menu for React."),
  c("context-menu", "Context Menu", "Displays a menu to the user, triggered by a right click."),
  c("data-table", "Data Table", "Powerful table and datagrids built using TanStack Table.", ["table"]),
  c("date-picker", "Date Picker", "A date picker component with range and presets.", ["calendar", "popover"]),
  c("dialog", "Dialog", "A window overlaid on either the primary window or another dialog window."),
  c("direction", "Direction", "Provides the reading direction (LTR or RTL) to every component below it."),
  c("drawer", "Drawer", "A drawer component for React, built on Vaul."),
  c("dropdown-menu", "Dropdown Menu", "Displays a menu to the user, such as a set of actions or functions, triggered by a button."),
  c("empty", "Empty", "Use the Empty component to display an empty state."),
  c("field", "Field", "Combine labels, controls, and help text to compose accessible form fields."),
  c("hover-card", "Hover Card", "For sighted users to preview content available behind a link."),
  c("input", "Input", "Displays a form input field or a component that looks like an input field."),
  c("input-group", "Input Group", "Add addons, buttons, and helper content to inputs."),
  c("input-otp", "Input OTP", "Accessible one-time password component with copy paste functionality."),
  c("item", "Item", "A versatile component for displaying content with media, title, description and actions."),
  c("kbd", "Kbd", "Used to display textual user input from keyboard."),
  c("label", "Label", "Renders an accessible label associated with controls."),
  c("marker", "Marker", "A compact status line for events in a timeline or activity feed.", ["marker"], true),
  c("menubar", "Menubar", "A visually persistent menu common in desktop applications."),
  c("message", "Message", "Layout for a single message in a conversation, with avatar, header and footer.", ["message", "bubble"], true),
  c("message-scroller", "Message Scroller", "A scroll container for chat that keeps the newest message in view.", ["message-scroller", "message", "bubble"], true),
  c("native-select", "Native Select", "A styled native HTML select element."),
  c("navigation-menu", "Navigation Menu", "A collection of links for navigating websites."),
  c("pagination", "Pagination", "Pagination with page navigation, next and previous links."),
  c("popover", "Popover", "Displays rich content in a portal, triggered by a button."),
  c("progress", "Progress", "Displays an indicator showing the completion progress of a task."),
  c("prompt-input", "Prompt Input", "A chat composer with tools, a model picker and a send button that turns into stop.", ["prompt-input", "button"], true),
  c("questionnaire", "Questionnaire", "A step-by-step set of questions with keyboard shortcuts.", ["questionnaire"], true),
  c("radio-group", "Radio Group", "A set of checkable buttons where no more than one can be checked at a time."),
  c("reasoning", "Reasoning", "Shows what a model is thinking, with a shimmer while it streams.", ["reasoning", "collapsible"], true),
  c("resizable", "Resizable", "Accessible resizable panel groups and layouts with keyboard support."),
  c("scroll-area", "Scroll Area", "Augments native scroll functionality for custom, cross-browser styling."),
  c("select", "Select", "Displays a list of options for the user to pick from, triggered by a button."),
  c("separator", "Separator", "Visually or semantically separates content."),
  c("sheet", "Sheet", "Extends the Dialog component to display content that complements the main content of the screen."),
  c("sidebar", "Sidebar", "A composable, themeable and customizable sidebar component."),
  c("skeleton", "Skeleton", "Use to show a placeholder while content is loading."),
  c("slider", "Slider", "An input where the user selects a value from within a given range."),
  c("spinner", "Spinner", "An indicator that can be used to show a loading state."),
  c("sources", "Sources", "Inline citations and a collapsible list of the sources behind an answer.", ["sources", "collapsible"], true),
  c("suggestions", "Suggestions", "A row of prompt chips that start a conversation.", ["suggestions"], true),
  c("switch", "Switch", "A control that allows the user to toggle between checked and not checked."),
  c("table", "Table", "A responsive table component."),
  c("tabs", "Tabs", "A set of layered sections of content, known as tab panels, displayed one at a time."),
  c("textarea", "Textarea", "Displays a form textarea or a component that looks like a textarea."),
  c("toast", "Toast", "An opinionated toast component for React, built on Sonner.", ["sonner"]),
  c("toggle", "Toggle", "A two-state button that can be either on or off."),
  c("toggle-group", "Toggle Group", "A set of two-state buttons that can be toggled on or off."),
  c("tool-call", "Tool Call", "A card for one tool call: its name, live status, input and output.", ["tool-call", "collapsible", "spinner"], true),
  c("tooltip", "Tooltip", "A popup that displays information related to an element on hover or focus."),
  c("trace", "Trace", "Shows the steps an agent or a job takes, with live status.", ["trace", "collapsible"], true),
  c("typography", "Typography", "Styles for headings, paragraphs, lists and more.", []),
]

export function getComponent(slug: string) {
  return components.find((x) => x.slug === slug)
}

/** Flat list of every docs page, in sidebar order. Used for prev/next and search. */
export const allPages = [
  ...gettingStarted,
  { href: "/docs/components", title: "Components" },
  ...components.map((x) => ({ href: `/docs/components/${x.slug}`, title: x.title })),
]
