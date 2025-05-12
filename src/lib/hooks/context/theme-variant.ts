// src/config/theme-variants.ts

// Helper to get the default variant based on experience
export function getDefaultVariant(exp: 'standard'): StandardThemeVariant;
export function getDefaultVariant(exp: 'corporate'): CorporateThemeVariant;
/**
 * Returns the default theme variant for the specified experience type.
 *
 * @param exp - The experience type, either 'standard' or 'corporate'.
 * @returns The first variant from {@link corporateVariants} if {@link exp} is 'corporate', otherwise the first variant from {@link standardVariants}.
 */
export function getDefaultVariant(exp: ExperienceType) {
  return exp === 'corporate'
    ? corporateVariants[0]
    : standardVariants[0];
}
