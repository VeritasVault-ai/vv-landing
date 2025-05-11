"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { LogoWithText } from "@/components/ui/logo-with-text"

export function StandardLandingPageScreenshotMatch() {
  const [mounted, setMounted] = useState(false)
  const [email, setEmail] = useState("")
  const [liquidity, setLiquidity] = useState("")
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    // Handle form submission logic here
    console.log("Submitted:", { email, liquidity })
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      {/* Header */}
      <header className="container mx-auto flex items-center justify-between p-4">
        <LogoWithText />
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-950">
            Sign In
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 py-12 text-center">
        <h1 className="mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
          AI-Powered Tezos Liquidity Management
        </h1>
        <p className="mb-8 max-w-2xl text-lg text-slate-300">
          Optimize your Tezos liquidity with advanced AI insights and real-time data
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="mb-8 w-full max-w-md space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-slate-800 text-white placeholder:text-slate-500"
              />
            </div>
            <div>
              <Input
                type="text"
                placeholder="Liquidity amount (XTZ)"
                value={liquidity}
                onChange={(e) => setLiquidity(e.target.value)}
                required
                className="bg-slate-800 text-white placeholder:text-slate-500"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Get Early Access
            </Button>
          </form>
        ) : (
          <div className="mb-8 rounded-lg bg-green-900/20 p-4 text-green-400">Thank you! We'll be in touch soon.</div>
        )}

        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="outline" className="border-blue-500 bg-transparent text-blue-400 hover:bg-blue-950">
            Learn More
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            View Dashboard Demo
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto p-4 text-center text-sm text-slate-500">
        <div className="mb-2 flex justify-center space-x-4">
          <a href="#" className="hover:text-blue-400">
            Terms
          </a>
          <a href="#" className="hover:text-blue-400">
            Privacy
          </a>
          <a href="#" className="hover:text-blue-400">
            Contact
          </a>
        </div>
        <p>© 2023 NeuralLiquid. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default StandardLandingPageScreenshotMatch
