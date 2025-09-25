import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Book } from "@/features/books/types"

export default function CartPage() {
  const [cart, setCart] = useState<Book[]>([])

  useEffect(() => {
    // ✅ Ambil dari localStorage (sementara, sebelum Redux)
    const stored = localStorage.getItem("cart")
    if (stored) {
      setCart(JSON.parse(stored))
    }
  }, [])

  const handleRemove = (id: string) => {
    const updated = cart.filter((book) => book.id !== id)
    setCart(updated)
    localStorage.setItem("cart", JSON.stringify(updated))
  }

  const handleCheckout = () => {
    alert("Checkout feature coming soon!")
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">🛒 My Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500 italic">
          Your cart is empty.
        </p>
      ) : (
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Selected Books</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cart.map((book) => (
                <div
                  key={book.id}
                  className="flex items-center justify-between border-b pb-3"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="w-16 h-20 object-cover rounded-md"
                    />
                    <div>
                      <p className="font-semibold">{book.title}</p>
                      <p className="text-sm text-gray-600">{book.author}</p>
                      <p className="text-xs text-gray-500">{book.category}</p>
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemove(book.id)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center mt-6">
              <p className="font-semibold">Total: {cart.length} items</p>
              <Button onClick={handleCheckout}>Checkout</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
