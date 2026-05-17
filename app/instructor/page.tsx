import { Button } from "@/components/ui/button"
import { DialogDemo } from "@/components/ui/DialogDemo"
import { ViewToggle } from "@/components/ui/view-toggle"
import ToggleTheme from "@/components/ToggleTheme"
import { Bell, User } from "lucide-react"

async function getData() {
  try {
    const res = await fetch("http://localhost:8080/api/instructores", {
      cache: "no-store"
    })

    if (!res.ok) {
      throw new Error("Error al obtener instructores")
    }

    const data = await res.json()

    return data.map((instructor: any) => ({
      id:      instructor.id,
      nombre:  instructor.nombres,
      apellido: instructor.apellidoPaterno + " " + instructor.apellidoMaterno,
      email:   instructor.correoInstitucional,
      imagen:  "/images/default.jpg"
    }))

  } catch (error) {
    console.error("Error:", error)
    return []
  }
}

export default async function DemoPage() {
  const data = await getData() 

  return (
    <div className="container mx-0 py-10 relative size-280 left-90">
      <div className="items-center mb-20">
        <div className="ml-250">
          <ToggleTheme />
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button>
            <User className="h-5 w-5" />
          </Button>
        </div>
        <div>
          <strong className="text-3xl">Gestión de Instructores</strong>
          <p className="text-muted-foreground mt-1">
            Administra a los instructores y sus carreras
          </p>
        </div>
        <div className="mr-200">
          <DialogDemo />
        </div>
      </div>
      <ViewToggle data={data} />  
    </div>
  )
}