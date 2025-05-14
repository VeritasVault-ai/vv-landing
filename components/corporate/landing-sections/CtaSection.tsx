"use client"

import { Button } from "@/components/ui/button"
import { trackNavigationEvent } from "@/lib/analytics/track-events"

export function CtaSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-950">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to optimize your institutional liquidity?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Schedule a consultation with our team to learn how VeritasVault.ai can transform your treasury management.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              className="bg-white hover:bg-blue-50 text-blue-700"
              onClick={() =>
                trackNavigationEvent({ feature_name: "corporate_footer_cta", button_text: "Schedule Demo" })
              }
            >
              Schedule Demo
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-blue-700"
              onClick={() =>
                trackNavigationEvent({ feature_name: "corporate_footer_cta", button_text: "Contact Sales" })
              }
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}