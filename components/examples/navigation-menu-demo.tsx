"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"

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

type Turn = { from: "user" | "assistant"; text: string }

const products: { title: string; description: string; chat: Turn[] }[] = [
  {
    title: "Chat",
    description: "Frontier reasoning with real-time knowledge and web search.",
    chat: [
      { from: "assistant", text: "Two particles become linked — measuring one instantly determines the other, regardless of distance." },
      { from: "user", text: "Why is the sky blue?" },
      { from: "assistant", text: "Shorter blue wavelengths scatter more off air molecules than longer red ones." },
      { from: "user", text: "How do black holes form?" },
      { from: "assistant", text: "A massive star exhausts its fuel and gravity collapses the core into a singularity." },
    ],
  },
  {
    title: "Build",
    description: "Plan, edit, and ship code from your terminal with AI.",
    chat: [
      { from: "user", text: "Why is the checkout test failing?" },
      { from: "assistant", text: "The total is rounded before tax is applied. I moved the rounding to the end." },
      { from: "user", text: "Run the suite again." },
      { from: "assistant", text: "148 tests passed in 12.4s. Ready to commit." },
    ],
  },
  {
    title: "Imagine",
    description: "Generate and edit images and video from text.",
    chat: [
      { from: "user", text: "A lighthouse at dusk, film grain." },
      { from: "assistant", text: "Here are four variations. The second one has the warmest light." },
      { from: "user", text: "Make the sea calmer." },
    ],
  },
  {
    title: "Voice",
    description: "Build voice agents with sub-second latency.",
    chat: [
      { from: "user", text: "Book a table for two on Friday." },
      { from: "assistant", text: "Done. Friday at 7pm, window seat. I sent the confirmation to your email." },
    ],
  },
  {
    title: "Bot",
    description: "A new kind of colleague with its own computer.",
    chat: [
      { from: "user", text: "Clean up last month's invoices." },
      { from: "assistant", text: "Archived 32 invoices and flagged 2 that are missing a receipt." },
    ],
  },
]

const solutions = ["Customer Stories", "Business", "Startups", "Government", "Customer Support", "Legal", "Security"]

export default function NavigationMenuDemo() {
  const [active, setActive] = React.useState(0)
  const current = products[active]

  return (
    <div className="flex min-h-[460px] w-full items-start justify-start">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent className="p-0">
              <div className="flex">
                <ul className="flex w-[220px] shrink-0 flex-col p-2">
                  {products.map((p, i) => (
                    <li key={p.title}>
                      <NavigationMenuLink asChild>
                        <Link
                          href="#"
                          onMouseEnter={() => setActive(i)}
                          onFocus={() => setActive(i)}
                          className={cn(
                            "flex-col items-start gap-0 px-4 py-3 hover:bg-accent focus:bg-accent",
                            i === active && "bg-accent"
                          )}
                        >
                          <span className="text-sm leading-5 font-medium">{p.title}</span>
                          <span className="text-[11px] leading-[15px] text-foreground/60">{p.description}</span>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
                <div className="hidden p-3 pl-1 md:block">
                  <div className="flex h-full w-[400px] flex-col 2xl:w-[456px] justify-end gap-2.5 overflow-hidden rounded-lg bg-panel px-5 pt-3 pb-5">
                    {current.chat.map((turn, i) => (
                      <div
                        // Re-mount on product change so the bubbles stagger in.
                        key={`${current.title}-${i}`}
                        className={cn(
                          "flex animate-in duration-200 ease-out fill-mode-both fade-in-0 slide-in-from-bottom-1",
                          turn.from === "user" ? "justify-end" : "justify-start"
                        )}
                        style={{ animationDelay: `${i * 40}ms` }}
                      >
                        <p
                          className={cn(
                            "max-w-[340px] px-3.5 py-2 text-[10.5px] leading-[17px]",
                            turn.from === "user"
                              ? "rounded-[16px_16px_6px_16px] bg-bubble-strong"
                              : "rounded-[16px_16px_16px_6px] bg-bubble"
                          )}
                        >
                          {turn.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
            <NavigationMenuContent className="p-0">
              <div className="flex w-[220px] flex-col">
                <ul className="flex flex-col p-2">
                  {solutions.map((s) => (
                    <li key={s}>
                      <NavigationMenuLink asChild>
                        <Link href="#" className="h-9 px-4 py-1.5 font-medium hover:bg-accent focus:bg-accent">
                          {s}
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
                <div className="px-1.5 pb-2">
                  <NavigationMenuLink asChild>
                    <Link
                      href="#"
                      className="h-8 justify-between border-t border-border/40 bg-foreground/[0.02] px-3 py-2 text-xs font-medium hover:bg-accent"
                    >
                      Explore all use cases
                      <ArrowUpRightIcon className="size-3" />
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
              <Link href="#">News</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
