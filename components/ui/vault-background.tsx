"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface VaultBackgroundProps {
  className?: string
}

export function VaultBackground({ className = "" }: VaultBackgroundProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme === "dark"

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1200 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 opacity-[0.07] dark:opacity-[0.12]"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Outer Vault Circle */}
        <circle
          cx="600"
          cy="400"
          r="350"
          stroke={isDark ? "#3B82F6" : "#1E40AF"}
          strokeWidth="20"
          strokeDasharray="40 20"
        />

        {/* Middle Vault Circle */}
        <circle cx="600" cy="400" r="300" stroke={isDark ? "#60A5FA" : "#2563EB"} strokeWidth="15" />

        {/* Inner Vault Circle */}
        <circle cx="600" cy="400" r="250" stroke={isDark ? "#93C5FD" : "#3B82F6"} strokeWidth="10" />

        {/* Vault Door Handle */}
        <circle cx="900" cy="400" r="50" fill={isDark ? "rgba(59, 130, 246, 0.3)" : "rgba(30, 64, 175, 0.3)"} />
        <circle cx="900" cy="400" r="30" fill={isDark ? "rgba(96, 165, 250, 0.4)" : "rgba(37, 99, 235, 0.4)"} />

        {/* Lock Mechanism */}
        <g transform="rotate(45, 900, 400)">
          <rect
            x="800"
            y="395"
            width="200"
            height="10"
            fill={isDark ? "rgba(147, 197, 253, 0.3)" : "rgba(59, 130, 246, 0.3)"}
          />
          <rect
            x="895"
            y="300"
            width="10"
            height="200"
            fill={isDark ? "rgba(147, 197, 253, 0.3)" : "rgba(59, 130, 246, 0.3)"}
          />
        </g>

        {/* Security Bolts */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180
          const x = 600 + 350 * Math.cos(angle)
          const y = 400 + 350 * Math.sin(angle)
          return (
            <circle key={i} cx={x} cy={y} r="15" fill={isDark ? "rgba(96, 165, 250, 0.5)" : "rgba(37, 99, 235, 0.5)"} />
          )
        })}

        {/* Digital Security Lines */}
        <path
          d="M 100,100 L 300,100 L 300,150 L 350,150 L 350,200 L 400,200 L 400,250"
          stroke={isDark ? "rgba(147, 197, 253, 0.4)" : "rgba(59, 130, 246, 0.4)"}
          strokeWidth="2"
          strokeDasharray="5 5"
        />
        <path
          d="M 1100,700 L 900,700 L 900,650 L 850,650 L 850,600 L 800,600 L 800,550"
          stroke={isDark ? "rgba(147, 197, 253, 0.4)" : "rgba(59, 130, 246, 0.4)"}
          strokeWidth="2"
          strokeDasharray="5 5"
        />
      </svg>

      {/* Binary Code Pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] dark:opacity-[0.05] overflow-hidden">
        <div className="absolute top-[10%] left-[5%] text-[8px] font-mono text-slate-900 dark:text-blue-300 whitespace-nowrap">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i}>
              {Array.from({ length: 100 }).map((_, j) => (
                <span key={j}>{Math.random() > 0.5 ? "1" : "0"}</span>
              ))}
            </div>
          ))}
        </div>
        <div className="absolute bottom-[10%] right-[5%] text-[8px] font-mono text-slate-900 dark:text-blue-300 whitespace-nowrap">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i}>
              {Array.from({ length: 100 }).map((_, j) => (
                <span key={j}>{Math.random() > 0.5 ? "1" : "0"}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
