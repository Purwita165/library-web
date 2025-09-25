// src/features/loans/useLoansQuery.ts
import { useCallback, useEffect, useState } from "react";
import type { Loan } from "./types";

export default function useLoansQuery() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLoans = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // MOCK: ganti dengan API call sesungguhnya nanti
      await new Promise((r) => setTimeout(r, 400));
      const mock: Loan[] = [
        {
          id: "L-001",
          title: "The Great Adventure",
          author: "John Smith",
          borrower: "Alice",
          borrowedAt: "2025-09-01",
          dueDate: "2025-09-21",
          status: "active",
        },
        {
          id: "L-002",
          title: "World History 101",
          author: "John Lock",
          borrower: "Bob",
          borrowedAt: "2025-08-10",
          dueDate: "2025-09-10",
          status: "overdue",
        },
      ];
      setLoans(mock);
    } catch (e) {
      setError((e as Error).message ?? String(e));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLoans();
  }, [fetchLoans]);

  return { loans, isLoading, error, refetch: fetchLoans };
}
