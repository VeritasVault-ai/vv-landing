"use client"

interface LogoPathOnlyProps {
  width?: number
  height?: number
  primaryColor?: string
  secondaryColor?: string
  strokeWidth?: number
  className?: string
}

export function LogoPathOnly({
  width = 280,
  height = 60,
  primaryColor = "#2d7fff",
  secondaryColor = "#00d1b2",
  strokeWidth = 0.8,
  className = "",
}: LogoPathOnlyProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 280 60" className={className}>
      <defs>
        {/* Connection line gradient */}
        <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} stopOpacity="0.8" />
          <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.4" />
        </linearGradient>

        {/* Animation definitions */}
        <style>
          {`
            @keyframes shimmer {
              0% { stroke-dashoffset: 20; }
              100% { stroke-dashoffset: 0; }
            }
            
            .connection {
              stroke-dasharray: 20;
              animation: shimmer 3s infinite linear;
            }
          `}
        </style>
      </defs>

      {/* Neural network paths only */}
      <g transform="translate(30, 30)">
        {/* Liquid-like connections */}
        <path
          className="connection"
          d="M0,-4 C-3,-6 -9,-8 -12,-9"
          stroke="url(#pathGradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
        />
        <path
          className="connection"
          d="M0,-4 C3,-6 9,-8 12,-9"
          stroke="url(#pathGradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
        />
        <path
          className="connection"
          d="M0,4 C-3,6 -9,8 -12,9"
          stroke="url(#pathGradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
        />
        <path
          className="connection"
          d="M0,4 C3,6 9,8 12,9"
          stroke="url(#pathGradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
        />
        <path
          className="connection"
          d="M0,-4 C0,-8 0,-12 0,-15"
          stroke="url(#pathGradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
        />
        <path
          className="connection"
          d="M0,4 C0,8 0,12 0,15"
          stroke="url(#pathGradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </svg>
  )
}
