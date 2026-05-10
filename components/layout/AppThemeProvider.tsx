'use client'
import  {ThemeProvider}  from "next-themes"
import { TooltipProvider } from "@/components/ui/tooltip"

export default function AppThemeProvider({children}: {children: React.ReactNode}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>
        {children}
      </TooltipProvider>
    </ThemeProvider>
  )
}
