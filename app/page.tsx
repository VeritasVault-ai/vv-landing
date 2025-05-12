"use client"

import { useTheme } from "next-themes"
import { useEffect } from "react"
import { EnhancedVersionSelectionPage } from "./VersionSelectionPage"

export default function Home() {
  const { setTheme } = useTheme()
  
  // Set cosmic theme for the landing page
  useEffect(() => {
    setTheme("cosmic")
  }, [setTheme])

  return <EnhancedVersionSelectionPage />
}