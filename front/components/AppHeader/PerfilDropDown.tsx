'use client'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuGroup, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback} from '../ui/avatar'
import { Button } from '../ui/button'
import { User, Settings, CircleQuestionMark, LogOut } from 'lucide-react'
import { Label } from '../ui/label'
import { Badge } from '../ui/badge'
import Link from 'next/link'



export default function PerfilDropDown() {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button
                size={'icon-lg'}
                variant={'outline'}
                className='flex gap-2 rounded-full cursor-pointer transition-all hover:-translate-y-0.5 duration-200'
            >
                <Avatar size='lg'>
                    <AvatarFallback>
                        AS
                    </AvatarFallback>
                </Avatar>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
            sideOffset={5}
            className='w-auto'
            align='end'
        >
            <DropdownMenuLabel>
                <div className='flex items-center gap-4'>
                    <Avatar size='lg'>
                        <AvatarFallback>
                            AS
                        </AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col gap-2'>
                        <div>
                            <Label className='text-sm text-foreground font-medium'>
                                Alvaro Solis
                            </Label>
                            Instructor de Seguimiento
                        </div>
                        <Badge className='bg-green-500 text-white rounded-sm'>Activo</Badge>
                    </div>
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator/>
            <DropdownMenuGroup>
                <DropdownMenuItem className='gap-4 h-8' asChild>
                    <Link
                        href={'/instructor-seguimiento/perfil'}
                    >
                        <User/>
                        <span className='font-medium'>Perfil</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className='gap-4 h-8'>
                    <Settings/>
                    <span className='font-medium'>Configuración</span>
                </DropdownMenuItem>
                <DropdownMenuItem className='gap-4 h-8'>
                    <CircleQuestionMark/>
                    <span className='font-medium'>Ayuda</span>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator/>
            <DropdownMenuItem className='gap-4 h-8' asChild>
                <Link href='/login'>
                    <LogOut/>
                    <span className='font-medium'>Cerrar sesión</span>
                </Link>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}
