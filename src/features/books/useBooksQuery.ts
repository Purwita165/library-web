// src/features/books/useBooksQuery.ts
import { useQuery } from "@tanstack/react-query"
import { fetchBooks, fetchBookDetail } from "./api"
import { Book } from "./types"

// ambil semua buku
export function useBooksQuery() {
  return useQuery<Book[]>({
    queryKey: ["books"],
    queryFn: fetchBooks,
  })
}

// ambil detail buku by id
export function useBookDetailQuery(id: string) {
  return useQuery<Book>({
    queryKey: ["book", id],
    queryFn: () => fetchBookDetail(id),
    enabled: !!id, // hanya jalan kalau id ada
  })
}
