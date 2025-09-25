// src/features/books/BookDetailPage.tsx
import { useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { useState } from "react"
import { useBorrowBook } from "@/features/books/useBorrowBook"
import { useBookDetailQuery } from "@/features/books/useBookDetailQuery"
import { Book } from "@/features/books/types"

// fallback mockBooks (bisa pakai subset dari Home.tsx)
const mockBooks: Book[] = [
  { id: "1", title: "Clean Code", author: "Robert C. Martin", category: "Programming", coverUrl: "/covers/book-1.png", available: true },
  { id: "2", title: "The Pragmatic Programmer", author: "Andrew Hunt", category: "Programming", coverUrl: "/covers/book-2.png", available: true },
  { id: "3", title: "Refactoring", author: "Martin Fowler", category: "Programming", coverUrl: "/covers/book-3.png", available: false },
]

export default function BookDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: book, isError, isPending } = useBookDetailQuery(id || "")
  const borrowMutation = useBorrowBook()

  // fallback → cari dari mockBooks kalau gagal
  const displayBook = !isError && book ? book : mockBooks.find((b) => b.id === id)

  const [localProcessing, setLocalProcessing] = useState(false)

  if (isPending) return <p className="p-6 text-center">Loading book...</p>
  if (!displayBook) return <p className="p-6 text-center">Book not found.</p>

  const handleBorrow = async () => {
    if (!displayBook.available) return
    try {
      setLocalProcessing(true)
      await borrowMutation.mutateAsync(displayBook.id)
      toast.success(`📚 You borrowed "${displayBook.title}"`)
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to borrow book")
    } finally {
      setLocalProcessing(false)
    }
  }

  const isMutating = borrowMutation.isPending || localProcessing

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <img
          src={displayBook.coverUrl}
          alt={displayBook.title}
          className="w-full h-[400px] object-cover rounded-md shadow"
        />

        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{displayBook.title}</h1>
          <p className="text-gray-600">Author: {displayBook.author}</p>
          <p className="text-gray-600">Category: {displayBook.category}</p>
          <div>
            <Badge
              className={
                displayBook.available ? "bg-green-600 text-white" : "bg-red-600 text-white"
              }
            >
              {displayBook.available ? "Available" : "Not Available"}
            </Badge>
          </div>

          <div className="pt-4">
            <Button
              onClick={handleBorrow}
              disabled={!displayBook.available || isMutating}
              className="w-full md:w-auto"
            >
              {isMutating
                ? "Processing..."
                : displayBook.available
                ? "Borrow Book"
                : "Not Available"}
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        <p className="text-gray-500 italic">No reviews yet.</p>
      </div>
    </div>
  )
}
