const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DashboardStats {
  totalEmpresas: number
  totalCarreras: number
  totalAprendices: number
  totalUsuarios: number
  promedioAvance: number
  progresoCarreras: {
    ACTIVA: number
    POR_VALIDAR: number
    INACTIVA: number
  }
  aprendicesPorCiclo: Record<string, number>
  distribucionCarreras: Record<string, number>
}

export interface Carrera {
  id: number
  nombre: string
  estado: string
  fechaCreacion: string
}

export interface Empresa {
  id: number
  razonSocial: string
  nombreComercial: string
  ruc: string
  direccion: string
  telefono: string
  emailContacto: string
  estado: string
  fechaRegistro: string
}

export interface Usuario {
  id: number
  nombre: string
  email: string
}

export interface Aprendiz {
  id: number
  usuario: Usuario | null
  carrera: Carrera | null
  ciclo: number
  avancePorcentaje: number
  fechaIngreso: string
}

// ─── Helper ───────────────────────────────────────────────────────────────────

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  })
  if (!res.ok) throw new Error(`Error ${res.status} en ${path}`)
  // DELETE devuelve 200 sin body
  if (res.status === 204 || res.headers.get("content-length") === "0") {
    return undefined as unknown as T
  }
  return res.json()
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export const getDashboardStats = () =>
  apiFetch<DashboardStats>("/dashboard/estadisticas")

// ─── Empresas ─────────────────────────────────────────────────────────────────

export const getEmpresas = () => apiFetch<Empresa[]>("/empresas")
export const getEmpresa = (id: number) => apiFetch<Empresa>(`/empresas/${id}`)
export const createEmpresa = (data: Partial<Empresa>) =>
  apiFetch<Empresa>("/empresas", { method: "POST", body: JSON.stringify(data) })
export const updateEmpresa = (id: number, data: Partial<Empresa>) =>
  apiFetch<Empresa>(`/empresas/${id}`, { method: "PUT", body: JSON.stringify(data) })
export const deleteEmpresa = (id: number) =>
  apiFetch<void>(`/empresas/${id}`, { method: "DELETE" })

// ─── Carreras ─────────────────────────────────────────────────────────────────

export const getCarreras = () => apiFetch<Carrera[]>("/carreras")
export const getCarrera = (id: number) => apiFetch<Carrera>(`/carreras/${id}`)
export const createCarrera = (data: Partial<Carrera>) =>
  apiFetch<Carrera>("/carreras", { method: "POST", body: JSON.stringify(data) })
export const updateCarrera = (id: number, data: Partial<Carrera>) =>
  apiFetch<Carrera>(`/carreras/${id}`, { method: "PUT", body: JSON.stringify(data) })
export const deleteCarrera = (id: number) =>
  apiFetch<void>(`/carreras/${id}`, { method: "DELETE" })

// ─── Aprendices ───────────────────────────────────────────────────────────────

export const getAprendices = () => apiFetch<Aprendiz[]>("/aprendices")
export const getAprendiz = (id: number) => apiFetch<Aprendiz>(`/aprendices/${id}`)
export const createAprendiz = (data: Partial<Aprendiz>) =>
  apiFetch<Aprendiz>("/aprendices", { method: "POST", body: JSON.stringify(data) })
export const updateAprendiz = (id: number, data: Partial<Aprendiz>) =>
  apiFetch<Aprendiz>(`/aprendices/${id}`, { method: "PUT", body: JSON.stringify(data) })
export const deleteAprendiz = (id: number) =>
  apiFetch<void>(`/aprendices/${id}`, { method: "DELETE" })