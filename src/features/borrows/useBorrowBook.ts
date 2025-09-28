// src/features/borrows/useBorrowBook.ts
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { borrowBook } from "./api"

export function useBorrowBook() {
  return useMutation({
    mutationFn: async (bookId: number) => {
      const token = localStorage.getItem("token")
      console.log("📦 BorrowBook -> token from localStorage:", token) // DEBUG
      console.log("📦 BorrowBook -> bookId:", bookId) // DEBUG

      return borrowBook(bookId, 7) // default 7 days
    },

    onSuccess: (data) => {
      toast.success("✅ Book borrowed successfully")
      console.log("📦 BorrowBook -> success:", data)
    },

    onError: (err: any) => {
      toast.error(err?.message ?? "Borrow failed")
      console.error("❌ BorrowBook -> error:", err)
    },
  })
}
