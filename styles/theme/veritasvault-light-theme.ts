import { createTheme } from './theme-utils';
import { palette } from './tokens';

/**
 * VeritasVault Light Theme
 * Secure, trustworthy design with navy and gold accents
 */
export const veritasVaultLightTheme = createTheme({
  name: 'veritasvault-light',
  colors: {
    primary: {
      DEFAULT: '#1a365d', // Navy blue - conveys security and trust
      foreground: palette.white,
      50: '#edf2f7',
      100: '#e2e8f0',
      200: '#cbd5e0',
      300: '#a0aec0',
      400: '#718096',
      500: '#4a5568',
      600: '#2d3748',
      700: '#1a365d', // Navy
      800: '#1a202c',
      900: '#171923',
    },
    secondary: {
      DEFAULT: '#805ad5', // Purple - conveys innovation
      foreground: palette.white,
      50: '#faf5ff',
      100: '#e9d8fd',
      200: '#d6bcfa',
      300: '#b794f4',
      400: '#9f7aea',
      500: '#805ad5',
      600: '#6b46c1',
      700: '#553c9a',
      800: '#44337a',
      900: '#322659',
    },
    accent: {
      DEFAULT: '#d69e2e', // Gold - conveys value and premium
      foreground: '#1a202c',
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    background: {
      DEFAULT: '#ffffff',
      foreground: '#1a202c',
      muted: '#f7fafc',
      subtle: '#edf2f7',
      emphasized: '#e2e8f0',
    },
    card: {
      DEFAULT: '#ffffff',
      foreground: '#1a202c',
      muted: '#f7fafc',
      hover: '#edf2f7',
    },
    border: {
      DEFAULT: '#e2e8f0',
      strong: '#cbd5e0',
      muted: '#edf2f7',
    },
    text: {
      DEFAULT: '#1a202c',
      muted: '#4a5568',
      subtle: '#718096',
      disabled: '#a0aec0',
      inverted: '#ffffff',
    },
    destructive: {
      DEFAULT: '#e53e3e',
      foreground: '#ffffff',
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
    success: {
      DEFAULT: '#38a169',
      foreground: '#ffffff',
      50: '#f0fff4',
      100: '#c6f6d5',
      200: '#9ae6b4',
      300: '#68d391',
      400: '#48bb78',
      500: '#38a169',
      600: '#2f855a',
      700: '#276749',
      800: '#22543d',
      900: '#1c4532',
    },
    warning: {
      DEFAULT: '#d69e2e',
      foreground: '#1a202c',
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    info: {
      DEFAULT: '#3182ce', // Blue 600
      foreground: '#ffffff',
      50: '#ebf8ff',
      100: '#bee3f8',
      200: '#90cdf4',
      300: '#63b3ed',
      400: '#4299e1',
      500: '#3182ce',
      600: '#2b6cb0',
      700: '#2c5282',
      800: '#2a4365',
      900: '#1A365D',
    },
    popover: {
      DEFAULT: '#ffffff',
      foreground: '#1a202c',
    },
    input: {
      DEFAULT: '#e2e8f0',
      foreground: '#1a202c',
      placeholder: '#718096',
      focus: '#1a365d',
      disabled: '#edf2f7',
    },
    ring: {
      DEFAULT: '#1a365d',
    },
    muted: {
      DEFAULT: '#f7fafc',
      foreground: '#4a5568',
    },
  },
  brand: {
    logo: '/logos/veritasvault-logo.svg',
    gradient: {
      from: '#1a365d', // Navy
      to: '#d69e2e', // Gold
    },
    highlight: '#d69e2e', // Gold
  },
});