import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { enteropatiaPerdedoraDeProteinasRecord } from '../../modules/consulta-vet/data/seed/diseases.enteropatia-perdedora-de-proteinas-caes-gatos.seed';
import { FULL_KEY_LABELS } from '../../modules/consulta-vet/utils/editorialSubsectionLabels';

const SLUG = 'enteropatia-perdedora-de-proteinas-caes-gatos';

function getRecord() {
  const fromSeed = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(fromSeed, 'Registro de enteropatia-perdedora-de-proteinas-caes-gatos deve existir em diseasesSeed');
  return fromSeed;
}

test('mantem ficha canonica unica e cartao publico sincronizado', () => {
  assert.equal(enteropatiaPerdedoraDeProteinasRecord.slug, SLUG);
  assert.equal(enteropatiaPerdedoraDeProteinasRecord.id, 'disease-enteropatia-perdedora-de-proteinas-caes-gatos');
  assert.ok(
    (CONSULTA_VET_PUBLIC_DISEASE_SLUGS as readonly string[]).includes(SLUG),
    'Slug deve estar listado em CONSULTA_VET_PUBLIC_DISEASE_SLUGS',
  );

  const cardStub = PUBLIC_CATALOG_DISEASE_CARD_STUBS.find((c) => c.slug === SLUG);
  assert.ok(cardStub, 'Card stub deve existir em PUBLIC_CATALOG_DISEASE_CARD_STUBS');
  assert.equal(cardStub.title, 'Enteropatia perdedora de proteínas em cães e gatos (PLE)');
  assert.deepEqual(cardStub.species, ['dog', 'cat']);
  assert.ok(cardStub.quickSummary.length > 150);
});

test('valida metadados, especies canina e felina e faixa de decisao rapida', () => {
  const record = getRecord();
  assert.deepEqual(record.species, ['dog', 'cat']);
  assert.equal(record.category, 'gastroenterologia');
  assert.ok(record.categories && record.categories.includes('clinica-medica'));
  assert.ok(record.categories && record.categories.includes('nutricao-clinica'));
  assert.ok(record.categories && record.categories.includes('hematologia-hemostasia'));
  assert.ok(record.categories && record.categories.includes('terapia-intensiva'));
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

  assert.match(rich.lead, /perda|prote|s[ií]ntese|hep[aá]t/i);
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

test('valida referencias cientificas estruturadas (ACVIM 2026, CURATIVE 2022, etc.)', () => {
  const record = getRecord();
  assert.ok(record.references && record.references.length >= 15, 'Deve conter ao menos 15 referencias robustas');

  const hasAcvim2026 = record.references.some((r) => r.year === 2026 && /ACVIM|Heilmann/i.test(r.title + r.authors));
  assert.ok(hasAcvim2026, 'Deve citar o consenso ACVIM 2026');

  const hasCurative = record.references.some((r) => r.year === 2022 && /CURATIVE|thromboprophylaxis/i.test(r.title));
  assert.ok(hasCurative, 'Deve citar o consenso CURATIVE 2022');

  const hasNelsonCouto = record.references.some((r) => /Nelson.*Couto/i.test(r.authors + r.title));
  assert.ok(hasNelsonCouto, 'Deve citar Nelson & Couto');

  const hasFluidElectrolyte = record.references.some((r) => /Fluid.*Electrolyte/i.test(r.title + r.journal));
  assert.ok(hasFluidElectrolyte, 'Deve citar o livro de Fluid, Electrolyte and Acid-Base Disorders');

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
  assert.ok(treat.modalidadesPrincipais && treat.modalidadesPrincipais.length >= 4);
  const drugNames = treat.modalidadesPrincipais.map((m) => m.drug);
  assert.ok(drugNames.some((d) => /Clopidogrel/i.test(d)), 'Deve incluir Clopidogrel');
  assert.ok(drugNames.some((d) => /Prednisolona/i.test(d)), 'Deve incluir Prednisolona');
  assert.ok(drugNames.some((d) => /Cianocobalamina/i.test(d)), 'Deve incluir Cianocobalamina');
  assert.ok(drugNames.some((d) => /Clorambucil/i.test(d)), 'Deve incluir Clorambucil');
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
    'diseases.enteropatia-perdedora-de-proteinas-caes-gatos.seed.ts',
  );
  const fileContent = fs.readFileSync(fileSeedPath, 'utf8');
  assert.ok(
    !fileContent.includes(doubleAsterisk),
    'O arquivo seed diseases.enteropatia-perdedora-de-proteinas-caes-gatos.seed.ts jamais deve conter asteriscos duplos',
  );
});
