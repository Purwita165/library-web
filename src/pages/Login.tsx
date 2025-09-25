// src/pages/Login.tsx
import { useState } from "react"
import { useLogin } from "@/features/auth/useLogin"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

export default function LoginPage() {
  const loginMutation = useLogin()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await loginMutation.mutateAsync({ email, password })

      // ✅ Simpan token & user ke localStorage
      if (res?.token) {
        localStorage.setItem("token", res.token)
      }
      if (res?.user) {
        localStorage.setItem("user", JSON.stringify(res.user))
      }

      toast.success("Login successful 🎉")
      navigate("/") // ✅ redirect ke Home
    } catch (err: any) {
      toast.error(err?.message ?? "Login failed")
    }
  }

  return (
    <div className="container mx-auto max-w-md px-6 py-12">
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  )
}
