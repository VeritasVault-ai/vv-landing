# Comprehensive Theme Provider Fix

## Overview

This document provides a comprehensive analysis of the "useTheme must be within ThemeProvider" errors encountered during the migration to the src/ directory structure and our approach to fixing them.

## Context

During the build process, we encountered multiple instances of the "useTheme must be within ThemeProvider" error on different pages:

1. First on the dashboard layout component
2. Then on the `/corporate` page route
3. Most recently on the `/corporate/login` page route

These errors occur when components use the `useTheme` hook (either directly or indirectly through other components) without being wrapped in a ThemeProvider component.

## Root Cause Analysis

We've identified several patterns that lead to this error:

1. **Direct Hook Usage**: Components directly using `useTheme` from either our custom implementation or from next-themes.

2. **Indirect Hook Usage**: Components using other components (like `ThemeAwareImage`) that internally use the `useTheme` hook.

3. **Layout Conflicts**: Pages that have their own layout structure that conflicts with the parent layout's ThemeProvider.

4. **Multiple Theme Systems**: The codebase uses both our custom theme system and next-themes, which can lead to conflicts.

## Solution Approach

We've implemented a consistent pattern to fix these issues:

### 1. Bridge Component Pattern

For each affected component, we create a bridge component that:
- Wraps the original component with the appropriate ThemeProvider
- Passes through all props to the original component
- Includes clear documentation about its temporary nature

Example:
```tsx
"use client"

import { ThemeProvider } from "next-themes"
import { OriginalComponent } from "./original-component"

export function ComponentBridge(props) {
  return (
    <ThemeProvider attribute="class">
      <OriginalComponent {...props} />
    </ThemeProvider>
  )
}
```

### 2. Import Path Updates

We update import statements to use the bridge components instead of the original components:

```tsx
// Before
import { Component } from "./component"

// After
import { Component } from "./component-bridge"
```

### 3. Component Refactoring

For components that directly use the `useTheme` hook, we refactor them to:
- Accept theme information as props
- Remove direct dependencies on the theme context

Example:
```tsx
// Before
function Component() {
  const { theme } = useTheme()
  return <div className={theme === 'dark' ? 'bg-black' : 'bg-white'}>...</div>
}

// After
function Component({ theme = 'light' }) {
  return <div className={theme === 'dark' ? 'bg-black' : 'bg-white'}>...</div>
}
```

## Components Fixed

We've applied fixes to the following components:

1. **Dashboard Layout**:
   - Created `dashboard-layout-bridge.tsx` that wraps the original component with ThemeProvider
   - Refactored `dashboard-layout.tsx` to accept theme information as props

2. **Corporate Landing Page**:
   - Created `corporate-landing-page-bridge.tsx` that wraps the original component with ThemeProvider
   - Updated the import in `app/(corporate)/corporate/page.tsx`

3. **Corporate Login Page**:
   - Created `login-page-bridge.tsx` that wraps the login page content with ThemeProvider
   - Updated `app/(corporate)/corporate/login/page.tsx` to use the bridge component

## Analysis Tools

We've created a script (`scripts/find-theme-hook-usage.js`) to identify other potential theme provider issues by:
- Searching for direct theme hook usage
- Identifying components that use theme-aware components
- Finding page components that might need ThemeProvider wrappers

## Permanent Solution Recommendations

While the bridge components provide an immediate fix, we recommend the following for a more permanent solution:

1. **Standardize Theme Implementation**:
   - Choose either our custom theme system or next-themes, not both
   - Create clear guidelines for theme usage

2. **Implement Root-Level ThemeProvider**:
   - Add ThemeProvider to the root layout to ensure all pages have access to theme context
   - This would eliminate the need for bridge components

3. **Use Composition Pattern**:
   - Create higher-order components that handle theme context
   - Make theme dependencies explicit in component interfaces

4. **Update Next.js Configuration**:
   - Configure Next.js to properly handle theme context during server-side rendering
   - Use the appropriate metadata and configuration options

## Next Steps

1. **Complete Theme Audit**:
   - Run the theme analysis script to identify all potential issues
   - Create a comprehensive list of components that need fixing

2. **Implement Root-Level Solution**:
   - Add ThemeProvider to the root layout
   - Test to ensure all pages render correctly

3. **Refactor Components**:
   - Update components to follow the new theme usage pattern
   - Remove direct dependencies on theme context where possible

4. **Remove Bridge Components**:
   - Once the proper theme provider hierarchy is established, remove the temporary bridge components

5. **Document Best Practices**:
   - Create clear guidelines for theme usage in the codebase
   - Include examples and patterns to follow

## Related Components

- components/corporate/dashboard-layout.tsx
- components/corporate/dashboard-layout-bridge.tsx
- components/corporate-landing-page.tsx
- components/corporate-landing-page-bridge.tsx
- app/(corporate)/corporate/login/login-page-bridge.tsx
- app/(corporate)/layout.tsx

## Related Documents

- [2025-05-13_refactor_theme_provider_fix.md](./2025-05-13_refactor_theme_provider_fix.md)
- [2025-05-13_refactor_theme_provider_fix_update.md](./2025-05-13_refactor_theme_provider_fix_update.md)
- [2025-05-13_refactor_dashboard_context_fix.md](./2025-05-13_refactor_dashboard_context_fix.md)

## Last Updated

2025-05-13