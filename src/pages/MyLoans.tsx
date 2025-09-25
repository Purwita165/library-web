import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import dayjs from "dayjs"
import { LoanSummary, Loan } from "@/features/loans/components/LoanSummary"

// Mock data loans ✅ pakai tipe Loan
const mockLoans: Loan[] = [
  {
    id: "1",
    title: "Clean Code",
    author: "Robert C. Martin",
    status: "BORROWED",
    dueDate: "2025-09-20",
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
    dueDate: "2025-10-05",
  },
]

export default function MyLoans() {
  const today = dayjs()

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">📖 My Loans</h1>
        <p className="text-gray-600 text-sm mt-1">
          Track your borrowed and returned books easily.
        </p>
      </div>

      {/* ✅ pakai LoanSummary */}
      <LoanSummary loans={mockLoans} />

      {/* Loan table */}
      <div className="overflow-hidden rounded-md border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-100">
              <TableHead className="w-[35%]">Title</TableHead>
              <TableHead className="w-[25%]">Author</TableHead>
              <TableHead className="w-[15%]">Status</TableHead>
              <TableHead className="w-[15%]">Due Date</TableHead>
              <TableHead className="w-[10%] text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockLoans.map((loan, idx) => {
              const isOverdue =
                loan.status === "BORROWED" &&
                dayjs(loan.dueDate).isBefore(today, "day")

              return (
                <TableRow
                  key={loan.id}
                  className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"}
                >
                  <TableCell className="font-medium">{loan.title}</TableCell>
                  <TableCell>{loan.author}</TableCell>
                  <TableCell>
                    {isOverdue ? (
                      <Badge className="bg-red-600 text-white">OVERDUE</Badge>
                    ) : loan.status === "BORROWED" ? (
                      <Badge className="bg-yellow-500 text-white">
                        BORROWED
                      </Badge>
                    ) : (
                      <Badge className="bg-green-600 text-white">
                        RETURNED
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {dayjs(loan.dueDate).format("MMM D, YYYY")}
                  </TableCell>
                  <TableCell className="text-right">
                    {loan.status === "BORROWED" && (
                      <Button size="sm" variant="outline">
                        Return
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
