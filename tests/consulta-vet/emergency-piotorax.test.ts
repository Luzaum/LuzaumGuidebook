import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import path from 'node:path';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';
import { translateEditorialSubsectionKey } from '../../modules/consulta-vet/utils/editorialSubsectionLabels';

const SLUG = 'piotorax-caes-gatos';

test('Piotórax existe em diseasesSeed com metadados corretos', () => {
  const disease = diseasesSeed.find((item) => item.slug === SLUG);
  assert.ok(disease, `esperava encontrar ${SLUG} em diseasesSeed`);
  assert.equal(disease!.category, 'urgencia-emergencia');
  assert.ok(disease!.categories?.includes('pneumologia'));
  assert.ok(disease!.categories?.includes('infectologia'));
  assert.ok(disease!.categories?.includes('terapia-intensiva'));
  assert.ok(disease!.categories?.includes('cirurgia'));
  assert.equal(disease!.isPublished, true);
  assert.ok(disease!.species.includes('cat'));
  assert.ok(disease!.species.includes('dog'));
  assert.ok(disease!.tags.includes('piotórax'));
  assert.ok(disease!.tags.includes('toracocentese'));
  assert.ok(disease!.tags.includes('dreno torácico'));
  assert.ok(disease!.tags.includes('lavagem pleural'));
  assert.ok(disease!.tags.includes('ISCAID'));
  assert.ok(disease!.tags.includes('sepsis'));
});

test('Piotórax está listado no catálogo público e possui stub de card', () => {
  assert.ok(
    (CONSULTA_VET_PUBLIC_DISEASE_SLUGS as readonly string[]).includes(SLUG),
    `esperava encontrar ${SLUG} em CONSULTA_VET_PUBLIC_DISEASE_SLUGS`,
  );
  const cardStub = PUBLIC_CATALOG_DISEASE_CARD_STUBS.find((card) => card.slug === SLUG);
  assert.ok(cardStub, `esperava encontrar stub para ${SLUG}`);
  assert.ok(cardStub!.quickSummary.length > 50);
  assert.equal(cardStub!.title, 'Piotórax');
  assert.ok(cardStub!.species.includes('dog'));
  assert.ok(cardStub!.species.includes('cat'));
});

test('Piotórax possui linguagem simples completa para tutores', () => {
  const plain = DISEASE_PLAIN_LANGUAGE[SLUG];
  assert.ok(plain, 'esperava registro de linguagem simples para tutores');
  assert.ok(plain!.whatIsIt.length > 80);
  assert.ok(plain!.keyPoints.length >= 5);
  for (const kp of plain!.keyPoints) {
    assert.ok(kp.length > 20);
  }
});

test('Piotórax possui resumo clínico rico com pilares e fluxos estruturados', () => {
  const disease = diseasesSeed.find((item) => item.slug === SLUG)!;
  assert.ok(disease.quickDecisionStrip);
  assert.ok(disease.quickDecisionStrip!.length >= 8);

  const rich = disease.quickSummaryRich;
  assert.ok(rich, 'esperava quickSummaryRich estruturado');
  assert.ok(rich!.lead.length > 100);
  assert.ok(rich!.leadHighlights.length >= 4);
  assert.equal(rich!.pillars.length, 4);

  assert.ok(rich!.diagnosticFlow);
  assert.ok(rich!.diagnosticFlow!.steps.length >= 5);

  assert.ok(rich!.treatmentFlow);
  assert.ok(rich!.treatmentFlow!.steps.length >= 4);
});

test('Piotórax possui 5 figuras clínicas reais armazenadas em public/', () => {
  const disease = diseasesSeed.find((item) => item.slug === SLUG)!;
  const figures = disease.figures as Array<{ src: string; caption: string; alt: string }>;
  assert.ok(Array.isArray(figures), 'esperava array de figuras');
  assert.equal(figures.length, 5, 'esperava 5 figuras clínicas');

  for (const fig of figures) {
    assert.ok(fig.src.startsWith('/consulta-vet/piotorax/'));
    assert.ok(fig.caption.length > 40);
    assert.ok(fig.alt.length > 15);

    const fullPath = path.resolve('public' + fig.src);
    assert.ok(fs.existsSync(fullPath), `arquivo de figura não encontrado: ${fullPath}`);
    const stats = fs.statSync(fullPath);
    assert.ok(stats.size > 30000, `arquivo muito pequeno (${stats.size}b): ${fullPath}`);
  }
});

test('Piotórax possui achados clínicos agrupados por sistemas (EditorialSystemGroup[])', () => {
  const disease = diseasesSeed.find((item) => item.slug === SLUG)!;
  const systems = disease.clinicalSignsPathophysiology;
  assert.ok(Array.isArray(systems), 'esperava array de EditorialSystemGroup');
  assert.ok(systems.length >= 6, 'esperava pelo menos 6 grupos de sistemas');

  const systemNames = systems.map((s) => s.system);
  assert.ok(systemNames.includes('respiratory'), 'deve incluir respiratório');
  assert.ok(systemNames.includes('cardiovascular'), 'deve incluir cardiovascular');
  assert.ok(systemNames.includes('general'), 'deve incluir geral/sistêmico');
  assert.ok(systemNames.includes('gastrointestinal'), 'deve incluir gastrointestinal');
  assert.ok(systemNames.includes('musculoskeletal'), 'deve incluir musculoesquelético');
  assert.ok(systemNames.includes('metabolic'), 'deve incluir metabólico');

  for (const group of systems) {
    assert.ok(group.findings.length >= 1, `grupo ${group.system} deve ter achados`);
    for (const f of group.findings) {
      assert.ok(f.finding.length > 10);
      assert.ok(f.mechanism.length > 20);
      assert.ok(f.clinicalMeaning.length > 15);
      assert.ok(['emergency', 'common', 'systemic'].includes(f.priority));
    }
  }
});

test('Piotórax possui etapas diagnósticas sequenciais com padrão ouro identificado', () => {
  const disease = diseasesSeed.find((item) => item.slug === SLUG)!;
  const diag = disease.diagnosis;
  assert.ok(Array.isArray(diag), 'esperava array de EditorialDiagnosticStep');
  assert.ok(diag.length >= 6, 'esperava pelo menos 6 etapas diagnósticas');

  const goldStandards = diag.filter((step) => step.isGoldStandard === true);
  assert.equal(goldStandards.length, 1, 'esperava exatamente 1 etapa marcada como padrão ouro (Citopatologia)');
  assert.ok(goldStandards[0].title.toLowerCase().includes('citopatológica') || goldStandards[0].title.toLowerCase().includes('citologia'));

  diag.forEach((step, idx) => {
    assert.equal(step.stepNumber, idx + 1);
    assert.ok(step.title.length > 15);
    assert.ok(step.purpose.length > 20);
    assert.ok(step.description.length > 50);
    assert.ok(step.interpretation.length > 30);
    assert.ok(step.limitations.length > 20);
  });
});

test('Piotórax possui módulos terapêuticos completos com dosagens e diretrizes farmacológicas', () => {
  const disease = diseasesSeed.find((item) => item.slug === SLUG)!;
  const treat = disease.treatment as Record<string, string>;

  assert.ok(treat.metaPrimaria, 'deve ter meta primária');
  assert.ok(treat.estabilizacaoEmergencialOxigenoterapia, 'deve ter estabilização');
  assert.ok(treat.toracocenteseDeAlivio, 'deve ter toracocentese');
  assert.ok(treat.drenagemToracicaToracostomia, 'deve ter toracostomia');
  assert.ok(treat.lavagemPleuralIsotonica, 'deve ter lavagem pleural');
  assert.ok(treat.antimicrobianosEmpiricosIniciais, 'deve ter antimicrobianos empíricos');
  assert.ok(treat.ajustePorCulturaEStewardship, 'deve ter ajuste por cultura');
  assert.ok(treat.terapiaAnalgesicaMultimodal, 'deve ter analgesia multimodal');
  assert.ok(treat.indicacoesTomografiaECirurgia, 'deve ter indicações cirúrgicas');
  assert.ok(treat.terapiasInadequadasEMitos, 'deve ter terapias inadequadas e mitos');
  assert.ok(treat.monitoramentoCriticoECriteriosRetiradaDreno, 'deve ter monitoramento e critérios de retirada');

  // Verificar dosagens e regras fundamentais
  assert.ok(treat.antimicrobianosEmpiricosIniciais.includes('22 a 30 mg/kg'), 'dose ampicilina-sulbactam');
  assert.ok(treat.antimicrobianosEmpiricosIniciais.includes('5,0 mg/kg'), 'teto seguro enrofloxacina em gatos');
  assert.ok(treat.lavagemPleuralIsotonica.includes('75%'), 'regra de recuperação de volume');
  assert.ok(treat.lavagemPleuralIsotonica.includes('10 a 20 mL/kg'), 'volume de lavagem');
  assert.ok(treat.terapiasInadequadasEMitos.includes('radiografia'), 'alerta sobre raio-x antes de drenar');
});

test('Subseções editoriais traduzem corretamente sem chaves cruas', () => {
  const testKeys = [
    'definicaoEConceitoDeEspacoFechado',
    'mecanismosDeInoculacaoPorEspecie',
    'microbiologiaComparadaTabela',
    'patogenosEspeciaisActinomycesENocardia',
    'desmistificacaoDoPiotoraxIdiopatico',
    'perfilEpidemiologicoCaninoETrabalho',
    'perfilEpidemiologicoFelinoEComportamento',
    'dadosMulticentricosInternacionais',
    'mecanicaVentilatoriaEEfusaoPleural',
    'barreiraDeFibrinaELoculacao',
    'sepseSistêmicaEConsequenciasHemodinamicas',
    'cineticaDoLactatoEHipoperfusao',
    'metaPrimaria',
    'estabilizacaoEmergencialOxigenoterapia',
    'toracocenteseDeAlivio',
    'drenagemToracicaToracostomia',
    'lavagemPleuralIsotonica',
    'antimicrobianosEmpiricosIniciais',
    'ajustePorCulturaEStewardship',
    'terapiaAnalgesicaMultimodal',
    'indicacoesTomografiaECirurgia',
    'terapiasInadequadasEMitos',
    'monitoramentoCriticoECriteriosRetiradaDreno',
    'casoClinicoFelinoPiotoraxSubagudo',
    'casoClinicoCaninoCorpoEstranhoVegetal',
    'prognosticoEEvidenciaCientifica',
    'principaisComplicacoesClinicasECirurgicas',
    'pilaresDePrevencaoEControleDomiciliar',
  ];

  for (const k of testKeys) {
    const translated = translateEditorialSubsectionKey(k);
    assert.notEqual(translated, k, `chave crua não deve ser retornada: ${k}`);
    assert.ok(translated.length > 5, `tradução muito curta para ${k}`);
  }
});

test('Referências bibliográficas contêm os estudos fundamentais com DOI e livros clássicos', () => {
  const disease = diseasesSeed.find((item) => item.slug === SLUG)!;
  const refs = disease.references!;
  assert.ok(refs.length >= 10, 'esperava pelo menos 10 referências');

  const refTexts = refs.map((r) => r.citationText).join(' ').toLowerCase();
  assert.ok(refTexts.includes('lappin'), 'deve citar Lappin et al. 2017 (ISCAID)');
  assert.ok(refTexts.includes('johnson'), 'deve citar Johnson et al. 2023');
  assert.ok(refTexts.includes('heier'), 'deve citar Heier et al. 2022');
  assert.ok(refTexts.includes('sim'), 'deve citar Sim et al. 2021');
  assert.ok(refTexts.includes('eiras-diaz'), 'deve citar Eiras-Diaz et al. 2021');
  assert.ok(refTexts.includes('krämer') || refTexts.includes('kramer'), 'deve citar Krämer et al. 2021');
  assert.ok(refTexts.includes('nelson'), 'deve citar Nelson & Couto');
  assert.ok(refTexts.includes('ettinger'), 'deve citar Ettinger');
  assert.ok(refTexts.includes('bsava'), 'deve citar BSAVA Guide to Procedures');
  assert.ok(refTexts.includes('plumb'), 'deve citar Plumb');
});

test('Ausência absoluta de marcadores literais de asterisco duplo (**) em strings', () => {
  const seedPath = path.resolve('modules/consulta-vet/data/seed/diseases.piotorax.seed.ts');
  const code = fs.readFileSync(seedPath, 'utf8');

  const cleanCode = code
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '');

  assert.ok(!cleanCode.includes('**'), 'código não pode conter marcadores literais de asterisco duplo (**) em strings');
});
