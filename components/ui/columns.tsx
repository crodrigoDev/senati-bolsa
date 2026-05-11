"use client"
import { useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { VerInstructor } from "./verinstructor"
import { Button } from "@/components/ui/button"

export type Payment = {
  id: string
  nombre: string
  apellido: string
  email: string
  imagen?: string
}

function ActionCell({ row }: { row: any }) {
  const [open, setOpen] = useState(false)
  const instructor = row.original

  return (
    <>
      <VerInstructor instructor={instructor} open={open} onOpenChange={setOpen} />
      <Button size="sm" variant="ghost" onClick={() => setOpen(true)}>
        Ver
      </Button>
    </>
  )
}

export const columns: ColumnDef<Payment>[] = [
  { accessorKey: "nombre", header: "Nombre" },
  { accessorKey: "apellido", header: "Apellido" },
  { accessorKey: "email", header: "Email" },
  {
    id: "actions",
    cell: ({ row }) => <ActionCell row={row} />,
  },
]