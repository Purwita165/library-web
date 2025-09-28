// src/features/borrows/api.ts
export interface BorrowResponse {
  id: string;
  bookId: string;
  userId: string;
  status: string;
}

// src/features/borrows/api.ts
export async function borrowBook(bookId: number, days: number = 7): Promise<BorrowResponse> {
  const base = import.meta.env.VITE_API_URL ?? ""
  const token = localStorage.getItem("token")

  const res = await fetch(`${base}/api/loans`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,   // ✅ wajib "Bearer "
    },
    body: JSON.stringify({ bookId, days }),
  })

  if (!res.ok) {
    let msg = `Borrow failed: ${res.status}`
    try {
      const body = await res.json()
      if (body?.message) msg = body.message
    } catch {}
    throw new Error(msg)
  }

  return res.json()
}