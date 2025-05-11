"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface AlternativeHeroProps {
  title?: string
  subtitle?: string
  ctaText?: string
  ctaLink?: string
  className?: string
}

export function AlternativeHero({
  title = "Neural Liquid: Advanced AI Solutions",
  subtitle = "Transforming data into intelligent fluid decisions",
  ctaText = "Explore Solutions",
  ctaLink = "/dashboard",
  className,
}: AlternativeHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5

      setMousePosition({ x, y })
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [])

  return (
    <section
      ref={containerRef}
      className={cn("relative overflow-hidden bg-brand-gradient py-20 md:py-32 px-4", className)}
    >
      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6">{title}</h1>
          <p className="text-xl text-brand-gray mb-8">{subtitle}</p>
          <Button
            asChild
            className="bg-gradient-to-r from-brand-blue to-brand-aqua text-white hover:opacity-90 px-8 py-6 text-lg"
          >
            <Link href={ctaLink}>
              {ctaText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Neural Network Background */}
      <div
        className="absolute inset-0 z-0 opacity-30"
        style={{
          transform: `translateX(${mousePosition.x * -20}px) translateY(${mousePosition.y * -20}px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <div className="neural-network h-full w-full">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="neural-node"
              style={{
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: i % 3 === 0 ? "#2d7fff" : i % 3 === 1 ? "#00c0a3" : "#8066ff",
              }}
            />
          ))}
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="neural-connection"
              style={{
                width: `${Math.random() * 200 + 100}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
                background: `linear-gradient(90deg, 
                  ${i % 3 === 0 ? "#2d7fff" : i % 3 === 1 ? "#00c0a3" : "#8066ff"}40, 
                  ${i % 3 === 0 ? "#00c0a3" : i % 3 === 1 ? "#8066ff" : "#2d7fff"}40)`,
              }}
            />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="neural-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: i % 3 === 0 ? "#2d7fff" : i % 3 === 1 ? "#00c0a3" : "#8066ff",
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
