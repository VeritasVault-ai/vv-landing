// app/layout.tsx  (server component)
import { UnifiedThemeProvider } from '@/src/providers/unified-theme-provider';
import './globals.css';
import { Providers } from './providers';
import { ThemeInitializerClient } from './theme-initializer-client';
import { ApplicationInsightsInitializer } from '@/components/analytics/application-insights-initializer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ApplicationInsightsInitializer />
        <ThemeInitializerClient />
        <Providers>
          <UnifiedThemeProvider>
            {children}
          </UnifiedThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
