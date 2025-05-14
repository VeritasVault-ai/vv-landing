/**
 * Theme utility functions
 */
import { CORPORATE_VARIANTS, EXPERIENCE_TYPES, STANDARD_VARIANTS } from "@/src/constants/theme";
import { ExperienceType, ThemeVariant, StandardThemeVariant, CorporateThemeVariant } from "@/src/types/theme";

/**
 * Returns the default theme variant for the specified experience type.
 *
 * @param exp - The experience type, either 'standard', 'corporate', or 'both'.
 * @returns The default theme variant string for the given experience type.
 */
export function getDefaultVariant(exp: ExperienceType): ThemeVariant {
  switch (exp) {
    case EXPERIENCE_TYPES.STANDARD:
      return STANDARD_VARIANTS.STANDARD;
    case EXPERIENCE_TYPES.CORPORATE:
    case EXPERIENCE_TYPES.BOTH:
      return CORPORATE_VARIANTS.CORPORATE;
    default:
      return STANDARD_VARIANTS.STANDARD;
  }
}

/**
 * Returns all available theme variants for the specified experience type.
 *
 * @param exp - The experience type, either 'standard', 'corporate', or 'both'.
 * @returns An array of theme variants available for the given experience type.
 */
export function getAvailableVariants(exp: ExperienceType): ThemeVariant[] {
  switch (exp) {
    case EXPERIENCE_TYPES.STANDARD:
      return Object.values(STANDARD_VARIANTS);
    case EXPERIENCE_TYPES.CORPORATE:
      return Object.values(CORPORATE_VARIANTS);
    case EXPERIENCE_TYPES.BOTH:
      return [...Object.values(STANDARD_VARIANTS), ...Object.values(CORPORATE_VARIANTS)];
    default:
      return Object.values(STANDARD_VARIANTS);
  }
}

/**
 * Checks if a theme variant belongs to the standard experience.
 *
 * @param variant - The theme variant to check.
 * @returns True if the variant is a standard variant, false otherwise.
 */
export function isStandardVariant(variant: ThemeVariant): variant is StandardThemeVariant {
  return Object.values(STANDARD_VARIANTS).includes(variant as any);
}

/**
 * Checks if a theme variant belongs to the corporate experience.
 *
 * @param variant - The theme variant to check.
 * @returns True if the variant is a corporate variant, false otherwise.
 */
export function isCorporateVariant(variant: ThemeVariant): variant is CorporateThemeVariant {
  return Object.values(CORPORATE_VARIANTS).includes(variant as any);
}