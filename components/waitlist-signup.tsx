"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function WaitlistSignup() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [liquidity, setLiquidity] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSuccess(true)
      setEmail("")
      setName("")
      setLiquidity("")
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full py-16 md:py-20 bg-gradient-to-b from-[#0a0f2c] to-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center max-w-md mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-white text-center mb-6">
            Secure Your Spot: Limited Alpha Access
          </h2>

          <div className="flex items-center justify-center mb-2">
            <div className="bg-amber-400/20 text-amber-400 text-xs px-3 py-1 rounded-full flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
              </svg>
              <span>Join by May 10th for beta tester benefits</span>
            </div>
          </div>

          <p className="text-gray-300 text-center mb-8">
            Be among the first to experience NeuralLiquid's AI-powered liquidity optimization.
          </p>

          {isSuccess ? (
            <div className="bg-[#00d1b2]/20 border border-[#00d1b2]/30 rounded-lg p-6 text-center w-full">
              <h3 className="text-xl font-medium text-white mb-2">You're In!</h3>
              <p className="text-gray-300">
                You've secured your spot in the Neural Alpha. We'll be in touch within 48 hours with your exclusive
                access details.
              </p>
              <div className="mt-3 mb-4 bg-white/10 rounded-md p-3 text-sm">
                <p className="text-brand-aqua">Want priority access? Share NeuralLiquid with your network:</p>
                <div className="flex justify-center gap-3 mt-2">
                  <button className="bg-[#1DA1F2]/20 hover:bg-[#1DA1F2]/30 p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="#1DA1F2"
                      stroke="none"
                    >
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                    </svg>
                  </button>
                  <button className="bg-[#0077B5]/20 hover:bg-[#0077B5]/30 p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="#0077B5"
                      stroke="none"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </button>
                  <button className="bg-[#25D366]/20 hover:bg-[#25D366]/30 p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="#25D366"
                      stroke="none"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </button>
                </div>
              </div>
              <Button className="mt-2 bg-[#00d1b2] hover:bg-[#00a191] text-white" onClick={() => setIsSuccess(false)}>
                Invite a Colleague
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">
                  Name (Optional)
                </Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-[#0a0f2c]/50 border-gray-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#0a0f2c]/50 border-gray-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="liquidity" className="text-white flex items-center">
                  How much liquidity do you manage?
                  <span
                    className="ml-1 text-xs text-gray-400 inline-flex items-center"
                    title="Used only to personalize your onboarding experience"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                  </span>
                </Label>
                <Select value={liquidity} onValueChange={setLiquidity}>
                  <SelectTrigger className="bg-[#0a0f2c]/50 border-gray-700 text-white">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="<10k">Less than $10,000</SelectItem>
                    <SelectItem value="10k-50k">$10,000 - $50,000</SelectItem>
                    <SelectItem value="50k-250k">$50,000 - $250,000</SelectItem>
                    <SelectItem value="250k-1m">$250,000 - $1,000,000</SelectItem>
                    <SelectItem value=">1m">More than $1,000,000</SelectItem>
                    <SelectItem value="prefer-not-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#00d1b2] hover:bg-[#00a191] text-white font-semibold py-6 text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Claim Your Spot in the Neural Alpha"}
              </Button>

              <div className="flex items-center justify-center mt-2 text-amber-400 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5"></path>
                  <path d="M2 12l10 5 10-5"></path>
                </svg>
                <span>Only 47 early access slots remaining</span>
              </div>

              {error && <p className="text-red-400 text-sm text-center">{error}</p>}

              <p className="text-gray-400 text-xs text-center pt-2">
                We respect your privacy. Your information will only be used to notify you about NeuralLiquid's launch
                and early access opportunities.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
