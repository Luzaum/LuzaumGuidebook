import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { DISEASE_CONSENSUS_LINKS } from '../../modules/consulta-vet/data/seed/diseaseConsensusLinks';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { lesaoRenalAgudaCaninaRecord } from '../../modules/consulta-vet/data/seed/diseases.lesao-renal-aguda-canina.seed';
import { FULL_KEY_LABELS } from '../../modules/consulta-vet/utils/editorialSubsectionLabels';

const SLUG = 'lesao-renal-aguda-canina';

function getRecord() {
  const fromSeed = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(fromSeed, 'Registro de lesao-renal-aguda-canina deve existir em diseasesSeed');
  return fromSeed;
}

test('mantem ficha canonica unica e cartao publico sincronizado', () => {
  assert.equal(lesaoRenalAgudaCaninaRecord.slug, SLUG);
  assert.equal(lesaoRenalAgudaCaninaRecord.id, 'disease-lesao-renal-aguda-canina');
  assert.ok(
    CONSULTA_VET_PUBLIC_DISEASE_SLUGS.includes(SLUG),
    'Slug deve estar listado em CONSULTA_VET_PUBLIC_DISEASE_SLUGS',
  );

  const cardStub = PUBLIC_CATALOG_DISEASE_CARD_STUBS.find((c) => c.slug === SLUG);
  assert.ok(cardStub, 'Card stub deve existir em PUBLIC_CATALOG_DISEASE_CARD_STUBS');
  assert.equal(cardStub.title, 'Lesão Renal Aguda em Cães (LRA / IRA / AKI)');
  assert.deepEqual(cardStub.species, ['dog']);
  assert.ok(cardStub.quickSummary.length > 150);
});

test('valida metadados, especie canina estrita e faixa de decisao rapida', () => {
  const record = getRecord();
  assert.deepEqual(record.species, ['dog']);
  assert.equal(record.category, 'nefrologia-urologia');
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

  assert.match(rich.lead, /Ins and Outs/i);
  assert.match(rich.lead, /cinética da creatinina/i);
  assert.ok(rich.pillars && rich.pillars.length === 4, 'Deveria ter exatamente 4 pilares conceituais');

  assert.ok(rich.diagnosticFlow, 'diagnosticFlow deve existir');
  assert.equal(rich.diagnosticFlow.steps.length, 6);

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

test('valida vinculos com consensos iris 2026, acvim leptospirose, iscaid e urolitiase', () => {
  const record = getRecord();
  assert.ok(record.relatedConsensusSlugs, 'relatedConsensusSlugs deve existir');
  assert.ok(record.relatedConsensusSlugs.includes('iris-lra-2026'));
  assert.ok(record.relatedConsensusSlugs.includes('acvim-leptospirose-caes-2023'));
  assert.ok(record.relatedConsensusSlugs.includes('iscaid-itu-caes-gatos-2019'));
  assert.ok(record.relatedConsensusSlugs.includes('consenso-cardiorrenal-2015'));
  assert.ok(record.relatedConsensusSlugs.includes('acvim-urolitiase-caes-gatos-2016'));

  const consensusLinks = DISEASE_CONSENSUS_LINKS[SLUG];
  assert.ok(consensusLinks, 'Slug deve ter vinculos em DISEASE_CONSENSUS_LINKS');
  assert.ok(consensusLinks.includes('iris-lra-2026'));
  assert.ok(consensusLinks.includes('acvim-leptospirose-caes-2023'));
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
    if (!section || typeof section !== 'object' || Array.isArray(section)) continue;
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

    const cleanUrl = f.url.startsWith('/') ? f.url.slice(1) : f.url;
    const publicPath = path.join(rootDir, 'public', cleanUrl.replace(/^consulta-vet\//, 'consulta-vet/'));
    const distPath = path.join(rootDir, 'dist', cleanUrl.replace(/^consulta-vet\//, 'consulta-vet/'));

    assert.ok(fs.existsSync(publicPath), `Arquivo de imagem publica deve existir em disco: ${publicPath}`);
    assert.ok(fs.existsSync(distPath), `Arquivo de imagem em dist deve existir em disco: ${distPath}`);

    const statPublic = fs.statSync(publicPath);
    assert.ok(statPublic.size > 2048, `Arquivo publico ${publicPath} deve ter mais de 2 KB (encontrado ${statPublic.size} bytes)`);
  }
});

test('valida tabelas clinicas obrigatorias da LRA canina (Tabelas 1 a 6)', () => {
  const record = getRecord();

  const et = record.etiology as Record<string, any>;
  assert.ok(et.tabelaEstadiamentoIrisCanina, 'Tabela 1 de estadiamento IRIS 2026 deve existir em etiology');
  assert.equal(et.tabelaEstadiamentoIrisCanina.headers.length, 5);
  assert.equal(et.tabelaEstadiamentoIrisCanina.rows.length, 5);

  const ep = record.epidemiology as Record<string, any>;
  assert.ok(ep.tabelaEtiologiasEToxinasCaninas, 'Tabela 2 de etiologias e toxinas deve existir em epidemiology');
  assert.equal(ep.tabelaEtiologiasEToxinasCaninas.headers.length, 4);
  assert.ok(ep.tabelaEtiologiasEToxinasCaninas.rows.length >= 4);

  const pp = record.pathophysiology as Record<string, any>;
  assert.ok(pp.tabelaDiagnosticoDiferencialLraCanina, 'Tabela 3 de diagnostico diferencial deve existir em pathophysiology');
  assert.equal(pp.tabelaDiagnosticoDiferencialLraCanina.headers.length, 5);
  assert.ok(pp.tabelaDiagnosticoDiferencialLraCanina.rows.length >= 4);

  const dg = record.diagnosis as Record<string, any>;
  assert.ok(dg.tabelaArmadaDiagnosticaLraCanina, 'Tabela 4 de armada diagnostica deve existir em diagnosis');
  assert.equal(dg.tabelaArmadaDiagnosticaLraCanina.headers.length, 4);
  assert.ok(dg.tabelaArmadaDiagnosticaLraCanina.rows.length >= 5);

  const tr = record.treatment as Record<string, any>;
  assert.ok(tr.tabelaFarmacoterapiaHipercalemiaESuporteCanino, 'Tabela 5 de farmacoterapia deve existir em treatment');
  assert.equal(tr.tabelaFarmacoterapiaHipercalemiaESuporteCanino.headers.length, 5);
  assert.ok(tr.tabelaFarmacoterapiaHipercalemiaESuporteCanino.rows.length >= 6);

  assert.ok(tr.tabelaProtocoloEscalonadoUtiCanina, 'Tabela 6 de protocolo escalonado deve existir em treatment');
  assert.equal(tr.tabelaProtocoloEscalonadoUtiCanina.headers.length, 4);
  assert.equal(tr.tabelaProtocoloEscalonadoUtiCanina.rows.length, 4);
});

test('valida dez erros fatais e protocolo de plantao em 10 passos', () => {
  const record = getRecord();
  assert.ok(record.complications, 'complications deve existir');
  const comp = record.complications as Record<string, any>;

  assert.ok(comp.dezErrosFataisLraCanina, 'dezErrosFataisLraCanina deve existir em complications');
  assert.match(comp.dezErrosFataisLraCanina, /lavar o rim/i);
  assert.match(comp.dezErrosFataisLraCanina, /Ins and Outs/i);
  assert.match(comp.dezErrosFataisLraCanina, /leptospirose/i);
  assert.match(comp.dezErrosFataisLraCanina, /1\)/);
  assert.match(comp.dezErrosFataisLraCanina, /5\)/);
  assert.match(comp.dezErrosFataisLraCanina, /10\)/);

  assert.ok(record.prevention, 'prevention deve existir');
  const prev = record.prevention as Record<string, any>;
  assert.ok(prev.protocoloPlantaoLraCanina10Passos, 'protocoloPlantaoLraCanina10Passos deve existir em prevention');
  assert.match(prev.protocoloPlantaoLraCanina10Passos, /Passo 1/i);
  assert.match(prev.protocoloPlantaoLraCanina10Passos, /Passo 5/i);
  assert.match(prev.protocoloPlantaoLraCanina10Passos, /Passo 10/i);
});

test('valida integridade de referencias cientificas e ausencia absoluta de asteriscos duplos', () => {
  const record = getRecord();
  assert.ok(record.references && record.references.length >= 10, 'Deve conter pelo menos 10 referencias cientificas');

  const refIds = record.references.map((r) => r.id);
  assert.ok(refIds.includes('ref-iris-aki-2026'), 'Referencia IRIS AKI 2026 deve existir');
  assert.ok(refIds.includes('ref-sykes-acvim-lepto-2023'), 'Referencia Sykes 2023 ACVIM Leptospirose deve existir');
  assert.ok(refIds.includes('ref-nelson-couto-6ed'), 'Referencia Nelson & Couto deve existir');
  assert.ok(refIds.includes('ref-coit-tartaric-2021'), 'Referencia Coit 2021 acido tartarico deve existir');

  // Validacao inegociavel de ausencia de asteriscos duplos
  function checkNoDoubleAsterisks(obj: any, pathName = 'root') {
    if (typeof obj === 'string') {
      assert.ok(
        !obj.includes('**'),
        `Encontrado marcador literal proibido "**" em ${pathName}: "${obj.slice(0, 80)}..."`,
      );
    } else if (Array.isArray(obj)) {
      obj.forEach((item, idx) => checkNoDoubleAsterisks(item, `${pathName}[${idx}]`));
    } else if (obj && typeof obj === 'object') {
      for (const [key, val] of Object.entries(obj)) {
        checkNoDoubleAsterisks(val, `${pathName}.${key}`);
      }
    }
  }

  checkNoDoubleAsterisks(record, 'lesaoRenalAgudaCaninaRecord');
});
