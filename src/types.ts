/**
 * Theme and UI configuration types and constants
 */

// Theme variants as constants with type safety
export const STANDARD_VARIANTS = ['standard', 'neuralliquid', 'cosmic'] as const;
export const CORPORATE_VARIANTS = ['corporate', 'veritasvault'] as const;
export const SYSTEM_VARIANTS = ['light', 'dark'] as const;

// Experience types as constants
export const EXPERIENCE_TYPES = {
  STANDARD: 'standard',
  CORPORATE: 'corporate',
  BOTH: 'both',
} as const;

// Color modes as constants
export const COLOR_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

// Navigation item types as constants
export const NAVIGATION_ITEM_TYPES = {
  LINK: 'link',
  DROPDOWN: 'dropdown',
  BUTTON: 'button',
  SEPARATOR: 'separator',
} as const;

// Position types as constants
export const POSITION_TYPES = {
  HEADER: 'header',
  FOOTER: 'footer',
  BOTH: 'both',
} as const;

// Icon positions as constants
export const ICON_POSITIONS = {
  LEFT: 'left',
  RIGHT: 'right',
  TOP: 'top',
  BOTTOM: 'bottom',
  NONE: 'none',
  BOTH: 'both',
} as const;

// Icon sizes as constants
export const ICON_SIZES = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
  '2XL': '2xl',
  '3XL': '3xl',
  '4XL': '4xl',
  '5XL': '5xl',
  CUSTOM: 'custom',
} as const;

// Derived types from constants
export type StandardThemeVariant = typeof STANDARD_VARIANTS[number];
export type CorporateThemeVariant = typeof CORPORATE_VARIANTS[number];
export type SystemThemeVariant = typeof SYSTEM_VARIANTS[number];
export type ThemeVariant = StandardThemeVariant | CorporateThemeVariant | SystemThemeVariant;

export type ExperienceType = typeof EXPERIENCE_TYPES[keyof typeof EXPERIENCE_TYPES];
export type ColorMode = typeof COLOR_MODES[keyof typeof COLOR_MODES];
export type NavigationItemType = typeof NAVIGATION_ITEM_TYPES[keyof typeof NAVIGATION_ITEM_TYPES];
export type PositionType = typeof POSITION_TYPES[keyof typeof POSITION_TYPES];
export type IconPosition = typeof ICON_POSITIONS[keyof typeof ICON_POSITIONS];
export type IconSize = typeof ICON_SIZES[keyof typeof ICON_SIZES];

// Configuration types
export type ThemeConfig = {
  experience: ExperienceType;
  variant: ThemeVariant;
  colorMode: ColorMode;
};