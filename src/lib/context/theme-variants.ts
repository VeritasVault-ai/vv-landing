// src/config/theme-variants.ts

import { ExperienceType } from "@/src/types";

// Centralized lists of valid theme variants per experience
export const standardVariants = ['standard', 'neuralliquid'] as const;
export const corporateVariants = ['corporate', 'veritasvault'] as const;

export type StandardThemeVariant = typeof standardVariants[number];
export type CorporateThemeVariant = typeof corporateVariants[number];
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
      return standardVariants[0];
    case 'corporate':
    case 'both':
      return corporateVariants[0];
    default:
      // This ensures type safety by exhaustively checking all cases
      {
        const _exhaustiveCheck: never = exp;
        return _exhaustiveCheck;
      }
  }
}
