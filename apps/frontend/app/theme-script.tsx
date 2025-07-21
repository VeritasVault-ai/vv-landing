"use client"

/**
 * This component injects a script into the document head that runs immediately
 * to apply the theme before the page renders, preventing flash of wrong theme
 */
export function ThemeInitializerScript() {
  // This script will run immediately when injected into the page
  const themeScript = `
    (function() {
      try {
        // Get theme from URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const themeParam = urlParams.get('theme');
        
        // Get stored theme from localStorage
        const storedTheme = localStorage.getItem('theme-preference');
        
        // Determine which theme to use (URL param takes precedence)
        const theme = themeParam || storedTheme || 'corporate-light';
        
        // Extract color mode
        const colorMode = theme.split('-')[1];
        
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
      }
    })();
  `;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: themeScript }}
      id="theme-initializer"
    />
  );
}