# Theme Provider Context Fix

## Overview

This document describes the fix for the "useTheme must be within ThemeProvider" error that was occurring during the build process.

## Context

During the migration to the src/ directory structure, we encountered an error where components using the `useTheme` hook were not properly wrapped in a `ThemeProvider`. This caused the build to fail with the error message: "useTheme must be within ThemeProvider".

## Root Cause Analysis

The specific issue was in the corporate dashboard implementation:

1. The `DashboardLayout` component in `components/corporate/dashboard-layout.tsx` was using the `useTheme` hook:
   ```javascript
   const { themeVariant } = useTheme()
   ```

2. This component was being imported and used directly in `app/(corporate)/corporate/dashboard/dashboard-content.tsx` without being wrapped in a `ThemeProvider`.

3. While there was a `ThemeProvider` in `app/(corporate)/corporate/dashboard/layout.tsx`, it wasn't properly cascading to the `dashboard-content.tsx` component due to the way Next.js handles server and client components.

## Solution Implemented

We created a bridge component that wraps the original `DashboardLayout` with a `ThemeProvider`:

1. Created `components/corporate/dashboard-layout-bridge.tsx`:
   ```typescript
   export function DashboardLayout(props: DashboardLayoutProps) {
     return (
       <ThemeProvider defaultExperience={EXPERIENCE_TYPES.CORPORATE}>
         <OriginalDashboardLayout {...props} />
       </ThemeProvider>
     )
   }
   ```

2. Updated `app/(corporate)/corporate/dashboard/dashboard-content.tsx` to import and use this bridge component instead of the original `DashboardLayout`.

3. Added clear documentation to the bridge file indicating it's a temporary solution.

## Implications

- The build now completes successfully without the "useTheme must be within ThemeProvider" error
- We've maintained the functionality of the dashboard layout
- We've documented the temporary nature of this solution

## Lessons Learned

1. **Context Provider Boundaries**: When using React context (like `ThemeProvider`), be aware of the boundaries between server and client components in Next.js.

2. **Hook Usage**: Components that use hooks like `useTheme` must always be within their respective provider components.

3. **Component Refactoring**: When refactoring components that use context, ensure the provider hierarchy is maintained.

## Next Steps

For a more permanent solution, we should:

1. **Refactor the DashboardLayout**: Update the component to not depend directly on the useTheme hook or ensure it's always used within a ThemeProvider.

2. **Move ThemeProvider Higher**: Consider moving the ThemeProvider higher up in the component tree to ensure it wraps all components that need theme access.

3. **Audit Theme Usage**: Identify other components that might be using the useTheme hook without a proper ThemeProvider.

4. **Remove Bridge Components**: Once a proper solution is implemented, remove the temporary bridge components.

## Related Components

- components/corporate/dashboard-layout.tsx
- components/corporate/dashboard-layout-bridge.tsx
- app/(corporate)/corporate/dashboard/dashboard-content.tsx
- app/(corporate)/corporate/dashboard/layout.tsx

## Related Documents

- [2025-05-13_refactor_build_errors_fixed.md](./2025-05-13_refactor_build_errors_fixed.md)
- [2025-05-13_component_modular_sidebar_implementation.md](./2025-05-13_component_modular_sidebar_implementation.md)

## Last Updated

2025-05-13