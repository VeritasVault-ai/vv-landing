import { cn } from "@/lib/utils"

interface LogoIconOnlyProps {
  className?: string
  width?: number
  height?: number
  variant?: "light" | "dark" | "auto"
}

export function LogoIconOnly({ className, width = 40, height = 40, variant = "auto" }: LogoIconOnlyProps) {
  // Determine colors based on variant
  const primaryColor = "#2d7fff"
  const secondaryColor = "#00d1b2"

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 60 60"
      className={cn("h-auto w-auto", className)}
    >
      {/* Background circle */}
      <circle cx="30" cy="30" r="25" fill="url(#iconCircleGradient)" />

      {/* Neural network nodes and connections */}
      <circle cx="30" cy="30" r="4" fill="#ffffff" />
      <circle cx="18" cy="21" r="2.5" fill="#ffffff" opacity="0.9" />
      <circle cx="42" cy="21" r="2.5" fill="#ffffff" opacity="0.9" />
      <circle cx="18" cy="39" r="2.5" fill="#ffffff" opacity="0.9" />
      <circle cx="42" cy="39" r="2.5" fill="#ffffff" opacity="0.9" />
      <circle cx="30" cy="15" r="2.5" fill="#ffffff" opacity="0.9" />
      <circle cx="30" cy="45" r="2.5" fill="#ffffff" opacity="0.9" />

      {/* Connections */}
      <path
        d="M30,26 C27,24 21,22 18,21"
        stroke="#ffffff"
        strokeWidth="0.8"
        fill="none"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M30,26 C33,24 39,22 42,21"
        stroke="#ffffff"
        strokeWidth="0.8"
        fill="none"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M30,34 C27,36 21,38 18,39"
        stroke="#ffffff"
        strokeWidth="0.8"
        fill="none"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M30,34 C33,36 39,38 42,39"
        stroke="#ffffff"
        strokeWidth="0.8"
        fill="none"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M30,26 C30,22 30,18 30,15"
        stroke="#ffffff"
        strokeWidth="0.8"
        fill="none"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M30,34 C30,38 30,42 30,45"
        stroke="#ffffff"
        strokeWidth="0.8"
        fill="none"
        strokeLinecap="round"
        opacity="0.8"
      />

      <defs>
        <linearGradient id="iconCircleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} />
          <stop offset="100%" stopColor={secondaryColor} />
        </linearGradient>
      </defs>
    </svg>
  )
}
