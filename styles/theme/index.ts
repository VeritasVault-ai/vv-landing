import { createTheme } from './theme-utils';
import { standardLightTheme, standardDarkTheme } from './standard-theme';
import { corporateLightTheme, corporateDarkTheme } from './corporate-theme';
import { neuralliquidLightTheme, neuralliquidDarkTheme } from './neuralliquid-theme';
import { veritasVaultLightTheme, veritasVaultDarkTheme } from './veritasvault-theme';

// Define the main experience types
export type ExperienceType = 'standard' | 'corporate';

// Define theme variants for each experience
export type StandardThemeVariant = 'standard' | 'neuralliquid';
export type CorporateThemeVariant = 'corporate' | 'veritasvault';

// Combined theme variant type
export type ThemeVariant = StandardThemeVariant | CorporateThemeVariant;

export type ColorMode = 'light' | 'dark';

export type ThemeConfig = {
  experience: ExperienceType;
  variant: ThemeVariant;
  colorMode: ColorMode;
};

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