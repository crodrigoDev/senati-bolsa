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

export const description = "A pie chart with a legend"

const chartData = [
  { browser: "Ciclo 3", visitors: 12, color: "var(--chart-1)" },
  { browser: "Ciclo 4", visitors: 33, color: "var(--chart-2)" },
  { browser: "Ciclo 5", visitors: 31, color: "var(--chart-3)" },
  { browser: "Ciclo 6", visitors: 14, color: "var(--chart-4)" },
]

const chartConfig = {
  "Ciclo 3": { label: "Ciclo 3", color: "var(--chart-1)" },
  "Ciclo 4": { label: "Ciclo 4", color: "var(--chart-2)" },
  "Ciclo 5": { label: "Ciclo 5", color: "var(--chart-3)" },
  "Ciclo 6": { label: "Ciclo 6", color: "var(--chart-4)" },
} satisfies ChartConfig

export function ChartPieLegend() {
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
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              outerRadius={100}
              label={(entry) => `${entry.value}%`}
            >
              {chartData.map((entry, index) => (
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