'use client';

import { useTheme, useAvailableThemeVariants } from '@/components/ThemeProvider';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Monitor, Briefcase, User, Brain, Shield } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup
} from '@/components/ui/dropdown-menu';

export function ThemeSwitcher() {
  const { 
    colorMode, 
    setColorMode, 
    themeVariant, 
    setThemeVariant, 
    experience,
    setExperience,
    isStandardExperience,
    isCorporateExperience
  } = useTheme();
  
  const availableThemeVariants = useAvailableThemeVariants();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          {colorMode === 'light' ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => setColorMode('light')}>
            <Sun className="mr-2 h-4 w-4" />
            <span>Light</span>
            {colorMode === 'light' && <span className="ml-auto">✓</span>}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setColorMode('dark')}>
            <Moon className="mr-2 h-4 w-4" />
            <span>Dark</span>
            {colorMode === 'dark' && <span className="ml-auto">✓</span>}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => {
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setColorMode(systemPrefersDark ? 'dark' : 'light');
          }}>
            <Monitor className="mr-2 h-4 w-4" />
            <span>System</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Experience</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => setExperience('standard')}>
            <User className="mr-2 h-4 w-4" />
            <span>Standard</span>
            {isStandardExperience() && <span className="ml-auto">✓</span>}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setExperience('corporate')}>
            <Briefcase className="mr-2 h-4 w-4" />
            <span>Corporate</span>
            {isCorporateExperience() && <span className="ml-auto">✓</span>}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Theme Style</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {isStandardExperience() && (
            <>
              <DropdownMenuItem onClick={() => setThemeVariant('standard')}>
                <User className="mr-2 h-4 w-4" />
                <span>Classic</span>
                {themeVariant === 'standard' && <span className="ml-auto">✓</span>}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setThemeVariant('neuralliquid')}>
                <Brain className="mr-2 h-4 w-4" />
                <span>NeuralLiquid</span>
                {themeVariant === 'neuralliquid' && <span className="ml-auto">✓</span>}
              </DropdownMenuItem>
            </>
          )}
          
          {isCorporateExperience() && (
            <>
              <DropdownMenuItem onClick={() => setThemeVariant('corporate')}>
                <Briefcase className="mr-2 h-4 w-4" />
                <span>Professional</span>
                {themeVariant === 'corporate' && <span className="ml-auto">✓</span>}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setThemeVariant('veritasvault')}>
                <Shield className="mr-2 h-4 w-4" />
                <span>VeritasVault</span>
                {themeVariant === 'veritasvault' && <span className="ml-auto">✓</span>}
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}