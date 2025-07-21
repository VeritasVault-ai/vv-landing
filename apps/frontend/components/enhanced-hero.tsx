import { EnhancedNavigation } from "./layout/enhanced-navigation"

export function EnhancedHero() {
  return (
    <div className="relative min-h-screen bg-[hsl(var(--dark-bg-3))]">
      {/* Background gradient effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[30%] -left-[10%] w-[50%] h-[50%] bg-[hsl(var(--accent-blue))] opacity-[0.03] rounded-full blur-[100px]" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-[hsl(var(--accent-purple))] opacity-[0.03] rounded-full blur-[100px]" />
        <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[30%] bg-[hsl(var(--accent-cyan))] opacity-[0.03] rounded-full blur-[100px]" />
      </div>

      {/* Navigation */}
      <EnhancedNavigation />

      {/* Hero content */}
      <div className="container mx-auto px-4 pt-20 pb-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            AI-Powered Tezos Liquidity Management
          </h1>

          <p className="text-xl md:text-2xl text-[hsl(var(--text-secondary))] mb-12 max-w-3xl mx-auto">
            Optimize your Tezos liquidity with advanced AI insights and real-time data
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="button-primary text-lg px-8 py-4">Go to Dashboard</button>
            <button className="button-secondary text-lg px-8 py-4">Learn More</button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex justify-center">
        <div className="animate-bounce w-6 h-6 border-2 border-[hsl(var(--text-secondary))] border-t-0 border-l-0 transform rotate-45 opacity-50"></div>
      </div>
    </div>
  )
}
