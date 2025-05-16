/**
 * @deprecated This file is maintained for backward compatibility.
 * Please import from specific domain type files instead.
 */

// Re-export everything from the domain files
export * from './websocket-infrastructure';
export * from './voting';
export * from './allocation';
export * from './dashboard';
export * from './model';

// Legacy type alias for backward compatibility
export type AssetAllocation = import('./allocation').PortfolioAsset;
