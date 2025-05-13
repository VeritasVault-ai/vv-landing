// ThemeProvider.tsx
'use client';

import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from 'next-themes';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

import { CORPORATE_VARIANTS, STANDARD_VARIANTS } from '@/src/constants';
import { ThemeVariant } from '@/src/types';
import {
  ColorMode,
  ExperienceType,
  getTheme,
} from '@/styles/theme';
import { standardVariants, corporateVariants, getDefaultVariant, ThemeVariant } from '@/context/theme-variants';

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

// Default values to use while context is initializing
const defaultContextValues: ThemeContextType = {
  experience: 'standard',
  themeVariant: STANDARD_VARIANTS[0],
  colorMode: 'light',
  setExperience: () => {},
  setThemeVariant: () => {},
  setColorMode: () => {},
  toggleColorMode: () => {},
  isStandardExperience: () => true,
  isCorporateExperience: () => false,
};

const ThemeContext = createContext<ThemeContextType>(defaultContextValues);

// Outer: next-themes wrapper
export function ThemeProvider({
  children,
  defaultExperience = 'standard',
  defaultColorMode = 'light',
}: {
  children: ReactNode;
  defaultExperience?: ExperienceType;
  defaultColorMode?: ColorMode;
}) {
  return (
    <NextThemesProvider attribute="class" enableSystem defaultTheme={defaultColorMode} themes={['light','dark']}>
      <InnerProvider defaultExperience={defaultExperience}>
        {children}
      </InnerProvider>
    </NextThemesProvider>
  );
}

function InnerProvider({ 
  children, 
  defaultExperience 
}: { 
  children: ReactNode; 
  defaultExperience: ExperienceType; 
}) {
  const { resolvedTheme, setTheme: setNextTheme } = useNextTheme();
  const [isReady, setIsReady] = useState(false);

  const [experience, setExperience] = useState<ExperienceType>(defaultExperience);
  
  // Fix: Use a type-safe approach to get the default variant
  const getInitialThemeVariant = (exp: ExperienceType): ThemeVariant => {
    if (exp === 'corporate') return CORPORATE_VARIANTS[0];
    if (exp === 'standard') return STANDARD_VARIANTS[0];
    // For 'both' or any future types, default to standard
    return STANDARD_VARIANTS[0];
  };
  
  const [themeVariant, setThemeVariant] = useState<ThemeVariant>(getInitialThemeVariant(defaultExperience));

  // enforce valid variant list on experience change
  useEffect(() => {
    if (experience === 'standard' && !STANDARD_VARIANTS.includes(themeVariant as any)) {
      setThemeVariant(getInitialThemeVariant('standard'));
    } else if (experience === 'corporate' && !CORPORATE_VARIANTS.includes(themeVariant as any)) {
      setThemeVariant(getInitialThemeVariant('corporate'));
    }
  }, [experience, themeVariant]);

  // Mark as ready when resolvedTheme is available
  useEffect(() => {
    if (resolvedTheme) {
      setIsReady(true);
    }
  }, [resolvedTheme]);

  // update html classes
  useEffect(() => {
    if (!isReady) return;
    
    const root = document.documentElement;
    root.classList.remove('experience-corporate', ...STANDARD_VARIANTS.map(v => `theme-${v}`), ...CORPORATE_VARIANTS.map(v => `theme-${v}`));
    if (experience === 'corporate') root.classList.add('experience-corporate');
    root.classList.add(`theme-${themeVariant}`);
    if (resolvedTheme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
  }, [experience, themeVariant, resolvedTheme, isReady]);

  const colorMode = (resolvedTheme ?? 'light') as ColorMode;
  const setColorMode = (mode: ColorMode) => setNextTheme(mode);
  const toggleColorMode = () => setNextTheme(colorMode === 'light' ? 'dark' : 'light');

  const isStandardExperience = () => experience === 'standard';
  const isCorporateExperience = () => experience === 'corporate';

  // Create context value
  const contextValue: ThemeContextType = {
    experience,
    themeVariant,
    colorMode,
    setExperience,
    setThemeVariant,
    setColorMode,
    toggleColorMode,
    isStandardExperience,
    isCorporateExperience,
  };

  // Always provide the context, but use default values until ready
  return (
    <ThemeContext.Provider value={isReady ? contextValue : defaultContextValues}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  return ctx;
}

export function useCurrentTheme() {
  const { experience, themeVariant, colorMode } = useTheme();
  return getTheme(experience, themeVariant, colorMode);
}

export function useAvailableThemeVariants() {
  const { experience } = useTheme();
  return experience === 'standard' ? STANDARD_VARIANTS : CORPORATE_VARIANTS;
}