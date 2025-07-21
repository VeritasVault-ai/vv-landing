"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface Metric {
  value: number
  label: string
  color: string
  prefix?: string
  suffix?: string
}

interface CaseStudyHeroProps {
  title?: string
  clientName?: string
  clientQuote?: string
  clientImage?: string
  metrics?: Metric[]
  className?: string
}

export function CaseStudyHero({
  title = "How Company X Transformed Their Data Pipeline",
  clientName = "Jane Doe, CTO",
  clientQuote = "NeuralLiquid's AI-powered platform revolutionized our liquidity management strategy, resulting in unprecedented returns and efficiency.",
  clientImage = "/confident-professional.png",
  metrics = [
    { value: 47, label: "Increase in Returns", color: "brand-blue", suffix: "%" },
    { value: 2.3, label: "Capital Saved", color: "brand-aqua", prefix: "$", suffix: "M" },
    { value: 350, label: "Response Time", color: "brand-purple", suffix: "ms" },
  ],
  className,
}: CaseStudyHeroProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [counts, setCounts] = useState<number[]>(metrics.map(() => 0))

  useEffect(() => {
    setIsVisible(true)

    if (isVisible) {
      const intervals = metrics.map((metric, index) => {
        return setInterval(() => {
          setCounts((prev) => {
            const newCounts = [...prev]
            if (newCounts[index] < metric.value) {
              newCounts[index] = Math.min(newCounts[index] + metric.value / 50, metric.value)
            }
            return newCounts
          })
        }, 30)
      })

      return () => {
        intervals.forEach((interval) => clearInterval(interval))
      }
    }
  }, [isVisible, metrics])

  return (
    <section className={cn("bg-brand-gradient py-16 px-4", className)}>
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-8 text-center">{title}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="relative overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-brand-purple/30 z-10"></div>
            <Image
              src={clientImage || "/placeholder.svg"}
              alt={clientName}
              width={500}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <blockquote className="relative">
              <div className="text-4xl text-brand-purple absolute -top-6 -left-4">"</div>
              <p className="text-brand-gray text-lg mb-4 relative z-10">{clientQuote}</p>
              <div className="text-4xl text-brand-purple absolute -bottom-10 right-0">"</div>
              <footer className="text-white mt-4">{clientName}</footer>
            </blockquote>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <Card key={index} className="bg-white/5 border-white/10 overflow-hidden">
              <CardContent className="p-6">
                <div className={`text-4xl md:text-5xl font-semibold mb-2 text-${metric.color} count-animation`}>
                  {metric.prefix || ""}
                  {Math.round(counts[index] * 10) / 10}
                  {metric.suffix || ""}
                </div>
                <p className="text-brand-gray">{metric.label}</p>
                <div className={`h-1 w-full mt-4 bg-${metric.color}/30`}>
                  <div
                    className={`h-full bg-${metric.color}`}
                    style={{
                      width: `${(counts[index] / metric.value) * 100}%`,
                      transition: "width 0.3s ease-out",
                    }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
