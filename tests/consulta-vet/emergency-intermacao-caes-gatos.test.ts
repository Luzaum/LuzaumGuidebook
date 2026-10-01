import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { DISEASE_CONSENSUS_LINKS } from '../../modules/consulta-vet/data/seed/diseaseConsensusLinks';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { intermacaoCaesGatosRecord } from '../../modules/consulta-vet/data/seed/diseases.intermacao-caes-gatos.seed';
import { FULL_KEY_LABELS } from '../../modules/consulta-vet/utils/editorialSubsectionLabels';

const SLUG = 'intermacao-caes-gatos';

function getRecord() {
  const fromSeed = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(fromSeed, 'Registro de intermacao-caes-gatos deve existir em diseasesSeed');
  return fromSeed;
}

test('mantem ficha canonica unica e cartao publico sincronizado', () => {
  assert.equal(intermacaoCaesGatosRecord.slug, SLUG);
  assert.equal(intermacaoCaesGatosRecord.id, 'disease-intermacao-caes-gatos');
  assert.ok(
    CONSULTA_VET_PUBLIC_DISEASE_SLUGS.includes(SLUG),
    'Slug deve estar listado em CONSULTA_VET_PUBLIC_DISEASE_SLUGS',
  );

  const cardStub = PUBLIC_CATALOG_DISEASE_CARD_STUBS.find((c) => c.slug === SLUG);
  assert.ok(cardStub, 'Card stub deve existir em PUBLIC_CATALOG_DISEASE_CARD_STUBS');
  assert.equal(cardStub.title, 'Intermação em Cães e Gatos (Heatstroke / Golpe de Calor)');
  assert.deepEqual(cardStub.species, ['dog', 'cat']);
  assert.ok(cardStub.quickSummary.length > 150);
});

test('valida metadados, especies canina e felina e faixa de decisao rapida', () => {
  const record = getRecord();
  assert.deepEqual(record.species, ['dog', 'cat']);
  assert.equal(record.category, 'urgencia-emergencia');
  assert.ok(record.categories && record.categories.includes('terapia-intensiva'));
  assert.ok(record.categories && record.categories.includes('clinica-medica'));
  assert.ok(record.categories && record.categories.includes('cuidados-criticos'));
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

  assert.match(rich.lead, /RECOVER First Aid 2026/i);
  assert.match(rich.lead, /janela oculta de 12 a 24 horas/i);
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

test('valida vinculos com consensos recover 2026, aaha 2024, iris 2026 e curative', () => {
  const record = getRecord();
  assert.ok(record.relatedConsensusSlugs, 'relatedConsensusSlugs deve existir');
  assert.ok(record.relatedConsensusSlugs.includes('recover-primeiros-socorros-2026'));
  assert.ok(record.relatedConsensusSlugs.includes('aaha-fluidoterapia-caes-gatos-2024'));
  assert.ok(record.relatedConsensusSlugs.includes('iris-lra-2026'));
  assert.ok(record.relatedConsensusSlugs.includes('curative-risco-trombotico-2022'));

  const consensusLinks = DISEASE_CONSENSUS_LINKS[SLUG];
  assert.ok(consensusLinks, 'Slug deve ter vinculos em DISEASE_CONSENSUS_LINKS');
  assert.ok(consensusLinks.includes('recover-primeiros-socorros-2026'));
  assert.ok(consensusLinks.includes('aaha-fluidoterapia-caes-gatos-2024'));
});

test('valida mapeamento completo de rotulos editoriais de subsecoes', () => {
  const record = getRecord();
  const sectionsToCheck = [
    record.etiology,
    record.epidemiology,
    record.pathogenesisTransmission,
    record.pathophysiology,
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
    assert.ok(f.url.startsWith('/consulta-vet/intermacao-caes-gatos/'), 'URL deve apontar para /consulta-vet/intermacao-caes-gatos/');

    const relPath = f.url.replace(/^\/+/, '');
    const publicPath = path.join(rootDir, 'public', relPath);
    const distPath = path.join(rootDir, 'dist', relPath);

    assert.ok(fs.existsSync(publicPath), `Arquivo de imagem publico deve existir em disco: ${publicPath}`);
    assert.ok(fs.existsSync(distPath), `Arquivo de imagem distribuido deve existir em disco: ${distPath}`);

    const stat = fs.statSync(publicPath);
    assert.ok(stat.size > 10000, `Arquivo de imagem deve ter tamanho realista (>10KB): ${publicPath}`);
  }
});

test('valida tabelas clinicas obrigatorias da intermacao (Tabelas 1 a 6)', () => {
  const record = getRecord();

  const et = record.etiology as Record<string, unknown>;
  assert.ok(et.tabelaDiferenciacaoTermicaIntermacaoVsFebre, 'Tabela 1 de diferenciacao termica deve existir');

  const ep = record.epidemiology as Record<string, unknown>;
  assert.ok(ep.tabelaComparativaEpidemiologiaCaesVsGatos, 'Tabela 2 comparativa caes vs gatos deve existir');

  const pt = record.pathogenesisTransmission as Record<string, unknown>;
  assert.ok(pt.tabelaFisiopatologiaSistemicaOrgaoAlvo, 'Tabela 3 de fisiopatologia orgao a orgao deve existir');

  const dg = record.diagnosis as Record<string, unknown>;
  assert.ok(dg.tabelaMatrizDiagnosticaLaboratorialSeriada, 'Tabela 4 de matriz diagnostica seriada deve existir');

  const tr = record.treatment as Record<string, unknown>;
  assert.ok(tr.tabelaFarmacoterapiaSuporteIntermacao, 'Tabela 5 de farmacoterapia de suporte deve existir');
  assert.ok(tr.tabelaProtocoloResfriamentoRecover2026, 'Tabela 6 de protocolo de resfriamento RECOVER 2026 deve existir');
});

test('valida dez erros fatais e protocolo de plantao em 10 passos', () => {
  const record = getRecord();
  const comp = record.complications as Record<string, string>;

  assert.ok(comp.dezErrosFataisIntermacaoCaesGatos, 'dezErrosFataisIntermacaoCaesGatos deve existir');
  assert.match(comp.dezErrosFataisIntermacaoCaesGatos, /1\./);
  assert.match(comp.dezErrosFataisIntermacaoCaesGatos, /5\./);
  assert.match(comp.dezErrosFataisIntermacaoCaesGatos, /10\./);

  assert.ok(comp.protocoloPlantaoIntermacao10Passos, 'protocoloPlantaoIntermacao10Passos deve existir');
  assert.match(comp.protocoloPlantaoIntermacao10Passos, /1\./);
  assert.match(comp.protocoloPlantaoIntermacao10Passos, /5\./);
  assert.match(comp.protocoloPlantaoIntermacao10Passos, /10\./);
});

test('valida integridade de referencias cientificas e ausencia absoluta de asteriscos duplos', () => {
  const record = getRecord();
  assert.ok(record.references && record.references.length >= 12);

  const refRecover = record.references.find((r) => r.id === 'ref-recover-first-aid-2026');
  assert.ok(refRecover, 'Referencia RECOVER 2026 deve existir');

  const refYanai = record.references.find((r) => r.id === 'ref-yanai-rotem-2024');
  assert.ok(refYanai, 'Referencia Yanai 2024 deve existir');

  const refBruchim2017 = record.references.find((r) => r.id === 'ref-bruchim-hemostasis-2017');
  assert.ok(refBruchim2017, 'Referencia Bruchim 2017 deve existir');

  const refSegev = record.references.find((r) => r.id === 'ref-segev-kidney-biomarkers-2015');
  assert.ok(refSegev, 'Referencia Segev 2015 deve existir');

  const refBruchim2006 = record.references.find((r) => r.id === 'ref-bruchim-heatstroke-54dogs-2006');
  assert.ok(refBruchim2006, 'Referencia Bruchim 2006 deve existir');

  const refAroch = record.references.find((r) => r.id === 'ref-aroch-nrbc-2009');
  assert.ok(refAroch, 'Referencia Aroch 2009 deve existir');

  const refHall2020 = record.references.find((r) => r.id === 'ref-hall-vetcompass-2020');
  assert.ok(refHall2020, 'Referencia Hall VetCompass 2020 deve existir');

  const refHall2022 = record.references.find((r) => r.id === 'ref-hall-feline-surveillance-2022');
  assert.ok(refHall2022, 'Referencia Hall 2022 deve existir');

  const refCudney = record.references.find((r) => r.id === 'ref-cudney-dryer-cats-2021');
  assert.ok(refCudney, 'Referencia Cudney 2021 deve existir');

  const refPlumb = record.references.find((r) => r.id === 'ref-plumb-drug-handbook-10e');
  assert.ok(refPlumb, 'Referencia Plumb deve existir');

  const refAaha = record.references.find((r) => r.id === 'ref-aaha-fluid-therapy-2024');
  assert.ok(refAaha, 'Referencia AAHA 2024 deve existir');

  const jsonStr = JSON.stringify(record);
  assert.equal(
    jsonStr.includes('**'),
    false,
    'Registro canonico nao deve conter marcadores literais de asterisco duplo (**)',
  );
});
