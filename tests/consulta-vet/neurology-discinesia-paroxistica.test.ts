import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { discinesiaParoxisticaCaesGatosSeed } from '../../modules/consulta-vet/data/seed/diseases.discinesia-paroxistica-caes-gatos.seed';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';

test('Discinesia Paroxística em Cães e Gatos — Validação Padrão Ouro Vetius', async (t) => {
  const seed = discinesiaParoxisticaCaesGatosSeed;

  await t.test('deve estar devidamente cadastrado no diseasesSeed e conter metadados corretos', () => {
    const found = diseasesSeed.find((d) => d.slug === 'discinesia-paroxistica-caes-gatos');
    assert.ok(found, 'Doença deve estar presente no diseasesSeed');
    assert.equal(seed.id, 'disease-discinesia-paroxistica-caes-gatos');
    assert.equal(seed.slug, 'discinesia-paroxistica-caes-gatos');
    assert.equal(seed.title, 'Discinesia Paroxística em Cães e Gatos');
    assert.deepEqual(seed.species, ['dog', 'cat']);
    assert.equal(seed.category, 'neurologia');
    assert.ok(seed.categories?.includes('neurologia'));
    assert.ok(seed.categories?.includes('medicina-felina'));
    assert.ok(seed.categories?.includes('urgencias'));
    assert.ok(seed.categories?.includes('urgencia-emergencia'));
    assert.ok(seed.categories?.includes('genetica-clinica'));
    assert.equal(seed.isPublished, true);
    assert.ok(seed.quickDecisionStrip.length >= 8, 'Deve conter pelo menos 8 itens de decisão rápida');
  });

  await t.test('deve estar registrado no catálogo público e possuir card stub correspondente', () => {
    assert.ok(
      CONSULTA_VET_PUBLIC_DISEASE_SLUGS.includes('discinesia-paroxistica-caes-gatos' as any),
      'Slug deve constar no CONSULTA_VET_PUBLIC_DISEASE_SLUGS'
    );
    const card = PUBLIC_CATALOG_DISEASE_CARD_STUBS.find((c) => c.slug === 'discinesia-paroxistica-caes-gatos');
    assert.ok(card, 'Card stub deve existir no PUBLIC_CATALOG_DISEASE_CARD_STUBS');
    assert.equal(card.id, 'disease-discinesia-paroxistica-caes-gatos');
    assert.ok(card.quickSummary.length > 100);
  });

  await t.test('deve possuir linguagem simples completa para tutores', () => {
    const plain = DISEASE_PLAIN_LANGUAGE['discinesia-paroxistica-caes-gatos'];
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

    const motorGroup = seed.clinicalSignsPathophysiology.find((g) => g.system.includes('Sinais Paroxísticos'));
    assert.ok(motorGroup, 'Grupo Sinais Paroxísticos deve existir');
    assert.ok(motorGroup.findings.length >= 4, 'Deve conter pelo menos 4 achados motores');

    const sensoryGroup = seed.clinicalSignsPathophysiology.find((g) => g.system.includes('Preservação do Sensorium'));
    assert.ok(sensoryGroup, 'Grupo Preservação do Sensorium deve existir');
    assert.ok(sensoryGroup.findings.length >= 3, 'Deve conter pelo menos 3 achados de sensorium');

    const reactiveGroup = seed.clinicalSignsPathophysiology.find((g) => g.system.includes('Sinais Reativos'));
    assert.ok(reactiveGroup, 'Grupo Sinais Reativos deve existir');
    assert.ok(reactiveGroup.findings.length >= 2, 'Deve conter pelo menos 2 achados reativos');

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

  await t.test('deve estruturar diagnosis como ARRAY sequencial e conter padrão ouro na análise de vídeo domiciliar', () => {
    assert.ok(Array.isArray(seed.diagnosis), 'Diagnosis deve ser um array');
    assert.ok(seed.diagnosis.length >= 6, 'Deve conter pelo menos 6 etapas diagnósticas');

    const goldSteps = seed.diagnosis.filter((s) => s.isGoldStandard === true);
    assert.equal(goldSteps.length, 1, 'Deve haver exatamente 1 exame padrão ouro');
    assert.ok(
      goldSteps[0].title.toLowerCase().includes('vídeo') || goldSteps[0].title.toLowerCase().includes('video'),
      'Padrão ouro de triagem propedêutica deve ser a análise de vídeo'
    );
  });

  await t.test('deve conter etiopatogenia profunda com 2 tabelas clínicas e subtipos Dellwig 2026', () => {
    const etio = seed.etiology as Record<string, any>;
    assert.ok(etio.conceitoDisturbioMovimentoVsCrise, 'Deve conter conceitoDisturbioMovimentoVsCrise');
    assert.ok(etio.neuroanatomiaCircuitosNucleosDaBase, 'Deve conter neuroanatomiaCircuitosNucleosDaBase');
    assert.ok(etio.tabelaFenotiposCaninosPorRaca, 'Deve conter tabelaFenotiposCaninosPorRaca');
    assert.equal(etio.tabelaFenotiposCaninosPorRaca.kind, 'clinicalTable');
    assert.ok(etio.tabelaClassificacaoEtiologicaDellwig, 'Deve conter tabelaClassificacaoEtiologicaDellwig');
    assert.equal(etio.tabelaClassificacaoEtiologicaDellwig.kind, 'clinicalTable');
    assert.ok(etio.fenotiposFelinosExpansao2026, 'Deve conter fenotiposFelinosExpansao2026');
    assert.ok(etio.encefalopatiaMetabolicaHipertireoidismo, 'Deve conter encefalopatiaMetabolicaHipertireoidismo');

    const epi = seed.epidemiology as Record<string, any>;
    assert.ok(epi.particularidadesEpidemiologicasEIdade, 'Deve conter particularidadesEpidemiologicasEIdade');

    const patho = seed.pathophysiology as Record<string, any>;
    assert.ok(patho.mecanismosCelularesEControleSinaptico, 'Deve conter mecanismosCelularesEControleSinaptico');
  });

  await t.test('deve conter protocolo de tratamento com tabela neuromoduladora e manejo por subtipo', () => {
    const treat = seed.treatment as Record<string, any>;
    assert.ok(treat.metaPrimaria, 'Deve conter metaPrimaria');
    assert.ok(treat.condutaGeralDuranteCriseParoxistica, 'Deve conter condutaGeralDuranteCriseParoxistica');
    assert.ok(treat.dietaEstritaSemGluten, 'Deve conter dietaEstritaSemGluten');
    assert.ok(treat.farmacoterapiaCanina, 'Deve conter farmacoterapiaCanina');
    assert.ok(treat.manejoDoHipertireoidismoComoTratamento, 'Deve conter manejoDoHipertireoidismoComoTratamento');
    assert.ok(treat.tabelaFarmacologiaNeuromoduladora, 'Deve conter tabelaFarmacologiaNeuromoduladora');
    assert.equal(treat.tabelaFarmacologiaNeuromoduladora.kind, 'clinicalTable');
    assert.ok(treat.protocoloPlantaoPassoAPasso, 'Deve conter protocoloPlantaoPassoAPasso');
    assert.ok(treat.protocoloPlantaoPassoAPasso.length >= 8, 'Deve conter pelo menos 8 passos no plantão');
    assert.ok(treat.terapiasInadequadas, 'Deve conter terapiasInadequadas');
    assert.ok(treat.terapiasInadequadas.length >= 6, 'Deve conter pelo menos 6 erros a evitar');
    assert.ok(treat.monitoramentoSeriado, 'Deve conter monitoramentoSeriado');
  });

  await t.test('deve estruturar complications e prevention como objetos com chaves nomeadas', () => {
    const comp = seed.complications as Record<string, any>;
    assert.ok(comp && typeof comp === 'object' && !Array.isArray(comp), 'Complications deve ser um objeto');
    assert.ok(comp.traumaFisicoEHipertermiaPorContracao, 'Deve conter traumaFisicoEHipertermiaPorContracao');
    assert.ok(comp.rabdomioliseElevaçãoCKTransitória, 'Deve conter rabdomioliseElevaçãoCKTransitória');
    assert.ok(comp.diagnosticoErroneoDeEpilepsiaRefrataria, 'Deve conter diagnosticoErroneoDeEpilepsiaRefrataria');
    assert.ok(comp.impactoEmocionalERupturaTutorAnimal, 'Deve conter impactoEmocionalERupturaTutorAnimal');

    const prev = seed.prevention as Record<string, any>;
    assert.ok(prev && typeof prev === 'object' && !Array.isArray(prev), 'Prevention deve ser um objeto');
    assert.ok(prev.reducaoGatilhosExcitacaoEEstresse, 'Deve conter reducaoGatilhosExcitacaoEEstresse');
    assert.ok(prev.adesaoRigidaDietaSemGlutenSemCruzamento, 'Deve conter adesaoRigidaDietaSemGlutenSemCruzamento');
    assert.ok(prev.rastreamentoMetabolicoTireoidianoAnual, 'Deve conter rastreamentoMetabolicoTireoidianoAnual');
    assert.ok(prev.acondicionamentoSeguroDoAmbiente, 'Deve conter acondicionamentoSeguroDoAmbiente');
    assert.ok(prev.registroSeriadoEmDiarioEVideos, 'Deve conter registroSeriadoEmDiarioEVideos');
  });

  await t.test('deve referenciar formalmente estudos seminais e consensos internacionais', () => {
    assert.ok(seed.references.length >= 12, 'Deve conter pelo menos 12 referências');
    const refText = JSON.stringify(seed.references);
    assert.ok(refText.includes('Dellwig'), 'Deve citar Dellwig et al. 2026');
    assert.ok(refText.includes('Liatis'), 'Deve citar Liatis et al. 2026');
    assert.ok(refText.includes('Espinosa'), 'Deve citar Espinosa et al. 2026');
    assert.ok(refText.includes('Boyd'), 'Deve citar Boyd et al. 2026');
    assert.ok(refText.includes('Cerda-Gonzalez') || refText.includes('ECVN'), 'Deve citar Consenso ECVN 2021');
    assert.ok(refText.includes('Mandigers'), 'Deve citar Mandigers et al. 2024');
    assert.ok(refText.includes('Rogers'), 'Deve citar Rogers et al. 2023');
    assert.ok(refText.includes('Lowrie'), 'Deve citar Lowrie et al. 2015');
    assert.ok(refText.includes('de Lahunta') || refText.includes('Lahunta'), 'Deve citar de Lahunta');
    assert.ok(refText.includes('Nelson'), 'Deve citar Nelson & Couto');
    assert.ok(refText.includes('BSAVA'), 'Deve citar BSAVA Formulary');
    assert.ok(refText.includes('Plumb'), 'Deve citar Plumb Veterinary Drugs');
  });

  await t.test('deve possuir 4 figuras clínicas reais e validadas em disco em public/consulta-vet/discinesia-paroxistica/', () => {
    assert.ok(seed.figures, 'Deve possuir campo figures');
    assert.equal(seed.figures.length, 4, 'Deve conter exatamente 4 figuras');

    for (const fig of seed.figures) {
      const publicPath = path.join(process.cwd(), 'public', fig.url);
      assert.ok(fs.existsSync(publicPath), 'Arquivo ' + fig.url + ' deve existir fisicamente no disco');
      const stat = fs.statSync(publicPath);
      assert.ok(stat.size > 20000, 'Arquivo ' + fig.url + ' deve ter tamanho válido (>20KB), encontrado: ' + stat.size);
      assert.ok(
        fig.legend.includes('CC BY 4.0') || fig.source.includes('CC BY 4.0'),
        'Figura ' + fig.url + ' deve ter licença CC BY 4.0 declarada'
      );
    }
  });

  await t.test('NÃO deve conter marcadores literais em nenhuma string do seed', () => {
    const seedJson = JSON.stringify(seed);
    const doubleStar = ['*', '*'].join('');
    assert.ok(!seedJson.includes(doubleStar), 'Seed não deve conter marcadores literais de asterisco duplo');
  });
});
