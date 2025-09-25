import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { ShoppingCart } from "lucide-react"

export default function Navbar() {
  const navigate = useNavigate()
  const [user, setUser] = useState<any>(null)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    // Ambil user dari localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        console.error("❌ Gagal parse user dari localStorage", e)
      }
    }

    // Ambil cart dari localStorage
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      try {
        setCartCount(JSON.parse(storedCart).length)
      } catch (e) {
        console.error("❌ Gagal parse cart dari localStorage", e)
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    setUser(null)
    navigate("/login")
  }

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md fixed top-0 left-0 w-full z-50">
      {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-bold tracking-wide hover:text-gray-200"
      >
        MyLibrary
      </Link>

      {/* Menu */}
      <div className="space-x-6 flex items-center">
        <Link to="/" className="hover:text-gray-200">
          Home
        </Link>
        <Link to="/books" className="hover:text-gray-200">
          Books
        </Link>
        <Link to="/search" className="hover:text-gray-200">
          Search
        </Link>

        {!user ? (
          <>
            <Link to="/login" className="hover:text-gray-200">
              Login
            </Link>
            <Link to="/register" className="hover:text-gray-200">
              Register
            </Link>
            {/* Debug kalau belum login */}
            <span className="text-xs italic text-red-300">Belum login</span>
          </>
        ) : (
          <>
            {/* Debug: tampilkan user info */}
            <span className="text-xs italic">
              {user.email} ({user.role})
            </span>
            <Link to="/profile" className="hover:text-gray-200">
              Profile
            </Link>
            <Link to="/my-loans" className="hover:text-gray-200">
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
