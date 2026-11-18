import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves this project below /factoryops-ai/.
// Keep local development and preview rooted at /.
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/factoryops-ai/' : '/',
}));