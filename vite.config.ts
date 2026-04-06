import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: '/',
    server: {
      port: 5175,
      host: true,
      proxy: {
        '/api/deepseek': {
          target: 'https://api.deepseek.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/deepseek/, '')
        }
      }
    },
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.VITE_DEEPSEEK_API_KEY': JSON.stringify(
        env.VITE_DEEPSEEK_API_KEY || env.DEEPSEEK_API_KEY || '',
      ),
      'process.env.DEEPSEEK_API_KEY': JSON.stringify(
        env.DEEPSEEK_API_KEY || env.VITE_DEEPSEEK_API_KEY || '',
      ),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    },
    build: {
      chunkSizeWarningLimit: 900,
      rollupOptions: {
        onwarn(warning, warn) {
          if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return
          warn(warning)
        },
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (
                id.includes('three') ||
                id.includes('@react-three/fiber') ||
                id.includes('@react-three/drei')
              ) {
                return 'vendor-three'
              }
              if (id.includes('jspdf') || id.includes('html2canvas')) {
                return 'vendor-pdf'
              }
              if (id.includes('@supabase')) {
                return 'vendor-supabase'
              }
              return undefined
            }
            if (id.includes('modules/receituario-vet')) {
              // Let Rollup handle receituario chunk splitting automatically.
              // Manual splitting previously caused circular chunk TDZ crashes because
              // NovaReceita2Page ↔ novaReceita2Adapter ↔ compoundedUi formed cycles
              // that manifested differently across environments (local vs Netlify).
              return 'feature-receituario'
            }
            return undefined
          }
        }
      }
    }
  };
});
