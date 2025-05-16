"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Shield, TrendingUp, PieChart, BarChart3, FileText, Lock } from "lucide-react"

/**
 * Overview section for the Solutions page with tabs for different solutions
 */
export function SolutionsOverview() {
  const solutions = [
    {
      id: "treasury",
      title: "Treasury Management",
      icon: <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      description: "Comprehensive treasury management for digital assets with real-time monitoring, reporting, and optimization.",
      features: [
        "Multi-chain asset visibility",
        "Automated reporting and reconciliation",
        "Liquidity forecasting",
        "Yield optimization strategies",
        "Custom approval workflows",
        "Audit trails and compliance"
      ],
      image: "/treasury-dashboard.png"
    },
    {
      id: "portfolio",
      title: "Portfolio Optimization",
      icon: <PieChart className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      description: "AI-powered portfolio optimization to maximize returns while managing risk across digital asset holdings.",
      features: [
        "Risk-adjusted return optimization",
        "Scenario analysis and stress testing",
        "Correlation analysis",
        "Rebalancing recommendations",
        "Custom allocation strategies",
        "Performance attribution"
      ],
      image: "/portfolio-optimization.png"
    },
    {
      id: "risk",
      title: "Risk Management",
      icon: <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      description: "Advanced risk management tools to identify, measure, and mitigate risks across your digital asset operations.",
      features: [
        "Real-time risk monitoring",
        "Counterparty risk assessment",
        "Smart contract risk analysis",
        "Liquidity risk metrics",
        "Regulatory risk tracking",
        "Custom risk dashboards"
      ],
      image: "/risk-management.png"
    },
    {
      id: "compliance",
      title: "Compliance",
      icon: <Lock className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      description: "Comprehensive compliance solutions to meet regulatory requirements across multiple jurisdictions.",
      features: [
        "AML/KYC integration",
        "Transaction monitoring",
        "Regulatory reporting",
        "Cross-border compliance",
        "Audit-ready documentation",
        "Compliance workflow automation"
      ],
      image: "/compliance-dashboard.png"
    }
  ]

  return (
    <section className="py-20 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
            Our Solutions
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Explore our comprehensive suite of institutional liquidity management solutions designed to address your specific needs.
          </p>
        </div>
        
        <Tabs defaultValue="treasury" className="space-y-8">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
            {solutions.map(solution => (
              <TabsTrigger key={solution.id} value={solution.id} className="flex items-center gap-2">
                {solution.icon}
                <span className="hidden md:inline">{solution.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {solutions.map(solution => (
            <TabsContent key={solution.id} value={solution.id}>
              <Card>
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="p-6 md:p-8 space-y-4">
                      <div className="flex items-center gap-3 mb-4">
                        {solution.icon}
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                          {solution.title}
                        </h3>
                      </div>
                      
                      <p className="text-slate-600 dark:text-slate-400">
                        {solution.description}
                      </p>
                      
                      <div className="pt-4">
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                          Key Features
                        </h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                          {solution.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="pt-4">
                        <a 
                          href={`/corporate-version/solutions/${solution.id}`}
                          className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:underline"
                        >
                          Learn more
                          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                          </svg>
                        </a>
                      </div>
                    </div>
                    
                    <div className="relative h-64 md:h-auto bg-slate-100 dark:bg-slate-800">
                      <Image
                        src={solution.image}
                        alt={solution.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}