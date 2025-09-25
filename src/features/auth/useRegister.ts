// src/features/auth/useRegister.ts
import { useMutation } from "@tanstack/react-query"
import api from "@/lib/api"

interface RegisterPayload {
  name: string
  email: string
  password: string
}

export function useRegister() {
  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const res = await api.post("/auth/register", payload)
      return res.data
    },
  })
}
