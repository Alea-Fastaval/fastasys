/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@shared': '/src/app/shared',
      '@features': '/src/app/features',
      '@assets': '/src/assets',
      '@env': '/src/environments',
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    watch: false,
    include: ['src/**/*.spec.ts'],
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
    reporters: [['junit', { suiteName: 'frontend-tests' }]],
    outputFile: 'coverage/frontend-junit.xml',
  },
});
