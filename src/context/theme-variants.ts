/**
 * Theme variants exports
 * 
 * This file re-exports theme variant constants and utilities
 * to maintain backward compatibility with existing imports.
 */
import { CORPORATE_VARIANTS, STANDARD_VARIANTS } from "@/src/constants/theme";
import { ThemeVariant, StandardThemeVariant, CorporateThemeVariant } from "@/src/types/theme";
import { getDefaultVariant } from "@/src/utils/theme-utils";

// Export the variant constants with the names expected by ThemeProvider.tsx
export const STANDARD_THEME_VARIANTS = Object.values(STANDARD_VARIANTS);
export const CORPORATE_THEME_VARIANTS = Object.values(CORPORATE_VARIANTS);

// Also export with array-like names for backward compatibility
export const standardVariants = STANDARD_THEME_VARIANTS;
export const corporateVariants = CORPORATE_THEME_VARIANTS;

// Re-export the types from the central type definition
export type { ThemeVariant, StandardThemeVariant, CorporateThemeVariant };

// Re-export the getDefaultVariant function
export { getDefaultVariant };