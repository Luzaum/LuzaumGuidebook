import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { DISEASE_CONSENSUS_LINKS } from '../../modules/consulta-vet/data/seed/diseaseConsensusLinks';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { paralisiaLaringeaCaesGatosRecord } from '../../modules/consulta-vet/data/seed/diseases.paralisia-laringea-caes-gatos.seed';
import { FULL_KEY_LABELS } from '../../modules/consulta-vet/utils/editorialSubsectionLabels';

const SLUG = 'paralisia-laringea-caes-gatos';

function getRecord() {
  const fromSeed = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(fromSeed, 'Registro de paralisia-laringea-caes-gatos deve existir em diseasesSeed');
  return fromSeed;
}

test('mantem ficha canonica unica e cartao publico sincronizado', () => {
  assert.equal(paralisiaLaringeaCaesGatosRecord.slug, SLUG);
  assert.equal(paralisiaLaringeaCaesGatosRecord.id, 'disease-paralisia-laringea-caes-gatos');
  assert.ok(
    CONSULTA_VET_PUBLIC_DISEASE_SLUGS.includes(SLUG),
    'Slug deve estar listado em CONSULTA_VET_PUBLIC_DISEASE_SLUGS',
  );

  const cardStub = PUBLIC_CATALOG_DISEASE_CARD_STUBS.find((c) => c.slug === SLUG);
  assert.ok(cardStub, 'Card stub deve existir em PUBLIC_CATALOG_DISEASE_CARD_STUBS');
  assert.equal(cardStub.title, 'Paralisia Laríngea em Cães e Gatos (GOLPP / LPPN)');
  assert.deepEqual(cardStub.species, ['dog', 'cat']);
  assert.ok(cardStub.quickSummary.length > 150);
});

test('valida metadados, especies canina e felina e faixa de decisao rapida', () => {
  const record = getRecord();
  assert.deepEqual(record.species, ['dog', 'cat']);
  assert.equal(record.category, 'pneumologia');
  assert.ok(record.categories && record.categories.includes('neurologia'));
  assert.ok(record.categories && record.categories.includes('urgencia-emergencia'));
  assert.ok(record.categories && record.categories.includes('cirurgia'));
  assert.ok(record.categories && record.categories.includes('clinica-medica'));
  assert.equal(record.isPublished, true);
  assert.equal(record.quickDecisionStrip.length, 5);
  for (const item of record.quickDecisionStrip) {
    assert.ok(item.length >= 25);
  }
});

test('valida pilares conceituais e fluxos estruturados do resumo rico', () => {
  const record = getRecord();
  assert.ok(record.quickSummaryRich, 'quickSummaryRich deve existir');
  const rich = record.quickSummaryRich;

  assert.match(rich.lead, /abdu|ariten|laring|glot|respir/i);
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

  assert.ok(plain.whatIsIt.length >= 80);
  assert.ok(plain.keyPoints && plain.keyPoints.length >= 6);
  assert.ok(plain.whatIs.length >= 30);
  assert.ok(plain.warningSigns.length >= 30);
  assert.ok(plain.diagnosis.length >= 30);
  assert.ok(plain.homeCare.length >= 30);

  const fromMap = DISEASE_PLAIN_LANGUAGE[SLUG];
  assert.ok(fromMap, 'Slug deve estar cadastrado em DISEASE_PLAIN_LANGUAGE');
  assert.equal(fromMap.whatIsIt, plain.whatIsIt);
});

test('valida vinculos com consensos recover e referencias estruturadas', () => {
  const record = getRecord();
  assert.ok(
    record.relatedConsensusSlugs && record.relatedConsensusSlugs.includes('recover-primeiros-socorros-2026'),
    'Deve conter vinculo com recover-primeiros-socorros-2026',
  );

  const consensusMap = DISEASE_CONSENSUS_LINKS[SLUG];
  assert.ok(consensusMap && consensusMap.includes('recover-primeiros-socorros-2026'));

  assert.ok(record.editorialReferences && record.editorialReferences.length >= 15);
  for (const ref of record.editorialReferences) {
    assert.ok(ref.authors, 'Referencia deve conter autores');
    assert.ok(ref.title, 'Referencia deve conter titulo');
    assert.ok(ref.journal, 'Referencia deve conter revista/fonte');
    assert.ok(ref.year > 1990, 'Ano deve ser contemporaneo');
    assert.ok(ref.url, 'Referencia deve conter url');
  }
});

test('valida mapeamento completo de rotulos editoriais de subsecoes', () => {
  const record = getRecord();
  const sections = [
    record.etiology,
    record.epidemiology,
    record.pathophysiology,
    record.clinicalSigns,
    record.diagnosis,
    record.treatment,
    record.complications,
    record.prevention,
    record.prognosis,
  ];

  for (const sec of sections) {
    if (!sec) continue;
    for (const key of Object.keys(sec)) {
      const label = FULL_KEY_LABELS[key];
      assert.ok(
        label,
        `Chave editorial "${key}" deve ter traducao explicita mapeada em FULL_KEY_LABELS`,
      );
      assert.ok(label.length >= 5, `Rotulo da chave "${key}" deve ser descritivo e significativo`);
    }
  }
});

test('valida figuras clinicas locais e presenca de arquivos em public e dist', () => {
  const record = getRecord();
  assert.ok(record.figures && record.figures.length === 4, 'Deveria conter exatamente 4 figuras clinicas');

  for (const fig of record.figures) {
    assert.ok(fig.id, 'Figura deve ter id');
    assert.ok(fig.title, 'Figura deve ter titulo');
    assert.ok(fig.legend, 'Figura deve ter legenda');
    assert.ok(fig.url.startsWith('/consulta-vet/paralisia-laringea-caes-gatos/'), 'URL deve apontar para pasta local');

    const relPath = fig.url.replace(/^\//, '');
    const publicPath = path.join(process.cwd(), 'public', relPath.replace(/^consulta-vet\/paralisia-laringea-caes-gatos\//, 'consulta-vet/paralisia-laringea-caes-gatos/'));
    const distPath = path.join(process.cwd(), 'dist', relPath.replace(/^consulta-vet\/paralisia-laringea-caes-gatos\//, 'consulta-vet/paralisia-laringea-caes-gatos/'));

    assert.ok(fs.existsSync(publicPath), `Arquivo de figura deve existir em public: ${publicPath}`);
    assert.ok(fs.existsSync(distPath), `Arquivo de figura deve existir em dist: ${distPath}`);
  }
});

test('valida tabelas clinicas obrigatorias da paralisia laringea (Tabelas 1 a 6)', () => {
  const record = getRecord();
  assert.ok(record.tables && record.tables.length === 6, 'Deveria conter exatamente 6 tabelas clinicas');

  const expectedTableIds = [
    'tab-paralisia-laringea-1',
    'tab-paralisia-laringea-2',
    'tab-paralisia-laringea-3',
    'tab-paralisia-laringea-4',
    'tab-paralisia-laringea-5',
    'tab-paralisia-laringea-6',
  ];

  for (let i = 0; i < expectedTableIds.length; i++) {
    const table = record.tables[i];
    assert.equal(table.id, expectedTableIds[i]);
    assert.ok(table.title.startsWith(`Tabela ${i + 1}`));
    assert.ok(table.headers && table.headers.length >= 3);
    assert.ok(table.rows && table.rows.length >= 4);
  }
});

test('valida dez erros fatais e protocolo de plantao em 10 passos', () => {
  const record = getRecord();
  assert.ok(record.errorsAndTrapdoors && record.errorsAndTrapdoors.length === 10, 'Deve ter exatamente 10 erros fatais');
  for (const err of record.errorsAndTrapdoors) {
    assert.ok(err.id.startsWith('err-paralisia-'));
    assert.ok(err.title.length >= 15);
    assert.ok(err.description.length >= 50);
  }

  assert.ok(record.clinicalProtocols && record.clinicalProtocols.length === 1, 'Deve conter 1 protocolo de plantao');
  const protocol = record.clinicalProtocols[0];
  assert.equal(protocol.id, 'proto-paralisia-1');
  assert.equal(protocol.steps.length, 10, 'Protocolo deve ter exatamente 10 passos sequenciais');
  for (let s = 0; s < 10; s++) {
    assert.equal(protocol.steps[s].step, s + 1);
    assert.ok(protocol.steps[s].action.length >= 10);
    assert.ok(protocol.steps[s].target.length >= 10);
    assert.ok(protocol.steps[s].description.length >= 40);
  }
});

test('valida integridade de referencias cientificas e ausencia absoluta de asteriscos duplos', () => {
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
    'diseases.paralisia-laringea-caes-gatos.seed.ts',
  );
  const fileContent = fs.readFileSync(fileSeedPath, 'utf8');
  assert.ok(
    !fileContent.includes(doubleAsterisk),
    'O arquivo seed diseases.paralisia-laringea-caes-gatos.seed.ts jamais deve conter asteriscos duplos',
  );
});
