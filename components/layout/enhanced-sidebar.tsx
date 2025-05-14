/**
 * TEMPORARY FILE - PART OF CODEBASE MIGRATION
 * 
 * This is a temporary bridge file created during the modular sidebar implementation.
 * It redirects imports from the old location to the new modular implementation.
 * 
 * TODO: Once all imports have been updated to use the new path directly,
 * this file should be deleted and imports should point to:
 * '@/src/components/layout/CollapsibleSidebar'
 */

// Export the new modular sidebar as the enhanced sidebar implementation
export { CollapsibleSidebar as EnhancedSidebar } from '@/src/components/layout/CollapsibleSidebar'
export { CollapsibleSidebar as default } from '@/src/components/layout/CollapsibleSidebar'
export type { NavItemOrGroup, SidebarStyle } from '@/src/components/sidebar'