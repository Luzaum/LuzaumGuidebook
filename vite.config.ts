import fs from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// Pasta real do projeto (VetiusLink pode ser junction → evita falha "Does the file exist?" + crash do Vite).
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = fs.realpathSync.native(__dirname);

function spaDevFallbackPlugin() {
  return {
    name: 'vetius-spa-dev-fallback',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const method = req.method || 'GET';
        const accept = String(req.headers.accept || '');
        const pathname = new URL(req.url || '/', 'http://localhost').pathname;

        if (
          (method === 'GET' || method === 'HEAD') &&
          accept.includes('text/html') &&
          pathname !== '/' &&
          !pathname.startsWith('/api/') &&
          !pathname.startsWith('/@') &&
          !pathname.includes('.')
        ) {
          req.url = '/index.html';
        }

        next();
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, projectRoot, '');
  return {
    plugins: [spaDevFallbackPlugin(), react()],
    // Raiz explícita no caminho físico — alinha com index.html / index.tsx em discos junction (Windows).
    root: projectRoot,
    base: '/',
    server: {
      port: 5173,
      host: true,
      // Com host: true, fixa o cliente HMR em localhost (evita WS falhar ao abrir pelo 127.0.0.1).
      // NÃO fixar `port` aqui: se 5173 estiver ocupada o Vite sobe em 5174+ e o HMR deve usar a MESMA
      // porta — senão o browser mistura origens e ainda tenta 5173 (426 Upgrade Required / WS quebrado).
      hmr: {
        host: 'localhost',
      },
      fs: {
        // Junction Usuário → PROJETOS VET: permitir servir pelo caminho resolvido.
        strict: false,
        allow: [projectRoot],
      },
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
        '@': projectRoot,
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
