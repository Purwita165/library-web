// src/features/loans/MyLoans.tsx
import useLoansQuery from "./useLoansQuery";
import LoanSummary from "./LoanSummary";
import type { Loan } from "./types";

export default function MyLoans() {
  const { loans, isLoading, error, refetch } = useLoansQuery();

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">My Loans</h2>

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      {!isLoading && !error && loans.length === 0 && <p>No loans found.</p>}

      {!isLoading && !error && loans.length > 0 && (
        <div className="grid gap-4">
          {loans.map((loan: Loan) => (
            <LoanSummary key={loan.id} loan={loan} />
          ))}
        </div>
      )}
    </div>
  );
}
