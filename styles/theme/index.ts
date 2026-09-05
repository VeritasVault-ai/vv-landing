import { standardLightTheme, standardDarkTheme } from './standard-theme';
import { neuralliquidLightTheme, neuralliquidDarkTheme } from './neuralliquid-theme';
import { ExperienceType, ThemeVariant, ColorMode } from '@/src/types';

// Theme registry organized by experience and variant
export const themeRegistry = {
  standard: {
    standard: {
      light: standardLightTheme,
      dark: standardDarkTheme,
    },
    neuralliquid: {
      light: neuralliquidLightTheme,
      dark: neuralliquidDarkTheme,
    },
  },
};

// Helper function to get theme based on experience, variant and mode
export function getTheme(_experience: ExperienceType, variant: ThemeVariant, colorMode: ColorMode) {
  const mode = colorMode === 'dark' ? 'dark' : 'light';
  const standardVariant = variant === 'neuralliquid' ? 'neuralliquid' : 'standard';
  return themeRegistry.standard[standardVariant][mode];
}

// Get default variant for an experience
export function getDefaultVariant(_experience: ExperienceType): ThemeVariant {
  return 'standard';
}

// Default theme
export const defaultTheme = standardLightTheme;

// Export all themes
export {
  standardLightTheme,
  standardDarkTheme,
  neuralliquidLightTheme,
  neuralliquidDarkTheme
};

// Re-export types for backward compatibility
export type { ExperienceType, ThemeVariant, ColorMode };
