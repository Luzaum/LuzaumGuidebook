import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const migrationPath = new URL('../../supabase/migrations/20260801120000_create_receituario_simplified_tables.sql', import.meta.url);

test('migração faz backup antes de remover tabelas exclusivas', async () => {
  const sql = await readFile(migrationPath, 'utf8');
  const backup = sql.indexOf('create table receituario_backup_20260801');
  const drop = sql.indexOf('drop table if exists public.generated_documents');
  assert.ok(backup >= 0 && drop > backup);
  assert.match(sql, /receituario_migration_audit/);
});

test('RLS restringe documentos, favoritos, modelos pessoais e rascunhos ao usuário', async () => {
  const sql = await readFile(migrationPath, 'utf8');
  for (const contract of ['created_by = auth.uid()', 'user_id = auth.uid()', 'owner_user_id = auth.uid()', 'receituario_drafts_owner_all']) assert.match(sql, new RegExp(contract.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
});

test('anexos ficam em bucket privado com pasta do usuário', async () => {
  const sql = await readFile(migrationPath, 'utf8');
  assert.match(sql, /'receituario-signed-copies'.*false/s);
  assert.match(sql, /storage\.foldername\(name\)\)\[2\] = auth\.uid\(\)::text/);
});

test('documentos não possuem vínculos permanentes com patient_id ou responsible_id', async () => {
  const sql = await readFile(migrationPath, 'utf8');
  const generatedTable = sql.match(/create table public\.generated_documents \(([\s\S]*?)\n\);/)?.[1] || '';
  assert.equal(/patient_id|responsible_id|veterinarian_id/.test(generatedTable), false);
});
