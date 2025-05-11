'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { 
  ExperienceType, 
  ThemeVariant, 
  ColorMode, 
  getTheme, 
  getDefaultVariant,
  StandardThemeVariant,
  CorporateThemeVariant
} from '@/styles/theme';

type ThemeContextType = {
  experience: ExperienceType;
  themeVariant: ThemeVariant;
  colorMode: ColorMode;
  setExperience: (experience: ExperienceType) => void;
  setThemeVariant: (variant: ThemeVariant) => void;
  setColorMode: (mode: ColorMode) => void;
  toggleColorMode: () => void;
  // Helper functions
  isStandardExperience: () => boolean;
  isCorporateExperience: () => boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultExperience = 'standard',
  defaultColorMode = 'light',
}: {
  children: React.ReactNode;
  defaultExperience?: ExperienceType;
  defaultColorMode?: ColorMode;
}) {
  const [experience, setExperience] = useState<ExperienceType>(defaultExperience);
  const [themeVariant, setThemeVariant] = useState<ThemeVariant>(getDefaultVariant(defaultExperience));
  const [colorMode, setColorMode] = useState<ColorMode>(defaultColorMode);
  const [mounted, setMounted] = useState(false);

  // Update theme variant when experience changes to ensure compatibility
  useEffect(() => {
    if (experience === 'standard' && (themeVariant === 'corporate' || themeVariant === 'veritasvault')) {
      setThemeVariant('standard');
    } else if (experience === 'corporate' && (themeVariant === 'standard' || themeVariant === 'neuralliquid')) {
      setThemeVariant('corporate');
    }
  }, [experience, themeVariant]);

  // Update the document class when theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove previous experience and theme classes
    root.classList.remove('experience-corporate', 'theme-standard', 'theme-neuralliquid', 'theme-veritasvault');
    
    // Add experience class
    if (experience === 'corporate') {
      root.classList.add('experience-corporate');
    }
    
    // Add theme variant class
    if (themeVariant === 'neuralliquid') {
      root.classList.add('theme-neuralliquid');
    } else if (themeVariant === 'veritasvault') {
      root.classList.add('theme-veritasvault');
    } else if (themeVariant === 'standard') {
      root.classList.add('theme-standard');
    }
    
    // Update color mode
    if (colorMode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [experience, themeVariant, colorMode]);

  // Handle initial client-side hydration
  useEffect(() => {
    setMounted(true);
    
    // Check for saved preferences
    const savedExperience = localStorage.getItem('experience') as ExperienceType | null;
    const savedTheme = localStorage.getItem('theme-variant') as ThemeVariant | null;
    const savedMode = localStorage.getItem('color-mode') as ColorMode | null;
    
    // Check for system preference
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedExperience) {
      setExperience(savedExperience);
    }
    
    if (savedTheme) {
      setThemeVariant(savedTheme);
    }
    
    if (savedMode) {
      setColorMode(savedMode);
    } else if (systemPrefersDark) {
      setColorMode('dark');
    }
  }, []);

  // Save preferences when they change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('experience', experience);
      localStorage.setItem('theme-variant', themeVariant);
      localStorage.setItem('color-mode', colorMode);
    }
  }, [experience, themeVariant, colorMode, mounted]);

  const toggleColorMode = () => {
    setColorMode(prev => (prev === 'light' ? 'dark' : 'light'));
  };
  
  const isStandardExperience = () => experience === 'standard';
  const isCorporateExperience = () => experience === 'corporate';

  // Prevent flash of unstyled content
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider
      value={{
        experience,
        themeVariant,
        colorMode,
        setExperience,
        setThemeVariant,
        setColorMode,
        toggleColorMode,
        isStandardExperience,
        isCorporateExperience,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export function useCurrentTheme() {
  const { experience, themeVariant, colorMode } = useTheme();
  return getTheme(experience, themeVariant, colorMode);
}

// Helper hook to get available theme variants for current experience
export function useAvailableThemeVariants() {
  const { experience } = useTheme();
  
  if (experience === 'standard') {
    return ['standard', 'neuralliquid'] as StandardThemeVariant[];
  } else {
    return ['corporate', 'veritasvault'] as CorporateThemeVariant[];
  }
}