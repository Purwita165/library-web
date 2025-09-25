// src/features/books/services.ts
import { Book } from "./types";

let mockBooks: Book[] = [
  {
    id: "1",
    title: "Book One",
    author: "Author A",
    category: "Fiction",
    coverUrl: "/covers/book-1.png",
    available: true,
  },
  {
    id: "2",
    title: "Book Two",
    author: "Author B",
    category: "Non-Fiction",
    coverUrl: "/covers/book-2.png",
    available: true,
  },
  // ... book-3 .. book-10
];

// simulate fetch
export async function fetchBooks(): Promise<Book[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...mockBooks]), 350);
  });
}

// simulate borrow API
// returns updated book or throws
export async function borrowBook(bookId: string): Promise<Book> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const idx = mockBooks.findIndex((b) => b.id === bookId);
      if (idx === -1) {
        return reject(new Error("Book not found"));
      }
      if (!mockBooks[idx].available) {
        return reject(new Error("Book not available"));
      }

      // update mock data
      mockBooks[idx] = { ...mockBooks[idx], available: false };

      // 10% simulate failure (optional)
      if (Math.random() < 0.1) {
        // rollback then reject to simulate network/server failure
        mockBooks[idx] = { ...mockBooks[idx], available: true };
        return reject(new Error("Network error, try again"));
      }

      return resolve({ ...mockBooks[idx] });
    }, 500);
  });
}
