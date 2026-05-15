import { Button } from "@/components/ui/button"
import { DialogDemo } from "@/components/ui/DialogDemo"
import { ViewToggle } from "@/components/ui/view-toggle"

async function getData() {
    return [
        { id: "728ed52f", nombre: "Juan Roberto", apellido: "Rivera Mendoza", email: "juan_32@senati.pe", imagen: "/images/juan.png", },
        { id: "238ed123f", nombre: "Selena", apellido: "Lopez Gomez", email: "selena_21@senati.pe", imagen: "/images/selena.png", },
    ]
}

export default async function DemoPage() {
    const data = await getData()

    return (
        <div className="p-8 md:p-12 space-y-6 w-full h-full">
            <header className="flex items-start justify-between">
                <div className="text-3xl font-bold">
                    <h1>Gestión de Instructores</h1>
                    <p className="text-sm text-muted-foreground font-normal mt-1">Administra a los instructores y sus carreras</p>
                </div>
                <div className="flex items-center gap-2">
                    <DialogDemo></DialogDemo>
                </div>
            </header>
            <section>
                <ViewToggle data={data} />
            </section>
        </div>
    )
}