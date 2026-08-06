import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),       // React JSX transform + Fast Refresh
    tailwindcss(), // Tailwind CSS v4 via Vite plugin (no postcss.config needed)
  ],

  resolve: {
    alias: {
      // Allows clean imports: import { Button } from '@/components/ui/Button'
      '@': new URL('./src', import.meta.url).pathname,
    },
  },

  server: {
    port: 5173,
    proxy: {
      // Proxy /api requests to the Express server during development
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },

  build: {
    outDir: 'dist',
    sourcemap: true, // Enable for production debugging; disable for smaller builds
  },
});
