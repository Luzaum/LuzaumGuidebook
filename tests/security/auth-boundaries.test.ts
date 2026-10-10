import assert from 'node:assert/strict';
import test from 'node:test';
import { normalizeInternalRedirect } from '../../src/lib/internalRedirect';
import { canDeleteGlobalProtocol, hasTrustedGlobalPermission } from '../../supabase/functions/_shared/globalProtocolAuthorization';

test('retornos de login preservam rotas, consultas e fragmentos internos', () => {
  for (const path of ['/app', '/consulta-vet/medicamentos?busca=cão#dose', '/app?query=https%3A%2F%2Fexample.com']) {
    assert.equal(normalizeInternalRedirect(path), path);
  }
});

test('retornos externos, escapes e sequências percentuais inválidas são bloqueados sem exceção', () => {
  for (const path of ['https://example.com', '//example.com', '/\\example.com', '/%2f%2fexample.com', '/%5cexample.com', '/%00', '/%', '/%E0%A4%A', '\n//example.com']) {
    assert.equal(normalizeInternalRedirect(path, '/hub'), '/hub', path);
  }
});

test('metadados editáveis não concedem publicação nem exclusão global', () => {
  const user = { id: 'attacker', user_metadata: { role: 'admin', is_admin: true, global_protocol_publisher: true } };
  assert.equal(hasTrustedGlobalPermission(user), false);
  assert.equal(canDeleteGlobalProtocol({ user, publishedByUserId: 'other' }), false);
});

test('autores, gestores da clínica de origem e administradores confiáveis mantêm seus direitos', () => {
  const user = { id: 'author' };
  assert.equal(canDeleteGlobalProtocol({ user, publishedByUserId: 'author' }), true);
  assert.equal(canDeleteGlobalProtocol({ user, sourceClinicRole: 'owner' }), true);
  assert.equal(canDeleteGlobalProtocol({ user, sourceClinicRole: 'admin' }), true);
  assert.equal(canDeleteGlobalProtocol({ user, sourceClinicRole: 'member', publishedByUserId: 'other' }), false);
  assert.equal(hasTrustedGlobalPermission({ ...user, app_metadata: { is_admin: true } }), true);
  assert.equal(hasTrustedGlobalPermission(user, ['author']), true);
});

test('lista de emails exige confirmação do endereço pelo serviço de autenticação', () => {
  const user = { id: 'user', email: 'admin@example.com' };
  assert.equal(hasTrustedGlobalPermission(user, [], ['admin@example.com']), false);
  assert.equal(hasTrustedGlobalPermission({ ...user, email_confirmed_at: '2026-10-09T00:00:00Z' }, [], ['admin@example.com']), true);
});
