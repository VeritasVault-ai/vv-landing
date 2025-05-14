# Project Organization Strategy

## Overview

This document outlines the overall strategy for organizing the VeritasVault.ai project, particularly focusing on the migration to the src/ directory structure.

## Context

The project codebase needed better organization and structure to improve maintainability and scalability. A decision was made to migrate components to a src/ directory structure while maintaining a working application throughout the transition.

## Decisions/Findings

The following strategy has been established for project organization:

1. New components should be placed in the src/ directory
2. Existing components should be gradually moved to the src/ directory as they're reviewed and updated
3. Maintain two versions (standard and corporate) of the application UI
4. Use a version selection page to let users choose between experiences
5. Create temporary bridge files with clear documentation for import path transitions
6. Consolidate duplicate components where possible instead of creating more files
7. Enhance consolidated components with the best features from duplicates before deletion

## Rationale

This strategy allows for incremental improvement of the codebase without breaking the application. It provides a clear path forward while acknowledging the reality that a complete rewrite or instantaneous migration is not feasible.

## Implementation Approach

### Directory Structure

```
/
├── app/                    # Next.js app router pages
│   ├── (corporate)/        # Corporate experience routes
│   └── (standard)/         # Standard experience routes
├── components/             # Legacy components (to be migrated)
├── lib/                    # Legacy utilities (to be migrated)
├── src/                    # New organized structure
│   ├── components/         # Reusable UI components
│   ├── lib/                # Utilities and helpers
│   ├── hooks/              # React hooks
│   ├── context/            # React context providers
│   └── types/              # TypeScript type definitions
├── public/                 # Static assets
└── .aiguidance/            # AI guidance documents
```

### Migration Process

1. Create new components in the src/ directory
2. For existing components:
   - Review and update as needed
   - Move to the appropriate location in src/
   - Create temporary bridge files for backward compatibility
3. Update imports gradually to point directly to the new locations
4. Remove temporary bridge files once all imports are updated

## Implications

- Gradual improvement of the codebase without breaking changes
- Clear path for new development
- Some temporary technical debt in the form of bridge files
- Improved organization and maintainability in the long term

## Related Components

This strategy affects the entire codebase, but particularly:
- All components being migrated to src/
- Temporary bridge files
- Version-specific layouts and components

## Next Steps

1. Continue migrating components to the src/ directory
2. Prioritize components that are actively being developed or causing issues
3. Document component-specific decisions in separate guidance documents
4. Regularly review and clean up temporary bridge files

## Related Documents

- [2025-05-13_refactor_temporary_bridge_files.md](./2025-05-13_refactor_temporary_bridge_files.md)
- [2025-05-13_refactor_component_consolidation.md](./2025-05-13_refactor_component_consolidation.md)
- [2025-05-13_component_sidebar_consolidation.md](./2025-05-13_component_sidebar_consolidation.md)

## Last Updated

2025-05-13