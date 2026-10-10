import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

function discover(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? discover(path) : /\.test\.tsx?$/.test(entry.name) ? [path] : [];
  });
}

const files = [...discover('tests'), ...discover('modules/neurologia/lib')].sort();
if (!files.length) throw new Error('Nenhum teste encontrado.');
const result = spawnSync(process.execPath, ['node_modules/tsx/dist/cli.mjs', '--test', ...files], { stdio: 'inherit' });
if (result.error) throw result.error;
process.exit(result.status ?? 1);
