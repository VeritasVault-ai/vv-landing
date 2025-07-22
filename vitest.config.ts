import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'], // Add setup file for jest-dom matchers
    include: [
      'tests/**/*.{test,spec}.{ts,tsx,js,jsx}',
      'apps/*/**/*.{test,spec}.{ts,tsx,js,jsx}',
      'packages/*/**/*.{test,spec}.{ts,tsx,js,jsx}',
    ],
    coverage: {
      reporter: ['text', 'lcov'],
      reportsDirectory: 'coverage',
      exclude: ['**/node_modules/**', '**/tests/**', '**/playwright/**'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'apps/frontend'),
      '@shared': path.resolve(__dirname, 'packages/shared'),
    },
  },
});
