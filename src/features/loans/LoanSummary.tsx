// src/features/loans/LoanSummary.tsx
import React from "react";
import type { Loan } from "./types";

interface Props {
  loan: Loan;
  onReturn?: (id: string) => void; // contoh callback opsional
}

export default function LoanSummary({ loan, onReturn }: Props) {
  const isOverdue = loan.status === "overdue";

  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-800">{loan.title}</h3>
          <p className="text-sm text-gray-600">Borrower: {loan.borrower}</p>
          {loan.borrowedAt && (
            <p className="text-xs text-gray-500">Borrowed: {loan.borrowedAt}</p>
          )}
          {loan.dueDate && (
            <p className="text-xs text-gray-500">Due: {loan.dueDate}</p>
          )}
        </div>

        <div className="text-right">
          <span
            className={`inline-block px-2 py-1 rounded text-xs font-medium ${
              isOverdue ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
            }`}
          >
            {loan.status}
          </span>

          {onReturn && (
            <div className="mt-3">
              <button
                onClick={() => onReturn(loan.id)}
                className="text-xs px-3 py-1 border rounded bg-white hover:bg-gray-50"
              >
                Return
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
