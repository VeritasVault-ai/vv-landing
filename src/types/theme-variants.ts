/**
 * Theme variants types
 * 
 * This file re-exports theme-related types from the central type definition
 * to maintain backward compatibility with existing imports.
 */
import { EXPERIENCE_TYPES, COLOR_MODES } from "@/src/constants/theme";
import { 
  ThemeVariant, 
  StandardThemeVariant, 
  CorporateThemeVariant,
  ExperienceType,
  ColorMode
} from "@/src/types/theme";
import { getDefaultVariant } from "@/src/utils/theme-utils";

// Re-export types from the central type definition
export type {
  ThemeVariant,
  StandardThemeVariant,
  CorporateThemeVariant,
  ExperienceType,
  ColorMode
};

// Re-export constants for backward compatibility
export { EXPERIENCE_TYPES, COLOR_MODES };

// Re-export the getDefaultVariant function
export { getDefaultVariant };

// Define a type that includes all possible experience types for the function
// (kept for backward compatibility)
export type GetDefaultVariantExperience = ExperienceType | 'both';