// src/features/auth/useLogin.ts
import { useMutation } from "@tanstack/react-query"
import { login } from "./api"

export function useLogin() {
  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const data = await login(email, password)
      // simpan token
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))
      return data
    },
  })
}
