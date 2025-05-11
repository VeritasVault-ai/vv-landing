/**
 * Custom dimensions for Google Analytics 4
 * Organized by priority level
 */

// High Priority Custom Dimensions
export const HIGH_PRIORITY_DIMENSIONS = {
  LOGIN_METHOD_SUCCESS: "login_method_success",
  STRATEGY_TYPE: "strategy_type",
  STRATEGY_RISK_LEVEL: "strategy_risk_level",
  STRATEGY_TARGET_APY: "strategy_target_apy",
  POOL_NAME_ADD: "pool_name_add",
  LIQUIDITY_AMOUNT_ADD: "liquidity_amount_add",
  REWARDS_AMOUNT: "rewards_amount",
  SEARCH_TERM: "search_term",
  FEATURE_NAME: "feature_name",
  TAB_DESTINATION: "tab_destination",
}

// Medium Priority Custom Dimensions
export const MEDIUM_PRIORITY_DIMENSIONS = {
  STRATEGY_NAME_SAVE: "strategy_name_save",
  STRATEGY_NAME_EXECUTE: "strategy_name_execute",
  ALLOCATION_TYPE: "allocation_type",
  STRATEGY_AMOUNT: "strategy_amount",
  STRATEGY_CURRENCY: "strategy_currency",
  POOL_PROTOCOL_ADD: "pool_protocol_add",
  PROTOCOL_REWARDS: "protocol_rewards",
  POOL_ID_REWARDS: "pool_id_rewards",
  FEATURE_SECTION: "feature_section",
  TAB_SOURCE: "tab_source",
}

// Low Priority Custom Dimensions
export const LOW_PRIORITY_DIMENSIONS = {
  LOGIN_USER_ID: "login_user_id",
  IS_RETURNING_USER: "is_returning_user",
  REGISTER_METHOD_ATTEMPT: "register_method_attempt",
  REGISTER_METHOD_SUCCESS: "register_method_success",
  REGISTER_SOURCE: "register_source",
  PASSWORD_RESET_SOURCE: "password_reset_source",
  STRATEGY_ID_SAVE: "strategy_id_save",
  STRATEGY_ID_EXECUTE: "strategy_id_execute",
  STRATEGY_ID_ADJUSTMENT: "strategy_id_adjustment",
  STRATEGY_PREVIOUS_LEVEL: "strategy_previous_level",
  STRATEGY_NEW_LEVEL: "strategy_new_level",
  STRATEGY_IS_NEW: "strategy_is_new",
  POOL_ID_ADD: "pool_id_add",
  LIQUIDITY_CURRENCY_ADD: "liquidity_currency_add",
  POOL_ID_REMOVE: "pool_id_remove",
  POOL_NAME_REMOVE: "pool_name_remove",
  POOL_PROTOCOL_REMOVE: "pool_protocol_remove",
  LIQUIDITY_AMOUNT_REMOVE: "liquidity_amount_remove",
  LIQUIDITY_CURRENCY_REMOVE: "liquidity_currency_remove",
  POSITION_DURATION: "position_duration",
  POOL_ID_ADJUST: "pool_id_adjust",
  POSITION_ADJUSTMENT_TYPE: "position_adjustment_type",
  ADJUSTMENT_AMOUNT: "adjustment_amount",
  ADJUSTMENT_CURRENCY: "adjustment_currency",
  MODAL_NAME_OPEN: "modal_name_open",
  MODAL_SOURCE_OPEN: "modal_source_open",
  MODAL_NAME_CLOSE: "modal_name_close",
  MODAL_DURATION_CLOSE: "modal_duration_close",
  SEARCH_CATEGORY: "search_category",
  SEARCH_RESULT_COUNT: "search_result_count",
}

// All Custom Dimensions
export const CUSTOM_DIMENSIONS = {
  ...HIGH_PRIORITY_DIMENSIONS,
  ...MEDIUM_PRIORITY_DIMENSIONS,
  ...LOW_PRIORITY_DIMENSIONS,
}

// Types for custom dimensions
export type HighPriorityDimension = keyof typeof HIGH_PRIORITY_DIMENSIONS
export type MediumPriorityDimension = keyof typeof MEDIUM_PRIORITY_DIMENSIONS
export type LowPriorityDimension = keyof typeof LOW_PRIORITY_DIMENSIONS
export type CustomDimension = keyof typeof CUSTOM_DIMENSIONS

// Helper function to get dimension value
export function getDimensionValue(dimension: CustomDimension): string {
  return CUSTOM_DIMENSIONS[dimension]
}

// Helper function to create dimension parameter object
export function createDimensionParam(
  dimension: CustomDimension,
  value: string | number | boolean,
): Record<string, string | number | boolean> {
  return { [CUSTOM_DIMENSIONS[dimension]]: value }
}
