// src/pages/MyLoans.tsx
import { useLoansQuery } from "@/features/loans/useLoansQuery"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import LoanSummary from "@/features/loans/LoanSummary"
import { mockLoans } from "@/features/loans/mockLoans"
import dayjs from "dayjs"

export default function MyLoans() {
  const { data: loans, isPending, isError } = useLoansQuery()

  // fallback ke mock loans
  const safeLoans = loans && loans.length > 0 ? loans : mockLoans

  if (isPending) return <p className="p-6">Loading loans...</p>
  if (isError) return <p className="p-6 text-red-500">Failed to load loans. Showing mock data.</p>

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold">📖 My Loans</h1>

      {/* 🔹 Summary */}
      <LoanSummary loans={safeLoans} />

      {/* 🔹 Loan Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Due Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {safeLoans.map((loan) => {
            const isLate =
              loan.status === "BORROWED" && dayjs(loan.dueDate).isBefore(dayjs())

            return (
              <TableRow key={loan.id}>
                <TableCell>{loan.title}</TableCell>
                <TableCell>{loan.author}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      loan.status === "BORROWED"
                        ? "bg-blue-600 text-white"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {loan.status}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`${
                      isLate ? "text-red-600 font-semibold" : "text-gray-700"
                    }`}
                  >
                    {dayjs(loan.dueDate).format("MMM D, YYYY")}
                  </span>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
