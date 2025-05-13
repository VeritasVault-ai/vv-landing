import { CORPORATE_VARIANTS, STANDARD_VARIANTS } from "@/src/constants";
import { CorporateThemeVariant, ExperienceType, StandardThemeVariant } from "@/src/types";
import { ThemeVariant } from "../../types";

// Helper to get the default variant based on experience
export function getDefaultVariant(exp: 'standard'): StandardThemeVariant;
export function getDefaultVariant(exp: 'corporate'): CorporateThemeVariant;
export function getDefaultVariant(exp: 'both'): StandardThemeVariant;
export function getDefaultVariant(exp: ExperienceType): ThemeVariant {
  return exp === 'corporate'
    ? CORPORATE_VARIANTS[0]
    : STANDARD_VARIANTS[0];
}