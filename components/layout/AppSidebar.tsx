'use client'
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton} from '@/components/ui/sidebar'
import SenatiLogo from '@/assets/Senati-Symbol.svg'
import {IconsSidebar} from '@/lib/icon-map'
import Image from 'next/image'
import sidebardata from "@/data/sidebar.json"
import ISidebar from '@/types/sidebar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'


export default function AppSidebar() {
    const pathname = usePathname()

    const iconsMatch = (icon: string) => {
        return IconsSidebar[icon];
    }

    const isActive = (ruta: string) => {
        return pathname === ruta || pathname.includes(ruta)
    }
    return (
        <Sidebar>
            <SidebarHeader className='p-0'>
                    <Link href="/instructor-seguimiento/dashboard" className='h-full w-full py-10 flex flex-row gap-4 items-center justify-center'>
                        <Image
                            src={SenatiLogo}
                            alt="logo de senati"
                            height={55}
                            width={55}
                            className="invert dark:invert-0"
                        />
                        <span className='font-bold text-3xl'>SENATI</span>
                    </Link>
            </SidebarHeader>
            <SidebarContent className='p-2'>
                <SidebarMenu className='gap-1'>
                    {sidebardata.map((item: ISidebar) => {
                        const Icon = iconsMatch(item.icon)
                        return (
                        <SidebarMenuItem key={item.label}>
                            <SidebarMenuButton asChild isActive={isActive(item.ruta)}>
                                <Link
                                    href={item.ruta}
                                >
                                    <Icon/>
                                    <span>{item.label}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    )})}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    )
}
