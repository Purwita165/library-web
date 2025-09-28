// src/features/borrows/useBorrowBook.ts
import { useMutation, useQueryClient } from "@tanstack/react-query"

interface BorrowResponse {
  id: number
  bookId: number
  status: string
  dueDate?: string
}

async function borrowBook(bookId: number): Promise<BorrowResponse> {
  const base = import.meta.env.VITE_API_URL ?? ""
  const token = localStorage.getItem("token")

  const res = await fetch(`${base}/api/borrows`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token ?? ""}`,
    },
    body: JSON.stringify({ bookId }),
  })

  if (!res.ok) {
    let msg = `Borrow failed: ${res.status}`
    try {
      const body = await res.json()
      if (body?.message) msg = body.message
    } catch {}
    throw new Error(msg)
  }

  return res.json()
}

export function useBorrowBook() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: borrowBook,
    onSuccess: () => {
      // refresh daftar buku & loans setelah borrow berhasil
      queryClient.invalidateQueries({ queryKey: ["books"] })
      queryClient.invalidateQueries({ queryKey: ["loans"] })
    },
  })
}
