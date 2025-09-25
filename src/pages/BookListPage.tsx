import { useState } from "react"
import { useBooksQuery } from "@/features/books/useBooksQuery"
import { BookCard } from "@/features/books/components/BookCard"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Book } from "@/features/books/types"

export default function BookListPage() {
  const { data: books, isLoading, isError } = useBooksQuery()
  const [query, setQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // State: loading & error
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <p className="text-gray-500 animate-pulse">Loading books...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <p className="text-red-500 font-medium">❌ Gagal memuat data buku</p>
      </div>
    )
  }

  if (!books || books.length === 0) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <p className="text-gray-500 italic">Belum ada buku tersedia</p>
      </div>
    )
  }

  // Ambil kategori unik
  const categories = Array.from(new Set(books.map((b) => b.category)))

  // Filter buku
  const filteredBooks = books.filter((book: Book) => {
    const matchesSearch = book.title.toLowerCase().includes(query.toLowerCase())
    const matchesCategory = selectedCategory
      ? book.category === selectedCategory
      : true
    return matchesSearch && matchesCategory
  })

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <h1 className="text-2xl font-bold mb-6 text-primary">📚 Book List</h1>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-2 mb-6">
        <Input
          type="text"
          placeholder="Search by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1"
        />
        <Button onClick={() => setQuery(query)}>Search</Button>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Badge
          onClick={() => setSelectedCategory(null)}
          className={`cursor-pointer px-3 py-1 ${
            selectedCategory === null ? "bg-blue-600 text-white" : ""
          }`}
        >
          All
        </Badge>
        {categories.map((cat) => (
          <Badge
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`cursor-pointer px-3 py-1 ${
              selectedCategory === cat ? "bg-blue-600 text-white" : ""
            }`}
          >
            {cat}
          </Badge>
        ))}
      </div>

      {/* Book list */}
      {filteredBooks.length === 0 ? (
        <p className="text-gray-500 italic text-center">No books found.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  )
}
