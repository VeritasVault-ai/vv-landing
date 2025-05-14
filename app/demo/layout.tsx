// app/demo/layout.tsx
import { UnifiedThemeProvider } from "@/src/providers/unified-theme-provider"
import { EXPERIENCE_TYPES } from "@/src/constants/theme"

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