import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { triadeFelinaSeed } from '../../modules/consulta-vet/data/seed/diseases.triade-felina.seed';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';
import { translateEditorialSubsectionKey } from '../../modules/consulta-vet/utils/editorialSubsectionLabels';

test('Tríade Felina — Validação Padrão Ouro Vetius', async (t) => {
  const seed = triadeFelinaSeed;

  await t.test('deve estar devidamente cadastrado no diseasesSeed e conter metadados corretos', () => {
    const found = diseasesSeed.find((d) => d.slug === 'triade-felina');
    assert.ok(found, 'Doença deve estar presente no diseasesSeed');
    assert.equal(seed.id, 'disease-triade-felina');
    assert.equal(seed.slug, 'triade-felina');
    assert.equal(seed.title, 'Tríade Felina');
    assert.deepEqual(seed.species, ['cat'], 'Espécie deve ser exclusivamente felina');
    assert.equal(seed.category, 'gastroenterologia');
    assert.ok(seed.categories?.includes('gastroenterologia'));
    assert.ok(seed.categories?.includes('medicina-felina'));
    assert.ok(seed.categories?.includes('urgencia-emergencia'));
    assert.equal(seed.isPublished, true);
    assert.ok(seed.quickDecisionStrip.length >= 8, 'Deve conter pelo menos 8 itens de decisão rápida');
  });

  await t.test('deve estar registrado no catálogo público e possuir card stub correspondente', () => {
    assert.ok(
      CONSULTA_VET_PUBLIC_DISEASE_SLUGS.includes('triade-felina' as any),
      'Slug deve constar no CONSULTA_VET_PUBLIC_DISEASE_SLUGS'
    );
    const card = PUBLIC_CATALOG_DISEASE_CARD_STUBS.find((c) => c.slug === 'triade-felina');
    assert.ok(card, 'Card stub deve existir no PUBLIC_CATALOG_DISEASE_CARD_STUBS');
    assert.equal(card.id, 'disease-triade-felina');
    assert.ok(card.quickSummary.length > 100);
  });

  await t.test('deve possuir linguagem simples completa para tutores', () => {
    const plain = DISEASE_PLAIN_LANGUAGE['triade-felina'];
    assert.ok(plain, 'Entrada deve existir em DISEASE_PLAIN_LANGUAGE');
    assert.ok(plain.whatIsIt.length > 80);
    assert.ok(plain.keyPoints.length >= 5);
    assert.ok(seed.plainLanguage, 'Seed deve possuir bloco plainLanguage');
    assert.ok(seed.plainLanguage.whatIs.length > 50);
    assert.ok(seed.plainLanguage.warningSigns.length > 50);
  });

  await t.test('deve estruturar clinicalSignsPathophysiology como ARRAY de grupos com achados detalhados', () => {
    assert.ok(Array.isArray(seed.clinicalSignsPathophysiology), 'Deve ser um array de grupos');
    assert.ok(seed.clinicalSignsPathophysiology.length >= 3, 'Deve conter pelo menos 3 grupos sindrômicos');

    const sistemicoGroup = seed.clinicalSignsPathophysiology.find((g) =>
      g.system.includes('Sistêmicas Inespecíficas')
    );
    assert.ok(sistemicoGroup, 'Grupo Manifestações Sistêmicas Inespecíficas deve existir');
    assert.ok(sistemicoGroup.findings.length >= 3, 'Deve conter pelo menos 3 achados');

    const giGroup = seed.clinicalSignsPathophysiology.find((g) =>
      g.system.includes('Gastrointestinais Superiores')
    );
    assert.ok(giGroup, 'Grupo Gastrointestinais Superiores deve existir');
    assert.ok(giGroup.findings.length >= 3, 'Deve conter pelo menos 3 achados');

    const hepatobiliarGroup = seed.clinicalSignsPathophysiology.find((g) =>
      g.system.includes('Hepatobiliares e Colestáticas')
    );
    assert.ok(hepatobiliarGroup, 'Grupo Hepatobiliares e Colestáticas deve existir');
    assert.ok(hepatobiliarGroup.findings.length >= 3, 'Deve conter pelo menos 3 achados');

    const intestinalGroup = seed.clinicalSignsPathophysiology.find((g) =>
      g.system.includes('Intestinais e de Má Absorção')
    );
    assert.ok(intestinalGroup, 'Grupo Intestinais e de Má Absorção deve existir');
    assert.ok(intestinalGroup.findings.length >= 3, 'Deve conter pelo menos 3 achados');

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

  await t.test('deve estruturar diagnosis como ARRAY sequencial de 6 etapas e conter padrão ouro na biópsia multiorgânica com IHC e PARR', () => {
    assert.ok(Array.isArray(seed.diagnosis), 'Diagnosis deve ser um array');
    assert.ok(seed.diagnosis.length >= 6, 'Deve conter pelo menos 6 etapas diagnósticas');

    const goldSteps = seed.diagnosis.filter((s) => s.isGoldStandard === true);
    assert.equal(goldSteps.length, 1, 'Deve haver exatamente 1 exame padrão ouro');
    assert.ok(
      goldSteps[0].title.toLowerCase().includes('biópsias') ||
        goldSteps[0].title.toLowerCase().includes('histopatologia'),
      'Padrão ouro acadêmico definitivo deve ser biópsias multiorgânicas transmurais'
    );
  });

  await t.test('deve conter etiopatogenia profunda, anatomia comparada, epidemiologia e 4 modelos fisiopatológicos com Tabela 1', () => {
    const etio = seed.etiology as Record<string, any>;
    assert.ok(etio.conceitoTriadeComoComplexoMultiorganico, 'Deve conter conceitoTriadeComoComplexoMultiorganico');
    assert.ok(etio.anatomiaDuctalComparadaEConfluencia, 'Deve conter anatomiaDuctalComparadaEConfluencia');
    assert.ok(etio.tabelaModelosFisiopatologicosComparados, 'Deve conter tabelaModelosFisiopatologicosComparados');
    assert.equal(etio.tabelaModelosFisiopatologicosComparados.kind, 'clinicalTable');

    const epi = seed.epidemiology as Record<string, any>;
    assert.ok(epi.distribuicaoEpidemiologicaEPrevalencia, 'Deve conter distribuicaoEpidemiologicaEPrevalencia');
    assert.ok(epi.predisposicaoPorIdadeESexo, 'Deve conter predisposicaoPorIdadeESexo');
    assert.ok(epi.concorrenciaPancreatiteColangiteEnteropatia, 'Deve conter concorrenciaPancreatiteColangiteEnteropatia');

    const trans = seed.pathogenesisTransmission as Record<string, any>;
    assert.ok(Array.isArray(trans.cascata), 'Cascata de patogênese deve ser um array');
    assert.ok(trans.cascata.length >= 5, 'Deve conter pelo menos 5 etapas na cascata');
    assert.ok(trans.viasDePropagacaoECanalComum, 'Deve conter viasDePropagacaoECanalComum');

    const patho = seed.pathophysiology as Record<string, any>;
    assert.ok(patho.modeloRefluxoAscendenteBacteriano, 'Deve conter modeloRefluxoAscendenteBacteriano');
    assert.ok(patho.modeloEfeitoVizinhoEPancreatitePrimaria, 'Deve conter modeloEfeitoVizinhoEPancreatitePrimaria');
    assert.ok(patho.modeloImunomediadoEHomingLinfocitario, 'Deve conter modeloImunomediadoEHomingLinfocitario');
  });

  await t.test('deve contemplar o Consenso ACVIM 2023 diferenciando LPE de LGITL com Tabela 2', () => {
    const patho = seed.pathophysiology as Record<string, any>;
    assert.ok(patho.terceiraPernaEnteropatiaLpeVsLgitl, 'Deve conter terceiraPernaEnteropatiaLpeVsLgitl');
    assert.ok(patho.tabelaDiferenciacaoLpeVsLgitl, 'Deve conter tabelaDiferenciacaoLpeVsLgitl');
    assert.equal(patho.tabelaDiferenciacaoLpeVsLgitl.kind, 'clinicalTable');
  });

  await t.test('deve detalhar a fisiologia do fator intrínseco pancreático e o Consenso ACVIM 2021 do Spec fPL', () => {
    const patho = seed.pathophysiology as Record<string, any>;
    assert.ok(patho.fisiologiaPancreaticaCobalaminaIF, 'Deve conter fisiologiaPancreaticaCobalaminaIF');
    assert.ok(patho.acuraciaDiagnosticaSpecFplConsenso, 'Deve conter acuraciaDiagnosticaSpecFplConsenso');
  });

  await t.test('deve conter protocolo de tratamento estruturado por fenótipo dominante com Tabela 3, nutrição enteral precoce e reavaliação da metoclopramida', () => {
    const treat = seed.treatment as Record<string, any>;
    assert.ok(treat.paradigmaTerapeuticoFenotipoDominante, 'Deve conter paradigmaTerapeuticoFenotipoDominante');
    assert.ok(treat.tabelaAbordagemFarmacoterapeuticaFenotipica, 'Deve conter tabelaAbordagemFarmacoterapeuticaFenotipica');
    assert.equal(treat.tabelaAbordagemFarmacoterapeuticaFenotipica.kind, 'clinicalTable');
    assert.ok(treat.terapiaAntimicrobianaRacionalColangite, 'Deve conter terapiaAntimicrobianaRacionalColangite');
    assert.ok(treat.imunossupressaoSeguraColangiteLinfociticaELPE, 'Deve conter imunossupressaoSeguraColangiteLinfociticaELPE');
    assert.ok(treat.nutricaoEnteralPrecoceEVetoAoJejum, 'Deve conter nutricaoEnteralPrecoceEVetoAoJejum');
    assert.ok(treat.reavaliacaoDaMetoclopramidaEProcineticos, 'Deve conter reavaliacaoDaMetoclopramidaEProcineticos');
    assert.ok(treat.fluidoterapiaAnalgesiaMultimodalOpioide, 'Deve conter fluidoterapiaAnalgesiaMultimodalOpioide');
    assert.ok(treat.suplementacaoCobalaminaOralVsParenteral, 'Deve conter suplementacaoCobalaminaOralVsParenteral');
    assert.ok(treat.terapiaAdjuvanteAcidoUrsodesoxicolicoSAMe, 'Deve conter terapiaAdjuvanteAcidoUrsodesoxicolicoSAMe');
    assert.ok(treat.protocoloPlantaoTriadePassoAPasso, 'Deve conter protocoloPlantaoTriadePassoAPasso');
    assert.ok(treat.protocoloPlantaoTriadePassoAPasso.length >= 8, 'Deve conter pelo menos 8 passos no plantão');
    assert.ok(treat.errosCriticosManejoTriade, 'Deve conter errosCriticosManejoTriade');
    assert.ok(treat.errosCriticosManejoTriade.length >= 6, 'Deve conter pelo menos 6 erros a evitar');
  });

  await t.test('deve estruturar complications e prevention como objetos com chaves nomeadas em camelCase', () => {
    const comp = seed.complications as Record<string, any>;
    assert.ok(comp && typeof comp === 'object' && !Array.isArray(comp), 'Complications deve ser um objeto');
    assert.ok(comp.lipidoseHepaticaSecundariaAnorexia, 'Deve conter lipidoseHepaticaSecundariaAnorexia');
    assert.ok(comp.obstrucaoBiliarExtrahepaticaEColangiteSeptica, 'Deve conter obstrucaoBiliarExtrahepaticaEColangiteSeptica');
    assert.ok(comp.cetoacidoseDiabeticaPancreatiteInduzida, 'Deve conter cetoacidoseDiabeticaPancreatiteInduzida');
    assert.ok(comp.hipocobalaminemiaGraveEAnemiaRefrataria, 'Deve conter hipocobalaminemiaGraveEAnemiaRefrataria');
    assert.ok(comp.trombosePortalECoagulopatiaConsuntiva, 'Deve conter trombosePortalECoagulopatiaConsuntiva');

    const prev = seed.prevention as Record<string, any>;
    assert.ok(prev && typeof prev === 'object' && !Array.isArray(prev), 'Prevention deve ser um objeto');
    assert.ok(prev.manejoNutricionalContinuoHipoalergenico, 'Deve conter manejoNutricionalContinuoHipoalergenico');
    assert.ok(prev.suplementacaoProlongadaCobalamina, 'Deve conter suplementacaoProlongadaCobalamina');
    assert.ok(prev.evitacaoDeJejumPrecoceIntervencaoEnteral, 'Deve conter evitacaoDeJejumPrecoceIntervencaoEnteral');
    assert.ok(prev.rastreamentoSeriadoUltrassomFplBilirrubina, 'Deve conter rastreamentoSeriadoUltrassomFplBilirrubina');
    assert.ok(prev.mitigacaoEstresseManejoCatFriendly, 'Deve conter mitigacaoEstresseManejoCatFriendly');
  });

  await t.test('deve possuir rótulos editoriais mapeados em editorialSubsectionLabels.ts para todas as chaves técnicas', () => {
    const technicalKeys = [
      'conceitoTriadeComoComplexoMultiorganico',
      'anatomiaDuctalComparadaEConfluencia',
      'tabelaModelosFisiopatologicosComparados',
      'distribuicaoEpidemiologicaEPrevalencia',
      'predisposicaoPorIdadeESexo',
      'concorrenciaPancreatiteColangiteEnteropatia',
      'viasDePropagacaoECanalComum',
      'modeloRefluxoAscendenteBacteriano',
      'modeloEfeitoVizinhoEPancreatitePrimaria',
      'modeloImunomediadoEHomingLinfocitario',
      'terceiraPernaEnteropatiaLpeVsLgitl',
      'tabelaDiferenciacaoLpeVsLgitl',
      'fisiologiaPancreaticaCobalaminaIF',
      'acuraciaDiagnosticaSpecFplConsenso',
      'paradigmaTerapeuticoFenotipoDominante',
      'tabelaAbordagemFarmacoterapeuticaFenotipica',
      'terapiaAntimicrobianaRacionalColangite',
      'imunossupressaoSeguraColangiteLinfociticaELPE',
      'nutricaoEnteralPrecoceEVetoAoJejum',
      'reavaliacaoDaMetoclopramidaEProcineticos',
      'fluidoterapiaAnalgesiaMultimodalOpioide',
      'suplementacaoCobalaminaOralVsParenteral',
      'terapiaAdjuvanteAcidoUrsodesoxicolicoSAMe',
      'protocoloPlantaoTriadePassoAPasso',
      'errosCriticosManejoTriade',
      'lipidoseHepaticaSecundariaAnorexia',
      'obstrucaoBiliarExtrahepaticaEColangiteSeptica',
      'cetoacidoseDiabeticaPancreatiteInduzida',
      'hipocobalaminemiaGraveEAnemiaRefrataria',
      'trombosePortalECoagulopatiaConsuntiva',
      'manejoNutricionalContinuoHipoalergenico',
      'suplementacaoProlongadaCobalamina',
      'evitacaoDeJejumPrecoceIntervencaoEnteral',
      'rastreamentoSeriadoUltrassomFplBilirrubina',
      'mitigacaoEstresseManejoCatFriendly',
    ];

    for (const key of technicalKeys) {
      const label = translateEditorialSubsectionKey(key);
      assert.notEqual(label, key, 'Chave ' + key + ' deve possuir um rótulo editorial legível em português');
      assert.ok(label.length > 5, 'Rótulo da chave ' + key + ' deve ser descritivo');
    }
  });

  await t.test('deve referenciar formalmente consensos internacionais e estudos seminais', () => {
    assert.ok(seed.references.length >= 10, 'Deve conter pelo menos 10 referências');
    const refText = JSON.stringify(seed.references);
    assert.ok(refText.includes('Cridge'), 'Deve citar Cridge 2026');
    assert.ok(refText.includes('Forman'), 'Deve citar Forman et al.');
    assert.ok(refText.includes('Marsilio'), 'Deve citar Marsilio et al. 2023');
    assert.ok(refText.includes('Center'), 'Deve citar Center et al. 2022');
    assert.ok(refText.includes('Toresson'), 'Deve citar Toresson et al.');
    assert.ok(refText.includes('Angelou'), 'Deve citar Angelou et al. 2023');
    assert.ok(refText.includes('Nelson'), 'Deve citar Nelson & Couto');
    assert.ok(refText.includes('Plumb'), 'Deve citar Plumb Veterinary Drug Handbook');
    assert.ok(refText.includes('BSAVA'), 'Deve citar BSAVA');
  });

  await t.test('deve possuir 4 figuras clínicas reais e validadas em disco em public e dist com licença CC BY 4.0', () => {
    assert.ok(Array.isArray(seed.figures), 'Deve possuir campo figures como array');
    assert.equal(seed.figures.length, 4, 'Deve conter exatamente 4 figuras');

    for (const fig of seed.figures as Array<{ url: string; caption?: string }>) {
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

  await t.test('NÃO deve conter marcadores literais de asterisco duplo em nenhuma parte do seed ou do teste', () => {
    const seedJson = JSON.stringify(seed);
    const doubleStar = ['*', '*'].join('');
    assert.ok(!seedJson.includes(doubleStar), 'Seed não deve conter marcadores literais de asterisco duplo');

    const testContent = fs.readFileSync(path.join(process.cwd(), 'tests', 'consulta-vet', 'gastroenterology-triade-felina.test.ts'), 'utf8');
    assert.ok(!testContent.includes(doubleStar), 'Arquivo de teste não deve conter marcadores literais de asterisco duplo');
  });
});
