import { api } from "@/lib/api"

interface LoginPayload {
  email: string
  password: string
}

interface LoginResponse {
  access_token: string
  user: {
    id: string
    email: string
    role: string
  }
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const res = await api.post("/auth/login", payload)
  return res.data
}
