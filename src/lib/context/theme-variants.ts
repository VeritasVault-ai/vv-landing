// src/config/theme-variants.ts

// Centralized lists of valid theme variants per experience
export const standardVariants = ['standard', 'neuralliquid'] as const;
export const corporateVariants = ['corporate', 'veritasvault'] as const;

export type StandardThemeVariant = typeof standardVariants[number];
export type CorporateThemeVariant = typeof corporateVariants[number];
export type ThemeVariant = StandardThemeVariant | CorporateThemeVariant;

// Helper to get the default variant based on experience
export function getDefaultVariant(exp: 'standard'): StandardThemeVariant;
export function getDefaultVariant(exp: 'corporate'): CorporateThemeVariant;
export function getDefaultVariant(exp: ExperienceType) {
  return exp === 'corporate'
    ? corporateVariants[0]
    : standardVariants[0];
}
