// src/features/books/types.ts
export interface Book {
  id: string
  title: string
  author: string
  category: string
  coverUrl?: string   // ✅ optional supaya aman kalau kosong
  available: boolean
  description?: string
}
