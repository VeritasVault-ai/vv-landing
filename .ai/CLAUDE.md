# VeritasVault.net Landing Page - Claude Instructions

## Project Overview
Modern Next.js 15 landing page built with TypeScript, Tailwind CSS, and Supabase. Features dual theme system (Corporate/Standard versions) with comprehensive AI integrations.

## Key Commands
- `pnpm dev` - Development server (http://localhost:3000)
- `pnpm build` - Production build
- `pnpm lint` - ESLint validation
- `pnpm dup-check` - Duplicate code detection
- `pnpm audit-config` - TypeScript configuration audit

## Architecture
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with CSS variables for theming
- **UI Components**: Radix UI primitives with custom design system
- **Backend**: Supabase (authentication, data storage)
- **Auth**: NextAuth.js with Supabase integration
- **AI Services**: OpenAI, DeepInfra, Groq, Fal.ai

## Code Style
- Use `@/*` path aliases for internal imports
- Import order: external packages → `@/` imports → relative imports  
- Component naming: PascalCase for components, camelCase for variables/functions, kebab-case for files
- Prefer functional components with proper TypeScript typing
- Use Radix UI components as base primitives
- Apply Tailwind CSS with semantic color variables
- Implement proper error boundaries and TypeScript error types

## File Structure
- `/app` - Next.js pages, layouts, and route handlers
- `/components` - Reusable UI components organized by feature
- `/lib` - Utilities, services, API clients, authentication helpers

## Build Configuration
- ESLint and TypeScript errors are ignored during builds (configured in next.config.mjs)
- Uses pnpm for package management
- MSW configured for API mocking during development

## Important
When modifying this file, ensure .windsurfrules, .cursorrules, and .github/copilot-instructions.md remain synchronized.
