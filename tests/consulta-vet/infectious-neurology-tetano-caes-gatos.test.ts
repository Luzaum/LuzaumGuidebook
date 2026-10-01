import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { DISEASE_CONSENSUS_LINKS } from '../../modules/consulta-vet/data/seed/diseaseConsensusLinks';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { tetanoCaesGatosRecord } from '../../modules/consulta-vet/data/seed/diseases.tetano-caes-gatos.seed';
import { FULL_KEY_LABELS } from '../../modules/consulta-vet/utils/editorialSubsectionLabels';

const SLUG = 'tetano-caes-gatos';

function getRecord() {
  const fromSeed = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(fromSeed, 'Registro de tetano-caes-gatos deve existir em diseasesSeed');
  return fromSeed;
}

test('mantem ficha canonica unica e cartao publico sincronizado', () => {
  assert.equal(tetanoCaesGatosRecord.slug, SLUG);
  assert.equal(tetanoCaesGatosRecord.id, 'disease-tetano-caes-gatos');
  assert.ok(
    CONSULTA_VET_PUBLIC_DISEASE_SLUGS.includes(SLUG),
    'Slug deve estar listado em CONSULTA_VET_PUBLIC_DISEASE_SLUGS',
  );

  const cardStub = PUBLIC_CATALOG_DISEASE_CARD_STUBS.find((c) => c.slug === SLUG);
  assert.ok(cardStub, 'Card stub deve existir em PUBLIC_CATALOG_DISEASE_CARD_STUBS');
  assert.equal(cardStub.title, 'Tétano em Cães e Gatos (Clostridium tetani)');
  assert.deepEqual(cardStub.species, ['dog', 'cat']);
  assert.ok(cardStub.quickSummary.length > 150);
});

test('valida metadados, especies canina e felina e faixa de decisao rapida', () => {
  const record = getRecord();
  assert.deepEqual(record.species, ['dog', 'cat']);
  assert.equal(record.category, 'neurologia');
  assert.ok(record.categories && record.categories.includes('urgencia-emergencia'));
  assert.ok(record.categories && record.categories.includes('terapia-intensiva'));
  assert.ok(record.categories && record.categories.includes('infectologia'));
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

  assert.match(rich.lead, /sinaptobrevina|VAMP|freio/i);
  assert.match(rich.lead, /GABA|glicina|espasmo/i);
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
    assert.ok(f.url.startsWith('/consulta-vet/tetano-caes-gatos/'), 'URL deve apontar para /consulta-vet/tetano-caes-gatos/');

    const relPath = f.url.replace(/^\/+/, '');
    const publicPath = path.join(rootDir, 'public', relPath);
    const distPath = path.join(rootDir, 'dist', relPath);

    assert.ok(fs.existsSync(publicPath), `Arquivo de imagem publico deve existir em disco: ${publicPath}`);
    assert.ok(fs.existsSync(distPath), `Arquivo de imagem distribuido deve existir em disco: ${distPath}`);

    const stat = fs.statSync(publicPath);
    assert.ok(stat.size > 10000, `Arquivo de imagem deve ter tamanho realista (>10KB): ${publicPath}`);
  }
});

test('valida tabelas clinicas obrigatorias do tetano (Tabelas 1 a 6)', () => {
  const record = getRecord();

  const et = record.etiology as Record<string, unknown>;
  assert.ok(et.tabelaDiferencialEspasmoERigidez, 'Tabela 1 de diagnostico diferencial de espasmo e rigidez deve existir');

  const ep = record.epidemiology as Record<string, unknown>;
  assert.ok(ep.tabelaComparativaCaesVsGatosTetano, 'Tabela 2 comparativa caes vs gatos de tetano deve existir');

  const pt = record.pathogenesisTransmission as Record<string, unknown>;
  assert.ok(pt.tabelaClassificacaoGravidadeBurkittZitzl, 'Tabela 3 de classificacao de gravidade Burkitt/Zitzl deve existir');

  const dg = record.diagnosis as Record<string, unknown>;
  assert.ok(dg.tabelaPainelDiagnosticoLaboratorialEEletrofisiologico, 'Tabela 4 de painel laboratorial e eletrofisiologico deve existir');
  assert.ok(dg.tabelaMonitoramentoVentilatorioEManejoViaAerea, 'Tabela 5 de monitoramento ventilatorio e via aerea deve existir');

  const tr = record.treatment as Record<string, unknown>;
  assert.ok(tr.tabelaFarmacoterapiaDeEmergenciaEUtiTetano, 'Tabela 6 de farmacoterapia de emergencia e UTI deve existir');
});

test('valida complicacoes de Guedra 2021, dez erros fatais e protocolo de plantao em 10 passos', () => {
  const record = getRecord();
  const comp = record.complications as Record<string, unknown>;

  assert.ok(comp.complicacoesCriticasRespiratoriasGuedra2021, 'Complicacoes respiratorias de Guedra 2021 deve existir');
  const guedraText = String(comp.complicacoesCriticasRespiratoriasGuedra2021);
  assert.match(guedraText, /Guedra/i);
  assert.match(guedraText, /26,4%/);
  assert.match(guedraText, /14,3%/);
  assert.match(guedraText, /94,8%/);

  assert.ok(comp.dezErrosFataisTetanoCaesGatos, 'Dez erros fatais deve existir em complications');
  const errosText = String(comp.dezErrosFataisTetanoCaesGatos);
  assert.match(errosText, /\(1\)/);
  assert.match(errosText, /\(10\)/);
  assert.match(errosText, /peróxido de hidrogênio|H2O2/i);
  assert.match(errosText, /antitoxina|diazepam/i);
  assert.match(errosText, /Dussaux/i);

  assert.ok(comp.protocoloPlantaoTetano10Passos, 'Protocolo de plantao em 10 passos deve existir em complications');
  const protocoloText = String(comp.protocoloPlantaoTetano10Passos);
  assert.match(protocoloText, /Passo 1/);
  assert.match(protocoloText, /Passo 10/);
  assert.match(protocoloText, /Triagem/i);
  assert.match(protocoloText, /Escuridão|sensorial/i);
  assert.match(protocoloText, /Traqueostomia|ventila/i);
});

test('valida integridade de referencias cientificas e ausencia absoluta de asteriscos duplos', () => {
  const record = getRecord();
  assert.ok(record.references && record.references.length >= 15, 'Deveria ter ao menos 15 referencias cientificas');

  const refDussaux = record.references.find((r) => r.id === 'dussaux-2024-feline-tetanus-multicentric');
  assert.ok(refDussaux, 'Referencia Dussaux 2024 deve existir');
  assert.equal(refDussaux.year, 2024);

  const refZitzl = record.references.find((r) => r.id === 'zitzl-2022-canine-tetanus-42cases');
  assert.ok(refZitzl, 'Referencia Zitzl 2022 deve existir');
  assert.equal(refZitzl.year, 2022);

  const refGuedra = record.references.find((r) => r.id === 'guedra-2021-respiratory-complications-tetanus');
  assert.ok(refGuedra, 'Referencia Guedra 2021 deve existir');
  assert.equal(refGuedra.year, 2021);

  const refPopoff = record.references.find((r) => r.id === 'popoff-2020-tetanus-in-animals');
  assert.ok(refPopoff, 'Referencia Popoff 2020 deve existir');
  assert.equal(refPopoff.year, 2020);

  const refBurkitt = record.references.find((r) => r.id === 'burkitt-2007-risk-factors-tetanus');
  assert.ok(refBurkitt, 'Referencia Burkitt 2007 deve existir');

  const refNelson = record.references.find((r) => r.id === 'nelson-couto-2020-cap67-muscle');
  assert.ok(refNelson, 'Referencia Nelson & Couto deve existir');

  const refPlumb = record.references.find((r) => r.id === 'plumb-2023-drug-handbook-methocarbamol');
  assert.ok(refPlumb, 'Referencia Plumb deve existir');

  const filePath = path.join(
    process.cwd(),
    'modules/consulta-vet/data/seed/diseases.tetano-caes-gatos.seed.ts',
  );
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  assert.equal(fileContent.includes('**'), false, 'Nenhum marcador de asterisco duplo (**) deve existir no seed');
});
