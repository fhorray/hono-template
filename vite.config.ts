import { cloudflare } from '@cloudflare/vite-plugin'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import RouterPlugin from './src/router'


export default defineConfig({
  ssr: {
    external: ['react', 'react-dom'],
  },
  plugins: [
    cloudflare(),
    react(),
    RouterPlugin()
  ],
  resolve: {
    alias: {
      'react-dom/server.edge': 'react-dom/server',
      'react-dom/server': 'react-dom/server',
    }
  }
})
