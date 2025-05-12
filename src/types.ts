
export const standardVariants = ['standard', 'neuralliquid', 'cosmic'] as const;
export const corporateVariants = ['corporate', 'veritasvault'] as const;
export const systemVariants = ['light', 'dark'] as const;

export type ExperienceType = 'standard' | 'corporate' | 'both'
export type ColorMode = 'light' | 'dark' | 'system';

export type ThemeConfig = {
  experience: ExperienceType;
  variant: ThemeVariant;
  colorMode: ColorMode;
};

export type StandardThemeVariant = typeof standardVariants[number];
export type CorporateThemeVariant = typeof corporateVariants[number];
export type SystemThemeVariant = typeof systemVariants[number];
export type ThemeVariant = StandardThemeVariant | CorporateThemeVariant | SystemThemeVariant;

export type NavigationItemType = 'link' | 'dropdown' | 'button' | 'separator'
export type PositionType = 'header' | 'footer' | 'both'
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'custom';
export type IconPosition = 'left' | 'right' | 'top' | 'bottom' | 'none' | 'both';
