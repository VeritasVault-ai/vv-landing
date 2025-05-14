// app/demo/layout.tsx
import { UnifiedThemeProvider } from "@/src/providers/unified-theme-provider"
import { EXPERIENCE_TYPES } from "@/src/constants/theme"

/**
 * Wraps child components with a unified theme provider using the standard experience type.
 *
 * @param children - The React nodes to be rendered within the themed layout.
 */
export default function DemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <UnifiedThemeProvider defaultExperience={EXPERIENCE_TYPES.STANDARD}>
      {children}
    </UnifiedThemeProvider>
  )
}