import { CORPORATE_VARIANTS, STANDARD_VARIANTS } from "@/src/constants/theme";
import { ExperienceType } from "@/src/types";

// Experience types as constants
export const EXPERIENCE_TYPES = {
  STANDARD: 'standard',
  CORPORATE: 'corporate',
  BOTH: 'both',
} as const;

// Color modes as constants
export const COLOR_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

// Define types based on the imported constants
export type StandardThemeVariant = typeof STANDARD_VARIANTS[keyof typeof STANDARD_VARIANTS];
export type CorporateThemeVariant = typeof CORPORATE_VARIANTS[keyof typeof CORPORATE_VARIANTS];
export type ThemeVariant = StandardThemeVariant | CorporateThemeVariant;

// Define a type that includes all possible experience types for the function
export type GetDefaultVariantExperience = ExperienceType | 'both';

// Helper to get the default variant based on experience
export function getDefaultVariant(exp: 'standard'): StandardThemeVariant;
export function getDefaultVariant(exp: 'corporate'): CorporateThemeVariant;
export function getDefaultVariant(exp: 'both'): CorporateThemeVariant;

/**
 * Returns the default theme variant for the specified experience type.
 *
 * @param exp - The experience type, either 'standard', 'corporate', or 'both'.
 * @returns The default theme variant string for the given experience type.
 */
export function getDefaultVariant(exp: GetDefaultVariantExperience): ThemeVariant {
  switch (exp) {
    case 'standard':
      return STANDARD_VARIANTS.STANDARD;
    case 'corporate':
      return CORPORATE_VARIANTS.CORPORATE;
    case 'both':
      return CORPORATE_VARIANTS.CORPORATE;
    default:
      // This ensures type safety by exhaustively checking all cases
      const _exhaustiveCheck: never = exp;
      return _exhaustiveCheck; // This line will never execute if all cases are handled
  }
}