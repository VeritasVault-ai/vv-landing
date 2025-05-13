import { CORPORATE_VARIANTS, STANDARD_VARIANTS } from "@/src/constants";
import { CorporateThemeVariant, ExperienceType, StandardThemeVariant } from "@/src/types";

/**
 * Helper to get the default variant based on experience type.
 * 
 * We maintain separate theme variants for different experiences because:
 * 1. Corporate and standard experiences have fundamentally different design requirements
 * 2. Corporate themes follow brand guidelines of enterprise clients with strict color palettes
 * 3. Standard themes can be more creative and experimental for consumer-facing applications
 * 4. Separating them prevents accidental application of consumer themes to enterprise views
 * 5. Allows for independent evolution of both theme ecosystems
 * 
 * @param exp The experience type ('standard', 'corporate', or 'both')
 * @returns The default theme variant for the given experience
 */
export function getDefaultVariant(exp: 'standard'): StandardThemeVariant;
export function getDefaultVariant(exp: 'corporate'): CorporateThemeVariant;
export function getDefaultVariant(exp: 'both'): StandardThemeVariant;
export function getDefaultVariant(exp: ExperienceType): StandardThemeVariant | CorporateThemeVariant {
  return exp === 'corporate'
    ? CORPORATE_VARIANTS[0]
    : STANDARD_VARIANTS[0];
}