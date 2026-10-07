import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { CONCISE_DISEASE_SUMMARIES } from '../../modules/consulta-vet/data/conciseClinicalSummaries';
import { PROGRESSIVE_SUMMARY_PREVIEWS } from '../../modules/consulta-vet/data/progressiveSummaryPreviews';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { doencaRenalCronicaFelinaRecord } from '../../modules/consulta-vet/data/seed/diseases.doenca-renal-cronica-felina.seed';
import { FULL_KEY_LABELS } from '../../modules/consulta-vet/utils/editorialSubsectionLabels';

const SLUG = 'doenca-renal-cronica-felina';

function getRecord() {
  const fromSeed = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(fromSeed, 'Registro de doenca-renal-cronica-felina deve existir em diseasesSeed');
  return fromSeed;
}

test('mantem ficha canonica unica e cartao publico sincronizado', () => {
  assert.equal(doencaRenalCronicaFelinaRecord.slug, SLUG);
  assert.equal(doencaRenalCronicaFelinaRecord.id, 'disease-doenca-renal-cronica-felina');
  assert.ok(
    (CONSULTA_VET_PUBLIC_DISEASE_SLUGS as readonly string[]).includes(SLUG),
    'Slug deve estar listado em CONSULTA_VET_PUBLIC_DISEASE_SLUGS',
  );

  const cardStub = PUBLIC_CATALOG_DISEASE_CARD_STUBS.find((c) => c.slug === SLUG);
  assert.ok(cardStub, 'Card stub deve existir em PUBLIC_CATALOG_DISEASE_CARD_STUBS');
  assert.equal(cardStub.title, 'Doença renal crônica em felinos (DRC felina)');
  assert.deepEqual(cardStub.species, ['cat']);
  assert.ok(cardStub.quickSummary.length > 150);
});

test('valida metadados, especie estrita felina e faixa de decisao rapida', () => {
  const record = getRecord();
  assert.deepEqual(record.species, ['cat']);
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

  assert.match(rich.lead, /icatcare 2026|iris 2026|f[oó]sforo|calcio ionizado/i);
  assert.ok(rich.pillars && rich.pillars.length === 4, 'Deveria ter exatamente 4 pilares conceituais');

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

test('valida resumo conciso e preview progressivo de 4 pilares sincronizado', () => {
  const concise = CONCISE_DISEASE_SUMMARIES[SLUG];
  assert.ok(concise, 'Resumo conciso deve existir em CONCISE_DISEASE_SUMMARIES');
  assert.ok(concise.definition.length > 20);
  assert.equal(concise.points.length, 3);
  assert.match(concise.source, /Nelson.*Couto|iCatCare/i);

  const preview = PROGRESSIVE_SUMMARY_PREVIEWS[SLUG];
  assert.ok(preview, 'Preview progressivo deve existir em PROGRESSIVE_SUMMARY_PREVIEWS');
  assert.ok(preview.simple.split(/\s+/).length <= 55, 'Texto simples deve ter no maximo 55 palavras');

  const record = getRecord();
  const pillarTitles = (record.quickSummaryRich?.pillars ?? []).map((p) => p.title);
  assert.equal(pillarTitles.length, 4);

  for (const title of pillarTitles) {
    assert.ok(title in preview.pillars, `Titulo do pilar "${title}" deve estar no preview progressivo`);
    const body = preview.pillars[title as keyof typeof preview.pillars];
    assert.ok(body.split(/\s+/).length <= 28, `Texto do pilar "${title}" deve ter no maximo 28 palavras`);
  }
});

test('valida referencias cientificas estruturadas (iCatCare 2026, IRIS 2026, Ross 2006, Sent 2015, Charles 2024, Le Corre 2026, Nelson Couto, DiBartola, Plumb)', () => {
  const record = getRecord();
  assert.ok(record.references && record.references.length >= 12, 'Deve conter ao menos 12 referencias robustas');

  const hasICatCare2026 = record.references.some(
    (r) => r.year === 2026 && /iCatCare|Taylor/i.test(r.title + r.authors),
  );
  assert.ok(hasICatCare2026, 'Deve citar o consenso iCatCare 2026');

  const hasIris2026 = record.references.some((r) => r.year === 2026 && /IRIS/i.test(r.title + r.authors));
  assert.ok(hasIris2026, 'Deve citar a diretriz oficial IRIS 2026');

  const hasRoss2006 = record.references.some((r) => r.year === 2006 && /Ross/i.test(r.authors));
  assert.ok(hasRoss2006, 'Deve citar Ross et al. 2006 (dieta renal)');

  const hasSent2015 = record.references.some((r) => r.year === 2015 && /Sent|telmisartan/i.test(r.authors + r.title));
  assert.ok(hasSent2015, 'Deve citar Sent et al. 2015 (telmisartana)');

  const hasCharles2024 = record.references.some((r) => r.year === 2024 && /Charles|molidustat/i.test(r.authors + r.title));
  assert.ok(hasCharles2024, 'Deve citar Charles et al. 2024 (molidustat)');

  const hasLeCorre2026 = record.references.some((r) => r.year === 2026 && /Le Corre|bacteriuria/i.test(r.authors + r.title));
  assert.ok(hasLeCorre2026, 'Deve citar Le Corre et al. 2026 (bacteriuria subclinica)');

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
  assert.ok(drugNames.some((d) => /Dieta Renal/i.test(d)), 'Deve incluir Dieta Renal');
  assert.ok(drugNames.some((d) => /Telmisartana/i.test(d)), 'Deve incluir Telmisartana');
  assert.ok(drugNames.some((d) => /Amlodipina/i.test(d)), 'Deve incluir Amlodipina');
  assert.ok(drugNames.some((d) => /Molidustat/i.test(d)), 'Deve incluir Molidustat');
  assert.ok(drugNames.some((d) => /Darbepoetina/i.test(d)), 'Deve incluir Darbepoetina alfa');
  assert.ok(drugNames.some((d) => /Hidr[oó]xido de alum[ií]nio/i.test(d)), 'Deve incluir Hidroxido de aluminio');
  assert.ok(drugNames.some((d) => /Maropitant/i.test(d)), 'Deve incluir Maropitant');
  assert.ok(drugNames.some((d) => /Mirtazapina/i.test(d)), 'Deve incluir Mirtazapina');
  assert.ok(drugNames.some((d) => /Gluconato de pot[aá]ssio/i.test(d)), 'Deve incluir Gluconato de potassio');
});

test('valida tabelas clinicas ricas (etiologia, metabolismo mineral, correlacao clinica, estadiamento IRIS 2026, protocolo terapeutico)', () => {
  const record = getRecord();
  const etio = record.etiology as any;
  assert.ok(etio.tabelaEtiologiaEPredisposicoesFelinas, 'Tabela de etiologia deve existir');
  assert.equal(etio.tabelaEtiologiaEPredisposicoesFelinas.kind, 'clinicalTable');
  assert.ok(etio.tabelaEtiologiaEPredisposicoesFelinas.rows.length >= 4);

  const patho = record.pathophysiology as any;
  assert.ok(patho.tabelaMetabolismoMineralEHipercalcemia, 'Tabela de metabolismo mineral deve existir');
  assert.equal(patho.tabelaMetabolismoMineralEHipercalcemia.kind, 'clinicalTable');
  assert.ok(patho.tabelaMetabolismoMineralEHipercalcemia.rows.length >= 4);

  const signs = record.clinicalSignsPathophysiology as any;
  assert.ok(signs.tabelaCorrelacaoClinicaSinaisEArmadilhas, 'Tabela de correlacao clinica deve existir');
  assert.equal(signs.tabelaCorrelacaoClinicaSinaisEArmadilhas.kind, 'clinicalTable');
  assert.ok(signs.tabelaCorrelacaoClinicaSinaisEArmadilhas.rows.length >= 4);

  const diag = record.diagnosis as any;
  assert.ok(diag.tabelaEstadiamentoIRIS2026Felina, 'Tabela de estadiamento IRIS 2026 deve existir');
  assert.equal(diag.tabelaEstadiamentoIRIS2026Felina.kind, 'clinicalTable');
  assert.ok(diag.tabelaEstadiamentoIRIS2026Felina.rows.length >= 4);

  const treat = record.treatment as any;
  assert.ok(treat.tabelaProtocoloTerapeuticoPorEstagioFelino, 'Tabela de protocolo terapeutico deve existir');
  assert.equal(treat.tabelaProtocoloTerapeuticoPorEstagioFelino.kind, 'clinicalTable');
  assert.ok(treat.tabelaProtocoloTerapeuticoPorEstagioFelino.rows.length >= 4);
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
    'diseases.doenca-renal-cronica-felina.seed.ts',
  );
  const fileContent = fs.readFileSync(fileSeedPath, 'utf8');
  assert.ok(
    !fileContent.includes(doubleAsterisk),
    'O arquivo seed diseases.doenca-renal-cronica-felina.seed.ts jamais deve conter asteriscos duplos',
  );
});
