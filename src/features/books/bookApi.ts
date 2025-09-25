// src/features/books/bookApi.ts
import { Book } from "./types";

// Mock data buku
const mockBooks: Book[] = [
  {
    id: "1",
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Programming",
    coverUrl: "https://picsum.photos/200/300?random=1",
    available: true,
  },
  {
    id: "2",
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    category: "Programming",
    coverUrl: "https://picsum.photos/200/300?random=2",
    available: false,
  },
  {
    id: "3",
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self-Development",
    coverUrl: "https://picsum.photos/200/300?random=3",
    available: true,
  },
];

// Simulasi fetch API
export const fetchBooks = async (): Promise<Book[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockBooks);
    }, 800); // simulasi delay network
  });
};
