"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check } from "lucide-react"

export function NewsletterHero() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real implementation, you would send the email to your backend
    console.log("Email submitted:", email)
    setIsSubmitted(true)
    setEmail("")
  }

  return (
    <section className="relative overflow-hidden bg-brand-gradient py-16 px-4">
      <div className="particles-container">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 3 === 0 ? "#2d7fff" : i % 3 === 1 ? "#00c0a3" : "#8066ff",
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
              Stay Updated with Neural Liquid Innovations
            </h2>
            <p className="text-brand-gray mb-6">
              Join our newsletter for the latest in AI advancements and exclusive insights
            </p>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Your Email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-brand-blue to-brand-purple text-white hover:opacity-90"
                >
                  Subscribe
                </Button>
              </form>
            ) : (
              <div className="bg-white/10 rounded-md p-4 text-center">
                <div className="flex items-center justify-center gap-2 text-brand-aqua">
                  <Check className="h-5 w-5" />
                  <span>Thank you! We'll be in touch soon.</span>
                </div>
              </div>
            )}
          </div>

          <div className="hidden md:block">
            <div className="relative h-64 w-full">
              <div className="absolute inset-0">
                <div className="neural-network">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="neural-node"
                      style={{
                        width: `${Math.random() * 20 + 10}px`,
                        height: `${Math.random() * 20 + 10}px`,
                        left: `${Math.random() * 80 + 10}%`,
                        top: `${Math.random() * 80 + 10}%`,
                        background: i % 3 === 0 ? "#2d7fff" : i % 3 === 1 ? "#00c0a3" : "#8066ff",
                      }}
                    />
                  ))}
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className="neural-connection"
                      style={{
                        width: `${Math.random() * 100 + 50}px`,
                        left: `${Math.random() * 70 + 10}%`,
                        top: `${Math.random() * 80 + 10}%`,
                        transform: `rotate(${Math.random() * 360}deg)`,
                        background: `linear-gradient(90deg, 
                          ${i % 3 === 0 ? "#2d7fff" : i % 3 === 1 ? "#00c0a3" : "#8066ff"}80, 
                          ${i % 3 === 0 ? "#00c0a3" : i % 3 === 1 ? "#8066ff" : "#2d7fff"}80)`,
                      }}
                    />
                  ))}
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="neural-pulse"
                      style={{
                        left: `${Math.random() * 80 + 10}%`,
                        top: `${Math.random() * 80 + 10}%`,
                        background: i % 3 === 0 ? "#2d7fff" : i % 3 === 1 ? "#00c0a3" : "#8066ff",
                        animationDelay: `${Math.random() * 2}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
