import type React from "react"
import { corporateMetadata } from "@/lib/metadata-utils"
import type { Metadata } from "next"
import { CorporateHeader } from "@/components/layout/corporate-header"
import { SimpleFooter } from "@/components/ui/simple-footer"
import { ThemeScript } from "@/components/theme-script"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = corporateMetadata

export default function CorporateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider version="corporate">
      <ThemeScript />
      <div className="min-h-screen flex flex-col">
        <CorporateHeader />
        <main className="flex-grow">{children}</main>
        <SimpleFooter version="corporate" />
      </div>
    </ThemeProvider>
  )
}
