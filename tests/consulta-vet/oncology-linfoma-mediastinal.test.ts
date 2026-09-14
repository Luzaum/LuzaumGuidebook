import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import path from 'node:path';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';
import { translateEditorialSubsectionKey } from '../../modules/consulta-vet/utils/editorialSubsectionLabels';

const SLUG = 'linfoma-mediastinal-caes-gatos';

test('Linfoma Mediastinal existe em diseasesSeed com metadados corretos', () => {
  const disease = diseasesSeed.find((item) => item.slug === SLUG);
  assert.ok(disease, `esperava encontrar ${SLUG} em diseasesSeed`);
  assert.equal(disease!.category, 'oncologia');
  assert.ok(disease!.categories?.includes('urgencia-emergencia'));
  assert.ok(disease!.categories?.includes('pneumologia'));
  assert.ok(disease!.categories?.includes('medicina-felina'));
  assert.equal(disease!.isPublished, true);
  assert.ok(disease!.species.includes('dog'));
  assert.ok(disease!.species.includes('cat'));
  assert.ok(disease!.tags.includes('linfoma'));
  assert.ok(disease!.tags.includes('mediastino'));
  assert.ok(disease!.tags.includes('hipercalcemia'));
  assert.ok(disease!.tags.includes('felv'));
  assert.ok(disease!.tags.includes('chop'));
  assert.ok(disease!.tags.includes('cop'));
});

test('Linfoma Mediastinal está listado no catálogo público e possui stub de card', () => {
  assert.ok(
    (CONSULTA_VET_PUBLIC_DISEASE_SLUGS as readonly string[]).includes(SLUG),
    `esperava encontrar ${SLUG} em CONSULTA_VET_PUBLIC_DISEASE_SLUGS`,
  );
  const cardStub = PUBLIC_CATALOG_DISEASE_CARD_STUBS.find((card) => card.slug === SLUG);
  assert.ok(cardStub, `esperava encontrar stub para ${SLUG}`);
  assert.ok(cardStub!.quickSummary.length > 50);
  assert.equal(cardStub!.title, 'Linfoma Mediastinal');
  assert.ok(cardStub!.species.includes('dog'));
  assert.ok(cardStub!.species.includes('cat'));
});

test('Linfoma Mediastinal possui linguagem simples completa para tutores', () => {
  const plain = DISEASE_PLAIN_LANGUAGE[SLUG];
  assert.ok(plain, 'esperava registro de linguagem simples para tutores');
  assert.ok(plain!.whatIsIt.length > 80);
  assert.ok(plain!.keyPoints.length >= 5);
  for (const kp of plain!.keyPoints) {
    assert.ok(kp.length > 20);
  }
});

test('Linfoma Mediastinal possui resumo clínico rico com pilares e fluxos estruturados', () => {
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

test('Linfoma Mediastinal possui 5 figuras clínicas reais armazenadas em public/', () => {
  const disease = diseasesSeed.find((item) => item.slug === SLUG)!;
  const figures = disease.figures as Array<{ src: string; caption: string; alt: string }>;
  assert.ok(Array.isArray(figures), 'esperava array de figuras');
  assert.equal(figures.length, 5, 'esperava 5 figuras clínicas');

  for (const fig of figures) {
    assert.ok(fig.src.startsWith('/consulta-vet/linfoma-mediastinal/'));
    assert.ok(fig.caption.length > 40);
    assert.ok(fig.alt.length > 15);

    const fullPath = path.resolve('public' + fig.src);
    assert.ok(fs.existsSync(fullPath), `arquivo de figura não encontrado: ${fullPath}`);
    const stats = fs.statSync(fullPath);
    assert.ok(stats.size > 50000, `arquivo muito pequeno (${stats.size}b): ${fullPath}`);
  }
});

test('Linfoma Mediastinal possui achados clínicos agrupados por sistemas (EditorialSystemGroup[])', () => {
  const disease = diseasesSeed.find((item) => item.slug === SLUG)!;
  const systems = disease.clinicalSignsPathophysiology;
  assert.ok(Array.isArray(systems), 'esperava array de EditorialSystemGroup');
  assert.ok(systems.length >= 6, 'esperava pelo menos 6 grupos de sistemas');

  const systemNames = systems.map((s) => s.system);
  assert.ok(systemNames.includes('respiratory'), 'deve incluir respiratório');
  assert.ok(systemNames.includes('cardiovascular'), 'deve incluir cardiovascular (precaval)');
  assert.ok(systemNames.includes('general'), 'deve incluir geral/sistêmico (subestágio b)');
  assert.ok(systemNames.includes('gastrointestinal'), 'deve incluir gastrointestinal (regurgitação/disfagia)');
  assert.ok(systemNames.includes('neurological'), 'deve incluir neurológico (Horner)');
  assert.ok(systemNames.includes('metabolic'), 'deve incluir metabólico (hipercalcemia/PTHrP)');

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

test('Linfoma Mediastinal possui etapas diagnósticas sequenciais com padrão ouro identificado', () => {
  const disease = diseasesSeed.find((item) => item.slug === SLUG)!;
  const diag = disease.diagnosis;
  assert.ok(Array.isArray(diag), 'esperava array de EditorialDiagnosticStep');
  assert.ok(diag.length >= 6, 'esperava pelo menos 6 etapas diagnósticas');

  const goldStandards = diag.filter((step) => step.isGoldStandard === true);
  assert.equal(goldStandards.length, 1, 'esperava exatamente 1 etapa marcada como padrão ouro (PAAF/Citopatologia)');
  assert.ok(goldStandards[0].title.toLowerCase().includes('paaf'));

  // Verificar sequência de passos
  diag.forEach((step, idx) => {
    assert.equal(step.stepNumber, idx + 1);
    assert.ok(step.title.length > 15);
    assert.ok(step.purpose.length > 20);
    assert.ok(step.description.length > 50);
    assert.ok(step.interpretation.length > 30);
    assert.ok(step.limitations.length > 20);
  });
});

test('Linfoma Mediastinal possui módulos terapêuticos completos com dosagens e diretrizes farmacológicas', () => {
  const disease = diseasesSeed.find((item) => item.slug === SLUG)!;
  const treat = disease.treatment as Record<string, string>;

  assert.ok(treat.metaPrimaria, 'deve ter meta primária');
  assert.ok(treat.protocoloCHOPCanino, 'deve ter protocolo CHOP canino');
  assert.ok(treat.protocoloCOPFelino, 'deve ter protocolo COP felino');
  assert.ok(treat.protocolosAlternativosLomustina, 'deve ter protocolos com lomustina');
  assert.ok(treat.manejoHipercalcemiaMalignidade, 'deve ter manejo de hipercalcemia');
  assert.ok(treat.sindromeLiseTumoralPrevencao, 'deve ter prevenção de lise tumoral');
  assert.ok(treat.terapiasInadequadasECirurgia, 'deve ter contraindicações formais');
  assert.ok(treat.monitoramentoSeriadoEOrgaosAlvo, 'deve ter monitoramento seriado');

  // Verificar dosagens e regras fundamentais
  assert.ok(treat.protocoloCHOPCanino.includes('0,7 mg/m²'), 'dose vincristina');
  assert.ok(treat.protocoloCHOPCanino.includes('30 mg/m²'), 'dose doxorrubicina cães >15kg');
  assert.ok(treat.protocoloCHOPCanino.includes('1,0 mg/kg'), 'dose doxorrubicina cães <=15kg');
  assert.ok(treat.manejoHipercalcemiaMalignidade.includes('NaCl 0,9%'), 'solução de escolha');
  assert.ok(treat.manejoHipercalcemiaMalignidade.includes('pamidronato'), 'bisfosfonato');
  assert.ok(treat.terapiasInadequadasECirurgia.includes('Toracotomia'), 'contraindicação cirúrgica');
});

test('Subseções editoriais traduzem corretamente sem chaves cruas', () => {
  const testKeys = [
    'diferencaFundamentalLinfomaTimomaTabela',
    'anatomiaEBasesFisiopatologicas',
    'biologiaDoTimoEArmadilhaDiagnostica',
    'distribuicaoPorEspecieETabela',
    'oncogeneseERetrovirusFelino',
    'protocoloCHOPCanino',
    'protocoloCOPFelino',
    'protocolosAlternativosLomustina',
    'manejoHipercalcemiaMalignidade',
    'sindromeLiseTumoralPrevencao',
    'terapiasInadequadasECirurgia',
    'monitoramentoSeriadoEOrgaosAlvo',
    'expectativaDeVidaCanina2026',
    'expectativaDeVidaFelina',
    'prevencaoFelineRetrovirus',
    'vigilanciaClinicaEDomiciliar',
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
  assert.ok(refTexts.includes('machado'), 'deve citar Machado et al. 2026');
  assert.ok(refTexts.includes('fabrizio'), 'deve citar Fabrizio et al. 2014');
  assert.ok(refTexts.includes('bernardi'), 'deve citar Bernardi et al. 2020');
  assert.ok(refTexts.includes('yu'), 'deve citar Yu et al. 2022');
  assert.ok(refTexts.includes('sunpongsri'), 'deve citar Sunpongsri et al. 2022');
  assert.ok(refTexts.includes('withrow'), 'deve citar Withrow & MacEwen');
  assert.ok(refTexts.includes('nelson'), 'deve citar Nelson & Couto');
  assert.ok(refTexts.includes('plumb'), 'deve citar Plumb');
});

test('Ausência absoluta de marcadores literais de asterisco duplo (**)', () => {
  const seedPath = path.resolve('modules/consulta-vet/data/seed/diseases.linfoma-mediastinal.seed.ts');
  const code = fs.readFileSync(seedPath, 'utf8');

  // Remove comentários de bloco /* ... */ e linha // ...
  const cleanCode = code
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '');

  assert.ok(!cleanCode.includes('**'), 'código não pode conter marcadores literais de asterisco duplo (**) em strings');
});
