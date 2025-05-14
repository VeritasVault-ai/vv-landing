"use client"

import { ThemeToggleClient } from "@/components/theme-toggle-client"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function VersionHeader() {
  return (
    <header className="relative z-10 border-b border-white/10 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-blue-400 font-semibold text-xl">Veritas Vault</span>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggleClient />
          <Link href="/auth/login">
            <Button variant="outline" className="border-blue-500/30 text-white hover:bg-blue-500/20">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}