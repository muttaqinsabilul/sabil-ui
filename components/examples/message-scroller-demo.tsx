"use client"

import * as React from "react"
import { ArrowUpIcon } from "lucide-react"

import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Message, MessageContent } from "@/components/ui/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller"

type ChatMessage = { id: string; role: "user" | "assistant"; text: string }

const replies = [
  "Got it. I will draft that now.",
  "Here is a first version. Want me to make it shorter?",
  "Done. Anything else?",
]

const initial: ChatMessage[] = [
  { id: "1", role: "user", text: "Can you summarize the launch checklist?" },
  { id: "2", role: "assistant", text: "Sure. Three things are left: final QA, the pricing page and the announcement email." },
  { id: "3", role: "user", text: "Who owns the pricing page?" },
  { id: "4", role: "assistant", text: "Maya owns it. The draft is ready for review since yesterday." },
  { id: "5", role: "user", text: "Great. Remind me tomorrow morning." },
  { id: "6", role: "assistant", text: "Reminder set for 9:00 tomorrow." },
]

export default function MessageScrollerDemo() {
  const [messages, setMessages] = React.useState(initial)
  const [value, setValue] = React.useState("")

  function send(e: React.FormEvent) {
    e.preventDefault()
    if (!value.trim()) return
    const id = String(Date.now())
    setMessages((m) => [...m, { id, role: "user", text: value }])
    setValue("")
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { id: id + "-r", role: "assistant", text: replies[m.length % replies.length] },
      ])
    }, 600)
  }

  return (
    <div className="flex h-96 w-full max-w-md flex-col overflow-hidden rounded-2xl border bg-background">
      <MessageScrollerProvider>
        <MessageScroller className="flex-1">
          <MessageScrollerViewport>
            <MessageScrollerContent className="flex flex-col gap-4 p-4">
              {messages.map((m) => (
                <MessageScrollerItem key={m.id} messageId={m.id} scrollAnchor={m.role === "user"}>
                  <Message align={m.role === "user" ? "end" : "start"}>
                    <MessageContent>
                      <Bubble variant={m.role === "user" ? "default" : "muted"}>
                        <BubbleContent>{m.text}</BubbleContent>
                      </Bubble>
                    </MessageContent>
                  </Message>
                </MessageScrollerItem>
              ))}
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton />
        </MessageScroller>
      </MessageScrollerProvider>
      <form onSubmit={send} className="flex gap-2 border-t p-3">
        <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Write a message..." />
        <Button type="submit" size="icon" aria-label="Send">
          <ArrowUpIcon />
        </Button>
      </form>
    </div>
  )
}
