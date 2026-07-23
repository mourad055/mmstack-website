import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Build production volontairement « opaque » côté navigateur :
 * - pas de source maps (évite de reconstituer l’arborescence React dans DevTools)
 * - minification esbuild (déjà défaut Vite, forcée ici)
 * - drop console/debugger en prod
 *
 * On n’ajoute PAS d’obfuscateur lourd (javascript-obfuscator) ni de bloqueurs
 * clic-droit / F12 : peu efficaces, mauvais pour l’UX/a11y, et coûteux en perf
 * (surtout avec la scène Three.js).
 */
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  build: {
    sourcemap: false,
    minify: 'esbuild',
    cssMinify: true,
    // Noms de chunks hashés uniquement — pas de chemins source lisibles
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
  esbuild: mode === 'production' ? { drop: ['console', 'debugger'] } : {},
  css: {
    devSourcemap: false,
  },
}))
