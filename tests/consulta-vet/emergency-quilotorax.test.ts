import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';
import { translateEditorialSubsectionKey } from '../../modules/consulta-vet/utils/editorialSubsectionLabels';
import type { EditorialSystemGroup, EditorialDiagnosticStep, EditorialClinicalFigure } from '../../modules/consulta-vet/types/common';

const SLUG = 'quilotorax-caes-gatos';

test('Quilotórax existe em diseasesSeed com metadados corretos', () => {
  const disease = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(disease, 'Quilotórax deve estar presente no seed de doenças');
  assert.equal(disease.id, 'disease-quilotorax-caes-gatos');
  assert.equal(disease.title, 'Quilotórax em Gatos e Cães');
  assert.ok(disease.species.includes('cat'), 'Deve incluir gatos');
  assert.ok(disease.species.includes('dog'), 'Deve incluir cães');
  assert.ok(disease.isPublished, 'Deve estar publicado');
  assert.equal(disease.category, 'urgencia-emergencia');
  assert.ok(disease.categories?.includes('pneumologia'), 'Deve ter categoria pneumologia');
  assert.ok(disease.categories?.includes('cardiologia'), 'Deve ter categoria cardiologia');
  assert.ok(disease.categories?.includes('cirurgia'), 'Deve ter categoria cirurgia');
  assert.ok(disease.tags.length >= 8, 'Deve conter tags clínicas detalhadas');
});

test('Quilotórax está listado no catálogo público e possui stub de card', () => {
  assert.ok(CONSULTA_VET_PUBLIC_DISEASE_SLUGS.includes(SLUG as any), 'Deve constar no catálogo público');
  const stub = PUBLIC_CATALOG_DISEASE_CARD_STUBS.find((s) => s.slug === SLUG);
  assert.ok(stub, 'Deve possuir stub de card em publicCatalogCardStubs');
  assert.equal(stub.title, 'Quilotórax');
  assert.ok(stub.quickSummary.includes('Severac'), 'Stub deve citar Severac 2026');
  assert.ok(stub.quickSummary.includes('Reeves'), 'Stub deve citar Reeves 2020');
});

test('Quilotórax possui linguagem simples completa para tutores', () => {
  const plain = DISEASE_PLAIN_LANGUAGE[SLUG];
  assert.ok(plain, 'Deve existir entrada em diseasePlainLanguage');
  assert.ok(plain.whatIsIt.length > 80, 'Explicação whatIsIt deve ser substancial');
  assert.ok(plain.keyPoints.length >= 5, 'Deve conter pelo menos 5 pontos-chave para tutores');
  assert.ok(plain.keyPoints.some(p => p.toLowerCase().includes('emergência') || p.toLowerCase().includes('urgente')), 'Deve enfatizar emergência');
  assert.ok(plain.keyPoints.some(p => p.toLowerCase().includes('coração')), 'Deve enfatizar causa cardíaca');
});

test('Quilotórax possui resumo clínico rico com pilares e fluxos estruturados', () => {
  const disease = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(disease?.quickSummaryRich, 'Deve ter quickSummaryRich');
  assert.ok(disease.quickSummaryRich.lead.length > 100, 'Lead deve ser denso');
  assert.ok(disease.quickSummaryRich.pillars && disease.quickSummaryRich.pillars.length === 4, 'Deve conter 4 pilares');
  assert.ok(disease.quickSummaryRich.diagnosticFlow, 'Deve ter diagnosticFlow');
  assert.ok(disease.quickSummaryRich.treatmentFlow, 'Deve ter treatmentFlow');
  assert.equal(disease.quickSummaryRich.diagnosticFlow?.steps.length, 6, 'diagnosticFlow deve ter 6 passos');
  assert.equal(disease.quickSummaryRich.treatmentFlow?.steps.length, 6, 'treatmentFlow deve ter 6 passos');
});

test('Quilotórax possui 5 figuras clínicas reais armazenadas em public/ e verificadas em disco', () => {
  const disease = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(Array.isArray(disease?.figures), 'Figures deve ser array');
  const figs = disease.figures as EditorialClinicalFigure[];
  assert.equal(figs.length, 5, 'Deve conter 5 figuras');

  for (const fig of figs) {
    assert.equal(fig.kind, 'clinicalFigure');
    assert.ok(fig.src.startsWith('/consulta-vet/quilotorax/'), 'Src deve apontar para pasta de quilotorax');
    assert.ok(fig.caption && fig.caption.length > 50, 'Legenda deve ser didática e completa');
    
    // Check file on disk
    const diskPath = path.join(process.cwd(), 'public', fig.src.replace(/^\//, ''));
    assert.ok(fs.existsSync(diskPath), 'Arquivo físico deve existir: ' + diskPath);
    const stats = fs.statSync(diskPath);
    assert.ok(stats.size > 20000, 'Tamanho do arquivo deve ser válido: ' + diskPath);
  }
});

test('Quilotórax possui achados clínicos agrupados por sistemas (EditorialSystemGroup[])', () => {
  const disease = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(Array.isArray(disease?.clinicalSignsPathophysiology), 'clinicalSignsPathophysiology deve ser array');
  const groups = disease.clinicalSignsPathophysiology as EditorialSystemGroup[];
  assert.ok(groups.length >= 4, 'Deve cobrir pelo menos 4 sistemas');
  
  const systems = groups.map((g) => g.system);
  assert.ok(systems.includes('respiratory'), 'Deve conter respiratory');
  assert.ok(systems.includes('cardiovascular'), 'Deve conter cardiovascular');
  assert.ok(systems.includes('general'), 'Deve conter general');
  assert.ok(systems.includes('immunologic'), 'Deve conter immunologic');
  assert.ok(systems.includes('metabolic'), 'Deve conter metabolic');

  for (const g of groups) {
    assert.ok(g.findings.length > 0, 'Sistema ' + g.system + ' deve ter achados');
    for (const f of g.findings) {
      if (typeof f === 'object') {
        assert.ok(f.finding, 'Deve ter finding');
        assert.ok(f.mechanism, 'Deve ter mechanism');
        assert.ok(f.clinicalMeaning, 'Deve ter clinicalMeaning');
      }
    }
  }
});

test('Quilotórax possui etapas diagnósticas sequenciais com padrão ouro identificado', () => {
  const disease = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(Array.isArray(disease?.diagnosis), 'diagnosis deve ser array');
  const steps = disease.diagnosis as EditorialDiagnosticStep[];
  assert.equal(steps.length, 7, 'Deve conter 7 passos diagnósticos');

  const goldStandards = steps.filter((s) => s.isGoldStandard);
  assert.equal(goldStandards.length, 1, 'Deve ter exatamente um padrão ouro');
  assert.equal(goldStandards[0].stepNumber, 3, 'O padrão ouro deve ser a etapa 3 (Análise Bioquímica Comparativa)');
  assert.ok(goldStandards[0].title.includes('Triglicerídeos') || goldStandards[0].title.includes('Bioquímica'), 'Padrão ouro deve ser triglicerídeos');
});

test('Quilotórax possui módulos terapêuticos completos com diretrizes clínicas e cirúrgicas', () => {
  const disease = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(disease?.treatment && typeof disease.treatment === 'object', 'treatment deve ser objeto estruturado');
  const treat = disease.treatment as Record<string, any>;
  
  assert.ok(treat.estabilizacaoDeEmergenciaERegraHandsOff, 'Deve conter estabilizacaoDeEmergenciaERegraHandsOff');
  assert.ok(treat.toracocenteseVersusDrenoPermanente, 'Deve conter toracocenteseVersusDrenoPermanente');
  assert.ok(treat.terapiaEtiologicaDirecionada, 'Deve conter terapiaEtiologicaDirecionada');
  assert.ok(treat.analiseCriticaDaDietaHipolipidicaETriglicerideos, 'Deve conter analiseCriticaDaDietaHipolipidicaETriglicerideos');
  assert.ok(treat.analiseCriticaDaRutinaEFarmacologia, 'Deve conter analiseCriticaDaRutinaEFarmacologia');
  assert.ok(treat.momentoOtimoDaIntervencaoCirurgica, 'Deve conter momentoOtimoDaIntervencaoCirurgica');
  assert.ok(treat.tecnicasCirurgicasLigaduraEPericardiectomia, 'Deve conter tecnicasCirurgicasLigaduraEPericardiectomia');
});

test('Subseções editoriais traduzem corretamente sem chaves cruas', () => {
  const keysToTest = [
    'definicaoEConceitoLinfatico',
    'desmistificacaoDaRupturaDoDucto',
    'anatomiaEFisiologiaDoDuctoToracico',
    'tresMecanismosFisiopatologicosPrimarios',
    'revolucaoEtiologicaFelinaSeverac2026',
    'tabelaEtiologiaComparada',
    'particularidadesCaninas',
    'dadosMulticentricosGlobais',
    'dinamicaDePressaoPleuralERestricao',
    'espoliacaoLinfaticaEConsequenciasMetabolicas',
    'pleuriteFibrosanteRestritivaEncarceramento',
    'estabilizacaoDeEmergenciaERegraHandsOff',
    'toracocenteseVersusDrenoPermanente',
    'terapiaEtiologicaDirecionada',
    'analiseCriticaDaDietaHipolipidicaETriglicerideos',
    'analiseCriticaDaRutinaEFarmacologia',
    'manejoHidroeletroliticoETransfusional',
    'momentoOtimoDaIntervencaoCirurgica',
    'tecnicasCirurgicasLigaduraEPericardiectomia',
    'terapiasDeResgateEProcedimentosAvancados',
    'terapiasInadequadasEPraticasContraindicadas',
    'monitoramentoAmbulatorialEPrognostico',
  ];

  for (const k of keysToTest) {
    const translated = translateEditorialSubsectionKey(k);
    assert.notEqual(translated, k, 'Chave ' + k + ' deve ter tradução cadastrada');
    assert.ok(translated.length > 4, 'Tradução de ' + k + ' deve ser descritiva');
  }
});

test('Quilotórax aborda achados críticos: Severac 2026, LA:Ao > 1.4, toracocentese prévia e pleurite fibrosante', () => {
  const disease = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(disease);
  
  const etiologiaStr = JSON.stringify(disease.etiology);
  assert.ok(etiologiaStr.includes('Severac'), 'Deve citar Severac');
  assert.ok(etiologiaStr.includes('57%'), 'Deve citar 57% de causa cardíaca em gatos');
  assert.ok(etiologiaStr.includes('2,4') || etiologiaStr.includes('1,4'), 'Deve citar LA:Ao');

  const fisioStr = JSON.stringify(disease.pathophysiology);
  assert.ok(fisioStr.includes('pleurite fibrosante') || fisioStr.includes('encarceramento'), 'Deve detalhar pleurite fibrosante');

  const diagStr = JSON.stringify(disease.diagnosis);
  assert.ok(diagStr.includes('TGpleural > TGsérico') || diagStr.includes('triglicerídeos'), 'Deve enfatizar triglicerídeos');
});

test('Referências bibliográficas contêm os estudos fundamentais com DOI e livros clássicos', () => {
  const disease = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(disease?.references && disease.references.length >= 12, 'Deve ter pelo menos 12 referências');

  const refsStr = JSON.stringify(disease.references);
  assert.ok(refsStr.includes('Severac'), 'Deve conter Severac 2026');
  assert.ok(refsStr.includes('Reeves'), 'Deve conter Reeves 2020');
  assert.ok(refsStr.includes('Hawker'), 'Deve conter Hawker & Singh 2024');
  assert.ok(refsStr.includes('Dickson'), 'Deve conter Dickson 2024');
  assert.ok(refsStr.includes('Stockdale'), 'Deve conter Stockdale 2018');
  assert.ok(refsStr.includes('Chiang'), 'Deve conter Chiang 2022');
  assert.ok(refsStr.includes('Fossum'), 'Deve conter Fossum');
  assert.ok(refsStr.includes('Waddle'), 'Deve conter Waddle & Giger 1990');
  assert.ok(refsStr.includes('Nelson'), 'Deve conter Nelson & Couto');
  assert.ok(refsStr.includes('Drobatz'), 'Deve conter Feline ECC');
  assert.ok(refsStr.includes('DiBartola'), 'Deve conter DiBartola');
});

test('Ausência absoluta de marcadores literais de asterisco duplo em strings', () => {
  const seedPath = path.join(process.cwd(), 'modules/consulta-vet/data/seed/diseases.quilotorax.seed.ts');
  const seedRaw = fs.readFileSync(seedPath, 'utf8');
  assert.ok(!seedRaw.includes('**'), 'O arquivo seed não pode conter marcadores ** literais em nenhuma linha');
});
