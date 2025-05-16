import { ROOT_PRODUCT_DESCRIPTION, ROOT_PRODUCT_TITLE } from "@/lib/config/product-info"
import { UnifiedThemeProvider } from "@/src/providers/unified-theme-provider"
import type { Metadata } from "next"
import Script from "next/script"
import "./globals.css"
import { Providers } from "./providers"
import { ThemeInitializerScript } from "./theme-script"

// Import MSW setup in development only
if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  require('../mocks')
}

export const metadata: Metadata = {
  title: ROOT_PRODUCT_TITLE,
  description: ROOT_PRODUCT_DESCRIPTION,
}

/**
 * Defines the root layout for the application, applying global theming and structure to all pages.
 *
 * Wraps the provided content with the {@link UnifiedThemeProvider} and sets the HTML language to English.
 * Includes a script that immediately applies theme settings to prevent flash of wrong theme.
 * Also initializes MSW for API mocking during development when NEXT_PUBLIC_API_MOCKING is enabled.
 *
 * @param children - The page content to be rendered within the layout.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const themeScript = ThemeInitializerScript();
  
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