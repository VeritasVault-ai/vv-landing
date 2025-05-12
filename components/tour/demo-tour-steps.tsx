import type { TourStep } from "@/components/ui/guided-tour"

export const demoTourSteps: TourStep[] = [
  {
    target: ".tour-step-1",
    title: "Welcome to Tezos Liquidity Management",
    content: (
      <p>
        This interactive demo showcases our AI-powered platform for optimizing liquidity positions on Tezos. Let's
        explore the key features together!
      </p>
    ),
    position: "bottom",
  },
  {
    target: ".tour-step-2",
    title: "Market Metrics",
    content: (
      <p>
        These metrics provide a real-time overview of the market conditions and your portfolio's performance. Monitor
        TVL, APY, and other key indicators at a glance.
      </p>
    ),
    position: "bottom",
  },
  {
    target: ".tour-step-3",
    title: "Navigation Tabs",
    content: (
      <p>
        Use these tabs to navigate between different sections of the platform. Each tab provides specialized tools for
        managing different aspects of your liquidity strategy.
      </p>
    ),
    position: "bottom",
  },
  {
    target: ".tour-step-4",
    title: "Portfolio Performance",
    content: (
      <p>
        Track your portfolio's performance over time with detailed charts and metrics. Identify trends and make
        data-driven decisions to optimize your returns.
      </p>
    ),
    position: "right",
  },
  {
    target: ".tour-step-5",
    title: "Risk Assessment",
    content: (
      <p>
        Our AI analyzes your portfolio to identify potential risks and provides recommendations to mitigate them. The
        risk score helps you understand your overall exposure.
      </p>
    ),
    position: "left",
  },
  {
    target: ".tour-step-6",
    title: "Strategy Performance",
    content: (
      <p>
        Compare the performance of different liquidity strategies and see how they contribute to your overall returns.
        Adjust your allocation based on risk tolerance and market conditions.
      </p>
    ),
    position: "top",
  },
  {
    target: ".tour-step-7",
    title: "Actions",
    content: (
      <p>
        Use these buttons to refresh data or view the live dashboard. In the full platform, you'll have access to
        additional actions like executing trades and rebalancing your portfolio.
      </p>
    ),
    position: "left",
  },
  {
    target: ".tour-step-8",
    title: "Tour Complete!",
    content: (
      <p>
        You've completed the guided tour of our demo. Feel free to explore the platform on your own now. Click on
        different tabs to discover more features and capabilities.
      </p>
    ),
    position: "bottom",
  },
]
