# Migration Plan

- [x] 1. **Create this migration plan in the project root**
- [x] 2. **Initialize pnpm and Turborepo in the project root**
    - `pnpm-workspace.yaml` and `turbo.json` created
    - Root `package.json` updated for workspaces and scripts
- [~] 3. **Create `shared/` directory for shared code (types, utils, etc.)**
    - `lib/` currently contains shared utilities, services, and hooks. Consider renaming to `shared/` for clarity, or keep as is if preferred.
- [ ] 4. **Create `tests/` directory in the root for the test runner and global tests**
    - No top-level `tests/` directory found. Create one and move/link any global or integration tests here.
- [ ] 5. **Move frontend code, assets, configs, and dependencies into `frontend/`**
    - Optionally, move `app/`, `components/`, `styles/`, and related config files into a new `frontend/` directory for strict separation.
    - Otherwise, keep as is if monorepo separation is not required.
- [~] 6. **Move backend code, assets, configs, and dependencies into `backend/`**
    - `backend/` directory created.
    - `app/actions` moved to `backend/actions` as the first backend-specific logic migration.
    - Continue moving backend logic from `lib/`, etc., as needed.
- [x] 7. **Move documentation, markdown files, and architecture docs into `docs/`**
    - All documentation is already organized in `docs/`.
- [x] 8. **Move utility scripts and automation helpers into `scripts/`**
    - All utility scripts are already in `scripts/`.
- [ ] 9. **Move or merge all test files into the appropriate `frontend/`, `backend/`, or root `tests/` directories**
    - Organize tests by domain or keep global tests in `tests/`.
- [ ] 10. **Update all import paths, scripts, and configuration files to reflect the new directory structure**
    - After moving files, update all import paths and configuration files.
- [ ] 11. **Update CI/CD and documentation to match the new project structure**
    - Update workflow files and documentation to match the new structure.

---

**Notes:**
- If you want strict separation, create `frontend/`, `backend/`, and `shared/` directories.
- If you prefer, keep `lib/` as the shared package and only create `backend/` for server logic.
- Tests should be organized for clarity and maintainability. 