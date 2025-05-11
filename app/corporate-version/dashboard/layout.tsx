import { ThemeProvider } from "@/lib/context/theme-context"
import type { ReactNode } from "react"

export default function CorporateVersionDashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  return <ThemeProvider defaultTheme="system">{children}</ThemeProvider>
}
