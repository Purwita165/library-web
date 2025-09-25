import { BrowserRouter, Routes, Route } from "react-router-dom"

// Pages
import Home from "@/pages/Home"
import LoginPage from "@/pages/Login"
import RegisterPage from "@/pages/Register"
import SearchPage from "@/pages/SearchPage"
import ProfilePage from "@/pages/Profile"
import MyLoansPage from "@/pages/MyLoans"
import BookListPage from "@/pages/BookListPage"
import CartPage from "@/pages/Cart"

// Features
import BookDetailPage from "@/features/books/BookDetailPage"
import CategoryPage from "@/features/books/CategoryPage"

// Layout
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { ProtectedRoute } from "@/components/ProtectedRoute"

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        {/* Konten utama diberi padding biar nggak ketiban Navbar & Footer */}
        <main className="flex-1 pt-20 pb-40">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/books" element={<BookListPage />} />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              }
            />

            {/* Book related routes */}
            <Route path="/books/:id" element={<BookDetailPage />} />
            <Route path="/categories/:category" element={<CategoryPage />} />

            {/* Protected routes */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-loans"
              element={
                <ProtectedRoute>
                  <MyLoansPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
