import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'dist',
  },
  server: {
    port: 5173,
  },
  base: '/web-main/', // إعداد صحيح لمسار GitHub Pages
});
