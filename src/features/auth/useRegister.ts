import { useMutation } from "@tanstack/react-query"
import { registerRequest } from "./api"

export function useRegister() {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      registerRequest(email, password),
  })
}
