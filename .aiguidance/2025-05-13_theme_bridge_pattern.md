# Theme Bridge Pattern for Fixing "useTheme must be within ThemeProvider" Errors

## Overview

This document outlines the pattern we've established for fixing "useTheme must be within ThemeProvider" errors in our application. This pattern involves creating bridge components that wrap original components with the appropriate ThemeProvider.

## The Problem

Components that use theme hooks (like `useTheme` from next-themes or our custom theme provider) must be wrapped in a corresponding ThemeProvider component. When these components are used in parts of the application that don't have the correct ThemeProvider in their component hierarchy, we get the "useTheme must be within ThemeProvider" error.

## The Bridge Pattern Solution

### 1. Create a Bridge Component

For any component that uses theme hooks and might be used in different parts of the application, create a bridge component that:

- Imports the original component
- Wraps it in the appropriate ThemeProvider
- Passes all props to the original component

```tsx
// Example: theme-aware-image-bridge.tsx
"use client"

import { ThemeProvider } from "next-themes"
import { ThemeAwareImage as OriginalThemeAwareImage } from "./theme-aware-image"
import { ImageProps } from "next/image"

interface ThemeAwareImageProps extends Omit<ImageProps, "src"> {
  src: string
  darkSrc?: string
  lightSrc?: string
}

export function ThemeAwareImage(props: ThemeAwareImageProps) {
  return (
    <ThemeProvider attribute="class">
      <OriginalThemeAwareImage {...props} />
    </ThemeProvider>
  )
}
```

### 2. Update Imports in Consuming Components

Update any components that use the theme-aware component to import from the bridge component instead:

```tsx
// Before
import { ThemeAwareImage } from "@/components/ui/theme-aware-image"

// After
import { ThemeAwareImage } from "@/components/ui/theme-aware-image-bridge"
```

### 3. Document the Temporary Nature

Add clear comments to bridge components indicating they are temporary solutions:

```tsx
/**
 * TEMPORARY FILE - PART OF CODEBASE MIGRATION
 * 
 * This is a temporary bridge file created to fix the "useTheme must be within ThemeProvider" error.
 * It wraps the ThemeAwareImage component with a ThemeProvider.
 * 
 * TODO: Once the theme provider hierarchy is properly refactored, this file should be deleted.
 */
```

## Examples of Bridge Components

We've implemented the following bridge components to fix theme provider issues:

1. **ThemeAwareImage Bridge**:
   - `components/ui/theme-aware-image-bridge.tsx`
   - Used in `components/corporate/landing-sections/TrustedInstitutions.tsx`

2. **CorporateLandingPage Bridge**:
   - `components/corporate-landing-page-bridge.tsx`
   - Used in `app/(corporate)/corporate/page.tsx`

3. **DashboardLayout Bridge**:
   - `components/corporate/dashboard-layout-bridge.tsx`
   - Used in `app/(corporate)/corporate/dashboard/dashboard-content.tsx`

4. **ThemeSettings Bridge**:
   - `components/corporate/dashboard-settings/theme-settings-bridge.tsx`
   - Used in `components/corporate/dashboard-settings/index.tsx`

## When to Use This Pattern

Use this pattern when:

1. You encounter a "useTheme must be within ThemeProvider" error
2. You have a component that uses theme hooks and might be used in different parts of the application
3. You want to fix the immediate error while working on a more comprehensive solution

## Advantages of This Approach

1. **Immediate Fix**: Quickly resolves build errors without major refactoring
2. **Non-Invasive**: Doesn't require changes to the original component
3. **Isolated**: Theme context is isolated to just the components that need it
4. **Temporary**: Clearly indicates the temporary nature of the solution

## Long-Term Solution

While the bridge pattern is effective for fixing immediate issues, our long-term solution is to implement the unified theme system as outlined in the component refactoring guide. This will eliminate the need for bridge components by providing a consistent theme context throughout the application.

## How to Identify Components That Need Bridge Components

Components that might need bridge components include:

1. Components that directly use `useTheme` from next-themes or our custom theme provider
2. Components that use other components that depend on theme context
3. Components that conditionally render different UI based on the current theme

You can identify these components by:

1. Looking for imports of `useTheme` or other theme hooks
2. Checking for theme-related props or state
3. Looking for components that have theme-aware behavior

## Conclusion

The bridge pattern is an effective temporary solution for fixing "useTheme must be within ThemeProvider" errors while we work on implementing our unified theme system. By following this pattern, we can ensure our application builds successfully while gradually refactoring components to use the unified theme system.

## Related Documents

- [component-refactoring-guide.md](./component-refactoring-guide.md)
- [2025-05-13_theme_provider_incremental_approach.md](./2025-05-13_theme_provider_incremental_approach.md)

## Last Updated

2025-05-13