// src/pages/Home.tsx
import { CategoryCard } from "@/features/books/components/CategoryCard"
import { BookCard } from "@/features/books/components/BookCard"
import { AuthorCard } from "@/features/authors/components/AuthorCard"
import { useBooksQuery } from "@/features/books/useBooksQuery"
import { Book } from "@/features/books/types"

// ✅ Mock categories
const categories = [
  { name: "Programming", icon: "💻" },
  { name: "Design", icon: "🎨" },
  { name: "Business", icon: "💼" },
  { name: "Science", icon: "🔬" },
  { name: "Fiction", icon: "📖" },
  { name: "History", icon: "🏛️" },
]

// ✅ Mock authors (10, kecil)
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
  const { data: books, isLoading, isError } = useBooksQuery()

  return (
    <div className="flex flex-col">
      {/* Hero Section - diperkecil */}
      <section className="bg-secondary py-4 text-center">
        <div className="container mx-auto px-4 space-y-1">
          <h1 className="text-xl md:text-2xl font-bold text-primary">
            Welcome to MyLibrary
          </h1>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-2">
        <div className="grid gap-2 grid-cols-3 sm:grid-cols-6 md:grid-cols-6">
          {categories.map((c) => (
            <CategoryCard key={c.name} category={c.name} icon={c.icon} />
          ))}
        </div>
      </section>

      {/* Recommended Books */}
      <section className="container mx-auto px-4 py-2">
        {isLoading && <p className="text-center text-gray-500">Loading books...</p>}
        {isError && <p className="text-center text-red-500">Gagal memuat buku</p>}
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {books?.slice(0, 10).map((book: Book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* Popular Authors */}
      <section className="container mx-auto px-4 py-2">
        <h2 className="text-xs font-medium mb-2 text-center text-gray-700">
          Popular Authors
        </h2>
        <div className="grid gap-2 grid-cols-5 sm:grid-cols-5 md:grid-cols-5">
          {authors.map((author) => (
            <AuthorCard key={author.name} name={author.name} photo={author.photo} />
          ))}
        </div>
      </section>
    </div>
  )
}
