'use client'

import { GraduationCap, CircleUser, Mail, Phone, User, Key, EditIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect, useRef } from "react"
import { perfilService } from "@/services/perfilService"

export default function PerfilPage() {
    const [editarContrasenia, setEditarContrasenia] = useState(false)
    const [editarPerfil, setEditarPerfil] = useState(false)
    const [perfil, setPerfil] = useState<any>(null)
    const [editForm, setEditForm] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [passActual, setPassActual] = useState('')
    const [passNueva, setPassNueva] = useState('')
    const [passConfirmar, setPassConfirmar] = useState('')

    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        cargarPerfil()
    }, [])

    const cargarPerfil = async () => {
        try {
            const data = await perfilService.obtenerPerfil(1)
            setPerfil(data)
            setEditForm(data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const abrirEditarPerfil = () => {
        setEditForm({ ...perfil })
        setEditarPerfil(true)
    }

    const abrirCambiarPassword = () => {
        setPassActual('')
        setPassNueva('')
        setPassConfirmar('')
        setEditarContrasenia(true)
    }

    const cerrarCambiarPassword = () => {
        setPassActual('')
        setPassNueva('')
        setPassConfirmar('')
        setEditarContrasenia(false)
    }

    const cambiarFoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onloadend = async () => {
            const nuevaFotoUrl = reader.result as string
            const perfilActualizado = { ...perfil, foto_url: nuevaFotoUrl }
            setPerfil(perfilActualizado)
            try {
                await perfilService.actualizarPerfil(perfil.id, perfilActualizado)
            } catch (error) {
                console.error('Error al guardar la imagen:', error)
            }
        }
        reader.readAsDataURL(file)
    }

    const guardarPerfil = async () => {
        try {
            await perfilService.actualizarPerfil(editForm.id, editForm)
            setPerfil({ ...editForm })
            setEditarPerfil(false)
            alert('Perfil actualizado correctamente')
        } catch (error) {
            alert('Error al actualizar el perfil')
        }
    }

    const guardarPass = async () => {
        if (!passActual || !passNueva || !passConfirmar) {
            alert('Por favor completa todos los campos')
            return
        }
        if (passNueva !== passConfirmar) {
            alert('La nueva contraseña y la confirmación no coinciden')
            return
        }
        try {
            await perfilService.cambiarPassword(perfil.id, passActual, passNueva)
            cerrarCambiarPassword()
            alert('Contraseña actualizada correctamente')
        } catch (error) {
            alert('Error al cambiar la contraseña. Verifica que la contraseña actual sea correcta.')
        }
    }

    if (loading) return <div className="p-10 text-center">Cargando perfil...</div>
    if (!perfil) return <div className="p-10 text-center">No se pudo cargar el perfil</div>

    return (
        <div className="p-8 md:p-12 space-y-6 w-full h-full">
            <header className="flex items-start justify-between">
                <div className="text-3xl font-bold">
                    <h1>Mi Perfil</h1>
                    <p className="text-sm text-muted-foreground font-normal mt-1">Gestiona tu información personal</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={abrirEditarPerfil}>
                        <EditIcon /> Editar perfil
                    </Button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="flex flex-col items-center justify-center space-y-6">
                    <div className="flex flex-col items-center gap-4">
                        <Avatar className="h-32 w-32 border-2 border-primary/20">
                            <AvatarImage src={perfil.foto_url || "/placeholder-user.jpg"} alt="Usuario" />
                            <AvatarFallback><CircleUser className="h-20 w-20" /></AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col items-center gap-2">
                            <Label
                                htmlFor="foto"
                                className="cursor-pointer bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/80 transition-colors text-sm"
                            >
                                Seleccionar Imagen
                            </Label>
                            <input
                                id="foto"
                                type="file"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={cambiarFoto}
                                accept="image/*"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-3">
                        <div className="flex items-center gap-2">
                            <Button className="flex items-center gap-2">
                                <GraduationCap />
                                <span>InstructorSeguimiento</span>
                            </Button>
                        </div>
                        <Button type="button" variant="outline" onClick={abrirCambiarPassword}>
                            <Key className="mr-2 size-4" /> Cambiar Contraseña
                        </Button>
                    </div>
                </div>
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="text-primary" /> Información Personal
                        </CardTitle>
                        <CardDescription>Datos de contacto e institucionales</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
                            <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground uppercase tracking-wide">Nombres y Apellidos</Label>
                                <p className="font-medium">{perfil.nombres} {perfil.apellidos}</p>
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground uppercase tracking-wide flex items-center gap-1">
                                    <Phone className="size-3" /> Teléfono Móvil
                                </Label>
                                <p className="font-medium">{perfil.numero || 'No registrado'}</p>
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground uppercase tracking-wide"># DNI</Label>
                                <p className="font-medium">{perfil.dni || 'No registrado'}</p>
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground uppercase tracking-wide flex items-center gap-1">
                                    <Mail className="size-3" /> Correo Institucional
                                </Label>
                                <p className="font-medium text-primary">{perfil.email}</p>
                            </div>
                            <div className="space-y-1 md:col-span-2">
                                <Label className="text-xs text-muted-foreground uppercase tracking-wide flex items-center gap-1">
                                    <Mail className="size-3" /> Correo Personal
                                </Label>
                                <p className="font-medium">{perfil.correo_personal || 'No registrado'}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            {editarPerfil && editForm && (
                <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50 p-4">
                    <Card className="w-full max-w-2xl animate-in fade-in zoom-in duration-200">
                        <CardHeader>
                            <CardTitle>Editar Perfil</CardTitle>
                            <CardDescription>Solo puedes editar Nombres, Apellidos, Teléfono y Correo Personal.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-1.5"><User className="size-3.5" /> Nombres</Label>
                                    <Input
                                        value={editForm.nombres || ''}
                                        onChange={(e) => setEditForm({ ...editForm, nombres: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-1.5"><User className="size-3.5" /> Apellidos</Label>
                                    <Input
                                        value={editForm.apellidos || ''}
                                        onChange={(e) => setEditForm({ ...editForm, apellidos: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-1.5"><Phone className="size-3.5" /> Teléfono Móvil</Label>
                                    <Input
                                        value={editForm.numero || ''}
                                        onChange={(e) => setEditForm({ ...editForm, numero: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-1.5"><Mail className="size-3.5" /> Correo Personal</Label>
                                    <Input
                                        type="email"
                                        value={editForm.correo_personal || ''}
                                        onChange={(e) => setEditForm({ ...editForm, correo_personal: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="flex items-center gap-1.5"># DNI</Label>
                                    <Input value={editForm.dni || ''} readOnly className="bg-muted cursor-not-allowed" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-1.5"><Mail className="size-3.5" /> Correo Institucional</Label>
                                    <Input value={editForm.email || ''} readOnly className="bg-muted cursor-not-allowed" />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                            <Button variant="ghost" onClick={() => setEditarPerfil(false)}>Cancelar</Button>
                            <Button onClick={guardarPerfil}>Guardar Cambios</Button>
                        </CardFooter>
                    </Card>
                </div>
            )}
            {editarContrasenia && (
                <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50 p-4">
                    <Card className="w-full max-w-md animate-in fade-in zoom-in duration-200">
                        <CardHeader>
                            <CardTitle>Cambiar Contraseña</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Contraseña Actual</Label>
                                <Input
                                    type="password"
                                    value={passActual}
                                    onChange={(e) => setPassActual(e.target.value)}
                                    placeholder="••••••••"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Nueva Contraseña</Label>
                                <Input
                                    type="password"
                                    value={passNueva}
                                    onChange={(e) => setPassNueva(e.target.value)}
                                    placeholder="••••••••"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Confirmar Nueva Contraseña</Label>
                                <Input
                                    type="password"
                                    value={passConfirmar}
                                    onChange={(e) => setPassConfirmar(e.target.value)}
                                    placeholder="••••••••"
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                            <Button variant="ghost" onClick={cerrarCambiarPassword}>Cancelar</Button>
                            <Button onClick={guardarPass}>Actualizar Contraseña</Button>
                        </CardFooter>
                    </Card>
                </div>
            )}
        </div>
    )
}