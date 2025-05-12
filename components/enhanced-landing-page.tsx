import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, Shield, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { NeuralNetworkVisualization } from "@/components/neural-network-visualization"
import { RotatingStats } from "@/components/rotating-stats"
import { WaitlistSignup } from "@/components/waitlist-signup"
import { HowItWorks } from "@/components/how-it-works"

export function EnhancedLandingPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-[#0a0f2c] to-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-[#3A86FF] to-[#4ECDC4] bg-clip-text text-transparent">
                AI-Powered
              </span>{" "}
              Liquidity Management Platform
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Optimize your DeFi liquidity with advanced neural networks and predictive analytics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/demo">
                  Try Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/how-it-works">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background to-background/0 pointer-events-none" />
      </section>

      {/* Rotating Stats Section */}
      <RotatingStats />

      {/* How It Works Section */}
      <section id="how-it-works" className="w-full bg-[#0a0f2c]">
        <HowItWorks />
      </section>

      {/* Neural Network Visualization */}
      <section className="py-16 px-4 bg-[#0a0f2c]">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center text-white">Neural Networks in Action</h2>
          <NeuralNetworkVisualization />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-12 md:py-16 bg-gradient-to-b from-[#0a0f2c] to-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-[#00d1b2]/20 px-3 py-1 text-sm text-[#00d1b2]">Features</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                Intelligent Liquidity Optimization
              </h2>
              <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform leverages advanced AI to maximize returns while minimizing risks for liquidity providers.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            <Card className="bg-[#0a0f2c]/80 border-[#2d7fff]/20">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <BarChart3 className="h-8 w-8 text-[#2d7fff]" />
                <CardTitle className="text-xl text-white">Predictive Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-gray-400">
                  AI-powered models predict pool performance and potential impermanent loss before you commit capital.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="bg-[#0a0f2c]/80 border-[#00d1b2]/20">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Zap className="h-8 w-8 text-[#00d1b2]" />
                <CardTitle className="text-xl text-white">Dynamic Rebalancing</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-gray-400">
                  Automated algorithms continuously rebalance your positions across multiple pools for optimal returns.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="bg-[#0a0f2c]/80 border-[#7b61ff]/20">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Shield className="h-8 w-8 text-[#7b61ff]" />
                <CardTitle className="text-xl text-white">Risk Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-gray-400">
                  Sophisticated risk assessment tools help you understand and mitigate potential downsides.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="w-full py-12 md:py-16 bg-[#0a0f2c]/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-[#7b61ff]/20 px-3 py-1 text-sm text-[#7b61ff]">Benefits</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                Maximize Your DeFi Returns
              </h2>
              <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform delivers measurable improvements for liquidity providers, treasuries, and institutional
                investors.
              </p>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            <div className="flex flex-col items-center space-y-2 border border-gray-800 rounded-lg p-6 bg-[#0a0f2c]/80">
              <div className="text-4xl font-bold text-[#00d1b2]">30%+</div>
              <p className="text-xl font-medium text-white">Improved Capital Efficiency</p>
              <p className="text-sm text-gray-400 text-center">
                Optimize your capital utilization across multiple protocols simultaneously
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border border-gray-800 rounded-lg p-6 bg-[#0a0f2c]/80">
              <div className="text-4xl font-bold text-[#00d1b2]">50%</div>
              <p className="text-xl font-medium text-white">Reduced Impermanent Loss</p>
              <p className="text-sm text-gray-400 text-center">
                AI predictions help you avoid pools with high impermanent loss risk
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border border-gray-800 rounded-lg p-6 bg-[#0a0f2c]/80">
              <div className="text-4xl font-bold text-[#00d1b2]">24/7</div>
              <p className="text-xl font-medium text-white">Automated Management</p>
              <p className="text-sm text-gray-400 text-center">
                Set your strategy and let our platform handle the rest
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Signup */}
      <WaitlistSignup />

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Optimize Your Liquidity?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of DeFi protocols and liquidity providers already using our platform.
              </p>
              <Button size="lg" asChild>
                <Link href="/demo">Get Started Today</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
