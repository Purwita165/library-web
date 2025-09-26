// src/features/borrows/api.ts
export interface BorrowResponse {
  id: string;
  bookId: string;
  userId: string;
  status: string;
}

export async function borrowBook(bookId: string): Promise<BorrowResponse> {
  const base = import.meta.env.VITE_API_URL ?? "";
  const token = localStorage.getItem("token");

  const res = await fetch(`${base}/api/borrows`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token ?? ""}`,
    },
    body: JSON.stringify({ bookId }),
  });

  if (!res.ok) {
    let msg = `Borrow failed: ${res.status}`;
    try {
      const body = await res.json();
      if (body?.message) msg = body.message;
    } catch {}
    throw new Error(msg);
  }

  return res.json();
}
