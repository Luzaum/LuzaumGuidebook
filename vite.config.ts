import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: '/',
    server: {
      port: 5173,
      host: true
    },
    define: {
      // definitions removed
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    },
    build: {
      chunkSizeWarningLimit: 1200,
      rollupOptions: {
        onwarn(warning, warn) {
          if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return;
          warn(warning);
        },
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) return undefined;
            if (id.includes('react-router')) return 'vendor-router';
            if (id.includes('@supabase')) return 'vendor-supabase';
            if (id.includes('framer-motion')) return 'vendor-motion';
            if (id.includes('@react-three') || id.includes('/three/')) return 'vendor-3d';
            if (id.includes('@radix-ui')) return 'vendor-radix';
            if (id.includes('react') || id.includes('scheduler')) return 'vendor-react';
            if (id.includes('jspdf')) return 'vendor-pdf';
            return 'vendor-misc';
          }
        }
      }
    }
  };
});
