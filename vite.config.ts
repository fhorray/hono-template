import { cloudflare } from '@cloudflare/vite-plugin'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import RouterPlugin from './src/router'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import devServer from "@hono/vite-dev-server";
import build from "@hono/vite-build/node";

export default defineConfig(({ mode }) => {
  const isClient = mode === 'client';

  return {
    ssr: isClient ? undefined : {
      external: ['react', 'react-dom'],
    },
    plugins: [
      react(),
      RouterPlugin(),
      tailwindcss(),
      ...(isClient ? [] : [
        cloudflare(),
        build({
          entry: 'src/index.tsx',
          staticRoot: './dist',
        }),
        devServer({
          entry: 'src/index.tsx',
        }),
      ]),
    ],
    build: isClient ? {
      rollupOptions: {
        input: './src/client.tsx',
        output: {
          entryFileNames: 'static/client.js',
        },
      },
    } : {},
    resolve: {
      alias: [
        { find: '~', replacement: path.resolve(__dirname, './src') },
        ...(!isClient ? [{ find: 'react-dom/server.edge', replacement: 'react-dom/server' }] : []),
      ],
    },
  };
});


