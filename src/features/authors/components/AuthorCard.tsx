// src/features/authors/components/AuthorCard.tsx
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface AuthorCardProps {
  name: string
  photo?: string
}

export function AuthorCard({ name, photo }: AuthorCardProps) {
  return (
    <div className="text-center space-y-1">
      <Avatar className="w-12 h-12 mx-auto ring-2 ring-primary">
        {photo ? (
          <AvatarImage src={photo} alt={name} />
        ) : (
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        )}
      </Avatar>
      <p className="text-[10px] font-medium">{name}</p> {/* ✅ kecil */}
    </div>
  )
}
