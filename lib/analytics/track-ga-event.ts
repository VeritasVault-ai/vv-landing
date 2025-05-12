type GAEventProps = {
  action: string
  category?: string
  label?: string
  value?: number
  [key: string]: any
}

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (command: string, action: string, params?: Record<string, any>) => void
  }
}

export function trackGAEvent({ action, category = "General", label, value, ...rest }: GAEventProps): void {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
      ...rest,
    })
    console.log(`[Analytics] Tracked event: ${action}`)
  } else {
    console.warn("[Analytics] Unable to track event: gtag not available")
  }
}

export function trackPageView(url: string): void {
  if (typeof window !== "undefined" && window.gtag && process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
    window.gtag("config", process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
      page_path: url,
    })
    console.log(`[Analytics] Tracked page view: ${url}`)
  } else {
    console.warn("[Analytics] Unable to track page view: gtag not available")
  }
}

// Common event tracking functions
export function trackLogin(method: string, success: boolean): void {
  trackGAEvent({
    action: success ? "login_success" : "login_failure",
    category: "Authentication",
    label: method,
    method,
    success,
  })
}

export function trackRegistration(method: string, success: boolean): void {
  trackGAEvent({
    action: success ? "registration_success" : "registration_failure",
    category: "Authentication",
    label: method,
    method,
    success,
  })
}

export function trackStrategyCreation(type: string, assetCount: number): void {
  trackGAEvent({
    action: "create_strategy",
    category: "Strategy",
    label: type,
    strategy_type: type,
    asset_count: assetCount,
  })
}

export function trackLiquidityAdded(poolId: string, amount: number, currency: string): void {
  trackGAEvent({
    action: "add_liquidity",
    category: "Liquidity",
    label: poolId,
    pool_id: poolId,
    amount,
    currency,
  })
}
