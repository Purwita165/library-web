import { api } from "@/lib/api"
import { Book } from "./types"

export async function fetchBooks(): Promise<Book[]> {
  const res = await api.get("/books")
  return res.data
}

export async function fetchBookById(id: string): Promise<Book> {
  const res = await api.get(`/books/${id}`)
  return res.data
}
