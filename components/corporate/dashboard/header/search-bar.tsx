"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import styles from "./search-bar.module.css"

export function SearchBar() {
  return (
    <div className={styles.searchContainer}>
      <Search className={styles.searchIcon} />
      <Input
        type="search"
        placeholder="Search..."
        className={styles.searchInput}
      />
    </div>
  )
}