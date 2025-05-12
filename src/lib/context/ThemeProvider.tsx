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

// Outer: next-themes wrapper
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
      <InnerProvider children={children} defaultExperience={defaultExperience} />
    </NextThemesProvider>
  );
}

function InnerProvider({ children, defaultExperience }: { children: ReactNode; defaultExperience: ExperienceType; }) {
  const { resolvedTheme, setTheme: setNextTheme } = useNextTheme();

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

  // update html classes
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('experience-corporate', ...STANDARD_VARIANTS.map(v => `theme-${v}`), ...CORPORATE_VARIANTS.map(v => `theme-${v}`));
    if (experience === 'corporate') root.classList.add('experience-corporate');
    root.classList.add(`theme-${themeVariant}`);
    if (resolvedTheme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
  }, [experience, themeVariant, resolvedTheme]);

  const colorMode = (resolvedTheme ?? 'light') as ColorMode;
  const setColorMode = (mode: ColorMode) => setNextTheme(mode);
  const toggleColorMode = () => setNextTheme(colorMode === 'light' ? 'dark' : 'light');

  const isStandardExperience = () => experience === 'standard';
  const isCorporateExperience = () => experience === 'corporate';

  if (!resolvedTheme) return <>{children}</>;

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

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be within ThemeProvider');
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
