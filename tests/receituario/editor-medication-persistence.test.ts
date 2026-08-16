import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const editorPath = new URL('../../modules/consulta-vet/components/receituario/ReceituarioEditorModal.tsx', import.meta.url);
const composerPath = new URL('../../modules/consulta-vet/components/receituario/PrescriptionMedicationComposer.tsx', import.meta.url);

test('editor não reinicializa o corpo enquanto a mesma sessão permanece aberta', async () => {
  const source = await readFile(editorPath, 'utf8');

  assert.match(source, /editorInitializedRef\.current/);
  assert.match(source, /if \(editorInitializedRef\.current\) return/);
});

test('regeneração do modelo clínico preserva medicamentos adicionados', async () => {
  const source = await readFile(editorPath, 'utf8');

  assert.match(source, /prescriptionItemsRef\.current\.reduce/);
  assert.match(source, /insertMedicationIntoPrescriptionText\(current, item\.rawBlockText\)/);
  assert.match(source, /onBodyChange=\{handleClinicalBodyChange\}/);
});

test('medicamento adicionado possui edição direta do texto', async () => {
  const source = await readFile(composerPath, 'utf8');

  assert.match(source, /Texto deste medicamento na receita/);
  assert.match(source, /Salvar alteração no medicamento/);
  assert.match(source, /setRawBlockEdit\(editingSnapshot\.rawBlockText \|\| ''\)/);
});
