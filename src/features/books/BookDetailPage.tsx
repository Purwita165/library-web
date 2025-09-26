import { useParams } from "react-router-dom";
import { useBookDetailQuery } from "@/features/books/useBookDetailQuery";
import { useBorrowBook } from "@/features/borrows/useBorrowBook";
import { toast } from "sonner";

export default function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: book, isLoading, isError, error } = useBookDetailQuery(id ?? "");
  const borrowMutation = useBorrowBook();

  if (isLoading) return <p className="text-center text-gray-500">Loading book...</p>;
  if (isError) return <p className="text-center text-red-500">Error: {error.message}</p>;
  if (!book) return <p className="text-center text-gray-500">Book not found</p>;

  const handleBorrow = async () => {
    try {
      if (!book.id) return;
      await borrowMutation.mutateAsync(book.id);
      toast.success("📚 Book borrowed successfully!");
    } catch (err: any) {
      toast.error(err?.message ?? "Borrow failed");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative">
          <img
            src={book.coverUrl || "/covers/placeholder.png"}
            alt={book.title}
            className="w-48 h-64 object-cover rounded shadow"
          />
          <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
            {book.category}
          </span>
          <span
            className={`absolute top-2 right-2 text-xs px-2 py-1 rounded ${
              book.available ? "bg-green-600" : "bg-red-600"
            } text-white`}
          >
            {book.available ? "Available" : "Borrowed"}
          </span>
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
          <p className="text-sm text-gray-600 mb-1">Author: {book.author}</p>
          <p className="text-sm text-gray-500 mb-3">Category: {book.category}</p>
          {book.description && (
            <p className="text-sm text-gray-700 mb-3">{book.description}</p>
          )}

          {book.available && (
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
              onClick={handleBorrow}
              disabled={borrowMutation.isPending}
            >
              {borrowMutation.isPending ? "Processing..." : "Borrow this book"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
