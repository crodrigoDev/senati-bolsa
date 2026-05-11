"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogTrigger, DialogClose, DialogFooter
} from "@/components/ui/dialog"

interface Props {
  instructor: {
    id: string
    nombre: string
    apellido: string
    email: string
  }

  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function VerInstructor({ instructor, open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>

      {onOpenChange === undefined && (
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">Ver detalles</Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{instructor.nombre} {instructor.apellido}</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 text-sm">
          <p><span className="text-muted-foreground">ID: </span>{instructor.id}</p>
          <p><span className="text-muted-foreground">Nombre: </span>{instructor.nombre}</p>
          <p><span className="text-muted-foreground">Apellido: </span>{instructor.apellido}</p>
          <p><span className="text-muted-foreground">Email: </span>{instructor.email}</p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cerrar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}