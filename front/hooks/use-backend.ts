"use client"

import { useEffect, useState, useCallback } from "react"
import {
  getDashboardStats,
  getEmpresas,
  getCarreras,
  getAprendices,
  type DashboardStats,
  type Empresa,
  type Carrera,
  type Aprendiz,
} from "@/lib/api"

// ─── useDashboard ─────────────────────────────────────────────────────────────

export function useDashboard() {
  const [data, setData] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const stats = await getDashboardStats()
      setData(stats)
    } catch {
      setError("No se pudo conectar al backend. Verifica que esté corriendo en localhost:8080")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { refetch() }, [refetch])

  return { data, loading, error, refetch }
}

// ─── useEmpresas ──────────────────────────────────────────────────────────────

export function useEmpresas() {
  const [data, setData] = useState<Empresa[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setData(await getEmpresas())
    } catch {
      setError("Error al cargar empresas")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { refetch() }, [refetch])

  return { data, loading, error, refetch }
}

// ─── useCarreras ──────────────────────────────────────────────────────────────

export function useCarreras() {
  const [data, setData] = useState<Carrera[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setData(await getCarreras())
    } catch {
      setError("Error al cargar carreras")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { refetch() }, [refetch])

  return { data, loading, error, refetch }
}

// ─── useAprendices ────────────────────────────────────────────────────────────

export function useAprendices() {
  const [data, setData] = useState<Aprendiz[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setData(await getAprendices())
    } catch {
      setError("Error al cargar aprendices")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { refetch() }, [refetch])

  return { data, loading, error, refetch }
}