// src/features/auth/components/LoginForm.tsx
import { useNavigate } from "react-router-dom"
import { useLogin } from "@/features/auth/useLogin"
import { toast } from "sonner"

export function LoginForm() {
  const navigate = useNavigate()
  const loginMutation = useLogin()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      await loginMutation.mutateAsync({ email, password })
      toast.success("✅ Login successful")

      // ✅ redirect ke Home & refresh supaya Navbar baca ulang localStorage
      navigate("/")
      window.location.reload()
    } catch (err: any) {
      toast.error(err?.message ?? "Login failed")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full border rounded p-2 mt-1"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="w-full border rounded p-2 mt-1"
        />
      </div>

      <button
        type="submit"
        disabled={loginMutation.isPending}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {loginMutation.isPending ? "Processing..." : "Login"}
      </button>
    </form>
  )
}
