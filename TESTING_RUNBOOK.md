# Testing Runbook

This guide covers all testing workflows for the VeritasVault monorepo, including unit, integration, and E2E tests, as well as code coverage collection and reporting.

---

## 1. Unit & Integration Tests (Vitest)

- **Run all tests:**
  
  ```sh
  pnpm test
  ```

- **Generate coverage report:**
  
  ```sh
  pnpm test -- --coverage
  # Coverage output: coverage/lcov.info, coverage/index.html
  ```

---

## 2. End-to-End (E2E) Tests (Playwright)

- **Start the frontend with coverage instrumentation:**
  - **PowerShell:**

    ```powershell
    $env:COVERAGE="true"; pnpm --filter apps/frontend dev
    ```

  - **Bash:**

    ```bash
    COVERAGE=true pnpm --filter apps/frontend dev
    ```

- **In a separate terminal, run Playwright tests:**
  
  ```sh
  pnpm test:e2e
  ```

- **E2E coverage will be written to:**
  
  ``` sh
  coverage/coverage-e2e.json
  ```

---

## 3. Merging Coverage (Unit + E2E)

- **Install nyc (if not already):**

  ```sh
  pnpm add -D nyc
  ```

- **Merge coverage:**
  
  1. Convert E2E JSON to lcov using `nyc`:
  
     ```sh
     npx nyc report --reporter=lcov --report-dir=coverage --temp-dir=coverage --exclude-after-remap=false
     ```

     (If needed, use a tool like `istanbul-merge` or `nyc merge` to combine multiple JSON files.)
  
  2. If you have both `coverage/lcov.info` (unit) and `coverage/coverage-e2e.json` (E2E), merge them:
  
     ```sh
     npx nyc merge coverage coverage/merged-coverage.json
     npx nyc report --reporter=lcov --report-dir=coverage --temp-dir=coverage --exclude-after-remap=false
     ```
  
  3. The final merged lcov file will be at:
  
     ``` sh
     coverage/lcov.info
     ```

---

## 4. Uploading to Codecov

- **CI will upload automatically.**
- **Manual upload:**

  ```sh
  npx codecov -f coverage/lcov.info
  ```

---

## 5. Troubleshooting

- **No projects matched the filters:**
  - Ensure `apps/frontend/package.json` exists and is listed in `pnpm-workspace.yaml`.
- **COVERAGE env var not working:**
  - Use `$env:COVERAGE="true"; ...` in PowerShell, `set COVERAGE=true && ...` in cmd, or `COVERAGE=true ...` in Bash.
- **No coverage written:**
  - Ensure you visit all relevant pages in E2E tests and that `window.__coverage__` is present.
- **Playwright global setup errors:**
  - Remove or comment out global setup if not needed for coverage.

---

## 6. CI/CD Notes

- CI runs all tests and uploads merged coverage to Codecov.
- Badge is available in the README after the first successful upload.

---

## 7. Resources

- [Vitest Docs](https://vitest.dev/)
- [Playwright Docs](https://playwright.dev/)
- [Codecov Docs](https://docs.codecov.com/)
- [nyc (Istanbul) Docs](https://istanbul.js.org/)
