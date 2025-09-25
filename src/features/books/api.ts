import api from "@/lib/api"
import { Book } from "./types"

// Ambil semua buku dari backend
export async function fetchBooks(): Promise<Book[]> {
  const res = await api.get("/books")
  // backend return bisa { success: false } → kita handle
  if (!res.data || !Array.isArray(res.data)) {
    throw new Error(res.data?.message ?? "Failed to fetch books")
  }
  return res.data
}

// Ambil detail buku
export async function fetchBookById(id: string): Promise<Book> {
  const res = await api.get(`/books/${id}`)
  return res.data
}
