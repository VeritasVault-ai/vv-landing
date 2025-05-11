import { createTheme } from './theme-utils';
import { palette } from './tokens';

/**
 * Standard Light Theme
 * Modern, clean design with blue primary color
 */
export const standardLightTheme = createTheme({
  name: 'standard-light',
  colors: {
    primary: {
      DEFAULT: palette.blue[500],
      foreground: palette.white,
      ...palette.blue,
    },
    secondary: {
      DEFAULT: palette.gray[200],
      foreground: palette.gray[900],
      ...palette.gray,
    },
    accent: {
      DEFAULT: palette.blue[400],
      foreground: palette.white,
      50: '#e6f7ff',
      100: '#ccefff',
      200: '#99dfff',
      300: '#66cfff',
      400: '#33bfff',
      500: '#00afff',
      600: '#008ccc',
      700: '#006999',
      800: '#004666',
      900: '#002333',
    },
    background: {
      DEFAULT: palette.white,
      foreground: palette.gray[900],
      muted: palette.gray[100],
      subtle: palette.gray[50],
      emphasized: palette.gray[200],
    },
    card: {
      DEFAULT: palette.white,
      foreground: palette.gray[900],
      muted: palette.gray[100],
      hover: palette.gray[50],
    },
    border: {
      DEFAULT: palette.gray[200],
      strong: palette.gray[400],
      muted: palette.gray[100],
    },
    text: {
      DEFAULT: palette.gray[900],
      muted: palette.gray[600],
      subtle: palette.gray[500],
      disabled: palette.gray[400],
      inverted: palette.white,
    },
    destructive: {
      DEFAULT: palette.red[500],
      foreground: palette.white,
      ...palette.red,
    },
    success: {
      DEFAULT: palette.green[500],
      foreground: palette.white,
      ...palette.green,
    },
    warning: {
      DEFAULT: palette.yellow[500],
      foreground: palette.gray[900],
      ...palette.yellow,
    },
    info: {
      DEFAULT: palette.blue[400],
      foreground: palette.white,
      ...palette.blue,
    },
    popover: {
      DEFAULT: palette.white,
      foreground: palette.gray[900],
    },
    input: {
      DEFAULT: palette.gray[200],
      foreground: palette.gray[900],
      placeholder: palette.gray[500],
      focus: palette.blue[500],
      disabled: palette.gray[300],
    },
    ring: {
      DEFAULT: palette.blue[500],
    },
    muted: {
      DEFAULT: palette.gray[100],
      foreground: palette.gray[600],
    },
  },
  brand: {
    logo: '/logos/standard-logo.svg',
    gradient: {
      from: palette.blue[400],
      to: palette.blue[600],
    },
    highlight: palette.blue[500],
  },
});