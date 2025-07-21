"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import styles from "./search-bar.module.css"

interface SearchBarProps {
  onSubmit?: (query: string) => void;
  placeholder?: string;
}
export function SearchBar({ 
  onSubmit, 
  placeholder = "Search..." 
}: SearchBarProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSubmit && query.trim()) {
      onSubmit(query)
    }
  }
  return (
    <form className={styles.searchContainer} onSubmit={handleSubmit}>
      <Search className={styles.searchIcon} />
      <Input
        type="search"
        placeholder={placeholder}
        className={styles.searchInput}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  )
}