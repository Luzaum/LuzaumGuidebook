import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { doencaRenalCronicaCaninaRecord } from '../../modules/consulta-vet/data/seed/diseases.doenca-renal-cronica-canina.seed';
import { FULL_KEY_LABELS } from '../../modules/consulta-vet/utils/editorialSubsectionLabels';

const SLUG = 'doenca-renal-cronica-canina';
const LEGACY_SLUG = 'doenca-renal-cronica-caes-gatos';

function getRecord() {
  const fromSeed = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(fromSeed, 'Registro de doenca-renal-cronica-canina deve existir em diseasesSeed');
  return fromSeed;
}

test('mantem ficha canonica unica e cartao publico sincronizado', () => {
  assert.equal(doencaRenalCronicaCaninaRecord.slug, SLUG);
  assert.equal(doencaRenalCronicaCaninaRecord.id, 'disease-doenca-renal-cronica-canina');
  assert.ok(
    (CONSULTA_VET_PUBLIC_DISEASE_SLUGS as readonly string[]).includes(SLUG),
    'Slug deve estar listado em CONSULTA_VET_PUBLIC_DISEASE_SLUGS',
  );

  const cardStub = PUBLIC_CATALOG_DISEASE_CARD_STUBS.find((c) => c.slug === SLUG);
  assert.ok(cardStub, 'Card stub deve existir em PUBLIC_CATALOG_DISEASE_CARD_STUBS');
  assert.equal(cardStub.title, 'Doença renal crônica em cães (DRC canina)');
  assert.deepEqual(cardStub.species, ['dog']);
  assert.ok(cardStub.quickSummary.length > 150);
});

test('assegura remocao completa das referencias antigas de drc e arquivo legado', () => {
  assert.ok(
    !(CONSULTA_VET_PUBLIC_DISEASE_SLUGS as readonly string[]).includes(LEGACY_SLUG),
    'Slug legado nao pode estar no catalogo publico',
  );

  const legacyStub = PUBLIC_CATALOG_DISEASE_CARD_STUBS.find((c) => c.slug === LEGACY_SLUG);
  assert.equal(legacyStub, undefined, 'Stub legado nao pode existir no array');

  const legacySeedPath = path.join(
    process.cwd(),
    'modules',
    'consulta-vet',
    'data',
    'seed',
    'diseases.drc.seed.ts',
  );
  assert.equal(
    fs.existsSync(legacySeedPath),
    false,
    'O arquivo legado diseases.drc.seed.ts deve estar fisicamente removido',
  );

  const legacyInSeed = diseasesSeed.find((d) => d.slug === LEGACY_SLUG);
  assert.equal(legacyInSeed, undefined, 'Ficha legada nao pode existir no diseasesSeed');
});

test('valida metadados, especie canina e faixa de decisao rapida', () => {
  const record = getRecord();
  assert.deepEqual(record.species, ['dog']);
  assert.equal(record.category, 'nefrologia-urologia');
  assert.ok(record.categories && record.categories.includes('nefrologia-urologia'));
  assert.ok(record.categories && record.categories.includes('clinica-medica'));
  assert.ok(record.categories && record.categories.includes('nutricao-clinica'));
  assert.ok(record.categories && record.categories.includes('farmacologia-terapeutica'));
  assert.ok(record.categories && record.categories.includes('diagnostico-por-imagem'));
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

  assert.match(rich.lead, /doen[çc]a renal cr[oô]nica|iris 2026|telmisartana/i);
  assert.ok(rich.pillars && rich.pillars.length >= 4, 'Deveria ter ao menos 4 pilares conceituais');

  assert.ok(rich.diagnosticFlow, 'diagnosticFlow deve existir');
  assert.ok(
    rich.diagnosticFlow.steps && rich.diagnosticFlow.steps.length >= 5,
    'Deveria ter ao menos 5 passos diagnosticos',
  );

  assert.ok(rich.treatmentFlow, 'treatmentFlow deve existir');
  assert.ok(
    rich.treatmentFlow.steps && rich.treatmentFlow.steps.length >= 5,
    'Deveria ter ao menos 5 passos terapeuticos',
  );
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

test('valida referencias cientificas estruturadas (IRIS 2026, Lourenco 2020, Chen 2025, Beraprost 2026, Nelson Couto, DiBartola, Plumb)', () => {
  const record = getRecord();
  assert.ok(record.references && record.references.length >= 12, 'Deve conter ao menos 12 referencias robustas');

  const hasIris2026 = record.references.some((r) => r.year === 2026 && /IRIS/i.test(r.title + r.authors));
  assert.ok(hasIris2026, 'Deve citar a diretriz oficial IRIS 2026');

  const hasLourenco = record.references.some(
    (r) => r.year === 2020 && /Louren[çc]o|telmisartan|enalapril/i.test(r.title + r.authors),
  );
  assert.ok(hasLourenco, 'Deve citar o ensaio Lourenco et al. 2020');

  const hasChen2025 = record.references.some(
    (r) => r.year === 2025 && /Chen|paricalcitol/i.test(r.title + r.authors),
  );
  assert.ok(hasChen2025, 'Deve citar Chen et al. 2025');

  const hasBeraprost = record.references.some(
    (r) => r.year === 2026 && /beraprost/i.test(r.title + r.authors),
  );
  assert.ok(hasBeraprost, 'Deve citar o estudo de Beraprost 2026');

  const hasSantos = record.references.some(
    (r) => r.year === 2026 && /Santos|cystatin/i.test(r.title + r.authors),
  );
  assert.ok(hasSantos, 'Deve citar Santos et al. 2026');

  const hasNelsonCouto = record.references.some((r) => /Nelson.*Couto/i.test(r.authors + r.title));
  assert.ok(hasNelsonCouto, 'Deve citar Nelson & Couto');

  const hasDiBartola = record.references.some((r) => /DiBartola/i.test(r.authors + r.title));
  assert.ok(hasDiBartola, 'Deve citar DiBartola');

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
  const diag = record.diagnosis as {
    passosDiagnosticos?: Array<{ stepNumber: number; isGoldStandard: boolean; title: string }>;
  };
  assert.ok(diag.passosDiagnosticos && diag.passosDiagnosticos.length >= 8);
  const goldStandard = diag.passosDiagnosticos.find((p) => p.isGoldStandard);
  assert.ok(goldStandard, 'Deve conter ao menos um passo considerado padrao-ouro');

  const treat = record.treatment as {
    modalidadesPrincipais?: Array<{ drug: string; dose: string }>;
  };
  assert.ok(treat.modalidadesPrincipais && treat.modalidadesPrincipais.length >= 8);
  const drugNames = treat.modalidadesPrincipais.map((m) => m.drug);
  assert.ok(drugNames.some((d) => /Telmisartana/i.test(d)), 'Deve incluir Telmisartana');
  assert.ok(drugNames.some((d) => /Hidr[oó]xido de alum[ií]nio/i.test(d)), 'Deve incluir Hidroxido de aluminio');
  assert.ok(drugNames.some((d) => /Darbepoetina/i.test(d)), 'Deve incluir Darbepoetina alfa');
  assert.ok(drugNames.some((d) => /Bicarbonato de s[oó]dio/i.test(d)), 'Deve incluir Bicarbonato de sodio');
  assert.ok(drugNames.some((d) => /Clopidogrel/i.test(d)), 'Deve incluir Clopidogrel');
  assert.ok(drugNames.some((d) => /Maropitant/i.test(d)), 'Deve incluir Maropitant');
  assert.ok(drugNames.some((d) => /Capromorelina/i.test(d)), 'Deve incluir Capromorelina');
  assert.ok(drugNames.some((d) => /Citrato f[eé]rrico/i.test(d)), 'Deve incluir Citrato ferrico');
});

test('valida tabelas clinicas ricas (IRIS 2026, correlacao clinica, diagnostico diferencial, protocolo terapeutico)', () => {
  const record = getRecord();
  const etio = record.etiology as any;
  assert.ok(etio.tabelaEstadiamentoIRIS2026, 'Tabela 1 deve existir');
  assert.equal(etio.tabelaEstadiamentoIRIS2026.kind, 'clinicalTable');
  assert.ok(etio.tabelaEstadiamentoIRIS2026.rows.length >= 4);

  const signs = record.clinicalSignsPathophysiology as any;
  assert.ok(signs.tabelaCorrelacaoEstagioSinaisClinicos, 'Tabela 2 deve existir');
  assert.equal(signs.tabelaCorrelacaoEstagioSinaisClinicos.kind, 'clinicalTable');
  assert.ok(signs.tabelaCorrelacaoEstagioSinaisClinicos.rows.length >= 4);

  const diag = record.diagnosis as any;
  assert.ok(diag.tabelaDiagnosticoDiferencialNefropatias, 'Tabela 3 deve existir');
  assert.equal(diag.tabelaDiagnosticoDiferencialNefropatias.kind, 'clinicalTable');
  assert.ok(diag.tabelaDiagnosticoDiferencialNefropatias.rows.length >= 4);

  const treat = record.treatment as any;
  assert.ok(treat.tabelaProtocoloTerapeuticoPorEstagio, 'Tabela 4 deve existir');
  assert.equal(treat.tabelaProtocoloTerapeuticoPorEstagio.kind, 'clinicalTable');
  assert.ok(treat.tabelaProtocoloTerapeuticoPorEstagio.rows.length >= 4);
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
    'diseases.doenca-renal-cronica-canina.seed.ts',
  );
  const fileContent = fs.readFileSync(fileSeedPath, 'utf8');
  assert.ok(
    !fileContent.includes(doubleAsterisk),
    'O arquivo seed diseases.doenca-renal-cronica-canina.seed.ts jamais deve conter asteriscos duplos',
  );
});
