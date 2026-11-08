import { HeartIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

/** Press and hold each one. Only the right column scales on :active. */
export default function MotionPressDemo() {
  return (
    <div className="grid grid-cols-2 gap-x-10 gap-y-4 text-center">
      <p className="text-xs text-muted-foreground">Without</p>
      <p className="text-xs text-muted-foreground">With scale(0.97)</p>

      <Button className="active:scale-100!">Save changes</Button>
      <Button>Save changes</Button>

      <Button variant="outline" className="active:scale-100!">
        <HeartIcon data-icon="inline-start" />
        Like
      </Button>
      <Button variant="outline">
        <HeartIcon data-icon="inline-start" />
        Like
      </Button>

      <div className="rounded-xl border bg-card p-4 text-left text-sm shadow-xs select-none">Card</div>
      <div className="rounded-xl border bg-card p-4 text-left text-sm shadow-xs transition-transform duration-150 ease-out select-none active:scale-[0.97]">
        Card
      </div>
    </div>
  )
}
