import { createTheme } from './theme-utils';
import { standardLightTheme, standardDarkTheme } from './standard-theme';
import { corporateLightTheme, corporateDarkTheme } from './corporate-theme';
import { neuralliquidLightTheme, neuralliquidDarkTheme } from './neuralliquid-theme';
import { veritasVaultLightTheme, veritasVaultDarkTheme } from './veritasvault-theme';
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
  corporate: {
    corporate: {
      light: corporateLightTheme,
      dark: corporateDarkTheme,
    },
    veritasvault: {
      light: veritasVaultLightTheme,
      dark: veritasVaultDarkTheme,
    },
  },
};

// Helper function to get theme based on experience, variant and mode
export function getTheme(experience: ExperienceType, variant: ThemeVariant, colorMode: ColorMode) {
  // Type safety check to ensure we're using the right variant for the experience
  if (experience === 'standard' && (variant === 'corporate' || variant === 'veritasvault')) {
    variant = 'standard'; // Fallback to standard if wrong variant
  } else if (experience === 'corporate' && (variant === 'standard' || variant === 'neuralliquid')) {
    variant = 'corporate'; // Fallback to corporate if wrong variant
  }
  
  return themeRegistry[experience][variant as any][colorMode];
}

// Get default variant for an experience
export function getDefaultVariant(experience: ExperienceType): ThemeVariant {
  return experience === 'standard' ? 'standard' : 'corporate';
}

// Default theme
export const defaultTheme = standardLightTheme;

// Export all themes
export {
  standardLightTheme,
  standardDarkTheme,
  corporateLightTheme,
  corporateDarkTheme,
  neuralliquidLightTheme,
  neuralliquidDarkTheme,
  veritasVaultLightTheme,
  veritasVaultDarkTheme
};

// Re-export types for backward compatibility
export type { ExperienceType, ThemeVariant, ColorMode };