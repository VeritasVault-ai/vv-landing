import { Button } from "@/components/ui/button"

export function TreasuryCTA() {
  return (
    <section className="py-16 bg-blue-900 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to optimize your treasury operations?</h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Schedule a demo to see how VeritasVault Enterprise can transform your treasury management for digital assets.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
            <a href="/corporate-version/demo">Request Demo</a>
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
            <a href="/corporate-version/contact">Contact Sales</a>
          </Button>
        </div>
      </div>
    </section>
  )
}