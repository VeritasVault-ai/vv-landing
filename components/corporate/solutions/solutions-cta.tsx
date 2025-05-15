"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

/**
 * Call-to-action section for the Solutions page
 */
export function SolutionsCTA() {
  const router = useRouter()
  
  return (
    <section className="py-20 bg-blue-600 dark:bg-blue-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Treasury Operations?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join leading institutions that trust VeritasVault for their digital asset liquidity management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50"
              onClick={() => router.push('/corporate-version/demo')}
            >
              Request Demo
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-blue-700"
              onClick={() => router.push('/corporate-version/contact')}
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}