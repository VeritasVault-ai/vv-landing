import { createTheme } from './theme-utils';
import { palette } from './tokens';

/**
 * VeritasVault Dark Theme
 * Dark mode version of the VeritasVault theme with premium security aesthetics
 */
export const veritasVaultDarkTheme = createTheme({
  name: 'veritasvault-dark',
  colors: {
    primary: {
      DEFAULT: '#4299e1', // Blue 500
      foreground: '#1a202c',
      50: '#0b1622', // Very dark navy
      100: '#152a3b',
      200: '#1e3a52',
      300: '#2a4d6e',
      400: '#3c6ea3',
      500: '#4299e1',
      600: '#63b3ed',
      700: '#90cdf4',
      800: '#bee3f8',
      900: '#ebf8ff',
    },
    secondary: {
      DEFAULT: '#9f7aea', // Purple 400
      foreground: '#1a202c',
      50: '#2d1b4e',
      100: '#44337a',
      200: '#553c9a',
      300: '#6b46c1',
      400: '#805ad5',
      500: '#9f7aea',
      600: '#b794f4',
      700: '#d6bcfa',
      800: '#e9d8fd',
      900: '#faf5ff',
    },
    accent: {
      DEFAULT: '#fbbf24', // Amber 400 - gold
      foreground: '#1a202c',
      50: '#3d2e10',
      100: '#78350f',
      200: '#92400e',
      300: '#b45309',
      400: '#d97706',
      500: '#f59e0b',
      600: '#fbbf24',
      700: '#fcd34d',
      800: '#fde68a',
      900: '#fef3c7',
    },
    background: {
      DEFAULT: '#0f1629', // Dark navy
      foreground: '#f7fafc',
      muted: '#1a202c',
      subtle: '#2d3748',
      emphasized: '#4a5568',
    },
    card: {
      DEFAULT: '#1a202c',
      foreground: '#f7fafc',
      muted: '#2d3748',
      hover: '#2d3748',
    },
    border: {
      DEFAULT: '#2d3748',
      strong: '#4a5568',
      muted: '#1a202c',
    },
    text: {
      DEFAULT: '#f7fafc',
      muted: '#cbd5e0',
      subtle: '#a0aec0',
      disabled: '#718096',
      inverted: '#1a202c',
    },
    input: {
      DEFAULT: '#2d3748',
      foreground: '#f7fafc',
      placeholder: '#a0aec0',
      focus: '#4299e1',
      disabled: '#4a5568',
    },
    ring: {
      DEFAULT: '#4299e1',
    },
    muted: {
      DEFAULT: '#2d3748',
      foreground: '#cbd5e0',
    },
    popover: {
      DEFAULT: '#1a202c',
      foreground: '#f7fafc',
    },
    destructive: {
      DEFAULT: '#f56565', // Red 500
      foreground: '#1a202c',
      50: '#2a1215',
      100: '#3b1a1e',
      200: '#542329',
      300: '#742f37',
      400: '#9b3c44',
      500: '#c53030',
      600: '#e53e3e',
      700: '#f56565',
      800: '#fc8181',
      900: '#feb2b2',
    },
    success: {
      DEFAULT: '#48bb78', // Green 500
      foreground: '#1a202c',
      50: '#152116',
      100: '#1c2922',
      200: '#25372d',
      300: '#2f4a3a',
      400: '#38a169',
      500: '#48bb78',
      600: '#68d391',
      700: '#9ae6b4',
      800: '#c6f6d5',
      900: '#f0fff4',
    },
    warning: {
      DEFAULT: '#ed8936', // Orange 500
      foreground: '#1a202c',
      50: '#2b1d13',
      100: '#3d291a',
      200: '#553c24',
      300: '#744d2e',
      400: '#9c6240',
      500: '#c05621',
      600: '#dd6b20',
      700: '#ed8936',
      800: '#f6ad55',
      900: '#fbd38d',
    },
    info: {
      DEFAULT: '#63b3ed', // Blue 400
      foreground: '#1a202c',
      50: '#0e2439',
      100: '#1a3f66',
      200: '#2a5285',
      300: '#3182ce',
      400: '#4299e1',
      500: '#63b3ed',
      600: '#90cdf4',
      700: '#bee3f8',
      800: '#e2f0fd',
      900: '#ebf8ff',
    }
  },
  brand: {
    logo: '/logos/veritasvault-logo-dark.svg',
    gradient: {
      from: '#4299e1', // Blue 500
      to: '#fbbf24', // Amber 400
    },
    highlight: '#fbbf24', // Amber 400
  },
});