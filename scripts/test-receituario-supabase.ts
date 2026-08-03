import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { createReceituarioPdf } from '../modules/consulta-vet/utils/receituarioPdf';
import type { ReceituarioDocumentData } from '../modules/consulta-vet/types/receituario';

const url = process.env.SUPABASE_TEST_URL;
const anonKey = process.env.SUPABASE_TEST_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_TEST_SERVICE_ROLE_KEY;
const target = process.env.SUPABASE_TEST_TARGET || 'unspecified';

assert(url, 'SUPABASE_TEST_URL é obrigatório');
assert(anonKey, 'SUPABASE_TEST_ANON_KEY é obrigatório');
assert(serviceRoleKey, 'SUPABASE_TEST_SERVICE_ROLE_KEY é obrigatório');

const noSession = { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } } as const;
const admin = createClient(url, serviceRoleKey, noSession);
const anonymous = createClient(url, anonKey, noSession);
const run = `${Date.now()}-${randomUUID().slice(0, 8)}`;
const password = `Vetius!${randomUUID()}aA1`;
const emailA = `codex-receituario-a-${run}@example.invalid`;
const emailB = `codex-receituario-b-${run}@example.invalid`;
let userAId = '';
let userBId = '';
let globalTemplateId = `global-test-${run}`;
let personalTemplateId = '';
let documentId = '';
let signedPath = '';

function client(): SupabaseClient {
  return createClient(url!, anonKey!, noSession);
}

async function login(email: string): Promise<SupabaseClient> {
  const instance = client();
  const { error } = await instance.auth.signInWithPassword({ email, password });
  assert.equal(error, null, `login falhou: ${error?.message}`);
  return instance;
}

async function expectInvisible(query: PromiseLike<{ data: unknown[] | null; error: { message: string } | null }>, message: string) {
  const result = await query;
  assert(result.error || !result.data?.length, message);
}

const documentData: ReceituarioDocumentData = {
  title: 'Documento de integração',
  documentType: 'recipe',
  identification: { patientName: '', responsibleName: '', species: 'Cão', breed: '', sex: '', age: '', weightKg: '4' },
  header: { clinicName: 'Clínica de teste', veterinarianName: 'Profissional de teste', crmv: '00000', documentDate: '01/08/2026', location: '', time: '' },
  bodyPlainText: 'USO ORAL\n\nMedicamento de teste.\n\nRetornar para reavaliação.',
};

const checks: string[] = [];

try {
  const createdA = await admin.auth.admin.createUser({ email: emailA, password, email_confirm: true });
  const createdB = await admin.auth.admin.createUser({ email: emailB, password, email_confirm: true });
  assert.equal(createdA.error, null); assert.equal(createdB.error, null);
  userAId = createdA.data.user!.id; userBId = createdB.data.user!.id;
  const userA = await login(emailA);
  const userB = await login(emailB);
  checks.push('login de duas contas');

  const clinicResult = await userA.rpc('bootstrap_clinic', { clinic_name: `Clínica teste ${run}` });
  assert.equal(clinicResult.error, null);
  const clinicId = String(clinicResult.data.clinic_id);

  const globalInsert = await admin.from('document_templates').insert({
    id: globalTemplateId, title: 'Modelo global de teste', category: 'Cuidados gerais', document_type: 'recipe',
    species: 'ambos', body_plain_text: 'Conteúdo global', is_global: true, is_active: true,
  });
  assert.equal(globalInsert.error, null);

  const insertTemplate = await userA.from('document_templates').insert({
    clinic_id: clinicId, owner_user_id: userAId, title: 'Modelo pessoal de teste', category: 'Cuidados gerais',
    document_type: 'recipe', species: 'ambos', body_plain_text: 'Texto inicial', is_global: false, is_active: true,
  }).select().single();
  assert.equal(insertTemplate.error, null); personalTemplateId = insertTemplate.data.id;
  const updateTemplate = await userA.from('document_templates').update({ body_plain_text: 'Texto atualizado' }).eq('id', personalTemplateId).select();
  assert.equal(updateTemplate.data?.length, 1);
  await expectInvisible(userB.from('document_templates').select('id').eq('id', personalTemplateId), 'B visualizou modelo de A');
  await expectInvisible(userB.from('document_templates').update({ title: 'inválido' }).eq('id', personalTemplateId).select(), 'B alterou modelo de A');
  const globalRead = await userB.from('document_templates').select('id').eq('id', globalTemplateId);
  assert.equal(globalRead.data?.length, 1);
  await expectInvisible(userA.from('document_templates').update({ title: 'inválido' }).eq('id', globalTemplateId).select(), 'usuário comum alterou modelo global');
  await expectInvisible(anonymous.from('document_templates').select('id').eq('id', globalTemplateId), 'anônimo leu modelo global');
  checks.push('modelos pessoais e globais');

  assert.equal((await userA.from('template_favorites').insert({ user_id: userAId, template_id: globalTemplateId })).error, null);
  await expectInvisible(userB.from('template_favorites').select('*').eq('user_id', userAId), 'B visualizou favorito de A');
  assert.equal((await userA.from('template_favorites').delete().eq('user_id', userAId).eq('template_id', globalTemplateId)).error, null);
  checks.push('favoritar e remover favorito');

  assert.equal((await userA.from('receituario_drafts').upsert({ user_id: userAId, clinic_id: clinicId, template_id: '__integration__', draft_data: documentData }, { onConflict: 'user_id,template_id' })).error, null);
  const userASecondSession = await login(emailA);
  const draftSecondSession = await userASecondSession.from('receituario_drafts').select('draft_data').eq('template_id', '__integration__').single();
  assert.equal(draftSecondSession.error, null);
  await expectInvisible(userB.from('receituario_drafts').select('id').eq('user_id', userAId), 'B visualizou rascunho de A');
  checks.push('rascunho sincronizado em segunda sessão');

  const issued = await userA.from('generated_documents').insert({
    clinic_id: clinicId, template_id: personalTemplateId, title: documentData.title, document_type: 'recipe',
    body_plain_text: documentData.bodyPlainText, structured_data: documentData, status: 'issued', created_by: userAId,
  }).select().single();
  assert.equal(issued.error, null); documentId = issued.data.id;
  await expectInvisible(userB.from('generated_documents').select('id').eq('id', documentId), 'B visualizou documento de A');
  await expectInvisible(anonymous.from('generated_documents').select('id').eq('id', documentId), 'anônimo visualizou documento');

  await userA.auth.signOut();
  const userARelogin = await login(emailA);
  const recovered = await userARelogin.from('generated_documents').select('*').eq('id', documentId).single();
  assert.equal(recovered.error, null);
  const pdf = createReceituarioPdf(recovered.data.structured_data as ReceituarioDocumentData);
  const pdfBytes = pdf.output('arraybuffer');
  assert(pdfBytes.byteLength > 500, 'PDF recuperado ficou vazio');
  checks.push('documento persistido após logout e PDF regenerado');

  signedPath = `${clinicId}/${userAId}/${documentId}/${randomUUID()}-assinado.pdf`;
  const upload = await userARelogin.storage.from('receituario-signed-copies').upload(signedPath, new Uint8Array(pdfBytes), { contentType: 'application/pdf' });
  assert.equal(upload.error, null);
  const attach = await userARelogin.from('generated_documents').update({ signed_copy_storage_path: signedPath }).eq('id', documentId).select();
  assert.equal(attach.data?.length, 1);
  const signedA = await userARelogin.storage.from('receituario-signed-copies').createSignedUrl(signedPath, 60);
  assert.equal(signedA.error, null);
  const signedB = await userB.storage.from('receituario-signed-copies').createSignedUrl(signedPath, 60);
  assert(signedB.error, 'B gerou URL assinada para arquivo de A');
  checks.push('anexo privado e isolamento no Storage');

  const deleteTemplate = await userARelogin.from('document_templates').delete().eq('id', personalTemplateId).select();
  assert.equal(deleteTemplate.data?.length, 1); personalTemplateId = '';
  checks.push('exclusão do modelo pessoal');
} finally {
  if (signedPath && userAId) {
    const c = await login(emailA).catch(() => null);
    if (c) await c.storage.from('receituario-signed-copies').remove([signedPath]);
  }
  if (documentId) await admin.from('generated_documents').delete().eq('id', documentId);
  if (userAId) {
    await admin.from('receituario_drafts').delete().eq('user_id', userAId);
    await admin.from('template_favorites').delete().eq('user_id', userAId);
  }
  if (personalTemplateId) await admin.from('document_templates').delete().eq('id', personalTemplateId);
  await admin.from('document_templates').delete().eq('id', globalTemplateId);
  if (userAId) await admin.auth.admin.deleteUser(userAId);
  if (userBId) await admin.auth.admin.deleteUser(userBId);
}

console.log(JSON.stringify({ target, accounts: 2, checks, passed: checks.length, failed: 0 }, null, 2));
