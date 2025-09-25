// src/components/Navbar.tsx
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { ShoppingCart, Menu, X } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
}

export default function Navbar() {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  const [cartCount, setCartCount] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    // cek user di localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    // cek cart di localStorage
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      setCartCount(JSON.parse(storedCart).length)
    }

    // listener perubahan localStorage
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("user")
      setUser(updatedUser ? JSON.parse(updatedUser) : null)
    }
    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    setUser(null)
    navigate("/login")
    setMenuOpen(false)
  }

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md sticky top-0 z-50">
      {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-bold tracking-wide hover:text-gray-200"
      >
        MyLibrary
      </Link>

      {/* Hamburger (mobile only) */}
      <button
        className="md:hidden focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Menu */}
      <div
        className={`${
          menuOpen
            ? "flex flex-col absolute top-16 left-0 w-full bg-blue-600 shadow-md p-4 space-y-3"
            : "hidden"
        } md:flex md:items-center md:space-x-6 md:static md:w-auto md:p-0 md:space-y-0`}
      >
        <Link to="/" className="hover:text-gray-200" onClick={() => setMenuOpen(false)}>
          Home
        </Link>
        <Link to="/books" className="hover:text-gray-200" onClick={() => setMenuOpen(false)}>
          Books
        </Link>
        <Link to="/search" className="hover:text-gray-200" onClick={() => setMenuOpen(false)}>
          Search
        </Link>

        {!user ? (
          <>
            <Link to="/login" className="hover:text-gray-200" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
            <Link to="/register" className="hover:text-gray-200" onClick={() => setMenuOpen(false)}>
              Register
            </Link>
          </>
        ) : (
          <>
            <span className="italic text-sm">👋 Hi, {user.name || user.email}</span>
            <Link to="/profile" className="hover:text-gray-200" onClick={() => setMenuOpen(false)}>
              Profile
            </Link>
            <Link to="/my-loans" className="hover:text-gray-200" onClick={() => setMenuOpen(false)}>
              My Loans
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}

        {/* Cart */}
        <Link
          to="/cart"
          className="relative flex items-center hover:text-gray-200"
          onClick={() => setMenuOpen(false)}
        >
          <ShoppingCart className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  )
}
