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
/**
 * Returns the default theme variant for the given experience type.
 *
 * @param exp - The experience type, either 'standard' or 'corporate'.
 * @returns The default theme variant string for the specified experience.
 */
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
import { standardVariants, corporateVariants, getDefaultVariant, ThemeVariant } from '@/config/theme-variants';

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
 */
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

/**
 * Provides theme context state and logic to child components, managing experience type, theme variant, and color mode.
 *
 * Ensures the selected theme variant is valid for the current experience, updates HTML root classes to reflect theme and experience, and synchronizes color mode with the resolved theme.
 *
 * @param children - React elements to receive theme context.
 * @param defaultExperience - The initial experience type to use.
 *
 * @remark
 * Delays rendering children until the resolved theme is available to prevent UI inconsistencies.
 */
function InnerProvider({ children, defaultExperience }: { children: ReactNode; defaultExperience: ExperienceType; }) {
  const { resolvedTheme, setTheme: setNextTheme } = useNextTheme();

  const [experience, setExperience] = useState<ExperienceType>(defaultExperience);
  const [themeVariant, setThemeVariant] = useState<ThemeVariant>(getDefaultVariant(defaultExperience));

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
