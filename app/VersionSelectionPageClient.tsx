"use client"

import { useState } from "react"
import Link from "next/link"
import { ThemeToggleClient } from "@/components/theme-toggle-client"
import { ThemeAwareImage } from "@/components/ui/theme-aware-image"
import { ThemeAwareBackground } from "@/components/ui/theme-aware-background"
import { TrustedInstitutions } from "@/components/ui/trusted-institutions"
import { Button } from "@/components/ui/button"

export function VersionSelectionPageClient() {
  const [selectedVersion, setSelectedVersion] = useState<"standard" | "corporate" | null>(null)

  return (
    <ThemeAwareBackground className="min-h-screen flex flex-col">
      <header className="w-full py-4 px-6 flex justify-between items-center border-b">
        <div className="flex items-center gap-2">
          <ThemeAwareImage src="/logo.png" alt="NeuralLiquid Logo" width={40} height={40} className="w-10 h-10" />
          <span className="text-xl font-semibold">NeuralLiquid</span>
        </div>

        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="#documentation" className="hover:text-primary transition-colors">
              Documentation
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/auth/login">
              <Button variant="ghost">Log In</Button>
            </Link>
            <Link href="/auth/register">
              <Button>Sign Up</Button>
            </Link>
            <ThemeToggleClient />
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-4xl w-full text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-teal-400 text-transparent bg-clip-text">
            Choose Your Experience
          </h1>
          <p className="text-xl opacity-80 mb-8">Select the version that best suits your needs</p>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div
              className={`p-6 rounded-xl border-2 transition-all cursor-pointer hover:shadow-lg ${
                selectedVersion === "standard" ? "border-primary shadow-md" : "border-border hover:border-primary/50"
              }`}
              onClick={() => setSelectedVersion("standard")}
            >
              <h2 className="text-2xl font-bold mb-4">Standard Version</h2>
              <p className="mb-6 opacity-80">
                Perfect for individual traders and small teams looking for powerful liquidity management tools.
              </p>
              <ThemeAwareImage
                src="/dashboard-preview.png"
                lightSrc="/dashboard-preview-light.png"
                darkSrc="/dashboard-preview.png"
                alt="Standard version dashboard preview"
                width={400}
                height={300}
                className="rounded-lg mb-6 w-full h-auto"
              />
              <Link href="/standard">
                <Button className="w-full">Select Standard</Button>
              </Link>
            </div>

            <div
              className={`p-6 rounded-xl border-2 transition-all cursor-pointer hover:shadow-lg ${
                selectedVersion === "corporate" ? "border-primary shadow-md" : "border-border hover:border-primary/50"
              }`}
              onClick={() => setSelectedVersion("corporate")}
            >
              <h2 className="text-2xl font-bold mb-4">Corporate Version</h2>
              <p className="mb-6 opacity-80">
                Enterprise-grade solution with advanced features for institutional investors and large organizations.
              </p>
              <ThemeAwareImage
                src="/analytics-preview.png"
                lightSrc="/analytics-preview-light.png"
                darkSrc="/analytics-preview.png"
                alt="Corporate version analytics preview"
                width={400}
                height={300}
                className="rounded-lg mb-6 w-full h-auto"
              />
              <Link href="/corporate">
                <Button className="w-full">Select Corporate</Button>
              </Link>
            </div>
          </div>
        </div>

        <TrustedInstitutions className="mt-12" />
      </main>

      <footer className="w-full py-6 px-6 border-t">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <ThemeAwareImage src="/logo.png" alt="NeuralLiquid Logo" width={30} height={30} className="w-8 h-8" />
            <span className="text-sm">© 2023 NeuralLiquid. All rights reserved.</span>
          </div>

          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-sm hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </ThemeAwareBackground>
  )
}
