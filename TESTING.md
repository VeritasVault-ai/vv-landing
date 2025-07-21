# Testing Strategy & Plan

## Philosophy
- Ensure reliability, security, and user trust by testing all critical paths.
- Catch regressions early with automated tests in CI/CD.
- Prioritize tests for business-critical, user-facing, and security-sensitive features.

## Test Types
- **Unit tests:** For all core logic, utilities, and services (Vitest)
- **Component tests:** For all React components (Vitest + React Testing Library)
- **Integration tests:** For API endpoints and service interactions (Vitest, supertest, or similar)
- **End-to-end (E2E) tests:** For key user flows (Playwright or Cypress, future)

## Coverage Goals
- 100% coverage for authentication, critical business logic, and error handling
- 80%+ coverage for all other code
- All new features must include tests

## Where to Add Tests
- `tests/` for global/integration tests
- `apps/frontend/` for frontend-specific tests
- `apps/backend/` for backend-specific tests
- `packages/shared/` for shared utilities

## How to Run Tests
- All tests: `pnpm test`
- Frontend only: `pnpm --filter apps/frontend test`
- Backend only: `pnpm --filter apps/backend test`

## CI/CD
- All PRs must pass tests before merge
- Coverage reports are generated on every run

---

## Prioritized Checklist: Most Pressing Tests to Add

### Frontend
- [ ] Authentication flows (login, logout, registration, error states)
- [ ] Dashboard renders and displays key data
- [ ] Form validation and error messages
- [ ] AI/analytics components (AIBadge, AIConfidenceIndicator, AIFeedback)

### Backend
- [ ] API endpoints (auth, data, AI): correct data, error handling
- [ ] Service layer: voting, analytics, AI integration
- [ ] Database migrations: run without error, produce expected schema

### Shared/Integration
- [ ] Shared utilities (date utils, formatting, validation)
- [ ] End-to-end user flow (login, navigate, perform key action)

---

## Adding New Tests
- Place new tests in the appropriate workspace or `tests/` directory
- Use `.test.ts(x)` or `.spec.ts(x)` naming
- Use `@testing-library/react` for React components
- Use Vitest for all unit/integration tests

---

## Resources
- [Vitest Docs](https://vitest.dev/)
- [Testing Library Docs](https://testing-library.com/docs/)
- [Playwright Docs](https://playwright.dev/) 