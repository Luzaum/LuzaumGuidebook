import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import path from 'node:path';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';
import { translateEditorialSubsectionKey } from '../../modules/consulta-vet/utils/editorialSubsectionLabels';

const SLUG = 'linfoma-cutaneo-caes-gatos';

test('Linfoma cutâneo existe em diseasesSeed com metadados corretos', () => {
  const disease = diseasesSeed.find((item) => item.slug === SLUG);
  assert.ok(disease, `esperava encontrar ${SLUG} em diseasesSeed`);
  assert.equal(disease!.category, 'oncologia');
  assert.ok(disease!.categories?.includes('dermatologia'));
  assert.ok(disease!.categories?.includes('clinica-medica'));
  assert.equal(disease!.isPublished, true);
  assert.ok(disease!.species.includes('dog'));
  assert.ok(disease!.species.includes('cat'));
  assert.ok(disease!.tags.includes('Linfoma cutâneo'));
  assert.ok(disease!.tags.includes('eCTCL'));
  assert.ok(disease!.tags.includes('CCNU'));
  assert.ok(disease!.tags.includes('PARR'));
});

test('Linfoma cutâneo está listado no catálogo público e possui stub de card', () => {
  assert.ok(
    (CONSULTA_VET_PUBLIC_DISEASE_SLUGS as readonly string[]).includes(SLUG),
    `esperava encontrar ${SLUG} em CONSULTA_VET_PUBLIC_DISEASE_SLUGS`,
  );
  const cardStub = PUBLIC_CATALOG_DISEASE_CARD_STUBS.find((card) => card.slug === SLUG);
  assert.ok(cardStub, `esperava encontrar stub para ${SLUG}`);
  assert.ok(cardStub!.quickSummary.length > 50);
  assert.equal(cardStub!.title, 'Linfoma cutâneo');
  assert.ok(cardStub!.species.includes('dog'));
  assert.ok(cardStub!.species.includes('cat'));
});

test('Linfoma cutâneo possui linguagem simples completa para tutores', () => {
  const plain = DISEASE_PLAIN_LANGUAGE[SLUG];
  assert.ok(plain, 'esperava registro de linguagem simples para linfoma cutâneo');
  assert.ok(plain.whatIsIt.length > 100);
  assert.ok(plain.keyPoints.length >= 3);
});

test('Linfoma cutâneo possui faixa de decisão rápida e rica estrutura editorial', () => {
  const disease = diseasesSeed.find((item) => item.slug === SLUG)!;
  assert.ok(disease.quickDecisionStrip.length >= 8);
  assert.ok((disease.references ?? []).length >= 12);
  assert.ok(disease.quickSummaryRich);
  assert.ok(disease.quickSummaryRich.pillars.length >= 4);
  assert.ok(disease.quickSummaryRich.diagnosticFlow?.steps.length! >= 5);
});

test('Linfoma cutâneo aborda distinção eCTCL vs NECL e dermatite citotóxica de interface 2026', () => {
  const disease = diseasesSeed.find((item) => item.slug === SLUG)!;
  const serialized = JSON.stringify(disease).toLowerCase();
  assert.ok(serialized.includes('ectcl') || serialized.includes('epiteliotrópico'), 'deve citar eCTCL');
  assert.ok(serialized.includes('necl') || serialized.includes('não epiteliotrópico'), 'deve citar NECL');
  assert.ok(serialized.includes('smith'), 'deve citar Smith et al. 2026');
  assert.ok(serialized.includes('dermatite citotóxica de interface') || serialized.includes('interface'), 'deve citar dermatite citotóxica de interface');
  assert.ok(serialized.includes('queratinócitos apoptóticos') || serialized.includes('apoptose'), 'deve citar apoptose/satelitose');
});

test('Linfoma cutâneo detalha apresentações felinas peculiares e linfocitose cutânea', () => {
  const disease = diseasesSeed.find((item) => item.slug === SLUG)!;
  const serialized = JSON.stringify(disease).toLowerCase();
  assert.ok(serialized.includes('tarsal') || serialized.includes('tarso'), 'deve citar linfoma tarsal');
  assert.ok(serialized.includes('injeção') || serialized.includes('injeçao'), 'deve citar sítio de injeção');
  assert.ok(serialized.includes('linfocitose cutânea') || serialized.includes('linfocitose cutanea'), 'deve citar linfocitose cutânea');
  assert.ok(serialized.includes('1080'), 'deve citar mediana de 1080 dias na linfocitose cutânea felina');
});

test('Linfoma cutâneo detalha estudos seminais e protocolos com dados quantitativos', () => {
  const disease = diseasesSeed.find((item) => item.slug === SLUG)!;
  const serialized = JSON.stringify(disease);
  assert.ok(serialized.includes('Risbon'), 'deve citar Risbon et al. 2006');
  assert.ok(serialized.includes('Chan'), 'deve citar Chan et al. 2018');
  assert.ok(serialized.includes('130') && serialized.includes('491'), 'deve citar sobrevida 130 d cutâneo vs 491 d mucocutâneo');
  assert.ok(serialized.includes('83%') || serialized.includes('94 dias'), 'deve citar ORR 83% e 94 dias da lomustina');
  assert.ok(serialized.includes('Ramos'), 'deve citar Ramos et al. 2022');
  assert.ok(serialized.includes('Vlodaver'), 'deve citar Vlodaver et al. 2024');
  assert.ok(serialized.includes('Siewert'), 'deve citar Siewert et al. 2022');
  assert.ok(serialized.includes('Roccabianca'), 'deve citar Roccabianca et al. 2016');
  assert.ok(serialized.includes('Burr'), 'deve citar Burr et al. 2014');
  assert.ok(serialized.includes('Lee'), 'deve citar Lee et al. 2026');
  assert.ok(serialized.includes('Deveau'), 'deve citar Deveau et al. 2019');
});

test('Linfoma cutâneo possui 7 figuras clínicas integradas e salvas em disco', () => {
  const disease = diseasesSeed.find((item) => item.slug === SLUG)!;
  const serialized = JSON.stringify(disease);

  const figures = [
    'fig1-evolucao-clinica-radioterapia-deveau-2019.jpg',
    'fig2-despigmentacao-mucocutanea-canvetj-2021.jpg',
    'fig3-labios-mucosa-oral-eritema-canvetj-2021.jpg',
    'fig4-despigmentacao-coxins-patas-canvetj-2021.jpg',
    'fig5-histopatologia-tropismo-epitelial-lee-2026.jpg',
    'fig6-citologia-fna-atipias-uropodio-lee-2026.jpg',
    'fig7-linfocitose-cutanea-felina-diferencial-mdpi-2022.jpg',
  ];

  for (const fig of figures) {
    assert.ok(serialized.includes(fig), `esperava que a doença referencie a figura ${fig}`);
    const fullPath = path.join('c:/Users/luzau/OneDrive/Documentos/GitHub/LuzaumGuidebook/public/consulta-vet/linfoma-cutaneo', fig);
    assert.ok(fs.existsSync(fullPath), `esperava que o arquivo exista em disco: ${fullPath}`);
    const stat = fs.statSync(fullPath);
    assert.ok(stat.size > 50000, `arquivo ${fig} parece corrompido ou muito pequeno: ${stat.size} bytes`);
  }
});

test('subseções de Linfoma cutâneo possuem rótulos com acentuação editorial preservada', () => {
  const keys = [
    'definicaoEClassificacao',
    'diferencaFundamentalTabela',
    'fisiologiaImunidadeCutanea',
    'varianteCitotoxicaInterface2026',
    'distribuicaoCanina',
    'distribuicaoFelina',
    'fenotiposPeculiaresGato',
    'mimetizadorLinfocitoseCutanea',
    'figuraLinfocitoseDiferencial',
    'passoAPassoPatogenia',
    'mecanismosEvolutivos',
    'armadilhaDoPrurido',
    'sindromeDeSezary',
    'formaInicialEProgressao',
    'figuraEvolucaoRadioterapia',
    'localizacoesAlerta',
    'figuraDespigmentacaoMucocutanea',
    'figuraLabiosMucosaOral',
    'figuraCoxinsPatas',
    'estratificacaoTerapeutica',
    'doencaSolitariaLocalizada',
    'lomustinaCCNU',
    'retinoidesIsotretinoina',
    'inibidorNuclearVerdinexor',
    'radioterapiaAvancada',
    'glicocorticoidesEPaliacao',
    'peculiaridadesGatos',
    'infeccoesSecundarias',
    'disseminacaoVisceral',
    'toxicidadeMedicamentosa',
    'vigilanciaPrecoce',
    'figuraHistopatologiaTropismo',
    'figuraCitologiaAtipias',
  ];

  for (const k of keys) {
    const label = translateEditorialSubsectionKey(k);
    assert.ok(label && label.length > 5, `rótulo vazio ou muito curto para chave ${k}`);
  }
});

test('Linfoma cutâneo não contém marcadores literais de asterisco duplo (**)', () => {
  const disease = diseasesSeed.find((item) => item.slug === SLUG)!;
  const serialized = JSON.stringify(disease);
  assert.ok(!serialized.includes('**'), 'não deve conter dois asteriscos em nenhum campo');
});
