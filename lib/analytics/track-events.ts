import { ExperienceType } from "@/src/components/VersionControl"
import { CUSTOM_DIMENSIONS } from "./custom-dimensions"
import { EventCategory, type EventName } from "./event-taxonomy"

/**
 * Tracks an authentication-related event and sends it to Google Analytics.
 *
 * Enhances the event with the authentication category and, if the authentication method was successful, maps the method to a custom dimension for successful login methods.
 *
 * @param eventName - The name of the authentication event to track.
 * @param params - Additional event parameters, such as authentication method, success status, error message, or provider.
 */
export function trackAuthEvent(
  eventName: EventName,
  params: {
    method?: string
    success?: boolean
    error?: string
    provider?: string
    [key: string]: any
  } = {},
) {
  // Map standard parameters to custom dimensions where applicable
  const enhancedParams: Record<string, any> = {
    event_category: EventCategory.AUTHENTICATION,
    ...params,
  }

  // Map method to login_method_success if success is true
  if (params.method && params.success === true) {
    enhancedParams[CUSTOM_DIMENSIONS.LOGIN_METHOD_SUCCESS] = params.method
  }

  // Send the event to Google Analytics
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, enhancedParams)
  }
}

// Function to track strategy events
export function trackStrategyEvent(
  eventName: EventName,
  params: {
    strategy_id?: string
    strategy_name?: string
    strategy_type?: string
    risk_level?: string
    target_apy?: number | string
    amount?: number
    currency?: string
    allocation_type?: string
    [key: string]: any
  } = {},
) {
  // Map standard parameters to custom dimensions
  const enhancedParams: Record<string, any> = {
    event_category: EventCategory.STRATEGY,
    ...params,
  }

  // Map to custom dimensions
  if (params.strategy_type) {
    enhancedParams[CUSTOM_DIMENSIONS.STRATEGY_TYPE] = params.strategy_type
  }

  if (params.risk_level) {
    enhancedParams[CUSTOM_DIMENSIONS.STRATEGY_RISK_LEVEL] = params.risk_level
  }

  if (params.target_apy) {
    enhancedParams[CUSTOM_DIMENSIONS.STRATEGY_TARGET_APY] = params.target_apy
  }

  if (params.strategy_name && eventName === "save_strategy") {
    enhancedParams[CUSTOM_DIMENSIONS.STRATEGY_NAME_SAVE] = params.strategy_name
  }

  if (params.strategy_name && eventName === "execute_strategy") {
    enhancedParams[CUSTOM_DIMENSIONS.STRATEGY_NAME_EXECUTE] = params.strategy_name
  }

  if (params.amount) {
    enhancedParams[CUSTOM_DIMENSIONS.STRATEGY_AMOUNT] = params.amount
  }

  if (params.currency) {
    enhancedParams[CUSTOM_DIMENSIONS.STRATEGY_CURRENCY] = params.currency
  }

  if (params.allocation_type) {
    enhancedParams[CUSTOM_DIMENSIONS.ALLOCATION_TYPE] = params.allocation_type
  }

  // Send the event to Google Analytics
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, enhancedParams)
  }
}

/**
 * Tracks a liquidity-related event and sends it to Google Analytics with appropriate custom dimensions.
 *
 * Enhances the event parameters with the `LIQUIDITY` event category and maps relevant liquidity details (such as pool name, amount, protocol, rewards amount, and pool ID) to custom dimensions based on the event type before dispatching.
 *
 * @param eventName - The name of the liquidity event (e.g., "add_liquidity", "deposit", "claim_rewards").
 * @param params - Optional event parameters, including pool and protocol details, amounts, and rewards information.
 */
export function trackLiquidityEvent(
  eventName: EventName,
  params: {
    pool_id?: string
    pool_name?: string
    protocol?: string
    amount?: number
    currency?: string
    rewards_amount?: number
    [key: string]: any
  } = {},
) {
  // Map standard parameters to custom dimensions
  const enhancedParams: Record<string, any> = {
    event_category: EventCategory.LIQUIDITY,
    ...params,
  }

  // Map to custom dimensions
  if (params.pool_name && (eventName === "add_liquidity" || eventName === "deposit")) {
    enhancedParams[CUSTOM_DIMENSIONS.POOL_NAME_ADD] = params.pool_name
  }

  if (params.amount && (eventName === "add_liquidity" || eventName === "deposit")) {
    enhancedParams[CUSTOM_DIMENSIONS.LIQUIDITY_AMOUNT_ADD] = params.amount
  }

  if (params.rewards_amount) {
    enhancedParams[CUSTOM_DIMENSIONS.REWARDS_AMOUNT] = params.rewards_amount
  }

  if (params.protocol && (eventName === "add_liquidity" || eventName === "deposit")) {
    enhancedParams[CUSTOM_DIMENSIONS.POOL_PROTOCOL_ADD] = params.protocol
  }

  if (params.protocol && eventName === "claim_rewards") {
    enhancedParams[CUSTOM_DIMENSIONS.PROTOCOL_REWARDS] = params.protocol
  }

  if (params.pool_id && eventName === "claim_rewards") {
    enhancedParams[CUSTOM_DIMENSIONS.POOL_ID_REWARDS] = params.pool_id
  }

  // Send the event to Google Analytics
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, enhancedParams)
  }
}

export interface NavigationEventData {
  eventName: EventName,
    feature_name: string;
    tab_destination: ExperienceType;
}

/**
 * Tracks a navigation event by sending it to Google Analytics with relevant custom dimensions.
 *
 * Enhances the event with navigation-specific parameters such as source, destination, section, feature name, and tab destination before dispatching. If no event name is provided, defaults to `'navigation_action'`.
 *
 * @param params - Navigation event details, including optional event name, source, destination, section, feature name, and tab destination.
 */
export function trackNavigationEvent(
  params: {
    eventName?: string
    source?: string
    destination?: string
    tab_name?: string
    section?: string
    feature_name?: string
    tab_destination?: ExperienceType
    [key: string]: any
  } = {},
) {
  const {
    eventName,
    source,
    destination,
    section,
    feature_name,
    tab_destination,
    ...rest
  } = params

  const enhancedParams: Record<string, any> = {
    event_category: EventCategory.NAVIGATION,
    ...rest,
  }

  if (source) {
    enhancedParams[CUSTOM_DIMENSIONS.TAB_SOURCE] = source
  }
  if (destination) {
    enhancedParams[CUSTOM_DIMENSIONS.TAB_DESTINATION] = destination
  }
  if (section) {
    enhancedParams[CUSTOM_DIMENSIONS.FEATURE_SECTION] = section
  }
  if (feature_name) {
    enhancedParams[CUSTOM_DIMENSIONS.FEATURE_NAME] = feature_name
  }
  if (tab_destination) {
    enhancedParams[CUSTOM_DIMENSIONS.TAB_DESTINATION] = tab_destination
  }

  const name = eventName || 'navigation_action'
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', name, enhancedParams)
  }
}

// Function to track engagement events
export function trackEngagementEvent(
  eventName: EventName,
  params: {
    feature_name?: string
    search_term?: string
    content_type?: string
    content_id?: string
    [key: string]: any
  } = {},
) {
  // Map standard parameters to custom dimensions
  const enhancedParams: Record<string, any> = {
    event_category: EventCategory.ENGAGEMENT,
    ...params,
  }

  // Map to custom dimensions
  if (params.feature_name) {
    enhancedParams[CUSTOM_DIMENSIONS.FEATURE_NAME] = params.feature_name
  }

  if (params.search_term) {
    enhancedParams[CUSTOM_DIMENSIONS.SEARCH_TERM] = params.search_term
  }

  // Send the event to Google Analytics
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, enhancedParams)
  }
}

// Add these new tracking functions after the existing functions but before the last export function (trackEvent)

// Function to track search events
export function trackSearch(
  searchTerm: string,
  params: {
    category?: string
    results_count?: number
    filter_applied?: boolean
    [key: string]: any
  } = {},
) {
  trackEngagementEvent("search", {
    search_term: searchTerm,
    ...params,
  })
}

// Function to track pool view events
export function trackViewPool(
  poolId: string,
  params: {
    pool_name?: string
    protocol?: string
    apy?: number | string
    [key: string]: any
  } = {},
) {
  trackLiquidityEvent("view_pool", {
    pool_id: poolId,
    ...params,
  })
}

// Function to track strategy creation events
export function trackStrategyCreation(
  params: {
    strategy_type?: string
    risk_level?: string
    target_apy?: number | string
    [key: string]: any
  } = {},
) {
  trackStrategyEvent("create_strategy", {
    ...params,
  })
}

// Function to track strategy save events
export function trackStrategySave(
  strategyId: string,
  params: {
    strategy_name?: string
    strategy_type?: string
    risk_level?: string
    [key: string]: any
  } = {},
) {
  trackStrategyEvent("save_strategy", {
    strategy_id: strategyId,
    ...params,
  })
}

// Function to track risk adjustment events
export function trackRiskAdjustment(
  params: {
    previous_level?: string
    new_level?: string
    strategy_id?: string
    [key: string]: any
  } = {},
) {
  trackStrategyEvent("adjust_risk", {
    ...params,
  })
}

// Function to track feature usage events
export function trackFeatureUse(
  featureName: string,
  params: {
    action?: string
    value?: string | number
    [key: string]: any
  } = {},
) {
  trackEngagementEvent("use_feature", {
    feature_name: featureName,
    ...params,
  })
}

// Function to track tab change events
export function trackTabChange(
  params: {
    source?: string
    destination?: string
    section?: string
    [key: string]: any
  } = {},
) {
  trackNavigationEvent("tab_change", {
    ...params,
  })
}

// Generic function to track any event
export function trackEvent(eventName: string, eventCategory: EventCategory, params: Record<string, any> = {}) {
  const enhancedParams = {
    event_category: eventCategory,
    ...params,
  }

  // Send the event to Google Analytics
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, enhancedParams)
  }
}
