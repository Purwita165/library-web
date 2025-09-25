// src/features/auth/api.ts
import api from "@/lib/api"

export async function login(email: string, password: string) {
  const res = await api.post("/auth/login", { email, password })
  return res.data // biasanya { token, user }
}

export async function register(email: string, password: string) {
  const res = await api.post("/auth/register", { email, password })
  return res.data
}
