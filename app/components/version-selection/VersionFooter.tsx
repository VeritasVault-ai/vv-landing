"use client"

export function VersionFooter() {
  return (
    <footer className="relative z-10 py-8 border-t border-white/10">
      <div className="container mx-auto px-4 text-center">
        <p className="text-white/50 text-sm">© {new Date().getFullYear()} NeuralLiquid. All rights reserved.</p>
      </div>
    </footer>
  )
}