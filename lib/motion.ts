export type MotionSpec = { label: string; value: string }

export type MotionPattern = {
  slug: string
  title: string
  description: string
  group: "Interaction" | "State" | "Gesture & Overlay" | "Scroll & Layout"
  /** Example files in components/examples (first is the hero). */
  examples: { name: string; title: string; description?: string }[]
  specs: MotionSpec[]
  use: string[]
  avoid: string[]
  /** CSS only, or needs the Motion library. */
  engine: "CSS" | "Motion" | "CSS + Motion"
}

export const motionFoundations = [
  { href: "/motion", title: "Overview" },
  { href: "/motion/principles", title: "Principles" },
  { href: "/motion/easing", title: "Easing" },
  { href: "/motion/duration", title: "Duration" },
  { href: "/motion/reduced-motion", title: "Reduced Motion" },
]

export const motionGroups = ["Interaction", "State", "Gesture & Overlay", "Scroll & Layout"] as const

export const motionPatterns: MotionPattern[] = [
  // Interaction
  {
    slug: "press",
    title: "Press",
    group: "Interaction",
    engine: "CSS",
    description: "Pressable elements scale down slightly while held. It tells the user the interface heard them.",
    examples: [{ name: "motion-press-demo", title: "Default" }],
    specs: [
      { label: "Property", value: "transform: scale(0.97)" },
      { label: "Duration", value: "150ms" },
      { label: "Easing", value: "--ease-out" },
      { label: "Trigger", value: ":active" },
    ],
    use: ["Buttons, toggles, cards that act as buttons", "Any element the user clicks or taps"],
    avoid: ["Scale below 0.95 — it looks like the element is collapsing", "Scaling on hover instead of press"],
  },
  {
    slug: "hover",
    title: "Hover",
    group: "Interaction",
    engine: "CSS",
    description: "Small lifts and nudges that hint an element is interactive. Only on devices with a real pointer.",
    examples: [{ name: "motion-hover-demo", title: "Default" }],
    specs: [
      { label: "Property", value: "transform, box-shadow, color" },
      { label: "Duration", value: "150–200ms" },
      { label: "Easing", value: "ease / --ease-out" },
      { label: "Gate", value: "@media (hover: hover) and (pointer: fine)" },
    ],
    use: ["Cards and links in a grid", "Arrows that point to the next step"],
    avoid: ["Hover effects on touch devices — they stick after a tap", "Large movement on lists the user scans often"],
  },
  {
    slug: "enter-exit",
    title: "Enter & Exit",
    group: "Interaction",
    engine: "Motion",
    description: "Elements fade and grow in from 95% scale, and leave faster than they came. Nothing appears from nothing.",
    examples: [{ name: "motion-enter-exit-demo", title: "Default" }],
    specs: [
      { label: "Enter", value: "opacity 0→1, scale 0.95→1, blur 4px→0 · 200ms" },
      { label: "Exit", value: "opacity 1→0, scale 1→0.97 · 150ms" },
      { label: "Easing", value: "--ease-out" },
      { label: "Tool", value: "AnimatePresence" },
    ],
    use: ["Panels, banners and cards that mount or unmount", "Notifications and inline confirmations"],
    avoid: ["scale(0) — use 0.95 or higher", "Exit slower than enter"],
  },
  {
    slug: "popover-origin",
    title: "Popover Origin",
    group: "Interaction",
    engine: "CSS",
    description: "Popovers grow out of the element that opened them. Modals are the exception: they stay centered.",
    examples: [{ name: "motion-popover-origin-demo", title: "Default" }],
    specs: [
      { label: "Property", value: "transform-origin: var(--radix-*-transform-origin)" },
      { label: "Duration", value: "150–200ms" },
      { label: "Easing", value: "--ease-out" },
      { label: "From", value: "scale 0.95, opacity 0" },
    ],
    use: ["Dropdowns, popovers, tooltips, selects", "Anything anchored to a trigger"],
    avoid: ["transform-origin: center on anchored overlays", "Origin-aware scaling on dialogs"],
  },
  {
    slug: "stagger",
    title: "Stagger",
    group: "Interaction",
    engine: "Motion",
    description: "Items that arrive together enter one after another, a few milliseconds apart. The eye reads it as one motion.",
    examples: [{ name: "motion-stagger-demo", title: "Default" }],
    specs: [
      { label: "Delay between items", value: "30–60ms" },
      { label: "Item", value: "opacity 0→1, y 8px→0 · 250ms" },
      { label: "Easing", value: "--ease-out" },
      { label: "Max items", value: "~8, then no delay" },
    ],
    use: ["First load of a list or grid", "Menu items, search results"],
    avoid: ["Blocking clicks until the stagger ends", "Long delays — total stagger over 400ms feels slow"],
  },

  // State
  {
    slug: "collapse",
    title: "Collapse",
    group: "State",
    engine: "Motion",
    description: "Content expands and collapses with its real height, so the layout below moves instead of jumping.",
    examples: [{ name: "motion-collapse-demo", title: "Default" }],
    specs: [
      { label: "Property", value: "height auto, opacity" },
      { label: "Duration", value: "250ms" },
      { label: "Easing", value: "--ease-in-out" },
      { label: "Chevron", value: "rotate 0→90°, 200ms" },
    ],
    use: ["Accordions, FAQs, advanced settings", "Show more / show less"],
    avoid: ["Animating max-height with a guessed value", "Collapsing content the user is reading"],
  },
  {
    slug: "tab-indicator",
    title: "Tab Indicator",
    group: "State",
    engine: "Motion",
    description: "The active indicator slides between options, so the user sees where the selection went.",
    examples: [{ name: "motion-tab-indicator-demo", title: "Default" }],
    specs: [
      { label: "Technique", value: "Shared layoutId" },
      { label: "Spring", value: "duration 0.35, bounce 0.15" },
      { label: "Label color", value: "150ms ease" },
    ],
    use: ["Segmented controls, tabs, nav pills", "Filters with a single selection"],
    avoid: ["Animating when switching with the keyboard many times", "Bounce above 0.2 in dense tools"],
  },
  {
    slug: "crossfade",
    title: "Crossfade + Blur",
    group: "State",
    engine: "Motion",
    description: "Labels and icons swap through a short blur, so two states read as one change instead of two overlapping objects.",
    examples: [{ name: "motion-crossfade-demo", title: "Default" }],
    specs: [
      { label: "Out", value: "opacity 0, blur 4px, y -6px" },
      { label: "In", value: "opacity 1, blur 0, y 0" },
      { label: "Duration", value: "200ms" },
      { label: "Tool", value: "AnimatePresence mode=\"popLayout\"" },
    ],
    use: ["Copy → Copied, Save → Saved", "Icon swaps: play / pause, sun / moon"],
    avoid: ["Blur above 8px — it is expensive and looks smeared", "Changing the button width during the swap"],
  },
  {
    slug: "number-ticker",
    title: "Number Ticker",
    group: "State",
    engine: "Motion",
    description: "Numbers count to their new value with a spring, so the size of the change is visible.",
    examples: [{ name: "motion-number-ticker-demo", title: "Default" }],
    specs: [
      { label: "Tool", value: "useSpring + useTransform" },
      { label: "Spring", value: "stiffness 90, damping 20" },
      { label: "Digits", value: "tabular-nums" },
    ],
    use: ["Dashboards, pricing toggles, counters", "Values that change while the user watches"],
    avoid: ["Financial values the user must read exactly at all times", "Proportional digits — the width jitters"],
  },
  {
    slug: "skeleton-shimmer",
    title: "Skeleton Shimmer",
    group: "State",
    engine: "CSS",
    description: "A soft highlight sweeps across placeholders while content loads. Fast enough to feel busy, slow enough to stay calm.",
    examples: [{ name: "motion-skeleton-shimmer-demo", title: "Default" }],
    specs: [
      { label: "Property", value: "background-position" },
      { label: "Duration", value: "1.4s per sweep" },
      { label: "Easing", value: "linear, infinite" },
      { label: "Swap", value: "crossfade to content, 200ms" },
    ],
    use: ["First load of cards, lists, profiles", "Content that takes over ~300ms"],
    avoid: ["Shimmer on content that loads instantly", "Skeleton shapes that do not match the real layout"],
  },

  // Gesture & Overlay
  {
    slug: "toast-stack",
    title: "Toast Stack",
    group: "Gesture & Overlay",
    engine: "Motion",
    description: "New toasts push in from the edge. Older ones tuck behind and fan out on hover.",
    examples: [{ name: "motion-toast-stack-demo", title: "Default" }],
    specs: [
      { label: "Enter", value: "y 100%→0, opacity 0→1" },
      { label: "Collapsed", value: "scale −5% per level, offset 10px" },
      { label: "Spring", value: "duration 0.4, bounce 0" },
      { label: "Expand", value: "on hover / focus" },
    ],
    use: ["Background results: saved, sent, failed", "Undo actions"],
    avoid: ["Keyframes — toasts arrive fast and must retarget", "Stacking more than 3 visible toasts"],
  },
  {
    slug: "drawer",
    title: "Drawer",
    group: "Gesture & Overlay",
    engine: "Motion",
    description: "A sheet slides up from the bottom and can be flicked away. Velocity counts, not only distance.",
    examples: [{ name: "motion-drawer-demo", title: "Default" }],
    specs: [
      { label: "Easing", value: "--ease-drawer (0.32, 0.72, 0, 1)" },
      { label: "Duration", value: "400ms open, 250ms close" },
      { label: "Dismiss", value: "offset > 30% or velocity > 500px/s" },
      { label: "Overscroll", value: "dragElastic 0.1 upward" },
    ],
    use: ["Mobile actions and forms", "Secondary flows that keep context"],
    avoid: ["Requiring a long drag to dismiss", "A hard stop at the top edge — add friction instead"],
  },
  {
    slug: "hold-to-confirm",
    title: "Hold to Confirm",
    group: "Gesture & Overlay",
    engine: "CSS",
    description: "Destructive actions fill up while held. Pressing is slow and deliberate, releasing snaps back fast.",
    examples: [{ name: "motion-hold-to-confirm-demo", title: "Default" }],
    specs: [
      { label: "Fill", value: "clip-path inset(0 100% 0 0) → inset(0)" },
      { label: "Hold", value: "1.5s linear" },
      { label: "Release", value: "200ms --ease-out" },
      { label: "Press", value: "scale 0.97" },
    ],
    use: ["Delete, revoke, reset", "Actions that are hard to undo"],
    avoid: ["Everyday actions — it slows people down", "Holds longer than 2 seconds"],
  },
  {
    slug: "swipe-to-dismiss",
    title: "Swipe to Dismiss",
    group: "Gesture & Overlay",
    engine: "Motion",
    description: "Cards follow the finger and leave when flicked. The rest of the list closes the gap.",
    examples: [{ name: "motion-swipe-to-dismiss-demo", title: "Default" }],
    specs: [
      { label: "Dismiss", value: "|offset| > 40% or |velocity| > 500px/s" },
      { label: "Snap back", value: "spring, bounce 0.2" },
      { label: "Opacity", value: "fades with distance" },
      { label: "Reflow", value: "layout + popLayout" },
    ],
    use: ["Notifications, inbox items, suggestions", "Lists where dismissing is common"],
    avoid: ["Swipe as the only way to dismiss — add a button", "Dismissing on a slow, short drag"],
  },

  // Scroll & Layout
  {
    slug: "scroll-reveal",
    title: "Scroll Reveal",
    group: "Scroll & Layout",
    engine: "Motion",
    description: "Sections fade up once when they enter the viewport. Once only — scrolling back does not replay.",
    examples: [{ name: "motion-scroll-reveal-demo", title: "Default" }],
    specs: [
      { label: "Trigger", value: "whileInView, once, margin −40px" },
      { label: "From", value: "opacity 0, y 16px, blur 4px" },
      { label: "Duration", value: "500ms" },
      { label: "Easing", value: "--ease-out" },
    ],
    use: ["Marketing pages, feature sections", "Images and long-form content"],
    avoid: ["Product UI the user works in every day", "Hiding content until it animates — it must stay readable"],
  },
  {
    slug: "layout-shift",
    title: "Layout Shift",
    group: "Scroll & Layout",
    engine: "Motion",
    description: "An element morphs from its place in a grid into a detail view. The user never loses track of what they opened.",
    examples: [{ name: "motion-layout-shift-demo", title: "Default" }],
    specs: [
      { label: "Technique", value: "Shared layoutId" },
      { label: "Spring", value: "duration 0.4, bounce 0.1" },
      { label: "Backdrop", value: "opacity, 200ms" },
      { label: "Close", value: "Escape, backdrop click" },
    ],
    use: ["Gallery → detail, card → expanded card", "Reordering and filtering lists"],
    avoid: ["Morphing between unrelated elements", "Text reflowing during the morph — fade it in after"],
  },
]

export function getMotionPattern(slug: string) {
  return motionPatterns.find((p) => p.slug === slug)
}

export const motionPages = [
  ...motionFoundations,
  ...motionPatterns.map((p) => ({ href: `/motion/${p.slug}`, title: p.title })),
]
