import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
  },
  resolve: {
    alias: {
      'react': 'hono/jsx',
      'react-dom': 'hono/jsx',
      'react/jsx-runtime': 'hono/jsx/jsx-runtime'
    }
  }
})
