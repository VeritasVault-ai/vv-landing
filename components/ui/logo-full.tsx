"use client"

import { useEffect, useRef, useState } from "react"

interface LogoFullProps {
  width?: number
  height?: number
  primaryColor?: string
  secondaryColor?: string
  glowColor?: string
  glowIntensity?: number
  backgroundColor?: string
  className?: string
}

export function LogoFull({
  width = 280,
  height = 60,
  primaryColor = "#2d7fff",
  secondaryColor = "#00d1b2",
  glowColor = "#ffffff",
  glowIntensity = 2,
  backgroundColor = "transparent",
  className = "",
}: LogoFullProps) {
  const [dotPosition, setDotPosition] = useState({ x: 110, y: -7 }) // Default position
  const textRef = useRef<SVGTextElement>(null)

  useEffect(() => {
    // Calculate the position of the dot over the 'i' in 'Liquid'
    const calculateDotPosition = () => {
      if (!textRef.current) return

      try {
        const text = textRef.current

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
        const y = -7

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
        {/* Enhanced background gradient with brighter left side */}
        <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} />
          <stop offset="100%" stopColor={secondaryColor} />
        </linearGradient>

        {/* Connection line gradient - thinner lines */}
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.4" />
        </linearGradient>

        {/* Text gradient using brand colors */}
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={primaryColor} />
          <stop offset="100%" stopColor={secondaryColor} />
        </linearGradient>

        {/* Underline gradient with accent color */}
        <linearGradient id="underlineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={primaryColor} />
          <stop offset="50%" stopColor="#7b61ff" /> {/* Soft Liquid Purple (Accent) */}
          <stop offset="100%" stopColor={secondaryColor} />
        </linearGradient>

        {/* Glow filter for nodes */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={glowIntensity} result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Enhanced glow for central node */}
        <filter id="centerGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={glowIntensity * 1.5} result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Enhanced glow for animation peaks */}
        <filter id="enhancedGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation={glowIntensity} result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Text glow filter - more subtle */}
        <filter id="textGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Enhanced liquid effect for the dot on the "i" */}
        <radialGradient id="dropGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor={secondaryColor} />
        </radialGradient>

        {/* Flow network animation */}
        <linearGradient id="flowGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={primaryColor} stopOpacity="0.2" />
          <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.2" />
        </linearGradient>

        <linearGradient id="flowGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={secondaryColor} stopOpacity="0.2" />
          <stop offset="100%" stopColor={primaryColor} stopOpacity="0.2" />
        </linearGradient>

        {/* Animation definitions */}
        <style>
          {`
            @keyframes pulse {
              0% { transform: scale(1); filter: url(#glow); }
              50% { transform: scale(1.05); filter: url(#enhancedGlow); }
              100% { transform: scale(1); filter: url(#glow); }
            }
            
            @keyframes drift1 {
              0% { transform: translate(0, 0); }
              25% { transform: translate(1px, 1px); }
              50% { transform: translate(0, 2px); }
              75% { transform: translate(-1px, 1px); }
              100% { transform: translate(0, 0); }
            }
            
            @keyframes drift2 {
              0% { transform: translate(0, 0); }
              25% { transform: translate(-1px, 1px); }
              50% { transform: translate(-2px, 0); }
              75% { transform: translate(-1px, -1px); }
              100% { transform: translate(0, 0); }
            }
            
            @keyframes drift3 {
              0% { transform: translate(0, 0); }
              25% { transform: translate(1px, -1px); }
              50% { transform: translate(0, -2px); }
              75% { transform: translate(-1px, -1px); }
              100% { transform: translate(0, 0); }
            }
            
            @keyframes shimmer {
              0% { stroke-dashoffset: 20; }
              100% { stroke-dashoffset: 0; }
            }
            
            @keyframes flowWave1 {
              0% { transform: translateX(-10px); }
              100% { transform: translateX(10px); }
            }
            
            @keyframes flowWave2 {
              0% { transform: translateX(10px); }
              100% { transform: translateX(-10px); }
            }
            
            .central-node {
              animation: pulse 3s infinite ease-in-out;
            }
            
            .drift1 {
              animation: drift1 4s infinite ease-in-out;
            }
            
            .drift2 {
              animation: drift2 5s infinite ease-in-out;
            }
            
            .drift3 {
              animation: drift3 6s infinite ease-in-out;
            }
            
            .connection {
              stroke-dasharray: 20;
              animation: shimmer 3s infinite linear;
            }
            
            .flow-wave-1 {
              animation: flowWave1 8s infinite alternate ease-in-out;
            }
            
            .flow-wave-2 {
              animation: flowWave2 10s infinite alternate ease-in-out;
            }
          `}
        </style>
      </defs>

      {backgroundColor !== "transparent" && <rect width={width} height={height} fill={backgroundColor} />}

      {/* Flow network background effect - subtle waves behind everything */}
      <g className="flow-waves">
        <path
          className="flow-wave-1"
          d="M0,40 C20,35 40,45 60,40"
          stroke="url(#flowGradient1)"
          strokeWidth="15"
          fill="none"
          opacity="0.3"
        />
        <path
          className="flow-wave-2"
          d="M0,20 C20,25 40,15 60,20"
          stroke="url(#flowGradient2)"
          strokeWidth="15"
          fill="none"
          opacity="0.3"
        />
      </g>

      {/* LOGO SECTION - Icon Only */}
      <g transform="translate(30, 30)">
        {/* Background circle */}
        <circle cx="0" cy="0" r="25" fill="url(#circleGradient)" />

        {/* Neural network nodes and connections */}
        {/* Central node - using centerGlow */}
        <circle className="central-node" cx="0" cy="0" r="4" fill={glowColor} filter="url(#centerGlow)" />

        {/* Outer nodes - using glow */}
        <circle cx="-12" cy="-9" r="2.5" fill={glowColor} filter="url(#glow)" opacity="0.9" />
        <circle cx="12" cy="-9" r="2.5" fill={glowColor} filter="url(#glow)" opacity="0.9" />
        <circle cx="-12" cy="9" r="2.5" fill={glowColor} filter="url(#glow)" opacity="0.9" />
        <circle cx="12" cy="9" r="2.5" fill={glowColor} filter="url(#glow)" opacity="0.9" />
        <circle cx="0" cy="-15" r="2.5" fill={glowColor} filter="url(#glow)" opacity="0.9" />
        <circle cx="0" cy="15" r="2.5" fill={glowColor} filter="url(#glow)" opacity="0.9" />

        {/* Liquid-like connections */}
        <path
          className="connection"
          d="M0,-4 C-3,-6 -9,-8 -12,-9"
          stroke="url(#lineGradient)"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
        />
        <path
          className="connection"
          d="M0,-4 C3,-6 9,-8 12,-9"
          stroke="url(#lineGradient)"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
        />
        <path
          className="connection"
          d="M0,4 C-3,6 -9,8 -12,9"
          stroke="url(#lineGradient)"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
        />
        <path
          className="connection"
          d="M0,4 C3,6 9,8 12,9"
          stroke="url(#lineGradient)"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
        />
        <path
          className="connection"
          d="M0,-4 C0,-8 0,-12 0,-15"
          stroke="url(#lineGradient)"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
        />
        <path
          className="connection"
          d="M0,4 C0,8 0,12 0,15"
          stroke="url(#lineGradient)"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
        />

        {/* Droplet-like nodes with liquid drift animation */}
        <circle className="drift1" cx="-6" cy="-7" r="1.2" fill={glowColor} opacity="0.7" />
        <circle className="drift2" cx="6" cy="-7" r="1.2" fill={glowColor} opacity="0.7" />
        <circle className="drift3" cx="-6" cy="7" r="1.2" fill={glowColor} opacity="0.7" />
        <circle className="drift1" cx="6" cy="7" r="1.2" fill={glowColor} opacity="0.7" />
        <circle className="drift2" cx="0" cy="-9" r="1.2" fill={glowColor} opacity="0.7" />
        <circle className="drift3" cx="0" cy="9" r="1.2" fill={glowColor} opacity="0.7" />
      </g>

      {/* TEXT SECTION */}
      <g transform="translate(70, 25)">
        {/* Main text with custom styling */}
        <text
          ref={textRef}
          fontFamily="'Montserrat', sans-serif"
          fontSize="20"
          fill="url(#textGradient)"
          filter="url(#textGlow)"
          textAnchor="start"
          dominantBaseline="central"
        >
          <tspan fontWeight="700">Neural</tspan>
          <tspan fontWeight="300">L</tspan>
          <tspan fontWeight="300">i</tspan>
          <tspan fontWeight="300">quid</tspan>
        </text>

        {/* Custom dot for the "i" in "Liquid" */}
        <g className="drift1">
          <circle cx={dotPosition.x} cy={dotPosition.y} r="1.7" fill="#0099ff" filter="url(#textGlow)" />
        </g>

        {/* Liquid connection line under text */}
        <path
          className="connection"
          d="M0,20 C40,23 120,23 180,20"
          stroke="url(#underlineGradient)"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
        />

        {/* Subtle neural connection dots under the text */}
        <circle className="drift2" cx="30" cy="22" r="1" fill="#0099ff" opacity="0.6" />
        <circle className="drift3" cx="60" cy="23" r="1" fill="#0099ff" opacity="0.6" />
        <circle className="drift1" cx="90" cy="24" r="1" fill="#0099ff" opacity="0.6" />
        <circle className="drift2" cx="120" cy="23" r="1" fill="#0099ff" opacity="0.6" />
        <circle className="drift3" cx="150" cy="22" r="1" fill="#0099ff" opacity="0.6" />
      </g>
    </svg>
  )
}
