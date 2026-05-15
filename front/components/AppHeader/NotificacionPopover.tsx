'use client'
import { Bell, Eye, TableOfContents } from "lucide-react"
import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger, PopoverHeader, PopoverTitle, PopoverDescription} from '../ui/popover'
import { Separator } from '../ui/separator'
import { Badge } from '@/components/ui/badge'


export default function NorificacionPopover() {
  return (
    <Popover>
        <PopoverTrigger asChild> 
            <Button size={'icon-lg'} variant={'outline'} className='rounded-sm cursor-pointer transition-all hover:-translate-y-0.5 duration-200 relative'>
                <Bell className='h-6 w-6'/>
                <Badge className="absolute -right-3 -top-1.5 rounded-full h-5 w-5 items-center justify-center text-[8px] font-bold text-white p-0 bg-red-500 ">
                    4
                </Badge>
            </Button>
            
        </PopoverTrigger>
        
        <PopoverContent className='p-0 gap-0 w-80' side="bottom" sideOffset={5} align="end" >
            <PopoverHeader className='flex items-center gap-4 flex-row px-4 py-2'>
                <Bell></Bell>
                <div>
                    <PopoverTitle>
                        Notificaciones
                    </PopoverTitle>
                    <PopoverDescription className='text-xs'>
                        Tienes 4 notificaciones
                    </PopoverDescription>
                </div>
            </PopoverHeader>
            <Separator orientation='horizontal' className="h-0"/>
            <div className='p-1'>
                <Button variant={'ghost'} className='w-full flex flex-col items-start h-auto gap-0.5 py-1 overflow-hidden'>
                    <PopoverTitle>
                        Nueva tarea asignada
                    </PopoverTitle>
                    <PopoverDescription className='text-xs line-clamp-2! whitespace-normal text-left'>
                        Tienes una nueva tarea pendiente para terminar.
                    </PopoverDescription>
                </Button>
                <Button variant={'ghost'} className='w-full flex flex-col items-start h-auto gap-0.5 py-1 overflow-hidden'>
                    <PopoverTitle>
                        Recordatorio de seminario
                    </PopoverTitle>
                    <PopoverDescription className='text-xs line-clamp-2! whitespace-normal text-left'>
                        No olvides asistir al seminario programado para mañana.
                    </PopoverDescription>
                </Button>
                <Button variant={'ghost'} className='w-full flex flex-col items-start h-auto gap-0.5 py-1 overflow-hidden'>
                    <PopoverTitle className="text-muted-foreground">
                        Actualización de perfil
                    </PopoverTitle>
                    <PopoverDescription className='text-xs line-clamp-2! whitespace-normal text-left'>
                        Tu perfil ha sido actualizado correctamente.
                    </PopoverDescription>
                </Button>
                <Button variant={'ghost'} className='w-full flex flex-col items-start h-auto gap-0.5 py-1 overflow-hidden'>
                    <PopoverTitle>
                        Nueva oferta laboral
                    </PopoverTitle>
                    <PopoverDescription className='text-xs line-clamp-2! whitespace-normal text-left'>
                        Se ha publicado una nueva oferta laboral que podría interesarte.
                    </PopoverDescription>
                </Button>
            </div>
            <Separator orientation='horizontal' className="h-0"/>
            <div className="p-1">
                <Button className="flex gap-2 w-full cursor-pointer justify-start items-center" variant={'ghost'}>
                    <Eye/>
                    <span>Marcar como leídas</span>
                </Button>
                <Button className="flex gap-2 w-full cursor-pointer justify-start items-center" variant={'ghost'}>
                    <TableOfContents/>
                    <span>Ver todas las notificaciones</span>
                </Button>
            </div>
        </PopoverContent>
    </Popover>
  )
}
