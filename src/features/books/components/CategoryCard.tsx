// src/features/books/components/CategoryCard.tsx
import { Link } from "react-router-dom"
import { Card } from "@/components/ui/card"

interface CategoryCardProps {
  category: string
  icon: string
}

export function CategoryCard({ category, icon }: CategoryCardProps) {
  return (
    <Link to={`/categories/${category}`} className="block">
      <Card className="p-2 hover:shadow-md transition text-center">
        <div className="text-2xl">{icon}</div> {/* ✅ kecil */}
        <p className="text-xs mt-1">{category}</p> {/* ✅ lebih kecil */}
      </Card>
    </Link>
  )
}
