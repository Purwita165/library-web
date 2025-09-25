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
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      await registerMutation.mutateAsync({ name, email, password })
      toast.success("✅ Register successful. Please login.")

      // ✅ Redirect ke halaman login
      navigate("/login")
    } catch (err: any) {
      toast.error(err?.message ?? "Register failed")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full border rounded p-2 mt-1"
        />
      </div>

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
        disabled={registerMutation.isPending}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        {registerMutation.isPending ? "Processing..." : "Register"}
      </button>
    </form>
  )
}
