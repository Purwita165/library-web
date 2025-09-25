// src/features/books/useBooksQuery.ts
import { useQuery } from "@tanstack/react-query";
import { Book } from "./types";
import { fetchBooks, fetchBookById } from "./api";

export function useBooksQuery() {
  return useQuery<Book[]>({
    queryKey: ["books"],
    queryFn: fetchBooks,
    staleTime: 1000 * 60 * 2, // 2 minutes (optional)
  });
}

export function useBookDetailQuery(id: string) {
  return useQuery<Book>({
    queryKey: ["books", id],
    queryFn: () => fetchBookById(id),
    enabled: !!id,
  })
}
