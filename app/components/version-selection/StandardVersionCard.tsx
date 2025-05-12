"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface StandardVersionCardProps {
  isSelected: boolean
  onSelect: () => void
  onContinue: () => void
}

export function StandardVersionCard({ isSelected, onSelect, onContinue }: StandardVersionCardProps) {
  return (
    <Card
      className={cn(
        "p-6 bg-gradient-to-br from-blue-900/30 to-blue-800/10 border",
        isSelected
          ? "border-blue-500 ring-2 ring-blue-500/50"
          : "border-blue-500/20 hover:border-blue-500/50",
        "rounded-lg transition-all duration-300 cursor-pointer h-full",
      )}
      onClick={onSelect}
    >
      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-500/20 mx-auto mb-6">
        <User className="h-8 w-8 text-blue-400" />
      </div>
      <h2 className="text-2xl font-semibold text-center text-white mb-4">Standard Experience</h2>
      <p className="text-white/70 text-center mb-6">
        Perfect for individual traders and DeFi enthusiasts looking for a streamlined interface with powerful AI
        insights
      </p>
      <ul className="space-y-3 mb-6">
        <li className="flex items-center text-white/80">
          <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
          Personalized dashboard
        </li>
        <li className="flex items-center text-white/80">
          <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
          AI-powered strategy recommendations
        </li>
        <li className="flex items-center text-white/80">
          <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
          Real-time analytics
        </li>
        <li className="flex items-center text-white/80">
          <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
          Multi-chain support
        </li>
      </ul>
      <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={onContinue}>
        Select Standard Version
      </Button>
    </Card>
  )
}