import { useQuery } from "@tanstack/react-query"
import { fetchBooks } from "./api"
import { Book } from "./types"

export function useBooksQuery() {
  return useQuery<Book[]>({
    queryKey: ["books"],
    queryFn: fetchBooks,
  })
}
