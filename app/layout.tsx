import { ROOT_PRODUCT_DESCRIPTION, ROOT_PRODUCT_TITLE } from "@/lib/config/product-info"
import { UnifiedThemeProvider } from "@/src/providers/unified-theme-provider"
import type { Metadata } from "next"
import Script from "next/script"
import "./globals.css"
import { Providers } from "./providers"
import { ThemeInitializerScript } from "./theme-initializer"

// Import MSW setup in development only
if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  require('../mocks')
}

export const metadata: Metadata = {
  title: ROOT_PRODUCT_TITLE,
  description: ROOT_PRODUCT_DESCRIPTION,
}

/**
 * Provides the root layout for the application, applying global theming and context providers to all pages.
 *
 * Renders the given page content within a consistent HTML structure, sets the language to English, and ensures immediate theme initialization to prevent visual inconsistencies.
 *
 * @param children - The page content to display within the layout.
 *
 * @remark
 * During development, API mocking with MSW is automatically initialized if the environment variable `NEXT_PUBLIC_API_MOCKING` is set to "enabled".
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeInitializerScript />
      </head>
      <body>
        <UnifiedThemeProvider>
          <Providers>
            {children}
          </Providers>
        </UnifiedThemeProvider>
      </body>
    </html>
  )
}