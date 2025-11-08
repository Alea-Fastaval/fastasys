/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    watch: false,
    coverage: {
      provider: 'v8',
      include: ['src/app/features/*.ts', 'src/app/shared/*.ts'],
      exclude: ['src/app/**/*.spec.ts', 'src/app/**/index.ts', 'src/**/*routes.ts'],
      reportsDirectory: 'coverage',
      reporter: ['text', 'lcov', 'cobertura'],
      thresholds: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
  },
});
