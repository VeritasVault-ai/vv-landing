import { EnhancedHero } from "./enhanced-hero"
import { ThemeAwareImage } from "./ui/theme-aware-image"
import { TrustedInstitutions } from "./ui/trusted-institutions"

export function StandardLandingPage() {
  return (
    <div className="min-h-screen bg-[hsl(var(--dark-bg-3))]">
      <EnhancedHero />

      {/* Features section */}
      <section className="py-20 bg-[hsl(var(--dark-bg-2))]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Advanced Features</h2>
            <p className="text-xl text-[hsl(var(--text-secondary))] max-w-3xl mx-auto">
              Our platform provides cutting-edge tools to optimize your liquidity management strategy
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature cards */}
            {[
              {
                title: "AI-Powered Analytics",
                description: "Leverage machine learning algorithms to analyze market trends and optimize your strategy",
                image: "/dashboard-preview.png",
              },
              {
                title: "Real-time Monitoring",
                description: "Track your liquidity positions with real-time data and instant notifications",
                image: "/analytics-preview.png",
              },
              {
                title: "Strategy Builder",
                description: "Create custom liquidity strategies tailored to your specific investment goals",
                image: "/strategy-preview.png",
              },
            ].map((feature, index) => (
              <div key={index} className="card p-6 flex flex-col">
                <div className="mb-6 rounded-lg overflow-hidden">
                  <ThemeAwareImage
                    lightSrc={feature.image.replace(".png", "-light.png")}
                    darkSrc={feature.image}
                    alt={feature.title}
                    width={400}
                    height={225}
                    className="w-full h-auto"
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-[hsl(var(--text-secondary))]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted by section */}
      <section className="py-16 bg-[hsl(var(--dark-bg-3))]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h3 className="text-xl font-medium text-[hsl(var(--text-secondary))]">Trusted by leading institutions</h3>
          </div>
          <TrustedInstitutions />
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 bg-[hsl(var(--dark-bg-1))]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to optimize your liquidity?</h2>
            <p className="text-xl text-[hsl(var(--text-secondary))] mb-10">
              Join thousands of users who are already benefiting from our advanced liquidity management platform
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="button-primary text-lg px-8 py-4">Start Free Trial</button>
              <button className="button-secondary text-lg px-8 py-4">Schedule Demo</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
