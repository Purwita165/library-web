// src/features/auth/components/RegisterForm.tsx
import { useNavigate } from "react-router-dom"
import { useRegister } from "@/features/auth/useRegister"
import { toast } from "sonner"

export function RegisterForm() {
  const navigate = useNavigate()
  const registerMutation = useRegister()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = String(formData.get("name") ?? "")
    const email = String(formData.get("email") ?? "")
    const password = String(formData.get("password") ?? "")

    try {
      await registerMutation.mutateAsync({ name, email, password })
      toast.success("✅ Register successful. Please login.")
      navigate("/login")
    } catch (err: any) {
      toast.error(err?.message ?? "Register failed")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      {/* ... form fields tetap sama ... */}
    </form>
  )
}
