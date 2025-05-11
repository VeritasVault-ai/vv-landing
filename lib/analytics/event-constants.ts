export const AnalyticsEvents = {
  // Authentication events
  AUTH: {
    LOGIN: "login",
    LOGIN_ATTEMPT: "login_attempt",
    LOGIN_ERROR: "login_error",
    REGISTER: "register",
    REGISTER_ERROR: "register_error",
    LOGOUT: "logout",
    PASSWORD_RESET: "password_reset",
  },

  // Strategy events
  STRATEGY: {
    CREATE: "create_strategy",
    UPDATE: "update_strategy",
    DELETE: "delete_strategy",
    VIEW: "view_strategy",
    SAVE: "save_strategy",
    RESET: "reset_strategy",
    ADJUST_RISK: "adjust_risk_tolerance",
    ADJUST_ALLOCATION: "adjust_allocation",
  },

  // AI events
  AI: {
    GENERATE_STRATEGY: "generate_ai_strategy",
    SAVE_STRATEGY: "save_ai_strategy",
    OPTIMIZE: "ai_optimize",
    UPDATE_PREFERENCE: "update_ai_preference",
  },

  // Pool events
  POOLS: {
    VIEW: "view_pool",
    SEARCH: "search_pools",
    SORT: "sort_pools",
    FILTER: "filter_pools",
  },

  // Feature usage
  FEATURE: {
    VIEW: "feature_view",
    USE: "feature_use",
  },

  // Navigation
  NAV: {
    PAGE_VIEW: "page_view",
    SECTION_VIEW: "section_view",
  },
}

export const AnalyticsCategories = {
  AUTHENTICATION: "authentication",
  STRATEGY: "strategy",
  STRATEGY_BUILDER: "strategy_builder",
  AI_FEATURES: "ai_features",
  POOLS: "pools",
  DASHBOARD: "dashboard",
  NAVIGATION: "navigation",
  SETTINGS: "settings",
  FEATURE_USAGE: "feature_usage",
}
