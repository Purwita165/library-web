// src/features/loans/useLoansQuery.ts
import { useQuery } from "@tanstack/react-query"
import type { Book } from "@/features/books/types"

// Bentuk data pinjaman dari backend
export interface Loan {
  id: string
  status: string
  borrowedAt?: string
  dueDate?: string
  book: Book
}

async function fetchLoans(): Promise<Loan[]> {
  const base = import.meta.env.VITE_API_URL ?? ""
  const token = localStorage.getItem("token")

  const res = await fetch(`${base}/api/borrows`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token ?? ""}`,
    },
  })

  if (!res.ok) {
    let msg = `Failed to fetch loans: ${res.status}`
    try {
      const body = await res.json()
      if (body?.message) msg = body.message
    } catch {}
    throw new Error(msg)
  }

  return res.json()
}

export function useLoansQuery() {
  return useQuery<Loan[], Error>({
    queryKey: ["loans"],
    queryFn: fetchLoans,
  })
}
