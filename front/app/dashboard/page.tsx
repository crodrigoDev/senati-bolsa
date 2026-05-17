"use client"

import { ChartBarActive } from "@/components/chart-bar-active"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { ChartPieLegend } from "@/components/chart-pie-legend"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useDashboard } from "@/hooks/use-backend"

export default function Page() {
  const { data, loading, error } = useDashboard()

  if (loading) {
    return (
      <>
        <SiteHeader />
        <div className="flex flex-1 items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-muted-foreground text-sm">Cargando datos...</p>
          </div>
        </div>
      </>
    )
  }

  if (error || !data) {
    return (
      <>
        <SiteHeader />
        <div className="flex flex-1 items-center justify-center min-h-[400px]">
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6 max-w-md text-center">
            <p className="text-destructive font-medium mb-1">Error de conexión</p>
            <p className="text-muted-foreground text-sm">
              {error ?? "No se pudo cargar los datos"}
            </p>
          </div>
        </div>
      </>
    )
  }

  const activas   = data.progresoCarreras?.ACTIVA     ?? 0
  const porValidar = data.progresoCarreras?.POR_VALIDAR ?? 0
  const inactivas = data.progresoCarreras?.INACTIVA   ?? 0

  const pieData = Object.entries(data.aprendicesPorCiclo ?? {}).map(
    ([ciclo, cantidad]) => ({ browser: ciclo, visitors: cantidad as number })
  )

  const colorKeys = ["chrome", "safari", "firefox", "edge", "other"]
  const barData = Object.entries(data.distribucionCarreras ?? {}).map(
    ([nombre, cantidad], index) => ({
      browser: nombre,
      visitors: cantidad as number,
      fill: `var(--color-${colorKeys[index % colorKeys.length]})`,
    })
  )

  return (
    <>
      <SiteHeader />

      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">

            <SectionCards
              totalEmpresas={data.totalEmpresas}
              totalCarreras={data.totalCarreras}
              totalAprendices={data.totalAprendices}
              promedioAvance={data.promedioAvance}
            />

            <div className="px-4 lg:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                <Card>
                  <CardHeader>
                    <CardTitle>Progreso de Carreras</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <p className="text-sm">Activas</p>
                        <span className="text-sm text-muted-foreground">{activas}%</span>
                      </div>
                      <Progress value={activas} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <p className="text-sm">Por validar</p>
                        <span className="text-sm text-muted-foreground">{porValidar}%</span>
                      </div>
                      <Progress value={porValidar} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <p className="text-sm">Inactivas</p>
                        <span className="text-sm text-muted-foreground">{inactivas}%</span>
                      </div>
                      <Progress value={inactivas} />
                    </div>
                  </CardContent>
                </Card>

                <ChartPieLegend data={pieData} />

              </div>
            </div>

            <div className="px-4 lg:px-6">
              <ChartBarActive data={barData} />
            </div>

          </div>
        </div>
      </div>
    </>
  )
}