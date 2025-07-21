"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface AnimatedTextProps {
  texts: string[]
  interval?: number
  highlightClassName?: string
  prefix?: string
  suffix?: string
}

export function AnimatedText({
  texts,
  interval = 3000,
  highlightClassName = "text-blue-500 font-medium",
  prefix = "",
  suffix = "",
}: AnimatedTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsVisible(false)

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length)
        setIsVisible(true)
      }, 500) // Half a second for fade out before changing text
    }, interval)

    return () => clearInterval(intervalId)
  }, [interval, texts.length])

  return (
    <span className="relative inline-block">
      {prefix}
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.span
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className={`${highlightClassName} px-1`}
          >
            {texts[currentIndex]}
          </motion.span>
        )}
      </AnimatePresence>
      {suffix}
    </span>
  )
}
