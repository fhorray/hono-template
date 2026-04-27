import { cloudflare } from '@cloudflare/vite-plugin'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import RouterPlugin from './src/router'
import tailwindcss from '@tailwindcss/vite'


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
      'react-dom/server.edge': 'react-dom/server',
      'react-dom/server': 'react-dom/server',
    }
  }
})
