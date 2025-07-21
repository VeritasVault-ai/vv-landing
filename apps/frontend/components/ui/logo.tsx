import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  size?: number
}

export function Logo({ className, size = 40 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-auto w-auto", className)}
    >
      <circle cx="20" cy="20" r="20" fill="url(#logo-gradient)" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 10C14.4772 10 10 14.4772 10 20C10 25.5228 14.4772 30 20 30C25.5228 30 30 25.5228 30 20C30 14.4772 25.5228 10 20 10ZM15 16C15.5523 16 16 16.4477 16 17C16 17.5523 15.5523 18 15 18C14.4477 18 14 17.5523 14 17C14 16.4477 14.4477 16 15 16ZM25 16C25.5523 16 26 16.4477 26 17C26 17.5523 25.5523 18 25 18C24.4477 18 24 17.5523 24 17C24 16.4477 24.4477 16 25 16ZM17 20C17.5523 20 18 20.4477 18 21C18 21.5523 17.5523 22 17 22C16.4477 22 16 21.5523 16 21C16 20.4477 16.4477 20 17 20ZM23 20C23.5523 20 24 20.4477 24 21C24 21.5523 23.5523 22 23 22C22.4477 22 22 21.5523 22 21C22 20.4477 22.4477 20 23 20ZM20 16C20.5523 16 21 16.4477 21 17C21 17.5523 20.5523 18 20 18C19.4477 18 19 17.5523 19 17C19 16.4477 19.4477 16 20 16ZM20 22C20.5523 22 21 22.4477 21 23C21 23.5523 20.5523 24 20 24C19.4477 24 19 23.5523 19 23C19 22.4477 19.4477 22 20 22Z"
        fill="white"
      />
      <defs>
        <linearGradient id="logo-gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2d7fff" />
          <stop offset="1" stopColor="#00d1b2" />
        </linearGradient>
      </defs>
    </svg>
  )
}
