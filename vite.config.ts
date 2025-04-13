import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from '@nabla/vite-plugin-eslint';
// https://vite.dev/config/

export default defineConfig({
  plugins: [
    react(),
    eslintPlugin({
      formatter: 'table',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
