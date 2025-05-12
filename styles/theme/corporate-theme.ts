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
      950: '#020617',
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

/**
 * Corporate Dark Theme
 * Dark mode version of the corporate theme
 */
export const corporateDarkTheme = createTheme({
  name: 'corporate-dark',
  colors: {
    primary: {
      DEFAULT: '#3b82f6', // Blue 500
      foreground: palette.white,
      50: '#0a1a2a',
      100: '#102a43',
      200: '#1a4971',
      300: '#2563eb', // Blue 600
      400: '#3b82f6', // Blue 500
      500: '#60a5fa', // Blue 400
      600: '#93c5fd', // Blue 300
      700: '#bfdbfe', // Blue 200
      800: '#dbeafe', // Blue 100
      900: '#eff6ff', // Blue 50
    },
    secondary: {
      DEFAULT: '#475569', // Slate 600
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
      950: '#020617',
    },
    accent: {
      DEFAULT: '#10b981', // Emerald 500
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
      DEFAULT: '#0f172a', // Slate 900
      foreground: '#f1f5f9', // Slate 100
      muted: '#1e293b', // Slate 800
      subtle: '#334155', // Slate 700
      emphasized: '#475569', // Slate 600
    },
    card: {
      DEFAULT: '#1e293b', // Slate 800
      foreground: '#f1f5f9', // Slate 100
      muted: '#334155', // Slate 700
      hover: '#334155', // Slate 700
    },
    border: {
      DEFAULT: '#334155', // Slate 700
      strong: '#475569', // Slate 600
      muted: '#1e293b', // Slate 800
    },
    text: {
      DEFAULT: '#f1f5f9', // Slate 100
      muted: '#cbd5e1', // Slate 300
      subtle: '#94a3b8', // Slate 400
      disabled: '#64748b', // Slate 500
      inverted: '#0f172a', // Slate 900
    },
    input: {
      DEFAULT: '#334155', // Slate 700
      foreground: '#f1f5f9', // Slate 100
      placeholder: '#94a3b8', // Slate 400
      focus: '#3b82f6', // Blue 500
      disabled: '#475569', // Slate 600
    },
    ring: {
      DEFAULT: '#3b82f6', // Blue 500
    },
    muted: {
      DEFAULT: '#1e293b', // Slate 800
      foreground: '#cbd5e1', // Slate 300
    },
  },
  brand: {
    logo: '/logos/corporate-logo-dark.svg',
    gradient: {
      from: '#3b82f6', // Blue 500
      to: '#2563eb', // Blue 600
    },
    highlight: '#10b981', // Emerald 500
  },
});