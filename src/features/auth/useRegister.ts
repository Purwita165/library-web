// src/features/auth/useRegister.ts
import { useMutation } from "@tanstack/react-query";
import { registerRequest, RegisterResponse } from "./api";

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

export function useRegister() {
  return useMutation<RegisterResponse, Error, RegisterInput>({
    mutationFn: ({ name, email, password }: RegisterInput) =>
      registerRequest(name, email, password),
  });
}
