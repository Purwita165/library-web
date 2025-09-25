// src/features/books/BookDetailPage.tsx
import { useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { useState } from "react"
import { useBookDetailQuery } from "@/features/books/useBooksQuery"
import { useBorrowBook } from "@/features/books/useBorrowBook"

export default function BookDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: book, isLoading, isError } = useBookDetailQuery(id || "")
  const borrowMutation = useBorrowBook()
  const [localProcessing, setLocalProcessing] = useState(false)

  if (isLoading)
    return <p className="p-6 text-center">Loading book...</p>

  if (isError)
    return (
      <p className="p-6 text-red-500 text-center">
        Failed to load book.
      </p>
    )

  if (!book)
    return <p className="p-6 text-center">Book not found.</p>

  const handleBorrow = async () => {
    if (!book.available) return

    try {
      setLocalProcessing(true)

      // ✅ Optimistic borrow
      await borrowMutation.mutateAsync(book.id)

      toast.success(`📚 You borrowed "${book.title}"`)
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to borrow book")
    } finally {
      setLocalProcessing(false)
    }
  }

  const isMutating = borrowMutation.isPending || localProcessing

  return (
    <div className="container mx-auto px-6 py-8 mt-20">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Cover */}
        <img
          src={book.coverUrl}
          alt={book.title}
          className="w-full h-[400px] object-cover rounded-md shadow"
        />

        {/* Info */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{book.title}</h1>
          <p className="text-gray-600">Author: {book.author}</p>
          <p className="text-gray-600">Category: {book.category}</p>

          <div>
            <Badge
              className={
                book.available
                  ? "bg-green-600 text-white"
                  : "bg-red-600 text-white"
              }
            >
              {book.available ? "Available" : "Not Available"}
            </Badge>
          </div>

          <div className="pt-4">
            <Button
              onClick={handleBorrow}
              disabled={!book.available || isMutating}
              className="w-full md:w-auto"
            >
              {isMutating
                ? "Processing..."
                : book.available
                ? "Borrow Book"
                : "Not Available"}
            </Button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        <p className="text-gray-500 italic">
          No reviews yet. Be the first to add one!
        </p>
      </div>
    </div>
  )
}
