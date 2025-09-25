// src/features/books/useReturnBook.ts
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"
import { Book } from "./types"

export function useReturnBook() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (bookId: string) => {
      // 🔥 hit API real
      const res = await api.post(`/books/${bookId}/return`)
      return res.data
    },
    onMutate: async (bookId: string) => {
      // ✅ Optimistic update
      await queryClient.cancelQueries({ queryKey: ["books"] })
      await queryClient.cancelQueries({ queryKey: ["book", bookId] })

      const prevBooks = queryClient.getQueryData<Book[]>(["books"])
      const prevBook = queryClient.getQueryData<Book>(["book", bookId])

      if (prevBooks) {
        queryClient.setQueryData<Book[]>(
          ["books"],
          prevBooks.map((b) =>
            b.id === bookId ? { ...b, available: true } : b
          )
        )
      }

      if (prevBook) {
        queryClient.setQueryData<Book>(["book", bookId], {
          ...prevBook,
          available: true,
        })
      }

      return { prevBooks, prevBook }
    },
    onError: (_err, bookId, context) => {
      // ❌ rollback kalau gagal
      if (context?.prevBooks) {
        queryClient.setQueryData(["books"], context.prevBooks)
      }
      if (context?.prevBook) {
        queryClient.setQueryData(["book", bookId], context.prevBook)
      }
    },
    onSettled: (_data, _err, bookId) => {
      // 🔄 refetch data agar sinkron
      queryClient.invalidateQueries({ queryKey: ["books"] })
      queryClient.invalidateQueries({ queryKey: ["book", bookId] })
      queryClient.invalidateQueries({ queryKey: ["loans"] }) // optional untuk MyLoans
    },
  })
}
