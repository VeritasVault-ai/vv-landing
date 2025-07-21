"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Brain, Activity, Zap } from "lucide-react"

interface Feature {
  title: string
  description: string
  icon: React.ReactNode
  color: string
  details?: string
}

interface ProductFeatureHeroProps {
  title?: string
  subtitle?: string
  features?: Feature[]
  className?: string
}

export function ProductFeatureHero({
  title = "Our Core Technologies",
  subtitle = "Powered by advanced AI and machine learning",
  features = [
    {
      title: "Neural Networks",
      description: "Advanced pattern recognition for market prediction",
      icon: <Brain className="h-8 w-8" />,
      color: "brand-blue",
      details:
        "Our proprietary neural networks analyze thousands of data points to identify optimal liquidity opportunities across multiple chains.",
    },
    {
      title: "Adaptive Learning",
      description: "Self-improving algorithms that evolve with the market",
      icon: <Activity className="h-8 w-8" />,
      color: "brand-aqua",
      details:
        "NeuralLiquid's adaptive learning system continuously refines its strategies based on market performance and new data inputs.",
    },
    {
      title: "Liquid Decision Engine",
      description: "Real-time optimization for maximum capital efficiency",
      icon: <Zap className="h-8 w-8" />,
      color: "brand-purple",
      details:
        "Our decision engine executes strategies with millisecond precision, ensuring optimal entry and exit points for all liquidity positions.",
    },
  ],
  className,
}: ProductFeatureHeroProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <section className={cn("bg-brand-gradient py-16 px-4", className)}>
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">{title}</h2>
          <p className="text-brand-gray max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={cn(
                "feature-card bg-white/5 border-white/10 transition-all duration-300",
                expandedIndex === index ? "transform scale-105 z-10" : "",
                expandedIndex !== null && expandedIndex !== index ? "opacity-70" : "",
              )}
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            >
              <CardContent className="p-6">
                <div
                  className={`h-16 w-16 rounded-full bg-${feature.color}/20 flex items-center justify-center mb-4 mx-auto feature-icon`}
                >
                  <div className={`text-${feature.color}`}>{feature.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-white text-center mb-2">{feature.title}</h3>
                <p className="text-brand-gray text-center text-sm">{feature.description}</p>

                {expandedIndex === index && feature.details && (
                  <div className="mt-4 pt-4 border-t border-white/10 text-white/80 text-sm animate-fade-in">
                    {feature.details}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
