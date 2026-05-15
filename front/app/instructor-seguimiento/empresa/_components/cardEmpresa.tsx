"use client"
import { Building2, Phone, Users, UserCog, MoreVertical, BadgeCheck, Pencil, Trash, Eye, Bookmark, UserPlus, Mail } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import {
    Card,
    CardHeader,
    CardFooter,
    CardContent,
} from '@/components/ui/card'
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from '@/components/ui/tabs'
import { Button, buttonVariants } from '@/components/ui/button'
import { Badge } from "@/components/ui/badge";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Sheet, SheetTrigger } from "@/components/ui/sheet";

interface CardEmpresaProps {
    nombre: string,
    ruc: string,
    monitor: string,
    telefono: string,
    aprendices: number,
    onEdit: () => void;
}

export function CardEmpresa({ nombre, ruc, monitor, telefono, aprendices, onEdit }: CardEmpresaProps) {
    return (
        <Card className="space-y-1">
            <CardHeader className="flex flex-row items-start space-y-0 justify-between">
                <div className="flex flex-row items-center gap-5">
                    <div className="bg-black/20 p-1 rounded">
                        <Building2 className="text-white/40" />
                    </div>
                    <div>
                        <h3 className="font-bold">{nombre}</h3>
                        <small>RUC: {ruc}</small>
                    </div>
                </div>
                <Button variant={"ghost"} size={"icon"}>
                    <Bookmark />
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <div className="flex flex-row items-center gap-2 space-x-1">
                        <Users className="size-4" />
                        <span className="text-xs">Monitor: {monitor}</span>
                    </div>
                    <div className="flex flex-row items-center gap-2 space-x-1">
                        <Phone className="size-4" />
                        <span className="text-xs">{telefono}</span>
                    </div>
                    <div className="flex flex-row items-center gap-2 space-x-1">
                        <UserCog className="size-4" />
                        <span className="text-xs">{aprendices} aprendices</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                    <BadgeCheck />
                    Active
                </Badge>
                <div className="gap-1">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant={"ghost"} size={"icon"}>
                                <MoreVertical />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>
                                Acciones
                            </DropdownMenuLabel>

                            <DropdownMenuItem onClick={onEdit}>
                                <Pencil />
                                Editar
                            </DropdownMenuItem>

                            <Sheet>
                                <SheetTrigger asChild>
                                    <DropdownMenuItem>
                                        <UserPlus />
                                        Aprendices
                                    </DropdownMenuItem>
                                </SheetTrigger>
                            </Sheet>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                        <Eye />
                                        Ver Datalles
                                    </DropdownMenuItem>
                                </DialogTrigger>
                                <DialogContent aria-describedby="2xl" aria-description="2xl">
                                    <DialogHeader>
                                        <DialogTitle>{nombre}</DialogTitle>
                                        <div className="flex flex-row gap-2">
                                            <DialogDescription><small>RUC: {ruc}</small></DialogDescription>
                                            <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                                                <BadgeCheck />
                                                Active
                                            </Badge>
                                        </div>
                                        <Tabs>
                                            <TabsList>
                                                <TabsTrigger value="general">General</TabsTrigger>
                                                <TabsTrigger value="aprendices">Aprendices</TabsTrigger>
                                                <TabsTrigger value="contacto">Contacto</TabsTrigger>
                                            </TabsList>
                                            <section className="py-3 space-y-2 ">
                                                <div className="bg-black/20 p-2 rounded-b-md">
                                                    <TabsContent value="general" className="space-y-3">
                                                        <header className="font-extrabold">
                                                            <h2 className="uppercase">Información de contacto</h2>
                                                        </header>
                                                        <article className="flex flex-row gap-3 items-center px-3">
                                                            <div className="p-2 bg-black/50 rounded-md"><Users /></div>
                                                            <div>
                                                                <small>Monitor</small>
                                                                <p>{monitor}</p>
                                                            </div>
                                                        </article>
                                                        <article className="flex flex-row gap-3 items-center px-3">
                                                            <div className="p-2 bg-black/50 rounded-md text-md"><Phone /></div>
                                                            <div>
                                                                <small>Telefono</small>
                                                                <p>{telefono}</p>
                                                            </div>
                                                        </article>
                                                        <article className="flex flex-row gap-3 items-center px-3">
                                                            <div className="p-2 bg-black/50 rounded-md"><Mail /></div>
                                                            <div>
                                                                <small>Correo Electrónico</small>
                                                                <p>correo@example.com</p>
                                                            </div>
                                                        </article>
                                                    </TabsContent>
                                                    <TabsContent value="aprendices">
                                                        <h2>Hola A</h2>
                                                    </TabsContent>
                                                    <TabsContent value="contacto">
                                                        <h2>Hola C</h2>
                                                    </TabsContent>
                                                </div>
                                            </section>
                                        </Tabs>
                                    </DialogHeader>
                                    <DialogFooter>
                                        <DialogClose>Cancelar</DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>

                            <DropdownMenuSeparator />

                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()} variant="destructive">
                                        <Trash />
                                        Eliminar
                                    </DropdownMenuItem>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>¿Estás seguro/a de realizar esta acción?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Esta acción será irreversible una vez aceptes. {nombre} será
                                            completamente eliminada.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                        <AlertDialogAction>Eliminar</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardFooter>
        </Card>
    )
}