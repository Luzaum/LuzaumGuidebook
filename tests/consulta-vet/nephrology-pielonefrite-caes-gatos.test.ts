import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { DISEASE_CONSENSUS_LINKS } from '../../modules/consulta-vet/data/seed/diseaseConsensusLinks';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { pielonefriteCaesGatosRecord } from '../../modules/consulta-vet/data/seed/diseases.pielonefrite-caes-gatos.seed';
import { FULL_KEY_LABELS } from '../../modules/consulta-vet/utils/editorialSubsectionLabels';

const SLUG = 'pielonefrite-caes-gatos';

function getRecord() {
  const fromSeed = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(fromSeed, 'Registro de pielonefrite-caes-gatos deve existir em diseasesSeed');
  return fromSeed;
}

test('mantem ficha canonica unica e cartao publico sincronizado', () => {
  assert.equal(pielonefriteCaesGatosRecord.slug, SLUG);
  assert.equal(pielonefriteCaesGatosRecord.id, 'disease-pielonefrite-caes-gatos');
  assert.ok(
    CONSULTA_VET_PUBLIC_DISEASE_SLUGS.includes(SLUG),
    'Slug deve estar listado em CONSULTA_VET_PUBLIC_DISEASE_SLUGS',
  );

  const cardStub = PUBLIC_CATALOG_DISEASE_CARD_STUBS.find((c) => c.slug === SLUG);
  assert.ok(cardStub, 'Card stub deve existir em PUBLIC_CATALOG_DISEASE_CARD_STUBS');
  assert.equal(cardStub.title, 'Pielonefrite em Cães e Gatos (Pielonefrite Bacteriana / Fúngica)');
  assert.deepEqual(cardStub.species, ['dog', 'cat']);
  assert.ok(cardStub.quickSummary.length > 150);
});

test('valida metadados, especies canina e felina e faixa de decisao rapida', () => {
  const record = getRecord();
  assert.deepEqual(record.species, ['dog', 'cat']);
  assert.equal(record.category, 'nefrologia-urologia');
  assert.ok(record.categories && record.categories.includes('infectologia'));
  assert.ok(record.categories && record.categories.includes('urgencia-emergencia'));
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

  assert.match(rich.lead, /Consenso Delphi 2026/i);
  assert.match(rich.lead, /breakpoints plasmáticos/i);
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

test('valida vinculos com consensos weese 2026, iscaid 2019, iris 2026 e acvim urolitiase', () => {
  const record = getRecord();
  assert.ok(record.relatedConsensusSlugs, 'relatedConsensusSlugs deve existir');
  assert.ok(record.relatedConsensusSlugs.includes('weese-terminologia-infeccoes-urinarias-2026'));
  assert.ok(record.relatedConsensusSlugs.includes('iscaid-itu-caes-gatos-2019'));
  assert.ok(record.relatedConsensusSlugs.includes('iris-lra-2026'));
  assert.ok(record.relatedConsensusSlugs.includes('acvim-urolitiase-caes-gatos-2016'));

  const consensusLinks = DISEASE_CONSENSUS_LINKS[SLUG];
  assert.ok(consensusLinks, 'Slug deve ter vinculos em DISEASE_CONSENSUS_LINKS');
  assert.ok(consensusLinks.includes('weese-terminologia-infeccoes-urinarias-2026'));
  assert.ok(consensusLinks.includes('iscaid-itu-caes-gatos-2019'));
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
    assert.ok(f.url.startsWith('/consulta-vet/pielonefrite-caes-gatos/'), 'URL deve apontar para /consulta-vet/pielonefrite-caes-gatos/');

    const relPath = f.url.replace(/^\/+/, '');
    const publicPath = path.join(rootDir, 'public', relPath);
    const distPath = path.join(rootDir, 'dist', relPath);

    assert.ok(fs.existsSync(publicPath), `Arquivo de imagem publico deve existir em disco: ${publicPath}`);
    assert.ok(fs.existsSync(distPath), `Arquivo de imagem distribuido deve existir em disco: ${distPath}`);

    const stat = fs.statSync(publicPath);
    assert.ok(stat.size > 10000, `Arquivo de imagem deve ter tamanho realista (>10KB): ${publicPath}`);
  }
});

test('valida tabelas clinicas obrigatorias da pielonefrite (Tabelas 1 a 6)', () => {
  const record = getRecord();

  const et = record.etiology as Record<string, unknown>;
  assert.ok(et.tabelaClassificacaoDelphi2026, 'Tabela 1 de classificacao Delphi 2026 deve existir');

  const ep = record.epidemiology as Record<string, unknown>;
  assert.ok(ep.tabelaComparativaCaesVsGatosPielonefrite, 'Tabela 2 de comparacao caes vs gatos deve existir');

  const pp = record.pathophysiology as Record<string, unknown>;
  assert.ok(pp.tabelaDiagnosticoDiferencialNefropatiasInfeccoes, 'Tabela 3 de diagnostico diferencial deve existir');

  const dg = record.diagnosis as Record<string, unknown>;
  assert.ok(dg.tabelaMatrizDiagnosticaPielonefrite, 'Tabela 4 de matriz diagnostica deve existir');

  const tr = record.treatment as Record<string, unknown>;
  assert.ok(tr.tabelaFarmacoterapiaAntimicrobianaPielonefrite, 'Tabela 5 de farmacoterapia deve existir');
  assert.ok(tr.tabelaProtocoloEscalonadoUtiPielonefrite, 'Tabela 6 de protocolo escalonado de UTI deve existir');
});

test('valida dez erros fatais e protocolo de plantao em 10 passos', () => {
  const record = getRecord();
  const comp = record.complications as Record<string, string>;

  assert.ok(comp.dezErrosFataisPielonefriteCaesGatos, 'dezErrosFataisPielonefriteCaesGatos deve existir');
  assert.match(comp.dezErrosFataisPielonefriteCaesGatos, /1\./);
  assert.match(comp.dezErrosFataisPielonefriteCaesGatos, /5\./);
  assert.match(comp.dezErrosFataisPielonefriteCaesGatos, /10\./);

  assert.ok(comp.protocoloPlantaoPielonefrite10Passos, 'protocoloPlantaoPielonefrite10Passos deve existir');
  assert.match(comp.protocoloPlantaoPielonefrite10Passos, /1\./);
  assert.match(comp.protocoloPlantaoPielonefrite10Passos, /5\./);
  assert.match(comp.protocoloPlantaoPielonefrite10Passos, /10\./);
});

test('valida integridade de referencias cientificas e ausencia absoluta de asteriscos duplos', () => {
  const record = getRecord();
  assert.ok(record.references && record.references.length >= 12);

  const refWeese = record.references.find((r) => r.id === 'ref-weese-delphi-2026');
  assert.ok(refWeese, 'Referencia Weese Delphi 2026 deve existir');

  const refIscaid = record.references.find((r) => r.id === 'ref-iscaid-urinary-2019');
  assert.ok(refIscaid, 'Referencia ISCAID 2019 deve existir');

  const refNelson = record.references.find((r) => r.id === 'ref-nelson-couto-6ed-cap42');
  assert.ok(refNelson, 'Referencia Nelson & Couto Cap 42 deve existir');

  const refJessen = record.references.find((r) => r.id === 'ref-jessen-saa-felina-2026');
  assert.ok(refJessen, 'Referencia Jessen 2026 SAA deve existir');

  const refFidanzio = record.references.find((r) => r.id === 'ref-fidanzio-crp-caes-2026');
  assert.ok(refFidanzio, 'Referencia Fidanzio 2026 CRP deve existir');

  const refBouillon = record.references.find((r) => r.id === 'ref-bouillon-pielonefrite-caes-2018');
  assert.ok(refBouillon, 'Referencia Bouillon 2018 deve existir');

  const refQuimby = record.references.find((r) => r.id === 'ref-quimby-pieloectasia-gatos-2017');
  assert.ok(refQuimby, 'Referencia Quimby 2017 deve existir');

  const jsonStr = JSON.stringify(record);
  assert.equal(
    jsonStr.includes('**'),
    false,
    'Registro canonico nao deve conter marcadores literais de asterisco duplo (**)',
  );
});
