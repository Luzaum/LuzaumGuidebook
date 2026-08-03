import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const editorPath = new URL('../../modules/consulta-vet/components/receituario/ReceituarioEditorModal.tsx', import.meta.url);

test('nome do profissional usa o prefixo M.V.', async () => {
  const source = await readFile(editorPath, 'utf8');
  assert.match(source, /`M\.V\. \$\{profile\.name\}`/);
  assert.doesNotMatch(source, /`Dr\(a\)\. \$\{profile\.name\}`/);
});

test('A PREENCHER é destacado e selecionado integralmente ao clicar', async () => {
  const source = await readFile(editorPath, 'utf8');
  assert.match(source, /<mark/);
  assert.match(source, /textarea\.setSelectionRange\(start, end\)/);
  assert.match(source, /setActiveRange\(\{ start, end \}\)/);
});

test('lacunas importadas de medicamentos são convertidas antes de entrar no editor', async () => {
  const source = await readFile(editorPath, 'utf8');
  assert.match(source, /const editableBlock = sanitizeIssuedText\(block\)/);
  assert.match(source, /insertMedicationIntoPrescriptionText\(current, editableBlock\)/);
});
