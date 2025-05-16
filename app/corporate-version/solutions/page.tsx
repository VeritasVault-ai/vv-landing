import { Metadata } from "next"
import { SolutionsClient } from "./client"

export const metadata: Metadata = {
  title: "Solutions | VeritasVault Enterprise",
  description: "Explore our comprehensive suite of institutional liquidity management solutions for digital assets.",
}

/**
 * Solutions page for the corporate version
 */
export default function SolutionsPage() {
  return <SolutionsClient />
}