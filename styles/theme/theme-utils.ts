import { palette } from './tokens';

/**
 * Theme interface defining the structure of our theme objects
 */
export interface Theme {
  name: string;
  colors: {
    // Semantic colors
    primary: {
      DEFAULT: string;
      foreground: string;
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
    secondary: {
      DEFAULT: string;
      foreground: string;
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
    accent: {
      DEFAULT: string;
      foreground: string;
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
    destructive: {
      DEFAULT: string;
      foreground: string;
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
    success: {
      DEFAULT: string;
      foreground: string;
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
    warning: {
      DEFAULT: string;
      foreground: string;
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
    info: {
      DEFAULT: string;
      foreground: string;
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
    
    // UI element colors
    background: {
      DEFAULT: string;
      foreground: string;
      muted: string;
      subtle: string;
      emphasized: string;
    };
    card: {
      DEFAULT: string;
      foreground: string;
      muted: string;
      hover: string;
    };
    popover: {
      DEFAULT: string;
      foreground: string;
    };
    border: {
      DEFAULT: string;
      strong: string;
      muted: string;
    };
    input: {
      DEFAULT: string;
      foreground: string;
      placeholder: string;
      focus: string;
      disabled: string;
    };
    ring: {
      DEFAULT: string;
    };
    
    // Text colors
    text: {
      DEFAULT: string;
      muted: string;
      subtle: string;
      disabled: string;
      inverted: string;
    };
    
    // Miscellaneous
    muted: {
      DEFAULT: string;
      foreground: string;
    };
  };
  
  // Brand-specific properties
  brand: {
    logo: string;
    gradient: {
      from: string;
      to: string;
    };
    highlight: string;
  };
}

/**
 * Create a theme with sensible defaults
 */
export function createTheme(options: Partial<Theme>): Theme {
  // Default theme with reasonable values
  const defaultTheme: Theme = {
    name: 'default',
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
        DEFAULT: palette.blue[500],
        foreground: palette.white,
        ...palette.blue,
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
        foreground: palette.white,
        ...palette.yellow,
      },
      info: {
        DEFAULT: palette.blue[300],
        foreground: palette.white,
        ...palette.blue,
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
      popover: {
        DEFAULT: palette.white,
        foreground: palette.gray[900],
      },
      border: {
        DEFAULT: palette.gray[200],
        strong: palette.gray[400],
        muted: palette.gray[100],
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
      text: {
        DEFAULT: palette.gray[900],
        muted: palette.gray[600],
        subtle: palette.gray[500],
        disabled: palette.gray[400],
        inverted: palette.white,
      },
      muted: {
        DEFAULT: palette.gray[100],
        foreground: palette.gray[600],
      },
    },
    brand: {
      logo: '/logo.svg',
      gradient: {
        from: palette.blue[500],
        to: palette.blue[700],
      },
      highlight: palette.blue[500],
    },
  };

  // Deep merge the provided options with the default theme
  return deepMerge(defaultTheme, options);
}

/**
 * Helper function to deep merge objects
 */
function deepMerge<T>(target: T, source: Partial<T>): T {
  const result = { ...target };
  
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(result, { [key]: source[key] });
        } else {
          result[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(result, { [key]: source[key] });
      }
    });
  }
  
  return result;
}

/**
 * Helper function to check if a value is an object
 */
function isObject(item: any): item is Record<string, any> {
  return (item && typeof item === 'object' && !Array.isArray(item));
}