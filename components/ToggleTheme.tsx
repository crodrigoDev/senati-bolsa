"use client"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

 
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="w-10 h-10" />

  
  const toggleTheme = () => {
    if (theme === "light") setTheme("dark")
    else if (theme === "dark") setTheme("system")
    else setTheme("light")
  }

  return (
    <Button
      onClick={toggleTheme}
      size={'icon'}
      variant={'outline'}
      className="rounded-full"
      title={`Tema actual: ${theme}`}
    >
      
      {theme === "light" && <Sun className="h-10 w-10" />}
      {theme === "dark" && <Moon className="h-10 w-10" />}
      {theme === "system" && <Monitor className="h-10 w-10" />}
    </Button>
  )
}