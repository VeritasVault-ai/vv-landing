"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

/**
 * Call-to-action section for the Pricing page
 */
export function PricingCTA() {
  const router = useRouter()
  
  return (
    <section className="py-20 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl overflow-hidden shadow-xl">
          <div className="px-8 py-16 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to optimize your treasury operations?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join leading institutions that trust VeritasVault for their digital asset liquidity management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50"
                onClick={() => router.push('/corporate-version/demo')}
              >
                Start Free Trial
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-blue-700"
                onClick={() => router.push('/corporate-version/contact')}
              >
                Schedule Consultation
              </Button>
            </div>
            <p className="mt-6 text-sm text-blue-100">
              No credit card required. 14-day free trial.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}