/**
 * Theme-related types
 */
import { STANDARD_VARIANTS, CORPORATE_VARIANTS, SYSTEM_VARIANTS, EXPERIENCE_TYPES, COLOR_MODES } from '../constants/theme';

export type StandardThemeVariant = typeof STANDARD_VARIANTS[number];
export type CorporateThemeVariant = typeof CORPORATE_VARIANTS[number];
export type SystemThemeVariant = typeof SYSTEM_VARIANTS[number];
export type ThemeVariant = StandardThemeVariant | CorporateThemeVariant | SystemThemeVariant;

export type ExperienceType = typeof EXPERIENCE_TYPES[keyof typeof EXPERIENCE_TYPES];
export type ColorMode = typeof COLOR_MODES[keyof typeof COLOR_MODES];

export type ThemeConfig = {
  experience: ExperienceType;
  variant: ThemeVariant;
  colorMode: ColorMode;
};