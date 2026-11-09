"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const growth = Array.from({ length: 90 }, (_, i) => {
  const d = new Date(2026, 7, 12 + i)
  const wave = (n: number) => Math.round(Math.sin(i / n) * 40)
  return {
    date: d.toISOString().slice(0, 10),
    instagram: 380 + i * 4 + wave(5),
    tiktok: 260 + i * 6 + wave(4),
    linkedin: 140 + i * 2 + wave(7),
  }
})

const chartConfig = {
  instagram: { label: "Instagram", color: "var(--chart-1)" },
  tiktok: { label: "TikTok", color: "var(--chart-3)" },
  linkedin: { label: "LinkedIn", color: "var(--chart-4)" },
} satisfies ChartConfig

export function GrowthChart({ range }: { range: string }) {
  const chartData = growth.slice(-Number(range))

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto min-h-[260px] w-full flex-1"
    >
      <AreaChart data={chartData} margin={{ left: 4, right: 4 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
          tickFormatter={(v) =>
            new Date(v).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })
          }
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        {(["linkedin", "instagram", "tiktok"] as const).map((key) => (
          <Area
            key={key}
            dataKey={key}
            type="natural"
            fill={`var(--color-${key})`}
            fillOpacity={0.15}
            stroke={`var(--color-${key})`}
            strokeWidth={2}
          />
        ))}
        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  )
}
