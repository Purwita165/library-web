// src/features/books/useBooksQuery.ts
import { useQuery } from "@tanstack/react-query"
import { Book } from "./types"

async function fetchBooks(): Promise<Book[]> {
  const base = import.meta.env.VITE_API_URL ?? ""
  const token = localStorage.getItem("token")

  const res = await fetch(`${base}/api/books`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token ?? ""}`,
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

  const body = await res.json()
  console.log("📚 API books response:", body)

  // Ambil array dari body.data.books
  if (Array.isArray(body?.data?.books)) {
    return body.data.books.map((b: any) => ({
      id: b.id,
      title: b.title,
      author: b.author?.name ?? "Unknown Author",
      category: b.category?.name ?? "Uncategorized",
      coverUrl: b.coverImage ?? "/covers/placeholder.png",
      available: (b.availableCopies ?? 0) > 0,
      description: b.description,
    }))
  }

  return []
}

export function useBooksQuery() {
  return useQuery<Book[], Error>({
    queryKey: ["books"],
    queryFn: fetchBooks,
  })
}
