import { ChartBarActive } from "@/components/chart-bar-active"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { ChartPieLegend } from "@/components/chart-pie-legend"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

import data from "./data.json"

export default function Page() {
  return (
    <>
      <SiteHeader />

      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">

            <SectionCards />

            <div className="px-4 lg:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                <Card>
                  <CardHeader>
                    <CardTitle>Progreso de Carreras</CardTitle>
                  </CardHeader>

                 <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm mb-1">Activas</p>
                      <Progress value={67} />
                      <h1></h1>
                    </div>

                    <div>
                      <p className="text-sm mb-1">Por validar</p>
                      <Progress value={25} />
                    </div>

                    <div>
                      <p className="text-sm mb-1">Inactivas</p>
                      <Progress value={8} />
                    </div>
                  </CardContent>
                </Card>

                <ChartPieLegend />

              </div>
            </div>

            <div className="px-4 lg:px-6">
              <ChartBarActive />
            </div>

            <DataTable data={data} />

          </div>
        </div>
      </div>
    </>
  )
}