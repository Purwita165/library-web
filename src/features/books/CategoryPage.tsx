import { useParams } from "react-router-dom"
import { useBooksQuery } from "@/features/books/useBooksQuery"
import { BookCard } from "@/features/books/components/BookCard"
import { Book } from "@/features/books/types"

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>()
  const { data: books, isLoading, isError } = useBooksQuery()

  if (isLoading) return <p className="p-6 text-center">Loading books...</p>
  if (isError) return <p className="p-6 text-red-500 text-center">Failed to load books.</p>
  if (!books) return <p className="p-6 text-center">No books found.</p>

  const filtered = books.filter(
    (book: Book) => book.category.toLowerCase() === category?.toLowerCase()
  )

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">
        📚 Category: {category}
      </h1>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500 italic">
          No books found in this category.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  )
}
