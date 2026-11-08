"use client"

import * as React from "react"

import { DirectionProvider } from "@/components/ui/direction"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export default function DirectionDemo() {
  const [dir, setDir] = React.useState<"ltr" | "rtl">("rtl")

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <ToggleGroup
        type="single"
        variant="outline"
        value={dir}
        onValueChange={(v) => v && setDir(v as "ltr" | "rtl")}
        className="self-center"
      >
        <ToggleGroupItem value="ltr">LTR</ToggleGroupItem>
        <ToggleGroupItem value="rtl">RTL</ToggleGroupItem>
      </ToggleGroup>
      <DirectionProvider dir={dir}>
        <div dir={dir} className="flex flex-col gap-6">
          <Tabs defaultValue="one">
            <TabsList className="w-full">
              <TabsTrigger value="one">{dir === "rtl" ? "الأول" : "First"}</TabsTrigger>
              <TabsTrigger value="two">{dir === "rtl" ? "الثاني" : "Second"}</TabsTrigger>
              <TabsTrigger value="three">{dir === "rtl" ? "الثالث" : "Third"}</TabsTrigger>
            </TabsList>
          </Tabs>
          <Slider defaultValue={[30]} max={100} />
        </div>
      </DirectionProvider>
    </div>
  )
}
