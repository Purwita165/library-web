// src/features/books/types.ts
export interface Author {
  id?: number;
  name: string;
  bio?: string;
}

export interface Category {
  id?: number;
  name: string;
}

export interface Book {
  id: number | string;
  title: string;
  author?: string | Author;
  category?: string | Category;  // ✅ string atau object
  coverUrl?: string;
  coverImage?: string;
  available: boolean;
  description?: string;
}
