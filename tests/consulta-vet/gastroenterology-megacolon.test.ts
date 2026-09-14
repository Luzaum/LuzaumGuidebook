import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import path from 'node:path';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';
import { translateEditorialSubsectionKey } from '../../modules/consulta-vet/utils/editorialSubsectionLabels';

const SLUG = 'megacolon-caes-gatos';

test('Megacólon existe em diseasesSeed com metadados corretos', () => {
  const disease = diseasesSeed.find((item) => item.slug === SLUG);
  assert.ok(disease, `esperava encontrar ${SLUG} em diseasesSeed`);
  assert.equal(disease!.category, 'gastroenterologia');
  assert.ok(disease!.categories?.includes('emergencia-intensivismo'));
  assert.ok(disease!.categories?.includes('clinica-medica'));
  assert.ok(disease!.categories?.includes('cirurgia'));
  assert.equal(disease!.isPublished, true);
  assert.ok(disease!.species.includes('cat'));
  assert.ok(disease!.species.includes('dog'));
  assert.ok(disease!.tags.includes('Megacólon'));
  assert.ok(disease!.tags.includes('Constipação'));
  assert.ok(disease!.tags.includes('Obstipação'));
  assert.ok(disease!.tags.includes('MCD/L5'));
  assert.ok(disease!.tags.includes('Cisaprida'));
  assert.ok(disease!.tags.includes('PEG 3350'));
  assert.ok(disease!.tags.includes('Colectomia subtotal'));
});

test('Megacólon está listado no catálogo público e possui stub de card', () => {
  assert.ok(
    (CONSULTA_VET_PUBLIC_DISEASE_SLUGS as readonly string[]).includes(SLUG),
    `esperava encontrar ${SLUG} em CONSULTA_VET_PUBLIC_DISEASE_SLUGS`,
  );
  const cardStub = PUBLIC_CATALOG_DISEASE_CARD_STUBS.find((card) => card.slug === SLUG);
  assert.ok(cardStub, `esperava encontrar stub para ${SLUG}`);
  assert.ok(cardStub!.quickSummary.length > 50);
  assert.equal(cardStub!.title, 'Megacólon');
  assert.ok(cardStub!.species.includes('cat'));
  assert.ok(cardStub!.species.includes('dog'));
});

test('Megacólon possui linguagem simples completa para tutores', () => {
  const plain = DISEASE_PLAIN_LANGUAGE[SLUG];
  assert.ok(plain, 'esperava registro de linguagem simples para megacólon');
  assert.ok(plain.whatIsIt.length > 100);
  assert.ok(plain.keyPoints.length >= 4);
});

test('Megacólon possui faixa de decisão rápida e rica estrutura editorial', () => {
  const disease = diseasesSeed.find((item) => item.slug === SLUG)!;
  assert.ok(disease.quickDecisionStrip.length >= 8);
  assert.ok((disease.references ?? []).length >= 12);
  assert.ok(disease.quickSummaryRich);
  assert.ok(disease.quickSummaryRich.pillars.length >= 4);
  assert.ok(disease.quickSummaryRich.diagnosticFlow?.steps.length! >= 5);
  assert.ok(disease.quickSummaryRich.treatmentFlow?.steps.length! >= 5);
});

test('Megacólon possui clinicalSignsPathophysiology em formato de ARRAY por sistemas (padrão CID)', () => {
  const disease = diseasesSeed.find((item) => item.slug === SLUG)!;
  assert.ok(Array.isArray(disease.clinicalSignsPathophysiology), 'deve ser um array de sistemas');
  const systems = (disease.clinicalSignsPathophysiology as any[]).map((g) => g.system);
  assert.ok(systems.includes('gastrointestinal'), 'deve conter sistema gastrointestinal');
  assert.ok(systems.includes('general'), 'deve conter sistema geral');
  assert.ok(systems.includes('musculoskeletal'), 'deve conter sistema musculoesquelético');
  assert.ok(systems.includes('urinary'), 'deve conter sistema urinário');
  assert.ok(systems.includes('neurological'), 'deve conter sistema neurológico');

  const giGroup = (disease.clinicalSignsPathophysiology as any[]).find((g) => g.system === 'gastrointestinal');
  assert.ok(giGroup.findings.length >= 3);
  assert.ok(giGroup.findings[0].finding);
  assert.ok(giGroup.findings[0].mechanism);
  assert.ok(giGroup.findings[0].clinicalMeaning);
});

test('Megacólon possui diagnosis em formato de ARRAY de etapas com padrão ouro (padrão CID)', () => {
  const disease = diseasesSeed.find((item) => item.slug === SLUG)!;
  assert.ok(Array.isArray(disease.diagnosis), 'diagnosis deve ser um array de etapas');
  const steps = disease.diagnosis as any[];
  assert.equal(steps.length, 6, 'deve conter 6 etapas diagnósticas estruturadas');

  const step3 = steps.find((s) => s.stepNumber === 3);
  assert.ok(step3, 'deve existir etapa 3');
  assert.equal(step3.isGoldStandard, true, 'etapa 3 (Radiografia MCD/L5) deve ser padrão ouro');
  assert.ok(step3.title.includes('MCD/L5'), 'etapa 3 deve citar MCD/L5');
  assert.ok(step3.purpose.length > 20);
  assert.ok(step3.description.length > 50);
  assert.ok(step3.interpretation.length > 50);
  assert.ok(step3.limitations.length > 50);
});

test('Megacólon aborda distinção conceitual e diferenças entre espécies (Washabau e Tzimtzimis)', () => {
  const disease = diseasesSeed.find((item) => item.slug === SLUG)!;
  const serialized = JSON.stringify(disease).toLowerCase();
  assert.ok(serialized.includes('constipação') || serialized.includes('constipacao'), 'deve citar constipação');
  assert.ok(serialized.includes('obstipação') || serialized.includes('obstipacao'), 'deve citar obstipação');
  assert.ok(serialized.includes('inércia colônica') || serialized.includes('inercia colonica'), 'deve citar inércia colônica');
  assert.ok(serialized.includes('impactação fecal') || serialized.includes('impactacao fecal'), 'deve citar impactação fecal');
  assert.ok(serialized.includes('washabau'), 'deve citar Washabau & Stalis 1996');
  assert.ok(serialized.includes('tzimtzimis'), 'deve citar Tzimtzimis et al. 2019');
  assert.ok(serialized.includes('58 cães') || serialized.includes('58 caes'), 'deve citar coorte canina de 58 cães');
});

test('Megacólon aborda neuroanatomia, DRC e correlações lombossacras', () => {
  const disease = diseasesSeed.find((item) => item.slug === SLUG)!;
  const serialized = JSON.stringify(disease);
  assert.ok(serialized.includes('pélvico') || serialized.includes('pelvico'), 'deve citar nervo pélvico');
  assert.ok(serialized.includes('hipogástrico') || serialized.includes('hipogastrico'), 'deve citar nervos hipogástricos');
  assert.ok(serialized.includes('pudendo'), 'deve citar nervo pudendo');
  assert.ok(serialized.includes('Benjamin'), 'deve citar Benjamin & Drobatz 2020');
  assert.ok(serialized.includes('3,8') || serialized.includes('OR 3,8'), 'deve citar OR de 3,8 para DRC');
  assert.ok(serialized.includes('Jones'), 'deve citar Jones et al. 2022');
  assert.ok(serialized.includes('Petivity') || serialized.includes('George'), 'deve citar Petivity / George et al. 2025');
  assert.ok(serialized.includes('Thanaboonnipat'), 'deve citar Thanaboonnipat et al. 2021');
  assert.ok(serialized.includes('4,107') || serialized.includes('1,731'), 'deve citar OR de alterações lombossacras');
  assert.ok(serialized.includes('hiperparatireoidismo'), 'deve desmistificar hiperparatireoidismo nutricional');
});

test('Megacólon detalha exame clínico, regra da bexiga e métrica radiográfica MCD/L5', () => {
  const disease = diseasesSeed.find((item) => item.slug === SLUG)!;
  const serialized = JSON.stringify(disease);
  assert.ok(serialized.includes('bexiga') || serialized.includes('vesícula urinária'), 'deve alertar para palpação da bexiga antes do cólon');
  assert.ok(serialized.includes('toque retal') || serialized.includes('exame digital'), 'deve enfatizar o toque retal');
  assert.ok(serialized.includes('Trevail'), 'deve citar Trevail et al. 2011');
  assert.ok(serialized.includes('1,48'), 'deve citar corte de 1,48 no MCD/L5');
  assert.ok(serialized.includes('1,28'), 'deve citar corte de 1,28 no MCD/L5');
  assert.ok(serialized.includes('77%') && serialized.includes('85%'), 'deve citar Se 77% e Sp 85% do MCD/L5');
  assert.ok(serialized.includes('Abdelbaset'), 'deve citar Abdelbaset-Ismail et al. 2022');
});

test('Megacólon detalha terapêutica de resgate, PEG 3350, cisaprida, paradoxo da fibra e cirurgia', () => {
  const disease = diseasesSeed.find((item) => item.slug === SLUG)!;
  const serialized = JSON.stringify(disease);
  assert.ok(serialized.includes('hidrate') || serialized.includes('fluidoterapia'), 'deve priorizar hidratação antes de empurrar');
  assert.ok(serialized.includes('fosfato'), 'deve enfatizar proibição absoluta de enemas de fosfato em gatos');
  assert.ok(serialized.includes('Minilax'), 'deve detalhar ressalvas do Minilax');
  assert.ok(serialized.includes('PEG 3350') || serialized.includes('Polietilenoglicol'), 'deve detalhar PEG 3350');
  assert.ok(serialized.includes('Tam'), 'deve citar estudo de Tam et al. 2011 para PEG oral');
  assert.ok(serialized.includes('6 a 10 mL/kg') || serialized.includes('6–10 mL/kg'), 'deve citar infusão por sonda de PEG-ELS');
  assert.ok(serialized.includes('Cisaprida') || serialized.includes('cisaprida'), 'deve detalhar cisaprida');
  assert.ok(serialized.includes('5-HT4'), 'deve citar mecanismo 5-HT4 da cisaprida');
  assert.ok(serialized.includes('Hasler'), 'deve citar Hasler & Washabau 1997');
  assert.ok(serialized.includes('baixo resíduo') || serialized.includes('paradoxo da fibra'), 'deve detalhar paradoxo da fibra');
  assert.ok(serialized.includes('Grossman'), 'deve citar Grossman et al. 2021');
  assert.ok(serialized.includes('ileocecocólica') || serialized.includes('ileocólica'), 'deve enfatizar preservação da junção ileocecocólica');
  assert.ok(serialized.includes('Németh') || serialized.includes('Nemeth'), 'deve citar Németh et al. 2008 para cães');
});

test('Megacólon possui 4 figuras clínicas/radiográficas integradas e salvas em disco', () => {
  const disease = diseasesSeed.find((item) => item.slug === SLUG)!;
  const serialized = JSON.stringify(disease);

  const figures = [
    'fvets-09-1033090-g0001.webp',
    'fvets-09-1033090-g0002.webp',
    'fvets-09-1033090-g0008.webp',
    'fvets-09-1033090-g0009.webp',
  ];

  for (const fig of figures) {
    assert.ok(serialized.includes(fig), `esperava que a doença referencie a figura ${fig}`);
    const fullPath = path.join('c:/Users/luzau/OneDrive/Documentos/GitHub/LuzaumGuidebook/public/consulta-vet/megacolon', fig);
    assert.ok(fs.existsSync(fullPath), `esperava que o arquivo exista em disco: ${fullPath}`);
    const stat = fs.statSync(fullPath);
    assert.ok(stat.size > 50000, `arquivo ${fig} parece corrompido ou muito pequeno: ${stat.size} bytes`);
  }
});

test('subseções de Megacólon possuem rótulos com acentuação editorial preservada', () => {
  const keys = [
    'definicaoEConceito',
    'diferencaEspeciesMegacolonTabela',
    'neuroanatomiaDefecacao',
    'etiologiaMecanismosTabela',
    'fisiopatogeniaIdiopaticaWashabau',
    'remodelamentoTemporalHistologico',
    'comorbidadesDRCEColuna',
    'desmistificacaoHiperparaNutricional',
    'mecanismosCelularesMural',
    'figuraRadiografiaNormal',
    'figuraRadiografiaMegacolon',
    'figuraHistopatologiaRemodelamento',
    'figuraQuantificacaoHistologica',
    'consequenciasSistemicasEIsquemia',
    'metaPrimaria',
    'desimpactacaoAguda',
    'farmacoterapiaManutencao',
    'paradoxoDaFibraEManejoDietetico',
    'intervencaoCirurgica',
    'terapiasInadequadas',
    'monitoramentoSeriado',
    'isquemiaEPerfuracaoDiastatica',
    'intoxicacaoPorEnemaFosfato',
    'diarreiaCronicaPosColectomia',
    'prevencaoRecidivasAmbiente',
  ];

  for (const k of keys) {
    const label = translateEditorialSubsectionKey(k);
    assert.ok(label && label.length > 5, `rótulo vazio ou muito curto para chave ${k}`);
  }
});

test('Megacólon não contém marcadores literais de asterisco duplo (**)', () => {
  const disease = diseasesSeed.find((item) => item.slug === SLUG)!;
  const serialized = JSON.stringify(disease);
  assert.ok(!serialized.includes('**'), 'não deve conter dois asteriscos em nenhum campo');
});
