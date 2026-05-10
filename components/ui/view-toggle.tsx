"use client"
import { useState } from "react"
import { DataTable } from "./data-table"
import { columns, Payment } from "./columns"
import { CardInstructor } from "./cardi"

interface Props {
  data: Payment[]
}

export function ViewToggle({ data }: Props) {
  const [view, setView] = useState<"cards" | "table">("table")

  return (
    <div>
    
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setView("cards")}
          className={`p-2 rounded border ${view === "cards" ? "bg-muted border-foreground" : "border-border"}`}
          title="Vista tarjetas"
        >
          ◇
        </button>
        <button
          onClick={() => setView("table")}
          className={`p-2 rounded border ${view === "table" ? "bg-muted border-foreground" : "border-border"}`}
          title="Vista tabla"
        >
          ▦
        </button>
      </div>

      
      {view === "cards" && (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
          {data.map((instructor) => (
            <CardInstructor key={instructor.id} instructor={instructor} />
          ))}
        </div>
      )}

     
      {view === "table" && (
        <DataTable columns={columns} data={data} />
      )}
    </div>
  )
}