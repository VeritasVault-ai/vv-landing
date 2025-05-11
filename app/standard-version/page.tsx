import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { generateStandardMetadata } from "@/lib/metadata-utils"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, Zap, Shield } from "lucide-react"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = generateStandardMetadata(
  "AI-Powered Liquidity Management for DeFi",
  "Optimize your liquidity with AI-powered tools and strategies for DeFi users and traders.",
  "/api/og/standard",
)

export default function StandardHomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0a1025] text-white">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-[40%] -right-[10%] w-[70%] h-[70%] rounded-full bg-blue-900/10 blur-3xl"></div>
            <div className="absolute top-[60%] -left-[5%] w-[40%] h-[40%] rounded-full bg-purple-900/10 blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
                  Intelligent Liquidity Optimization
                </h1>
                <p className="text-xl mb-8 max-w-2xl mx-auto lg:mx-0 text-gray-300">
                  Our platform leverages advanced AI to maximize returns while minimizing risks for liquidity providers.
                </p>

                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-lg">
                    Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    className="border-blue-500/30 text-white hover:bg-blue-500/20 px-8 py-6 text-lg rounded-lg"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="flex-1 relative">
                <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg border border-blue-500/20">
                  <Image
                    src="/dashboard-preview.png"
                    alt="NeuralLiquid Dashboard showing liquidity pool analytics"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-[#0c1530]/50 border-y border-blue-900/20">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center">
              <div className="bg-black/30 backdrop-blur-sm px-8 py-3 rounded-full border border-blue-500/20">
                <p className="text-center flex items-center gap-2">
                  Average yield boost: <span className="text-[#12f7b2] font-semibold">+12.7%</span> over manual
                  strategies
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 bg-blue-900/30 rounded-full text-blue-400 text-sm font-medium mb-4">
                Features
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Maximize Your DeFi Returns</h2>
              <p className="text-xl max-w-3xl mx-auto text-gray-300">
                Our platform delivers measurable improvements for liquidity providers, treasuries, and institutional
                investors.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#0c1530]/50 rounded-lg border border-blue-900/20 p-6">
                <div className="h-12 w-12 rounded-full bg-blue-900/30 flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Predictive Analytics</h3>
                <p className="text-gray-300">
                  AI-powered models predict pool performance and potential impermanent loss before you commit capital.
                </p>
              </div>

              <div className="bg-[#0c1530]/50 rounded-lg border border-blue-900/20 p-6">
                <div className="h-12 w-12 rounded-full bg-blue-900/30 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Dynamic Rebalancing</h3>
                <p className="text-gray-300">
                  Automated algorithms continuously rebalance your positions across multiple pools for optimal returns.
                </p>
              </div>

              <div className="bg-[#0c1530]/50 rounded-lg border border-blue-900/20 p-6">
                <div className="h-12 w-12 rounded-full bg-blue-900/30 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Risk Management</h3>
                <p className="text-gray-300">
                  Sophisticated risk assessment tools help you understand and mitigate potential downsides.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-[#0c1530]/50 border-y border-blue-900/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 bg-blue-900/30 rounded-full text-blue-400 text-sm font-medium mb-4">
                Benefits
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Maximize Your DeFi Returns</h2>
              <p className="text-xl max-w-3xl mx-auto text-gray-300">
                Our platform delivers measurable improvements for liquidity providers, treasuries, and institutional
                investors.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <p className="text-4xl font-bold text-[#12f7b2] mb-2">30%+</p>
                <h3 className="text-xl font-semibold mb-2">Improved Capital Efficiency</h3>
                <p className="text-gray-400">
                  Optimize your capital utilization across multiple protocols simultaneously
                </p>
              </div>

              <div className="text-center">
                <p className="text-4xl font-bold text-[#12f7b2] mb-2">50%</p>
                <h3 className="text-xl font-semibold mb-2">Reduced Impermanent Loss</h3>
                <p className="text-gray-400">AI predictions help you avoid pools with high impermanent loss risk</p>
              </div>

              <div className="text-center">
                <p className="text-4xl font-bold text-[#12f7b2] mb-2">24/7</p>
                <h3 className="text-xl font-semibold mb-2">Automated Management</h3>
                <p className="text-gray-400">Set your strategy and let our platform handle the rest</p>
              </div>
            </div>
          </div>
        </section>

        {/* Neural Networks Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Neural Networks in Action</h2>
            </div>

            <div className="bg-[#0c1530]/50 rounded-lg border border-blue-900/20 p-6 max-w-4xl mx-auto">
              <div className="aspect-video relative">
                <Image
                  src="/abstract-neural-network.png"
                  alt="Neural network visualization"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-sm text-gray-400 mt-2">System architecture visualization</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#0c1530]/50 border-y border-blue-900/20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Secure Your Spot: Limited Alpha Access</h2>
              <p className="text-xl mb-8 text-gray-300">
                Be among the first to experience NeuralLiquid's AI-powered liquidity optimization.
              </p>

              <Button className="bg-[#12f7b2] hover:bg-[#0ce0a2] text-[#0a1025] font-medium px-8 py-6 text-lg rounded-lg">
                Claim Your Spot in the Neural Alpha
              </Button>

              <p className="mt-4 text-[#12f7b2]">
                <span className="inline-flex items-center">
                  <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Only 47 early access slots remaining
                </span>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
