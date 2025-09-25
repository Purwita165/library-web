// src/features/loans/mockLoans.ts
import type { Loan } from "./types"

export const mockLoans: Loan[] = [
  {
    id: "1",
    title: "Clean Code",
    author: "Robert C. Martin",
    borrower: "Wildan",
    status: "active",
    dueDate: "2025-10-01",
  },
  {
    id: "2",
    title: "The Pragmatic Programmer",
    borrower: "Sugiono",
    author: "Andrew Hunt",
    status: "returned",
    dueDate: "2025-09-15",
  },
  {
    id: "3",
    title: "Refactoring",
    author: "Martin Fowler",
    borrower: "Nancy",
    status: "active",
    dueDate: "2025-09-20",
  },
]
