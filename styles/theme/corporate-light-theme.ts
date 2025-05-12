import { createTheme } from './theme-utils';
import { palette } from './tokens';

/**
 * Corporate Light Theme
 * Professional, enterprise-focused design with deeper blue and more conservative styling
 */
export const corporateLightTheme = createTheme({
  name: 'corporate-light',
  colors: {
    primary: {
      DEFAULT: '#0a3977', // Deeper blue for corporate look
      foreground: palette.white,
      50: '#e6edf7',
      100: '#ccdaef',
      200: '#99b5df',
      300: '#6690cf',
      400: '#336bbf',
      500: '#0046af',
      600: '#00388c',
      700: '#002a69',
      800: '#001c46',
      900: '#000e23',
    },
    secondary: {
      DEFAULT: '#475569', // Slate gray
      foreground: palette.white,
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
    accent: {
      DEFAULT: '#10b981', // Emerald for corporate accent
      foreground: palette.white,
      50: '#ecfdf5',
      100: '#d1fae5',
      200: '#a7f3d0',
      300: '#6ee7b7',
      400: '#34d399',
      500: '#10b981',
      600: '#059669',
      700: '#047857',
      800: '#065f46',
      900: '#064e3b',
    },
    background: {
      DEFAULT: palette.white,
      foreground: '#1e293b', // Slate 800
      muted: '#f8fafc', // Slate 50
      subtle: '#f1f5f9', // Slate 100
      emphasized: '#e2e8f0', // Slate 200
    },
    card: {
      DEFAULT: palette.white,
      foreground: '#1e293b', // Slate 800
      muted: '#f8fafc', // Slate 50
      hover: '#f1f5f9', // Slate 100
    },
    border: {
      DEFAULT: '#e2e8f0', // Slate 200
      strong: '#cbd5e1', // Slate 300
      muted: '#f1f5f9', // Slate 100
    },
    text: {
      DEFAULT: '#0f172a', // Slate 900
      muted: '#334155', // Slate 700
      subtle: '#475569', // Slate 600
      disabled: '#94a3b8', // Slate 400
      inverted: palette.white,
    },
    destructive: {
      DEFAULT: '#dc2626', // Red 600
      foreground: palette.white,
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
      DEFAULT: '#059669', // Emerald 600
      foreground: palette.white,
      50: '#ecfdf5',
      100: '#d1fae5',
      200: '#a7f3d0',
      300: '#6ee7b7',
      400: '#34d399',
      500: '#10b981',
      600: '#059669',
      700: '#047857',
      800: '#065f46',
      900: '#064e3b',
    },
    warning: {
      DEFAULT: '#d97706', // Amber 600
      foreground: palette.white,
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
      DEFAULT: '#0284c7', // Sky 600
      foreground: palette.white,
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
    popover: {
      DEFAULT: palette.white,
      foreground: '#1e293b', // Slate 800
    },
    input: {
      DEFAULT: '#f1f5f9', // Slate 100
      foreground: '#0f172a', // Slate 900
      placeholder: '#64748b', // Slate 500
      focus: '#0a3977', // Primary
      disabled: '#e2e8f0', // Slate 200
    },
    ring: {
      DEFAULT: '#0a3977', // Primary
    },
    muted: {
      DEFAULT: '#f8fafc', // Slate 50
      foreground: '#475569', // Slate 600
    },
  },
  brand: {
    logo: '/logos/corporate-logo.svg',
    gradient: {
      from: '#0a3977', // Corporate primary
      to: '#002a69', // Corporate primary 700
    },
    highlight: '#10b981', // Emerald accent
  },
});