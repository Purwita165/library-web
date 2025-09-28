// src/features/loans/useLoansQuery.ts
import { useEffect, useState, useCallback } from "react"

export interface Loan {
  id: number
  bookId: number
  status: string
  borrowedAt?: string
  dueAt?: string
  book?: {
    id: number
    title: string
    author?: { name: string }
    coverImage?: string
  }
}

export default function useLoansQuery() {
  const [loans, setLoans] = useState<Loan[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchLoans = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const base = import.meta.env.VITE_API_URL ?? ""
      const token = localStorage.getItem("token")

      const res = await fetch(`${base}/api/loans`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const body = await res.json()
      console.log("📚 Loans API response:", body)

      if (!res.ok) throw new Error(body?.message ?? `Error ${res.status}`)

      // asumsi backend balikin { success, data: [...] }
      setLoans(body?.data ?? [])
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchLoans()
  }, [fetchLoans])

  return { loans, isLoading, error, refetch: fetchLoans }
}
