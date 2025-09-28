// src/features/books/useBooksQuery.ts
import { useQuery } from "@tanstack/react-query"
import { Book } from "./types"

async function fetchBooks(): Promise<Book[]> {
  const base = import.meta.env.VITE_API_URL ?? ""
  const token = localStorage.getItem("token")

  const res = await fetch(`${base}/api/books`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token ?? ""}`, // ✅ pakai token
    },
  })

  if (!res.ok) {
    let msg = `Failed to fetch books: ${res.status}`
    try {
      const body = await res.json()
      if (body?.message) msg = body.message
    } catch {}
    throw new Error(msg)
  }

  return res.json()
}

export function useBooksQuery() {
  return useQuery<Book[], Error>({
    queryKey: ["books"],
    queryFn: fetchBooks,
  })
}
