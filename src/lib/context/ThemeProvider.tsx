
// ThemeProvider.tsx
'use client';

import { ColorMode, corporateVariants, ExperienceType, standardVariants, ThemeVariant } from '@/src/types';
import { getDefaultVariant, getTheme } from '@/styles/theme';
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from 'next-themes';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';



// Context shape
export type ThemeContextType = {
  experience: ExperienceType;
  themeVariant: ThemeVariant;
  colorMode: ColorMode;
  setExperience: (exp: ExperienceType) => void;
  setThemeVariant: (variant: ThemeVariant) => void;
  setColorMode: (mode: ColorMode) => void;
  toggleColorMode: () => void;
  isStandardExperience: () => boolean;
  isCorporateExperience: () => boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Provides theme context and color mode management for the application.
 *
 * Wraps children with a theme provider that integrates with `next-themes`, enabling light and dark mode support, system theme detection, and experience-based theme variants.
 *
 * @param children - The React elements to render within the theme context.
 * @param defaultExperience - The initial experience type ('standard' or 'corporate'). Defaults to 'standard'.
 * @param defaultColorMode - The initial color mode ('light' or 'dark'). Defaults to 'light'.
 * @param fallback - Optional fallback UI to show while theme is initializing. Defaults to an empty div.
 */
export function ThemeProvider({
  children,
  defaultExperience = 'standard',
  defaultColorMode = 'light',
  fallback = <div style={{ visibility: 'hidden' }} />,
}: {
  children: ReactNode;
  defaultExperience?: ExperienceType;
  defaultColorMode?: ColorMode;
  fallback?: ReactNode;
}) {
  return (
    <NextThemesProvider attribute="class" enableSystem defaultTheme={defaultColorMode} themes={['light','dark']}>
      <InnerProvider 
        defaultExperience={defaultExperience} 
        fallback={fallback}
      >
        {children}
      </InnerProvider>
    </NextThemesProvider>
  );
}

/**
 * Provides theme context state and logic to child components, managing experience type, theme variant, and color mode.
 *
 * Ensures the selected theme variant is valid for the current experience, updates HTML root classes to reflect theme and experience, and synchronizes color mode with the resolved theme.
 *
 * @param children - React elements to receive theme context.
 * @param defaultExperience - The initial experience type to use.
 * @param fallback - UI to render while theme is initializing.
 *
 * @remark
 * Delays rendering children until the resolved theme is available to prevent UI inconsistencies.
 */
function InnerProvider({ 
  children, 
  defaultExperience,
  fallback
}: { 
  children: ReactNode; 
  defaultExperience: ExperienceType;
  fallback: ReactNode;
}) {
  const { resolvedTheme, setTheme: setNextTheme } = useNextTheme();
  const [isThemeReady, setIsThemeReady] = useState(false);

  const [experience, setExperience] = useState<ExperienceType>(defaultExperience);
  const [themeVariant, setThemeVariant] = useState<ThemeVariant>(getDefaultVariant(defaultExperience));
  
  // Initialize theme when resolvedTheme becomes available
  useEffect(() => {
    if (resolvedTheme) {
      // Apply initial theme classes
      const root = document.documentElement;
      if (experience === 'corporate') root.classList.add('experience-corporate');
      root.classList.add(`theme-${themeVariant}`);
      if (resolvedTheme === 'dark') root.classList.add('dark');
      
      // Mark theme as ready after a short delay to ensure CSS transitions work properly
      const timer = setTimeout(() => {
        setIsThemeReady(true);
      }, 0);
      
      return () => clearTimeout(timer);
    }
  }, [resolvedTheme, experience, themeVariant]);

  // enforce valid variant list on experience change
  useEffect(() => {
    if (experience === 'standard' && !standardVariants.includes(themeVariant as any)) {
      setThemeVariant(getDefaultVariant('standard'));
    } else if (experience === 'corporate' && !corporateVariants.includes(themeVariant as any)) {
      setThemeVariant(getDefaultVariant('corporate'));
    }
  }, [experience, themeVariant]);

  // update html classes
  useEffect(() => {
    if (!isThemeReady) return;
    
    const root = document.documentElement;
    root.classList.remove('experience-corporate', ...standardVariants.map(v => `theme-${v}`), ...corporateVariants.map(v => `theme-${v}`));
    if (experience === 'corporate') root.classList.add('experience-corporate');
    root.classList.add(`theme-${themeVariant}`);
    if (resolvedTheme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
  }, [experience, themeVariant, resolvedTheme, isThemeReady]);

  const colorMode = (resolvedTheme ?? 'light') as ColorMode;
  const setColorMode = (mode: ColorMode) => setNextTheme(mode);
  const toggleColorMode = () => setNextTheme(colorMode === 'light' ? 'dark' : 'light');

  const isStandardExperience = () => experience === 'standard';
  const isCorporateExperience = () => experience === 'corporate';

  // Show fallback UI while theme is initializing
  if (!resolvedTheme || !isThemeReady) {
    return <>{fallback}</>;
  }

  return (
    <ThemeContext.Provider value={{
      experience,
      themeVariant,
      colorMode,
      setExperience,
      setThemeVariant,
      setColorMode,
      toggleColorMode,
      isStandardExperience,
      isCorporateExperience,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Retrieves the current theme context.
 *
 * @returns The current {@link ThemeContextType} containing theme state and setters.
 *
 * @throws {Error} If called outside of a {@link ThemeProvider}.
 */
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be within ThemeProvider');
  return ctx;
}

/**
 * Returns the current theme object based on the active experience, theme variant, and color mode.
 *
 * @returns The theme configuration for the current experience, variant, and color mode.
 */
export function useCurrentTheme() {
  const { experience, themeVariant, colorMode } = useTheme();
  return getTheme(experience, themeVariant, colorMode);
}

/**
 * Returns the list of valid theme variants for the current experience type.
 *
 * @returns An array of theme variant strings corresponding to the current experience.
 */
export function useAvailableThemeVariants() {
  const { experience } = useTheme();
  return experience === 'standard' ? standardVariants : corporateVariants;
}