import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';

test('Cistite Idiopática Felina (CIF / FIC) — Validação Padrão Ouro Vetius', async (t) => {
  const slug = 'cistite-idiopatica-felina';
  const record = diseasesSeed.find((d) => d.slug === slug);

  await t.test('deve estar devidamente cadastrado no diseasesSeed e conter metadados corretos', () => {
    assert.ok(record, 'Registro da doença deve existir no diseasesSeed');
    assert.equal(record.id, 'disease-cistite-idiopatica-felina');
    assert.equal(record.slug, slug);
    assert.equal(record.title, 'Cistite Idiopática Felina (CIF / FIC)');
    assert.deepEqual(record.species, ['cat']);
    assert.equal(record.category, 'nefrologia');
    assert.ok(record.categories?.includes('nefrologia'));
    assert.ok(record.categories?.includes('urgencia-emergencia'));
    assert.ok(record.categories?.includes('clinica-medica'));
    assert.equal(record.isPublished, true);
    assert.ok(record.quickDecisionStrip.length >= 8, 'Deve conter pelo menos 8 itens de decisão rápida');
  });

  await t.test('deve estar registrado no catálogo público e possuir card stub correspondente', () => {
    assert.ok(
      CONSULTA_VET_PUBLIC_DISEASE_SLUGS.includes(slug as any),
      'Slug deve estar presente em CONSULTA_VET_PUBLIC_DISEASE_SLUGS'
    );
    const card = PUBLIC_CATALOG_DISEASE_CARD_STUBS.find((c) => c.slug === slug);
    assert.ok(card, 'Card stub deve existir em PUBLIC_CATALOG_DISEASE_CARD_STUBS');
    assert.equal(card.id, 'disease-cistite-idiopatica-felina');
    assert.equal(card.category, 'nefrologia');
    assert.ok(card.quickSummary.length > 50);
  });

  await t.test('deve possuir linguagem simples completa para tutores', () => {
    assert.ok(record?.plainLanguage, 'Deve ter plainLanguage definido');
    assert.ok(record.plainLanguage.whatIs.length > 50, 'whatIs deve ser explicativo');
    assert.ok(record.plainLanguage.warningSigns.length > 50, 'warningSigns deve alertar tutores');
    assert.ok(record.plainLanguage.diagnosis.length > 50, 'diagnosis deve ser didático');
    assert.ok(record.plainLanguage.homeCare.length > 50, 'homeCare deve orientar cuidados');
    assert.ok(Array.isArray(record.plainLanguage.keyPoints), 'keyPoints deve ser array');
    assert.ok(record.plainLanguage.keyPoints.length >= 6, 'Deve ter pelo menos 6 pontos-chave');
  });

  await t.test('deve estruturar clinicalSignsPathophysiology como ARRAY de grupos com achados detalhados', () => {
    assert.ok(Array.isArray(record?.clinicalSignsPathophysiology), 'clinicalSignsPathophysiology deve ser um ARRAY');
    assert.ok(record.clinicalSignsPathophysiology.length >= 4, 'Deve conter pelo menos 4 grupos sindrômicos');

    for (const group of record.clinicalSignsPathophysiology) {
      assert.ok(group.system, 'Grupo deve possuir título de sistema');
      assert.ok(Array.isArray(group.findings), 'findings deve ser um array');
      assert.ok(group.findings.length >= 2, 'Cada grupo deve ter pelo menos 2 achados');
      for (const finding of group.findings) {
        assert.ok(finding.finding, 'Achado deve conter título');
        assert.ok(finding.mechanism, 'Achado deve conter mecanismo fisiopatológico');
        assert.ok(finding.clinicalMeaning, 'Achado deve conter significado clínico');
        assert.ok(finding.priority, 'Achado deve conter prioridade clínica');
        assert.ok(
          ['critica', 'alta', 'media', 'baixa'].includes(finding.priority),
          'Prioridade deve ser válida: ' + finding.priority
        );
      }
    }
  });

  await t.test('deve estruturar diagnosis como ARRAY de etapas sequenciais com padrão-ouro de exclusão estrutural', () => {
    assert.ok(Array.isArray(record?.diagnosis), 'diagnosis deve ser um ARRAY de etapas');
    assert.ok(record.diagnosis.length >= 4, 'Deve conter pelo menos 4 etapas diagnósticas');

    const goldStandardStep = record.diagnosis.find((step: any) => step.isGoldStandard);
    assert.ok(goldStandardStep, 'Deve possuir ao menos uma etapa com isGoldStandard: true');
    assert.ok(
      goldStandardStep.title.toLowerCase().includes('ultrassonografia') ||
      goldStandardStep.description.toLowerCase().includes('exclusão'),
      'Etapa padrão-ouro deve envolver ultrassonografia ou exclusão sistemática'
    );
  });

  await t.test('deve conter seções clínicas estruturadas com chaves técnicas de alta especificidade', () => {
    const etio = record?.etiology as Record<string, any>;
    const epi = record?.epidemiology as Record<string, any>;
    const patho = record?.pathophysiology as Record<string, any>;
    const treat = record?.treatment as Record<string, any>;
    const comp = record?.complications as Record<string, any>;
    const prev = record?.prevention as Record<string, any>;

    assert.ok(etio.definicaoModernaSindromeDolorosaSistemica, 'Deve conter definicaoModernaSindromeDolorosaSistemica');
    assert.ok(etio.distincaoConceitualLUTSvFLUTDvsCIFvsPandora, 'Deve conter distincaoConceitualLUTSvFLUTDvsCIFvsPandora');
    assert.ok(etio.tabelaComparativaFenotiposClinicosCIF, 'Deve conter tabelaComparativaFenotiposClinicosCIF');

    assert.ok(epi.prevalenciaEmGatosComLUTS, 'Deve conter prevalenciaEmGatosComLUTS');
    assert.ok(epi.baixaPrevalenciaDeInfeccaoBacterianaITU, 'Deve conter baixaPrevalenciaDeInfeccaoBacterianaITU');
    assert.ok(epi.diferencasSexuaisEVulnerabilidadeObstrutiva, 'Deve conter diferencasSexuaisEVulnerabilidadeObstrutiva');

    assert.ok(patho.urotelioComoOrgaoSensorialECamadaGAG, 'Deve conter urotelioComoOrgaoSensorialECamadaGAG');
    assert.ok(patho.eixoNeuroendocrinoEHiperatividadeSimpatica, 'Deve conter eixoNeuroendocrinoEHiperatividadeSimpatica');
    assert.ok(patho.fisiopatologiaDaObstrucaoUretralAgudaUO, 'Deve conter fisiopatologiaDaObstrucaoUretralAgudaUO');

    assert.ok(treat.modificacaoAmbientalMultimodalMEMO, 'Deve conter modificacaoAmbientalMultimodalMEMO');
    assert.ok(treat.analgesiaFarmacologica, 'Deve conter analgesiaFarmacologica');
    assert.ok(treat.analiseCriticaDeFarmacosControversos, 'Deve conter analiseCriticaDeFarmacosControversos');
    assert.ok(treat.evidenciasEmergentes2026, 'Deve conter evidenciasEmergentes2026');
    assert.ok(treat.protocoloDeDesobstrucaoECateterizacaoUretral, 'Deve conter protocoloDeDesobstrucaoECateterizacaoUretral');

    assert.ok(comp.obstrucaoUretralAgudaEArritmiaFatal, 'Deve conter obstrucaoUretralAgudaEArritmiaFatal');
    assert.ok(comp.atoniaVesicalDoDetrusorPorSobredistensao, 'Deve conter atoniaVesicalDoDetrusorPorSobredistensao');

    assert.ok(prev.cincoPilaresDoAmbienteFelinoSeguro, 'Deve conter cincoPilaresDoAmbienteFelinoSeguro');
    assert.ok(prev.regrasDeOuroDasCaixasSanitarias, 'Deve conter regrasDeOuroDasCaixasSanitarias');
  });

  await t.test('deve refletir o consenso iCatCare 2025, revisão sistemática 2025 e estudos de 2026', () => {
    const treat = record?.treatment as Record<string, any>;
    const epi = record?.epidemiology as Record<string, any>;

    assert.ok(
      treat.analiseCriticaDeFarmacosControversos.toLowerCase().includes('glicosaminoglicano') ||
      treat.analiseCriticaDeFarmacosControversos.toLowerCase().includes('gag') ||
      treat.analiseCriticaDeFarmacosControversos.toLowerCase().includes('macleod'),
      'Deve analisar criticamente GAGs e citar Macleod 2025'
    );

    assert.ok(
      treat.evidenciasEmergentes2026.toLowerCase().includes('radioterapia') &&
      treat.evidenciasEmergentes2026.toLowerCase().includes('multinutriente'),
      'Deve cobrir radioterapia de baixa dose e suplementação multinutriente de 2026'
    );

    assert.ok(
      treat.analgesiaFarmacologica.toLowerCase().includes('buprenorfina') &&
      treat.analgesiaFarmacologica.toLowerCase().includes('gabapentina'),
      'Deve documentar buprenorfina e gabapentina no manejo agudo'
    );

    assert.ok(
      epi.baixaPrevalenciaDeInfeccaoBacterianaITU.includes('1%') ||
      epi.baixaPrevalenciaDeInfeccaoBacterianaITU.includes('2%') ||
      epi.baixaPrevalenciaDeInfeccaoBacterianaITU.includes('3%'),
      'Deve ressaltar baixa prevalência (<1-3%) de ITU bacteriana em gatos jovens'
    );
  });

  await t.test('deve conter 5 figuras clínicas reais verificadas no disco em public/consulta-vet/cistite-idiopatica-felina/', () => {
    assert.ok(record?.figures && record.figures.length === 5, 'Deve conter exatamente 5 figuras');
    for (const fig of record.figures) {
      assert.ok(
        fig.url.startsWith('/consulta-vet/cistite-idiopatica-felina/'),
        'URL deve apontar para /consulta-vet/cistite-idiopatica-felina/: ' + fig.url
      );
      const relativePath = fig.url.replace(/^\/+/, '');
      const diskPath = path.join(process.cwd(), 'public', relativePath);
      assert.ok(fs.existsSync(diskPath), 'Arquivo de imagem deve existir no disco: ' + diskPath);
    }
  });

  await t.test('não deve conter asteriscos duplos em nenhum campo do seed', () => {
    const seedFilePath = path.join(
      process.cwd(),
      'modules/consulta-vet/data/seed/diseases.cistite-idiopatica-felina.seed.ts'
    );
    const content = fs.readFileSync(seedFilePath, 'utf8');
    const hasDoubleAsterisk = content.includes('**');
    assert.equal(hasDoubleAsterisk, false, 'O arquivo seed não pode conter asteriscos duplos');
  });

  await t.test('deve conter referências acadêmicas fundamentais incluindo iCatCare 2025, Macleod 2025 e Buffington', () => {
    assert.ok(record?.references && record.references.length >= 10, 'Deve ter pelo menos 10 referências');
    const refIds = record.references.map((r) => r.id);
    assert.ok(refIds.includes('ref-taylor-2025'), 'Deve citar iCatCare Consensus Guidelines 2025 (Taylor et al.)');
    assert.ok(refIds.includes('ref-macleod-2025'), 'Deve citar Macleod et al. 2025 Systematic Review');
    assert.ok(refIds.includes('ref-buffington-2006'), 'Deve citar Buffington et al. 2006 MEMO');
    assert.ok(refIds.includes('ref-kruger-2003'), 'Deve citar Kruger et al. 2003');
    assert.ok(refIds.includes('ref-reineke-2017'), 'Deve citar Reineke et al. 2017');
    assert.ok(refIds.includes('ref-kendall-2026'), 'Deve citar Kendall et al. 2026');
    assert.ok(refIds.includes('ref-chen-huang-2026'), 'Deve citar Chen & Huang 2026');
  });
});
