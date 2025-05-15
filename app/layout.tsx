import { UnifiedThemeProvider } from "@/src/providers/unified-theme-provider"
import { ThemeInitializerScript } from "./theme-script"
import type { Metadata } from "next"
import { ROOT_PRODUCT_DESCRIPTION, ROOT_PRODUCT_TITLE } from "@/lib/config/product-info"
import "./globals.css"

export const metadata: Metadata = {
  title: ROOT_PRODUCT_TITLE,
  description: ROOT_PRODUCT_DESCRIPTION,
}

/**
 * Defines the root layout for the application, applying global theming and structure to all pages.
 *
 * Wraps the provided content with the {@link UnifiedThemeProvider} and sets the HTML language to English.
 * Includes a script that immediately applies theme settings to prevent flash of wrong theme.
 *
 * @param children - The page content to be rendered within the layout.
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
          {children}
        </UnifiedThemeProvider>
      </body>
    </html>
  )
}