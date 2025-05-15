import { Metadata } from "next"
import { AboutClient } from "./client"

export const metadata: Metadata = {
  title: "About Us | VeritasVault Enterprise",
  description: "Learn about our mission to revolutionize institutional liquidity management with cutting-edge technology.",
}

/**
 * About page for the corporate version
 */
export default function AboutPage() {
  return <AboutClient />
}