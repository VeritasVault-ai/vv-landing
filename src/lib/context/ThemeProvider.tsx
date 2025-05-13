// theme-variants.ts
// Centralized lists of valid theme variants per experience
export const standardVariants = ['standard', 'neuralliquid'] as const;
export const corporateVariants = ['corporate', 'veritasvault'] as const;

export type StandardThemeVariant = typeof standardVariants[number];
export type CorporateThemeVariant = typeof corporateVariants[number];
export type ThemeVariant = StandardThemeVariant | CorporateThemeVariant;

// Helper to get defaults
export function getDefaultVariant(exp: 'standard'): StandardThemeVariant;
export function getDefaultVariant(exp: 'corporate'): CorporateThemeVariant;
export function getDefaultVariant(exp: 'standard' | 'corporate') {
  return exp === 'corporate' ? corporateVariants[0] : standardVariants[0];
}

// ThemeProvider.tsx
'use client';

import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from 'next-themes';

import {
  ExperienceType,
  ColorMode,
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

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

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
  const [themeVariant, setThemeVariant] = useState<ThemeVariant>(getDefaultVariant(defaultExperience));

  // enforce valid variant list on experience change
  useEffect(() => {
    if (
      experience === 'standard' &&
      !standardVariants.includes(themeVariant as StandardThemeVariant)
    ) {
      setThemeVariant(getDefaultVariant('standard'));
    } else if (
      experience === 'corporate' &&
      !corporateVariants.includes(themeVariant as CorporateThemeVariant)
    ) {
      setThemeVariant(getDefaultVariant('corporate'));
    }
  }, [experience, themeVariant]);

  // update html classes
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('experience-corporate', ...standardVariants.map(v => `theme-${v}`), ...corporateVariants.map(v => `theme-${v}`));
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
  return experience === 'standard' ? standardVariants : corporateVariants;
}
