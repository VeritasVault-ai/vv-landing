import type { Metadata } from "next"
import { baseMetadata } from "@/lib/metadata-utils"
import VersionComparisonPage from "./comparison-page"

export const metadata: Metadata = {
  ...baseMetadata,
  title: "Compare Versions | NeuralLiquid",
  description: "Compare Standard and Corporate versions of our AI-powered Tezos liquidity management platform",
}

export default function ComparePage() {
  return <VersionComparisonPage />
}
