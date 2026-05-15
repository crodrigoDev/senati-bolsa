"use client"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { VerInstructor } from "./verinstructor"


interface Props {
  instructor: {
    id: string
    nombre: string
    apellido: string
    email: string
    imagen?: string
  }
}

export function CardInstructor({ instructor }: Props) {
  const [open, setOpen] = useState(false)  

  return (
    <div className="border rounded-xl p-4 flex flex-col items-center gap-3">

      {instructor.imagen ? (
        <img
          src={instructor.imagen}
          alt={instructor.nombre}
          className="mb-20 w-70 h-70"
        />
      ) : (
        <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-700">
          {instructor.nombre[0]}{instructor.apellido[0]}
        </div>
      )}

      <div className="text-center">
        <p className="font-semibold">{instructor.nombre} {instructor.apellido}</p>
        <p className="text-sm text-muted-foreground">{instructor.email}</p>
      </div>

      
      <Button variant="outline" className="w-full" onClick={() => setOpen(true)}>
        Ver detalles
      </Button>

      
      <VerInstructor
        instructor={instructor}
        open={open}
        onOpenChange={setOpen}
      />
    </div>
  )
}