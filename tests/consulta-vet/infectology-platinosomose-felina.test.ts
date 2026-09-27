import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { platinosomoseFelinaSeed } from '../../modules/consulta-vet/data/seed/diseases.platinosomose-felina.seed';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';
import { translateEditorialSubsectionKey } from '../../modules/consulta-vet/utils/editorialSubsectionLabels';

test('Platinosomose Felina — Validação Padrão Ouro Vetius', async (t) => {
  const seed = platinosomoseFelinaSeed;

  await t.test('deve estar devidamente cadastrado no diseasesSeed e conter metadados corretos', () => {
    const found = diseasesSeed.find((d) => d.slug === 'platinosomose-felina');
    assert.ok(found, 'Doença deve estar presente no diseasesSeed');
    assert.equal(seed.id, 'disease-platinosomose-felina');
    assert.equal(seed.slug, 'platinosomose-felina');
    assert.equal(seed.title, 'Platinosomose Felina');
    assert.deepEqual(seed.species, ['cat'], 'Espécie deve ser exclusivamente felina');
    assert.equal(seed.category, 'gastroenterologia');
    assert.ok(seed.categories?.includes('gastroenterologia'));
    assert.ok(seed.categories?.includes('medicina-felina'));
    assert.ok(seed.categories?.includes('infecciosas'));
    assert.ok(seed.categories?.includes('urgencia-emergencia'));
    assert.equal(seed.isPublished, true);
    assert.ok(seed.quickDecisionStrip.length >= 8, 'Deve conter pelo menos 8 itens de decisão rápida');
  });

  await t.test('deve estar registrado no catálogo público e possuir card stub correspondente', () => {
    assert.ok(
      CONSULTA_VET_PUBLIC_DISEASE_SLUGS.includes('platinosomose-felina' as any),
      'Slug deve constar no CONSULTA_VET_PUBLIC_DISEASE_SLUGS'
    );
    const card = PUBLIC_CATALOG_DISEASE_CARD_STUBS.find((c) => c.slug === 'platinosomose-felina');
    assert.ok(card, 'Card stub deve existir no PUBLIC_CATALOG_DISEASE_CARD_STUBS');
    assert.equal(card.id, 'disease-platinosomose-felina');
    assert.ok(card.quickSummary.length > 100);
  });

  await t.test('deve possuir linguagem simples completa para tutores', () => {
    const plain = DISEASE_PLAIN_LANGUAGE['platinosomose-felina'];
    assert.ok(plain, 'Entrada deve existir em DISEASE_PLAIN_LANGUAGE');
    assert.ok(plain.whatIsIt.length > 80);
    assert.ok(plain.keyPoints.length >= 5);
    assert.ok(seed.plainLanguage, 'Seed deve possuir bloco plainLanguage');
    assert.ok(seed.plainLanguage.whatIs.length > 50);
    assert.ok(seed.plainLanguage.warningSigns.length > 50);
  });

  await t.test('deve estruturar clinicalSignsPathophysiology como ARRAY de grupos com achados detalhados', () => {
    assert.ok(Array.isArray(seed.clinicalSignsPathophysiology), 'Deve ser um array de grupos');
    assert.ok(seed.clinicalSignsPathophysiology.length >= 3, 'Deve conter pelo menos 3 grupos');

    const colestaticoGroup = seed.clinicalSignsPathophysiology.find((g) =>
      g.system.includes('Hepatobiliares e Colestáticos')
    );
    assert.ok(colestaticoGroup, 'Grupo Sinais Hepatobiliares e Colestáticos deve existir');
    assert.ok(colestaticoGroup.findings.length >= 4, 'Deve conter pelo menos 4 achados colestáticos');

    const sistemicoGroup = seed.clinicalSignsPathophysiology.find((g) =>
      g.system.includes('Comprometimento Sistêmico')
    );
    assert.ok(sistemicoGroup, 'Grupo Comprometimento Sistêmico deve existir');
    assert.ok(sistemicoGroup.findings.length >= 3, 'Deve conter pelo menos 3 achados sistêmicos');

    const avancadoGroup = seed.clinicalSignsPathophysiology.find((g) =>
      g.system.includes('Avançados e Obstrutivos')
    );
    assert.ok(avancadoGroup, 'Grupo Manifestações em Estágios Avançados e Obstrutivos deve existir');
    assert.ok(avancadoGroup.findings.length >= 3, 'Deve conter pelo menos 3 achados avançados');

    for (const group of seed.clinicalSignsPathophysiology) {
      assert.ok(group.system, 'Grupo deve possuir sistema');
      for (const f of group.findings) {
        if (typeof f !== 'string') {
          assert.ok(f.finding, 'Achado deve conter finding');
          assert.ok(f.mechanism, 'Achado deve conter mechanism');
          assert.ok(f.clinicalMeaning, 'Achado deve conter clinicalMeaning');
          assert.ok(f.priority, 'Achado deve conter priority');
        }
      }
    }
  });

  await t.test('deve estruturar diagnosis como ARRAY sequencial e conter padrão ouro na colecistocentese ecoguiada', () => {
    assert.ok(Array.isArray(seed.diagnosis), 'Diagnosis deve ser um array');
    assert.ok(seed.diagnosis.length >= 6, 'Deve conter pelo menos 6 etapas diagnósticas');

    const goldSteps = seed.diagnosis.filter((s) => s.isGoldStandard === true);
    assert.equal(goldSteps.length, 1, 'Deve haver exatamente 1 exame padrão ouro');
    assert.ok(
      goldSteps[0].title.toLowerCase().includes('colecistocentese') ||
        goldSteps[0].title.toLowerCase().includes('análise biliar'),
      'Padrão ouro parasitológico definitivo deve ser colecistocentese ecoguiada e análise biliar'
    );
  });

  await t.test('deve conter etiopatogenia profunda com tabela clínica de ciclo e revisão de ciclo biológico Pinto 2014', () => {
    const etio = seed.etiology as Record<string, any>;
    assert.ok(etio.definicaoENomenclaturaTaxonomica, 'Deve conter definicaoENomenclaturaTaxonomica');
    assert.ok(etio.tabelaCicloBiologicoEHospedeiros, 'Deve conter tabelaCicloBiologicoEHospedeiros');
    assert.equal(etio.tabelaCicloBiologicoEHospedeiros.kind, 'clinicalTable');
    assert.ok(etio.cicloBiologicoAtualizadoUFMG, 'Deve conter cicloBiologicoAtualizadoUFMG');
    assert.ok(etio.epidemiologiaGlobalEPrevalenciaBrasil, 'Deve conter epidemiologiaGlobalEPrevalenciaBrasil');
    assert.ok(etio.anatomiaBiliarFelinaEPatogenia, 'Deve conter anatomiaBiliarFelinaEPatogenia');

    const epi = seed.epidemiology as Record<string, any>;
    assert.ok(epi.distribuicaoGeograficaEMetaAnaliseSilva2023, 'Deve conter distribuicaoGeograficaEMetaAnaliseSilva2023');
    assert.ok(epi.fatoresDeRiscoEPerfilComportamentalPredatorio, 'Deve conter fatoresDeRiscoEPerfilComportamentalPredatorio');
    assert.ok(epi.coortesClinicasBrasileirasUNESPEUFSM, 'Deve conter coortesClinicasBrasileirasUNESPEUFSM');

    const patho = seed.pathophysiology as Record<string, any>;
    assert.ok(patho.cineticaPatogenicaEHiperplasiaDuctal, 'Deve conter cineticaPatogenicaEHiperplasiaDuctal');
    assert.ok(patho.colestaseFibroseEColangiectasia, 'Deve conter colestaseFibroseEColangiectasia');
    assert.ok(patho.mecanismoDaIctericiaHepaticaPosHepatica, 'Deve conter mecanismoDaIctericiaHepaticaPosHepatica');
    assert.ok(patho.associacaoComColangiocarcinoma, 'Deve conter associacaoComColangiocarcinoma');
  });

  await t.test('deve conter protocolo de tratamento com tabela farmacológica e manejo de colestase', () => {
    const treat = seed.treatment as Record<string, any>;
    assert.ok(treat.metasTerapeuticasEExpectativas, 'Deve conter metasTerapeuticasEExpectativas');
    assert.ok(treat.tabelaEficaciaAntiparasitaria, 'Deve conter tabelaEficaciaAntiparasitaria');
    assert.equal(treat.tabelaEficaciaAntiparasitaria.kind, 'clinicalTable');
    assert.ok(treat.protocoloPraziquantelDosesEVersoes, 'Deve conter protocoloPraziquantelDosesEVersoes');
    assert.ok(treat.avaliacaoCriticaDoFenbendazol, 'Deve conter avaliacaoCriticaDoFenbendazol');
    assert.ok(treat.suporteClinicoNutricionalEColeretico, 'Deve conter suporteClinicoNutricionalEColeretico');
    assert.ok(treat.criteriosParaIntervencaoCirurgica, 'Deve conter criteriosParaIntervencaoCirurgica');
    assert.ok(treat.protocoloPlantaoPassoAPasso, 'Deve conter protocoloPlantaoPassoAPasso');
    assert.ok(treat.protocoloPlantaoPassoAPasso.length >= 8, 'Deve conter pelo menos 8 passos no plantão');
    assert.ok(treat.errosCriticosEvitar, 'Deve conter errosCriticosEvitar');
    assert.ok(treat.errosCriticosEvitar.length >= 6, 'Deve conter pelo menos 6 erros a evitar');
    assert.ok(treat.monitoramentoPosTratamento, 'Deve conter monitoramentoPosTratamento');
  });

  await t.test('deve estruturar complications e prevention como objetos com chaves nomeadas', () => {
    const comp = seed.complications as Record<string, any>;
    assert.ok(comp && typeof comp === 'object' && !Array.isArray(comp), 'Complications deve ser um objeto');
    assert.ok(comp.obstrucaoBiliarExtrahepaticaCompleta, 'Deve conter obstrucaoBiliarExtrahepaticaCompleta');
    assert.ok(comp.colangioepatiteBacterianaSecundaria, 'Deve conter colangioepatiteBacterianaSecundaria');
    assert.ok(comp.cirroseBiliarEHipertensaoPortal, 'Deve conter cirroseBiliarEHipertensaoPortal');
    assert.ok(comp.lipidoseHepaticaSecundaria, 'Deve conter lipidoseHepaticaSecundaria');
    assert.ok(comp.coagulopatiaPorMalabsorcaoVitaminaK, 'Deve conter coagulopatiaPorMalabsorcaoVitaminaK');

    const prev = seed.prevention as Record<string, any>;
    assert.ok(prev && typeof prev === 'object' && !Array.isArray(prev), 'Prevention deve ser um objeto');
    assert.ok(prev.confinamentoIndoorEBloqueioDePredacao, 'Deve conter confinamentoIndoorEBloqueioDePredacao');
    assert.ok(prev.controleAmbientalDeIsopodesECaracois, 'Deve conter controleAmbientalDeIsopodesECaracois');
    assert.ok(prev.rastreamentoCoproparasitologicoEspecializado, 'Deve conter rastreamentoCoproparasitologicoEspecializado');
    assert.ok(prev.profilaxiaAntiparasitariaRacional, 'Deve conter profilaxiaAntiparasitariaRacional');
    assert.ok(prev.avaliacaoImaginologicaPrecoce, 'Deve conter avaliacaoImaginologicaPrecoce');
  });

  await t.test('deve possuir rótulos editoriais mapeados em editorialSubsectionLabels.ts para todas as chaves', () => {
    const technicalKeys = [
      'definicaoENomenclaturaTaxonomica',
      'tabelaCicloBiologicoEHospedeiros',
      'cicloBiologicoAtualizadoUFMG',
      'epidemiologiaGlobalEPrevalenciaBrasil',
      'anatomiaBiliarFelinaEPatogenia',
      'cineticaPatogenicaEHiperplasiaDuctal',
      'colestaseFibroseEColangiectasia',
      'mecanismoDaIctericiaHepaticaPosHepatica',
      'associacaoComColangiocarcinoma',
      'metasTerapeuticasEExpectativas',
      'tabelaEficaciaAntiparasitaria',
      'protocoloPraziquantelDosesEVersoes',
      'avaliacaoCriticaDoFenbendazol',
      'suporteClinicoNutricionalEColeretico',
      'criteriosParaIntervencaoCirurgica',
      'protocoloPlantaoPassoAPasso',
      'errosCriticosEvitar',
      'monitoramentoPosTratamento',
      'obstrucaoBiliarExtrahepaticaCompleta',
      'colangioepatiteBacterianaSecundaria',
      'cirroseBiliarEHipertensaoPortal',
      'lipidoseHepaticaSecundaria',
      'coagulopatiaPorMalabsorcaoVitaminaK',
      'confinamentoIndoorEBloqueioDePredacao',
      'controleAmbientalDeIsopodesECaracois',
      'rastreamentoCoproparasitologicoEspecializado',
      'profilaxiaAntiparasitariaRacional',
      'avaliacaoImaginologicaPrecoce',
    ];

    for (const key of technicalKeys) {
      const label = translateEditorialSubsectionKey(key);
      assert.notEqual(label, key, 'Chave ' + key + ' deve possuir um rótulo editorial legível em português');
      assert.ok(label.length > 5, 'Rótulo da chave ' + key + ' deve ser descritivo');
    }
  });

  await t.test('deve referenciar formalmente estudos seminais e tratados internacionais', () => {
    assert.ok(seed.references.length >= 10, 'Deve conter pelo menos 10 referências');
    const refText = JSON.stringify(seed.references);
    assert.ok(refText.includes('Pinto'), 'Deve citar Pinto et al. 2014');
    assert.ok(refText.includes('Lathroum'), 'Deve citar Lathroum et al. 2018');
    assert.ok(refText.includes('Köster') || refText.includes('Koster'), 'Deve citar Köster et al. 2016');
    assert.ok(refText.includes('Eisenbraun'), 'Deve citar Eisenbraun et al. 2020');
    assert.ok(refText.includes('Chantawong'), 'Deve citar Chantawong et al. 2024');
    assert.ok(refText.includes('Sato'), 'Deve citar Sato et al. 2025');
    assert.ok(refText.includes('Sousa'), 'Deve citar Sousa et al. 2025');
    assert.ok(refText.includes('Andrade'), 'Deve citar Andrade et al. 2012');
    assert.ok(refText.includes('Nelson'), 'Deve citar Nelson & Couto');
    assert.ok(refText.includes('BSAVA'), 'Deve citar BSAVA Guide to Procedures');
    assert.ok(refText.includes('Plumb'), 'Deve citar Plumb Veterinary Drug Handbook');
    assert.ok(refText.includes('Withrow'), 'Deve citar Withrow & MacEwen');
  });

  await t.test('deve possuir 4 figuras clínicas reais e validadas em disco em public e dist', () => {
    assert.ok(seed.figures, 'Deve possuir campo figures');
    assert.equal(seed.figures.length, 4, 'Deve conter exatamente 4 figuras');

    for (const fig of seed.figures) {
      const publicPath = path.join(process.cwd(), 'public', fig.url);
      const distPath = path.join(process.cwd(), 'dist', fig.url);

      assert.ok(fs.existsSync(publicPath), 'Arquivo ' + fig.url + ' deve existir em public');
      assert.ok(fs.existsSync(distPath), 'Arquivo ' + fig.url + ' deve existir em dist');

      const statPublic = fs.statSync(publicPath);
      assert.ok(statPublic.size > 20000, 'Arquivo em public deve ter tamanho válido (>20KB)');

      const statDist = fs.statSync(distPath);
      assert.ok(statDist.size > 20000, 'Arquivo em dist deve ter tamanho válido (>20KB)');

      assert.ok(
        fig.legend.includes('CC BY 4.0') || fig.source.includes('CC BY 4.0'),
        'Figura ' + fig.url + ' deve declarar licença CC BY 4.0'
      );
    }
  });

  await t.test('NÃO deve conter marcadores literais de asterisco duplo em nenhuma parte do seed', () => {
    const seedJson = JSON.stringify(seed);
    const doubleStar = ['*', '*'].join('');
    assert.ok(!seedJson.includes(doubleStar), 'Seed não deve conter marcadores literais de asterisco duplo');
  });
});
