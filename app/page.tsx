"use client"

import { Button } from "@/components/ui/button"
import { InitialThemeModal } from "@/components/version-selection/InitialThemeModal"
import { trackNavigationEvent } from "@/lib/analytics/track-events"
import { useTheme } from "next-themes"
import Image from "next/image"
import { useEffect, useState } from "react"

/**
 * Home page that serves as the entry point to the application
 * Provides version selection interface and theme selection modal
 */
export default function Home() {
  const { setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [showThemeModal, setShowThemeModal] = useState(false)
  const [selectedExperience, setSelectedExperience] = useState<'standard' | 'corporate' | null>(null)
  
  // Set cosmic theme for the landing page and mark as mounted
  useEffect(() => {
    setTheme("cosmic")
    setMounted(true)
  }, [setTheme])

  // Handle version selection
  const handleVersionSelect = (version: 'standard' | 'corporate') => {
    setSelectedExperience(version)
    setShowThemeModal(true)
    
    // Track the selection
    trackNavigationEvent({ 
      feature_name: "version_selection", 
      button_text: `Enter ${version.charAt(0).toUpperCase() + version.slice(1)} Experience`,
      destination: `/${version}-version`
    })
  }

  // Simple loading state while client-side code initializes
  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-blue-900 to-black text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Loading VeritasVault.net</h1>
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    )
  }

  // Main content once mounted
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image 
            src="/logo-white.png" 
            alt="VeritasVault Logo" 
            width={40} 
            height={40} 
          />
          <span className="font-bold text-2xl">VeritasVault<span className="text-blue-400">.net</span></span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#features" className="hover:text-blue-300 transition-colors">Features</a>
          <a href="#about" className="hover:text-blue-300 transition-colors">About</a>
          <a href="#contact" className="hover:text-blue-300 transition-colors">Contact</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Welcome to VeritasVault.net</h1>
          <p className="text-xl max-w-2xl mx-auto">Choose the experience that best suits your needs for managing digital assets with our AI-powered platform</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Standard Version Card */}
          <div className="bg-blue-800/30 backdrop-blur-sm border border-blue-700/50 rounded-xl p-8 hover:bg-blue-800/40 transition-all">
            <h2 className="text-2xl font-bold mb-4">Standard Version</h2>
            <p className="mb-6 text-blue-100">For individual investors and DeFi enthusiasts. Access powerful tools for managing your digital assets with an intuitive interface.</p>
            <ul className="space-y-2 mb-8">
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Personal portfolio management</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>AI-powered yield optimization</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>DeFi protocol integration</span>
              </li>
            </ul>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
              onClick={() => handleVersionSelect('standard')}
            >
              Enter Standard Experience
            </Button>
          </div>
          
          {/* Corporate Version Card */}
          <div className="bg-indigo-800/30 backdrop-blur-sm border border-indigo-700/50 rounded-xl p-8 hover:bg-indigo-800/40 transition-all">
            <h2 className="text-2xl font-bold mb-4">Corporate Version</h2>
            <p className="mb-6 text-indigo-100">For institutional investors and enterprise users. Advanced security, compliance features, and institutional-grade tools.</p>
            <ul className="space-y-2 mb-8">
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Multi-signature governance</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Compliance reporting</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Enterprise-grade security</span>
              </li>
            </ul>
            <Button 
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium"
              onClick={() => handleVersionSelect('corporate')}
            >
              Enter Corporate Experience
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-16 border-t border-blue-800/50">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-blue-300">© {new Date().getFullYear()} VeritasVault.net. All rights reserved.</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-blue-300 hover:text-white">Terms</a>
            <a href="#" className="text-sm text-blue-300 hover:text-white">Privacy</a>
            <a href="#" className="text-sm text-blue-300 hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
      
      {/* Theme Selection Modal */}
      {showThemeModal && selectedExperience && (
        <InitialThemeModal 
          isOpen={showThemeModal}
          onClose={() => setShowThemeModal(false)}
          experienceType={selectedExperience}
        />
      )}
    </div>
  )
}