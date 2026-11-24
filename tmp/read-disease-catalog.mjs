import fs from 'node:fs';
import { loadEnv } from 'vite';
import { createClient } from '@supabase/supabase-js';
const env = loadEnv('development', process.cwd(), 'VITE_');
if (!env.VITE_SUPABASE_URL || !env.VITE_SUPABASE_ANON_KEY) throw new Error('Configuração pública indisponível');
const client = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
const rows = [];
for (let from = 0; ; from += 500) {
  const { data, error } = await client.from('consulta_vet_diseases').select('*').order('id').range(from, from + 499);
  if (error) { console.log(JSON.stringify({ error: error.code, message: error.message })); process.exit(1); }
  rows.push(...data);
  if (data.length < 500) break;
}
fs.writeFileSync('tmp/disease-remote-catalog.json', JSON.stringify(rows));
const local = JSON.parse(fs.readFileSync('tmp/disease-audit-after.json')).rows;
console.log(JSON.stringify({ visibleRemote: rows.length, remoteOnly: rows.filter(r => !local.some(l => l.slug === r.slug)).map(r => ({ title: r.title, slug: r.slug, words: JSON.stringify(r).split(/\s+/).length })) }, null, 2));
