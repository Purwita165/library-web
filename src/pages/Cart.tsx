// src/pages/Cart.tsx
import useLoansQuery from "@/features/loans/useLoansQuery"
import { useReturnBook } from "@/features/borrows/useReturnBooks"

export default function Cart() {
  const { loans, isLoading, error, refetch } = useLoansQuery()
  const returnMutation = useReturnBook()

  const activeLoans = loans.filter((loan) => loan.status === "active")

  const handleReturn = async (loanId: number) => {
    try {
      await returnMutation.mutateAsync(loanId)
      refetch() // refresh daftar loans setelah return
    } catch (err) {
      console.error("❌ Error returning from Cart:", err)
    }
  }

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading your cart...</p>
  }

  if (error) {
    return <p className="text-center text-red-500">❌ {error}</p>
  }

  if (activeLoans.length === 0) {
    return <p className="text-center text-gray-500">Your cart is empty</p>
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-xl font-bold mb-4 text-center">My Cart</h1>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {activeLoans.map((loan) => (
          <div
            key={loan.id}
            className="border rounded-lg shadow-sm p-4 flex flex-col bg-white"
          >
            {/* Cover */}
            {loan.book?.coverImage && (
              <img
                src={loan.book.coverImage}
                alt={loan.book.title}
                className="w-full h-40 object-cover rounded mb-3"
              />
            )}

            {/* Book info */}
            <h2 className="text-sm font-semibold">{loan.book?.title ?? "Unknown Book"}</h2>
            <p className="text-xs text-gray-600">
              {loan.book?.author?.name ?? "Unknown Author"}
            </p>

            {/* Due date */}
            <p className="text-xs text-gray-500 mt-2">
              Due: {loan.dueAt ? new Date(loan.dueAt).toLocaleDateString() : "-"}
            </p>

            {/* Return button */}
            <button
              onClick={() => handleReturn(loan.id)}
              disabled={returnMutation.isPending}
              className="mt-3 bg-red-600 text-white text-xs py-1 px-2 rounded hover:bg-red-700 disabled:opacity-50"
            >
              {returnMutation.isPending ? "Returning..." : "Return"}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
