import type { ReactNode } from "react"

export interface TourStep {
  target: string // CSS selector for the target element
  title: string
  content: ReactNode
  position?: "top" | "right" | "bottom" | "left"
  spotlightPadding?: number
}

// Dashboard Tour Steps
export const dashboardTourSteps: TourStep[] = [
  {
    target: ".tour-step-dashboard-header",
    title: "Welcome to Tezos Liquidity Management",
    content: (
      <div className="space-y-2">
        <p>
          Welcome to your liquidity management dashboard! This is your command center for monitoring and optimizing your
          Tezos liquidity positions.
        </p>
        <p className="text-xs text-muted-foreground">
          This guided tour will walk you through the key features of the platform.
        </p>
      </div>
    ),
    position: "bottom",
  },
  {
    target: ".tour-step-dashboard-metrics",
    title: "Market Metrics",
    content: (
      <div className="space-y-2">
        <p>These metrics provide a real-time overview of market conditions and your portfolio's performance.</p>
        <p className="text-xs text-muted-foreground">
          Monitor TVL, APY, and other key indicators at a glance to make informed decisions.
        </p>
      </div>
    ),
    position: "bottom",
  },
  {
    target: ".tour-step-dashboard-chart",
    title: "Portfolio Performance",
    content: (
      <div className="space-y-2">
        <p>Track your portfolio's performance over time with detailed charts and metrics.</p>
        <p className="text-xs text-muted-foreground">
          Identify trends and make data-driven decisions to optimize your returns.
        </p>
      </div>
    ),
    position: "right",
    spotlightPadding: 10,
  },
  {
    target: ".tour-step-dashboard-strategies",
    title: "Strategy Performance",
    content: (
      <div className="space-y-2">
        <p>
          Compare the performance of different liquidity strategies and see how they contribute to your overall returns.
        </p>
        <p className="text-xs text-muted-foreground">
          Adjust your allocation based on risk tolerance and market conditions.
        </p>
      </div>
    ),
    position: "top",
    spotlightPadding: 10,
  },
  {
    target: ".tabs-list",
    title: "Navigation",
    content: (
      <div className="space-y-2">
        <p>Use these tabs to navigate between different sections of the platform.</p>
        <p className="text-xs text-muted-foreground">
          Each tab provides specialized tools for managing different aspects of your liquidity strategy.
        </p>
      </div>
    ),
    position: "bottom",
  },
]

// Risk Assessment Tour Steps
export const riskTourSteps: TourStep[] = [
  {
    target: ".tour-step-risk-header",
    title: "Risk Assessment Dashboard",
    content: (
      <div className="space-y-2">
        <p>The Risk Assessment dashboard helps you understand and manage the risks in your liquidity positions.</p>
        <p className="text-xs text-muted-foreground">
          Our AI analyzes your portfolio to identify potential risks and provides recommendations.
        </p>
      </div>
    ),
    position: "bottom",
  },
  {
    target: ".tour-step-risk-score",
    title: "Risk Score",
    content: (
      <div className="space-y-2">
        <p>
          Your overall risk score is calculated based on multiple factors including market volatility, impermanent loss
          potential, and concentration risk.
        </p>
        <p className="text-xs text-muted-foreground">
          A lower score indicates a safer portfolio, while a higher score suggests higher potential returns but with
          increased risk.
        </p>
      </div>
    ),
    position: "right",
  },
  {
    target: ".tour-step-risk-factors",
    title: "Risk Factors",
    content: (
      <div className="space-y-2">
        <p>This breakdown shows the individual risk factors contributing to your overall score.</p>
        <p className="text-xs text-muted-foreground">
          Address specific risk factors to improve your overall portfolio health.
        </p>
      </div>
    ),
    position: "left",
  },
  {
    target: ".tour-step-risk-recommendations",
    title: "AI Recommendations",
    content: (
      <div className="space-y-2">
        <p>Our AI provides personalized recommendations to optimize your risk-reward ratio.</p>
        <p className="text-xs text-muted-foreground">
          These suggestions are based on historical data, market trends, and your specific portfolio composition.
        </p>
      </div>
    ),
    position: "top",
  },
]

// Strategies Tour Steps
export const strategiesTourSteps: TourStep[] = [
  {
    target: ".tour-step-strategies-header",
    title: "Strategy Management",
    content: (
      <div className="space-y-2">
        <p>The Strategies section allows you to create, monitor, and optimize your liquidity strategies.</p>
        <p className="text-xs text-muted-foreground">
          A well-designed strategy can significantly improve your returns while managing risk.
        </p>
      </div>
    ),
    position: "bottom",
  },
  {
    target: ".tour-step-strategies-comparison",
    title: "Strategy Comparison",
    content: (
      <div className="space-y-2">
        <p>Compare the performance of different strategies side by side to identify which ones are performing best.</p>
        <p className="text-xs text-muted-foreground">
          Analyze key metrics like APY, risk level, and historical performance.
        </p>
      </div>
    ),
    position: "right",
  },
  {
    target: ".tour-step-strategies-builder",
    title: "Strategy Builder",
    content: (
      <div className="space-y-2">
        <p>Use our Strategy Builder to create custom strategies tailored to your investment goals.</p>
        <p className="text-xs text-muted-foreground">
          Set parameters like risk tolerance, target returns, and preferred protocols.
        </p>
      </div>
    ),
    position: "left",
  },
  {
    target: ".tour-step-strategies-ai",
    title: "AI Strategy Recommendations",
    content: (
      <div className="space-y-2">
        <p>Let our AI suggest optimal strategies based on your goals and market conditions.</p>
        <p className="text-xs text-muted-foreground">
          AI recommendations are continuously updated as market conditions change.
        </p>
      </div>
    ),
    position: "bottom",
  },
]

// Liquidity Pools Tour Steps
export const poolsTourSteps: TourStep[] = [
  {
    target: ".tour-step-pools-header",
    title: "Liquidity Pools Explorer",
    content: (
      <div className="space-y-2">
        <p>The Pools section allows you to explore and analyze available liquidity pools across the Tezos ecosystem.</p>
        <p className="text-xs text-muted-foreground">
          Find the best opportunities for providing liquidity based on your preferences.
        </p>
      </div>
    ),
    position: "bottom",
  },
  {
    target: ".tour-step-pools-table",
    title: "Pools Table",
    content: (
      <div className="space-y-2">
        <p>This table shows all available liquidity pools with key metrics like TVL, APY, and risk level.</p>
        <p className="text-xs text-muted-foreground">
          Sort and filter to find pools that match your investment criteria.
        </p>
      </div>
    ),
    position: "top",
    spotlightPadding: 10,
  },
  {
    target: ".tour-step-pools-filters",
    title: "Pool Filters",
    content: (
      <div className="space-y-2">
        <p>Use these filters to narrow down the pools based on criteria like protocol, token pairs, and APY range.</p>
        <p className="text-xs text-muted-foreground">Save your favorite filters for quick access in the future.</p>
      </div>
    ),
    position: "right",
  },
  {
    target: ".tour-step-pools-analytics",
    title: "Pool Analytics",
    content: (
      <div className="space-y-2">
        <p>Dive deep into individual pool analytics to understand historical performance and risk factors.</p>
        <p className="text-xs text-muted-foreground">
          Analyze volume, liquidity depth, and impermanent loss potential before investing.
        </p>
      </div>
    ),
    position: "left",
  },
]

// Market Analysis Tour Steps
export const marketTourSteps: TourStep[] = [
  {
    target: ".tour-step-market-header",
    title: "Market Analysis",
    content: (
      <div className="space-y-2">
        <p>The Market Analysis section provides insights into overall market trends and conditions.</p>
        <p className="text-xs text-muted-foreground">
          Stay informed about factors that could impact your liquidity positions.
        </p>
      </div>
    ),
    position: "bottom",
  },
  {
    target: ".tour-step-market-trends",
    title: "Market Trends",
    content: (
      <div className="space-y-2">
        <p>These charts show key market trends like total value locked, trading volume, and yield trends.</p>
        <p className="text-xs text-muted-foreground">
          Identify emerging opportunities and potential risks in the market.
        </p>
      </div>
    ),
    position: "right",
    spotlightPadding: 10,
  },
  {
    target: ".tour-step-market-correlations",
    title: "Asset Correlations",
    content: (
      <div className="space-y-2">
        <p>Understand how different assets and pools are correlated to diversify your portfolio effectively.</p>
        <p className="text-xs text-muted-foreground">
          Reduce risk by investing in assets with low correlation to each other.
        </p>
      </div>
    ),
    position: "left",
  },
  {
    target: ".tour-step-market-predictions",
    title: "AI Market Predictions",
    content: (
      <div className="space-y-2">
        <p>Our AI provides predictions about future market trends based on historical data and current conditions.</p>
        <p className="text-xs text-muted-foreground">
          Use these insights to position your portfolio ahead of market movements.
        </p>
      </div>
    ),
    position: "top",
  },
]

// Flash Loans Tour Steps
export const flashLoansTourSteps: TourStep[] = [
  {
    target: ".tour-step-flash-header",
    title: "Flash Loan Explorer",
    content: (
      <div className="space-y-2">
        <p>The Flash Loans section helps you discover and execute flash loan opportunities.</p>
        <p className="text-xs text-muted-foreground">
          Flash loans allow you to borrow assets without collateral as long as the loan is repaid within the same
          transaction.
        </p>
      </div>
    ),
    position: "bottom",
  },
  {
    target: ".tour-step-flash-simulator",
    title: "Flash Loan Simulator",
    content: (
      <div className="space-y-2">
        <p>Test your flash loan strategies in a risk-free environment before executing them on-chain.</p>
        <p className="text-xs text-muted-foreground">
          Simulate different scenarios and optimize your approach for maximum profit.
        </p>
      </div>
    ),
    position: "right",
  },
  {
    target: ".tour-step-flash-opportunities",
    title: "Arbitrage Opportunities",
    content: (
      <div className="space-y-2">
        <p>Our AI continuously scans the market for potential arbitrage opportunities using flash loans.</p>
        <p className="text-xs text-muted-foreground">
          Get notified when profitable opportunities arise that match your risk profile.
        </p>
      </div>
    ),
    position: "left",
  },
]

// Helper function to get tour steps based on current section
export function getTourStepsBySection(section: string): TourStep[] {
  switch (section) {
    case "dashboard":
      return dashboardTourSteps
    case "risk":
      return riskTourSteps
    case "strategies":
      return strategiesTourSteps
    case "pools":
      return poolsTourSteps
    case "market":
      return marketTourSteps
    case "flash-loans":
      return flashLoansTourSteps
    default:
      return dashboardTourSteps
  }
}

// Complete tour that covers all major sections
export const completeTourSteps: TourStep[] = [
  // Welcome step
  {
    target: ".tour-step-dashboard-header",
    title: "Welcome to Tezos Liquidity Management",
    content: (
      <div className="space-y-2">
        <p>
          Welcome to your liquidity management platform! This comprehensive tour will guide you through all the key
          features.
        </p>
        <p className="text-xs text-muted-foreground">
          You can exit the tour at any time and resume it later from the help menu.
        </p>
      </div>
    ),
    position: "bottom",
  },
  // Include key steps from each section
  ...dashboardTourSteps.slice(1, 3),
  ...riskTourSteps.slice(1, 2),
  ...strategiesTourSteps.slice(1, 2),
  ...poolsTourSteps.slice(1, 2),
  // Final step
  {
    target: ".tour-step-dashboard-header",
    title: "Tour Complete!",
    content: (
      <div className="space-y-2">
        <p>You've completed the overview tour of our platform. Feel free to explore each section in more detail.</p>
        <p className="text-xs text-muted-foreground">
          You can access section-specific tours from the help menu in each section.
        </p>
      </div>
    ),
    position: "bottom",
  },
]
