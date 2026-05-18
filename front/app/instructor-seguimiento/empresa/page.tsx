"use client"
import React, { useState, useEffect } from 'react';
import { LayoutGrid, List, Search, CirclePlus, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ButtonGroup } from '@/components/ui/button-group';
import { CardEmpresa } from './_components/cardEmpresa';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import {
    Sheet,
    SheetTrigger,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetFooter,
    SheetTitle,
    SheetDescription,
} from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
interface EmpresaBackend {
    empresa_id: number;
    empresa_nombre: string;
    empresa_ruc: string;
    empresa_telefono: string;
    empresa_estado: string;
    monitor_nombre: string;
    total_aprendices: number;
}

export default function EmpresasPage() {
    const [listaEmpresas, setListaEmpresas] = useState<EmpresaBackend[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    const [empresaEditar, setEmpresaEditar] = useState<any>(null);
    const [openSheet, setOpenSheet] = useState(false);

    const cargarEmpresas = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch('http://localhost:8080/api/empresas/cards'); //
            
            if (!response.ok) {
                throw new Error(`Error en el servidor: ${response.status}`);
            }
            
            const data = await response.json();
            setListaEmpresas(data); // Asigna el JSON que vimos en consola
        } catch (err: any) {
            console.error("Error al conectar con Spring Boot:", err);
            setError("No se pudo conectar con el servidor. Verifica que tu backend esté corriendo.");
        } finally {
            setLoading(false);
        }
    };

    // Cargar datos automáticamente al montar el componente
    useEffect(() => {
        cargarEmpresas();
    }, []);

    // 3. Manejo de estados para los formularios (Controlados desde el padre)
    const handleEditClick = (empresa: any) => {
        setEmpresaEditar(empresa); // Pasa el objeto completo para poblar el formulario
        setOpenSheet(true);
    };

    const handleCreateClick = () => {
        setEmpresaEditar(null); // Limpia para un nuevo registro
        setOpenSheet(true);
    };

    // 4. Guardar / Editar (Mantiene consistencia con las llaves del backend por ahora)
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const data = {
            empresa_nombre: formData.get('nombre') as string,
            empresa_ruc: formData.get('ruc') as string,
            monitor_nombre: formData.get('monitor') as string,
            empresa_telefono: formData.get('telefono') as string,
            empresa_estado: empresaEditar ? empresaEditar.empresa_estado : 'por validar'
        };

        if (empresaEditar) {
            setListaEmpresas(listaEmpresas.map(emp =>
                emp.empresa_id === empresaEditar.empresa_id ? { ...emp, ...data } : emp
            ));
        } else {
            const newEmpresa = { 
                empresa_id: Date.now(), 
                ...data, 
                total_aprendices: 0 
            };
            setListaEmpresas([...listaEmpresas, newEmpresa]);
        }
        setOpenSheet(false);
    };

    const handleDeleteEmpresa = (id: number) => {
        setListaEmpresas(listaEmpresas.filter(emp => emp.empresa_id !== id));
    };

    return (
        <div className="p-8 md:p-12 space-y-6 w-full h-full">
            <header className="flex items-start justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Empresas</h1>
                    <p className="text-sm text-muted-foreground font-normal mt-1">
                        Gestiona las empresas asociadas y sus aprendices asignados en la bolsa de trabajo.
                    </p>
                </div>
            </header>

            <section className='space-y-5'>
                <InputGroup>
                    <InputGroupInput placeholder='Buscar por nombre o RUC...' />
                    <InputGroupAddon> <Search className="size-4 text-muted-foreground" /></InputGroupAddon>
                </InputGroup>
                
                <Tabs defaultValue='empresas' className='w-full h-full gap-10'>
                    <div className='flex flex-row gap-2 justify-between items-center'>
                        <TabsList>
                            <TabsTrigger value='empresas'>Empresas</TabsTrigger>
                            <TabsTrigger value='aprendices'>Aprendices</TabsTrigger>
                        </TabsList>
                        
                        <div className='flex flex-row gap-2'>
                            <ButtonGroup>
                                <Button variant={'outline'} size="icon">
                                    <LayoutGrid className="size-4" />
                                </Button>
                                <Button variant={'outline'} size="icon">
                                    <List className="size-4" />
                                </Button>
                            </ButtonGroup>

                            <Sheet open={openSheet} onOpenChange={setOpenSheet}>
                                <Button onClick={handleCreateClick}>
                                    <CirclePlus className="mr-2 size-4" />
                                    Registrar Empresa
                                </Button>
                                <SheetContent>
                                    <SheetHeader>
                                        <SheetTitle>{empresaEditar ? 'Editar Empresa' : 'Agregar Empresa'}</SheetTitle>
                                        <SheetDescription>
                                            Completa los datos institucionales para actualizar o registrar la empresa en el sistema.
                                        </SheetDescription>
                                    </SheetHeader>
                                    
                                    <form 
                                        id='form-empresa' 
                                        key={empresaEditar ? empresaEditar.empresa_id : 'nuevo'} 
                                        onSubmit={handleSubmit} 
                                        className='space-y-4 py-5'
                                    >
                                        <div className='space-y-2'>
                                            <Label htmlFor='nombre'>Razón Social / Empresa</Label>
                                            <Input
                                                id='nombre'
                                                name='nombre'
                                                placeholder='Innova Tech S.A.C'
                                                required
                                                defaultValue={empresaEditar?.empresa_nombre || ''}
                                            />
                                        </div>
                                        <div className='space-y-2'>
                                            <Label htmlFor='ruc'>RUC</Label>
                                            <Input
                                                id='ruc'
                                                name='ruc'
                                                placeholder='Ejemp: 20895623147'
                                                required
                                                maxLength={11}
                                                defaultValue={empresaEditar?.empresa_ruc || ''}
                                            />
                                        </div>
                                        <div className='space-y-2'>
                                            <Label htmlFor='monitor'>Monitor Asignado</Label>
                                            <Input
                                                id='monitor'
                                                name='monitor'
                                                placeholder='Nombre del encargado'
                                                required
                                                defaultValue={empresaEditar?.monitor_nombre || ''}
                                            />
                                        </div>
                                        <div className='space-y-2'>
                                            <Label htmlFor='telefono'>Teléfono de Contacto</Label>
                                            <Input
                                                id='telefono'
                                                name='telefono'
                                                placeholder='Ejemp: 951753456'
                                                required
                                                defaultValue={empresaEditar?.empresa_telefono || ''}
                                            />
                                        </div>
                                    </form>

                                    <SheetFooter className="gap-2 sm:gap-0">
                                        <Button type='submit' form='form-empresa'>
                                            {empresaEditar ? 'Guardar Cambios' : 'Registrar Empresa'}
                                        </Button>
                                        <SheetClose asChild>
                                            <Button variant={'outline'}>Cancelar</Button>
                                        </SheetClose>
                                    </SheetFooter>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>

                    {/* Contenido de la pestaña Empresas */}
                    <TabsContent value='empresas' className="mt-4">
                        {loading ? (
                            /* Loader animado mientras espera el backend */
                            <div className="flex flex-col items-center justify-center py-20 gap-2 text-muted-foreground">
                                <Loader2 className="animate-spin size-8 text-primary" />
                                <p className="text-sm">Obteniendo empresas desde el backend...</p>
                            </div>
                        ) : error ? (
                            /* Mensaje de error si el backend está apagado o falla */
                            <div className="flex flex-col items-center justify-center py-16 gap-2 text-destructive border border-destructive/20 bg-destructive/5 rounded-lg p-6">
                                <AlertCircle className="size-8" />
                                <p className="text-sm font-medium text-center">{error}</p>
                                <Button size="sm" variant="outline" className="mt-2" onClick={cargarEmpresas}>Reintentar conexión</Button>
                            </div>
                        ) : listaEmpresas.length === 0 ? (
                            <p className="text-sm text-muted-foreground text-center py-10">No se encontraron empresas registradas.</p>
                        ) : (
                            /* Renderizado dinámico con CSS Grid Responsivo */
                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                                {listaEmpresas.map((empresa) => (
                                    <CardEmpresa
                                        key={empresa.empresa_id} //
                                        id={empresa.empresa_id} //
                                        nombre={empresa.empresa_nombre} //
                                        ruc={empresa.empresa_ruc} //
                                        monitor={empresa.monitor_nombre} //
                                        telefono={empresa.empresa_telefono} //
                                        aprendices={empresa.total_aprendices} //
                                        estado={empresa.empresa_estado} //
                                        onEdit={() => handleEditClick(empresa)}
                                        onDelete={handleDeleteEmpresa}
                                    />
                                ))}
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value='aprendices'>
                        <div className="text-sm text-muted-foreground py-10 text-center">
                            Módulo de visualización detallada por aprendices (Próximamente).
                        </div>
                    </TabsContent>
                </Tabs>
            </section>
        </div>
    );
}