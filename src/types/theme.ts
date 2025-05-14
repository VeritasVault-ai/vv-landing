/**
 * Theme-related types
 */
import { COLOR_MODES, CORPORATE_VARIANTS, EXPERIENCE_TYPES, STANDARD_VARIANTS } from '../constants/theme';

// Theme variant types
export type StandardThemeVariant = typeof STANDARD_VARIANTS[keyof typeof STANDARD_VARIANTS];
export type CorporateThemeVariant = typeof CORPORATE_VARIANTS[keyof typeof CORPORATE_VARIANTS];
export type ThemeVariant = StandardThemeVariant | CorporateThemeVariant;

export type ExperienceType = typeof EXPERIENCE_TYPES[keyof typeof EXPERIENCE_TYPES];
export type ColorMode = typeof COLOR_MODES[keyof typeof COLOR_MODES];

export interface ThemeOption {
  id: string;
  name: string;
  description: string;
}
export interface ThemeConfig {
  experience: ExperienceType;
  variant: ThemeVariant;
  colorMode: ColorMode;
  themeOption?: ThemeOption;
}
