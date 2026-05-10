"use client"
import { LayoutGrid, List, Search, CirclePlus } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button'
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from '@/components/ui/tabs'
import { ButtonGroup } from '@/components/ui/button-group';
import { CardEmpresa } from './_components/cardEmpresa';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput
} from '@/components/ui/input-group';
import {
    Sheet,
    SheetTrigger,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetFooter,
    SheetTitle,
    SheetDescription,
} from '@/components/ui/sheet'
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function page() {
    const [listaEmpresas, setListaEmpresas] = useState([
        { id: 1, nombre: 'J&P periféricos S.A.C', ruc: '19238429403', monitor: 'Luis Vecerra', telefono: '992839121', aprendices: 9 },
        { id: 2, nombre: 'Majo Covisians Group S.A.C', ruc: '87438429403', monitor: 'Keneth Jara', telefono: '934539121', aprendices: 5 },
        { id: 3, nombre: 'Conauti S.A.C', ruc: '20112233445', monitor: 'Sin asignar', telefono: '911223344', aprendices: 8 }
    ]);
    const [empresaEditar, setEmpreseditar] = useState<any>(null);
    const [openSheet, setOpenSheet] = useState(false);


    const handleEditClick = (empresa: any) => {
        setEmpreseditar(null);
        setOpenSheet(true);
    }

    const handleCreateClick = (empresa: any) => {
        setEmpreseditar(null);
        setOpenSheet(true);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const data = {
            nombre: formData.get('nombre') as string,
            ruc: formData.get('ruc') as string,
            monitor: formData.get('monitor') as string,
            telefono: formData.get('telefono') as string,
        };

        if (empresaEditar) {
            setListaEmpresas(listaEmpresas.map(emp =>
                emp.id === empresaEditar.id ? { ...emp, ...data } : emp
            ));
        } else {
            const newEmpresa = { id: Date.now(), ...data, aprendices: 0 };
            setListaEmpresas([...listaEmpresas, newEmpresa]);
        }

        setOpenSheet(false);

    }

    return (
        <div className='p-20 space-y-5 w-full h-full'>
            <header className='flex items-center justify-between mb-8'>
                <div>
                    <h1 className='text-2xl font-extrabold'>Empresa</h1>
                    <small className='font-light'>Gestiona las empresas asociadas y sus aprendices asignados</small>
                </div>
            </header>

            <section className='space-y-5'>
                <InputGroup>
                    <InputGroupInput placeholder='Buscar'></InputGroupInput>
                    <InputGroupAddon> <Search /></InputGroupAddon>
                </InputGroup>
                <Tabs defaultValue='empresas' className='w-full h-full gap-10'>
                    <div className='flex flex-row gap-2 justify-between'>
                        <TabsList>
                            <TabsTrigger value='empresas'>Empresas</TabsTrigger>
                            <TabsTrigger value='aprendices'>Aprendices</TabsTrigger>
                        </TabsList>
                        <div className='flex flex-row gap-2'>
                            <ButtonGroup>
                                <Button variant={'outline'}>
                                    <LayoutGrid />
                                </Button>
                                <Button variant={'outline'}>
                                    <List />
                                </Button>
                            </ButtonGroup>

                            <Sheet open={openSheet} onOpenChange={setOpenSheet}>
                                <SheetTrigger asChild>
                                    <Button>
                                        <CirclePlus />
                                        Registrar Empresa
                                    </Button>
                                </SheetTrigger>
                                <SheetContent>
                                    <SheetHeader>
                                        <SheetTitle>Agregar Empresa</SheetTitle>
                                        <SheetDescription>
                                            Completa los datos para poder regsitar una nueva empresa
                                        </SheetDescription>
                                    </SheetHeader>
                                    <form id='form-empresa' key={empresaEditar ? empresaEditar.id : 'nuevo'} onSubmit={handleSubmit} className='space-y-3 p-5'>
                                        <div className='space-y-2'>
                                            <Label htmlFor='nombre'>Empresa</Label>
                                            <Input
                                                id='nombre'
                                                name='nombre'
                                                placeholder='Innova Tech S.A.C'
                                                required
                                                defaultValue={empresaEditar?.nombre || ''}
                                                key={empresaEditar?.id || 'Nuevo'}
                                            ></Input>
                                        </div>
                                        <div className='space-y-2'>
                                            <Label htmlFor='ruc'>RUC</Label>
                                            <Input
                                                id='ruc'
                                                name='ruc'
                                                placeholder='Ejemp: 29391002939'
                                                required
                                                defaultValue={empresaEditar?.ruc || ''}
                                                key={empresaEditar?.id + 'ruc'}
                                            ></Input>
                                        </div>
                                        <div className='space-y-2'>
                                            <Label htmlFor='Monitor'>Monitor</Label>
                                            <Input
                                                id='monitor'
                                                name='monitor'
                                                required
                                                defaultValue={empresaEditar?.monitor || ''}
                                                key={empresaEditar?.id || 'monitor'}
                                            ></Input>
                                        </div>
                                        <div className='space-y-2'>
                                            <Label htmlFor='telefono'>Telefono</Label>
                                            <Input
                                                id='telefono'
                                                name='telefono'
                                                required
                                                defaultValue={empresaEditar?.telefono || ''}
                                                key={empresaEditar?.id || ''}
                                            ></Input>
                                        </div>
                                    </form>

                                    <SheetFooter>
                                        <Button type='submit' form='form-empresa'>
                                            {empresaEditar ? 'Guardar Cambios' : 'Registrar Empresa'}
                                        </Button>
                                        <SheetClose asChild>
                                            <Button variant={'outline'}>Cerrar</Button>
                                        </SheetClose>
                                    </SheetFooter>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>

                    <TabsContent value='empresas' className=''>
                        <div className='grid grid-cols-3 py-2 gap-4'>
                            {listaEmpresas.map((empresa) => (
                                <CardEmpresa
                                    key={empresa.id}
                                    nombre={empresa.nombre}
                                    ruc={empresa.ruc}
                                    monitor={empresa.monitor}
                                    telefono={empresa.telefono}
                                    aprendices={empresa.aprendices}
                                    onEdit={() => handleEditClick(empresa)}
                                />
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value='aprendices'>
                        <div className='grid grid-cols-4 py-2 gap-4'>
                            {/* <CardEmpresa /> */}

                        </div>
                    </TabsContent>
                </Tabs>
            </section>
        </div>
    );
}