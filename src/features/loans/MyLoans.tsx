// src/features/loans/MyLoans.tsx
import { useLoansQuery } from "./useLoansQuery"

export default function MyLoans() {
  const { data: loans, isLoading, isError, error } = useLoansQuery()

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading your loans...</p>
  }

  if (isError) {
    return (
      <p className="text-center text-red-500">
        ❌ Error loading loans: {error.message}
      </p>
    )
  }

  if (!loans || loans.length === 0) {
    return <p className="text-center text-gray-500">You have no active loans.</p>
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-xl font-bold mb-4 text-center">My Loans</h1>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loans.map((loan) => (
          <div
            key={loan.id}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            <img
              src={loan.book.coverUrl || "/covers/placeholder.png"}
              alt={loan.book.title}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h3 className="text-sm font-semibold">{loan.book.title}</h3>
            <p className="text-xs text-gray-600">{loan.book.author}</p>
            <p
              className={`text-xs font-medium mt-1 ${
                loan.status === "BORROWED"
                  ? "text-yellow-600"
                  : loan.status === "RETURNED"
                  ? "text-green-600"
                  : "text-gray-500"
              }`}
            >
              {loan.status}
            </p>
            {loan.dueDate && (
              <p className="text-xs text-gray-500">Due: {loan.dueDate}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
