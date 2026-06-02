'use client'

import React, {createContext, useContext, useState, useEffect} from 'react';
import { authService } from '@/services/authService';
import { IAuthContext, IAuthResponse } from '@/types/usuario/usuario';
import { UsuarioLogin } from '@/utils/validators/schemas';

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export function AuthProvider({children} : {children: React.ReactNode}) {
    const [usuario, setUsuario] = useState<IAuthResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verificarSesion = async () => {
            try {
                const usuarioGuardado = localStorage.getItem('usuario_bolsa');
                if(usuarioGuardado){
                    setUsuario(JSON.parse(usuarioGuardado));
                }
            } catch(error){
                console.error("Error al recuperar sesion",  error);
            } finally{
                setLoading(false);
            }
        };
        verificarSesion();
    }, []);

    const login = async (dataForm: UsuarioLogin) => {
        const response = await authService.login(dataForm);
        const dto = response.data;
        if(dto){
            const usuarioData = {
                email: dto.email,
                rol: dto.rol,
                nombres: dto.nombres,
                apellidos: dto.apellidos,
                estado: dto.estado
            }
            setUsuario(usuarioData)
            localStorage.setItem("usuario_bolsa", JSON.stringify(usuarioData));
        }
    }

    const logout = async () => {
        await authService.logout();
        setUsuario(null)
        localStorage.removeItem("usuario_bolsa");
    }
    return (
        <AuthContext.Provider value={{ usuario, isAuthenticated: !!usuario, loading, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth debe usarse dentro de un AuthProvider");
    return context;
};