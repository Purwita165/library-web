// src/features/auth/useLogin.ts
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export interface LoginResponse {
  token?: string
  accessToken?: string
  data?: {
    token?: string
    accessToken?: string
    user?: {
      id: number | string
      name?: string
      email: string
      role?: string
    }
  }
  user?: {
    id: number | string
    name?: string
    email: string
    role?: string
  }
}

async function loginRequest(email: string, password: string): Promise<LoginResponse> {
  const base = import.meta.env.VITE_API_URL ?? ""
  const res = await fetch(`${base}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })

  // ⬇️ Debug log supaya kita lihat struktur asli dari backend
  const body = await res.json()
  console.log("🔑 Login API response:", body)

  if (!res.ok) {
    let msg = `Login failed: ${res.status}`
    if (body?.message) msg = body.message
    throw new Error(msg)
  }

  return body
}

export function useLogin() {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginRequest(email, password),

    onSuccess: (data) => {
      // cari token di beberapa kemungkinan tempat
      const token =
        data?.token ||
        data?.accessToken ||
        data?.data?.token ||
        data?.data?.accessToken

      if (token) {
        localStorage.setItem("token", token)
        console.log("✅ Token saved:", token)
      } else {
        console.warn("⚠️ No token found in response:", data)
      }

      const user = data?.user || data?.data?.user
      if (user) {
        localStorage.setItem("user", JSON.stringify(user))
        console.log("✅ User saved:", user)
      }

      toast.success("✅ Login successful")
    },

    onError: (err: any) => {
      toast.error(err?.message ?? "Login failed")
      console.error("❌ Login error:", err)
    },
  })
}
