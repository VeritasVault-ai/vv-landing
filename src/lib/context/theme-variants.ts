// src/config/theme-variants.ts

// Centralized lists of valid theme variants per experience
export const standardVariants = ['standard', 'neuralliquid'] as const;
export const corporateVariants = ['corporate', 'veritasvault'] as const;

export type StandardThemeVariant = typeof standardVariants[number];
export type CorporateThemeVariant = typeof corporateVariants[number];
export type ThemeVariant = StandardThemeVariant | CorporateThemeVariant;

import type { ExperienceType } from '@/types';

// Helper to get the default variant based on experience
export function getDefaultVariant(exp: 'standard'): StandardThemeVariant;
export function getDefaultVariant(exp: 'corporate'): CorporateThemeVariant;
export function getDefaultVariant(exp: ExperienceType): ThemeVariant {
  return exp === 'corporate'
    ? corporateVariants[0]
    : exp === 'both'
      ? standardVariants[0] // Default to standard for 'both' case
      : standardVariants[0];
}
