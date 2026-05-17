"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts"
import type { BarShapeProps } from "recharts/types/cartesian/Bar"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

interface BarItem {
  browser: string
  visitors: number
  fill: string
}

interface ChartBarActiveProps {
  data: BarItem[]
}

const chartConfig = {
  visitors: { label: "Aprendices" },
  chrome:  { label: "Carrera 1", color: "var(--chart-1)" },
  safari:  { label: "Carrera 2", color: "var(--chart-2)" },
  firefox: { label: "Carrera 3", color: "var(--chart-3)" },
  edge:    { label: "Carrera 4", color: "var(--chart-4)" },
  other:   { label: "Carrera 5", color: "var(--chart-5)" },
} satisfies ChartConfig

export function ChartBarActive({ data }: ChartBarActiveProps) {
  // La barra activa es la que tiene más aprendices
  const activeIndex = data.length
    ? data.reduce((maxIdx, item, idx, arr) =>
        item.visitors > arr[maxIdx].visitors ? idx : maxIdx, 0)
    : 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribucion por Carreras</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <ChartContainer config={chartConfig} className="h-[300px] w-full max-w-[500px]">
          <BarChart data={data} height={300}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="browser"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="visitors"
              radius={8}
              shape={({ index, ...props }: BarShapeProps) =>
                index === activeIndex ? (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={props.payload.fill}
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                ) : (
                  <Rectangle {...props} />
                )
              }
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}