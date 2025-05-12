"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export function Hero() {
  const animatedTexts = [
    "Optimize your liquidity",
    "Maximize your returns",
    "Minimize impermanent loss",
    "Automate your strategy",
  ]

  return (
    <div className="relative overflow-hidden w-full">
      {/* Background for light/dark mode */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-indigo-50/50 to-white dark:from-[#0D1B2A] dark:via-[#1A1A2E] dark:to-[#0F3443] z-0"></div>

      {/* Subtle animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-indigo-500/10 dark:from-[#3A86FF]/5 dark:to-[#8A2BE2]/10 animate-gradient-shift z-0"></div>

      {/* Background pattern */}
      <div className="absolute inset-0 pattern-dots opacity-5 z-0"></div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blue-300/10 dark:bg-[#3A86FF]/5 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-64 h-64 rounded-full bg-indigo-300/10 dark:bg-[#8A2BE2]/5 blur-3xl"></div>

      {/* Content */}
      <div className="w-full py-16 md:py-24 lg:py-32 relative z-10">
        <div className="max-w-5xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1 mb-8 rounded-full bg-indigo-100 dark:bg-[#8A63FF]/20 border border-indigo-200 dark:border-[#8A63FF]/30"
          >
            <span className="text-sm font-medium text-indigo-700 dark:text-[#A78BFA]">Neural Liquidity Management</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-500 dark:to-purple-600 bg-clip-text text-transparent leading-tight tracking-tight"
          >
            AI-Powered Tezos Liquidity Management
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-700 dark:text-white/90 mb-10 leading-relaxed max-w-3xl mx-auto"
          >
            <p>Optimize your Tezos liquidity with advanced AI insights and real-time data</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-[#8A63FF] dark:to-[#A78BFA] dark:hover:from-[#9370FF] dark:hover:to-[#B59BFF] text-white border-0 shadow-lg shadow-blue-500/20 dark:shadow-[#8A63FF]/20 transition-all duration-300 hover:scale-105 py-6 px-8 text-lg rounded-md"
              asChild
            >
              <Link href="/auth/register">
                <span>Get Early Access</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-blue-300 text-blue-700 hover:bg-blue-50 dark:border-[#4ECDC4]/30 dark:text-[#4ECDC4] dark:hover:bg-[#4ECDC4]/10 py-6 px-8 text-lg rounded-md"
              asChild
            >
              <Link href="/how-it-works">
                <span>See How It Works</span>
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 inline-block py-2 px-4 rounded-md bg-blue-50/80 border border-blue-200/50 dark:bg-[#0D1B2A]/50 dark:border-[#FFD700]/10"
          >
            <span className="text-sm text-slate-700 dark:text-white/80">
              Average yield boost: <span className="text-amber-600 dark:text-[#FFD700] font-medium">+12.7%</span> over
              manual strategies
            </span>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          >
            <span className="text-xs text-slate-500 dark:text-white/50 mb-2">Scroll to explore</span>
            <div className="w-5 h-10 border-2 border-slate-300 dark:border-white/20 rounded-full flex justify-center">
              <motion.div
                animate={{
                  y: [0, 12, 0],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 1.5,
                }}
                className="w-1.5 h-1.5 bg-slate-400 dark:bg-white/50 rounded-full mt-2"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
