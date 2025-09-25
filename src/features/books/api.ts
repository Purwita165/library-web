// src/features/books/api.ts
import api from "@/lib/api"
import { Book } from "./types"

export async function fetchBooks(): Promise<Book[]> {
  const res = await api.get("/books")
  return res.data
}

export async function fetchBookDetail(id: string): Promise<Book> {
  const res = await api.get(`/books/${id}`)
  return res.data
}

export async function borrowBook(id: string) {
  const res = await api.post(`/books/${id}/borrow`)
  return res.data
}

export async function returnBook(id: string) {
  const res = await api.post(`/books/${id}/return`)
  return res.data
}
