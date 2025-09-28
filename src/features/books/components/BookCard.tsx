// src/features/books/components/BookCard.tsx
import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Book } from "../types"

interface Props {
  book: Book
}

export function BookCard({ book }: Props) {
  return (
    <Link to={`/books/${book.id}`} className="block">
      <Card className="overflow-hidden shadow-sm hover:shadow-md transition rounded-lg">
        {/* Cover */}
        <div className="relative">
          <img
            src={book.coverUrl || "/covers/placeholder.png"} // ✅ fallback
            alt={book.title}
            className="w-full h-40 object-cover bg-gray-100"
          />

          {/* Badge kategori */}
          {book.category && (
            <Badge className="absolute top-2 left-2 bg-blue-600 text-white text-xs">
              {book.category}
            </Badge>
          )}

          {/* Badge status */}
          <Badge
            className={`absolute top-2 right-2 text-xs ${
              book.available ? "bg-green-600" : "bg-red-600"
            } text-white`}
          >
            {book.available ? "Available" : "Borrowed"}
          </Badge>
        </div>

        {/* Konten */}
        <CardContent className="p-3 space-y-1">
          <h3 className="text-sm font-semibold line-clamp-1">{book.title}</h3>
          <p className="text-xs text-gray-600 line-clamp-1">
            {book.author || "Unknown Author"}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
