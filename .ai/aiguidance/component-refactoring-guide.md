# Component Refactoring Guide for Unified Theme System

## Overview

This guide provides step-by-step instructions for refactoring components to use our new unified theme system. The unified theme system combines both our custom theme implementation and next-themes to provide a consistent theming experience across the application.

## Why Refactor?

Our theme analysis script identified 33 files with potential theme provider issues. These issues occur when components use theme hooks or theme-aware components without being wrapped in a ThemeProvider. By refactoring these components to use our unified theme system, we can:

1. Eliminate "useTheme must be within ThemeProvider" errors
2. Remove the need for bridge components
3. Create a more maintainable and consistent theming approach
4. Simplify component development

## Refactoring Steps

### 1. For Components Using `useTheme` from next-themes

```tsx
// BEFORE
import { useTheme } from "next-themes"

export function MyComponent() {
  const { theme, setTheme } = useTheme()
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme("dark")}>Dark</button>
      <button onClick={() => setTheme("light")}>Light</button>
    </div>
  )
}
```

```tsx
// AFTER
import { useUnifiedTheme } from "@/src/hooks/use-unified-theme"

export function MyComponent() {
  const { theme, setTheme } = useUnifiedTheme()
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme("dark")}>Dark</button>
      <button onClick={() => setTheme("light")}>Light</button>
    </div>
  )
}
```

### 2. For Components Using Our Custom `useTheme`

```tsx
// BEFORE
import { useTheme } from "@/src/lib/context/ThemeProvider"

export function MyComponent() {
  const { themeVariant, setThemeVariant } = useTheme()
  
  return (
    <div>
      <p>Current variant: {themeVariant}</p>
      <button onClick={() => setThemeVariant("corporate")}>Corporate</button>
      <button onClick={() => setThemeVariant("standard")}>Standard</button>
    </div>
  )
}
```

```tsx
// AFTER
import { useUnifiedTheme } from "@/src/hooks/use-unified-theme"

export function MyComponent() {
  const { themeVariant, setThemeVariant } = useUnifiedTheme()
  
  return (
    <div>
      <p>Current variant: {themeVariant}</p>
      <button onClick={() => setThemeVariant("corporate")}>Corporate</button>
      <button onClick={() => setThemeVariant("standard")}>Standard</button>
    </div>
  )
}
```

### 3. For Components Using Both Theme Systems

```tsx
// BEFORE
import { useTheme as useNextTheme } from "next-themes"
import { useTheme as useCustomTheme } from "@/src/lib/context/ThemeProvider"

export function MyComponent() {
  const { theme } = useNextTheme()
  const { themeVariant } = useCustomTheme()
  
  return (
    <div>
      <p>Theme: {theme}, Variant: {themeVariant}</p>
    </div>
  )
}
```

```tsx
// AFTER
import { useUnifiedTheme } from "@/src/hooks/use-unified-theme"

export function MyComponent() {
  const { theme, themeVariant } = useUnifiedTheme()
  
  return (
    <div>
      <p>Theme: {theme}, Variant: {themeVariant}</p>
    </div>
  )
}
```

### 4. For Server Components

Server components cannot use hooks directly. Instead, pass theme information as props:

```tsx
// Client component that uses the hook
"use client"

import { useUnifiedTheme } from "@/src/hooks/use-unified-theme"
import { ServerComponent } from "./ServerComponent"

export function ClientWrapper() {
  const { isDark, themeVariant } = useUnifiedTheme()
  
  return <ServerComponent isDark={isDark} themeVariant={themeVariant} />
}

// Server component that receives theme as props
export function ServerComponent({ isDark, themeVariant }) {
  return (
    <div className={isDark ? "bg-slate-900" : "bg-white"}>
      <p>Theme variant: {themeVariant}</p>
    </div>
  )
}
```

## Common Refactoring Scenarios

### Theme-Aware Images

```tsx
// BEFORE
import { useTheme } from "next-themes"

export function MyImage() {
  const { resolvedTheme } = useTheme()
  const imageSrc = resolvedTheme === "dark" ? "/dark-image.png" : "/light-image.png"
  
  return <img src={imageSrc} alt="Theme-aware image" />
}
```

```tsx
// AFTER
import { useUnifiedTheme } from "@/src/hooks/use-unified-theme"

export function MyImage() {
  const { isDark } = useUnifiedTheme()
  const imageSrc = isDark ? "/dark-image.png" : "/light-image.png"
  
  return <img src={imageSrc} alt="Theme-aware image" />
}
```

### Theme Toggle Components

```tsx
// BEFORE
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  
  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      Toggle theme
    </button>
  )
}
```

```tsx
// AFTER
import { useUnifiedTheme } from "@/src/hooks/use-unified-theme"

export function ThemeToggle() {
  const { theme, setTheme, isDark } = useUnifiedTheme()
  
  return (
    <button onClick={() => setTheme(isDark ? "light" : "dark")}>
      Toggle theme
    </button>
  )
}
```

## Handling Layout-Specific Themes

For layouts that need a specific theme experience (e.g., corporate, standard), you no longer need to wrap them in a ThemeProvider. The UnifiedThemeProvider at the root level will automatically detect the appropriate experience based on the URL path.

If you need to override this behavior for a specific section, you can use the ExperienceProvider:

```tsx
import { ExperienceProvider } from "@/src/providers/unified-theme-provider"
import { EXPERIENCE_TYPES } from "@/src/constants/theme"

export function SpecialSection({ children }) {
  return (
    <ExperienceProvider experience={EXPERIENCE_TYPES.VERITASVAULT}>
      {children}
    </ExperienceProvider>
  )
}
```

## Testing Your Refactored Components

After refactoring a component:

1. Test it in both light and dark modes
2. Test it with different theme variants (standard, corporate, etc.)
3. Verify that theme switching works correctly
4. Check for any console errors related to theme context

## Prioritizing Components for Refactoring

Based on our theme analysis, we recommend refactoring components in this order:

1. Components that caused build errors (dashboard layout, corporate landing page, login page)
2. Page components identified by the theme analysis script
3. Shared UI components that use theme hooks
4. Remaining components

## Removing Bridge Components

Once you've refactored a component to use the unified theme system, you can remove any associated bridge components. For example:

1. Refactor `components/corporate/dashboard-layout.tsx` to use `useUnifiedTheme`
2. Remove `components/corporate/dashboard-layout-bridge.tsx`
3. Update imports to point directly to the original component

## Conclusion

By following this refactoring guide, we can eliminate theme provider issues throughout the application and create a more maintainable and consistent theming approach. The unified theme system provides a single interface for accessing all theme-related functionality, making it easier to develop and maintain themed components.

## Example Component

For a complete example of a component using the unified theme system, see `src/components/ui/theme-aware-component.tsx`.