[![codecov](https://codecov.io/gh/OWNER/REPO/branch/main/graph/badge.svg)](https://codecov.io/gh/OWNER/REPO)
# VeritasVault.net Monorepo

Welcome to the VeritasVault.net monorepo! This document will guide you through the project setup, development workflow, and deployment process.

## 📚 Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Development](#development)
  - [Project Structure](#project-structure)
  - [Available Scripts](#available-scripts)
  - [Styling](#styling)
  - [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Introduction

The VeritasVault.net monorepo contains all code and assets for the landing page, backend, shared libraries, automation, and more. It is organized for scalability, maintainability, and modern developer experience.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [pnpm](https://pnpm.io/) (v8 or later)
- [Git](https://git-scm.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/veritasvault/vv-landing.git
   cd vv-landing
   ```
2. Install dependencies for all workspaces:
   ```bash
   pnpm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` with your specific configuration values.
4. Start the frontend development server:
   ```bash
   pnpm --filter apps/frontend dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

### Project Structure

```
vv-landing/
├── apps/
│   ├── frontend/       # Next.js app, all frontend code and config
│   └── backend/        # Backend logic, API handlers, services, repositories
├── packages/
│   └── shared/         # Shared utilities, hooks, types, and logic
├── tools/
│   ├── scripts/        # Utility scripts and automation helpers
│   └── autopr/         # Automation engine and workflows
├── tests/              # Global and integration tests
├── docs/               # Documentation and guides
├── config/             # Project-wide configuration
├── .ai/                # AI/automation meta/config files
├── .github/            # GitHub Actions workflows and configs
├── package.json        # Project dependencies and scripts
├── pnpm-workspace.yaml # pnpm monorepo workspace config
├── README.md           # Project documentation (you are here!)
└── ...
```

### Available Scripts

- `pnpm --filter apps/frontend dev` - Start the frontend development server
- `pnpm --filter apps/frontend build` - Build the frontend app
- `pnpm --filter apps/frontend start` - Start the frontend production server
- `pnpm --filter apps/frontend lint` - Run ESLint on the frontend
- `pnpm test` - Run tests with Vitest across all workspaces
- `pnpm install` - Install dependencies for all workspaces

### Styling

- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- CSS modules for component-specific styles
- Theme variables for consistent branding

To modify the theme, check the files in `apps/frontend/styles/theme`.

### Testing

- [Vitest](https://vitest.dev/) for unit and component testing
- [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/) for React components
- Test files should be placed in `tests/`, `apps/*/`, or `packages/*/` using `.test.ts(x)` or `.spec.ts(x)` naming
- To run all tests:
  ```bash
  pnpm test
  ```
- Coverage reports are available in text and HTML formats after running tests

## Deployment

The landing page is automatically deployed through our CI/CD pipeline when changes are pushed to the main branch.

For manual deployment:

1. Build the frontend app:
   ```bash
   pnpm --filter apps/frontend build
   ```
2. Deploy the `out` directory to your hosting provider.

### Deployment Environments

- **Production**: [https://VeritasVault.net](https://VeritasVault.net)
- **Staging**: [https://staging.VeritasVault.net](https://test.VeritasVault.net)

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and ensure code quality (`pnpm test && pnpm lint`)
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

Please adhere to our coding standards and include appropriate tests for new features.

## Troubleshooting

- **Build failures**: Make sure all dependencies are installed and environment variables are set properly.
- **Styling inconsistencies**: Clear your browser cache or try building in production mode.
- **API connection issues**: Verify that the API endpoints are correctly configured in your environment variables.

For more help, check our [internal documentation](https://docs.VeritasVault.net) or reach out to the development team.

## Notes

- **pnpm workspaces:** This monorepo is managed by pnpm. Workspaces are defined in `pnpm-workspace.yaml`.
- **Husky:** Git hooks are set up via a `postinstall` script. After cloning, run `pnpm install` to enable hooks.
- **.code-workspace:** The VS Code workspace file is in the root for easy team sharing.

## License

This project is proprietary and confidential. Unauthorized copying, transferring, or reproduction of the contents of this repository, via any medium, is strictly prohibited.

Copyright © 2025 VeritasVault.net. All rights reserved.
