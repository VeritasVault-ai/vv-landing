"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, BarChart3, RefreshCw, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

export function HowItWorks() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const features = [
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Analyze Pools",
      description:
        "Our predictive models evaluate yield potential, volatility, and impermanent loss across multiple DeFi pools.",
      color: "#3A86FF",
      stat: "93%",
      statLabel: "prediction accuracy",
    },
    {
      icon: <RefreshCw className="h-8 w-8" />,
      title: "Rebalance Intelligently",
      description:
        "NeuralLiquid automatically reallocates your liquidity to pools offering the best risk-adjusted returns.",
      color: "#8A2BE2",
      stat: "3.2x",
      statLabel: "faster than manual",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Optimize Yield",
      description:
        "Adaptive algorithms fine-tune your positions in real-time to maximize efficiency and minimize exposure.",
      color: "#06D6A0",
      stat: "24/7",
      statLabel: "continuous optimization",
    },
  ]

  return (
    <div className="w-full py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Our AI-powered platform optimizes your liquidity positions through a three-step process
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-gray-900/80 to-black/80 p-6 transition-all duration-300"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              whileHover={{
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              style={{
                borderTop: `3px solid ${feature.color}`,
              }}
            >
              <div
                className="absolute inset-0 opacity-10 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${feature.color}, transparent 70%)`,
                  opacity: hoveredCard === index ? 0.15 : 0.05,
                }}
              />

              <div className="relative z-10">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: `${feature.color}20`,
                    color: feature.color,
                  }}
                >
                  {feature.icon}
                </div>

                <h3 className="text-xl md:text-2xl font-bold mb-3 text-white">{feature.title}</h3>

                <p className="text-gray-300 mb-6 leading-relaxed">{feature.description}</p>

                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold" style={{ color: feature.color }}>
                    {feature.stat}
                  </span>
                  <span className="text-gray-400 text-sm">{feature.statLabel}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-gradient-to-r from-[#3A86FF] via-[#8A2BE2] to-[#06D6A0] p-[1px] rounded-full mb-12">
            <div className="bg-gradient-to-b from-gray-900 to-black rounded-full">
              <button className="relative group px-8 py-3 rounded-full flex items-center space-x-2 overflow-hidden">
                <span className="relative z-10 text-white font-medium">Get Early Access</span>
                <ArrowRight className="relative z-10 w-4 h-4 text-white transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#3A86FF] via-[#8A2BE2] to-[#06D6A0] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>

          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-black/30 px-6 py-3 rounded-full border border-white/10">
              <span className="text-gray-300">Average yield boost:</span>
              <div className="relative">
                <span className="text-[#06D6A0] font-bold text-xl">+12.7%</span>
                <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-[#06D6A0]/0 via-[#06D6A0] to-[#06D6A0]/0"></div>
              </div>
              <span className="text-gray-300">over manual strategies</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 justify-center">
            {[0, 1, 2].map((dot) => (
              <div
                key={dot}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  dot === 1 ? "w-8 bg-[#3A86FF]" : "w-2 bg-gray-600",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
