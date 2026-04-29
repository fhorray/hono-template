import { cloudflare } from '@cloudflare/vite-plugin'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import RouterPlugin from './src/router'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'


export default defineConfig({
  ssr: {
    external: ['react', 'react-dom'],
  },
  plugins: [
    cloudflare(),
    react(),
    RouterPlugin(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
      'react-dom/server.edge': 'react-dom/server',
    }
  }
})
