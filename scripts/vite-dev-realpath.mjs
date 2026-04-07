/**
 * Vite falha ao otimizar deps quando o projeto está em junction/symlink no Windows
 * (github.com/vitejs/vite/issues/9327). Força cwd no caminho físico antes de subir o Vite.
 */
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const realCwd = fs.realpathSync.native(process.cwd());
process.chdir(realCwd);

const viteCli = path.join(realCwd, 'node_modules', 'vite', 'bin', 'vite.js');
const extra = process.argv.slice(2);
const child = spawn(process.execPath, [viteCli, ...extra], {
  stdio: 'inherit',
  cwd: realCwd,
  env: process.env,
});

child.on('exit', (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 1);
});
