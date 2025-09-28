// src/features/borrows/useReturnBook.ts
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

async function returnBook(loanId: number) {
  const base = import.meta.env.VITE_API_URL ?? ""
  const token = localStorage.getItem("token")

  console.log("📦 Returning loan:", loanId, "with token:", token) // DEBUG

  const res = await fetch(`${base}/api/loans/${loanId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    let msg = `Return failed: ${res.status}`
    try {
      const body = await res.json()
      if (body?.message) msg = body.message
    } catch {}
    throw new Error(msg)
  }

  return res.json()
}

export function useReturnBook() {
  return useMutation({
    mutationFn: (loanId: number) => returnBook(loanId),

    onSuccess: () => {
      toast.success("✅ Book returned successfully")
    },

    onError: (err: any) => {
      toast.error(err?.message ?? "Return failed")
      console.error("❌ ReturnBook -> error:", err)
    },
  })
}
