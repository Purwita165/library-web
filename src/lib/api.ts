import axios from "axios"

export const api = axios.create({
  baseURL: "https://belibraryformentee-production.up.railway.app", // 🔑 API mentor
})

// inject token kalau ada
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
