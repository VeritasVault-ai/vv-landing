"use client"

import { useEffect, useRef, useState } from "react"

interface NeuralLiquidLogoProps {
  width?: number
  height?: number
  primaryColor?: string
  secondaryColor?: string
  glowColor?: string
  glowIntensity?: number
  backgroundColor?: string
  className?: string
}

export function LogoTextOnly({
  width = 280,
  height = 60,
  primaryColor = "#2d7fff",
  secondaryColor = "#00d1b2",
  glowColor = "#00d1b2",
  glowIntensity = 1,
  backgroundColor = "transparent",
  className = "",
}: NeuralLiquidLogoProps) {
  const [dotPosition, setDotPosition] = useState({ x: 110, y: -7 }) // Default position
  const textRef = useRef<SVGTextElement>(null)
  const containerRef = useRef<SVGGElement>(null)

  useEffect(() => {
    // Calculate the position of the dot over the 'i' in 'Liquid'
    const calculateDotPosition = () => {
      if (!textRef.current || !containerRef.current) return

      try {
        const text = textRef.current
        const container = containerRef.current

        // Create a temporary canvas to measure text
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Set font properties to match the SVG text
        const fontSize = 20 // From the SVG
        ctx.font = `300 ${fontSize}px Montserrat, sans-serif`

        // Measure the width of "Neural" (bold part)
        const neuralWidth = ctx.measureText("Neural").width

        // Measure the width of space and "Li" in "Liquid"
        const spaceWidth = ctx.measureText(" ").width
        const lWidth = ctx.measureText("L").width
        const iWidth = ctx.measureText("i").width

        // Calculate the position of the dot over the "i"
        const x = neuralWidth + spaceWidth + lWidth + iWidth / 2

        // Position the dot above the text
        const y = -12

        setDotPosition({ x, y })
      } catch (error) {
        console.error("Error calculating dot position:", error)
      }
    }

    // Calculate on mount and window resize
    calculateDotPosition()
    window.addEventListener("resize", calculateDotPosition)

    return () => {
      window.removeEventListener("resize", calculateDotPosition)
    }
  }, [])

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 280 60" className={className}>
      <defs>
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={primaryColor} />
          <stop offset="100%" stopColor={secondaryColor} />
        </linearGradient>
        <radialGradient id="dropGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor={glowColor} />
        </radialGradient>
        <filter id="textGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation={glowIntensity} result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {backgroundColor !== "transparent" && <rect width={width} height={height} fill={backgroundColor} />}

      <g ref={containerRef} transform="translate(50,25)">
        <text
          ref={textRef}
          fontFamily="Montserrat, sans-serif"
          fontSize="20"
          fill="url(#textGradient)"
          filter="url(#textGlow)"
          letterSpacing="-0.02em"
          dominantBaseline="middle"
        >
          <tspan fontWeight="700">Neural</tspan>
          <tspan fontWeight="300">Liquid</tspan>
        </text>

        {/* Animated dot over the 'i' */}
        <circle
          cx={dotPosition.x}
          cy={dotPosition.y}
          r="3"
          fill="url(#dropGradient)"
          filter="url(#textGlow)"
          className="animate-pulse"
        />
        <path
          d="M0,25 C40,28 120,28 180,25"
          stroke="url(#textGradient)"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
        />
      </g>
    </svg>
  )
}
