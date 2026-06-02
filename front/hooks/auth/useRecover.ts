'use client'

import { useState } from "react"
import { authService } from "@/services/authService"
import { UsuarioRecover, UsuarioReset, UsuarioVerify } from "@/utils/validators/schemas"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export const useRecover = () => {
    const router = useRouter();
    
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSendEmail = async (request: UsuarioRecover) => {
        setLoading(true);
        setError(null);

        try {
            localStorage.setItem("email", request.email);
            const response = await authService.forgot_password(request);
            toast.success(response.message, {position : "top-right"})
            router.push("/verify-code");
        } catch (err: any) {
            setError(err.message || "No se pudo enviar el correo de recuperación.");
        } finally {
            setLoading(false);
        }
    }

    const handleVerifyCode = async (request: UsuarioVerify) => {
        setLoading(true);
        setError(null);
        try {
            const email = localStorage.getItem('email') ?? "";
            await authService.verify_code(email, request.pin);
            localStorage.setItem('codigo', request.pin)
            document.cookie = "reset=true; path=/; max-age=900; SameSite=Strict"
            router.push("/reset-password");
        } catch (err: any) {
            setError(err.message || "El código ingresado es incorrecto o ha expirado.");
        } finally {
            setLoading(false);
        }
    }

    const handleResetPassword = async (request: UsuarioReset) => {
        setLoading(true)
        setError(null);
        try{
            const email = localStorage.getItem('email') ?? "";
            const codigo = localStorage.getItem('codigo') ?? ""
            const response = await authService.reset_password(email, codigo, request.password);
            toast.success(response.message, {position: "top-right"})
            localStorage.removeItem('email')
            localStorage.removeItem('codigo')
            document.cookie = "reset=; path=/; max-age=0; SameSite=Strict"
            router.push("/login")
        } catch (err: any) {
            setError(err.message || "El email no es correcto")
        } finally {
            setLoading(false)
        }
    }

    return {
        handleSendEmail,
        handleVerifyCode,
        handleResetPassword,
        loading,
        error,  
        setError 
    }
}