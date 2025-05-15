import { CorporateLayoutClient } from "./layout-client"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    template: "%s | VeritasVault Enterprise",
    default: "VeritasVault Enterprise",
  },
  description: "Enterprise-grade digital asset management and treasury solutions",
}

/**
 * Layout for all corporate version pages
 * Wraps all corporate pages with the appropriate theme provider
 */
export default function CorporateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CorporateLayoutClient>
      {children}
    </CorporateLayoutClient>
  )
}