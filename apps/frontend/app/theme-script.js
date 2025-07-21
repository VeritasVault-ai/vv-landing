// This is a plain JavaScript file (not a React component)
// It will be loaded as a static script

export function getThemeInitializerScript() {
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
}