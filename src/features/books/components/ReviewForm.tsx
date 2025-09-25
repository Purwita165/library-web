import { useState, FormEvent } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface Props {
  onAddReview: (review: string) => void
}

export function ReviewForm({ onAddReview }: Props) {
  const [review, setReview] = useState("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!review.trim()) {
      toast.error("Review cannot be empty")
      return
    }

    // ✅ Kirim ke parent
    onAddReview(review.trim())

    // ✅ Reset form
    setReview("")
    toast.success("✅ Review added!")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <Textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your review..."
        className="w-full"
      />
      <Button type="submit">Submit Review</Button>
    </form>
  )
}
