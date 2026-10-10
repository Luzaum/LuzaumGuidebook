import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
const cli = 'C:/Users/luzau/AppData/Local/npm-cache/_npx/31e32ef8478fbf80/node_modules/@playwright/cli/playwright-cli.js';
const result = spawnSync(process.execPath, [cli, '-s=vetius-corrections', 'run-code', readFileSync(process.argv[2], 'utf8')], { encoding: 'utf8' });
process.stdout.write(result.stdout || ''); process.stderr.write(result.stderr || ''); process.exit(result.status ?? 1);
