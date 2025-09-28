// src/features/books/components/BookCard.tsx
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book } from "../types";
import { useBorrowBook } from "@/features/borrows/useBorrowBook";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Props {
  book: Book;
}

export function BookCard({ book }: Props) {
  const borrowMutation = useBorrowBook();

  const handleBorrow = async () => {
    try {
      await borrowMutation.mutateAsync(Number(book.id)); // ✅ number sekarang valid
      toast.success(`✅ You borrowed "${book.title}"`);
    } catch (err: any) {
      toast.error(err?.message ?? "Borrow failed");
    }
  };

  const cover =
    (book as any).coverUrl || (book as any).coverImage || "/covers/placeholder.png";

  const categoryLabel =
    typeof book.category === "string"
      ? book.category
      : book.category?.name ?? "Uncategorized";

  const authorLabel =
    typeof book.author === "string"
      ? book.author
      : book.author?.name ?? "Unknown Author";

  return (
    <Link to={`/books/${book.id}`} className="block">
      <Card className="overflow-hidden shadow-sm hover:shadow-md transition rounded-lg">
        <div className="relative">
          <img
            src={cover}
            alt={book.title ?? "Untitled"}
            className="w-full h-40 object-cover bg-gray-100"
          />

          {categoryLabel && (
            <Badge className="absolute top-2 left-2 bg-blue-600 text-white text-xs">
              {categoryLabel}
            </Badge>
          )}

          <Badge
            className={`absolute top-2 right-2 text-xs ${
              book.available ? "bg-green-600" : "bg-red-600"
            } text-white`}
          >
            {book.available ? "Available" : "Borrowed"}
          </Badge>
        </div>

        <CardContent className="p-3 space-y-1">
          <h3 className="text-sm font-semibold line-clamp-1">{book.title}</h3>
          <p className="text-xs text-gray-600 line-clamp-1">{authorLabel}</p>

          {book.available && (
            <Button
              size="sm"
              className="mt-2 w-full bg-blue-600 hover:bg-blue-700"
              onClick={(e) => {
                e.preventDefault();
                handleBorrow();
              }}
              disabled={borrowMutation.isPending}
            >
              {borrowMutation.isPending ? "Borrowing..." : "Borrow"}
            </Button>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
