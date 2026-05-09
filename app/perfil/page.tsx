import { UsersIcon, GraduationCap, CircleUser, Mail, Phone, User, Key } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function PerfilPage() {
    return (
        <div className="text-3xl font-bold">
            <h1>Mi Perfil</h1>
            <p className="text-sm text-muted-foreground">Gestiona tu informacio personal</p>
            <div className="grid grid-cols-2 gap-2">
                <Card>
                    <CardHeader className="flex items-center justify-center">
                        <CircleUser className="size-40" />
                    </CardHeader>
                    <CardHeader className="flex items-center justify-center">
                        <Input id="foto" type="file" />
                    </CardHeader>
                    <CardContent className="flex items-center justify-center">
                        <form>
                            <div className="flex items-center gap-2">
                                <GraduationCap />InstructorSegumiento
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" className="flex items-center gap-2">
                                    <Key />Cambiar Contraseña
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User />Informacion Personal
                        </CardTitle>
                        <CardDescription>Datos de contacto y ubicacion</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Nombres y Apellidos</Label>
                                    <Input id="name" placeholder="Juan Perez" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone />Telefono Movil
                                    <Input id="telefono" type="tel" placeholder="987654321" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="dni"># DNI</Label>
                                    <Input id="dni" type="number" placeholder="12345678" />
                                </div>
                                <div className="grid gap-2">
                                    <Mail />Correo Institucional
                                    <Input id="correo_institucional" type="email" placeholder="instructor_segimiento@senati.pe" />
                                </div>
                                <div className="grid gap-2">
                                    <Mail />Correo Personal
                                    <Input id="correo_personal" type="email" placeholder="instructor_seguimiento@email.com" />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}