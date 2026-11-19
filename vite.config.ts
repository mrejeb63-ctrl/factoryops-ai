import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves this project below /factoryops-ai/.
// Keep local development and preview rooted at /.
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/factoryops-ai/' : '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('/recharts/') || id.includes('/d3-')) return 'charts';
          if (id.includes('/@supabase/')) return 'supabase';
          if (id.includes('/lucide-react/')) return 'icons';
          if (id.includes('/react-dom/') || id.includes('/react/')) return 'react';
        },
      },
    },
  },
}));