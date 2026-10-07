import assert from 'node:assert/strict';
import test from 'node:test';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { bronquiteCronicaRecord } from '../../modules/consulta-vet/data/seed/diseases.bronquite-cronica.seed';
import { FULL_KEY_LABELS } from '../../modules/consulta-vet/utils/editorialSubsectionLabels';

const SLUG = 'bronquite-cronica-caes-gatos';

function getRecord() {
  const fromSeed = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(fromSeed, 'Registro de bronquite-cronica-caes-gatos deve existir em diseasesSeed');
  return fromSeed;
}

test('mantem ficha canonica unica e cartao publico sincronizado', () => {
  assert.equal(bronquiteCronicaRecord.slug, SLUG);
  assert.equal(bronquiteCronicaRecord.id, 'disease-bronquite-cronica-caes-gatos');
  assert.ok(
    (CONSULTA_VET_PUBLIC_DISEASE_SLUGS as readonly string[]).includes(SLUG),
    'Slug deve estar listado em CONSULTA_VET_PUBLIC_DISEASE_SLUGS',
  );

  const cardStub = PUBLIC_CATALOG_DISEASE_CARD_STUBS.find((c) => c.slug === SLUG);
  assert.ok(cardStub, 'Card stub deve existir em PUBLIC_CATALOG_DISEASE_CARD_STUBS');
  assert.equal(cardStub.title, 'Bronquite crônica em cães e gatos');
  assert.deepEqual(cardStub.species, ['dog', 'cat']);
  assert.ok(cardStub.quickSummary.length > 150);
});

test('valida metadados, ambas as especies e faixa de decisao rapida', () => {
  const record = getRecord();
  assert.deepEqual(record.species, ['dog', 'cat']);
  assert.equal(record.category, 'respiratorio');
  assert.ok(record.categories && record.categories.includes('respiratorio'));
  assert.ok(record.categories && record.categories.includes('clinica-medica'));
  assert.ok(record.categories && record.categories.includes('terapia-intensiva'));
  assert.ok(record.categories && record.categories.includes('farmacologia-terapeutica'));
  assert.ok(record.categories && record.categories.includes('diagnostico-por-imagem'));
  assert.equal(record.isPublished, true);
  assert.ok(record.quickDecisionStrip.length >= 8);
  for (const item of record.quickDecisionStrip) {
    assert.ok(item.length >= 30);
  }
});

test('valida pilares conceituais e fluxos estruturados do resumo rico', () => {
  const record = getRecord();
  assert.ok(record.quickSummaryRich, 'quickSummaryRich deve existir');
  const rich = record.quickSummaryRich;

  assert.match(rich.lead, /bronquite cr[oô]nica|esteira mucociliar|lavado broncoalveolar/i);
  assert.ok(rich.pillars && rich.pillars.length === 4, 'Deveria ter exatamente 4 pilares conceituais');

  const expectedPillars = [
    'Pilar 1: Conceito Temporal e Diferenciação Canina vs Felina',
    'Pilar 2: Dinâmica Mecânica, Lei de Poiseuille e Ciclo Vicioso',
    'Pilar 3: Diagnóstico Fenotípico e Padrão-Ouro (BAL e Imagem)',
    'Pilar 4: Farmacoterapia de Precisão, Terapias Inalatórias e Stewardship',
  ];
  for (let i = 0; i < expectedPillars.length; i++) {
    assert.equal(rich.pillars[i].title, expectedPillars[i]);
  }

  assert.ok(rich.diagnosticFlow, 'diagnosticFlow deve existir');
  assert.ok(
    rich.diagnosticFlow.steps && rich.diagnosticFlow.steps.length >= 5,
    'Deveria ter ao menos 5 passos diagnosticos no resumo rico',
  );

  assert.ok(rich.treatmentFlow, 'treatmentFlow deve existir');
  assert.ok(
    rich.treatmentFlow.steps && rich.treatmentFlow.steps.length >= 5,
    'Deveria ter ao menos 5 passos terapeuticos no resumo rico',
  );
});

test('valida linguagem simples para tutores e triagem rapida', () => {
  const plain = DISEASE_PLAIN_LANGUAGE[SLUG];
  assert.ok(plain, 'Entrada em DISEASE_PLAIN_LANGUAGE deve existir');
  assert.match(plain.whatIsIt, /canais de ar|br[oô]nquios|tosse/i);
  assert.ok(plain.keyPoints && plain.keyPoints.length >= 6);
  assert.ok(plain.warningSigns && plain.warningSigns.length >= 4);
  assert.ok(plain.diagnosis && plain.diagnosis.length >= 3);
  assert.ok(plain.homeCare && plain.homeCare.length >= 4);
});

test('valida mapeamento de todas as subsecoes editoriais em FULL_KEY_LABELS', () => {
  const record = getRecord();
  const sectionsToCheck = [
    record.etiology,
    record.pathophysiology,
    record.clinicalPresentation,
    record.clinicalSignsPathophysiology,
    record.diagnosis,
    record.treatment,
    record.prognosis,
  ];

  for (const section of sectionsToCheck) {
    if (!section || typeof section !== 'object') continue;
    for (const [key, value] of Object.entries(section)) {
      if (
        key === 'diagnosticSteps' ||
        key === 'pharmacologicalOptions' ||
        key === 'nonPharmacological' ||
        key === 'monitoring' ||
        key === 'differentials' ||
        key === 'redFlags' ||
        typeof value !== 'string'
      ) {
        continue;
      }
      assert.ok(
        key in FULL_KEY_LABELS,
        `Chave de subsecao ${key} nao esta mapeada em FULL_KEY_LABELS`,
      );
    }
  }
});

test('valida as 4 tabelas clinicas ricas da monografia', () => {
  const record = getRecord();
  const tables = [
    (record.etiology as Record<string, unknown>).tabelaComparativaEspecieEFenotipo,
    (record.clinicalSignsPathophysiology as Record<string, unknown>).tabelaManifestacoesEErrosInterpretativos,
    (record.diagnosis as Record<string, unknown>).tabelaDiagnosticoDiferencialTosseCronica,
    (record.treatment as Record<string, unknown>).tabelaProtocoloTerapeuticoEscalonado,
  ] as Array<Record<string, unknown>>;

  assert.equal(tables.length, 4, 'Deveria conter exatamente 4 tabelas ricas');
  for (const table of tables) {
    assert.ok(table, 'Tabela deve estar definida');
    assert.equal(table.kind, 'clinicalTable');
    assert.ok(typeof table.caption === 'string' && table.caption.length > 10);
    assert.ok(Array.isArray(table.headers) && table.headers.length >= 3);
    assert.ok(Array.isArray(table.rows) && table.rows.length >= 3);
  }
});

test('valida passos diagnosticos estruturados com padrao-ouro', () => {
  const record = getRecord();
  const steps = (record.diagnosis as Record<string, unknown>).passosDiagnosticos as Array<Record<string, unknown>>;
  assert.ok(steps && steps.length >= 8);

  const stepsText = JSON.stringify(steps);
  assert.match(stepsText, /Lavado broncoalveolar|BAL/i);
  assert.match(stepsText, /Tomografia computadorizada/i);
  assert.match(stepsText, /Baermann|parasitol[oó]gico/i);
  assert.match(stepsText, /Bordetella|Mycoplasma/i);
});

test('valida modalidades farmacologicas completas com doses, mecanismos e alertas', () => {
  const record = getRecord();
  const options = (record.treatment as Record<string, unknown>).modalidadesPrincipais as Array<Record<string, unknown>>;
  assert.ok(options && options.length >= 8);

  const treatmentText = JSON.stringify(record.treatment);
  assert.match(treatmentText, /Fluticasona/i);
  assert.match(treatmentText, /Prednisolona/i);
  assert.match(treatmentText, /Albuterol|Salbutamol/i);
  assert.match(treatmentText, /Terbutalina/i);
  assert.match(treatmentText, /Doxiciclina/i);
  assert.match(treatmentText, /N-acetilciste[íi]na/i);
  assert.match(treatmentText, /broncoespasmo/i);
  assert.match(treatmentText, /stewardship/i);
});

test('valida referencias cientificas e livros-texto do acervo com DOIs', () => {
  const record = getRecord();
  const refs = record.references ?? [];
  assert.ok(refs.length >= 10);

  const refsText = JSON.stringify(refs);
  assert.match(refsText, /Lyssens/i);
  assert.match(refsText, /Chan/i);
  assert.match(refsText, /Barchilon/i);
  assert.match(refsText, /Werner/i);
  assert.match(refsText, /ISCAID/i);
  assert.match(refsText, /Nelson/i);
  assert.match(refsText, /Plumb/i);
});

test('garante ausencia absoluta de marcadores de asterisco duplo', () => {
  const record = getRecord();
  const plain = DISEASE_PLAIN_LANGUAGE[SLUG];
  const cardStub = PUBLIC_CATALOG_DISEASE_CARD_STUBS.find((c) => c.slug === SLUG);
  const doubleAsterisk = '\x2a\x2a';

  assert.equal(JSON.stringify(record).includes(doubleAsterisk), false, 'Nao pode haver asteriscos duplos no seed');
  assert.equal(JSON.stringify(plain).includes(doubleAsterisk), false, 'Nao pode haver asteriscos duplos na linguagem simples');
  assert.equal(JSON.stringify(cardStub).includes(doubleAsterisk), false, 'Nao pode haver asteriscos duplos no card stub');
});
