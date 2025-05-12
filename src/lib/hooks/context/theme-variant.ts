// src/config/theme-variants.ts

// Helper to get the default variant based on experience
export function getDefaultVariant(exp: 'standard'): StandardThemeVariant;
export function getDefaultVariant(exp: 'corporate'): CorporateThemeVariant;
export function getDefaultVariant(exp: ExperienceType) {
  return exp === 'corporate'
    ? corporateVariants[0]
    : standardVariants[0];
}
