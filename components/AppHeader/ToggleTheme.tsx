"use client"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Evitar errores de hidratacion
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="w-10 h-10" />

  // funcion para ciclar entre los tres estados
  const toggleTheme = () => {
    if (theme === "light") setTheme("dark")
    else if (theme === "dark") setTheme("system")
    else setTheme("light")
  }

  return (
    <Button
      onClick={toggleTheme}
      size={'icon-lg'}
      variant={'outline'}
      className="rounded-sm cursor-pointer transition-all hover:-translate-y-0.5 duration-200"
      title={`Tema actual: ${theme}`}
    >
      {/* mostramos el icono segun el estado actual */}
      {theme === "light" && <Sun className="h-10 w-10" />}
      {theme === "dark" && <Moon className="h-10 w-10" />}
      {theme === "system" && <Monitor className="h-10 w-10" />}
    </Button>
  )
}