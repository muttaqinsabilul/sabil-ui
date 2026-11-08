import { ArrowRightIcon, BookOpenIcon, BoxIcon, PaletteIcon } from "lucide-react"

const items = [
  { icon: BookOpenIcon, title: "Guides", text: "Step by step." },
  { icon: BoxIcon, title: "Components", text: "Copy and own." },
  { icon: PaletteIcon, title: "Theming", text: "Your tokens." },
]

/**
 * Tailwind v4's `hover:` variant already applies only on devices that
 * support hover, so touch screens never get a stuck hover state.
 */
export default function MotionHoverDemo() {
  return (
    <div className="grid w-full max-w-xl gap-3 sm:grid-cols-3">
      {items.map((i) => (
        <a
          key={i.title}
          href="#"
          className="group flex flex-col gap-3 rounded-xl border bg-card p-4 shadow-xs transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md"
        >
          <i.icon className="size-5 text-primary" />
          <div className="flex flex-col gap-0.5">
            <span className="flex items-center gap-1 text-sm font-medium">
              {i.title}
              <ArrowRightIcon className="size-3.5 text-muted-foreground transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
            </span>
            <span className="text-xs text-muted-foreground">{i.text}</span>
          </div>
        </a>
      ))}
    </div>
  )
}
