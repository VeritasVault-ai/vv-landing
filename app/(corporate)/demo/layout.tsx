import type React from "react"
import { CorporateDemoHeader } from "@/components/corporate/demo/header"
import { CorporateDemoFooter } from "@/components/corporate/demo/footer"
import { ThemeProvider } from "@/lib/context/theme-context"

export default function CorporateDemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider defaultTheme="system">
      <div className="min-h-screen flex flex-col bg-slate-50">
        <CorporateDemoHeader />
        <main className="flex-1">{children}</main>
        <CorporateDemoFooter />
      </div>
    </ThemeProvider>
  )
}
