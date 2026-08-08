/// <reference types="vitest" />
import { defineConfig, Plugin } from 'vitest/config';
import fs from 'node:fs';
import path from 'node:path';

function angularTemplatePlugin(): Plugin {
  return {
    name: 'vite-plugin-angular-template',
    transform(code, id) {
      if (!id.endsWith('.ts') || id.endsWith('.spec.ts')) return;
      if (!code.includes('templateUrl:')) return;

      const dir = path.dirname(id);

      const newCode = code
        .replace(/templateUrl:\s*['"](\.\/[^'"]+)['"]/g, (_, relPath) => {
          const filePath = path.resolve(dir, relPath);
          if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf-8');
            return `template: ${JSON.stringify(content)}`;
          }
          return _;
        })
        .replace(/styleUrl:\s*['"](\.\/[^'"]+)['"]/g, (_, relPath) => {
          const filePath = path.resolve(dir, relPath);
          if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf-8');
            return `styles: [${JSON.stringify(content)}]`;
          }
          return _;
        });

      return { code: newCode, map: null };
    },
  };
}

export default defineConfig({
  plugins: [angularTemplatePlugin()],
  resolve: {
    alias: {
      '@shared': '/src/app/shared',
      '@features': '/src/app/features',
      '@assets': '/public/assets',
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
