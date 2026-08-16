import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import type { MedicationPresentationRecord, MedicationSearchResult } from '../../src/lib/clinicRecords';
import { buildCatalogPresentationCommercialResults, commercialBrandName, searchPrescriptionCommercialProducts, searchPrescriptionCommercialProductsByName } from '../../modules/consulta-vet/services/receituarioCommercialCatalogService';

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

test('busca tolera um pequeno erro no princípio ativo e encontra a marca relacionada', async () => {
  const results = await searchPrescriptionCommercialProductsByName('pimobendam');

  assert.ok(results.some((item) => item.name === 'Vetmedin'));
  assert.ok(results.some((item) => item.name === 'Cardisure'));
  assert.ok(results.some((item) => String(item.metadata?.active_ingredient || '').includes('pimobendan')));
});

test('mantém produto relacionado visível mesmo quando a bula não inclui a espécie selecionada', async () => {
  const results = await searchPrescriptionCommercialProducts({ query: 'pimobendan', species: 'cat' });

  assert.ok(results.some((item) => item.name === 'Vetmedin'));
  assert.deepEqual(results.find((item) => item.name === 'Vetmedin')?.metadata?.species, ['dog']);
});

test('expõe todas as marcas existentes nas apresentações do princípio ativo', () => {
  const medication: MedicationSearchResult = {
    id: 'global:pimobendan',
    name: 'Pimobendan',
    is_controlled: false,
    is_private: false,
    source: 'global',
    scope: 'global',
    metadata: { active_ingredient: 'Pimobendan', species: ['dog', 'cat'], routes: ['VO'] },
  };
  const presentation = (id: string, commercialName: string, concentration: string): MedicationPresentationRecord => ({
    id,
    clinic_id: '',
    medication_id: medication.id,
    pharmaceutical_form: 'Comprimido',
    concentration_text: concentration,
    additional_component: null,
    presentation_unit: 'comprimido',
    commercial_name: commercialName,
    value: Number.parseFloat(concentration),
    value_unit: 'mg',
    per_value: 1,
    per_unit: 'comprimido',
    avg_price_brl: null,
    pharmacy_veterinary: true,
    pharmacy_human: false,
    pharmacy_compounding: false,
    metadata: {},
    created_at: '',
  });

  const results = buildCatalogPresentationCommercialResults(medication, [
    presentation('vetmedin-125', 'Vetmedin', '1,25 mg/comprimido'),
    presentation('cardisure-125', 'Cardisure', '1,25 mg/comprimido'),
    presentation('cardisure-5', 'Cardisure', '5 mg/comprimido'),
    presentation('cardisure-10', 'Cardisure', '10 mg/comprimido'),
  ]);

  assert.deepEqual(results.map((item) => item.name), ['Cardisure', 'Vetmedin']);
  const cardisure = results.find((item) => item.name === 'Cardisure');
  assert.equal(cardisure?.metadata?.catalog_medication_id, medication.id);
  assert.equal((cardisure?.metadata?.presentation_labels as string[]).length, 3);
});

test('agrupa concentrações gravadas junto do nome em uma única marca comercial', () => {
  const medication: MedicationSearchResult = {
    id: 'global:pimobendan',
    name: 'Pimobendan',
    is_controlled: false,
    is_private: false,
    source: 'global',
    scope: 'global',
    metadata: { active_ingredient: 'Pimobendan', species: ['dog'], routes: ['VO'] },
  };
  const presentation = (id: string, commercialName: string, concentration: string): MedicationPresentationRecord => ({
    id,
    clinic_id: '',
    medication_id: medication.id,
    pharmaceutical_form: 'Comprimido',
    concentration_text: concentration,
    additional_component: null,
    presentation_unit: 'comprimido',
    commercial_name: commercialName,
    value: Number.parseFloat(concentration),
    value_unit: 'mg',
    per_value: 1,
    per_unit: 'comprimido',
    avg_price_brl: null,
    pharmacy_veterinary: true,
    pharmacy_human: false,
    pharmacy_compounding: false,
    metadata: {},
    created_at: '',
  });

  const results = buildCatalogPresentationCommercialResults(medication, [
    presentation('cardisure-125', 'Cardisure 1,25 mg', '1,25 mg/comprimido'),
    presentation('cardisure-5', 'Cardisure 5 mg', '5 mg/comprimido'),
    presentation('cardisure-10', 'Cardisure 10 mg', '10 mg/comprimido'),
  ]);

  assert.equal(commercialBrandName('Cardisure 1,25 mg'), 'Cardisure');
  assert.deepEqual(results.map((item) => item.name), ['Cardisure']);
  assert.equal((results[0]?.metadata?.presentation_labels as string[]).length, 3);
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
