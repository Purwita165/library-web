// src/features/loans/mockLoans.ts
import { Loan } from "./types"

export const mockLoans: Loan[] = [
  {
    id: "1",
    title: "Clean Code",
    author: "Robert C. Martin",
    status: "BORROWED",
    dueDate: "2025-10-01",
  },
  {
    id: "2",
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    status: "RETURNED",
    dueDate: "2025-09-15",
  },
  {
    id: "3",
    title: "Refactoring",
    author: "Martin Fowler",
    status: "BORROWED",
    dueDate: "2025-09-20",
  },
]
