import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { DISEASE_CONSENSUS_LINKS } from '../../modules/consulta-vet/data/seed/diseaseConsensusLinks';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { sepseCaninaRecord } from '../../modules/consulta-vet/data/seed/diseases.sepse-canina.seed';
import { FULL_KEY_LABELS } from '../../modules/consulta-vet/utils/editorialSubsectionLabels';

const SLUG = 'sepse-canina';

function getRecord() {
  const fromSeed = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(fromSeed, 'Registro de sepse-canina deve existir em diseasesSeed');
  return fromSeed;
}

test('mantem ficha canonica unica e cartao publico sincronizado', () => {
  assert.equal(sepseCaninaRecord.slug, SLUG);
  assert.equal(sepseCaninaRecord.id, 'disease-sepse-canina');
  assert.ok(
    CONSULTA_VET_PUBLIC_DISEASE_SLUGS.includes(SLUG),
    'Slug deve estar listado em CONSULTA_VET_PUBLIC_DISEASE_SLUGS',
  );

  const cardStub = PUBLIC_CATALOG_DISEASE_CARD_STUBS.find((c) => c.slug === SLUG);
  assert.ok(cardStub, 'Card stub deve existir em PUBLIC_CATALOG_DISEASE_CARD_STUBS');
  assert.equal(cardStub.title, 'Sepse e Choque Séptico em Cães');
  assert.deepEqual(cardStub.species, ['dog']);
  assert.ok(cardStub.quickSummary.length > 150);
});

test('valida metadados, especie canina estrita e faixa de decisao rapida', () => {
  const record = getRecord();
  assert.deepEqual(record.species, ['dog']);
  assert.equal(record.category, 'urgencia-emergencia');
  assert.ok(record.categories && record.categories.includes('terapia-intensiva'));
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
  assert.match(rich.lead, /disfunção orgânica/i);
  assert.equal(rich.pillars?.length, 4);

  assert.ok(rich.diagnosticFlow, 'diagnosticFlow deve existir');
  assert.equal(rich.diagnosticFlow.steps.length, 4);

  assert.ok(rich.treatmentFlow, 'treatmentFlow deve existir');
  assert.equal(rich.treatmentFlow.steps.length, 5);

  assert.ok(rich.tabelaDecisaoClinicaRapida, 'tabelaDecisaoClinicaRapida deve existir');
});

test('valida a grande mudanca conceitual do Consenso VECCS 2026 vs SIRS', () => {
  const record = getRecord();
  const text = JSON.stringify(record.etiology);

  assert.match(text, /Goggs et al/i);
  assert.match(text, /JVEC/i);
  assert.match(text, /2026/i);
  assert.match(text, /disfunção orgânica/i);
  assert.match(text, /SIRS.*não é/i);
  assert.match(text, /corpo de bombeiros/i);
  assert.match(text, /sepse grave.*redundante/i);

  const etio = record.etiology as Record<string, unknown>;
  assert.ok(etio.tabelaComparativaConceitos2026, 'Tabela comparativa 2026 deve existir');
  assert.ok(etio.tabelaFocosInfecciososMicrobiologia, 'Tabela de focos microbiologicos deve existir');
});

test('valida definicao de choque septico e desacoplamento microcirculatorio', () => {
  const record = getRecord();
  const text = JSON.stringify(record.pathophysiology);

  assert.match(text, /vasoplegia/i);
  assert.match(text, /stressed volume/i);
  assert.match(text, /unstressed volume/i);
  assert.match(text, /shedding do glicocálix/i);
  assert.match(text, /desacoplamento/i);
  assert.match(text, /hipóxia citopática/i);
  assert.match(text, /PAM.*65/i);
});

test('valida criterios objetivos de disfuncao organica consensual por sistemas', () => {
  const record = getRecord();
  const text = JSON.stringify(record.clinicalSignsPathophysiology);

  assert.match(text, /diurese < 1/i);
  assert.match(text, /creatinina.*0,3/i);
  assert.match(text, /lactato > 2/i);
  assert.match(text, /bilirrubina.*0,5/i);
  assert.match(text, /plaquetas < 100\.000/i);
  assert.match(text, /MGCS <= 14/i);
  assert.match(text, /ARDSVet/i);

  const signs = record.clinicalSignsPathophysiology as Record<string, unknown>;
  assert.ok(signs.tabelaCriteriosDisfuncaoOrganica, 'Tabela de criterios de disfuncao deve existir');
});

test('valida escore APPLEfast, delta glicose e POCUS na propedeutica', () => {
  const record = getRecord();
  const text = JSON.stringify(record.diagnosis);

  assert.match(text, /APPLEfast/i);
  assert.match(text, /Castelain/i);
  assert.match(text, /clearance de lactato/i);
  assert.match(text, /POCUS/i);
  assert.match(text, /AFAST/i);
  assert.match(text, /bactérias intracelulares/i);
  assert.match(text, /delta glicose/i);

  const diag = record.diagnosis as Record<string, unknown>;
  assert.ok(diag.tabelaDiferencialDeltaGlicoseLactato, 'Tabela de efusao peritoneal deve existir');
});

test('valida protocolo de fluidoterapia AAHA 2024 e veto a dose de 90 mL/kg', () => {
  const record = getRecord();
  const text = JSON.stringify(record.treatment);

  assert.match(text, /AAHA 2024/i);
  assert.match(text, /15 a 20 mL\/kg/i);
  assert.match(text, /15 a 30 minutos/i);
  assert.match(text, /cristaloide balanceado/i);
  assert.match(text, /90 mL\/kg.*proscrita|90 mL\/kg.*perigosa/i);
  assert.match(text, /edema pulmonar/i);
  assert.match(text, /congestão/i);
});

test('valida drogas vasoativas, norepinefrina de 1ª linha e raciocinio de UTI', () => {
  const record = getRecord();
  const text = JSON.stringify(record.treatment);

  assert.match(text, /norepinefrina/i);
  assert.match(text, /0,1 a 1,0 mcg\/kg\/min/i);
  assert.match(text, /vasopressina/i);
  assert.match(text, /0,5 a 5 mU\/kg\/min/i);
  assert.match(text, /dobutamina/i);
  assert.match(text, /5 a 15 mcg\/kg\/min/i);
  assert.match(text, /cardiomiopatia/i);

  const treat = record.treatment as Record<string, unknown>;
  assert.ok(treat.tabelaDrogasVasoativasSepse, 'Tabela de drogas vasoativas deve existir');
  assert.ok(treat.tabelaFenotiposHemodinamicosUti, 'Tabela de fenotipos de UTI deve existir');
});

test('valida antibiotic stewardship precoce e controle fisico de foco', () => {
  const record = getRecord();
  const text = JSON.stringify(record.treatment);

  assert.match(text, /source control/i);
  assert.match(text, /primeira hora/i);
  assert.match(text, /Ampicilina\/Sulbactam/i);
  assert.match(text, /Enrofloxacina/i);
  assert.match(text, /descalonar/i);
  assert.match(text, /timing cirúrgico/i);
});

test('valida suporte intensivo, nutricao enteral precoce e veto a AINEs', () => {
  const record = getRecord();
  const text = JSON.stringify(record.treatment) + JSON.stringify(record.complications);

  assert.match(text, /nutrição enteral precoce/i);
  assert.match(text, /sonda/i);
  assert.match(text, /trofismo/i);
  assert.match(text, /AINEs.*contraindicados|veto.*AINE/i);
  assert.match(text, /metadona|fentanil|buprenorfina/i);
  assert.match(text, /diurese.*1 mL\/kg\/h/i);
});

test('valida protocolo de plantao em 10 passos e complicacoes de MODS', () => {
  const record = getRecord();
  const prevText = JSON.stringify(record.prevention);
  const compText = JSON.stringify(record.complications);

  assert.match(prevText, /protocolo de plantão/i);
  assert.match(prevText, /10 passos/i);
  assert.match(compText, /dez erros/i);
  assert.match(compText, /MODS/i);
  assert.match(compText, /3,24/i);
});

test('valida imagens clinicas Open Access salvas em disco em public e dist', () => {
  const record = getRecord();
  const figures = record.figures as Array<{ id: string; url: string; title: string }>;
  assert.ok(Array.isArray(figures), 'Figures deve ser um array');
  assert.equal(figures.length, 4, 'Devem existir 4 figuras clinicas');

  const expectedFiles = [
    'imunotrombose-netose-sepse.jpg',
    'neutrofilo-net-bacterias.jpg',
    'citologia-neutrofilos-bacterias-intracelulares.png',
    'hiperpermeabilidade-capilar-edema.jpg',
  ];

  for (const filename of expectedFiles) {
    const publicPath = path.join(process.cwd(), 'public', 'consulta-vet', 'sepse-canina', filename);
    const distPath = path.join(process.cwd(), 'dist', 'consulta-vet', 'sepse-canina', filename);

    assert.ok(fs.existsSync(publicPath), 'Arquivo deve existir em public: ' + publicPath);
    assert.ok(fs.existsSync(distPath), 'Arquivo deve existir em dist: ' + distPath);

    const publicStats = fs.statSync(publicPath);
    assert.ok(publicStats.size > 20000, 'Tamanho do arquivo deve ser valido: ' + filename);
  }
});

test('valida integridade de vinculos de consenso e linguagem simples para tutores', () => {
  const record = getRecord();

  assert.ok(
    DISEASE_CONSENSUS_LINKS[SLUG],
    'Deve haver entrada em DISEASE_CONSENSUS_LINKS para sepse-canina',
  );
  assert.ok(
    DISEASE_CONSENSUS_LINKS[SLUG].includes('veccs-sepse-definicao-caes-gatos-2026'),
    'Deve conter veccs-sepse-definicao-caes-gatos-2026',
  );
  assert.ok(
    DISEASE_CONSENSUS_LINKS[SLUG].includes('veccs-choque-septico-prognostico-2026'),
    'Deve conter veccs-choque-septico-prognostico-2026',
  );

  assert.ok(
    DISEASE_PLAIN_LANGUAGE[SLUG],
    'Deve haver entrada em DISEASE_PLAIN_LANGUAGE para sepse-canina',
  );
  const plain = DISEASE_PLAIN_LANGUAGE[SLUG];
  assert.ok(plain.whatIsIt.length > 100);
  assert.ok(plain.keyPoints.length >= 5);
  assert.ok(plain.warningSigns && plain.warningSigns.length > 50);
});

test('valida rotulos editoriais mapeados em editorialSubsectionLabels.ts', () => {
  const expectedKeys = [
    'definicaoEConceitoModerno2026',
    'analogiaDidaticaIncendio',
    'diferenciacaoConceitualSirsSepseMods',
    'tabelaComparativaConceitos2026',
    'etiologiasEFocosInfecciososCaninos',
    'tabelaFocosInfecciososMicrobiologia',
    'fisiopatologiaPampDampEndoteliopatia',
    'figuraEndotelioGlicocalix',
    'figuraImunotromboseNetose',
    'figuraNeutrofiloNetBacterias',
    'figuraCitologiaPeritoniteSeptica',
    'cardiomiopatiaSepticaEPerfusao',
    'imunoparalisiaECars',
    'criteriosDisfuncaoOrganicaSistemas',
    'tabelaCriteriosDisfuncaoOrganica',
    'escoresGravidadeApplefast',
    'propedeuticaLactatoDeltaGlicosePocus',
    'tabelaDiferencialDeltaGlicoseLactato',
    'abordagemHemodinamicaAaha2024',
    'suporteVasoativoNorepinefrina',
    'tabelaDrogasVasoativasSepse',
    'tabelaFenotiposHemodinamicosUti',
    'antibioticoterapiaPrecoceStewardship',
    'controleFisicoDoFocoSourceControl',
    'suporteIntensivoNutricaoAnalgesia',
    'protocoloPlantaoSepse10Passos',
    'dezErrosMataisSepse',
  ];

  for (const key of expectedKeys) {
    assert.ok(
      FULL_KEY_LABELS[key],
      'Rotulo editorial ausente em editorialSubsectionLabels.ts para a chave: ' + key,
    );
  }
});

test('valida referencias completas com acervo e consensos vigentes', () => {
  const record = getRecord();
  const refs = record.references || [];
  assert.ok(refs.length >= 8, 'Devem existir pelo menos 8 referencias bibliograficas');

  const refIds = new Set(refs.map((r) => r.id));
  const expectedIds = [
    'ref-goggs-sepse-2026',
    'ref-goggs-choque-2026',
    'ref-aaha-fluids-2024',
    'ref-ettinger-9',
    'ref-nelson-couto-6',
    'ref-plumb-10',
    'ref-summers-2021',
    'ref-castelain-2026',
  ];

  for (const id of expectedIds) {
    assert.ok(refIds.has(id), 'Referencia esperada ausente: ' + id);
  }
});

test('assegura ausencia absoluta de asteriscos duplos (ZERO marcadores duplos)', () => {
  const record = getRecord();
  const json = JSON.stringify(record);
  assert.doesNotMatch(json, /\*\*/, 'A ficha de Sepse Canina nao deve conter asteriscos duplos em nenhum campo.');
});
