import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const rootDir = process.cwd();
const envLocalPath = path.join(rootDir, '.env.local');
const envExamplePath = path.join(rootDir, '.env.example');

if (!fs.existsSync(envLocalPath)) {
  const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
  const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';
  const consensusBucket = process.env.VITE_SUPABASE_CONSENSUS_BUCKET || 'consulta-consensos';

  if (supabaseUrl && supabaseAnonKey) {
    const content = [
      '# Gerado automaticamente via GitHub Codespaces Secrets',
      `VITE_SUPABASE_URL=${supabaseUrl}`,
      `VITE_SUPABASE_ANON_KEY=${supabaseAnonKey}`,
      `VITE_SUPABASE_CONSENSUS_BUCKET=${consensusBucket}`,
      '',
    ].join('\n');
    fs.writeFileSync(envLocalPath, content, 'utf8');
    console.log('[setup-cloud] .env.local criado com sucesso a partir dos Secrets do GitHub Codespaces.');
  } else if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envLocalPath);
    console.log('[setup-cloud] .env.local criado a partir de .env.example. Configure VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY se necessário.');
  }
} else {
  console.log('[setup-cloud] .env.local já existe.');
}
