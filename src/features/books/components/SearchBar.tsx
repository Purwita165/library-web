import { Input } from "@/components/ui/input"
import { ChangeEvent } from "react"

interface Props {
  query: string
  setQuery: (value: string) => void
}

export function SearchBar({ query, setQuery }: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  return (
    <div className="mb-6">
      <Input
        type="text"
        placeholder="🔍 Search books by title or author..."
        value={query}
        onChange={handleChange}
        className="w-full max-w-md"
      />
    </div>
  )
}
