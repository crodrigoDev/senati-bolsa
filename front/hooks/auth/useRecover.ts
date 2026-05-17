'use client'

import { authService } from "@/services/authService"
import { UsuarioRecover } from "@/utils/validators/schemas"
import { useRouter } from "next/navigation"

export const useRecover = () => {
    const router = useRouter();
    const handleSendEmail = (request: UsuarioRecover) => {
        localStorage.setItem("email", JSON.stringify(request))
        void authService.forgot_password(request).catch((error) => {
            console.error("Error al enviar correo de recuperacion", error)
        })
        router.push("/verify-code")
    }

    return{
        handleSendEmail
    }
}