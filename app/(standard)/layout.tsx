import type { ReactNode } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { SimpleHeader } from "@/components/ui/simple-header"
import { SimpleFooter } from "@/components/ui/simple-footer"
import { standardMetadata } from "@/lib/metadata-utils"
import type { Metadata } from "next"
import { ThemeScript } from "@/components/theme-script"

export const metadata: Metadata = standardMetadata

interface StandardLayoutProps {
  children: ReactNode
}

export default function StandardLayout({ children }: StandardLayoutProps) {
  return (
    <ThemeProvider version="standard">
      <ThemeScript />
      <div className="min-h-screen flex flex-col">
        <SimpleHeader version="standard" />
        <main className="flex-grow">{children}</main>
        <SimpleFooter version="standard" />
      </div>
    </ThemeProvider>
  )
}
