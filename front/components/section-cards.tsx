"use client"

import {
  Card,
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TrendingUpIcon } from "lucide-react"

interface SectionCardsProps {
  totalEmpresas: number
  totalCarreras: number
  totalAprendices: number
  promedioAvance: number
}

export function SectionCards({
  totalEmpresas,
  totalCarreras,
  totalAprendices,
  promedioAvance,
}: SectionCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">

      <Card className="@container/card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            <span>Total Empresas</span>
            <TrendingUpIcon className="size-5" />
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-3xl">
            {totalEmpresas}
          </div>
          <p>Empresas registradas en el sistema</p>
          <p><span className="text-green-500 font-semibold">+12%</span> desde el mes pasado</p>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            <span>Total carreras</span>
            <TrendingUpIcon className="size-5" />
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-3xl">
            {totalCarreras}
          </div>
          <p>Carreras con aprendices registrados</p>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            Total Aprendices
          </CardTitle>
          <CardAction>
            <TrendingUpIcon className="size-5" />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-3xl">
            {totalAprendices}
          </div>
          <p>Aprendices en practicas</p>
          <p><span className="text-green-500 font-semibold">+8%</span> desde el mes pasado</p>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            Promedio de Avance
          </CardTitle>
          <CardAction>
            <TrendingUpIcon className="size-5" />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-3xl">
            {promedioAvance}%
          </div>
          <p>Promedio avance de tareas</p>
          <p><span className="text-green-500 font-semibold">+5%</span> desde el mes pasado</p>
        </CardFooter>
      </Card>

    </div>
  )
}