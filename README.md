# VeritasVault.net Landing Page

Welcome to the VeritasVault.net landing page repository! This document will guide you through the project setup, development workflow, and deployment process.

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

The VeritasVault.net landing page serves as the primary entry point for users to learn about our services, features, and offerings. This repository contains all the code and assets needed to build, develop, and deploy the landing page.

This project is built with modern web technologies to ensure optimal performance, accessibility, and user experience across all devices.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v18 or later)
- [pnpm](https://pnpm.io/) (v8 or later)
- [Git](https://git-scm.com/)

### Installation

Follow these steps to get the project up and running on your local machine:

1. Clone the repository:
   ```bash
   git clone https://github.com/veritasvault/vv-landing.git
   cd vv-landing
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` with your specific configuration values.

4. Start the development server:
   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the landing page.

## Development

### Project Structure

```
vv-landing/
├── app/                # Next.js App Router pages and layouts
├── backend/            # Backend logic, API handlers, services, repositories
├── shared/             # Shared utilities, hooks, types, and logic
├── components/         # Reusable UI components
├── styles/             # Global styles and theme configuration
├── public/             # Static assets
├── tests/              # Global and integration tests
├── scripts/            # Utility scripts and automation helpers
├── docs/               # Documentation and guides
├── .github/            # GitHub Actions workflows and configs
├── package.json        # Project dependencies and scripts
├── README.md           # Project documentation (you are here!)
└── ...
```

### Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the production-ready application
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint to check code quality
- `pnpm test` - Run tests with Vitest
- `pnpm type-check` - Check TypeScript types

### Styling

This project uses a combination of:

- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- CSS modules for component-specific styles
- Theme variables for consistent branding

To modify the theme, check the files in `styles/theme`.

### Testing

This project uses [Vitest](https://vitest.dev/) for unit and component testing, with [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/) for React components.

- Test files should be placed in `tests/` or alongside components in `shared/` using `.test.ts(x)` or `.spec.ts(x)` naming.
- To run all tests:
  ```bash
  pnpm test
  ```
- Coverage reports are available in text and HTML formats after running tests.

## Deployment

The landing page is automatically deployed through our CI/CD pipeline when changes are pushed to the main branch.

For manual deployment:

1. Build the project:
   ```bash
   pnpm build
   ```

2. Deploy the `out` directory to your hosting provider.

### Deployment Environments

- **Production**: [https://VeritasVault.net](https://VeritasVault.net)
- **Staging**: [https://staging.VeritasVault.net](https://test.VeritasVault.net)

## Contributing

We welcome contributions to improve the VeritasVault.net landing page! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and ensure code quality (`pnpm test && pnpm lint`)
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

Please adhere to our coding standards and include appropriate tests for new features.

## Troubleshooting

### Common Issues

- **Build failures**: Make sure all dependencies are installed correctly and environment variables are set properly.
- **Styling inconsistencies**: Clear your browser cache or try building in production mode.
- **API connection issues**: Verify that the API endpoints are correctly configured in your environment variables.

For more help, please check our [internal documentation](https://docs.VeritasVault.net) or reach out to the development team.

## Automation (AutoPR)

### 🏁 Triggers
To configure AutoPR, write triggers in YAML.

For more information, see the Triggers reference.

### 🕳️ Under the Hood
AutoPR workflows are composed of actions, and they're triggered by events.

#### 💧 Actions
Actions are written in python; they define small reusable bits of orthogonal functionality.

For more information, see Writing an Action.

#### 🌊 Workflows
Workflows are written in YAML; they provide a simple configurable language for orchestrating actions.

For more information, see Writing a Workflow.

### Available Custom Actions

#### `run_script`
Runs a shell command (e.g., a pnpm script) and returns its output. This is useful for triggering custom maintenance or build scripts from a workflow.

**Inputs:**
- `command` (string): The command to execute.

**Outputs:**
- `stdout` (string): The standard output from the script.
- `stderr` (string): The standard error from the script.

**Example Usage in a Workflow:**
```yaml
- id: run_duplication_check
  action: run_script
  inputs:
    command: "pnpm dup-check"
```

#### `scaffold_component`
Scaffolds a new React component file in the specified directory.

**Inputs:**
- `component_name` (string): The name of the component to create.
- `directory` (string, optional): The directory to place the component in (default: `components`).

**Outputs:**
- `created_file` (string): The path to the newly created component file.

**Example Usage in a Workflow:**
```yaml
- id: scaffold_new_component
  action: scaffold_component
  inputs:
    component_name: "MyNewComponent"
    directory: "components/ui"
```

#### `find_large_assets`
Scans the specified directory for files larger than the given size threshold (in MB).

**Inputs:**
- `size_threshold_mb` (float, optional): The size threshold in MB (default: 0.5).
- `directory` (string, optional): The directory to scan (default: `public`).

**Outputs:**
- `large_files` (list): List of files exceeding the threshold, with their sizes.

**Example Usage in a Workflow:**
```yaml
- id: find_large_assets
  action: find_large_assets
  inputs:
    size_threshold_mb: 1.0
    directory: "public"
```

#### `check_lockfile_drift`
Checks if pnpm-lock.yaml is in sync with package.json by running 'pnpm install --frozen-lockfile'.

**Inputs:**
- None

**Outputs:**
- `is_synced` (bool): True if the lockfile is in sync, false otherwise.
- `output` (string): The output from the pnpm install command.

**Example Usage in a Workflow:**
```yaml
- id: check_lockfile_drift
  action: check_lockfile_drift
```

#### `scaffold_api_route`
Scaffolds a new Next.js App Router API route file in the `app/api/` directory.

**Inputs:**
- `route_name` (string): The name of the API route (e.g., "my-route").
- `http_methods` (list[string], optional): A list of HTTP methods to generate handlers for (default: `["GET"]`).

**Outputs:**
- `created_file` (string): The path to the newly created `route.ts` file.

**Example Usage in a Workflow:**
```yaml
- id: scaffold_contact_api
  action: scaffold_api_route
  inputs:
    route_name: "contact"
    http_methods: ["POST"]
```

#### `scaffold_shared_hook`
Scaffolds a new React hook file in the `shared/hooks` directory.

**Inputs:**
- `hook_name` (string): The name of the hook, which should start with "use" (e.g., "useNewHook").

**Outputs:**
- `created_file` (string): The path to the newly created hook file.

**Example Usage in a Workflow:**
```yaml
- id: scaffold_new_hook
  action: scaffold_shared_hook
  inputs:
    hook_name: "useAppContext"
```

#### `run_changed_tests`
Intelligently runs only the tests relevant to the files changed in the current git state using Vitest's `--changed` flag.

**Inputs:**
- None

**Outputs:**
- `test_results` (string): The full output from the Vitest test run.
- `passed` (bool): True if the tests passed, false otherwise.

**Example Usage in a Workflow:**
```yaml
- id: run_relevant_tests
  action: run_changed_tests
```

#### `run_dup_check`
Runs the 'pnpm dup-check' command to check for code duplication.

**Inputs:**
- None

**Outputs:**
- `report` (string): The full output from the `jscpd` command.
- `exit_code` (int): The exit code of the command (0 for success).

**Example Usage in a Workflow:**
```yaml
- id: run_duplication_check
  action: run_dup_check
```

#### `svg_to_component`
Converts raw SVG code into a reusable React component in `components/ui/icons`.

**Inputs:**
- `svg_code` (string): The raw SVG markup.
- `component_name` (string): The name for the new component (e.g., "MyIcon").

**Outputs:**
- `created_file` (string): The path to the newly created component file.

**Example Usage in a Workflow:**
```yaml
- id: create_icon_from_svg
  action: svg_to_component
  inputs:
    svg_code: '<svg>...</svg>'
    component_name: "MyNewIcon"
```

#### `generate_prop_table`
Parses a component's TypeScript props using `react-docgen-typescript` and generates a Markdown table.

**Inputs:**
- `component_path` (string): The path to the component file (e.g., "components/ui/button.tsx").

**Outputs:**
- `markdown_table` (string): The generated Markdown table of the component's props.
- `error` (string | None): Any error message if parsing fails.

**Example Usage in a Workflow:**
```yaml
- id: document_button_props
  action: generate_prop_table
  inputs:
    component_path: "components/ui/button.tsx"
```

#### `update_migration_plan`
Updates a specific step in the `MIGRATION_PLAN.md` file.

**Inputs:**
- `step_number` (int): The number of the step to update.
- `status` (string): The new status marker (e.g., `"[x]"`, `"[~]"`, `"[ ]"`).
- `text` (string, optional): If provided, replaces the existing text for that step.

**Outputs:**
- `success` (bool): True if the update was successful.
- `updated_line` (string | None): The content of the line that was updated.

**Example Usage in a Workflow:**
```yaml
- id: mark_step_one_complete
  action: update_migration_plan
  inputs:
    step_number: 1
    status: "[x]"
    text: "Create this migration plan in the project root"
```

#### `trigger_deployment`
Triggers a deployment by sending a POST request to a specified deployment hook URL (e.g., for Vercel or Netlify).

**Inputs:**
- `webhook_url` (string): The deployment hook URL to call.
- `client_payload` (dict, optional): A JSON payload to send with the request.

**Outputs:**
- `success` (bool): True if the request was successful (2xx status code).
- `status_code` (int): The HTTP status code of the response.
- `text` (string): The response body.

**Example Usage in a Workflow:**
```yaml
- id: deploy_to_staging
  action: trigger_deployment
  inputs:
    webhook_url: "https://api.vercel.com/v1/integrations/deploy/..."
```

#### `run_db_migrations`
Runs SQL migration files from a specified directory against a database. Assumes a CLI tool like `psql` is available in the environment.

**Inputs:**
- `database_connection_string` (string): The connection string for the database.
- `migrations_path` (string, optional): The path to the directory containing `.sql` migration files (default: "migrations").

**Outputs:**
- `success` (bool): True if all migrations ran successfully.
- `log` (string): The combined log output from all migration scripts.

**Example Usage in a Workflow:**
```yaml
- id: run_staging_migrations
  action: run_db_migrations
  inputs:
    database_connection_string: "..."
```

#### `seed_database`
Seeds a database with data from a specified SQL file. Assumes a CLI tool like `psql` is available.

**Inputs:**
- `database_connection_string` (string): The connection string for the database.
- `seed_file_path` (string): The path to the `.sql` seed file.

**Outputs:**
- `success` (bool): True if the seed script ran successfully.
- `log` (string): The log output from the script.

**Example Usage in a Workflow:**
```yaml
- id: seed_test_database
  action: seed_database
  inputs:
    database_connection_string: "..."
    seed_file_path: "seed-data.sql"
```

#### `label_pr`
Determines a list of labels to add to a pull request based on the paths of the changed files.

**Inputs:**
- None

**Outputs:**
- `labels_to_add` (list[string]): A list of labels to be added (e.g., `["backend", "frontend"]`).

**Example Usage in a Workflow:**
```yaml
- id: determine_pr_labels
  action: label_pr
# You would then pass the output of this action to another action
# like `actions/github-script` or a dedicated labeling action to apply the labels.
```

#### `visual_regression_test`
**[Simulation]** Runs a visual regression test by taking and comparing screenshots of specified pages.

**Inputs:**
- `urls` (list[string], optional): A list of page URLs to test (default: `["/"]`).
- `base_branch` (string, optional): The branch to use for baseline screenshots (default: "main").

**Outputs:**
- `success` (bool): True if no visual differences are found.
- `report` (string): A summary report of the test run.
- `diff_images` (list[string]): A list of paths to generated diff images.

**Example Usage in a Workflow:**
```yaml
- id: check_visuals
  action: visual_regression_test
  inputs:
    urls: ["/", "/about", "/pricing"]
```

#### `check_performance_budget`
**[Simulation]** Runs a performance audit (like Lighthouse) and checks key metrics against a predefined budget.

**Inputs:**
- `url` (string, optional): The URL to audit (default: "http://localhost:3000").
- `budget` (dict, optional): A dictionary defining the performance budget.

**Outputs:**
- `success` (bool): True if all metrics are within budget.
- `report` (string): A summary report of the budget check.
- `metrics` (dict): The actual metrics found during the audit.

**Example Usage in a Workflow:**
```yaml
- id: audit_performance
  action: check_performance_budget
```

#### `run_accessibility_audit`
**[Simulation]** Runs an accessibility (a11y) audit on a page and reports any violations.

**Inputs:**
- `url` (string, optional): The URL to audit (default: "http://localhost:3000").
- `fail_on_critical` (bool, optional): Whether the action should fail if critical violations are found (default: true).

**Outputs:**
- `success` (bool): True if the audit passes.
- `report` (string): A summary report of any violations found.
- `violations_count` (int): The total number of violations.
- `violations` (list[dict]): A detailed list of violation objects.

**Example Usage in a Workflow:**
```yaml
- id: audit_accessibility
  action: run_accessibility_audit
```

#### `update_docs_file`
Updates a documentation file by replacing content between specific start and end markers.

**Inputs:**
- `filepath` (string): The path to the documentation file to update.
- `content` (string): The new content to insert between the markers.
- `start_marker` (string, optional): The start marker (default: `<!-- DOCS:START -->`).
- `end_marker` (string, optional): The end marker (default: `<!-- DOCS:END -->`).

**Outputs:**
- `success` (bool): True if the update was successful.
- `error` (string | None): Any error message if the update failed.

**Example Usage in a Workflow:**
```yaml
- id: update_component_docs
  action: update_docs_file
  inputs:
    filepath: "docs/components/button.md"
    content: "New prop table content..."
```

#### `create_or_update_issue`
**[Simulation]** Creates a new GitHub issue, or updates an existing one found by a specific title and label.

**Inputs:**
- `title` (string): The title of the issue.
- `body` (string): The content of the issue.
- `find_label` (string, optional): If provided, searches for an issue with this label and title to update.

**Outputs:**
- `success` (bool): True if the operation was successful.
- `issue_url` (string): The URL of the created or updated issue.

**Example Usage in a Workflow:**
```yaml
- id: report_tech_debt
  action: create_or_update_issue
  inputs:
    title: "Weekly Tech Debt Report"
    body: "..."
    find_label: "tech-debt-report"
```

#### `create_github_release`
**[Simulation]** Creates a new draft release in GitHub associated with a specific tag.

**Inputs:**
- `tag_name` (string): The git tag for the release (e.g., "v1.0.1").
- `name` (string): The title of the release.
- `body` (string): The description or release notes.
- `is_draft` (bool, optional): Whether to create the release as a draft (default: true).
- `is_prerelease` (bool, optional): Whether to mark it as a pre-release (default: false).

**Outputs:**
- `success` (bool): True if the release was created successfully.
- `release_url` (string): The URL of the new release.

**Example Usage in a Workflow:**
```yaml
- id: draft_new_release
  action: create_github_release
  inputs:
    tag_name: "v1.0.1"
    name: "Version 1.0.1"
    body: "Release notes go here..."
```

#### `generate_barrel_file`
Generates an `index.ts` barrel file for a specified directory, exporting all modules within it.

**Inputs:**
- `directory` (string): The directory to generate the barrel file in.
- `exclude_patterns` (list[string], optional): A list of file patterns to exclude from export.

**Outputs:**
- `created_file` (string): The path to the created `index.ts` file.
- `exports_count` (int): The number of modules exported.

**Example Usage in a Workflow:**
```yaml
- id: barrel_file_for_ui
  action: generate_barrel_file
  inputs:
    directory: "components/ui"
```

#### `summarize_pr_with_ai`
**[Simulation]** Reads the git diff of a pull request and generates a human-readable summary.

**Inputs:**
- None

**Outputs:**
- `summary` (string): The AI-generated Markdown summary of the PR's changes.

**Example Usage in a Workflow:**
```yaml
- id: generate_pr_summary
  action: summarize_pr_with_ai
# You would then use the 'summary' output to update the PR description.
```

#### `generate_todo_report`
Scans the codebase for comments containing `// TODO:` and generates a Markdown report.

**Inputs:**
- `scan_path` (string, optional): The root path to scan (default: ".").
- `exclude_paths` (list[string], optional): A list of directories to exclude.

**Outputs:**
- `markdown_report` (string): The generated Markdown report of all TODOs.
- `todo_count` (int): The total number of TODOs found.

**Example Usage in a Workflow:**
```yaml
- id: create_todo_report
  action: generate_todo_report
# You could use this output to create or update a GitHub issue.
```

#### `post_comment`
**[Simulation]** Posts a comment to a GitHub pull request.

**Inputs:**
- `pull_request_number` (int): The number of the pull request to comment on.
- `comment` (string): The content of the comment to post.

**Outputs:**
- `success` (bool): True if the comment was posted successfully.
- `comment_url` (string): The URL of the posted comment.

**Example Usage in a Workflow:**
```yaml
- id: post_a_comment
  action: post_comment
  inputs:
    pull_request_number: 101
    comment: "Hello from a workflow!"
```

#### `check_dependency_licenses`
Checks dependency licenses against an allowed list using the `license-checker` tool.

**Inputs:**
- `allowed_licenses` (list[string], optional): A list of SPDX license identifiers to allow.

**Outputs:**
- `success` (bool): True if no forbidden licenses are found.
- `forbidden_packages` (list[dict]): A list of packages with non-allowed licenses.
- `log` (string): A summary of the findings.

**Example Usage in a Workflow:**
```yaml
- id: check_licenses
  action: check_dependency_licenses
  inputs:
    allowed_licenses: ["MIT", "ISC"]
```

#### `generate_release_notes`
Generates release notes by summarizing git commits since the last tag. Assumes a Conventional Commits-like message format.

**Inputs:**
- `from_tag` (string, optional): The git tag to start generating notes from. If omitted, uses the latest tag.

**Outputs:**
- `release_notes` (string): The generated Markdown release notes.

**Example Usage in a Workflow:**
```yaml
- id: draft_release_notes
  action: generate_release_notes
```

#### `publish_package`
Increments the version in `package.json`, builds, and publishes the package to a registry. This action simulates the process.

**Inputs:**
- `version_increment` (string, optional): The version increment type: "patch", "minor", or "major" (default: "patch").
- `dry_run` (bool, optional): If true, runs `pnpm publish --dry-run` (default: true).

**Outputs:**
- `success` (bool): True if the process was successful.
- `log` (string): The log output from the commands.
- `new_version` (string | None): The new version number (simulated).

**Example Usage in a Workflow:**
```yaml
- id: publish_new_patch
  action: publish_package
  inputs:
    version_increment: "patch"
    dry_run: false
```

#### `analyze_console_logs`
Scans the codebase for `console.log` statements, excluding test files and common build/dependency directories.

**Inputs:**
- `scan_path` (string, optional): The root path to start scanning from (default: ".").
- `exclude_paths` (list[string], optional): A list of directories to exclude.
- `exclude_files` (list[string], optional): A list of file name patterns to exclude.

**Outputs:**
- `found_logs` (list[dict]): A list of dictionaries, each containing the file, line number, and content of a found log.

**Example Usage in a Workflow:**
```yaml
- id: check_for_logs
  action: analyze_console_logs
```

#### `enforce_import_order`
Simulates running a linter to enforce import order conventions.

**Inputs:**
- None

**Outputs:**
- `success` (bool): True if the linting check passed.
- `log` (string): The output from the linter.

**Example Usage in a Workflow:**
```yaml
- id: lint_import_order
  action: enforce_import_order
```

#### `apply_git_patch`
**[Simulation]** Applies a git patch to the current branch.

**Inputs:**
- `patch_content` (string): The git patch content to apply.

**Outputs:**
- `success` (bool): True if the patch was applied successfully.
- `log` (string): The output log.

**Example Usage in a Workflow:**
```yaml
- id: apply_patch
  action: apply_git_patch
  inputs:
    patch_content: "diff --git a/file.txt b/file.txt\n..."
```

#### `find_dead_code`
**[Simulation]** Finds dead code using a tool like ts-prune or knip.

**Inputs:**
- `scan_path` (string, optional): The root path to scan (default: ".").

**Outputs:**
- `dead_code_report` (string): The report of dead code found.
- `dead_exports` (list[string]): The list of dead exports found.

**Example Usage in a Workflow:**
```yaml
- id: find_dead_code
  action: find_dead_code
```

#### `update_dependency`
**[Simulation]** Updates a dependency to the latest version and creates a new branch.

**Inputs:**
- `package_name` (string): The name of the package to update.

**Outputs:**
- `success` (bool): True if the update was successful.
- `log` (string): The output log.
- `new_version` (string | None): The new version number (simulated).

**Example Usage in a Workflow:**
```yaml
- id: update_react
  action: update_dependency
  inputs:
    package_name: "react"
```

#### `find_stale_issues_or_prs`
**[Simulation]** Finds stale issues or PRs with no activity for a given number of days.

**Inputs:**
- `days_stale` (int, optional): The number of days of inactivity to consider as stale (default: 30).
- `type` (string, optional): Either "issue" or "pr" (default: "issue").

**Outputs:**
- `stale_items` (list[dict]): The list of stale issues or PRs found.
- `report` (string): A summary report.

**Example Usage in a Workflow:**
```yaml
- id: find_stale_issues
  action: find_stale_issues_or_prs
  inputs:
    days_stale: 30
    type: "issue"
```

#### `run_security_audit`
**[Simulation]** Runs a security audit on dependencies using `pnpm audit`.

**Inputs:**
- None

**Outputs:**
- `success` (bool): True if no vulnerabilities are found.
- `report` (string): The JSON report from `pnpm audit`.
- `vulnerabilities` (list[dict]): A list of found vulnerabilities.

**Example Usage in a Workflow:**
```yaml
- id: check_security
  action: run_security_audit
```

#### `find_merged_branches`
**[Simulation]** Finds local branches that have been merged into the main remote branch.

**Inputs:**
- `remote` (string, optional): The git remote to check against (default: "origin").

**Outputs:**
- `merged_branches` (list[string]): A list of branch names that have been merged.

**Example Usage in a Workflow:**
```yaml
- id: find_merged
  action: find_merged_branches
```

#### `delete_branch`
**[Simulation]** Deletes a local and remote git branch.

**Inputs:**
- `branch_name` (string): The name of the branch to delete.

**Outputs:**
- `success` (bool): True if the deletion was successful.
- `log` (string): A log of the operations.

**Example Usage in a Workflow:**
```yaml
- id: cleanup_branch
  action: delete_branch
  inputs:
    branch_name: "feature/old-feature"
```

#### `label_pr_by_size`
Labels a PR by size (S, M, L, XL) based on the number of lines changed.

**Inputs:**
- None

**Outputs:**
- `size_label` (string): The calculated size label (e.g., "size: M").
- `lines_changed` (int): The total number of lines changed.

**Example Usage in a Workflow:**
```yaml
- id: get_pr_size
  action: label_pr_by_size
```

#### `take_screenshots`
**[Simulation]** Takes screenshots of key pages for a documentation gallery.

**Inputs:**
- `urls` (list[string], optional): A list of URLs to screenshot (default: `["/"]`).
- `output_dir` (string, optional): The directory to save screenshots to (default: "screenshots/gallery").

**Outputs:**
- `success` (bool): True if screenshots were taken successfully.
- `screenshot_paths` (list[string]): A list of paths to the saved screenshot files.

**Example Usage in a Workflow:**
```yaml
- id: create_screenshots
  action: take_screenshots
  inputs:
    urls: ["/", "/about"]
```

## License

This project is proprietary and confidential. Unauthorized copying, transferring, or reproduction of the contents of this repository, via any medium, is strictly prohibited.

Copyright © 2025 VeritasVault.net. All rights reserved.
