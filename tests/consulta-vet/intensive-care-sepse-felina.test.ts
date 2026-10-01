import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { DISEASE_CONSENSUS_LINKS } from '../../modules/consulta-vet/data/seed/diseaseConsensusLinks';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { sepseFelinaRecord } from '../../modules/consulta-vet/data/seed/diseases.sepse-felina.seed';
import { FULL_KEY_LABELS } from '../../modules/consulta-vet/utils/editorialSubsectionLabels';

const SLUG = 'sepse-felina';

function getRecord() {
  const fromSeed = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(fromSeed, 'Registro de sepse-felina deve existir em diseasesSeed');
  return fromSeed;
}

test('mantem ficha canonica unica e cartao publico sincronizado', () => {
  assert.equal(sepseFelinaRecord.slug, SLUG);
  assert.equal(sepseFelinaRecord.id, 'disease-sepse-felina');
  assert.ok(
    CONSULTA_VET_PUBLIC_DISEASE_SLUGS.includes(SLUG),
    'Slug deve estar listado em CONSULTA_VET_PUBLIC_DISEASE_SLUGS',
  );

  const cardStub = PUBLIC_CATALOG_DISEASE_CARD_STUBS.find((c) => c.slug === SLUG);
  assert.ok(cardStub, 'Card stub deve existir em PUBLIC_CATALOG_DISEASE_CARD_STUBS');
  assert.equal(cardStub.title, 'Sepse e Choque Séptico em Felinos');
  assert.deepEqual(cardStub.species, ['cat']);
  assert.ok(cardStub.quickSummary.length > 150);
});

test('valida metadados, especie felina estrita e faixa de decisao rapida', () => {
  const record = getRecord();
  assert.deepEqual(record.species, ['cat']);
  assert.equal(record.category, 'urgencia-emergencia');
  assert.ok(record.categories && record.categories.includes('terapia-intensiva'));
  assert.ok(record.categories && record.categories.includes('medicina-felina'));
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

  assert.match(rich.lead, /resposta desregulada do hospedeiro/i);
  assert.match(rich.lead, /tríade do choque/i);
  assert.equal(rich.pillars?.length, 4);

  assert.ok(rich.diagnosticFlow, 'diagnosticFlow deve existir');
  assert.equal(rich.diagnosticFlow.steps.length, 4);

  assert.ok(rich.treatmentFlow, 'treatmentFlow deve existir');
  assert.equal(rich.treatmentFlow.steps.length, 6);

  const decTable = rich.tabelaDecisaoClinicaRapida as { headers: string[]; rows: Array<Record<string, string>> };
  assert.ok(decTable, 'tabelaDecisaoClinicaRapida deve existir');
  assert.equal(decTable.headers.length, 4);
  assert.equal(decTable.rows.length, 5);
});

test('valida linguagem simples para tutores e triagem rapida', () => {
  const record = getRecord();
  assert.ok(record.plainLanguage, 'plainLanguage deve estar preenchido');
  const plain = record.plainLanguage;

  assert.ok(plain.whatIsIt.length > 100);
  assert.ok(plain.keyPoints.length >= 5);
  assert.ok(plain.whatIs && plain.whatIs.length > 30);
  assert.ok(plain.warningSigns && plain.warningSigns.length > 50);
  assert.ok(plain.diagnosis && plain.diagnosis.length > 50);
  assert.ok(plain.homeCare && plain.homeCare.length > 50);

  const registeredPlain = DISEASE_PLAIN_LANGUAGE[SLUG];
  assert.ok(registeredPlain, 'Linguagem simples deve estar registrada em DISEASE_PLAIN_LANGUAGE');
  assert.equal(registeredPlain.keyPoints.length, plain.keyPoints.length);
});

test('valida vinculos com consensos veccs 2026 e curative', () => {
  const record = getRecord();
  assert.ok(record.relatedConsensusSlugs, 'relatedConsensusSlugs deve existir');
  assert.ok(record.relatedConsensusSlugs.includes('veccs-sepse-definicao-caes-gatos-2026'));
  assert.ok(record.relatedConsensusSlugs.includes('veccs-choque-septico-prognostico-2026'));
  assert.ok(record.relatedConsensusSlugs.includes('curative-risco-trombotico-2022'));

  const consensusLinks = DISEASE_CONSENSUS_LINKS[SLUG];
  assert.ok(consensusLinks, 'Slug deve ter vinculos em DISEASE_CONSENSUS_LINKS');
  assert.ok(consensusLinks.includes('veccs-sepse-definicao-caes-gatos-2026'));
  assert.ok(consensusLinks.includes('veccs-choque-septico-prognostico-2026'));
});

test('valida mapeamento completo de rotulos editoriais de subsecoes', () => {
  const record = getRecord();
  const sectionsToCheck = [
    record.etiology,
    record.epidemiology,
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

test('valida figuras clinicas locais e presenca de arquivos em public e dist', () => {
  const record = getRecord();
  assert.ok(record.figures && Array.isArray(record.figures), 'figures deve ser um array');
  assert.equal(record.figures.length, 4, 'Deve conter exatamente 4 figuras clinicas');

  const rootDir = process.cwd();

  for (const fig of record.figures) {
    const f = fig as { id: string; title: string; legend: string; url: string; aspectRatio: string };
    assert.ok(f.id, 'Figura deve ter id');
    assert.ok(f.title, 'Figura deve ter title');
    assert.ok(f.legend, 'Figura deve ter legend');
    assert.ok(f.aspectRatio, 'Figura deve ter aspectRatio');
    assert.ok(f.url.startsWith('/consulta-vet/sepse-felina/'), 'URL deve apontar para /consulta-vet/sepse-felina/');

    const relPath = f.url.replace(/^\/+/, '');
    const publicPath = path.join(rootDir, 'public', relPath);
    const distPath = path.join(rootDir, 'dist', relPath);

    assert.ok(fs.existsSync(publicPath), `Arquivo de imagem publico deve existir em disco: ${publicPath}`);
    assert.ok(fs.existsSync(distPath), `Arquivo de imagem distribuido deve existir em disco: ${distPath}`);

    const stat = fs.statSync(publicPath);
    assert.ok(stat.size > 20000, `Arquivo de imagem deve ter tamanho realista (>20KB): ${publicPath}`);
  }
});

test('valida tabelas clinicas obrigatorias de UTI felina', () => {
  const record = getRecord();

  const et = record.etiology as Record<string, unknown>;
  assert.ok(et.tabelaComparativaCaesVsGatosSepse, 'Tabela 1 de comparacao cao vs gato deve existir');

  const ep = record.epidemiology as Record<string, unknown>;
  assert.ok(ep.tabelaFocosMicrobiologiaFelina, 'Tabela 2 de focos e microbiologia felina deve existir');

  const cs = record.clinicalSignsPathophysiology as Record<string, unknown>;
  assert.ok(cs.tabelaCriteriosDisfuncaoFelina, 'Tabela 3 de criterios de disfuncao por sistemas deve existir');

  const dg = record.diagnosis as Record<string, unknown>;
  assert.ok(dg.tabelaMatrizDiagnosticaFelina, 'Tabela 4 de matriz diagnostica felina deve existir');

  const tr = record.treatment as Record<string, unknown>;
  assert.ok(tr.tabelaDrogasVasoativasFelinas, 'Tabela 5 de drogas vasoativas felinas deve existir');
  assert.ok(tr.tabelaManejoEscalonadoUtiFelina, 'Tabela 6 de manejo escalonado de UTI felina deve existir');
});

test('valida dez erros fatais e protocolo de plantao em 10 passos', () => {
  const record = getRecord();
  const comp = record.complications as Record<string, string>;

  assert.ok(comp.dezErrosMataisSepseFelina, 'dezErrosMataisSepseFelina deve existir');
  assert.match(comp.dezErrosMataisSepseFelina, /1\./);
  assert.match(comp.dezErrosMataisSepseFelina, /5\./);
  assert.match(comp.dezErrosMataisSepseFelina, /10\./);

  assert.ok(comp.protocoloPlantaoSepseFelina10Passos, 'protocoloPlantaoSepseFelina10Passos deve existir');
  assert.match(comp.protocoloPlantaoSepseFelina10Passos, /1\./);
  assert.match(comp.protocoloPlantaoSepseFelina10Passos, /5\./);
  assert.match(comp.protocoloPlantaoSepseFelina10Passos, /10\./);
});

test('valida integridade de referencias cientificas dos consensos 2026 e estudos felinos', () => {
  const record = getRecord();
  assert.ok(record.references && record.references.length >= 10);

  const refGoggsSepse = record.references.find((r) => r.id === 'ref-goggs-sepse-felina-2026');
  assert.ok(refGoggsSepse, 'Referencia Goggs Sepse 2026 deve existir');

  const refGoggsChoque = record.references.find((r) => r.id === 'ref-goggs-choque-felino-2026');
  assert.ok(refGoggsChoque, 'Referencia Goggs Choque 2026 deve existir');

  const refTroia = record.references.find((r) => r.id === 'ref-troia-mods-felina-2019');
  assert.ok(refTroia, 'Referencia Troia MODS Felina 2019 deve existir');

  const refKlainbart = record.references.find((r) => r.id === 'ref-klainbart-peritonite-felina-2017');
  assert.ok(refKlainbart, 'Referencia Klainbart Peritonite Felina 2017 deve existir');

  const refScotti = record.references.find((r) => r.id === 'ref-scotti-antimicrobianos-sepse-2019');
  assert.ok(refScotti, 'Referencia Scotti Antimicrobianos 2019 deve existir');

  const refAaha = record.references.find((r) => r.id === 'ref-aaha-fluidos-2024');
  assert.ok(refAaha, 'Referencia AAHA Fluidos 2024 deve existir');
});
