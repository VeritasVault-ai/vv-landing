/**
 * Theme-related constants
 */

// Theme variants
export const STANDARD_VARIANTS = {
  STANDARD: 'standard',
  NEURALLIQUID: 'neuralliquid',
  COSMIC: 'cosmic'
} as const;

export const CORPORATE_VARIANTS = {
  CORPORATE: 'corporate',
  VERITASVAULT: 'veritasvault'
} as const;

export const SYSTEM_VARIANTS = ['light', 'dark'] as const;

// Experience types
export const EXPERIENCE_TYPES = {
  STANDARD: 'standard',
  CORPORATE: 'corporate',
  BOTH: 'both',
} as const;

// Color modes
export const COLOR_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;