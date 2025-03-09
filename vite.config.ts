import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    host: true, // Nécessaire pour Docker
    port: 5173, // Port par défaut
    strictPort: true, // Empêche Vite de chercher un autre port si 5173 est occupé
    watch: {
      usePolling: true, // Nécessaire pour le hot reload dans Docker
    },
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: process.env.NODE_ENV !== 'production', // Only in dev
    minify: 'terser', // Use terser for better minification
    terserOptions: {
      compress: {
        drop_console: process.env.NODE_ENV === 'production', // Remove console logs in prod
        drop_debugger: true,
      },
    },
    cssMinify: true, // Ensure CSS is minified
    rollupOptions: {
      output: {
        // Optimize chunks for better caching
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-label', '@radix-ui/react-switch', '@radix-ui/react-toast'],
          i18n: ['i18next', 'react-i18next'],
          state: ['zustand'],
        },
        // Add hashing for better cache control
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
    assetsInlineLimit: 4096, // Inline small assets to reduce HTTP requests
  },
  preview: {
    port: 4173,
    host: true,
  },
});
