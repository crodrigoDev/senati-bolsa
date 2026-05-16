'use client'

import { UsersIcon, GraduationCap, CircleUser, Mail, Phone, User, Key, EditIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
export default function PerfilPage() {
    const [editarContrasenia, setEditarContrasenia] = useState(false)
    const [editarPerfil, setEditarPerfil] = useState(false)
    return (
        <div className="p-8 md:p-12 space-y-6 w-full h-full">
            <header className="flex items-start justify-between">
                <div className="text-3xl font-bold">
                    <h1>Mi Perfil</h1>
                    <p className="text-sm text-muted-foreground font-normal mt-1">Gestiona tu información personal</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => setEditarPerfil(true)}>
                        <EditIcon /> Editar perfil
                    </Button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="flex flex-col items-center justify-center space-y-6">
                    <div className="flex flex-col items-center gap-4">
                        <Avatar className="h-32 w-32">
                            <AvatarImage src="/placeholder-user.jpg" alt="Usuario" />
                            <AvatarFallback><CircleUser className="h-20 w-20" /></AvatarFallback>
                        </Avatar>
                        <Input id="foto" type="file" className="max-w-xs" />
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <div className="flex items-center gap-2 text-xl font-semibold">
                            <Button className="flex items-center gap-2">
                                <GraduationCap />
                                <span>InstructorSeguimiento</span>
                            </Button>
                        </div>
                        <Button type="button" variant="outline" onClick={() => setEditarContrasenia(true)}>
                            <input type="button" /> # Cambiar Contraseña
                        </Button>
                    </div>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User />Información Personal
                        </CardTitle>
                        <CardDescription>Datos de contacto y ubicación</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid gap-4 grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Nombres y Apellidos</Label>
                                    <Input id="name" placeholder="Juan Perez" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="telefono" className="flex items-center gap-2">
                                        <Phone className="size-4" />
                                        <span>Teléfono Móvil</span>
                                    </Label>
                                    <Input id="telefono" type="tel" placeholder="987654321" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="dni"># DNI</Label>
                                    <Input id="dni" type="number" placeholder="12345678" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="correo_institucional" className="flex items-center gap-2">
                                        <Mail className="size-4" />
                                        <span>Correo Institucional</span>
                                    </Label>
                                    <Input id="correo_institucional" type="email" placeholder="instructor_seguimiento@senati.pe" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="correo_personal" className="flex items-center gap-2">
                                        <Mail className="size-4" />
                                        <span>Correo Personal</span>
                                    </Label>
                                    <Input id="correo_personal" type="email" placeholder="instructor_seguimiento@email.com" />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
            <div>
                {editarPerfil && (
                    <div className="p-8 fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center bg-zinc-60 font-sans dark:bg-black p-8">
                        <Card className="w-[700px]">
                            <CardHeader>
                                <CardTitle>Editar Perfil</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form>
                                    <div className="grid gap-4 grid-cols-2">
                                        <div className="grid gap-2">
                                            <Label htmlFor="name">Nombres y Apellidos</Label>
                                            <Input id="name" placeholder="Juan Perez" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Label htmlFor="telefono" className="flex items-center gap-2">
                                                <Phone className="size-4" />
                                                <span>Teléfono Móvil</span>
                                            </Label>
                                            <Input id="telefono" type="tel" placeholder="987654321" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="dni"># DNI</Label>
                                            <Input id="dni" type="number" placeholder="12345678" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="correo_institucional" className="flex items-center gap-2">
                                                <Mail className="size-4" />
                                                <span>Correo Institucional</span>
                                            </Label>
                                            <Input id="correo_institucional" type="email" placeholder="instructor_seguimiento@senati.pe" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="correo_personal" className="flex items-center gap-2">
                                                <Mail className="size-4" />
                                                <span>Correo Personal</span>
                                            </Label>
                                            <Input id="correo_personal" type="email" placeholder="instructor_seguimiento@email.com" />
                                        </div>
                                    </div>
                                </form>
                            </CardContent>
                            <div className="flex justify-end items-center p-4">
                                <Button type="button" className="mr-2" onClick={() => setEditarPerfil(false)}>
                                    Cancelar
                                </Button>
                                <Button type="button">
                                    Guardar Cambios
                                </Button>
                            </div>
                        </Card>
                    </div>
                )}
                {editarContrasenia && (
                    <div className="p-8 fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center bg-zinc-60 font-sans dark:bg-black p-8">
                        <Card className="w-[400px]">
                            <CardHeader>
                                <CardTitle>Editar Contraseña</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form>
                                    <div className="grid gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="contrasenia_actual">Contraseña Actual</Label>
                                            <Input id="contrasenia_actual" type="password" placeholder="Ingrese su contraseña actual" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="contrasenia_nueva">Contraseña Nueva</Label>
                                            <Input id="contrasenia_nueva" type="password" placeholder="Ingrese su nueva contraseña" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="contrasenia_confirmar">Confirmar Contraseña</Label>
                                            <Input id="contrasenia_confirmar" type="password" placeholder="Confirme su nueva contraseña" />
                                        </div>
                                    </div>
                                </form>
                            </CardContent>
                            <div className="flex justify-end items-center p-4">
                                <Button type="button" className="mr-2" onClick={() => setEditarContrasenia(false)}>
                                    Cancelar
                                </Button>
                                <Button type="button">
                                    Guardar Cambios
                                </Button>
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    )
}