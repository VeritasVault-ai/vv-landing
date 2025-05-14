/**
 * TEMPORARY FILE - PART OF CODEBASE MIGRATION
 * 
 * This is a temporary bridge file created during the src/ directory migration.
 * It redirects imports from the old location to the new location.
 * 
 * TODO: Once all imports have been updated to use the new path directly,
 * this file should be deleted and imports should point to:
 * '@/src/components/layout/StandardHeader' or '@/src/components/layout/VersionAwareHeader'
 */

import { StandardHeader } from '@/src/components/layout/StandardHeader'

// Export the StandardHeader as Header for backward compatibility
export { StandardHeader as Header }
export { VersionAwareHeader as default } from '@/src/components/layout/VersionAwareHeader'
export { StandardHeader } from '@/src/components/layout/StandardHeader'
export { CorporateHeader } from '@/src/components/layout/CorporateHeader'