# VeritasVault.net Landing Page - GitHub Copilot Instructions

## Project Context
Next.js 15 TypeScript application for VeritasVault.net landing page with Supabase backend, dual theme system, and AI integrations.

## Development Workflow
```bash
# Development
pnpm dev          # Start dev server (localhost:3000)
pnpm build        # Production build
pnpm lint         # ESLint check
pnpm dup-check    # Duplicate code analysis
```

## Code Patterns
- **Components**: Use functional components with TypeScript, prefer Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables, use semantic color tokens
- **Imports**: External packages → `@/` aliases → relative paths
- **Naming**: PascalCase components, camelCase variables/functions, kebab-case files
- **Types**: Leverage strict TypeScript, define proper interfaces

## Architecture Guidance
- `/app` - Next.js App Router structure (pages, layouts, API routes)
- `/components` - Feature-organized UI components with proper TypeScript
- `/lib` - Shared utilities, API clients, authentication helpers, theme management
- **Auth**: NextAuth.js + Supabase integration
- **Data**: Supabase for authentication and data persistence
- **AI**: OpenAI, DeepInfra, Groq, Fal.ai integrations

## Suggestions for Copilot
- Always use `@/` path aliases for internal imports
- Prefer composition over inheritance for React components  
- Use Tailwind's semantic color variables (e.g., `var(--primary)`)
- Implement proper error boundaries and loading states
- Follow existing patterns for theme switching and version selection

## Build Notes
- ESLint/TypeScript errors ignored in production builds
- MSW available for API mocking
- **Sync Requirement**: Keep this file aligned with .windsurfrules, .cursorrules, and CLAUDE.md
