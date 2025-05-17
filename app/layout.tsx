// app/layout.tsx  (server component)
import { UnifiedThemeProvider } from '@/src/providers/unified-theme-provider';
import './globals.css';
import { Providers } from './providers';
import { ThemeInitializerScript } from './theme-initializer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeInitializerScript />
      </head>

      <body>
        <Providers>
          <UnifiedThemeProvider>
            {children}
          </UnifiedThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
