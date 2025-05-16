import { Metadata } from "next"
import { TreasurySolutionClient } from "./client"

export const metadata: Metadata = {
  title: "Treasury Management | VeritasVault Enterprise",
  description: "Optimize your institutional treasury operations with our comprehensive digital asset management platform designed for corporate treasuries and financial institutions."
}

export default function TreasurySolutionPage() {
  return <TreasurySolutionClient />
}