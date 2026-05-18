"use client"
import { useState } from "react";
import { 
    Building2, Phone, Users, UserCog, MoreVertical, 
    BadgeCheck, Pencil, Trash, Eye, Bookmark, UserPlus, Mail, AlertTriangle 
} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Card, CardHeader, CardFooter, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";
import {
    AlertDialog,
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
    DialogTitle,
} from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";

interface CardEmpresaProps {
    id: number;
    nombre: string;
    ruc: string;
    monitor: string;
    telefono: string;
    aprendices: number;
    estado: string; 
    onEdit: () => void; 
    onDelete?: (id: number) => void; 
}

export function CardEmpresa({ id, nombre, ruc, monitor, telefono, aprendices, estado, onEdit, onDelete }: CardEmpresaProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);

    const getEstadoBadge = (status: string) => {
        const normalized = status?.toLowerCase();
        if (normalized === "activa" || normalized === "active") {
            return (
                <Badge className="bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-950 dark:text-green-300">
                    <BadgeCheck className="mr-1 size-3" /> Activa
                </Badge>
            );
        } else if (normalized === "suspendida") {
            return (
                <Badge variant="destructive">
                    <AlertTriangle className="mr-1 size-3" /> Suspendida
                </Badge>
            );
        } else {
            return (
                <Badge variant="outline" className="bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                    <UserCog className="mr-1 size-3" /> Por Validar
                </Badge>
            );
        }
    };

    return (
        <>
            <Card className="space-y-1 w-full max-w-sm">
                <CardHeader className="flex flex-row items-start space-y-0 justify-between">
                    <div className="flex flex-row items-center gap-5">
                        <div className="bg-muted p-2 rounded-md">
                            <Building2 className="text-muted-foreground size-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-sm tracking-tight">{nombre}</h3>
                            <small className="text-muted-foreground text-xs">RUC: {ruc}</small>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon">
                        <Bookmark className="size-4" />
                    </Button>
                </CardHeader>
                
                <CardContent>
                    <div className="space-y-2 text-muted-foreground">
                        <div className="flex flex-row items-center gap-2">
                            <Users className="size-4 shrink-0" />
                            <span className="text-xs">Monitor: <strong className="text-foreground">{monitor}</strong></span>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <Phone className="size-4 shrink-0" />
                            <span className="text-xs text-foreground">{telefono}</span>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <UserCog className="size-4 shrink-0" />
                            <span className="text-xs text-foreground">{aprendices} aprendices</span>
                        </div>
                    </div>
                </CardContent>
                
                <CardFooter className="flex justify-between items-center pt-2">
                    {getEstadoBadge(estado)}
                    
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreVertical className="size-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            
                            <DropdownMenuItem onClick={onEdit}>
                                <Pencil className="mr-2 size-4" /> Editar
                            </DropdownMenuItem>

                            <DropdownMenuItem onClick={() => setIsSheetOpen(true)}>
                                <UserPlus className="mr-2 size-4" /> Aprendices
                            </DropdownMenuItem>

                            <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
                                <Eye className="mr-2 size-4" /> Ver Detalles
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                                onClick={() => setIsAlertOpen(true)} 
                                className="text-destructive focus:text-destructive"
                            >
                                <Trash className="mr-2 size-4" /> Eliminar
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </CardFooter>
            </Card>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">{nombre}</DialogTitle>
                        <div className="flex flex-row items-center gap-3 pt-1">
                            <DialogDescription className="text-xs">RUC: {ruc}</DialogDescription>
                            {getEstadoBadge(estado)}
                        </div>
                    </DialogHeader>

                    <Tabs defaultValue="general" className="w-full mt-4">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="general">General</TabsTrigger>
                            <TabsTrigger value="aprendices">Aprendices</TabsTrigger>
                            <TabsTrigger value="contacto">Contacto</TabsTrigger>
                        </TabsList>
                        
                        <div className="py-4 space-y-4 min-h-[180px]">
                            <TabsContent value="general" className="space-y-4 mt-0">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Información Institucional</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 px-1">
                                        <div className="p-2 bg-secondary rounded-md text-secondary-foreground"><Users className="size-4"/></div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Monitor Asignado</p>
                                            <p className="text-sm font-medium">{monitor}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 px-1">
                                        <div className="p-2 bg-secondary rounded-md text-secondary-foreground"><Phone className="size-4"/></div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Teléfono de Sede</p>
                                            <p className="text-sm font-medium">{telefono}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 px-1">
                                        <div className="p-2 bg-secondary rounded-md text-secondary-foreground"><Mail className="size-4"/></div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Correo de Contacto</p>
                                            <p className="text-sm font-medium">contacto@{nombre.toLowerCase().replace(/[^a-z0-9]/g, "")}.com</p>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                            
                            <TabsContent value="aprendices" className="mt-0">
                                <div className="text-center py-6 text-muted-foreground text-sm">
                                    <p>Lista de alumnos realizando prácticas en la empresa.</p>
                                    <span className="text-xs font-semibold text-primary block mt-2">Total: {aprendices} alumnos asignados</span>
                                </div>
                            </TabsContent>
                            
                            <TabsContent value="contacto" className="mt-0">
                                <div className="text-sm text-muted-foreground py-2">
                                    <p>Área encargada de convenios y firmas de cartas de presentación.</p>
                                </div>
                            </TabsContent>
                        </div>
                    </Tabs>

                    <DialogFooter className="sm:justify-end">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">Cerrar</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent side="right">
                    <SheetHeader>
                        <SheetTitle>Asignar Aprendices</SheetTitle>
                        <SheetDescription>
                            Administra qué estudiantes están realizando sus prácticas en {nombre}.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="py-6 text-center text-xs text-muted-foreground border-2 border-dashed rounded-md mt-4">
                        Panel de vinculación rápida disponible en la Card.
                    </div>
                </SheetContent>
            </Sheet>

            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Estás completamente seguro/a?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta acción no se puede deshacer. La empresa <strong className="text-foreground">{nombre}</strong> y todos sus registros de prácticas asociados se eliminarán del sistema.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction 
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            onClick={() => onDelete?.(id)}
                        >
                            Eliminar Empresa
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}