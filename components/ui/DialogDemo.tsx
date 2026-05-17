"use client" 

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function DialogDemo() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    nombres:              "",
    apellidoPaterno:      "",
    apellidoMaterno:      "",
    correoInstitucional:  "",
    correoPersonal:       "",
    telefono:             "",
    dni:                  ""
  })

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }


  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/instructores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })

      if (res.ok) {
        alert("Instructor creado correctamente")
        setOpen(false)  
        setForm({       
          nombres: "", apellidoPaterno: "", apellidoMaterno: "",
          correoInstitucional: "", correoPersonal: "", telefono: "", dni: ""
        })
        window.location.reload() 
      } else {
        alert("Error al crear el instructor")
      }
    } catch (error) {
      alert("No se pudo conectar con el servidor")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="ml-245 bg-white">+ Nuevo instructor</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Nuevo Instructor</DialogTitle>
          <DialogDescription>
            Realiza cambios en el perfil aquí. Haz clic en guardar cuando hayas terminado.
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label>Nombres</Label>
            <Input name="nombres" placeholder="Alvaro" value={form.nombres} onChange={handleChange} />
          </Field>
          <Field>
            <Label>Apellido Paterno</Label>
            <Input name="apellidoPaterno" placeholder="García" value={form.apellidoPaterno} onChange={handleChange} />
          </Field>
          <Field>
            <Label>Apellido Materno</Label>
            <Input name="apellidoMaterno" placeholder="López" value={form.apellidoMaterno} onChange={handleChange} />
          </Field>
          <Field>
            <Label>Correo Institucional</Label>
            <Input name="correoInstitucional" placeholder="alvaro@senati.pe" value={form.correoInstitucional} onChange={handleChange} />
          </Field>
          <Field>
            <Label>Correo Personal</Label>
            <Input name="correoPersonal" placeholder="alvaro@gmail.com" value={form.correoPersonal} onChange={handleChange} />
          </Field>
          <Field>
            <Label>Teléfono</Label>
            <Input name="telefono" placeholder="987654321" value={form.telefono} onChange={handleChange} />
          </Field>
          <Field>
            <Label>DNI</Label>
            <Input name="dni" placeholder="12345678" value={form.dni} onChange={handleChange} />
          </Field>
        </FieldGroup>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleSubmit}>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}