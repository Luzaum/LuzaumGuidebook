import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('modelo pessoal existente é atualizado sem criar duplicata', async () => {
  const service = await readFile(new URL('../../modules/consulta-vet/services/receituarioService.ts', import.meta.url), 'utf8');
  const editor = await readFile(new URL('../../modules/consulta-vet/components/receituario/ReceituarioEditorModal.tsx', import.meta.url), 'utf8');

  assert.match(service, /input\.templateId[\s\S]*\.update\(/);
  assert.match(service, /\.eq\('id', input\.templateId\)/);
  assert.match(service, /\.eq\('owner_user_id', owner\)/);
  assert.match(service, /\.eq\('is_global', false\)/);
  assert.match(editor, /templateId: savedPersonalTemplateId/);
  assert.match(editor, /template && !template\.is_global \? template\.id : null/);
});

test('seletor de doses mostra indicação e dose sem o rótulo Cadastro da clínica', async () => {
  const composer = await readFile(new URL('../../modules/consulta-vet/components/receituario/PrescriptionMedicationComposer.tsx', import.meta.url), 'utf8');
  const optionLine = composer.split('\n').find((line) => line.includes('compatibleDoses.map((dose) => <option')) || '';

  assert.match(optionLine, /dose\.indication/);
  assert.match(optionLine, /dose\.dose_value/);
  assert.doesNotMatch(optionLine, /source\.label|Cadastro da clínica/);
});

test('modo de edição exclui vários modelos próprios sem atingir modelos globais', async () => {
  const service = await readFile(new URL('../../modules/consulta-vet/services/receituarioService.ts', import.meta.url), 'utf8');
  const recipes = await readFile(new URL('../../modules/consulta-vet/components/receituario/ReceitasTab.tsx', import.meta.url), 'utf8');

  assert.match(service, /deleteCustomTemplates\(templateIds/);
  assert.match(service, /\.in\('id', ids\)\.eq\('owner_user_id', owner\)\.eq\('is_global', false\)/);
  assert.match(recipes, /Editar modelos/);
  assert.match(recipes, /Selecionar visíveis/);
  assert.match(recipes, /Modelos globais ficam protegidos/);
  assert.match(recipes, /Receitas já emitidas permanecem preservadas/);
});
