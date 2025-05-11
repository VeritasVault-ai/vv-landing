import Script from "next/script"

export function ThemeScript() {
  return (
    <Script
      id="theme-script"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            // Function to get the theme preference
            function getThemePreference() {
              if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
                return localStorage.getItem('theme');
              }
              
              return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            }
            
            // Function to apply the theme
            function applyTheme(theme) {
              document.documentElement.classList.remove('light', 'dark');
              document.documentElement.classList.add(theme);
              
              // Store the preference
              if (typeof localStorage !== 'undefined') {
                localStorage.setItem('theme', theme);
              }
              
              // Dispatch an event for components to react to
              window.dispatchEvent(new CustomEvent('theme-change', { detail: { theme } }));
            }
            
            // Apply the theme immediately to prevent flash
            var theme = getThemePreference();
            applyTheme(theme);
            
            // Listen for system preference changes
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
              if (localStorage.getItem('theme') === 'system' || !localStorage.getItem('theme')) {
                applyTheme(e.matches ? 'dark' : 'light');
              }
            });
            
            // Expose functions globally for theme toggling
            window.themeUtils = {
              getTheme: getThemePreference,
              setTheme: applyTheme
            };
          })();
        `,
      }}
    />
  )
}
