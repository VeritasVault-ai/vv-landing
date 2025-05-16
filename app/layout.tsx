import { UnifiedThemeProvider } from "@/src/providers/unified-theme-provider"
import type { Metadata } from "next"
import Script from "next/script"
import { ROOT_PRODUCT_DESCRIPTION, ROOT_PRODUCT_TITLE } from "@/lib/config/product-info"
import { getThemeInitializerScript } from "./theme-script"
import { Providers } from "./providers"
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
 * Also initializes MSW for API mocking during development.
 *
 * @param children - The page content to be rendered within the layout.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const themeScript = getThemeInitializerScript();
  
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Use Next.js Script component with strategy="beforeInteractive" */}
        <Script
          id="theme-initializer"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
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