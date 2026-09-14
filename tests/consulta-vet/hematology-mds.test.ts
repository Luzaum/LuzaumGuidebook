import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import path from 'node:path';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { sindromeMielodisplasicaRecord } from '../../modules/consulta-vet/data/seed/diseases.sindrome-mielodisplasica.seed';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';
import { translateEditorialSubsectionKey } from '../../modules/consulta-vet/utils/editorialSubsectionLabels';
import type { EditorialSystemGroup, EditorialDiagnosticStep } from '../../modules/consulta-vet/types/common';

const SLUG = 'sindrome-mielodisplasica-caes-gatos';

test('MDS existe em diseasesSeed com metadados corretos', () => {
  const disease = diseasesSeed.find((item) => item.slug === SLUG);
  assert.ok(disease, `esperava encontrar ${SLUG} em diseasesSeed`);
  assert.equal(disease!.category, 'hematologia');
  assert.ok(disease!.categories?.includes('oncologia'));
  assert.ok(disease!.categories?.includes('clinica-medica'));
  assert.equal(disease!.isPublished, true);
  assert.ok(disease!.species.includes('dog'));
  assert.ok(disease!.species.includes('cat'));
  assert.ok(disease!.tags.includes('MDS'));
  assert.ok(disease!.tags.includes('Hematopoiese ineficaz'));
  assert.ok(disease!.tags.includes('Blasts medulares'));
});

test('MDS está listada no catálogo público e possui stub de card', () => {
  assert.ok(
    (CONSULTA_VET_PUBLIC_DISEASE_SLUGS as readonly string[]).includes(SLUG),
    `esperava encontrar ${SLUG} em CONSULTA_VET_PUBLIC_DISEASE_SLUGS`,
  );
  const cardStub = PUBLIC_CATALOG_DISEASE_CARD_STUBS.find((card) => card.slug === SLUG);
  assert.ok(cardStub, `esperava encontrar stub para ${SLUG}`);
  assert.ok(cardStub!.quickSummary.length > 50);
  assert.equal(cardStub!.title, 'Síndrome mielodisplásica (MDS)');
  assert.ok(cardStub!.species.includes('dog'));
  assert.ok(cardStub!.species.includes('cat'));
});

test('MDS possui linguagem simples completa para tutores', () => {
  const plain = DISEASE_PLAIN_LANGUAGE[SLUG];
  assert.ok(plain, 'esperava registro de linguagem simples para MDS');
  assert.ok(plain.whatIsIt.length > 100);
  assert.ok(plain.keyPoints.length >= 6, 'esperava pelo menos 6 keyPoints para tutores');
});

test('MDS possui faixa de decisão rápida e rica estrutura editorial', () => {
  const disease = diseasesSeed.find((item) => item.slug === SLUG)!;
  assert.ok(disease.quickDecisionStrip.length >= 8);
  assert.ok((disease.references ?? []).length >= 10);
  assert.ok(disease.quickSummaryRich);
  assert.ok(disease.quickSummaryRich.pillars && disease.quickSummaryRich.pillars.length >= 4);
  assert.ok(disease.quickSummaryRich.diagnosticFlow?.steps.length! >= 5);
  assert.ok(disease.quickSummaryRich.treatmentFlow?.steps.length! >= 4);
});

test('MDS possui figuras clínicas reais armazenadas em public/ e verificadas em disco', () => {
  const disease = diseasesSeed.find((item) => item.slug === SLUG)!;
  const figures = disease.figures as any[];
  assert.ok(Array.isArray(figures), 'figures deve ser um array');
  assert.ok(figures.length >= 5, 'esperava pelo menos 5 figuras clínicas');

  figures.forEach((fig) => {
    assert.equal(fig.kind, 'clinicalFigure');
    assert.ok(fig.src.startsWith('/consulta-vet/sindrome-mielodisplasica/'));
    const relativePath = fig.src.replace(/^\//, '');
    const fullPath = path.resolve(process.cwd(), 'public', relativePath.replace('public/', ''));
    const exists = fs.existsSync(fullPath);
    assert.ok(exists, `Arquivo de imagem física não encontrado em: ${fullPath}`);
    const stats = fs.statSync(fullPath);
    assert.ok(stats.size > 10000, `Arquivo de imagem muito pequeno ou corrompido: ${fullPath} (${stats.size} bytes)`);
  });
});

test('MDS possui achados clínicos agrupados por sistemas (EditorialSystemGroup[])', () => {
  const groups = sindromeMielodisplasicaRecord.clinicalSignsPathophysiology as EditorialSystemGroup[];
  assert.ok(Array.isArray(groups), 'clinicalSignsPathophysiology deve ser um array de sistemas');
  assert.ok(groups.length >= 4, 'esperava pelo menos 4 grupos sistêmicos');

  const systems = groups.map((g) => g.system);
  assert.ok(systems.includes('hematologic'), 'deve conter sistema hematológico');
  assert.ok(systems.includes('cardiovascular'), 'deve conter sistema cardiovascular');
  assert.ok(systems.includes('general'), 'deve conter sistema geral');
  assert.ok(systems.includes('immunologic'), 'deve conter sistema imunológico');

  groups.forEach((group) => {
    assert.ok(group.findings.length > 0, `grupo ${group.system} sem achados`);
    group.findings.forEach((finding) => {
      if (typeof finding === 'object') {
        assert.ok(finding.finding.length > 10, 'finding deve ter texto descritivo');
        assert.ok(finding.mechanism.length > 20, 'mechanism deve ter explicação fisiopatológica');
        assert.ok(finding.clinicalMeaning && finding.clinicalMeaning.length > 15, 'clinicalMeaning deve ser explícito');
      }
    });
  });
});

test('MDS possui etapas diagnósticas sequenciais com padrão ouro identificado', () => {
  const steps = sindromeMielodisplasicaRecord.diagnosis as EditorialDiagnosticStep[];
  assert.ok(Array.isArray(steps), 'diagnosis deve ser um array de passos');
  assert.ok(steps.length >= 5, 'esperava pelo menos 5 etapas diagnósticas');

  const goldStep = steps.find((s) => s.isGoldStandard === true);
  assert.ok(goldStep, 'deve existir uma etapa marcada como isGoldStandard: true');
  assert.ok(
    goldStep!.title.toLowerCase().includes('biópsia') || goldStep!.title.toLowerCase().includes('biopsia'),
    'etapa padrão ouro deve ser a biópsia de medula óssea (core biopsy)',
  );

  steps.forEach((step) => {
    assert.ok(step.title.length > 5, 'título da etapa deve ser claro');
    assert.ok(step.purpose && step.purpose.length > 15, 'finalidade clínica (purpose) deve ser explicada');
    assert.ok(step.description.length > 20, 'descrição técnica (description) deve ser detalhada');
  });
});

test('MDS possui módulos terapêuticos completos com dosagens e diretrizes farmacológicas', () => {
  const treatment = sindromeMielodisplasicaRecord.treatment as Record<string, any>;
  assert.ok(treatment, 'treatment deve ser um objeto modular');
  assert.ok(treatment.suporteTransfusionalHemacias, 'deve abordar transfusão de concentrado de hemácias');
  assert.ok(treatment.manejoNeutropeniaFebril, 'deve abordar neutropenia febril');
  assert.ok(treatment.quimioterapiaMatsuyamaProtocoloCitarabinaDoxorrubicina, 'deve abordar protocolo Matsuyama');
  assert.ok(treatment.azacitidinaEmFelinos, 'deve abordar azacitidina em gatos');

  const serialized = JSON.stringify(treatment).toLowerCase();
  assert.ok(serialized.includes('10 a 15 ml/kg') || serialized.includes('10–15 ml/kg'), 'deve conter dose de hemácias');
  assert.ok(serialized.includes('30 mg/m²') || serialized.includes('30 mg/m2'), 'deve conter dose de doxorrubicina');
  assert.ok(serialized.includes('300 mg/m²') || serialized.includes('300 mg/m2'), 'deve conter dose de citarabina CRI');
  assert.ok(serialized.includes('marbofloxacino') || serialized.includes('retinopatia'), 'deve alertar sobre fluoroquinolonas em felinos');
});

test('Subseções editoriais traduzem corretamente sem chaves cruas', () => {
  const sectionsToCheck = [
    'definicaoNaturezaClonal',
    'dismielopoieseSecundariaReativa',
    'etiologiaFelinaFeLV',
    'populacaoCanina',
    'anemiaNaoRegenerativaEMacrocitose',
    'fronteiraTaxonomicaMdsVsAml',
    'suporteTransfusionalHemacias',
    'manejoNeutropeniaFebril',
    'quimioterapiaMatsuyamaProtocoloCitarabinaDoxorrubicina',
    'transformacaoEmLeucemiaMieloideAguda',
    'prognosticoCenarioCaninoContemporaneo',
  ];

  sectionsToCheck.forEach((key) => {
    const label = translateEditorialSubsectionKey(key);
    assert.notEqual(label, key, `chave ${key} não possui tradução e gerou texto cru`);
    assert.ok(label.length > 5, `rótulo para ${key} muito curto`);
  });
});

test('MDS aborda achados críticos: medula hipercelular, macrocitose não regenerativa e FeLV', () => {
  const disease = diseasesSeed.find((item) => item.slug === SLUG)!;
  const serialized = JSON.stringify(disease).toLowerCase();
  assert.ok(serialized.includes('medula cheia') || serialized.includes('hipercelular'), 'deve citar medula hipercelular');
  assert.ok(serialized.includes('macrocitose'), 'deve citar macrocitose');
  assert.ok(serialized.includes('felv'), 'deve citar associação com FeLV');
  assert.ok(serialized.includes('dismielopoiese secundária') || serialized.includes('dismielopoiese secundaria'), 'deve citar dismielopoiese secundária');
});

test('MDS detalha os estudos seminais: Meredith 2025, Matsuyama 2023, Weiss & Aird 2001', () => {
  const disease = diseasesSeed.find((item) => item.slug === SLUG)!;
  const serialized = JSON.stringify(disease);
  assert.ok(serialized.includes('Meredith'), 'deve citar estudo de Meredith et al. 2025');
  assert.ok(serialized.includes('Matsuyama'), 'deve citar estudo de Matsuyama et al. 2023');
  assert.ok(serialized.includes('Weiss'), 'deve citar Weiss & Aird 2001');
  assert.ok(serialized.includes('384') && serialized.includes('6 dias'), 'deve citar sobrevida 384 dias vs 6 dias da AML');
});

test('MDS não contém marcadores literais de asterisco duplo (**)', () => {
  const disease = diseasesSeed.find((item) => item.slug === SLUG)!;
  const serialized = JSON.stringify(disease);
  assert.ok(!serialized.includes('**'), 'não deve conter ** em nenhum campo');
});
