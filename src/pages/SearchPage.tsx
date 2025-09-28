// src/pages/Search.tsx
import { useState } from "react"
import { BookCard } from "@/features/books/components/BookCard"
import { Book } from "@/features/books/types"

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)
    setError(null)
    try {
      const base = import.meta.env.VITE_API_URL ?? ""
      const token = localStorage.getItem("token")

      const res = await fetch(`${base}/api/books?search=${encodeURIComponent(query)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const body = await res.json()
      console.log("🔍 Search API response:", body)

      if (!res.ok) throw new Error(body?.message ?? `Error ${res.status}`)

      setResults(body?.data?.books ?? [])
    } catch (e) {
      setError((e as Error).message)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-xl font-bold mb-4 text-center">Search Books</h1>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex justify-center gap-2 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, author, or ISBN..."
          className="border rounded px-3 py-2 w-2/3 sm:w-1/2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Error */}
      {error && <p className="text-center text-red-500">❌ {error}</p>}

      {/* Results */}
      {results.length === 0 && !isLoading && !error && (
        <p className="text-center text-gray-500">No books found</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {results.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  )
}
