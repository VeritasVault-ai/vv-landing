import { createTheme } from './theme-utils';

/**
 * NeuralLiquid Dark Theme
 * Dark mode version of the neuralliquid theme with futuristic tech aesthetics
 */
export const neuralliquidDarkTheme = createTheme({
  name: 'neuralliquid-dark',
  colors: {
    primary: {
      DEFAULT: '#a78bfa', // Violet 400
      foreground: '#000000',
      50: '#2e1065', // Violet 950
      100: '#4c1d95', // Violet 900
      200: '#5b21b6', // Violet 800
      300: '#6d28d9', // Violet 700
      400: '#7c3aed', // Violet 600
      500: '#8b5cf6', // Violet 500
      600: '#a78bfa', // Violet 400
      700: '#c4b5fd', // Violet 300
      800: '#ddd6fe', // Violet 200
      900: '#ede9fe', // Violet 100
    },
    secondary: {
      DEFAULT: '#94a3b8', // Slate 400
      foreground: '#000000',
      50: '#f8fafc', // Slate 50
      100: '#f1f5f9', // Slate 100
      200: '#e2e8f0', // Slate 200
      300: '#cbd5e1', // Slate 300
      400: '#94a3b8', // Slate 400
      500: '#64748b', // Slate 500
      600: '#475569', // Slate 600
      700: '#334155', // Slate 700
      800: '#1e293b', // Slate 800
      900: '#0f172a', // Slate 900
    },
    accent: {
      DEFAULT: '#22d3ee', // Cyan 400
      foreground: '#000000',
      50: '#ecfeff', // Cyan 50
      100: '#cffafe', // Cyan 100
      200: '#a5f3fc', // Cyan 200
      300: '#67e8f9', // Cyan 300
      400: '#22d3ee', // Cyan 400
      500: '#06b6d4', // Cyan 500
      600: '#0891b2', // Cyan 600
      700: '#0e7490', // Cyan 700
      800: '#155e75', // Cyan 800
      900: '#164e63', // Cyan 900
    },
    background: {
      DEFAULT: '#0f172a', // Slate 900
      foreground: '#f8fafc', // Slate 50
      muted: '#1e293b', // Slate 800
      subtle: '#334155', // Slate 700
      emphasized: '#475569', // Slate 600
    },
    card: {
      DEFAULT: '#1e293b', // Slate 800
      foreground: '#f8fafc', // Slate 50
      muted: '#334155', // Slate 700
      hover: '#334155', // Slate 700
    },
    border: {
      DEFAULT: '#334155', // Slate 700
      strong: '#475569', // Slate 600
      muted: '#1e293b', // Slate 800
    },
    text: {
      DEFAULT: '#f8fafc', // Slate 50
      muted: '#cbd5e1', // Slate 300
      subtle: '#94a3b8', // Slate 400
      disabled: '#64748b', // Slate 500
      inverted: '#0f172a', // Slate 900
    },
    destructive: {
      DEFAULT: '#f87171', // Red 400
      foreground: '#000000',
      50: '#fef2f2', // Red 50
      100: '#fee2e2', // Red 100
      200: '#fecaca', // Red 200
      300: '#fca5a5', // Red 300
      400: '#f87171', // Red 400
      500: '#ef4444', // Red 500
      600: '#dc2626', // Red 600
      700: '#b91c1c', // Red 700
      800: '#991b1b', // Red 800
      900: '#7f1d1d', // Red 900
    },
    success: {
      DEFAULT: '#34d399', // Emerald 400
      foreground: '#000000',
      50: '#ecfdf5', // Emerald 50
      100: '#d1fae5', // Emerald 100
      200: '#a7f3d0', // Emerald 200
      300: '#6ee7b7', // Emerald 300
      400: '#34d399', // Emerald 400
      500: '#10b981', // Emerald 500
      600: '#059669', // Emerald 600
      700: '#047857', // Emerald 700
      800: '#065f46', // Emerald 800
      900: '#064e3b', // Emerald 900
    },
    warning: {
      DEFAULT: '#fbbf24', // Amber 400
      foreground: '#000000',
      50: '#fffbeb', // Amber 50
      100: '#fef3c7', // Amber 100
      200: '#fde68a', // Amber 200
      300: '#fcd34d', // Amber 300
      400: '#fbbf24', // Amber 400
      500: '#f59e0b', // Amber 500
      600: '#d97706', // Amber 600
      700: '#b45309', // Amber 700
      800: '#92400e', // Amber 800
      900: '#78350f', // Amber 900
    },
    info: {
      DEFAULT: '#60a5fa', // Blue 400
      foreground: '#000000',
      50: '#082f49', // Blue 950
      100: '#0c4a6e', // Blue 900
      200: '#075985', // Blue 800
      300: '#0369a1', // Blue 700
      400: '#0284c7', // Blue 600
      500: '#0ea5e9', // Blue 500
      600: '#38bdf8', // Blue 400
      700: '#7dd3fc', // Blue 300
      800: '#bae6fd', // Blue 200
      900: '#e0f2fe', // Blue 100
    },
    input: {
      DEFAULT: '#334155', // Slate 700
      foreground: '#f8fafc', // Slate 50
      placeholder: '#94a3b8', // Slate 400
      focus: '#a78bfa', // Violet 400
      disabled: '#475569', // Slate 600
    },
    ring: {
      DEFAULT: '#a78bfa', // Violet 400
    },
    muted: {
      DEFAULT: '#1e293b', // Slate 800
      foreground: '#cbd5e1', // Slate 300
    },
    popover: {
      DEFAULT: '#1e293b', // Slate 800
      foreground: '#f8fafc', // Slate 50
    },
  },
  brand: {
    logo: '/logos/neuralliquid-logo-dark.svg',
    gradient: {
      from: '#a78bfa', // Violet 400
      to: '#22d3ee', // Cyan 400
    },
    highlight: '#a78bfa', // Violet 400
  },
});