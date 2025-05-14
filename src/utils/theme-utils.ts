/**
 * Theme utility functions
 */
import { CORPORATE_VARIANTS, EXPERIENCE_TYPES, STANDARD_VARIANTS } from "@/src/constants/theme";
import { ExperienceType, ThemeVariant, StandardThemeVariant, CorporateThemeVariant } from "@/src/types/theme";

/**
 * Retrieves the default theme variant associated with a given experience type.
 *
 * If the experience type is unrecognized, the standard default variant is returned.
 *
 * @param exp - The experience type to determine the default variant for.
 * @returns The default theme variant corresponding to {@link exp}.
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
 * Retrieves all theme variants available for a given experience type.
 *
 * Returns standard variants, corporate variants, or both, depending on the specified experience type.
 * If the experience type is unrecognized, standard variants are returned by default.
 *
 * @returns An array of theme variants corresponding to the specified experience type.
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
 * Determines whether the given theme variant is part of the standard experience variants.
 *
 * @returns True if {@link variant} is a standard theme variant; otherwise, false.
 */
export function isStandardVariant(variant: ThemeVariant): variant is StandardThemeVariant {
  return Object.values(STANDARD_VARIANTS).includes(variant as any);
}

/**
 * Determines whether the given theme variant is a corporate variant.
 *
 * @returns True if {@link variant} is part of the corporate theme variants; otherwise, false.
 */
export function isCorporateVariant(variant: ThemeVariant): variant is CorporateThemeVariant {
  return Object.values(CORPORATE_VARIANTS).includes(variant as any);
}