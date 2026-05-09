"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts"
import type { BarShapeProps } from "recharts/types/cartesian/Bar"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "A bar chart with an active bar"

const chartData = [
  { browser: "Desarrollo", visitors: 41, fill: "var(--color-chrome)" },
  { browser: "Redes", visitors: 39, fill: "var(--color-safari)" },
  { browser: "Diseño", visitors: 38, fill: "var(--color-firefox)" },
  { browser: "Administracion", visitors: 43, fill: "var(--color-edge)" },
  { browser: "Contabilidad", visitors: 40, fill: "var(--color-other)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: { label: "Desarrollo", color: "var(--chart-1)" },
  safari: { label: "Redes", color: "var(--chart-2)" },
  firefox: { label: "Diseño", color: "var(--chart-3)" },
  edge: { label: "Administracion", color: "var(--chart-4)" },
  other: { label: "Contabilidad", color: "var(--chart-5)" },
} satisfies ChartConfig

const ACTIVE_INDEX = 2

export function ChartBarActive() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribucion por Carreras</CardTitle>
      </CardHeader>
        <CardContent className="flex justify-center items-center">
        <ChartContainer config={chartConfig} className="h-[300px] w-full max-w-[500px]">
            <BarChart data={chartData} height={300}>
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
                index === ACTIVE_INDEX ? (
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