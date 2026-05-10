'use client'
import { SidebarTrigger } from '../ui/sidebar'
import { PerfilDropDown, ThemeToggle, NotificacionPopover } from '../AppHeader'

export default function AppHeader() {
  return (
    <header className='w-full h-16 flex items-center py-6 px-4 justify-between border-b border-sidebar-border'>
        <SidebarTrigger size={'icon-lg'}/>
        <div className='flex gap-5'>
            <ThemeToggle/>
            <NotificacionPopover/>
            <PerfilDropDown/>
        </div>
    </header>
  )
}
