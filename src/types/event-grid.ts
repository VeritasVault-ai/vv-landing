import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class names into a single string, handling conditional classes
 * and merging Tailwind CSS classes properly.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a number as currency with the specified locale and currency code.
 */
export function formatCurrency(
  value: number,
  locale = "en-US",
  currency = "USD",
  minimumFractionDigits = 2,
  maximumFractionDigits = 2,
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value)
}

/**
 * Formats a number with thousands separators.
 */
export function formatNumber(
  value: number,
  locale = "en-US",
  minimumFractionDigits = 0,
  maximumFractionDigits = 2,
): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value)
}

/**
 * Truncates a string to the specified length and adds an ellipsis.
 */
export function truncateString(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return `${str.slice(0, maxLength)}...`
}

/**
 * Debounces a function to limit how often it can be called.
 */
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>): void => {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout !== null) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

/**
 * Generates a random ID string.
 */
export function generateId(prefix = "id"): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`
}

/**
 * Checks if an object is empty.
 */
export function isEmptyObject(obj: Record<string, any>): boolean {
  return Object.keys(obj).length === 0
}

/**
 * Converts a hex color to RGBA.
 */
export function hexToRgba(hex: string, alpha = 1): string {
  if (!hex.startsWith("#")) {
    return hex
  }

  let r = 0,
    g = 0,
    b = 0

  // 3 digits
  if (hex.length === 4) {
    r = Number.parseInt(hex[1] + hex[1], 16)
    g = Number.parseInt(hex[2] + hex[2], 16)
    b = Number.parseInt(hex[3] + hex[3], 16)
  }
  // 6 digits
  else if (hex.length === 7) {
    r = Number.parseInt(hex.substring(1, 3), 16)
    g = Number.parseInt(hex.substring(3, 5), 16)
    b = Number.parseInt(hex.substring(5, 7), 16)
  }

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
/**
 * Event Grid Event Schema
 * Based on Azure Event Grid event schema
 */
export interface EventGridEvent {
  id: string
  topic: string
  subject: string
  eventType: string
  eventTime: string
  data: any
  dataVersion: string
  metadataVersion?: string
}

/**
 * Event Grid Subscription
 */
export interface EventGridSubscription {
  id: string
  topicName: string
  endpoint: string
  filters: EventGridFilter[]
  status: "active" | "disabled" | "pending"
  createdAt: string
}

/**
 * Event Grid Topic
 */
export interface EventGridTopic {
  id: string
  name: string
  description?: string
  region: string
}

/**
 * Event Grid Filter
 */
export interface EventGridFilter {
  eventType?: string
  subjectBeginsWith?: string
  subjectEndsWith?: string
  dataFilter?: {
    key: string
    value: any
  }
}

/**
 * Event Handler Configuration
 */
export interface EventHandlerConfig {
  id: string
  callback: (event: EventGridEvent) => void
  filter?: EventGridFilter
}

/**
 * Blockchain Event Types
 */
export enum BlockchainEventType {
  TRANSACTION_CONFIRMED = "blockchain.transaction.confirmed",
  BLOCK_MINED = "blockchain.block.mined",
  CONTRACT_DEPLOYED = "blockchain.contract.deployed",
  CONTRACT_INTERACTION = "blockchain.contract.interaction",
  TOKEN_TRANSFER = "blockchain.token.transfer",
  SMART_CONTRACT_ERROR = "blockchain.contract.error",
  ORACLE_UPDATE = "blockchain.oracle.update",
  GOVERNANCE_PROPOSAL = "blockchain.governance.proposal",
  GOVERNANCE_VOTE = "blockchain.governance.vote",
  LIQUIDITY_CHANGE = "defi.liquidity.change",
  PRICE_MOVEMENT = "market.price.movement",
  VOLUME_SPIKE = "market.volume.spike",
  SECURITY_ALERT = "security.alert",
}

/**
 * Blockchain Transaction Event Data
 */
export interface BlockchainTransactionEventData {
  transactionHash: string
  blockNumber: number
  blockHash: string
  from: string
  to: string
  value: string
  gasUsed: number
  gasPrice: string
  timestamp: number
  network: string
  status: "success" | "failed"
  contractAddress?: string
  methodName?: string
  methodSignature?: string
  params?: Record<string, any>
}

/**
 * Blockchain Block Event Data
 */
export interface BlockchainBlockEventData {
  blockNumber: number
  blockHash: string
  parentHash: string
  timestamp: number
  network: string
  miner: string
  difficulty?: string
  totalDifficulty?: string
  gasUsed: number
  gasLimit: number
  transactionCount: number
  size: number
}

/**
 * Token Transfer Event Data
 */
export interface TokenTransferEventData {
  transactionHash: string
  blockNumber: number
  tokenAddress: string
  tokenSymbol: string
  tokenName: string
  tokenDecimals: number
  from: string
  to: string
  value: string
  valueFormatted: string
  valueUSD?: string
  timestamp: number
  network: string
}

/**
 * Market Price Movement Event Data
 */
export interface MarketPriceEventData {
  symbol: string
  price: string
  priceChange: string
  priceChangePercent: string
  volume24h: string
  marketCap: string
  timestamp: number
  exchange?: string
  pair?: string
  network?: string
}

/**
 * Security Alert Event Data
 */
export interface SecurityAlertEventData {
  alertId: string
  severity: "critical" | "high" | "medium" | "low" | "info"
  category: string
  title: string
  description: string
  affectedAddress?: string
  affectedContract?: string
  network?: string
  timestamp: number
  recommendedAction?: string
  referenceUrl?: string
}