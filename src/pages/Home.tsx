// src/pages/Home.tsx
import { CategoryCard } from "@/features/books/components/CategoryCard"
import { BookCard } from "@/features/books/components/BookCard"
import { AuthorCard } from "@/features/authors/components/AuthorCard"
import { Book } from "@/features/books/types"
import { useBooksQuery } from "@/features/books/useBooksQuery"

// ✅ Mock categories
const categories = [
  { name: "Programming", icon: "💻" },
  { name: "Design", icon: "🎨" },
  { name: "Business", icon: "💼" },
  { name: "Science", icon: "🔬" },
  { name: "Fiction", icon: "📖" },
  { name: "History", icon: "🏛️" },
]

// ✅ Mock fallback books
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

// ✅ Mock authors
const authors = [
  { name: "Robert C. Martin", photo: "https://i.pravatar.cc/80?img=1" },
  { name: "Andrew Hunt", photo: "https://i.pravatar.cc/80?img=2" },
  { name: "Martin Fowler", photo: "https://i.pravatar.cc/80?img=3" },
  { name: "Erich Gamma", photo: "https://i.pravatar.cc/80?img=4" },
  { name: "James Clear", photo: "https://i.pravatar.cc/80?img=5" },
  { name: "Yuval Noah Harari", photo: "https://i.pravatar.cc/80?img=6" },
  { name: "Eric Ries", photo: "https://i.pravatar.cc/80?img=7" },
  { name: "Daniel Kahneman", photo: "https://i.pravatar.cc/80?img=8" },
  { name: "Harper Lee", photo: "https://i.pravatar.cc/80?img=9" },
  { name: "Alexander Osterwalder", photo: "https://i.pravatar.cc/80?img=10" },
]

export default function Home() {
  const { data: books, isError } = useBooksQuery()
  const displayBooks = !isError && books && books.length > 0 ? books : mockBooks

  return (
    <div className="flex flex-col">
      {/* Hero Section - lebih rapat */}
      <section className="bg-blue-50 py-4">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-700">
            Welcome to <span className="text-blue-500">MyLibrary</span>
          </h1>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-4">
        <h2 className="text-sm font-medium mb-2 text-gray-700 text-center">
          Categories
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.name}
              label={cat.name}
              icon={cat.icon}
              color="bg-gray-100"
            />
          ))}
        </div>
      </section>

      {/* Recommended Books */}
      <section className="container mx-auto px-4 py-4">
        <h2 className="text-sm font-medium mb-2 text-gray-700 text-center">
          Recommended Books
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {displayBooks.slice(0, 10).map((book: Book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* Popular Authors */}
      <section className="container mx-auto px-4 py-4">
        <h2 className="text-sm font-medium mb-2 text-center text-gray-700">
          Popular Authors
        </h2>
        <div className="grid gap-2 grid-cols-5 sm:grid-cols-5 md:grid-cols-5">
          {authors.map((author) => (
            <AuthorCard
              key={author.name}
              name={author.name}
              photo={author.photo}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
