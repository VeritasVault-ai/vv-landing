'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from '@/src/lib/context/ThemeProvider';
import { ArrowRight, Brain, Briefcase, Shield, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

/**
 * Guides the user through selecting an experience type and theme style before navigating to the dashboard.
 *
 * Presents a two-step selection process: first, the user chooses between a standard or corporate experience; then, based on that choice, selects a corresponding theme. Once both selections are made, the chosen options are set in context and the user is redirected to the dashboard.
 */
export function ExperienceSelector() {
  const router = useRouter();
  const { setExperience, setThemeVariant } = useTheme();
  const [selectedExperience, setSelectedExperience] = useState<'standard' | 'corporate' | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  const handleExperienceSelect = (experience: 'standard' | 'corporate') => {
    setSelectedExperience(experience);
    setSelectedTheme(null); // Reset theme selection when changing experience
  };

  const handleThemeSelect = (theme: string) => {
    setSelectedTheme(theme);
  };

  const handleContinue = () => {
    if (selectedExperience && selectedTheme) {
      setExperience(selectedExperience);
      setThemeVariant(selectedTheme as any);
      router.push('/dashboard'); // Navigate to main dashboard or homepage
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-background/90">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome to Veritas Vault</h1>
          <p className="text-xl text-muted-foreground">Choose your experience to get started</p>
        </div>

        {/* Step 1: Experience Selection */}
        {!selectedExperience && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card 
              className="cursor-pointer hover:border-primary transition-all"
              onClick={() => handleExperienceSelect('standard')}
            >
              <CardHeader>
                <User className="h-12 w-12 mb-2 text-primary" />
                <CardTitle>Standard Experience</CardTitle>
                <CardDescription>For individual investors and crypto enthusiasts</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Perfect for personal use and individual investors. Easy to navigate with tools designed for individual decision-making.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Select Standard <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card 
              className="cursor-pointer hover:border-primary transition-all"
              onClick={() => handleExperienceSelect('corporate')}
            >
              <CardHeader>
                <Briefcase className="h-12 w-12 mb-2 text-primary" />
                <CardTitle>Corporate Experience</CardTitle>
                <CardDescription>For institutions and enterprise users</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Designed for professional teams and institutions. Advanced features for portfolio management and institutional-grade security.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Select Corporate <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}

        {/* Step 2: Theme Selection for Standard Experience */}
        {selectedExperience === 'standard' && (
          <>
            <div className="mb-6">
              <Button variant="ghost" onClick={() => setSelectedExperience(null)}>
                ← Back to Experience Selection
              </Button>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-center">Choose Your Theme Style</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card 
                className={`cursor-pointer transition-all ${selectedTheme === 'standard' ? 'border-primary ring-2 ring-primary ring-opacity-50' : 'hover:border-primary'}`}
                onClick={() => handleThemeSelect('standard')}
              >
                <CardHeader>
                  <User className="h-12 w-12 mb-2 text-primary" />
                  <CardTitle>Classic</CardTitle>
                  <CardDescription>Simple, clean design for everyone</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>A straightforward, easy-to-use interface designed for users of all technical levels. Perfect if you're new to crypto or prefer simplicity.</p>
                </CardContent>
                <CardFooter>
                  <Button variant={selectedTheme === 'standard' ? 'default' : 'outline'} className="w-full">
                    {selectedTheme === 'standard' ? 'Selected' : 'Select Classic'}
                  </Button>
                </CardFooter>
              </Card>

              <Card 
                className={`cursor-pointer transition-all ${selectedTheme === 'neuralliquid' ? 'border-primary ring-2 ring-primary ring-opacity-50' : 'hover:border-primary'}`}
                onClick={() => handleThemeSelect('neuralliquid')}
              >
                <CardHeader>
                  <Brain className="h-12 w-12 mb-2 text-primary" />
                  <CardTitle>NeuralLiquid</CardTitle>
                  <CardDescription>Modern design for crypto enthusiasts</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>A cutting-edge interface with advanced visualizations and data-focused elements. Ideal for crypto-savvy users who want the full experience.</p>
                </CardContent>
                <CardFooter>
                  <Button variant={selectedTheme === 'neuralliquid' ? 'default' : 'outline'} className="w-full">
                    {selectedTheme === 'neuralliquid' ? 'Selected' : 'Select NeuralLiquid'}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </>
        )}

        {/* Step 2: Theme Selection for Corporate Experience */}
        {selectedExperience === 'corporate' && (
          <>
            <div className="mb-6">
              <Button variant="ghost" onClick={() => setSelectedExperience(null)}>
                ← Back to Experience Selection
              </Button>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-center">Choose Your Theme Style</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card 
                className={`cursor-pointer transition-all ${selectedTheme === 'corporate' ? 'border-primary ring-2 ring-primary ring-opacity-50' : 'hover:border-primary'}`}
                onClick={() => handleThemeSelect('corporate')}
              >
                <CardHeader>
                  <Briefcase className="h-12 w-12 mb-2 text-primary" />
                  <CardTitle>Professional</CardTitle>
                  <CardDescription>Traditional enterprise design</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>A professional, conservative interface designed for corporate environments. Familiar layouts and traditional enterprise aesthetics.</p>
                </CardContent>
                <CardFooter>
                  <Button variant={selectedTheme === 'corporate' ? 'default' : 'outline'} className="w-full">
                    {selectedTheme === 'corporate' ? 'Selected' : 'Select Professional'}
                  </Button>
                </CardFooter>
              </Card>

              <Card 
                className={`cursor-pointer transition-all ${selectedTheme === 'veritasvault' ? 'border-primary ring-2 ring-primary ring-opacity-50' : 'hover:border-primary'}`}
                onClick={() => handleThemeSelect('veritasvault')}
              >
                <CardHeader>
                  <Shield className="h-12 w-12 mb-2 text-primary" />
                  <CardTitle>VeritasVault</CardTitle>
                  <CardDescription>Premium security-focused design</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>A premium interface emphasizing security and trust. Features visual elements that reinforce data integrity and institutional-grade protection.</p>
                </CardContent>
                <CardFooter>
                  <Button variant={selectedTheme === 'veritasvault' ? 'default' : 'outline'} className="w-full">
                    {selectedTheme === 'veritasvault' ? 'Selected' : 'Select VeritasVault'}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </>
        )}

        {/* Continue Button */}
        {selectedExperience && selectedTheme && (
          <div className="mt-8 text-center">
            <Button size="lg" onClick={handleContinue}>
              Continue to Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}