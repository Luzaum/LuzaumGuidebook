import assert from 'node:assert/strict';
import test from 'node:test';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';
import { DISEASE_CONSENSUS_LINKS, mergeConsensusSlugsForDisease } from '../../modules/consulta-vet/data/seed/diseaseConsensusLinks';
import { translateEditorialSubsectionKey } from '../../modules/consulta-vet/utils/editorialSubsectionLabels';

const SLUG = 'coagulacao-intravascular-disseminada-caes-gatos';

test('CID/DIC existe em diseasesSeed com metadados corretos', () => {
  const disease = diseasesSeed.find((item) => item.slug === SLUG);
  assert.ok(disease, `esperava encontrar ${SLUG} em diseasesSeed`);
  assert.equal(disease!.category, 'emergencia-intensivismo');
  assert.ok(disease!.categories?.includes('hematologia'));
  assert.equal(disease!.isPublished, true);
  assert.ok(disease!.species.includes('dog'));
  assert.ok(disease!.species.includes('cat'));
  assert.ok(disease!.tags.includes('DIC'));
  assert.ok(disease!.tags.includes('CURATIVE'));
  assert.ok(disease!.tags.includes('Antitrombina'));
});

test('CID/DIC está listada no catálogo público e possui stub de card', () => {
  assert.ok(
    (CONSULTA_VET_PUBLIC_DISEASE_SLUGS as readonly string[]).includes(SLUG),
    `esperava encontrar ${SLUG} em CONSULTA_VET_PUBLIC_DISEASE_SLUGS`,
  );
  const cardStub = PUBLIC_CATALOG_DISEASE_CARD_STUBS.find((card) => card.slug === SLUG);
  assert.ok(cardStub, `esperava encontrar stub para ${SLUG}`);
  assert.ok(cardStub!.quickSummary.length > 50);
  assert.equal(cardStub!.title, 'Coagulação intravascular disseminada (CID/DIC)');
  assert.ok(cardStub!.species.includes('dog'));
  assert.ok(cardStub!.species.includes('cat'));
});

test('CID/DIC possui linguagem simples completa para tutores', () => {
  const plain = DISEASE_PLAIN_LANGUAGE[SLUG];
  assert.ok(plain, 'esperava registro de linguagem simples para CID');
  assert.ok(plain.whatIsIt.length > 100);
  assert.ok(plain.keyPoints.length >= 3);
});

test('CID/DIC está devidamente linkada aos consensos CURATIVE e Sepse VECCS', () => {
  const disease = diseasesSeed.find((item) => item.slug === SLUG)!;
  const merged = mergeConsensusSlugsForDisease(SLUG, disease.relatedConsensusSlugs);
  assert.ok(merged.includes('curative-risco-trombotico-2022'));
  assert.ok(merged.includes('veccs-sepse-definicao-caes-gatos-2026'));
  assert.ok(DISEASE_CONSENSUS_LINKS[SLUG]?.includes('curative-risco-trombotico-2022'));
});

test('CID/DIC possui faixa de decisão rápida e rica estrutura editorial', () => {
  const disease = diseasesSeed.find((item) => item.slug === SLUG)!;
  assert.ok(disease.quickDecisionStrip.length >= 8);
  assert.ok((disease.references ?? []).length >= 15);
  assert.ok(disease.quickSummaryRich);
  assert.ok(disease.quickSummaryRich.pillars.length >= 4);
  assert.ok(disease.quickSummaryRich.diagnosticFlow?.steps.length! >= 5);
  assert.ok(disease.quickSummaryRich.treatmentFlow?.steps.length! >= 5);
});

test('CID/DIC aborda achados críticos: DIC lung, VPCs, esquizócitos e hipotermia felina', () => {
  const disease = diseasesSeed.find((item) => item.slug === SLUG)!;
  const signs = disease.clinicalSignsPathophysiology;
  assert.ok(Array.isArray(signs) && signs.length >= 4);

  const serializedSigns = JSON.stringify(signs).toLowerCase();
  assert.ok(serializedSigns.includes('dic lung'), 'deve citar DIC lung');
  assert.ok(serializedSigns.includes('vpcs') || serializedSigns.includes('ventriculares'), 'deve citar VPCs/arritmias');
  assert.ok(serializedSigns.includes('esquizócitos'), 'deve citar esquizócitos');
  assert.ok(serializedSigns.includes('hipotermia'), 'deve citar hipotermia');
});

test('CID/DIC detalha os 9 passos diagnósticos e estudos seminais', () => {
  const disease = diseasesSeed.find((item) => item.slug === SLUG)!;
  const diag = disease.diagnosis;
  assert.ok(Array.isArray(diag));
  assert.equal(diag.length, 9);

  const serializedDiag = JSON.stringify(diag);
  assert.ok(serializedDiag.includes('Goggs'), 'deve citar estudo de Goggs et al. 2018');
  assert.ok(serializedDiag.includes('Wiinberg'), 'deve citar estudo de Wiinberg et al. 2008/2010');
  assert.ok(serializedDiag.includes('Griffin'), 'deve citar Griffin et al. 2003');
  assert.ok(serializedDiag.includes('Tholen'), 'deve citar Tholen et al. 2009');
  assert.ok(serializedDiag.includes('Stokol'), 'deve citar Stokol et al. 2000');
  assert.ok(serializedDiag.includes('Goddard'), 'deve citar Goddard et al. 2013');
  assert.ok(serializedDiag.includes('Estrin'), 'deve citar Estrin et al. 2006');
});

test('CID/DIC aborda posologias do Plumb, LMWH/UFH, FFP, e evidência Granger 2024', () => {
  const disease = diseasesSeed.find((item) => item.slug === SLUG)!;
  const treat = disease.treatment as Record<string, string>;
  assert.ok(treat);

  const serializedTreat = JSON.stringify(treat);
  assert.ok(serializedTreat.includes('Plumb'), 'deve referenciar Plumb');
  assert.ok(serializedTreat.includes('Enoxaparina') || serializedTreat.includes('enoxaparina'), 'deve conter enoxaparina');
  assert.ok(serializedTreat.includes('Dalteparina') || serializedTreat.includes('dalteparina'), 'deve conter dalteparina');
  assert.ok(serializedTreat.includes('Granger'), 'deve citar relato e racional de Granger et al. 2024');
  assert.ok(serializedTreat.includes('aminocaproico'), 'deve citar ácido aminocaproico');
  assert.ok(serializedTreat.includes('tranexâmico'), 'deve citar ácido tranexâmico');
  assert.ok(serializedTreat.includes('lenha'), 'deve desmistificar o mito de lenha na fogueira');
});

test('subseções de CID possuem rótulos com acentuação editorial preservada', () => {
  const keys = [
    'definicaoEConceitoModerno',
    'mecanismosIniciais',
    'imunotromboseSepse',
    'oncologiaHemangiossarcoma',
    'pancreatiteEGDV',
    'particularidadesFelinas',
    'prognosticoEEstratificacao',
    'metaPrimaria',
    'suporteHemodinamico',
    'terapiaTransfusional',
    'anticoagulacao',
    'antifibrinoliticos',
    'terapiasInadequadas',
    'suporteMultiorganico',
    'monitoramentoSeriado',
    'vigilanciaPrecoce',
    'figuraFisiopatologiaGeral',
    'figuraImunotromboseSepse',
    'falhaHomeostaseMicrovascular',
    'figuraMicrocirculacaoChoque',
    'fenotipoMicrotrombotico',
    'figuraMicrotrombosPulmonares',
    'figuraPotencialHemostaticoSepse',
    'fenotipoHiperfibrinolitico',
    'figuraTegHiperfibrinolise',
    'figuraBiomarcadoresSepse',
    'falenciaMultiplaOrgaos',
    'hemorragiasIncoerciveis',
    'figuraPetequiasEquimoses',
  ];

  for (const k of keys) {
    const label = translateEditorialSubsectionKey(k);
    assert.ok(label && label.length > 5, `rótulo vazio ou muito curto para chave ${k}`);
  }
});

test('CID/DIC não possui seção duplicada de figuras no final da ficha', () => {
  const disease = diseasesSeed.find((item) => item.slug === SLUG)!;
  assert.equal(disease.figures, undefined, 'seção genérica "Figuras e imagens clínicas" deve ser omitida no final da CID');
});

test('CID/DIC possui figuras clínicas integradas nas subseções de etiologia, fisiopatologia e complicações', () => {
  const disease = diseasesSeed.find((item) => item.slug === SLUG)!;
  const etio = disease.etiology as Record<string, any>;
  const patho = disease.pathophysiology as Record<string, any>;
  const compl = disease.complications as Record<string, any>;

  assert.ok(etio.figuraFisiopatologiaGeral?.src?.includes('yang'), 'etiologia deve conter figura geral de Yang 2025');
  assert.ok(etio.figuraImunotromboseSepse?.src?.includes('unar'), 'etiologia deve conter figura de imunotrombose de Unar 2023');

  assert.ok(patho.figuraMicrocirculacaoChoque?.src?.includes('cooper'), 'fisiopatologia deve conter figura de microcirculação de Cooper 2021');
  assert.ok(patho.figuraMicrotrombosPulmonares?.src?.includes('goddard'), 'fisiopatologia deve conter figura de lesão pulmonar de Goddard 2026');
  assert.ok(patho.figuraPotencialHemostaticoSepse?.src?.includes('sotos'), 'fisiopatologia deve conter figura de potencial hemostático de Sotos 2023');
  assert.equal(patho.figuraTegHiperfibrinolise, undefined, 'figura de Granger TEG deve ser removida');
  assert.equal(patho.figuraBiomarcadoresSepse, undefined, 'figura de biomarcadores Sotos deve ser removida');

  assert.ok(compl.figuraPetequiasEquimoses?.src?.includes('dosenberry'), 'complicações deve conter figura de petéquias de Dosenberry 2025');
});

test('CID/DIC possui referências completas em formato ABNT para os estudos das figuras', () => {
  const disease = diseasesSeed.find((item) => item.slug === SLUG)!;
  const refIds = (disease.references ?? []).map((r) => r.id);

  assert.ok(refIds.includes('ref-yang-2025'), 'deve conter ref-yang-2025');
  assert.ok(refIds.includes('ref-unar-2023'), 'deve conter ref-unar-2023');
  assert.ok(refIds.includes('ref-goddard-2026'), 'deve conter ref-goddard-2026');
  assert.ok(refIds.includes('ref-cooper-2021'), 'deve conter ref-cooper-2021');
  assert.ok(refIds.includes('ref-dosenberry-2025'), 'deve conter ref-dosenberry-2025');
  assert.ok(refIds.includes('ref-sotos-2023'), 'deve conter ref-sotos-2023');
});

