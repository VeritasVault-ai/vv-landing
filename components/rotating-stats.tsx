"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Original stats array from the previous implementation
const defaultStats = [
  "$2.5M+ liquidity optimized by early adopters",
  "Average yield boost: +12.7% over manual strategies",
  "Over 50 pools monitored and rebalanced automatically",
  "Projected impermanent loss reduction: -18% compared to static LPs",
]

export function RotatingStats() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % defaultStats.length)
        setIsVisible(true)
      }, 1000) // Wait for fade out before changing text
    }, 5000) // Change every 5 seconds (4s visible, 1s transition)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full py-10 bg-gradient-to-r from-[#0D1B2A] to-[#1A1A2E]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-16">
          <AnimatePresence mode="wait">
            {isVisible && (
              <motion.p
                key={currentIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="text-lg md:text-xl text-white text-center"
              >
                <span className="font-medium text-[#3A86FF]">{defaultStats[currentIndex].split(":")[0]}</span>
                {defaultStats[currentIndex].includes(":") && (
                  <>
                    : <span className="text-[#06D6A0] font-semibold">{defaultStats[currentIndex].split(":")[1]}</span>
                  </>
                )}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Indicator dots */}
        <div className="flex justify-center mt-4 space-x-1">
          {defaultStats.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentIndex ? "w-6 bg-[#3A86FF]" : "w-2 bg-white/30"
              }`}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
