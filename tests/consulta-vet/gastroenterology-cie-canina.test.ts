import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { enteropatiaInflamatoriaCronicaCaninaRecord } from '../../modules/consulta-vet/data/seed/diseases.enteropatia-inflamatoria-cronica-canina.seed';
import { FULL_KEY_LABELS } from '../../modules/consulta-vet/utils/editorialSubsectionLabels';

const SLUG = 'enteropatia-inflamatoria-cronica-canina';

function getRecord() {
  const fromSeed = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(fromSeed, 'Registro de enteropatia-inflamatoria-cronica-canina deve existir em diseasesSeed');
  return fromSeed;
}

test('mantem ficha canonica unica e cartao publico sincronizado', () => {
  assert.equal(enteropatiaInflamatoriaCronicaCaninaRecord.slug, SLUG);
  assert.equal(enteropatiaInflamatoriaCronicaCaninaRecord.id, 'disease-enteropatia-inflamatoria-cronica-canina');
  assert.ok(
    (CONSULTA_VET_PUBLIC_DISEASE_SLUGS as readonly string[]).includes(SLUG),
    'Slug deve estar listado em CONSULTA_VET_PUBLIC_DISEASE_SLUGS',
  );

  const cardStub = PUBLIC_CATALOG_DISEASE_CARD_STUBS.find((c) => c.slug === SLUG);
  assert.ok(cardStub, 'Card stub deve existir em PUBLIC_CATALOG_DISEASE_CARD_STUBS');
  assert.equal(cardStub.title, 'Enteropatias inflamatórias crônicas em cães (CIE / antiga IBD)');
  assert.deepEqual(cardStub.species, ['dog']);
  assert.ok(cardStub.quickSummary.length > 150);
});

test('valida metadados, especie canina e faixa de decisao rapida', () => {
  const record = getRecord();
  assert.deepEqual(record.species, ['dog']);
  assert.equal(record.category, 'gastroenterologia');
  assert.ok(record.categories && record.categories.includes('clinica-medica'));
  assert.ok(record.categories && record.categories.includes('nutricao-clinica'));
  assert.ok(record.categories && record.categories.includes('imunologia'));
  assert.ok(record.categories && record.categories.includes('farmacologia-terapeutica'));
  assert.equal(record.isPublished, true);
  assert.ok(record.quickDecisionStrip.length >= 8);
  for (const item of record.quickDecisionStrip) {
    assert.ok(item.length >= 25);
  }
});

test('valida pilares conceituais e fluxos estruturados do resumo rico', () => {
  const record = getRecord();
  assert.ok(record.quickSummaryRich, 'quickSummaryRich deve existir');
  const rich = record.quickSummaryRich;

  assert.match(rich.lead, /enteropatia|inflamat[oó]ria|cr[oô]nica|dieta|nutri/i);
  assert.ok(rich.pillars && rich.pillars.length >= 4, 'Deveria ter ao menos 4 pilares conceituais');

  assert.ok(rich.diagnosticFlow, 'diagnosticFlow deve existir');
  assert.ok(rich.diagnosticFlow.steps && rich.diagnosticFlow.steps.length >= 5, 'Deveria ter ao menos 5 passos diagnosticos');

  assert.ok(rich.treatmentFlow, 'treatmentFlow deve existir');
  assert.ok(rich.treatmentFlow.steps && rich.treatmentFlow.steps.length >= 5, 'Deveria ter ao menos 5 passos terapeuticos');
});

test('valida linguagem simples para tutores e triagem rapida', () => {
  const record = getRecord();
  assert.ok(record.plainLanguage, 'plainLanguage deve estar preenchido');
  const plain = record.plainLanguage;

  assert.ok(plain.whatIsIt.length > 100);
  assert.ok(plain.keyPoints.length >= 6);
  assert.ok(plain.whatIs && plain.whatIs.length > 30);
  assert.ok(plain.warningSigns && plain.warningSigns.length > 50);
  assert.ok(plain.diagnosis && plain.diagnosis.length > 50);
  assert.ok(plain.homeCare && plain.homeCare.length > 50);

  const registeredPlain = DISEASE_PLAIN_LANGUAGE[SLUG];
  assert.ok(registeredPlain, 'Linguagem simples deve estar registrada em DISEASE_PLAIN_LANGUAGE');
  assert.equal(registeredPlain.keyPoints.length, plain.keyPoints.length);
});

test('valida referencias cientificas estruturadas (ACVIM 2026, Dor 2024, Caulfield 2026, etc.)', () => {
  const record = getRecord();
  assert.ok(record.references && record.references.length >= 10, 'Deve conter ao menos 10 referencias robustas');

  const hasAcvim2026 = record.references.some((r) => r.year === 2026 && /ACVIM|Heilmann/i.test(r.title + r.authors));
  assert.ok(hasAcvim2026, 'Deve citar o consenso ACVIM 2026');

  const hasDor2024 = record.references.some((r) => r.year === 2024 && /Dor|cyanocobalamin|cobalamin/i.test(r.title + r.authors));
  assert.ok(hasDor2024, 'Deve citar o RCT de Dor et al. 2024');

  const hasCaulfield2026 = record.references.some((r) => r.year === 2026 && /Caulfield/i.test(r.authors));
  assert.ok(hasCaulfield2026, 'Deve citar Caulfield et al. 2026');

  const hasNelsonCouto = record.references.some((r) => /Nelson.*Couto/i.test(r.authors + r.title));
  assert.ok(hasNelsonCouto, 'Deve citar Nelson & Couto');

  const hasPlumb = record.references.some((r) => /Plumb/i.test(r.title + r.journal + r.authors));
  assert.ok(hasPlumb, 'Deve citar Plumb');

  for (const ref of record.references) {
    assert.ok(ref.authors, 'Referencia deve conter autores');
    assert.ok(ref.title, 'Referencia deve conter titulo');
    assert.ok(ref.journal, 'Referencia deve conter revista/fonte');
    assert.ok(ref.year > 1990, 'Ano deve ser contemporaneo');
  }
});

test('valida mapeamento completo de rotulos editoriais de subsecoes', () => {
  const record = getRecord();
  const sectionsToCheck = [
    record.etiology,
    record.epidemiology,
    record.pathogenesisTransmission,
    record.pathophysiology,
    record.clinicalSignsPathophysiology,
    record.diagnosis,
    record.treatment,
    record.complications,
    record.prevention,
  ];

  for (const section of sectionsToCheck) {
    if (!section || typeof section !== 'object') continue;
    for (const key of Object.keys(section)) {
      assert.ok(
        key in FULL_KEY_LABELS,
        `Chave de subsecao "${key}" deve estar mapeada em editorialSubsectionLabels.ts`,
      );
      const label = FULL_KEY_LABELS[key];
      assert.ok(label && label.length > 0, `Rotulo para chave "${key}" nao pode ser vazio`);
    }
  }
});

test('valida passos diagnosticos e modalidades terapeuticas estruturadas', () => {
  const record = getRecord();
  const diag = record.diagnosis as { passosDiagnosticos?: Array<{ stepNumber: number; isGoldStandard: boolean; title: string }> };
  assert.ok(diag.passosDiagnosticos && diag.passosDiagnosticos.length >= 8);
  const goldStandard = diag.passosDiagnosticos.find((p) => p.isGoldStandard);
  assert.ok(goldStandard, 'Deve conter ao menos um passo considerado padrao-ouro');

  const treat = record.treatment as { modalidadesPrincipais?: Array<{ drug: string; dose: string }> };
  assert.ok(treat.modalidadesPrincipais && treat.modalidadesPrincipais.length >= 5);
  const drugNames = treat.modalidadesPrincipais.map((m) => m.drug);
  assert.ok(drugNames.some((d) => /Cianocobalamina/i.test(d)), 'Deve incluir Cianocobalamina');
  assert.ok(drugNames.some((d) => /Prednisolona/i.test(d)), 'Deve incluir Prednisolona');
  assert.ok(drugNames.some((d) => /Budesonida/i.test(d)), 'Deve incluir Budesonida');
  assert.ok(drugNames.some((d) => /Ciclosporina/i.test(d)), 'Deve incluir Ciclosporina');
  assert.ok(drugNames.some((d) => /Clorambucil/i.test(d)), 'Deve incluir Clorambucil');
  assert.ok(drugNames.some((d) => /Enrofloxacina/i.test(d)), 'Deve incluir Enrofloxacina');
});

test('valida ausencia absoluta de asteriscos duplos em todo o registro e arquivo seed', () => {
  const record = getRecord();
  const doubleAsterisk = String.fromCharCode(42) + String.fromCharCode(42);
  const recordStr = JSON.stringify(record);
  assert.ok(
    !recordStr.includes(doubleAsterisk),
    'O registro JSON canonico jamais deve conter asteriscos duplos',
  );

  const fileSeedPath = path.join(
    process.cwd(),
    'modules',
    'consulta-vet',
    'data',
    'seed',
    'diseases.enteropatia-inflamatoria-cronica-canina.seed.ts',
  );
  const fileContent = fs.readFileSync(fileSeedPath, 'utf8');
  assert.ok(
    !fileContent.includes(doubleAsterisk),
    'O arquivo seed diseases.enteropatia-inflamatoria-cronica-canina.seed.ts jamais deve conter asteriscos duplos',
  );
});
