import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  test: {
    environment: 'node',
    setupFiles: ['./test-setup.ts'],
    globalSetup: ['./test-global-setup.ts']
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})