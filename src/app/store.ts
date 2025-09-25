import { configureStore } from "@reduxjs/toolkit"

// Reducers
import authReducer from "@/features/auth/authSlice"
import cartReducer from "@/features/cart/cartSlice"
import bookReducer from "@/features/books/bookSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    books: bookReducer,
  },
  devTools: import.meta.env.MODE !== "production", // ✅ aktifkan Redux DevTools kecuali di production
})

// Global types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
