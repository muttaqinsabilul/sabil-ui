"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function PreviewTabs({
  preview,
  code,
  align = "center",
  className,
}: {
  preview: React.ReactNode
  code: React.ReactNode
  align?: "center" | "start"
  className?: string
}) {
  return (
    <Tabs defaultValue="preview" className={cn("gap-3", className)}>
      <TabsList variant="line" className="h-9">
        <TabsTrigger value="preview" className="px-2">Preview</TabsTrigger>
        <TabsTrigger value="code" className="px-2">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview">
        <div
          className={cn(
            "flex min-h-[360px] w-full justify-center overflow-x-auto rounded-2xl border bg-dots p-6 sm:p-10",
            align === "center" ? "items-center" : "items-start"
          )}
        >
          {preview}
        </div>
      </TabsContent>
      <TabsContent value="code">{code}</TabsContent>
    </Tabs>
  )
}
