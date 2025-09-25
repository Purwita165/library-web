// src/features/books/useBookDetailQuery.ts
import { useQuery } from "@tanstack/react-query"
import { fetchBookById } from "./api"
import { Book } from "./types"

// Hook khusus ambil detail 1 buku
export function useBookDetailQuery(id: string) {
  return useQuery<Book>({
    queryKey: ["book", id],
    queryFn: () => fetchBookById(id),
    enabled: !!id, // hanya jalan kalau ada id
  })
}
