"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UnifiedHeader } from "@/components/unified-header"
import { ArrowRight, ChevronRight, HelpCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function DemoLandingPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const handleExitDemo = () => {
    // Navigate to main site or handle demo exit
    const router = useRouter();
    router.push('/');
  };

  return (
    <div className="flex min-h-screen flex-col">
      <UnifiedHeader 
        variant="demo"
        showSearch={false}
        showUserMenu={false}
        onExitDemoClick={handleExitDemo}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-[#0a0f2c] to-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4" variant="outline">
                Interactive Demo
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                <span className="bg-gradient-to-r from-[#3A86FF] to-[#4ECDC4] bg-clip-text text-transparent">
                  Tezos Liquidity
                </span>{" "}
                Management Platform
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Experience our AI-powered platform for optimizing DeFi liquidity positions and minimizing risk.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/standard-demo/dashboard">
                    Launch Interactive Demo <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/standard-demo/dashboard?tour=true">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Start Guided Tour
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-background to-background/0 pointer-events-none" />
        </section>

        {/* Demo Preview Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Interactive Demo Experience</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Explore our platform's features and capabilities in a simulated environment with real-world data.
              </p>
            </div>

            <div className="relative rounded-xl overflow-hidden border shadow-lg">
              <div className="aspect-video relative">
                <Image
                  src="/liquidity-dashboard.png"
                  alt="Tezos Liquidity Dashboard Preview"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-4">
                  <Button size="lg" asChild>
                    <Link href="/standard-demo/dashboard">
                      Start Demo Experience <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="bg-black/30" asChild>
                    <Link href="/standard-demo/dashboard?tour=true">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      Start Guided Tour
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What You'll Explore Section */}
        <section id="features" className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What You'll Explore</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our demo showcases the key features of our platform that help liquidity providers optimize their
                positions.
              </p>
            </div>

            <Tabs defaultValue="overview" className="max-w-4xl mx-auto" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
                <TabsTrigger value="strategies">Strategies</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Dashboard Overview</CardTitle>
                    <CardDescription>
                      Get a comprehensive view of your liquidity positions and market conditions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Key Features</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <span>Real-time portfolio performance tracking</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <span>Market metrics and TVL comparisons</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <span>Strategy performance visualization</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <span>Risk overview and quick insights</span>
                          </li>
                        </ul>
                      </div>
                      <div className="relative rounded-md overflow-hidden border h-[200px]">
                        <Image src="/dashboard-preview.png" alt="Dashboard Preview" fill className="object-cover" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild>
                      <Link href="/standard-demo/dashboard?tab=dashboard&tour=true">
                        Explore Dashboard with Tour <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="risk" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>AI-Powered Risk Assessment</CardTitle>
                    <CardDescription>
                      Understand and mitigate risks in your liquidity positions with AI-driven insights
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Key Features</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <span>Comprehensive risk scoring system</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <span>Detailed risk factor analysis</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <span>AI-generated risk mitigation recommendations</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <span>Market scenario simulations</span>
                          </li>
                        </ul>
                      </div>
                      <div className="relative rounded-md overflow-hidden border h-[200px]">
                        <Image
                          src="/advanced-analytics-predictive-dashboard.png"
                          alt="Advanced Analytics Predictive Dashboard"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild>
                      <Link href="/standard-demo/dashboard?tab=risk&tour=true">
                        Explore Risk Assessment <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="strategies" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Strategy Builder & Optimization</CardTitle>
                    <CardDescription>
                      Create, test, and optimize liquidity provision strategies with AI assistance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Key Features</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <span>Drag-and-drop strategy builder</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <span>AI-powered strategy recommendations</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <span>Historical backtesting capabilities</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <span>Strategy comparison and optimization</span>
                          </li>
                        </ul>
                      </div>
                      <div className="relative rounded-md overflow-hidden border h-[200px]">
                        <Image
                          src="/strategy-preview.png"
                          alt="Strategy Builder Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild>
                      <Link href="/standard-demo/dashboard?tab=strategies&tour=true">
                        Explore Strategy Builder <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Advanced Analytics</CardTitle>
                    <CardDescription>Gain deeper insights into market trends and performance metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Key Features</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <span>Historical performance analysis</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <span>Market correlation insights</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <span>Predictive analytics and forecasting</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <span>Custom reporting and data visualization</span>
                          </li>
                        </ul>
                      </div>
                      <div className="relative rounded-md overflow-hidden border h-[200px]">
                        <Image
                          src="/analytics-preview.png"
                          alt="Analytics Dashboard Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild>
                      <Link href="/standard-demo/dashboard?tab=analytics&tour=true">
                        Explore Analytics <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Experience the Future of Liquidity Management?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our interactive demo gives you a hands-on experience with our platform's capabilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/standard-demo/dashboard">
                  Launch Interactive Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
