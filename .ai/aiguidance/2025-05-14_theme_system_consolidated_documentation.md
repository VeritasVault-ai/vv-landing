# Theme System Consolidated Documentation

## Overview

This document describes the consolidated theme system architecture implemented on May 14, 2025. The goal of this consolidation was to establish a single source of truth for theme-related types, constants, and utilities, eliminating type conflicts and improving maintainability.

## Key Components

### 1. Theme Constants (`src/constants/theme.ts`)

The root source for all theme-related constants:

```typescript
// Theme variants
export const STANDARD_VARIANTS = {
  STANDARD: 'standard',
  NEURALLIQUID: 'neuralliquid',
  COSMIC: 'cosmic'
} as const;

export const CORPORATE_VARIANTS = {
  CORPORATE: 'corporate',
  VERITASVAULT: 'veritasvault'
} as const;

// Experience types
export const EXPERIENCE_TYPES = {
  STANDARD: 'standard',
  CORPORATE: 'corporate',
  BOTH: 'both',
} as const;

// Color modes
export const COLOR_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;
```

### 2. Theme Types (`src/types/theme.ts`)

The single source of truth for all theme-related types:

```typescript
import { COLOR_MODES, CORPORATE_VARIANTS, EXPERIENCE_TYPES, STANDARD_VARIANTS } from '../constants/theme';

export type StandardThemeVariant = typeof STANDARD_VARIANTS[keyof typeof STANDARD_VARIANTS];
export type CorporateThemeVariant = typeof CORPORATE_VARIANTS[keyof typeof CORPORATE_VARIANTS];
export type ThemeVariant = StandardThemeVariant | CorporateThemeVariant;

export type ExperienceType = typeof EXPERIENCE_TYPES[keyof typeof EXPERIENCE_TYPES];
export type ColorMode = typeof COLOR_MODES[keyof typeof COLOR_MODES];

export interface ThemeConfig {
  experience: ExperienceType;
  variant: ThemeVariant;
  colorMode: ColorMode;
  // ...other properties
}
```

### 3. Theme Utilities (`src/utils/theme-utils.ts`)

Centralized location for all theme-related utility functions:

```typescript
export function getDefaultVariant(exp: ExperienceType): ThemeVariant {
  // Returns the default variant for a given experience type
}

export function getAvailableVariants(exp: ExperienceType): ThemeVariant[] {
  // Returns all available variants for a given experience type
}

export function isStandardVariant(variant: ThemeVariant): variant is StandardThemeVariant {
  // Type guard to check if a variant belongs to standard experience
}

export function isCorporateVariant(variant: ThemeVariant): variant is CorporateThemeVariant {
  // Type guard to check if a variant belongs to corporate experience
}
```

### 4. Backward Compatibility Files

To maintain backward compatibility with existing imports, we've created re-export files:

- `src/context/theme-variants.ts`: Re-exports theme variant constants and types
- `src/types/theme-variants.ts`: Re-exports theme-related types from the central definition

### 5. Unified Theme Hook (`src/hooks/use-unified-theme.ts`)

A client-safe hook that combines functionality from both our custom theme system and next-themes:

```typescript
export function useUnifiedTheme() {
  // Returns a unified interface for all theme-related functionality
  return {
    // Next-themes properties
    theme, setTheme, systemTheme, resolvedTheme,
    
    // Custom theme properties
    themeVariant, setThemeVariant, availableThemeVariants, experience, colorMode,
    
    // Computed properties
    isDark
  }
}
```

## Usage Guidelines

### Importing Theme Types

Always import theme types from the central type definition:

```typescript
// ✅ Correct
import { ThemeVariant, ExperienceType } from "@/src/types/theme";

// ❌ Avoid
import { ThemeVariant } from "@/src/context/theme-variants";
import { ThemeVariant } from "@/src/types/theme-variants";
```

### Accessing Theme Constants

Always import theme constants from the constants file:

```typescript
// ✅ Correct
import { STANDARD_VARIANTS, EXPERIENCE_TYPES } from "@/src/constants/theme";

// ❌ Avoid
import { standardVariants } from "@/src/context/theme-variants";
```

### Using Theme Utilities

Use the centralized utility functions:

```typescript
// ✅ Correct
import { getDefaultVariant, isStandardVariant } from "@/src/utils/theme-utils";

// ❌ Avoid
import { getDefaultVariant } from "@/src/context/theme-variants";
```

### Client-Side Theme Access

For client components that need access to theme state:

```typescript
// ✅ Recommended
import { useUnifiedTheme } from "@/src/hooks/use-unified-theme";

function MyComponent() {
  const { isDark, themeVariant, setTheme } = useUnifiedTheme();
  // Use theme values safely, with fallbacks if providers are missing
}
```

## Theme Provider Structure

The application uses a nested theme provider structure:

1. Root level: `UnifiedThemeProvider` in `app/layout.tsx`
2. Experience-specific layouts: `ThemeProvider` with appropriate `defaultExperience`
3. Bridge components: For components that need theme context but might be used outside of a theme provider

Always ensure that components using theme hooks are properly wrapped with the necessary providers.

## Migration Path

1. Start using the consolidated types and utilities in new code
2. Gradually update existing imports to use the single source of truth
3. Use the migration script (`scripts/update-theme-imports.js`) to automate updates
4. Eventually, the backward compatibility files can be removed once all imports are updated