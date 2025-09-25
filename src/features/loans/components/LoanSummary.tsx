// src/features/loans/components/LoanSummary.tsx
import { Badge } from "@/components/ui/badge"
import dayjs from "dayjs"

export type LoanStatus = "BORROWED" | "RETURNED"

export interface Loan {
  id: string
  title: string
  author: string
  status: LoanStatus
  dueDate: string
}

interface LoanSummaryProps {
  loans: Loan[]
}

export function LoanSummary({ loans }: LoanSummaryProps) {
  const today = dayjs()

  const total = loans.length
  const borrowed = loans.filter((l) => l.status === "BORROWED").length
  const returned = loans.filter((l) => l.status === "RETURNED").length
  const overdue = loans.filter(
    (l) => l.status === "BORROWED" && dayjs(l.dueDate).isBefore(today, "day")
  ).length

  return (
    <div className="flex flex-wrap gap-3 mb-6 text-sm">
      <Badge className="bg-blue-600 text-white">Total: {total}</Badge>
      <Badge className="bg-yellow-500 text-white">Borrowed: {borrowed}</Badge>
      <Badge className="bg-green-600 text-white">Returned: {returned}</Badge>
      <Badge className="bg-red-600 text-white">Overdue: {overdue}</Badge>
    </div>
  )
}
