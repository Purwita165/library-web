// src/features/books/types.ts

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  coverUrl?: string; // ✅ opsional karena API bisa saja tidak kirim
  available: boolean;
  description?: string; // ✅ tambahan untuk BookDetail
}
