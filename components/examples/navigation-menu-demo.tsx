"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

type Preview = "workspace" | "automations" | "insights"

const products: { id: Preview; title: string; description: string }[] = [
  { id: "workspace", title: "Workspace", description: "Docs, tasks and threads in one calm place." },
  { id: "automations", title: "Automations", description: "Turn repeated steps into flows that run themselves." },
  { id: "insights", title: "Insights", description: "Live dashboards from the data you already have." },
]

const teams = ["Design", "Engineering", "Marketing", "Operations", "Customer success", "Finance"]

/** Small illustrations shown in the preview panel, one per product. */
function PreviewArt({ id }: { id: Preview }) {
  if (id === "workspace") {
    return (
      <div className="w-full max-w-[300px] rounded-xl bg-background p-4 shadow-xs ring-1 ring-foreground/5">
        <p className="text-xs font-medium">Q4 launch plan</p>
        <div className="mt-3 flex flex-col gap-2">
          {["w-11/12", "w-4/5", "w-2/3"].map((w) => (
            <span key={w} className={cn("h-2 rounded-full bg-muted", w)} />
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex -space-x-1.5">
            {["bg-chart-1", "bg-chart-3", "bg-chart-4"].map((c) => (
              <span key={c} className={cn("size-5 rounded-full ring-2 ring-background", c)} />
            ))}
          </div>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">In review</span>
        </div>
      </div>
    )
  }
  if (id === "automations") {
    return (
      <div className="flex w-full max-w-[320px] items-center gap-2">
        {["New form entry", "Enrich lead", "Notify #sales"].map((s, i) => (
          <React.Fragment key={s}>
            {i > 0 && <span className="h-px flex-1 bg-foreground/15" />}
            <span className="rounded-lg bg-background px-2.5 py-2 text-[10.5px] font-medium shadow-xs ring-1 ring-foreground/5">
              {s}
            </span>
          </React.Fragment>
        ))}
      </div>
    )
  }
  const bars = [38, 52, 44, 68, 60, 82, 74]
  return (
    <div className="w-full max-w-[300px] rounded-xl bg-background p-4 shadow-xs ring-1 ring-foreground/5">
      <p className="text-[10.5px] text-muted-foreground">Weekly active</p>
      <p className="text-lg font-semibold tracking-tight">12,480</p>
      <div className="mt-3 flex h-20 items-end gap-1.5">
        {bars.map((h, i) => (
          <span
            key={i}
            className={cn("flex-1 rounded-t-[4px]", i === bars.length - 2 ? "bg-primary" : "bg-primary/25")}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  )
}

/** A mega menu: products on the left, a live preview on the right. */
export default function NavigationMenuDemo() {
  const [active, setActive] = React.useState<Preview>("workspace")
  const current = products.find((p) => p.id === active)!

  return (
    <div className="flex min-h-[360px] w-full items-start justify-start">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent className="p-0">
              <div className="flex">
                <div className="flex w-[230px] shrink-0 flex-col p-2">
                  <ul className="flex flex-col gap-0.5">
                    {products.map((p) => (
                      <li key={p.id}>
                        <NavigationMenuLink asChild>
                          <Link
                            href="#"
                            onMouseEnter={() => setActive(p.id)}
                            onFocus={() => setActive(p.id)}
                            className={cn(
                              "flex-col items-start gap-0.5 px-4 py-3 hover:bg-accent focus:bg-accent",
                              active === p.id && "bg-accent"
                            )}
                          >
                            <span className="text-sm leading-5 font-medium">{p.title}</span>
                            <span className="text-[11px] leading-[15px] text-foreground/60">{p.description}</span>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                  <NavigationMenuLink asChild>
                    <Link
                      href="#"
                      className="mt-1 h-9 justify-between px-4 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
                    >
                      See all products
                      <ArrowRightIcon className="size-3.5" />
                    </Link>
                  </NavigationMenuLink>
                </div>
                <div className="hidden p-2 pl-0 md:block">
                  <div className="relative flex h-full w-[380px] flex-col overflow-hidden rounded-xl bg-panel ring-1 ring-foreground/5 2xl:w-[430px]">
                    <div className="px-5 pt-4">
                      <p className="text-xs font-medium text-muted-foreground">{current.title}</p>
                    </div>
                    {/* Re-mount on change: the new preview fades in through a short blur. */}
                    <div
                      key={current.id}
                      className="flex flex-1 animate-in items-center justify-center px-5 pb-6 duration-300 ease-out fill-mode-both fade-in-0 blur-in-sm zoom-in-98"
                    >
                      <PreviewArt id={current.id} />
                    </div>
                  </div>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Teams</NavigationMenuTrigger>
            <NavigationMenuContent className="p-0">
              <div className="flex w-[230px] flex-col">
                <ul className="flex flex-col p-2">
                  {teams.map((t) => (
                    <li key={t}>
                      <NavigationMenuLink asChild>
                        <Link href="#" className="h-9 px-3 py-1.5 font-medium hover:bg-accent focus:bg-accent">
                          {t}
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
                <div className="px-2 pb-2">
                  <NavigationMenuLink asChild>
                    <Link
                      href="#"
                      className="h-9 justify-between rounded-lg bg-foreground/[0.03] px-3 text-xs font-medium hover:bg-accent"
                    >
                      Read customer stories
                      <ArrowUpRightIcon className="size-3.5" />
                    </Link>
                  </NavigationMenuLink>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="#">Pricing</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="#">Changelog</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
