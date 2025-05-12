"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface CorporateVersionCardProps {
  isSelected: boolean
  onSelect: () => void
  onContinue: () => void
}

export function CorporateVersionCard({ isSelected, onSelect, onContinue }: CorporateVersionCardProps) {
  return (
    <Card
      className={cn(
        "p-6 bg-gradient-to-br from-purple-900/30 to-purple-800/10 border",
        isSelected
          ? "border-purple-500 ring-2 ring-purple-500/50"
          : "border-purple-500/20 hover:border-purple-500/50",
        "rounded-lg transition-all duration-300 cursor-pointer h-full",
      )}
      onClick={onSelect}
    >
      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-purple-500/20 mx-auto mb-6">
        <Building2 className="h-8 w-8 text-purple-400" />
      </div>
      <h2 className="text-2xl font-semibold text-center text-white mb-4">Corporate Experience</h2>
      <p className="text-white/70 text-center mb-6">
        Designed for institutional investors and teams with advanced features and comprehensive reporting tools
      </p>
      <ul className="space-y-3 mb-6">
        <li className="flex items-center text-white/80">
          <CheckCircle className="h-4 w-4 text-purple-500 mr-2" />
          Institutional-grade security
        </li>
        <li className="flex items-center text-white/80">
          <CheckCircle className="h-4 w-4 text-purple-500 mr-2" />
          Advanced portfolio optimization
        </li>
        <li className="flex items-center text-white/80">
          <CheckCircle className="h-4 w-4 text-purple-500 mr-2" />
          Compliance and audit features
        </li>
        <li className="flex items-center text-white/80">
          <CheckCircle className="h-4 w-4 text-purple-500 mr-2" />
          Enterprise API access
        </li>
      </ul>
      <Button
        className="w-full bg-purple-600 hover:bg-purple-700"
        onClick={onContinue}
      >
        Select Corporate Version
      </Button>
    </Card>
  )
}