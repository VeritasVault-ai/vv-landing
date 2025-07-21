# VeritasVault.net Landing Page - Agent Guide

## Build/Lint/Test Commands
- `pnpm dev` - Start development server on http://localhost:3000
- `pnpm build` - Build production application
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint (next lint)
- `pnpm dup-check` - Check for duplicate code (jscpd)
- `pnpm audit-config` - Audit configuration with TypeScript
- No test suite configured - no test command available

## Architecture & Structure
- **Next.js 15** app with App Router, TypeScript, Tailwind CSS
- **Database**: Supabase (auth, data storage) 
- **Authentication**: NextAuth.js with Supabase integration
- **AI Services**: OpenAI, DeepInfra, Groq, Fal.ai for AI features
- **UI**: Radix UI components with custom design system
- **Key Directories**: `/app` (pages/routes), `/components` (UI), `/lib` (utilities/services)
- **Dual Themes**: Corporate and Standard versions with theme switching

## Code Style & Conventions
- **TypeScript**: Strict mode enabled, paths aliased with `@/*`
- **Imports**: Use `@/` prefix for internal imports, organize by external → internal → relative
- **Components**: Functional components with TypeScript, use Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming, component variants with class-variance-authority
- **Naming**: camelCase for variables/functions, PascalCase for components, kebab-case for files
- **Error Handling**: Use error boundaries, proper TypeScript error types

## Important Notes
- ESLint/TypeScript errors ignored during build (next.config.mjs)
- Uses pnpm workspace structure but no workspaces defined in this repo
- MSW for API mocking in development
- Keep rules files (.windsurfrules, .cursorrules, CLAUDE.md, .github/copilot-instructions.md) in sync when changed
