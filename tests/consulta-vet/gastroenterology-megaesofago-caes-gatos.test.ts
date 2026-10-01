import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { DISEASE_CONSENSUS_LINKS } from '../../modules/consulta-vet/data/seed/diseaseConsensusLinks';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { megaesofagoCaesGatosRecord } from '../../modules/consulta-vet/data/seed/diseases.megaesofago-caes-gatos.seed';
import { FULL_KEY_LABELS } from '../../modules/consulta-vet/utils/editorialSubsectionLabels';

const SLUG = 'megaesofago-caes-gatos';

function getRecord() {
  const fromSeed = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(fromSeed, 'Registro de megaesofago-caes-gatos deve existir em diseasesSeed');
  return fromSeed;
}

test('mantem ficha canonica unica e cartao publico sincronizado', () => {
  assert.equal(megaesofagoCaesGatosRecord.slug, SLUG);
  assert.equal(megaesofagoCaesGatosRecord.id, 'disease-megaesofago-caes-gatos');
  assert.ok(
    CONSULTA_VET_PUBLIC_DISEASE_SLUGS.includes(SLUG),
    'Slug deve estar listado em CONSULTA_VET_PUBLIC_DISEASE_SLUGS',
  );

  const cardStub = PUBLIC_CATALOG_DISEASE_CARD_STUBS.find((c) => c.slug === SLUG);
  assert.ok(cardStub, 'Card stub deve existir em PUBLIC_CATALOG_DISEASE_CARD_STUBS');
  assert.equal(cardStub.title, 'Megaesôfago em Cães e Gatos');
  assert.deepEqual(cardStub.species, ['dog', 'cat']);
  assert.ok(cardStub.quickSummary.length > 150);
});

test('valida metadados, especies canina e felina e faixa de decisao rapida', () => {
  const record = getRecord();
  assert.deepEqual(record.species, ['dog', 'cat']);
  assert.equal(record.category, 'gastroenterologia');
  assert.ok(record.categories && record.categories.includes('neurologia'));
  assert.ok(record.categories && record.categories.includes('pneumologia'));
  assert.ok(record.categories && record.categories.includes('nutricao'));
  assert.ok(record.categories && record.categories.includes('emergencia'));
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

  assert.match(rich.lead, /transporte|estase|dilata|aspir/i);
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
    assert.ok(f.url.startsWith('/consulta-vet/megaesofago-caes-gatos/'), 'URL deve apontar para /consulta-vet/megaesofago-caes-gatos/');

    const relPath = f.url.replace(/^\/+/, '');
    const publicPath = path.join(rootDir, 'public', relPath);
    const distPath = path.join(rootDir, 'dist', relPath);

    assert.ok(fs.existsSync(publicPath), `Arquivo de imagem publico deve existir em disco: ${publicPath}`);
    assert.ok(fs.existsSync(distPath), `Arquivo de imagem distribuido deve existir em disco: ${distPath}`);

    const stat = fs.statSync(publicPath);
    assert.ok(stat.size > 10000, `Arquivo de imagem deve ter tamanho realista (>10KB): ${publicPath}`);
  }
});

test('valida tabelas clinicas obrigatorias do megaesofago (Tabelas 1 a 6)', () => {
  const record = getRecord();

  const et = record.etiology as Record<string, unknown>;
  assert.ok(et.tabelaClassificacaoEtiologica, 'Tabela 1 de classificacao etiologica deve existir');

  const ep = record.epidemiology as Record<string, unknown>;
  assert.ok(ep.tabelaAnatomiaEFarmacologiaComparada, 'Tabela 2 de anatomia e farmacologia comparada deve existir');

  const cs = record.clinicalSignsPathophysiology as Record<string, unknown>;
  assert.ok(cs.tabelaRegurgitacaoVsVomito, 'Tabela 3 de regurgitacao vs vomito deve existir');

  const dg = record.diagnosis as Record<string, unknown>;
  assert.ok(dg.tabelaPainelDiagnosticoEtiologico, 'Tabela 4 de painel diagnostico etiologico deve existir');

  const tr = record.treatment as Record<string, unknown>;
  assert.ok(tr.tabelaManejoNutricionalETerapeutico, 'Tabela 5 de manejo nutricional e terapeutico deve existir');

  const pr = record.prevention as Record<string, unknown>;
  assert.ok(pr.tabelaPrognosticoEFatoresSobrevida, 'Tabela 6 de prognostico e sobrevida deve existir');
});

test('valida dez erros fatais e protocolo de plantao em 10 passos', () => {
  const record = getRecord();
  const comp = record.complications as Record<string, unknown>;

  assert.ok(comp.dezErrosFataisMegaesofago, 'Dez erros fatais deve existir em complications');
  const errosText = String(comp.dezErrosFataisMegaesofago);
  assert.match(errosText, /\(1\)/);
  assert.match(errosText, /\(10\)/);
  assert.match(errosText, /Bailey/i);
  assert.match(errosText, /MCHR2/i);
  assert.match(errosText, /AChR-Ab|Miastenia/i);

  assert.ok(comp.protocoloPlantaoMegaesofago10Passos, 'Protocolo de plantao em 10 passos deve existir em complications');
  const protocoloText = String(comp.protocoloPlantaoMegaesofago10Passos);
  assert.match(protocoloText, /Passo 1/);
  assert.match(protocoloText, /Passo 10/);
  assert.match(protocoloText, /Triagem/i);
  assert.match(protocoloText, /Oxigen/i);
  assert.match(protocoloText, /Bailey|Nutri/i);
});

test('valida integridade de referencias cientificas e ausencia absoluta de asteriscos duplos', () => {
  const record = getRecord();
  assert.ok(record.references && record.references.length >= 15, 'Deveria ter ao menos 15 referencias cientificas');

  const refVinDog = record.references.find((r) => r.id === 'vin-2025-canine-megaesophagus-guide');
  assert.ok(refVinDog, 'Referencia VIN 2025 cao deve existir');
  assert.equal(refVinDog.year, 2025);

  const refVinCat = record.references.find((r) => r.id === 'vin-2025-feline-megaesophagus-guide');
  assert.ok(refVinCat, 'Referencia VIN 2025 gato deve existir');
  assert.equal(refVinCat.year, 2025);

  const refBell = record.references.find((r) => r.id === 'bell-2022-mchr2-german-shepherd-plos');
  assert.ok(refBell, 'Referencia Bell 2022 MCHR2 deve existir');

  const refHytonen = record.references.find((r) => r.id === 'hytonen-2025-mchr2-white-swiss-shepherd');
  assert.ok(refHytonen, 'Referencia Hytonen 2025 deve existir');

  const refFriedenberg = record.references.find((r) => r.id === 'friedenberg-2023-great-dane-genomics');
  assert.ok(refFriedenberg, 'Referencia Friedenberg 2023 deve existir');

  const refMcBrearty = record.references.find((r) => r.id === 'mcbrearty-2011-megaesophagus-71-dogs');
  assert.ok(refMcBrearty, 'Referencia McBrearty 2011 deve existir');

  const refHaines = record.references.find((r) => r.id === 'haines-2022-vfss-individualized-feeding');
  assert.ok(refHaines, 'Referencia Haines 2022 VFSS deve existir');

  const refQuintavalla = record.references.find((r) => r.id === 'quintavalla-2017-sildenafil-puppies');
  assert.ok(refQuintavalla, 'Referencia Quintavalla 2017 Sildenafil deve existir');

  const refMehain = record.references.find((r) => r.id === 'mehain-2022-sildenafil-generalized-dogs');
  assert.ok(refMehain, 'Referencia Mehain 2022 deve existir');

  const refSinha = record.references.find((r) => r.id === 'sinha-2026-caregiver-burden-megaesophagus');
  assert.ok(refSinha, 'Referencia Sinha JAVMA 2026 deve existir');
  assert.equal(refSinha.year, 2026);

  const refTheron = record.references.find((r) => r.id === 'theron-2024-feline-laryngomucocele-resolution');
  assert.ok(refTheron, 'Referencia Theron 2024 laringomucocele deve existir');

  const refNelson = record.references.find((r) => r.id === 'nelson-couto-2020-cap29-esophagus');
  assert.ok(refNelson, 'Referencia Nelson & Couto deve existir');

  const refBsava = record.references.find((r) => r.id === 'bsava-manual-gastroenterology-2020');
  assert.ok(refBsava, 'Referencia BSAVA Gastroenterology deve existir');

  const filePath = path.join(
    process.cwd(),
    'modules/consulta-vet/data/seed/diseases.megaesofago-caes-gatos.seed.ts',
  );
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  assert.equal(fileContent.includes('**'), false, 'Nenhum marcador de asterisco duplo (**) deve existir no seed');
});
