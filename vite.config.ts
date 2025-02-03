import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  base: '/portfolio/',
  server: {
    port: 3000,
    cors: true, 
  },
  preview:{
    port:3000,
    cors: true
  }
});
