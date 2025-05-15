"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useRouter } from "next/navigation"

/**
 * Pricing tiers component with monthly/annual toggle
 */
export function PricingTiers() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("annual")
  const router = useRouter()
  
  const handleDemoClick = () => {
    router.push('/corporate-version/demo')
  }
  
  const handleContactClick = () => {
    router.push('/corporate-version/contact')
  }
  
  // Pricing plans data
  const plans = [
    {
      name: "Growth",
      description: "For emerging funds and treasury operations",
      monthlyPrice: 2499,
      annualPrice: 1999,
      features: [
        "Up to $50M AUM",
        "5 user accounts",
        "Core treasury management",
        "Basic portfolio optimization",
        "Standard reporting",
        "Email support",
        "Multi-chain support (5 chains)",
        "API access (100 calls/min)"
      ],
      limitations: [
        "Advanced risk analytics",
        "Custom integrations",
        "Dedicated account manager"
      ],
      cta: "Request Demo",
      popular: false
    },
    {
      name: "Professional",
      description: "For established funds and financial institutions",
      monthlyPrice: 4999,
      annualPrice: 3999,
      features: [
        "Up to $250M AUM",
        "15 user accounts",
        "Advanced treasury management",
        "Full portfolio optimization",
        "Custom reporting",
        "Priority support",
        "Multi-chain support (15 chains)",
        "API access (500 calls/min)",
        "Advanced risk analytics",
        "Basic compliance tools"
      ],
      limitations: [
        "Enterprise integrations",
        "White-labeling"
      ],
      cta: "Request Demo",
      popular: true
    },
    {
      name: "Enterprise",
      description: "For large institutions with complex needs",
      monthlyPrice: null,
      annualPrice: null,
      priceLabel: "Custom Pricing",
      features: [
        "Unlimited AUM",
        "Unlimited user accounts",
        "Full feature access",
        "Enterprise-grade security",
        "Custom integrations",
        "Dedicated account manager",
        "24/7 premium support",
        "Multi-chain support (all chains)",
        "Unlimited API access",
        "Advanced compliance suite",
        "White-labeling options",
        "On-premise deployment available"
      ],
      limitations: [],
      cta: "Contact Sales",
      popular: false
    }
  ]
  
  // Format price with commas
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return (
    <section className="py-20 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        {/* Billing toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                billingPeriod === "monthly" 
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" 
                  : "text-slate-600 dark:text-slate-400"
              }`}
              onClick={() => setBillingPeriod("monthly")}
            >
              Monthly
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                billingPeriod === "annual" 
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" 
                  : "text-slate-600 dark:text-slate-400"
              }`}
              onClick={() => setBillingPeriod("annual")}
            >
              Annual <span className="text-green-600 dark:text-green-400 font-normal">(Save 20%)</span>
            </button>
          </div>
        </div>
        
        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div 
              key={plan.name} 
              className={`relative rounded-2xl overflow-hidden border ${
                plan.popular 
                  ? "border-blue-500 dark:border-blue-400" 
                  : "border-slate-200 dark:border-slate-800"
              } shadow-lg`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  Most Popular
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 h-12">
                  {plan.description}
                </p>
                
                <div className="mb-6">
                  {plan.monthlyPrice !== null ? (
                    <div className="flex items-end gap-2">
                      <span className="text-4xl font-bold text-slate-900 dark:text-white">
                        ${formatPrice(billingPeriod === "monthly" ? plan.monthlyPrice : plan.annualPrice)}
                      </span>
                      <span className="text-slate-600 dark:text-slate-400 mb-1">/ month</span>
                    </div>
                  ) : (
                    <div className="text-3xl font-bold text-slate-900 dark:text-white">
                      {plan.priceLabel}
                    </div>
                  )}
                  {billingPeriod === "annual" && plan.monthlyPrice !== null && (
                    <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                      Save ${formatPrice((plan.monthlyPrice - plan.annualPrice) * 12)} per year
                    </p>
                  )}
                </div>
                
                <Button
                  className={`w-full ${
                    plan.popular 
                      ? "bg-blue-600 hover:bg-blue-700 text-white" 
                      : "bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 dark:hover:bg-slate-600 text-white"
                  }`}
                  onClick={plan.cta === "Request Demo" ? handleDemoClick : handleContactClick}
                >
                  {plan.cta}
                </Button>
              </div>
              
              <div className="border-t border-slate-200 dark:border-slate-800 p-8">
                <h4 className="font-medium text-slate-900 dark:text-white mb-4">
                  What's included:
                </h4>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {plan.limitations.length > 0 && (
                  <>
                    <h4 className="font-medium text-slate-900 dark:text-white mb-4">
                      Not included:
                    </h4>
                    <ul className="space-y-3">
                      {plan.limitations.map((limitation) => (
                        <li key={limitation} className="flex items-start gap-3 text-sm">
                          <span className="h-5 w-5 flex items-center justify-center text-slate-400 flex-shrink-0 mt-0.5">—</span>
                          <span className="text-slate-500 dark:text-slate-400">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Enterprise callout */}
        <div className="mt-16 bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Need a custom solution?
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Contact our sales team to discuss your specific requirements and get a tailored quote.
              </p>
            </div>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleContactClick}
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}