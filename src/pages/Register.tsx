import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { RegisterForm } from "@/features/auth/RegisterForm"

export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  )
}
