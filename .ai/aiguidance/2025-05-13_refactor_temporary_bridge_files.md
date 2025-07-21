# Temporary Bridge Files Strategy

## Overview

This document describes the strategy for handling import path transitions during the migration to the src/ directory structure.

## Context

During migration to the src/ directory structure, many import paths are breaking as components are moved. This causes build errors that need to be addressed while maintaining a working application.

## Decisions/Findings

Created temporary bridge files that re-export components from their new locations while maintaining old import paths. These files serve as a transitional solution until all imports can be updated directly.

## Rationale

This approach allows for gradual migration without breaking the entire application at once. It provides immediate fixes for build errors while clearly marking temporary files for future cleanup, creating a path for incremental improvement.

## Implications

- Build errors can be fixed immediately while proper refactoring continues
- All temporary files are clearly marked with "TEMPORARY FILE" headers and TODO comments
- Each file includes information about the correct import path to use after cleanup
- Technical debt is created but is clearly marked for future removal

## Related Components

- components/theme-toggle.tsx
- components/theme-toggle-client.tsx
- lib/context/ThemeProvider.tsx
- lib/services/websocket-simulation.ts
- context/theme-variants.ts
- lib/repositories/dashboard-repository.ts
- lib/auth.ts

## Implementation Pattern

Each temporary bridge file follows this pattern:

```typescript
/**
 * TEMPORARY FILE - PART OF CODEBASE MIGRATION
 * 
 * This is a temporary re-export file created during the src/ directory migration.
 * It redirects imports from the old location to the new location.
 * 
 * TODO: Once all imports have been updated to use the new path directly,
 * this file should be deleted and imports should point to:
 * '@/src/path/to/component'
 */

export * from '../src/path/to/component'
```

## Next Steps

1. Continue addressing build errors with temporary bridge files as needed
2. Gradually update imports throughout the codebase to use the new src/ paths directly
3. Remove temporary bridge files once all their imports have been updated
4. Document the removal of each bridge file in this guidance document

## Related Documents

- [2025-05-13_refactor_component_consolidation.md](./2025-05-13_refactor_component_consolidation.md)
- [2025-05-13_strategy_project_organization.md](./2025-05-13_strategy_project_organization.md)

## Last Updated

2025-05-13