import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { DISEASE_CONSENSUS_LINKS } from '../../modules/consulta-vet/data/seed/diseaseConsensusLinks';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { bruceloseCaesGatosRecord } from '../../modules/consulta-vet/data/seed/diseases.brucelose-caes-gatos.seed';
import { FULL_KEY_LABELS } from '../../modules/consulta-vet/utils/editorialSubsectionLabels';

const SLUG = 'brucelose-caes-gatos';

function getRecord() {
  const fromSeed = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(fromSeed, 'Registro de brucelose-caes-gatos deve existir em diseasesSeed');
  return fromSeed;
}

test('mantem ficha canonica unica e cartao publico sincronizado', () => {
  assert.equal(bruceloseCaesGatosRecord.slug, SLUG);
  assert.equal(bruceloseCaesGatosRecord.id, 'disease-brucelose-caes-gatos');
  assert.ok(
    CONSULTA_VET_PUBLIC_DISEASE_SLUGS.includes(SLUG),
    'Slug deve estar listado em CONSULTA_VET_PUBLIC_DISEASE_SLUGS',
  );

  const cardStub = PUBLIC_CATALOG_DISEASE_CARD_STUBS.find((c) => c.slug === SLUG);
  assert.ok(cardStub, 'Card stub deve existir em PUBLIC_CATALOG_DISEASE_CARD_STUBS');
  assert.equal(cardStub.title, 'Brucelose em Cães e Gatos (Brucella canis)');
  assert.deepEqual(cardStub.species, ['dog', 'cat']);
  assert.ok(cardStub.quickSummary.length > 150);
});

test('valida metadados, especies canina e felina e faixa de decisao rapida', () => {
  const record = getRecord();
  assert.deepEqual(record.species, ['dog', 'cat']);
  assert.equal(record.category, 'infectologia');
  assert.ok(record.categories && record.categories.includes('reproducao'));
  assert.ok(record.categories && record.categories.includes('neurologia'));
  assert.ok(record.categories && record.categories.includes('ortopedia'));
  assert.ok(record.categories && record.categories.includes('oftalmologia'));
  assert.ok(record.categories && record.categories.includes('saude-publica'));
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

  assert.match(rich.lead, /zoonose|rough|intracelular|persist/i);
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

test('valida vinculos com consensos recover e referencias estruturadas', () => {
  const record = getRecord();
  assert.ok(record.relatedConsensusSlugs, 'relatedConsensusSlugs deve existir');
  assert.ok(record.relatedConsensusSlugs.includes('recover-primeiros-socorros-2026'));

  const consensusLinks = DISEASE_CONSENSUS_LINKS[SLUG];
  assert.ok(consensusLinks, 'Slug deve ter vinculos em DISEASE_CONSENSUS_LINKS');
  assert.ok(consensusLinks.includes('recover-primeiros-socorros-2026'));
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
    assert.ok(f.url.startsWith('/consulta-vet/brucelose-caes-gatos/'), 'URL deve apontar para /consulta-vet/brucelose-caes-gatos/');

    const relPath = f.url.replace(/^\/+/, '');
    const publicPath = path.join(rootDir, 'public', relPath);
    const distPath = path.join(rootDir, 'dist', relPath);

    assert.ok(fs.existsSync(publicPath), `Arquivo de imagem publico deve existir em disco: ${publicPath}`);
    assert.ok(fs.existsSync(distPath), `Arquivo de imagem distribuido deve existir em disco: ${distPath}`);

    const stat = fs.statSync(publicPath);
    assert.ok(stat.size > 10000, `Arquivo de imagem deve ter tamanho realista (>10KB): ${publicPath}`);
  }
});

test('valida tabelas clinicas obrigatorias da brucelose (Tabelas 1 a 6)', () => {
  const record = getRecord();

  const et = record.etiology as Record<string, unknown>;
  assert.ok(et.tabelaEspeciesBrucellaComparadas, 'Tabela 1 de especies de Brucella comparadas deve existir');

  const ep = record.epidemiology as Record<string, unknown>;
  assert.ok(ep.tabelaPrevalenciaEEpidemiologiaCaninaVsFelina, 'Tabela 2 de epidemiologia comparada caes vs gatos deve existir');

  const pt = record.pathogenesisTransmission as Record<string, unknown>;
  assert.ok(pt.tabelaCargasBacterianasEViasDeTransmissao, 'Tabela 3 de cargas bacterianas e transmissao deve existir');

  const dg = record.diagnosis as Record<string, unknown>;
  assert.ok(dg.tabelaPainelDiagnosticoSorologicoEMicrobiologico, 'Tabela 4 de painel diagnostico sorologico e microbiologico deve existir');
  assert.ok(dg.tabelaDiagnosticoDiferencialDiscospondiliteEAborto, 'Tabela 5 de diferencial de abortamento e discospondilite deve existir');

  const tr = record.treatment as Record<string, unknown>;
  assert.ok(tr.tabelaProtocolosAntimicrobianosEMonitoramento, 'Tabela 6 de protocolos antimicrobianos e monitoramento deve existir');
});

test('valida dez erros fatais e protocolo de plantao em 10 passos', () => {
  const record = getRecord();
  const comp = record.complications as Record<string, unknown>;

  assert.ok(comp.dezErrosFataisBrucelose, 'Dez erros fatais deve existir em complications');
  const errosText = String(comp.dezErrosFataisBrucelose);
  assert.match(errosText, /\(1\)/);
  assert.match(errosText, /\(10\)/);
  assert.match(errosText, /rough/i);
  assert.match(errosText, /hole-punch|Moeller/i);
  assert.match(errosText, /BSL-3/i);

  assert.ok(comp.protocoloPlantaoBrucelose10Passos, 'Protocolo de plantao em 10 passos deve existir em complications');
  const protocoloText = String(comp.protocoloPlantaoBrucelose10Passos);
  assert.match(protocoloText, /Passo 1/);
  assert.match(protocoloText, /Passo 10/);
  assert.match(protocoloText, /Triagem/i);
  assert.match(protocoloText, /BSL-3/i);
  assert.match(protocoloText, /Doxiciclina/i);
});

test('valida integridade de referencias cientificas e ausencia absoluta de asteriscos duplos', () => {
  const record = getRecord();
  assert.ok(record.references && record.references.length >= 15, 'Deveria ter ao menos 15 referencias cientificas');

  const refVin = record.references.find((r) => r.id === 'vin-2025-canine-brucellosis-review');
  assert.ok(refVin, 'Referencia VIN 2025 deve existir');
  assert.equal(refVin.year, 2025);

  const refMoeller = record.references.find((r) => r.id === 'moeller-2025-discospondylitis-brucella-multicenter');
  assert.ok(refMoeller, 'Referencia Moeller 2025 deve existir');
  assert.equal(refMoeller.year, 2025);

  const refMeta = record.references.find((r) => r.id === 'global-meta-analysis-2025-canine-brucellosis');
  assert.ok(refMeta, 'Referencia Meta-Analise 2025 deve existir');
  assert.equal(refMeta.year, 2025);

  const refOneHealth = record.references.find((r) => r.id === 'one-health-review-2026-b-canis');
  assert.ok(refOneHealth, 'Referencia One Health 2026 deve existir');
  assert.equal(refOneHealth.year, 2026);

  const refLong = record.references.find((r) => r.id === 'long-2022-canine-discospondylitis-b-canis-cohort');
  assert.ok(refLong, 'Referencia Long 2022 deve existir');

  const refGuarino = record.references.find((r) => r.id === 'guarino-2023-cbm-monitoring-treatment');
  assert.ok(refGuarino, 'Referencia Guarino 2023 CBM deve existir');

  const refNelson = record.references.find((r) => r.id === 'nelson-couto-2020-cap55-brucellosis');
  assert.ok(refNelson, 'Referencia Nelson & Couto deve existir');

  const refFeline = record.references.find((r) => r.id === 'feline-b-abortus-pyometra-2016');
  assert.ok(refFeline, 'Referencia felina B. abortus 2016 deve existir');

  const refCdc = record.references.find((r) => r.id === 'cdc-brucellosis-animals-guidelines-2026');
  assert.ok(refCdc, 'Referencia CDC 2026 deve existir');

  const refPcdt = record.references.find((r) => r.id === 'brasil-pcdt-brucelose-humana-2025');
  assert.ok(refPcdt, 'Referencia PCDT 2025 deve existir');

  const filePath = path.join(
    process.cwd(),
    'modules/consulta-vet/data/seed/diseases.brucelose-caes-gatos.seed.ts',
  );
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  assert.equal(fileContent.includes('**'), false, 'Nenhum marcador de asterisco duplo (**) deve existir no seed');
});
