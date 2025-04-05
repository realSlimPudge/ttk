"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"

interface TaskSearchProps {
  onSearch: (query: string) => void
}

export function TaskSearch({ onSearch }: TaskSearchProps) {
  const [query, setQuery] = useState("")

  const handleSearch = () => {
    onSearch(query)
  }

  const handleClear = () => {
    setQuery("")
    onSearch("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <Input
          placeholder="Поиск по названию, дате создания или ответственному"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pr-10"
        />
        {query && (
          <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-full" onClick={handleClear}>
            <X className="h-4 w-4" />
            <span className="sr-only">Очистить</span>
          </Button>
        )}
      </div>
      <Button onClick={handleSearch}>
        <Search className="mr-2 h-4 w-4" />
        Найти
      </Button>
    </div>
  )
}

