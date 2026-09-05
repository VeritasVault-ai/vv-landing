import type { NavigationItem, ContentBlock } from "./models/types"

// Mock navigation items
export const MOCK_NAVIGATION: NavigationItem[] = [
  {
    id: "1",
    label: "Dashboard",
    href: "/dashboard",
    icon: "layout-dashboard",
    group: "main",
  },
  {
    id: "2",
    label: "Pools",
    href: "/pools",
    icon: "database",
    group: "main",
  },
  {
    id: "3",
    label: "Analytics",
    href: "/analytics",
    icon: "bar-chart",
    group: "main",
  },
  {
    id: "4",
    label: "Strategies",
    href: "/strategies",
    icon: "git-branch",
    group: "main",
  },
  {
    id: "5",
    label: "Flash Loans",
    href: "/flash-loans",
    icon: "zap",
    group: "main",
  },
  {
    id: "6",
    label: "Home",
    href: "/",
    icon: "home",
    group: "marketing",
  },
  {
    id: "7",
    label: "How It Works",
    href: "/how-it-works",
    icon: "info",
    group: "marketing",
  },
  {
    id: "8",
    label: "Contact",
    href: "/contact",
    icon: "mail",
    group: "marketing",
  },
]

// Mock settings
export const MOCK_SETTINGS = [
  { key: "theme", value: "light" },
  { key: "notifications", value: true },
  { key: "analyticsEnabled", value: true },
]

// Mock content blocks
export const MOCK_CONTENT: ContentBlock[] = [
  {
    id: "1",
    title: "Welcome to NeuralLiquid",
    content: "AI-powered liquidity management for DeFi protocols.",
    type: "hero",
    page: "home",
    position: "hero",
  },
  {
    id: "2",
    title: "Features",
    content: "Discover our powerful features for optimizing your liquidity.",
    type: "section",
    page: "home",
    position: "features",
  },
]
