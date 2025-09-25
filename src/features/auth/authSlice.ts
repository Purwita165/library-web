import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface User {
  id: string
  email: string
  role: string
}

interface AuthState {
  user: User | null
}

const initialState: AuthState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = null
      localStorage.removeItem("token")
      localStorage.removeItem("user")
    },
  },
})

export const { setUser, logout } = authSlice.actions
export default authSlice.reducer
