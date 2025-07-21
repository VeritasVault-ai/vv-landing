"use client"

import { Button } from "@/components/ui/button"
import { trackNavigationEvent } from "@/lib/analytics/track-events"
import {
  CORPORATE_PRODUCT_DESCRIPTION,
  CORPORATE_PRODUCT_NAME,
  CORPORATE_PRODUCT_TAGLINE
} from "@/lib/config/product-info"
import { CheckCircle, Shield } from "lucide-react"
import Image from "next/image"

/**
 * Renders the hero section of the corporate landing page, featuring branding, descriptive text, compliance badges, call-to-action buttons, and a dashboard image.
 *
 * The section is styled with gradients, decorative backgrounds, and responsive layout. Button clicks trigger analytics tracking events.
 */
export function HeroSection() {
  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950 border-b border-slate-200 dark:border-slate-800">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[40%] -right-[10%] w-[70%] h-[70%] rounded-full bg-blue-100/30 dark:bg-blue-900/10 blur-3xl"></div>
        <div className="absolute top-[60%] -left-[5%] w-[40%] h-[40%] rounded-full bg-blue-100/30 dark:bg-blue-900/10 blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-6">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 font-medium text-sm mb-4">
              Institutional-Grade Liquidity Management
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-slate-900 dark:text-white">
              <span className="text-blue-700 dark:text-blue-400">{CORPORATE_PRODUCT_NAME}</span>.net
            </h1>
            <p className="text-xl md:text-2xl font-light text-slate-700 dark:text-slate-300 max-w-xl">
              {CORPORATE_PRODUCT_TAGLINE}
            </p>
            <p className="text-lg text-slate-700 dark:text-slate-300 max-w-xl">
              {CORPORATE_PRODUCT_DESCRIPTION}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
                onClick={() =>
                  trackNavigationEvent({ feature_name: "corporate_cta", button_text: "Schedule Consultation" })
                }
              >
                Schedule Consultation
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={() =>
                  trackNavigationEvent({ feature_name: "corporate_cta", button_text: "View Case Studies" })
                }
              >
                View Case Studies
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-6 pt-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-blue-700 dark:text-blue-400" />
                <span className="text-sm text-slate-700 dark:text-slate-300">ISO 27001 Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-blue-700 dark:text-blue-400" />
                <span className="text-sm text-slate-700 dark:text-slate-300">GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-700 dark:text-blue-400" />
                <span className="text-sm text-slate-700 dark:text-slate-300">Enterprise-Grade Security</span>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/5 dark:to-purple-500/5 rounded-lg blur-xl"></div>
              <Image
                src="/advanced-analytics-predictive-dashboard.png"
                alt="Institutional dashboard"
                width={600}
                height={400}
                className="relative rounded-lg shadow-xl border border-slate-200 dark:border-slate-700"
              />
              <div className="absolute -bottom-4 -right-4 bg-blue-700 dark:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg">
                <p className="font-semibold flex items-center">
                  <span className="mr-1">Demo:</span> Trusted by institutions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}