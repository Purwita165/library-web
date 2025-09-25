import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Avatar } from "@/components/ui/avatar"

interface User {
  email: string
  role: string
}

export default function ProfilePage() {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    navigate("/login")
  }

  if (!user) {
    return <p className="p-6 text-center">Loading profile...</p>
  }

  return (
    <div className="container mx-auto px-6 py-8 flex justify-center">
      <Card className="w-full max-w-lg shadow-md">
        <CardHeader className="text-center space-y-4">
          {/* Avatar */}
          <div className="flex justify-center">
            <Avatar className="w-20 h-20 bg-blue-600 text-white flex items-center justify-center text-2xl rounded-full">
              {user.email[0].toUpperCase()}
            </Avatar>
          </div>
          <CardTitle className="text-2xl font-bold">My Profile</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* User info */}
          <div className="space-y-2 text-center">
            <p>
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p>
              <span className="font-semibold">Role:</span> {user.role}
            </p>
          </div>

          {/* Stats mock */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xl font-bold">5</p>
              <p className="text-sm text-gray-600">Borrowed</p>
            </div>
            <div>
              <p className="text-xl font-bold">12</p>
              <p className="text-sm text-gray-600">Returned</p>
            </div>
            <div>
              <p className="text-xl font-bold">17</p>
              <p className="text-sm text-gray-600">Total</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <Button variant="default" className="w-full">
              Edit Profile
            </Button>
            <Button
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600"
            >
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
