import { Theme } from './theme-utils';
import { themeRegistry } from './index';

/**
 * Generates CSS variables from a theme object
 * @param theme The theme object to convert to CSS variables
 * @returns A string of CSS variables
 */
export function generateCssVariables(theme: Theme): string {
  const variables: string[] = [];
  
  // Process colors
  processObject('', theme.colors, variables);
  
  // Process brand
  processObject('brand', theme.brand, variables);
  
  return variables.join('\n  ');
}

/**
 * Recursively processes an object to generate CSS variables
 */
function processObject(prefix: string, obj: any, result: string[]): void {
  for (const [key, value] of Object.entries(obj)) {
    const varName = prefix ? `--${prefix}-${key}` : `--${key}`;
    
    if (typeof value === 'object' && value !== null) {
      // Handle nested objects
      if (key === 'DEFAULT') {
        // For DEFAULT, use the parent prefix
        result.push(`${prefix ? `--${prefix}` : ''}: ${value};`);
      } else if (key === 'foreground') {
        // For foreground, append -foreground to the parent prefix
        result.push(`${prefix ? `--${prefix}-foreground` : '--foreground'}: ${value};`);
      } else {
        // For other objects, recurse with updated prefix
        const newPrefix = prefix ? `${prefix}-${key}` : key;
        processObject(newPrefix, value, result);
      }
    } else {
      // Handle primitive values
      result.push(`${varName}: ${value};`);
    }
  }
}

/**
 * Creates a CSS class for a theme
 * @param theme The theme object
 * @param className The class name to use
 * @returns A CSS class string
 */
export function createThemeClass(theme: Theme, className: string = ''): string {
  const selector = className ? `.${className}` : ':root';
  const variables = generateCssVariables(theme);
  
  return `
${selector} {
  ${variables}
}`;
}

/**
 * Creates CSS for all themes
 * @returns Complete CSS for all themes
 */
export function createThemesCss(): string {
  let css = '';
  
  // Standard Experience - Standard Theme (Default)
  css += createThemeClass(themeRegistry.standard.standard.light);
  
  // Standard Experience - Standard Theme (Dark)
  css += `
.dark {
  ${generateCssVariables(themeRegistry.standard.standard.dark)}
}`;
  
  // Standard Experience - NeuralLiquid Theme (Light)
  css += `
.theme-neuralliquid {
  ${generateCssVariables(themeRegistry.standard.neuralliquid.light)}
}`;
  
  // Standard Experience - NeuralLiquid Theme (Dark)
  css += `
.dark.theme-neuralliquid {
  ${generateCssVariables(themeRegistry.standard.neuralliquid.dark)}
}`;
  
  // Corporate Experience - Corporate Theme (Light)
  css += `
.experience-corporate {
  ${generateCssVariables(themeRegistry.corporate.corporate.light)}
}`;
  
  // Corporate Experience - Corporate Theme (Dark)
  css += `
.dark.experience-corporate {
  ${generateCssVariables(themeRegistry.corporate.corporate.dark)}
}`;
  
  // Corporate Experience - VeritasVault Theme (Light)
  css += `
.experience-corporate.theme-veritasvault {
  ${generateCssVariables(themeRegistry.corporate.veritasvault.light)}
}`;
  
  // Corporate Experience - VeritasVault Theme (Dark)
  css += `
.dark.experience-corporate.theme-veritasvault {
  ${generateCssVariables(themeRegistry.corporate.veritasvault.dark)}
}`;
  
  return css;
}