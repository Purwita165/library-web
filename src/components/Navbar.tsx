// src/components/Navbar.tsx
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

interface User {
  id: string | number
  email: string
  name?: string
  role?: string
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const navigate = useNavigate()

  // ✅ cek localStorage sekali waktu mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        setUser(null)
      }
    }
  }, [])

  // ✅ logout function
  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
    navigate("/login")
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          MyLibrary
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 font-medium items-center">
          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/books" className="hover:text-gray-200">Books</Link>
          <Link to="/search" className="hover:text-gray-200">Search</Link>
          <Link to="/myloans" className="hover:text-gray-200">My Loans</Link>
          <Link to="/cart" className="hover:text-gray-200">Cart</Link>
          {user ? (
            <>
              <Link to="/profile" className="hover:text-gray-200">
                {user.name ?? user.email}
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-gray-200 border px-2 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-200">Login</Link>
              <Link to="/register" className="hover:text-gray-200">Register</Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-700 px-6 py-4 space-y-3">
          <Link to="/" className="block hover:text-gray-200">Home</Link>
          <Link to="/books" className="block hover:text-gray-200">Books</Link>
          <Link to="/search" className="block hover:text-gray-200">Search</Link>
          <Link to="/myloans" className="block hover:text-gray-200">My Loans</Link>
          <Link to="/cart" className="block hover:text-gray-200">Cart</Link>
          {user ? (
            <>
              <Link to="/profile" className="block hover:text-gray-200">
                {user.name ?? user.email}
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left hover:text-gray-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block hover:text-gray-200">Login</Link>
              <Link to="/register" className="block hover:text-gray-200">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
