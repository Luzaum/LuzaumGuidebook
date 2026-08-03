import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { searchPrescriptionCommercialProducts, searchPrescriptionCommercialProductsByName } from '../../modules/consulta-vet/services/receituarioCommercialCatalogService';

test('busca produtos do Receituário pelo nome comercial sem alterar o catálogo', async () => {
  const results = await searchPrescriptionCommercialProductsByName('cerenia');

  assert.ok(results.length > 0);
  assert.ok(results.every((item) => item.name.toLocaleLowerCase('pt-BR').includes('cerenia')));
  assert.ok(results.every((item) => item.id.startsWith('commercial:')));
  assert.ok(results.every((item) => item.metadata?.search_result_type === 'commercial'));
  assert.ok(results.some((item) => String(item.metadata?.active_ingredient || '').trim().length > 0));
  assert.ok(results.some((item) => String(item.metadata?.dosage_guidance?.labelDose || '').trim().length > 0));
  assert.ok(results.some((item) => Array.isArray(item.metadata?.dosage_guidance?.plumbs?.dog)));
  assert.ok(results.some((item) => String(item.metadata?.prescription_example || '').trim().length > 0));
});

test('busca de nome comercial ignora acentos e retorna todos os nomes correspondentes', async () => {
  const results = await searchPrescriptionCommercialProductsByName('alumimax');

  assert.ok(results.length > 0);
  assert.ok(results.every((item) => item.name.toLocaleLowerCase('pt-BR').includes('alumimax')));
});

test('produto comercial preserva instrução de bula e contexto do Plumb’s', async () => {
  const [cloresten] = await searchPrescriptionCommercialProductsByName('Cloresten Shampoo');

  assert.ok(String(cloresten?.metadata?.label_directions || '').trim());
  assert.ok(String(cloresten?.metadata?.plumbs_context || '').trim());
});

test('Receituário permite importar o exemplo pronto do produto comercial', async () => {
  const composer = await readFile(new URL('../../modules/consulta-vet/components/receituario/PrescriptionMedicationComposer.tsx', import.meta.url), 'utf8');

  assert.match(composer, /Como pode ficar na receita/);
  assert.match(composer, /Importar para a receita/);
  assert.match(composer, /productHeading/);
  assert.match(composer, /onInsert\(`\$\{productHeading\}\\n\$\{commercialPrescriptionExample\.trim\(\)\}`/);
});

test('permite descobrir produtos comerciais por categoria e subcategoria', async () => {
  const results = await searchPrescriptionCommercialProducts({
    commercialClass: 'gastrointestinal',
    commercialSubclass: 'gi_antiemetic',
    species: 'dog',
  });

  assert.ok(results.length > 0);
  assert.ok(results.every((item) => Array.isArray(item.metadata?.commercial_subclasses)));
  assert.ok(results.every((item) => (item.metadata?.commercial_subclasses as string[]).includes('gi_antiemetic')));
  assert.ok(results.every((item) => (item.metadata?.species as string[]).includes('dog')));
});
