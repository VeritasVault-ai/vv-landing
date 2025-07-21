# Sidebar Component Consolidation Plan

## Overview

This document details the plan for consolidating multiple sidebar implementations into a single, feature-rich component.

## Context

Multiple sidebar implementations exist in the codebase (CollapsibleSidebar, Sidebar, EnhancedSidebar) with overlapping functionality but unique features. This causes confusion, inconsistency, and maintenance challenges.

## Decisions/Findings

Before deleting redundant sidebar implementations, we should enhance the CollapsibleSidebar with valuable features from the other implementations. The CollapsibleSidebar was chosen as the base because it already has the core functionality of collapsibility and mobile responsiveness.

## Rationale

This ensures we don't lose useful functionality while still reducing code duplication and maintaining a single source of truth for the sidebar component. By combining the best features of all implementations, we create a more robust and flexible component.

## Implications

- The CollapsibleSidebar will become more feature-rich and flexible
- UI consistency will be improved across the application
- Code maintenance will be simplified with a single sidebar implementation
- Imports will need to be updated to reference the consolidated component

## Features to Integrate

### From Sidebar.tsx:
- ThemeToggle integration in the footer
- "Upgrade to Pro" button
- Additional navigation items (Risk Assessment, AI Features)

### From EnhancedSidebar.tsx:
- Nested navigation with collapsible groups
- Badge support (numeric and text badges like "New")
- Visual styling improvements (gradient background option)
- Visual distinction for secondary navigation
- Styled badges with custom colors

## Implementation Approach

To make the implementation more manageable, we'll break down the enhanced CollapsibleSidebar into smaller subcomponents:

1. **SidebarProvider**: Context provider for sidebar state
2. **SidebarHeader**: Logo and collapse controls
3. **SidebarNavigation**: Main navigation items
   - **SidebarNavItem**: Individual navigation item
   - **SidebarNavGroup**: Collapsible group of navigation items
   - **SidebarNavBadge**: Badge component for navigation items
4. **SidebarFooter**: Theme toggle and CTA button
5. **SidebarMobileControls**: Mobile-specific controls

This modular approach will make the code easier to maintain and understand.

## Related Components

- components/layout/collapsible-sidebar.tsx (target for enhancement)
- components/layout/sidebar.tsx (to be deleted after integration)
- components/layout/enhanced-sidebar.tsx (to be deleted after integration)
- app/(corporate)/corporate/dashboard/layout.tsx (uses the sidebar)

## Next Steps

1. Implement the enhanced CollapsibleSidebar with the modular structure
2. Add the features from other sidebar implementations
3. Update imports to use the enhanced CollapsibleSidebar
4. Test the sidebar in different contexts (dashboard, corporate, standard)
5. Delete the redundant sidebar implementations once all references are updated

## Related Documents

- [2025-05-13_refactor_component_consolidation.md](./2025-05-13_refactor_component_consolidation.md)
- [2025-05-13_strategy_project_organization.md](./2025-05-13_strategy_project_organization.md)

## Last Updated

2025-05-13