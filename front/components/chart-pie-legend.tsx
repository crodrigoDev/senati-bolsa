"use client"

import { Pie, PieChart, Cell } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart"

const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
]

interface PieItem {
  browser: string
  visitors: number
}

interface ChartPieLegendProps {
  data: PieItem[]
}

export function ChartPieLegend({ data }: ChartPieLegendProps) {
  const chartConfig = data.reduce<ChartConfig>((acc, item, index) => {
    acc[item.browser] = {
      label: item.browser,
      color: CHART_COLORS[index % CHART_COLORS.length],
    }
    return acc
  }, {})

  const enrichedData = data.map((item, index) => ({
    ...item,
    color: CHART_COLORS[index % CHART_COLORS.length],
  }))

  const total = data.reduce((acc, item) => acc + item.visitors, 0)

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Aprendices por Ciclo</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[280px]"
        >
          <PieChart>
            <Pie
              data={enrichedData}
              dataKey="visitors"
              nameKey="browser"
              outerRadius={100}
              label={({ value }) =>
                total > 0 ? `${Math.round((value / total) * 100)}%` : ""
              }
            >
              {enrichedData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>

            <ChartLegend
              content={<ChartLegendContent nameKey="browser" />}
              className="flex flex-wrap gap-2 justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}