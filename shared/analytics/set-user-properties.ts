/**
 * Sets user properties in Google Analytics
 *
 * @param properties Object containing user properties to set
 */
export function setUserProperties(properties: Record<string, string | number | boolean>): void {
  if (typeof window === "undefined" || !window.gtag) {
    console.warn("[Analytics] Unable to set user properties: gtag not available")
    return
  }

  // Set user properties in Google Analytics
  window.gtag("set", "user_properties", properties)

  // Log in development for debugging
  if (process.env.NODE_ENV === "development") {
    console.log("[Analytics] Set user properties:", properties)
  }
}

/**
 * Sets user risk profile property
 *
 * @param riskProfile User's risk profile (conservative, moderate, aggressive)
 */
export function setUserRiskProfile(riskProfile: "conservative" | "moderate" | "aggressive"): void {
  setUserProperties({ user_risk_profile: riskProfile })
}

/**
 * Sets preferred investment type property
 *
 * @param investmentType User's preferred investment type
 */
export function setPreferredInvestmentType(
  investmentType: "liquidity_pools" | "staking" | "yield_farming" | "flash_loans",
): void {
  setUserProperties({ preferred_investment_type: investmentType })
}

/**
 * Sets account tier property
 *
 * @param tier User's account tier
 */
export function setAccountTier(tier: "basic" | "premium" | "enterprise"): void {
  setUserProperties({ account_tier: tier })
}

/**
 * Sets multiple user properties at once after login
 *
 * @param userData User data object containing profile information
 */
export function setUserPropertiesAfterLogin(userData: {
  riskProfile?: "conservative" | "moderate" | "aggressive"
  preferredInvestmentType?: "liquidity_pools" | "staking" | "yield_farming" | "flash_loans"
  accountTier?: "basic" | "premium" | "enterprise"
  experienceLevel?: "beginner" | "intermediate" | "advanced"
  hasActiveStrategies?: boolean
  strategiesCount?: number
  totalLiquidity?: number
  daysActive?: number
  preferredChain?: string
}): void {
  const properties: Record<string, string | number | boolean> = {}

  // Only add properties that are defined
  if (userData.riskProfile) properties.user_risk_profile = userData.riskProfile
  if (userData.preferredInvestmentType) properties.preferred_investment_type = userData.preferredInvestmentType
  if (userData.accountTier) properties.account_tier = userData.accountTier
  if (userData.experienceLevel) properties.experience_level = userData.experienceLevel
  if (userData.hasActiveStrategies !== undefined) properties.has_active_strategies = userData.hasActiveStrategies
  if (userData.strategiesCount !== undefined) properties.strategies_count = userData.strategiesCount
  if (userData.totalLiquidity !== undefined) properties.total_liquidity = userData.totalLiquidity
  if (userData.daysActive !== undefined) properties.days_active = userData.daysActive
  if (userData.preferredChain) properties.preferred_chain = userData.preferredChain

  setUserProperties(properties)
}
