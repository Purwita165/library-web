import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useBooksQuery } from "@/features/books/useBooksQuery"
import { BookCard } from "@/features/books/components/BookCard"
import { Book } from "@/features/books/types"

export default function SearchPage() {
  const { data: books, isLoading, isError } = useBooksQuery()
  const [query, setQuery] = useState("")

  if (isLoading) return <p className="p-6 text-center">Loading books...</p>
  if (isError) return <p className="p-6 text-center text-red-500">Failed to load books.</p>
  if (!books) return <p className="p-6 text-center">No books found.</p>

  const filteredBooks = books.filter((book: Book) =>
    book.title.toLowerCase().includes(query.toLowerCase()) ||
    book.author.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">Search Books</h1>

      {/* Search bar */}
      <div className="flex items-center mb-8 max-w-lg mx-auto">
        <Input
          type="text"
          placeholder="Search by title or author..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1"
        />
        <Button
          onClick={() => setQuery(query)}
          className="ml-4"
        >
          Search
        </Button>
      </div>

      {/* Hasil */}
      {filteredBooks.length === 0 ? (
        <p className="text-center text-gray-500 italic">No books match your search.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredBooks.map((book: Book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  )
}
