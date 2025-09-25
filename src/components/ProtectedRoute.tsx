import { Navigate } from "react-router-dom"
import { ReactNode } from "react"

interface ProtectedRouteProps {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = localStorage.getItem("user")

  if (!user) {
    // kalau belum login → redirect ke /login
    return <Navigate to="/login" replace />
  }

  // kalau sudah login → tampilkan halaman aslinya
  return <>{children}</>
}
