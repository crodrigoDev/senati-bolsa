import { UsuarioLogin, UsuarioRecover } from "@/utils/validators/schemas"

const API_URL_BASE = "http://localhost:8080/api/auth"

export const authService = {
    login: async (request: UsuarioLogin) => {
        const response = await fetch(`${API_URL_BASE}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body:JSON.stringify({
                email: request.email,
                password: request.password}),
        });
        if (!response.ok) {
            if(response.status === 403 || response.status === 401){
                throw new Error("Credenciales incorrectas");
            }
            const errorBody = await response.json().catch(() => ({}));
            throw new Error(errorBody.message || `Error inesperado en el servidor: ${response.status}`);
        }
        return response.json();
    },

    logout: async () => {
        await fetch(`${API_URL_BASE}/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
        });
    },
    forgot_password: async (request: UsuarioRecover) => {
        const response = await fetch(`${API_URL_BASE}/forgot-password`, {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                email: request.email,
            })
        });
        if (!response.ok) {
            const errorBody = await response.json().catch(() => ({}));
            throw new Error(errorBody.message || `Error inesperado en el servidor: ${response.status}`);
        }
        return response.json();
    },
    verify_code: async (email: string, codigo: string) => {
        const response = await fetch(`${API_URL_BASE}/verify-code`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                email: email,
                codigo: codigo
            })
        });
        if(!response.ok){
            if(response.status === 403 || response.status === 401){
                throw new Error("Codigo invalido o expirado");
            }
            const errorBody = await response.json().catch(() => ({}));
            throw new Error(errorBody.message || `Error inesperado en el servidor: ${response.status}`);
        }
        return response.json();
    },
    reset_password: async (email: string, codigo: string, nuevaPassword: string) => {
        const response = await fetch(`${API_URL_BASE}/reset-password`,{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                codigo,
                nuevaPassword
            })
        });
        if(!response.ok){
            if(response.status === 403 || response.status === 401){
                throw new Error("Email invalido");
            }
            const errorBody = await response.json().catch(() => ({}));
            throw new Error(errorBody.message || `Error inesperado en el servidor: ${response.status}`);
        }
        return response.json();
    }
}