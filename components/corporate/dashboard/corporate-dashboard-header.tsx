"use client"

// Import the main header component from the header subfolder
import { CorporateDashboardHeader as Header } from "./header"

// Re-export the component with the same name for backward compatibility
export function CorporateDashboardHeader() {
  return <Header />
}