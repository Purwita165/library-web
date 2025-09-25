import { useMutation } from "@tanstack/react-query"
import { login } from "./api"
import { useAppDispatch } from "@/app/hooks"
import { setUser } from "./authSlice"

export function useLogin() {
  const dispatch = useAppDispatch()

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
  console.log("✅ Login sukses:", data)

  localStorage.setItem("token", data.access_token)
  localStorage.setItem("user", JSON.stringify(data.user))

  dispatch(setUser(data.user))
}

  })
}
