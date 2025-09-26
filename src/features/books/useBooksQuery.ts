// src/features/books/useBooksQuery.ts
import { useQuery } from "@tanstack/react-query";
import { Book } from "./types";  


async function fetchBooks(): Promise<Book[]> {
  const base = import.meta.env.VITE_API_URL ?? "";
  const res = await fetch(`${base}/api/books`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch books: ${res.status}`);
  }

  return res.json();
}

export function useBooksQuery() {
  return useQuery<Book[], Error>({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });
}
