import { useQuery } from "@tanstack/react-query";
import { Book } from "@/features/books/types"; // ✅ sekarang dipakai

// Extend Book untuk tambahan field khusus detail
export interface BookDetail extends Book {
  description?: string;
}

async function fetchBookDetail(id: string): Promise<BookDetail> {
  const base = import.meta.env.VITE_API_URL ?? "";
  const res = await fetch(`${base}/api/books/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch book detail: ${res.status}`);
  }

  return res.json();
}

export function useBookDetailQuery(id: string) {
  return useQuery<BookDetail, Error>({
    queryKey: ["book", id],
    queryFn: () => fetchBookDetail(id),
    enabled: !!id,
  });
}
