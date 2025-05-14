# AI Guidance Index

This is the main index of AI guidance documents for the VeritasVault.ai project.

## Current Project Status

- Migration to src/ directory structure in progress
- Build errors being addressed with temporary bridge files
- Component consolidation underway, focusing on sidebar components
- Documentation being organized into this .aiguidance folder

## Key Documents

### Refactoring Strategy
- [2025-05-13_refactor_temporary_bridge_files.md](./2025-05-13_refactor_temporary_bridge_files.md) - Strategy for handling import path transitions
- [2025-05-13_refactor_component_consolidation.md](./2025-05-13_refactor_component_consolidation.md) - Approach to consolidating duplicate components

### Component-Specific Guidance
- [2025-05-13_component_sidebar_consolidation.md](./2025-05-13_component_sidebar_consolidation.md) - Plan for consolidating sidebar implementations
- [2025-05-13_component_header_implementation.md](./2025-05-13_component_header_implementation.md) - StandardHeader implementation details

### Project Organization
- [2025-05-13_strategy_project_organization.md](./2025-05-13_strategy_project_organization.md) - Overall strategy for project organization

## Progress Tracking

### Build Errors Addressed
1. ✅ Can't resolve '@/components/theme-toggle' in comparison-page.tsx
2. ✅ Can't resolve '@/components/theme-toggle-client' in VersionHeader.tsx
3. ✅ Can't resolve '@/lib/services/websocket-simulation' in dashboard-content.tsx
4. ✅ Can't resolve '@/lib/context/ThemeProvider' in dashboard-content.tsx and VersionAwareFooter.tsx
5. ✅ Can't resolve '@/context/theme-variants' in src/lib/hooks/context/ThemeProvider.tsx
6. ✅ Can't resolve '@/components/dashboard/Sidebar' in app/(corporate)/corporate/dashboard/layout.tsx (Fixed by updating import to use existing CollapsibleSidebar)
7. ✅ Can't resolve '@/lib/repositories/dashboard-repository' in app/api/dashboard/overview/route.ts and performance/route.ts
8. ✅ Can't resolve '@/lib/auth' in app/api/voting/active-proposals/route.ts

### Next Steps
1. Test the application to ensure all build errors are resolved
2. Enhance CollapsibleSidebar with features from other sidebar implementations
3. Fix or replace the missing ComparisonPage component
4. Continue updating imports across the codebase to use the new src/ paths directly
5. Clean up unused components and temporary bridge files once imports are updated
6. Implement proper versions of the temporary components where needed
7. Continue identifying and consolidating duplicate components

Last Updated: 2025-05-13