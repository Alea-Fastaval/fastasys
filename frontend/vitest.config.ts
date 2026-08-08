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
    setupFiles: ['src/test-setup.ts'],
    watch: false,
    include: ['src/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/app/**/*.ts'],
      exclude: ['src/app/**/*.spec.ts', 'src/app/**/index.ts', 'src/**/*routes.ts'],
      reportsDirectory: 'coverage',
      reporter: ['text', 'lcov', 'cobertura'],
    },
    reporters: ['default'],
  },
});
