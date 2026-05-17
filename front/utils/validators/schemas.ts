import  * as z from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .email("El email debe ser valido")
        .min(1, "El email es requerido"),
    password: z
        .string()
        .min(1, "La constraseña es requerida"),
    isRecovered: z
        .boolean()
        .optional()
        .default(false)
})

export const recoverSchema = z.object({
    email: z
        .string()
        .email('El email debe ser uno válido')
})

export const verifySchema = z.object({
    pin: z
        .string()
        .min(6, "El código debe tener 6 dígitos")
        .max(6, "El código debe tener 6 dígitos")
        .regex(/^\d+$/, "El código solo debe contener números")
})
export const resetSchema = z.object({
    password: z
        .string()
        .min(1, "La contraseña es requerida"),
    confirmPassword: z
        .string()
        .min(1, "La contraseña es requerida")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"]
})

export type UsuarioLogin = z.infer<typeof loginSchema>
export type UsuarioRecover = z.infer<typeof recoverSchema>
export type UsuarioVerify = z.infer<typeof verifySchema>
export type UsuarioReset = z.infer<typeof resetSchema>