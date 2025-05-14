/**
 * TEMPORARY FILE - PART OF CODEBASE MIGRATION
 * 
 * This is a temporary bridge file created during the src/ directory migration.
 * It redirects imports from the old location to the new location.
 * 
 * TODO: Once all imports have been updated to use the new path directly,
 * this file should be deleted and imports should point to the new location.
 */

// Create a placeholder dashboardEvents object
export const dashboardEvents = {
  onDataRefresh: 'dashboard:data-refresh',
  onFilterChange: 'dashboard:filter-change',
  onViewChange: 'dashboard:view-change',
  onMetricSelect: 'dashboard:metric-select',
  onTimeRangeChange: 'dashboard:time-range-change',
  onError: 'dashboard:error'
};