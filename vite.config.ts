import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true, // Nécessaire pour Docker
    port: 5173, // Port par défaut
    strictPort: true, // Empêche Vite de chercher un autre port si 5173 est occupé
    watch: {
      usePolling: true, // Nécessaire pour le hot reload dans Docker
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    chunkSizeWarningLimit: 1000, // Augmente la limite d'avertissement de taille des chunks
  },
})
