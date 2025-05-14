# Root-Level ThemeProvider Implementation Guide

## Overview

This guide outlines how to implement a root-level ThemeProvider that will eliminate the need for bridge components and ensure all pages have access to theme context.

## Implementation Steps

### 1. Create a Unified Theme Provider

First, create a unified theme provider that combines both our custom theme system and next-themes (if both are needed):

```tsx
// src/providers/unified-theme-provider.tsx
"use client"

import { ReactNode } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ThemeProvider as CustomThemeProvider } from "@/src/lib/context/ThemeProvider"
import { EXPERIENCE_TYPES } from "@/src/constants/theme"

interface UnifiedThemeProviderProps {
  children: ReactNode
  defaultExperience?: string
}

export function UnifiedThemeProvider({ 
  children, 
  defaultExperience = EXPERIENCE_TYPES.STANDARD 
}: UnifiedThemeProviderProps) {
  return (
    <NextThemesProvider attribute="class">
      <CustomThemeProvider defaultExperience={defaultExperience}>
        {children}
      </CustomThemeProvider>
    </NextThemesProvider>
  )
}
```

### 2. Update the Root Layout

Next, modify the root layout to include the UnifiedThemeProvider:

```tsx
// app/layout.tsx
import { UnifiedThemeProvider } from "@/src/providers/unified-theme-provider"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <UnifiedThemeProvider>
          {children}
        </UnifiedThemeProvider>
      </body>
    </html>
  )
}
```

### 3. Update Experience-Specific Layouts

For layouts that need specific theme experiences, update them to use the defaultExperience prop:

```tsx
// app/(corporate)/layout.tsx
import { UnifiedThemeProvider } from "@/src/providers/unified-theme-provider"
import { EXPERIENCE_TYPES } from "@/src/constants/theme"

export default function CorporateLayout({ children }) {
  return (
    <UnifiedThemeProvider defaultExperience={EXPERIENCE_TYPES.CORPORATE}>
      {children}
    </UnifiedThemeProvider>
  )
}
```

### 4. Create Theme Hook Utilities

Create utility hooks that make it easy to access theme information:

```tsx
// src/hooks/use-unified-theme.ts
"use client"

import { useTheme as useNextTheme } from "next-themes"
import { useTheme as useCustomTheme } from "@/src/lib/context/ThemeProvider"

export function useUnifiedTheme() {
  const nextTheme = useNextTheme()
  const customTheme = useCustomTheme()
  
  return {
    // Next-themes properties
    theme: nextTheme.theme,
    setTheme: nextTheme.setTheme,
    systemTheme: nextTheme.systemTheme,
    
    // Custom theme properties
    themeVariant: customTheme.themeVariant,
    setThemeVariant: customTheme.setThemeVariant,
    availableThemeVariants: customTheme.availableThemeVariants,
    
    // Computed properties
    isDark: nextTheme.theme === "dark" || 
            (nextTheme.theme === "system" && nextTheme.systemTheme === "dark"),
  }
}
```

### 5. Refactor Components to Use the Unified Hook

Update components to use the unified hook:

```tsx
// Example component
"use client"

import { useUnifiedTheme } from "@/src/hooks/use-unified-theme"

export function ThemedComponent() {
  const { isDark, themeVariant } = useUnifiedTheme()
  
  return (
    <div className={isDark ? "bg-slate-900" : "bg-white"}>
      <p>Current theme variant: {themeVariant}</p>
    </div>
  )
}
```

## Testing the Implementation

1. **Test Server Components**: Ensure server components can properly handle theme classes
2. **Test Client Components**: Verify client components can access theme context
3. **Test Theme Switching**: Confirm theme switching works across the application
4. **Test Different Routes**: Check that all routes render with the correct theme

## Migration Strategy

1. **Implement Root Provider**: Add the UnifiedThemeProvider to the root layout
2. **Test Core Functionality**: Ensure basic theme functionality works
3. **Update High-Priority Components**: Refactor components that currently use bridge components
4. **Remove Bridge Components**: Once components are updated, remove the bridge components
5. **Update Remaining Components**: Gradually update all components to use the unified hook

## Common Issues and Solutions

### Hydration Mismatch

If you encounter hydration mismatches, ensure:
- The `suppressHydrationWarning` attribute is added to the html element
- Use the `useEffect` hook to apply theme changes on the client side

```tsx
useEffect(() => {
  // Theme logic here
}, []);
```

### Context Not Available

If context is not available in some components:
- Check that the component is within the provider hierarchy
- Ensure the component is a client component ("use client" directive)
- Consider passing theme information as props for server components

### Multiple Providers

If you have multiple ThemeProviders in the component tree:
- Remove duplicate providers
- Use the defaultExperience prop to customize theme behavior

## Best Practices

1. **Prefer Props Over Context**: For simple components, pass theme information as props
2. **Use the Unified Hook**: Use the unified hook for components that need theme access
3. **Document Theme Dependencies**: Clearly document when a component requires theme context
4. **Test Theme Variations**: Test components with different theme settings

## Conclusion

Implementing a root-level ThemeProvider creates a more maintainable and consistent approach to theme handling across the application. This eliminates the need for bridge components and ensures all parts of the application have access to theme context when needed.

## Related Resources

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [next-themes Documentation](https://github.com/pacocoursey/next-themes)
- [React Context API Documentation](https://reactjs.org/docs/context.html)