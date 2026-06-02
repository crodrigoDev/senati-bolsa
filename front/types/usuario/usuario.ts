import { UsuarioLogin } from "@/utils/validators/schemas";

export interface IAuthResponse {
    email: string,
    rol: string,
    nombres: string,
    apellidos: string,
    estado: string
}

export interface IAuthContext {
    usuario: IAuthResponse | null,
    isAuthenticated: boolean,
    loading: boolean,
    login: (request: UsuarioLogin) => Promise<void>,
    logout: () => void,
}