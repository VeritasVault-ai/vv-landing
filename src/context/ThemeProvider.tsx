'use client';

import { setCookie } from '@/lib/cookies';
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from 'next-themes';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

import {
  ColorMode,
  ExperienceType,
  getTheme,
} from '@/styles/theme';
import { CORPORATE_THEME_VARIANTS, getDefaultVariant, STANDARD_THEME_VARIANTS, ThemeVariant } from './theme-variants';

// Context shape
type ThemeContextValue = {
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

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Provides theming context and color mode management for the application.
 *
 * Wraps children with a theme provider that integrates with `next-themes` for light/dark mode and system preference detection, and supplies additional context for experience type and theme variants.
 *
 * @param children - The React elements to be rendered within the theme context.
 * @param defaultExperience - The initial experience type, defaults to 'standard'.
 * @param defaultColorMode - The initial color mode, defaults to 'light'.
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
      <InnerProvider defaultExperience={defaultExperience}>
        {children}
      </InnerProvider>
    </NextThemesProvider>
  );
}

/**
 * Provides theme context for experience type, theme variant, and color mode, managing state and synchronizing preferences with cookies, URL parameters, and HTML classes.
 *
 * @param children - The React nodes to render within the provider.
 * @param defaultExperience - The initial experience type to use.
 *
 * @remark
 * Waits for the theme to be resolved before providing context to prevent UI flicker. Updates the root HTML element's classes and persists preferences in cookies. Supports overriding color mode via the `theme` URL parameter.
 */
function InnerProvider({ children, defaultExperience }: { children: ReactNode; defaultExperience: ExperienceType; }) {
  const { resolvedTheme, setTheme: setNextTheme } = useNextTheme();

  const [experience, setExperience] = useState<ExperienceType>(defaultExperience);
  const [themeVariant, setThemeVariant] = useState<ThemeVariant>(getDefaultVariant(defaultExperience));

  // enforce valid variant list on experience change
  useEffect(() => {
    if (experience === 'standard' && !STANDARD_THEME_VARIANTS.includes(themeVariant as any)) {
      setThemeVariant(getDefaultVariant('standard'));
    } else if (experience === 'corporate' && !CORPORATE_THEME_VARIANTS.includes(themeVariant as any)) {
      setThemeVariant(getDefaultVariant('corporate'));
    }
  }, [experience, themeVariant]);

  // sync preferred-experience cookie when experience changes
  useEffect(() => {
    setCookie('preferred-experience', experience, 30);
  }, [experience]);

  // URL override for theme param and persist
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const themeParam = params.get('theme');
    if (themeParam === 'light' || themeParam === 'dark') {
      setNextTheme(themeParam);
      setCookie('preferred-theme', themeParam, 30);
    }
  }, [setNextTheme]);

  // update html classes
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(
      'experience-corporate',
      ...STANDARD_THEME_VARIANTS.map(v => `theme-${v}`),
      ...CORPORATE_THEME_VARIANTS.map(v => `theme-${v}`)
    );
    if (experience === 'corporate') root.classList.add('experience-corporate');
    root.classList.add(`theme-${themeVariant}`);
    if (resolvedTheme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
  }, [experience, themeVariant, resolvedTheme]);

  // colorMode methods
  const colorMode = (resolvedTheme ?? 'light') as ColorMode;
  const setColorMode = (mode: ColorMode) => setNextTheme(mode);
  const toggleColorMode = () => setNextTheme(colorMode === 'light' ? 'dark' : 'light');

  const isStandardExperience = () => experience === 'standard';
  const isCorporateExperience = () => experience === 'corporate';

  // wait until theme is resolved
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
 * Returns the current theme context, including experience, theme variant, color mode, and related setters.
 *
 * @returns The current {@link ThemeContextValue}.
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
 * @returns The resolved theme object for the current context.
 */
export function useCurrentTheme() {
  const { experience, themeVariant, colorMode } = useTheme();
  return getTheme(experience, themeVariant, colorMode);
}

/**
 * Retrieves the available theme variants for the current experience type.
 *
 * @returns An array of theme variants for either the standard or corporate experience.
 */
export function useAvailableThemeVariants() {
  const { experience } = useTheme();
  return experience === 'standard' ? STANDARD_THEME_VARIANTS : CORPORATE_THEME_VARIANTS;
}
