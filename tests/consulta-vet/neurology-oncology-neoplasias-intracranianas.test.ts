import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { neoplasiasIntracranianasCaesRecord } from '../../modules/consulta-vet/data/seed/diseases.neoplasias-intracranianas-caes.seed';
import { FULL_KEY_LABELS } from '../../modules/consulta-vet/utils/editorialSubsectionLabels';

const SLUG = 'neoplasias-intracranianas-caes';

function getRecord() {
  const fromSeed = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(fromSeed, 'Registro de neoplasias-intracranianas-caes deve existir em diseasesSeed');
  return fromSeed;
}

test('mantem ficha canonica unica e cartao publico sincronizado', () => {
  assert.equal(neoplasiasIntracranianasCaesRecord.slug, SLUG);
  assert.equal(neoplasiasIntracranianasCaesRecord.id, 'disease-neoplasias-intracranianas-caes');
  assert.ok(
    (CONSULTA_VET_PUBLIC_DISEASE_SLUGS as readonly string[]).includes(SLUG),
    'Slug deve estar listado em CONSULTA_VET_PUBLIC_DISEASE_SLUGS',
  );

  const cardStub = PUBLIC_CATALOG_DISEASE_CARD_STUBS.find((c) => c.slug === SLUG);
  assert.ok(cardStub, 'Card stub deve existir em PUBLIC_CATALOG_DISEASE_CARD_STUBS');
  assert.equal(cardStub.title, 'Neoplasias intracranianas em cães (tumores encefálicos)');
  assert.deepEqual(cardStub.species, ['dog']);
  assert.ok(cardStub.quickSummary.length > 150);
});

test('valida metadados, especie canina, categorias e faixa de decisao rapida', () => {
  const record = getRecord();
  assert.deepEqual(record.species, ['dog']);
  assert.equal(record.category, 'neurologia');
  assert.ok(record.categories && record.categories.includes('oncologia'));
  assert.ok(record.categories && record.categories.includes('urgencia-emergencia'));
  assert.ok(record.categories && record.categories.includes('diagnostico-por-imagem'));
  assert.ok(record.categories && record.categories.includes('clinica-medica'));
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

  assert.match(rich.lead, /neoplasia|intracraniana|tumor|enc[eé]falo|monro-kellie/i);
  assert.ok(rich.pillars && rich.pillars.length >= 4, 'Deveria ter ao menos 4 pilares conceituais');

  assert.ok(rich.diagnosticFlow, 'diagnosticFlow deve existir');
  assert.ok(rich.diagnosticFlow.steps && rich.diagnosticFlow.steps.length >= 5, 'Deveria ter ao menos 5 passos diagnosticos');

  assert.ok(rich.treatmentFlow, 'treatmentFlow deve existir');
  assert.ok(rich.treatmentFlow.steps && rich.treatmentFlow.steps.length >= 5, 'Deveria ter ao menos 5 passos terapeuticos');
});

test('valida presenca das quatro tabelas clinicas integradas', () => {
  const record = getRecord();
  
  const etio = record.etiology as { tabelaClassificacaoTopograficaEOrigem?: { kind: string; rows: unknown[][] } };
  assert.ok(etio.tabelaClassificacaoTopograficaEOrigem, 'Tabela 1 deve existir em etiology');
  assert.equal(etio.tabelaClassificacaoTopograficaEOrigem.kind, 'clinicalTable');
  assert.ok(etio.tabelaClassificacaoTopograficaEOrigem.rows.length >= 6);

  const signs = record.clinicalSignsPathophysiology as { tabelaNeurolocalizacaoClinica?: { kind: string; rows: unknown[][] } };
  assert.ok(signs.tabelaNeurolocalizacaoClinica, 'Tabela 2 deve existir em clinicalSignsPathophysiology');
  assert.equal(signs.tabelaNeurolocalizacaoClinica.kind, 'clinicalTable');
  assert.ok(signs.tabelaNeurolocalizacaoClinica.rows.length >= 5);

  const diag = record.diagnosis as { tabelaDiagnosticoDiferencialEstrutural?: { kind: string; rows: unknown[][] } };
  assert.ok(diag.tabelaDiagnosticoDiferencialEstrutural, 'Tabela 3 deve existir em diagnosis');
  assert.equal(diag.tabelaDiagnosticoDiferencialEstrutural.kind, 'clinicalTable');
  assert.ok(diag.tabelaDiagnosticoDiferencialEstrutural.rows.length >= 4);

  const treat = record.treatment as { tabelaModalidadesTerapeuticasESobrevida?: { kind: string; rows: unknown[][] } };
  assert.ok(treat.tabelaModalidadesTerapeuticasESobrevida, 'Tabela 4 deve existir em treatment');
  assert.equal(treat.tabelaModalidadesTerapeuticasESobrevida.kind, 'clinicalTable');
  assert.ok(treat.tabelaModalidadesTerapeuticasESobrevida.rows.length >= 5);
});

test('valida linguagem simples para tutores e pontos chave', () => {
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

test('valida referencias cientificas contemporaneas (Geiger 2025, Rossmeisl 2026, Fukuyama 2025, etc.)', () => {
  const record = getRecord();
  assert.ok(record.references && record.references.length >= 10, 'Deve conter ao menos 10 referencias robustas');

  const hasGeiger2025 = record.references.some((r) => r.year === 2025 && /Geiger.*285|meningioma.*285/i.test(r.title + r.notes + r.authors));
  assert.ok(hasGeiger2025, 'Deve citar Geiger et al. 2025 (SRT em meningiomas, n=285)');

  const hasRossmeisl2026 = record.references.some((r) => r.year === 2026 && /Rossmeisl.*Gross total|GTR.*Rossmeisl|41 dogs/i.test(r.title + r.notes + r.authors));
  assert.ok(hasRossmeisl2026, 'Deve citar Rossmeisl et al. 2026 (GTR vs STR em meningiomas)');

  const hasFukuyama2025 = record.references.some(
    (r) => r.year === 2025 && /Fukuyama/i.test(r.authors) && /glioma/i.test(r.title + r.notes),
  );
  assert.ok(hasFukuyama2025, 'Deve citar Fukuyama et al. 2025 (IMRT em gliomas)');

  const hasCbtc2026 = record.references.some((r) => /Comparative Brain Tumor Consortium|CBTC/i.test(r.title + r.authors + r.notes));
  assert.ok(hasCbtc2026, 'Deve citar o consenso do CBTC / NCI');

  const hasHu2015 = record.references.some((r) => /Hu.*lomustine|CCNU.*Hu/i.test(r.title + r.authors));
  assert.ok(hasHu2015, 'Deve citar Hu et al. 2015 (CCNU / lomustina)');

  const hasWithrow = record.references.some((r) => /Withrow/i.test(r.title + r.journal));
  assert.ok(hasWithrow, 'Deve citar Withrow & MacEwen');

  const hasNelsonCouto = record.references.some((r) => /Nelson.*Couto/i.test(r.authors + r.title));
  assert.ok(hasNelsonCouto, 'Deve citar Nelson & Couto');

  const hasPlumb = record.references.some((r) => /Plumb/i.test(r.title + r.journal + r.authors));
  assert.ok(hasPlumb, 'Deve citar Plumb');

  for (const ref of record.references) {
    assert.ok(ref.authors, 'Referencia deve conter autores');
    assert.ok(ref.title, 'Referencia deve conter titulo');
    assert.ok(ref.journal, 'Referencia deve conter revista/fonte');
    assert.ok(ref.year > 2000, 'Ano deve ser contemporaneo');
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
  const goldStandards = diag.passosDiagnosticos.filter((p) => p.isGoldStandard);
  assert.ok(goldStandards.length >= 1, 'Deve conter passos considerados padrao-ouro');

  const treat = record.treatment as { modalidadesPrincipais?: Array<{ drug: string; dose: string }> };
  assert.ok(treat.modalidadesPrincipais && treat.modalidadesPrincipais.length >= 5);
  const drugNames = treat.modalidadesPrincipais.map((m) => m.drug);
  assert.ok(drugNames.some((d) => /Levetiracetam/i.test(d)), 'Deve incluir Levetiracetam');
  assert.ok(drugNames.some((d) => /Prednisona|Prednisolona/i.test(d)), 'Deve incluir Prednisona');
  assert.ok(drugNames.some((d) => /Manitol/i.test(d)), 'Deve incluir Manitol');
  assert.ok(drugNames.some((d) => /Hipert[oô]nico/i.test(d)), 'Deve incluir Cloreto de Sódio Hipertônico');
  assert.ok(drugNames.some((d) => /Fenobarbital/i.test(d)), 'Deve incluir Fenobarbital');
});

test('valida ausencia absoluta de asteriscos duplos em todo o registro e arquivos editados', () => {
  const record = getRecord();
  const doubleAsterisk = String.fromCharCode(42) + String.fromCharCode(42);
  const recordStr = JSON.stringify(record);
  assert.ok(
    !recordStr.includes(doubleAsterisk),
    'O registro JSON canonico jamais deve conter asteriscos duplos',
  );

  const plainLanguageEntry = DISEASE_PLAIN_LANGUAGE[SLUG];
  assert.ok(
    !JSON.stringify(plainLanguageEntry).includes(doubleAsterisk),
    'A entrada de plainLanguage jamais deve conter asteriscos duplos',
  );

  const cardStub = PUBLIC_CATALOG_DISEASE_CARD_STUBS.find((c) => c.slug === SLUG);
  assert.ok(
    !JSON.stringify(cardStub).includes(doubleAsterisk),
    'O card stub da doenca jamais deve conter asteriscos duplos',
  );

  const fileSeedPath = path.join(
    process.cwd(),
    'modules',
    'consulta-vet',
    'data',
    'seed',
    'diseases.neoplasias-intracranianas-caes.seed.ts',
  );
  const fileContent = fs.readFileSync(fileSeedPath, 'utf8');
  assert.ok(
    !fileContent.includes(doubleAsterisk),
    'O arquivo seed diseases.neoplasias-intracranianas-caes.seed.ts jamais deve conter asteriscos duplos',
  );
});
