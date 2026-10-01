import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { DISEASE_CONSENSUS_LINKS } from '../../modules/consulta-vet/data/seed/diseaseConsensusLinks';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { lesaoRenalAgudaFelinaRecord } from '../../modules/consulta-vet/data/seed/diseases.lesao-renal-aguda-felina.seed';
import { FULL_KEY_LABELS } from '../../modules/consulta-vet/utils/editorialSubsectionLabels';

const SLUG = 'lesao-renal-aguda-felina';

function getRecord() {
  const fromSeed = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(fromSeed, 'Registro de lesao-renal-aguda-felina deve existir em diseasesSeed');
  return fromSeed;
}

test('mantem ficha canonica unica e cartao publico sincronizado', () => {
  assert.equal(lesaoRenalAgudaFelinaRecord.slug, SLUG);
  assert.equal(lesaoRenalAgudaFelinaRecord.id, 'disease-lesao-renal-aguda-felina');
  assert.ok(
    CONSULTA_VET_PUBLIC_DISEASE_SLUGS.includes(SLUG),
    'Slug deve estar listado em CONSULTA_VET_PUBLIC_DISEASE_SLUGS',
  );

  const cardStub = PUBLIC_CATALOG_DISEASE_CARD_STUBS.find((c) => c.slug === SLUG);
  assert.ok(cardStub, 'Card stub deve existir em PUBLIC_CATALOG_DISEASE_CARD_STUBS');
  assert.equal(cardStub.title, 'Lesão Renal Aguda em Felinos (LRA / AKI)');
  assert.deepEqual(cardStub.species, ['cat']);
  assert.ok(cardStub.quickSummary.length > 150);
});

test('valida metadados, especie felina estrita e faixa de decisao rapida', () => {
  const record = getRecord();
  assert.deepEqual(record.species, ['cat']);
  assert.equal(record.category, 'nefrologia-urologia');
  assert.ok(record.categories && record.categories.includes('urgencia-emergencia'));
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

  assert.match(rich.lead, /fluidoterapia restritiva/i);
  assert.match(rich.lead, /sobrecarga hídrica/i);
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
  assert.ok(plain.keyPoints.length >= 6);
  assert.ok(plain.whatIs && plain.whatIs.length > 30);
  assert.ok(plain.warningSigns && plain.warningSigns.length > 50);
  assert.ok(plain.diagnosis && plain.diagnosis.length > 50);
  assert.ok(plain.homeCare && plain.homeCare.length > 50);

  const registeredPlain = DISEASE_PLAIN_LANGUAGE[SLUG];
  assert.ok(registeredPlain, 'Linguagem simples deve estar registrada em DISEASE_PLAIN_LANGUAGE');
  assert.equal(registeredPlain.keyPoints.length, plain.keyPoints.length);
});

test('valida vinculos com consensos iris 2026, isfm e iscaid', () => {
  const record = getRecord();
  assert.ok(record.relatedConsensusSlugs, 'relatedConsensusSlugs deve existir');
  assert.ok(record.relatedConsensusSlugs.includes('iris-lra-2026'));
  assert.ok(record.relatedConsensusSlugs.includes('isfm-drc-felina-2016'));
  assert.ok(record.relatedConsensusSlugs.includes('iscaid-itu-caes-gatos-2019'));
  assert.ok(record.relatedConsensusSlugs.includes('consenso-cardiorrenal-2015'));

  const consensusLinks = DISEASE_CONSENSUS_LINKS[SLUG];
  assert.ok(consensusLinks, 'Slug deve ter vinculos em DISEASE_CONSENSUS_LINKS');
  assert.ok(consensusLinks.includes('iris-lra-2026'));
  assert.ok(consensusLinks.includes('isfm-drc-felina-2016'));
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
    assert.ok(f.url.startsWith('/consulta-vet/lesao-renal-aguda-felina/'), 'URL deve apontar para /consulta-vet/lesao-renal-aguda-felina/');

    const relPath = f.url.replace(/^\/+/, '');
    const publicPath = path.join(rootDir, 'public', relPath);
    const distPath = path.join(rootDir, 'dist', relPath);

    assert.ok(fs.existsSync(publicPath), `Arquivo de imagem publico deve existir em disco: ${publicPath}`);
    assert.ok(fs.existsSync(distPath), `Arquivo de imagem distribuido deve existir em disco: ${distPath}`);

    const stat = fs.statSync(publicPath);
    assert.ok(stat.size > 10000, `Arquivo de imagem deve ter tamanho realista (>10KB): ${publicPath}`);
  }
});

test('valida tabelas clinicas obrigatorias da LRA felina (Tabelas 1 a 6)', () => {
  const record = getRecord();

  const et = record.etiology as Record<string, unknown>;
  assert.ok(et.tabelaEstadiamentoIrisLraFelina, 'Tabela 1 de estadiamento IRIS deve existir');

  const ep = record.epidemiology as Record<string, unknown>;
  assert.ok(ep.tabelaFasesTemporaisLraFelina, 'Tabela 2 de fases temporais e celulares deve existir');

  const pp = record.pathophysiology as Record<string, unknown>;
  assert.ok(pp.tabelaDiferencialLraDrcFelina, 'Tabela 3 de diagnostico diferencial LRA vs DRC deve existir');

  const dg = record.diagnosis as Record<string, unknown>;
  assert.ok(dg.tabelaMatrizDiagnosticaLraFelina, 'Tabela 4 de matriz diagnostica deve existir');

  const tr = record.treatment as Record<string, unknown>;
  assert.ok(tr.tabelaHipercalemiaEmergencialFelina, 'Tabela 5 de hipercalemia emergencial deve existir');
  assert.ok(tr.tabelaProtocoloEscalonadoUtiLraFelina, 'Tabela 6 de protocolo escalonado de UTI e dialise deve existir');
});

test('valida dez erros fatais e protocolo de plantao em 10 passos', () => {
  const record = getRecord();
  const comp = record.complications as Record<string, string>;

  assert.ok(comp.dezErrosFataisLraFelina, 'dezErrosFataisLraFelina deve existir');
  assert.match(comp.dezErrosFataisLraFelina, /1\./);
  assert.match(comp.dezErrosFataisLraFelina, /5\./);
  assert.match(comp.dezErrosFataisLraFelina, /10\./);

  assert.ok(comp.protocoloPlantaoLraFelina10Passos, 'protocoloPlantaoLraFelina10Passos deve existir');
  assert.match(comp.protocoloPlantaoLraFelina10Passos, /1\./);
  assert.match(comp.protocoloPlantaoLraFelina10Passos, /5\./);
  assert.match(comp.protocoloPlantaoLraFelina10Passos, /10\./);

  assert.ok(comp.prognosticoTransicaoDrcAcompanhamento, 'prognosticoTransicaoDrcAcompanhamento deve existir');
});

test('valida integridade de referencias cientificas dos consensos IRIS 2024-2026, AAHA 2024 e estudos felinos', () => {
  const record = getRecord();
  assert.ok(record.references && record.references.length >= 12);

  const refIrisGrading = record.references.find((r) => r.id === 'ref-iris-aki-grading-2026');
  assert.ok(refIrisGrading, 'Referencia IRIS AKI Grading 2026 deve existir');

  const refWhite = record.references.find((r) => r.id === 'ref-white-iris-summary-2026');
  assert.ok(refWhite, 'Referencia White IRIS 2026 deve existir');

  const refIhd = record.references.find((r) => r.id === 'ref-iris-ihd-consensus-2024');
  assert.ok(refIhd, 'Referencia IRIS IHD Consensus 2024 deve existir');

  const refCrrt = record.references.find((r) => r.id === 'ref-iris-crrt-consensus-2026');
  assert.ok(refCrrt, 'Referencia IRIS CRRT Consensus 2026 deve existir');

  const refAaha = record.references.find((r) => r.id === 'ref-aaha-fluid-therapy-2024');
  assert.ok(refAaha, 'Referencia AAHA Fluid Therapy 2024 deve existir');

  const refNelson = record.references.find((r) => r.id === 'ref-nelson-couto-6ed-renal');
  assert.ok(refNelson, 'Referencia Nelson & Couto deve existir');

  const refDrobatz = record.references.find((r) => r.id === 'ref-drobatz-feline-ecc-2023');
  assert.ok(refDrobatz, 'Referencia Drobatz Feline ECC deve existir');

  const refSegev = record.references.find((r) => r.id === 'ref-segev-feline-aki-2024');
  assert.ok(refSegev, 'Referencia Segev 2024 deve existir');

  const refSiu = record.references.find((r) => r.id === 'ref-siu-lily-toxicity-2022');
  assert.ok(refSiu, 'Referencia Siu 2022 (Lirio) deve existir');
});
