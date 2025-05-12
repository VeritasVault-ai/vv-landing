import { generateStandardMetadata } from "@/lib/metadata-utils"
import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Share2, Twitter, Youtube } from "lucide-react"
import { Header } from "@/components/layout/header"

export const metadata: Metadata = generateStandardMetadata(
  "Marketing Resources | Liquidity Management",
  "Marketing resources and community tools for DeFi liquidity management.",
  "/api/og/standard-marketing",
)

export default function StandardMarketingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Header />
      <div className="container mx-auto px-4 py-12 pt-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2 text-slate-900 dark:text-white">Marketing & Community Resources</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
            Share your success and connect with the community using these resources.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                  Share Your Success
                </CardTitle>
                <CardDescription>Tools to share your liquidity management results</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 dark:text-slate-300 mb-4">
                  Easily share your portfolio performance and strategies with your community.
                </p>
                <div className="space-y-4">
                  <Button className="w-full flex items-center justify-center gap-2">
                    <Twitter className="h-4 w-4" />
                    <span>Share on Twitter</span>
                  </Button>
                  <Button variant="outline" className="w-full">
                    Generate Shareable Image
                  </Button>
                  <Button variant="outline" className="w-full">
                    Create Performance Report
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Youtube className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                  Tutorial Resources
                </CardTitle>
                <CardDescription>Learn how to maximize your liquidity strategy</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-4">
                  <li className="flex justify-between items-center">
                    <span className="text-slate-700 dark:text-slate-300">
                      Getting Started with Liquidity Management
                    </span>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-slate-700 dark:text-slate-300">Advanced Strategy Building</span>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-slate-700 dark:text-slate-300">Optimizing for Market Conditions</span>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </li>
                </ul>
                <Button className="w-full">View All Tutorials</Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Community Resources</CardTitle>
              <CardDescription>Connect with other liquidity providers and strategists</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="bg-slate-50 dark:bg-slate-800 border-0">
                  <CardContent className="p-4 text-center">
                    <h3 className="font-medium mb-1">Discord Community</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">Join 10,000+ liquidity providers</p>
                    <Button size="sm" className="w-full">
                      Join Discord
                    </Button>
                  </CardContent>
                </Card>
                <Card className="bg-slate-50 dark:bg-slate-800 border-0">
                  <CardContent className="p-4 text-center">
                    <h3 className="font-medium mb-1">Strategy Forum</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">Share and discuss strategies</p>
                    <Button size="sm" className="w-full">
                      Visit Forum
                    </Button>
                  </CardContent>
                </Card>
                <Card className="bg-slate-50 dark:bg-slate-800 border-0">
                  <CardContent className="p-4 text-center">
                    <h3 className="font-medium mb-1">Weekly Webinars</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">Learn from experts</p>
                    <Button size="sm" className="w-full">
                      Register
                    </Button>
                  </CardContent>
                </Card>
              </div>
              <Button variant="outline" className="w-full">
                View All Community Resources
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
