"use client"

import { useEffect } from 'react';

/**
 * Client component that initializes the theme
 */
export function ThemeInitializerClient() {
  useEffect(() => {
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
  }, []);
  
  return null; // This component doesn't render anything
}