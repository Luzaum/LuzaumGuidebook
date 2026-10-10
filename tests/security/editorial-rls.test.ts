import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { PGlite } from '@electric-sql/pglite';

// Execute the actual migration on isolated PostgreSQL, with legacy permissive
// policies present. No production credentials or production writes are used.
test('PostgreSQL: leitura pública, autoria, catálogo editorial e arquivos isolam permissões', async () => {
  const db = new PGlite();
  const author = '00000000-0000-0000-0000-000000000001';
  const other = '00000000-0000-0000-0000-000000000002';
  const admin = '00000000-0000-0000-0000-000000000003';
  const tables = ['consulta_vet_categories', 'consulta_vet_diseases', 'consulta_vet_medications', 'consulta_vet_disease_medications', 'consulta_vet_disease_consensos'];
  try {
    await db.exec(`
      create role anon; create role authenticated; create role service_role;
      create schema auth; create schema storage;
      create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
      create table auth.users (id uuid primary key, email text, email_confirmed_at timestamptz, raw_app_meta_data jsonb, raw_user_meta_data jsonb);
      insert into auth.users values
        ('${author}','author@example.com',now(),'{}','{}'),
        ('${other}','other@example.com',now(),'{}','{"role":"admin","username":"luishvet25"}'),
        ('${admin}','admin@example.com',now(),'{"role":"admin"}','{}');
      create table public.consensus_documents (id text primary key, created_by uuid, is_published boolean, title text);
      create table public.consensus_document_details (id text primary key, consensus_document_id text, body text);
      create table storage.objects (id text primary key, bucket_id text, owner_id text, name text);
      alter table public.consensus_documents enable row level security;
      alter table public.consensus_document_details enable row level security;
      alter table storage.objects enable row level security;
      create policy consensus_documents_manage_authenticated on public.consensus_documents for all to authenticated using(true) with check(true);
      create policy consensus_documents_authenticated_insert on public.consensus_documents for insert to authenticated with check(true);
      create policy consensus_documents_authenticated_update on public.consensus_documents for update to authenticated using(true) with check(true);
      create policy consensus_documents_authenticated_delete on public.consensus_documents for delete to authenticated using(true);
      create policy consensus_document_details_manage_owner on public.consensus_document_details for all to authenticated using(true) with check(true);
      create policy consensus_document_details_select_visible_consensus on public.consensus_document_details for select to anon,authenticated using(exists(select 1 from public.consensus_documents d where d.id=consensus_document_id and d.is_published));
      create policy consulta_consensos_read_public on storage.objects for select to anon,authenticated using(bucket_id='consulta-consensos');
      create policy consulta_consensos_update_authenticated on storage.objects for update to authenticated using(true) with check(true);
      create policy consulta_consensos_insert on storage.objects for insert to authenticated with check(true);
      create policy consulta_consensos_delete on storage.objects for delete to authenticated using(true);
      insert into public.consensus_documents values ('published','${author}',true,'Published'),('draft','${author}',false,'Draft');
      insert into public.consensus_document_details values ('detail','published','Original');
      insert into storage.objects values ('pdf','consulta-consensos','${author}','original.pdf');
    `);
    for (const table of tables) await db.exec(`
      create table public.${table}(id text primary key, body text);
      alter table public.${table} enable row level security;
      create policy ${table}_read_public on public.${table} for select to anon,authenticated using(true);
      create policy ${table}_manage_owner on public.${table} for all to authenticated using(true) with check(true);
      insert into public.${table} values('original','Preserved');
    `);
    await db.exec(`grant usage on schema public,auth,storage to anon,authenticated; grant all on all tables in schema public,storage to anon,authenticated;`);
    await db.exec(readFileSync('supabase/migrations/20261009000100_secure_editorial_and_consensus_access.sql', 'utf8'));
    const asUser = async (role: string, uid: string) => {
      await db.exec(`reset role; select set_config('request.jwt.claim.sub','${uid}',false); set role ${role};`);
    };
    await asUser('anon', '');
    assert.equal((await db.query('select * from public.consensus_documents')).rows.length, 1);
    await asUser('authenticated', other);
    assert.equal((await db.query('select public.can_manage_consulta_vet_editorial() as allowed')).rows[0].allowed, false);
    assert.equal((await db.query(`select public.is_luishvet25_user('${other}') as allowed`)).rows[0].allowed, false);
    assert.equal((await db.query('select * from public.consensus_documents')).rows.length, 1);
    assert.equal((await db.query("update public.consensus_documents set title='Hijacked' where id='published' returning id")).rows.length, 0);
    assert.equal((await db.query("delete from public.consensus_documents where id='published' returning id")).rows.length, 0);
    await assert.rejects(db.query(`insert into public.consensus_documents values('spoof','${author}',true,'Spoof')`), /row-level security/);
    assert.equal((await db.query("update public.consensus_document_details set body='Hijacked' returning id")).rows.length, 0);
    assert.equal((await db.query("update storage.objects set name='Hijacked' returning id")).rows.length, 0);
    await assert.rejects(db.query(`insert into storage.objects values('spoof','consulta-consensos','${author}','spoof.pdf')`), /row-level security/);
    for (const table of tables) {
      assert.equal((await db.query(`update public.${table} set body='Hijacked' returning id`)).rows.length, 0);
      await assert.rejects(db.query(`insert into public.${table} values('spoof','Spoof')`), /row-level security/);
    }
    await asUser('authenticated', author);
    assert.equal((await db.query('select * from public.consensus_documents')).rows.length, 2);
    assert.equal((await db.query("update public.consensus_documents set title='Author edit' where id='published' returning id")).rows.length, 1);
    await db.query(`insert into public.consensus_documents values('own','${author}',true,'Own')`);
    assert.equal((await db.query("update public.consensus_document_details set body='Author edit' returning id")).rows.length, 1);
    assert.equal((await db.query("update storage.objects set name='author.pdf' returning id")).rows.length, 1);
    await db.query(`insert into storage.objects values('own','consulta-consensos','${author}','own.pdf')`);
    await assert.rejects(db.query(`update public.consensus_documents set created_by='${other}' where id='own'`), /row-level security/);
    assert.equal((await db.query("delete from public.consensus_documents where id='own' returning id")).rows.length, 1);
    await asUser('authenticated', admin);
    assert.equal((await db.query('select public.can_manage_consulta_vet_editorial() as allowed')).rows[0].allowed, true);
    for (const table of tables) assert.equal((await db.query(`update public.${table} set body='Admin edit' returning id`)).rows.length, 1);
    assert.equal((await db.query("update public.consensus_documents set title='Admin edit' where id='draft' returning id")).rows.length, 1);
    await db.exec('reset role');
    assert.equal((await db.query('select * from public.consensus_documents')).rows.length, 2);
  } finally { await db.close(); }
});
