import { defineConfig } from 'tsup';

const isDev = process.env.npm_lifecycle_event === 'dev';

export default defineConfig({
  format: ['esm'],
  dts: true,
  outDir: 'dist',
  clean: true,

  entry: ['src/index.ts'],
  shims: true,
  banner: {
    js: '#!/usr/bin/env node',
  },
  minify: !isDev,
  target: 'esnext',
  onSuccess: isDev ? 'node dist/index.js' : undefined,
});
