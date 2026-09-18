import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { cistiteEnfisematosaCaesGatosSeed } from '../../modules/consulta-vet/data/seed/diseases.cistite-enfisematosa-caes-gatos.seed';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';

test('Cistite Enfisematosa em Cães e Gatos — Validação Padrão Ouro Vetius', async (t) => {
  const seed = cistiteEnfisematosaCaesGatosSeed;

  await t.test('deve estar devidamente cadastrado no diseasesSeed e conter metadados corretos', () => {
    const found = diseasesSeed.find((d) => d.slug === 'cistite-enfisematosa-caes-gatos');
    assert.ok(found, 'Doença deve estar presente no diseasesSeed');
    assert.equal(seed.id, 'disease-cistite-enfisematosa-caes-gatos');
    assert.equal(seed.slug, 'cistite-enfisematosa-caes-gatos');
    assert.equal(seed.title, 'Cistite Enfisematosa em Cães e Gatos');
    assert.deepEqual(seed.species, ['dog', 'cat']);
    assert.equal(seed.category, 'nefrologia');
    assert.ok(seed.categories?.includes('nefrologia'));
    assert.ok(seed.categories?.includes('urgencia-emergencia'));
    assert.ok(seed.categories?.includes('infectologia'));
    assert.equal(seed.isPublished, true);
    assert.ok(seed.quickDecisionStrip.length >= 8, 'Deve conter pelo menos 8 itens de decisão rápida');
  });

  await t.test('deve estar registrado no catálogo público e possuir card stub correspondente', () => {
    assert.ok(
      CONSULTA_VET_PUBLIC_DISEASE_SLUGS.includes('cistite-enfisematosa-caes-gatos' as any),
      'Slug deve constar no CONSULTA_VET_PUBLIC_DISEASE_SLUGS'
    );
    const card = PUBLIC_CATALOG_DISEASE_CARD_STUBS.find((c) => c.slug === 'cistite-enfisematosa-caes-gatos');
    assert.ok(card, 'Card stub deve existir no PUBLIC_CATALOG_DISEASE_CARD_STUBS');
    assert.equal(card.id, 'disease-cistite-enfisematosa-caes-gatos');
    assert.ok(card.quickSummary.length > 100);
  });

  await t.test('deve possuir linguagem simples completa para tutores', () => {
    const plain = DISEASE_PLAIN_LANGUAGE['cistite-enfisematosa-caes-gatos'];
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

    const uriGroup = seed.clinicalSignsPathophysiology.find((g) => g.system === 'Trato Urinário Inferior');
    assert.ok(uriGroup, 'Grupo Trato Urinário Inferior deve existir');
    assert.ok(uriGroup.findings.length >= 4, 'Deve conter pelo menos 4 achados');

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

  await t.test('deve estruturar diagnosis como ARRAY sequencial e conter padrão ouro na ultrassonografia', () => {
    assert.ok(Array.isArray(seed.diagnosis), 'Diagnosis deve ser um array');
    assert.ok(seed.diagnosis.length >= 6, 'Deve conter pelo menos 6 etapas diagnósticas');

    const goldSteps = seed.diagnosis.filter((s) => s.isGoldStandard === true);
    assert.equal(goldSteps.length, 1, 'Deve haver exatamente 1 exame padrão ouro');
    assert.ok(
      goldSteps[0].title.toLowerCase().includes('ultrassonografia'),
      'Padrão ouro de triagem na rotina deve ser a ultrassonografia'
    );
  });

  await t.test('deve conter etiopatogenia profunda com 2 tabelas clínicas e fisiologia de defesas normais', () => {
    const etio = seed.etiology as Record<string, any>;
    assert.ok(etio.definicaoModernaESequenciaPatogenica, 'Deve conter definicaoModernaESequenciaPatogenica');
    assert.ok(etio.diferenciacaoConceitualPneumaturiaVsCistiteEnfisematosa, 'Deve conter diferenciacaoConceitualPneumaturiaVsCistiteEnfisematosa');
    assert.ok(etio.fisiologiaDefesasVesicaisNormais, 'Deve conter fisiologiaDefesasVesicaisNormais');
    assert.ok(etio.substratosFermentaveisGlicoseVsProteinas, 'Deve conter substratosFermentaveisGlicoseVsProteinas');
    assert.ok(etio.tabelaComparativaCaesVsGatos, 'Deve conter tabelaComparativaCaesVsGatos');
    assert.equal(etio.tabelaComparativaCaesVsGatos.kind, 'clinicalTable');
    assert.ok(etio.tabelaComparativaEstudosPredisponentes, 'Deve conter tabelaComparativaEstudosPredisponentes');
    assert.equal(etio.tabelaComparativaEstudosPredisponentes.kind, 'clinicalTable');

    const epi = seed.epidemiology as Record<string, any>;
    assert.ok(epi.distribuicaoPorEspecieESexo, 'Deve conter distribuicaoPorEspecieESexo');
    assert.ok(epi.desmistificacaoMitosHistoricos, 'Deve conter desmistificacaoMitosHistoricos');
    assert.ok(epi.dadosPrognosticosWeese2026, 'Deve conter dadosPrognosticosWeese2026');

    const patho = seed.pathophysiology as Record<string, any>;
    assert.ok(patho.mecanismosFermentacaoProducaoGas, 'Deve conter mecanismosFermentacaoProducaoGas');
    assert.ok(patho.dissecacaoMuralEComprometimentoVascular, 'Deve conter dissecacaoMuralEComprometimentoVascular');
    assert.ok(patho.disseminacaoExtravesicalEPielonefriteAscendente, 'Deve conter disseminacaoExtravesicalEPielonefriteAscendente');
  });

  await t.test('deve conter protocolo de tratamento com tabela farmacológica e stewardship', () => {
    const treat = seed.treatment as Record<string, any>;
    assert.ok(treat.metaPrimaria, 'Deve conter metaPrimaria');
    assert.ok(treat.principioInvasaoTecidualEBreakpoints, 'Deve conter principioInvasaoTecidualEBreakpoints');
    assert.ok(treat.tabelaTerapeuticaAntimicrobiana, 'Deve conter tabelaTerapeuticaAntimicrobiana');
    assert.equal(treat.tabelaTerapeuticaAntimicrobiana.kind, 'clinicalTable');
    assert.ok(treat.stewardshipEFluoroquinolonas, 'Deve conter stewardshipEFluoroquinolonas');
    assert.ok(treat.meropenemApenasMDR, 'Deve conter meropenemApenasMDR');
    assert.ok(treat.protocoloPlantaoPassoAPasso, 'Deve conter protocoloPlantaoPassoAPasso');
    assert.ok(treat.errosComunsEvitar, 'Deve conter errosComunsEvitar');
  });

  await t.test('deve estruturar complications e prevention como objetos com chaves nomeadas', () => {
    const comp = seed.complications as Record<string, any>;
    assert.ok(comp && typeof comp === 'object' && !Array.isArray(comp), 'Complications deve ser um objeto');
    assert.ok(comp.pielonefriteEnfisematosaAscendente, 'Deve conter pielonefriteEnfisematosaAscendente');
    assert.ok(comp.rupturaVesicalEUroperitonioSeptico, 'Deve conter rupturaVesicalEUroperitonioSeptico');
    assert.ok(comp.disseminacaoGasosaExtravesical, 'Deve conter disseminacaoGasosaExtravesical');
    assert.ok(comp.fibroseCicatricialEMicrobexiga, 'Deve conter fibroseCicatricialEMicrobexiga');
    assert.ok(comp.urosepticemiaEChoqueSeptico, 'Deve conter urosepticemiaEChoqueSeptico');

    const prev = seed.prevention as Record<string, any>;
    assert.ok(prev && typeof prev === 'object' && !Array.isArray(prev), 'Prevention deve ser um objeto');
    assert.ok(prev.controleGlicemicoEReducaoGlicosuria, 'Deve conter controleGlicemicoEReducaoGlicosuria');
    assert.ok(prev.manejoEsvaziamentoBexigaNeurogenica, 'Deve conter manejoEsvaziamentoBexigaNeurogenica');
    assert.ok(prev.investigacaoPrecoceComorbidades, 'Deve conter investigacaoPrecoceComorbidades');
    assert.ok(prev.cuidadosComSondagemUretral, 'Deve conter cuidadosComSondagemUretral');
    assert.ok(prev.remocaoDeCalculosEEstruturas, 'Deve conter remocaoDeCalculosEEstruturas');
  });

  await t.test('deve referenciar formalmente estudos seminais e livros-texto fundamentais', () => {
    assert.ok(seed.references.length >= 12, 'Deve conter pelo menos 12 referências');
    const refText = JSON.stringify(seed.references);
    assert.ok(refText.includes('Weese'), 'Deve citar Weese & Weese 2026');
    assert.ok(refText.includes('Merkel'), 'Deve citar Merkel et al. 2017');
    assert.ok(refText.includes('Lippi'), 'Deve citar Lippi et al. 2019');
    assert.ok(refText.includes('Lee'), 'Deve citar Lee et al. 2023');
    assert.ok(refText.includes('Magalhães') || refText.includes('Magalhaes'), 'Deve citar Magalhães et al. 2019');
    assert.ok(refText.includes('Fumeo'), 'Deve citar Fumeo et al. 2019');
    assert.ok(refText.includes('ISCAID'), 'Deve citar guideline ISCAID');
    assert.ok(refText.includes('Nelson'), 'Deve citar Nelson & Couto');
    assert.ok(refText.includes('BSAVA'), 'Deve citar BSAVA');
    assert.ok(refText.includes('Plumb'), 'Deve citar Plumb');
  });

  await t.test('deve possuir 4 figuras clínicas reais e validadas em disco em public/consulta-vet/cistite-enfisematosa/', () => {
    assert.ok(seed.figures, 'Deve possuir campo figures');
    assert.equal(seed.figures.length, 4, 'Deve conter exatamente 4 figuras');

    for (const fig of seed.figures) {
      const publicPath = path.join(process.cwd(), 'public', fig.url);
      assert.ok(fs.existsSync(publicPath), `Arquivo ${fig.url} deve existir fisicamente no disco`);
      const stat = fs.statSync(publicPath);
      assert.ok(stat.size > 20000, `Arquivo ${fig.url} deve ter tamanho válido (>20KB), encontrado: ${stat.size}`);
      assert.ok(fig.source.includes('CC BY 4.0'), `Figura ${fig.url} deve ter licença CC BY 4.0 declarada`);
    }
  });

  await t.test('NÃO deve conter asteriscos duplos (**) em nenhuma string do seed', () => {
    const seedJson = JSON.stringify(seed);
    assert.ok(!seedJson.includes('**'), 'Seed não deve conter marcadores literais **');
  });
});
