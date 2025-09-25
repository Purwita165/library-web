// src/pages/BookListPage.tsx
import { useState } from "react"
import { useBooksQuery } from "@/features/books/useBooksQuery"
import { BookCard } from "@/features/books/components/BookCard"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Book } from "@/features/books/types"

// Mock fallback data (10 buku)
const mockBooks: Book[] = [
  { id: "1", title: "Clean Code", author: "Robert C. Martin", category: "Programming", coverUrl: "/covers/book-1.png", available: true },
  { id: "2", title: "The Pragmatic Programmer", author: "Andrew Hunt", category: "Programming", coverUrl: "/covers/book-2.png", available: true },
  { id: "3", title: "Refactoring", author: "Martin Fowler", category: "Programming", coverUrl: "/covers/book-3.png", available: false },
  { id: "4", title: "Design Patterns", author: "Erich Gamma", category: "Programming", coverUrl: "/covers/book-4.png", available: true },
  { id: "5", title: "Business Model Generation", author: "Alexander Osterwalder", category: "Business", coverUrl: "/covers/book-5.png", available: true },
  { id: "6", title: "Atomic Habits", author: "James Clear", category: "Science", coverUrl: "/covers/book-6.png", available: true },
  { id: "7", title: "Sapiens", author: "Yuval Noah Harari", category: "History", coverUrl: "/covers/book-7.png", available: true },
  { id: "8", title: "The Lean Startup", author: "Eric Ries", category: "Business", coverUrl: "/covers/book-8.png", available: false },
  { id: "9", title: "Thinking, Fast and Slow", author: "Daniel Kahneman", category: "Science", coverUrl: "/covers/book-9.png", available: true },
  { id: "10", title: "To Kill a Mockingbird", author: "Harper Lee", category: "Fiction", coverUrl: "/covers/book-10.png", available: true },
]

export default function BookListPage() {
  const { data: books, isPending, isError } = useBooksQuery()
  const [query, setQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Gunakan API books kalau ada, fallback ke mockBooks kalau error
  const allBooks = !isError && books ? books : mockBooks

  // Ambil kategori unik
  const categories = Array.from(new Set(allBooks.map((b) => b.category)))

  // Filter buku
  const filteredBooks = allBooks.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(query.toLowerCase())
    const matchesCategory = selectedCategory
      ? book.category === selectedCategory
      : true
    return matchesSearch && matchesCategory
  })

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">📚 Book List</h1>

      {/* Search */}
      <div className="flex gap-2 mb-4">
        <Input
          type="text"
          placeholder="Search by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={() => setQuery(query)}>Search</Button>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Badge
          onClick={() => setSelectedCategory(null)}
          className={`cursor-pointer ${
            selectedCategory === null ? "bg-blue-600 text-white" : ""
          }`}
        >
          All
        </Badge>
        {categories.map((cat) => (
          <Badge
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`cursor-pointer ${
              selectedCategory === cat ? "bg-blue-600 text-white" : ""
            }`}
          >
            {cat}
          </Badge>
        ))}
      </div>

      {/* Book list */}
      {isPending ? (
        <p className="text-gray-500 italic">Loading books...</p>
      ) : filteredBooks.length === 0 ? (
        <p className="text-gray-500 italic">No books found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  )
}
