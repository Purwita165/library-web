// src/features/loans/types.ts
export type LoanStatus = "active" | "returned" | "overdue" | "pending";

export interface Loan {
  id: string;
  title: string;
  author: string
  borrower: string;
  borrowedAt?: string; // ISO date string (opsional)
  dueDate?: string;    // ISO date string (opsional)
  status: LoanStatus;

  // tambahkan field lain sesuai API nanti (mis. amount, barcode, dsb.)
}
