// src/pages/BookListPage.tsx
import { BookCard } from "@/features/books/components/BookCard"
import { useBooksQuery } from "@/features/books/useBooksQuery"
import { Book } from "@/features/books/types"

export default function BookListPage() {
  const { data: books, isLoading, isError, error } = useBooksQuery()

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading books...</p>
  }

  if (isError) {
    return (
      <p className="text-center text-red-500">
        ❌ Error loading books: {error.message}
      </p>
    )
  }

  if (!books || books.length === 0) {
    return <p className="text-center text-gray-500">No books found</p>
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-xl font-bold mb-4 text-center">Books</h1>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {books.map((book: Book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  )
}
