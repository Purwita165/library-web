import { useQuery } from "@tanstack/react-query";
import { Book } from "./types";
import { fetchBooks } from "./services";

// Custom hook pakai React Query
export function useBooks() {
  return useQuery<Book[]>({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });
}
