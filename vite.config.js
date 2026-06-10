import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // GitHub Pages deploys to /Website/ sub-path
  base: '/Website/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        argus: resolve(__dirname, 'argus.html'),
        personality: resolve(__dirname, 'personality-db.html')
      }
    }
  },
  server: {
    watch: {
      ignored: ['**/*.mp4']
    }
  }
});
