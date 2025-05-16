"use client"

/**
 * Generates the theme initialization script as a string for immediate application on page load.
 *
 * The script determines the theme to apply by checking the `theme` URL parameter, then `localStorage` under `'theme-preference'`, and defaults to `'corporate-light'` if neither is set. It extracts the color mode from the theme string and applies the corresponding CSS class and `colorScheme` style to the document root. If the theme is set via URL, it updates `localStorage` accordingly. On error, it logs the issue and ensures the document falls back to light mode.
 *
 * @returns The theme initialization script as a string.
 */
function getThemeScriptContent() {
  return `
    (function() {
      try {
        // Get theme from URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const themeParam = urlParams.get('theme');
        
        // Get stored theme from localStorage
        const storedTheme = localStorage.getItem('theme-preference');
        
        // Determine which theme to use (URL param takes precedence)
        const theme = themeParam || storedTheme || 'corporate-light';
        
        // Extract color mode with validation
        let colorMode = 'light'; // Default fallback
        if (theme.includes('-')) {
          const themeParts = theme.split('-');
          if (themeParts.length >= 2) {
            colorMode = themeParts[1];
          }
        }
        
        // Apply dark mode immediately if needed
        if (colorMode === 'dark') {
          document.documentElement.classList.add('dark');
          document.documentElement.style.colorScheme = 'dark';
        } else {
          document.documentElement.classList.remove('dark');
          document.documentElement.style.colorScheme = 'light';
        }
        
        // Store the preference if from URL
        if (themeParam) {
          localStorage.setItem('theme-preference', themeParam);
        }
      } catch (e) {
        console.error('Error in theme initialization script:', e);
        // Ensure we have a fallback in case of errors
        document.documentElement.classList.remove('dark');
        document.documentElement.style.colorScheme = 'light';
      }
    })();
  `;
}

/**
 * Injects a script that applies the user's theme preference before the page renders.
 *
 * This component prevents a flash of incorrect theme by running a theme initialization script as soon as possible. The script determines the theme from the URL parameter, localStorage, or a default, and applies the appropriate color mode to the document.
 *
 * @returns A React element containing the theme initialization script.
 */
export function ThemeInitializerScript() {
  // Use the shared script content
  const themeScript = getThemeScriptContent();

  return (
    <script
      dangerouslySetInnerHTML={{ __html: themeScript }}
      id="theme-initializer"
    />
  );
}

/**
 * Returns the theme initialization script as a string for injection into HTML.
 *
 * Useful for scenarios where the raw script is needed, such as with Next.js's Script component or custom server-side rendering.
 *
 * @returns The theme initialization script as a string.
 */
export function getThemeInitializerScript() {
  // Use the same shared script content
  return getThemeScriptContent();
}