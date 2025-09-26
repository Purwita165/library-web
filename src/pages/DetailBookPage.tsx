import { useParams } from "react-router-dom";
import { useBookDetailQuery } from "@/features/books/useBookDetailQuery";

export default function DetailBookPage() {
  const { id } = useParams<{ id: string }>();
  const { data: book, isLoading, isError, error } = useBookDetailQuery(id ?? "");

  if (isLoading) return <p className="text-center text-gray-500">Loading book...</p>;
  if (isError) return <p className="text-center text-red-500">Error: {error.message}</p>;
  if (!book) return <p className="text-center text-gray-500">Book not found</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={book.coverUrl || "/covers/placeholder.png"}
          alt={book.title}
          className="w-48 h-64 object-cover rounded shadow"
        />
        <div>
          <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
          <p className="text-sm text-gray-600 mb-1">Author: {book.author}</p>
          <p className="text-sm text-gray-500 mb-3">Category: {book.category}</p>
          {book.description && (
            <p className="text-sm text-gray-700 mb-3">{book.description}</p>
          )}
          <p
            className={`text-sm font-medium ${
              book.available ? "text-green-600" : "text-red-500"
            }`}
          >
            {book.available ? "Available" : "Not available"}
          </p>
        </div>
      </div>
    </div>
  );
}
