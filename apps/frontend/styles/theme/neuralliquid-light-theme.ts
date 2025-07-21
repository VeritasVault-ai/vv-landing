import { createTheme } from './theme-utils';
import { palette } from './tokens';

/**
 * NeuralLiquid Light Theme
 * Modern, tech-focused design with purple/violet accents
 */
export const neuralliquidLightTheme = createTheme({
  name: 'neuralliquid-light',
  colors: {
    primary: {
      DEFAULT: '#7c3aed', // Violet 600
      foreground: palette.white,
      50: '#f5f3ff',
      100: '#ede9fe',
      200: '#ddd6fe',
      300: '#c4b5fd',
      400: '#a78bfa',
      500: '#8b5cf6',
      600: '#7c3aed',
      700: '#6d28d9',
      800: '#5b21b6',
      900: '#4c1d95',
    },
    secondary: {
      DEFAULT: '#1e293b', // Slate 800
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
      DEFAULT: '#06b6d4', // Cyan 500
      foreground: palette.white,
      50: '#ecfeff',
      100: '#cffafe',
      200: '#a5f3fc',
      300: '#67e8f9',
      400: '#22d3ee',
      500: '#06b6d4',
      600: '#0891b2',
      700: '#0e7490',
      800: '#155e75',
      900: '#164e63',
    },
    background: {
      DEFAULT: '#ffffff',
      foreground: '#0f172a', // Slate 900
      muted: '#f8fafc', // Slate 50
      subtle: '#f1f5f9', // Slate 100
      emphasized: '#e2e8f0', // Slate 200
    },
    card: {
      DEFAULT: '#ffffff',
      foreground: '#0f172a', // Slate 900
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
      inverted: '#ffffff',
    },
    destructive: {
      DEFAULT: '#ef4444', // Red 500
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
      DEFAULT: '#10b981', // Emerald 500
      foreground: '#ffffff',
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
      DEFAULT: '#f59e0b', // Amber 500
      foreground: '#ffffff',
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
      DEFAULT: '#3b82f6', // Blue 500
      foreground: '#ffffff',
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    popover: {
      DEFAULT: '#ffffff',
      foreground: '#0f172a',
    },
    input: {
      DEFAULT: '#e2e8f0', // Slate 200
      foreground: '#0f172a', // Slate 900
      placeholder: '#64748b', // Slate 500
      focus: '#7c3aed', // Violet 600
      disabled: '#cbd5e1', // Slate 300
    },
    ring: {
      DEFAULT: '#7c3aed', // Violet 600
    },
    muted: {
      DEFAULT: '#f8fafc', // Slate 50
      foreground: '#64748b', // Slate 500
    },
  },
  brand: {
    logo: '/logos/neuralliquid-logo.png',
    gradient: {
      from: '#7c3aed', // Violet 600
      to: '#06b6d4', // Cyan 500
    },
    highlight: '#8b5cf6', // Violet 500
  },
});