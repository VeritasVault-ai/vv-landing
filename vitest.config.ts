import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: [], // Add setup files if needed
    include: [
      'tests/**/*.{test,spec}.{ts,tsx,js,jsx}',
      'shared/**/*.{test,spec}.{ts,tsx,js,jsx}'
    ],
    coverage: {
      reporter: ['text', 'html'],
    },
  },
}) 