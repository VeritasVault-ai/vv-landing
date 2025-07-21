"use client"

import { useEffect, useRef, useState } from "react"
import { STANDARD_PRODUCT_NAME } from "@/lib/config/product-info"

interface ProductLogoProps {
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
}: ProductLogoProps) {
  // Split the product name into two parts (assuming format like "NeuralLiquid")
  const productNameParts = STANDARD_PRODUCT_NAME.match(/^([A-Z][a-z]*)(.*)$/) || [STANDARD_PRODUCT_NAME, "", ""];
  const firstPart = productNameParts[1] || ""; // First word with capital letter
  const secondPart = productNameParts[2] || ""; // Rest of the name
  const [dotPosition, setDotPosition] = useState({ x: 110, y: -7 }) // Default position
  const textRef = useRef<SVGTextElement>(null)
  const containerRef = useRef<SVGGElement>(null)

  useEffect(() => {
    // Calculate the position of the dot over the 'i' in second part (if it contains an 'i')
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

        // Measure the width of first part (bold part)
        const firstPartWidth = ctx.measureText(firstPart).width

        // Find the position of 'i' in the second part (if exists)
        const iIndex = secondPart.indexOf('i')
        
        if (iIndex >= 0) {
          // Measure the width of space and characters before 'i' in second part
          const spaceWidth = ctx.measureText(" ").width
          const beforeIWidth = ctx.measureText(secondPart.substring(0, iIndex)).width
          const iWidth = ctx.measureText("i").width

          // Calculate the position of the dot over the "i"
          const x = firstPartWidth + spaceWidth + beforeIWidth + iWidth / 2

          // Position the dot above the text
          const y = -12

          setDotPosition({ x, y })
        }
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
  }, [firstPart, secondPart])

  // Only show the dot if there's an 'i' in the second part of the name
  const showDot = secondPart.includes('i');
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
          <tspan fontWeight="700">{firstPart}</tspan>
          <tspan fontWeight="300">{secondPart}</tspan>
        </text>

        {/* Animated dot over the 'i' (if present) */}
        {showDot && (
          <circle
            cx={dotPosition.x}
            cy={dotPosition.y}
            r="3"
            fill="url(#dropGradient)"
            filter="url(#textGlow)"
            className="animate-pulse"
          />
        )}
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
