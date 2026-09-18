import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';

test('Anemia em Cães e Gatos — Validação Padrão Ouro Vetius', async (t) => {
  const slug = 'anemia-caes-gatos';
  const record = diseasesSeed.find((d) => d.slug === slug);

  await t.test('deve estar devidamente cadastrado no diseasesSeed e conter metadados corretos', () => {
    assert.ok(record, 'Registro da doença deve existir no diseasesSeed');
    assert.equal(record.id, 'disease-anemia-caes-gatos');
    assert.equal(record.slug, slug);
    assert.equal(record.title, 'Anemia em Cães e Gatos');
    assert.deepEqual(record.species, ['dog', 'cat']);
    assert.equal(record.category, 'hematologia');
    assert.ok(record.categories?.includes('hematologia'));
    assert.ok(record.categories?.includes('urgencia-emergencia'));
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
    assert.equal(card.id, 'disease-anemia-caes-gatos');
    assert.equal(card.category, 'hematologia');
    assert.ok(card.quickSummary.length > 50);
  });

  await t.test('deve possuir linguagem simples completa para tutores', () => {
    assert.ok(record?.plainLanguage, 'Deve ter plainLanguage definido');
    assert.ok(record.plainLanguage.whatIs.length > 50, 'whatIs deve ser explicativo');
    assert.ok(record.plainLanguage.warningSigns.length > 50, 'warningSigns deve alertar tutores');
    assert.ok(record.plainLanguage.diagnosis.length > 50, 'diagnosis deve ser didático');
    assert.ok(record.plainLanguage.homeCare.length > 50, 'homeCare deve orientar cuidados');
  });

  await t.test('deve estruturar clinicalSignsPathophysiology como ARRAY de grupos com achados detalhados', () => {
    assert.ok(Array.isArray(record?.clinicalSignsPathophysiology), 'clinicalSignsPathophysiology deve ser um ARRAY');
    assert.ok(record.clinicalSignsPathophysiology.length >= 4, 'Deve conter pelo menos 4 grupos sindrômicos');

    for (const group of record.clinicalSignsPathophysiology) {
      assert.ok(group.system, 'Grupo deve possuir título de sistema');
      assert.ok(Array.isArray(group.findings), 'findings deve ser um array');
      assert.ok(group.findings.length >= 2, 'Cada grupo deve ter pelo menos 2 achados');
      for (const finding of group.findings) {
        assert.ok(finding.finding, 'Deve ter descrição do sinal clínico');
        assert.ok(finding.mechanism, 'Deve ter mecanismo fisiopatológico');
        assert.ok(finding.clinicalMeaning, 'Deve ter significado clínico');
        assert.ok(finding.priority, 'Deve ter prioridade clínica');
      }
    }

    const allFindings = record.clinicalSignsPathophysiology.flatMap((g) => g.findings);
    const hasPalidez = allFindings.some((f) => f.finding.toLowerCase().includes('palidez'));
    const hasIctericia = allFindings.some((f) => f.finding.toLowerCase().includes('icterícia') || f.finding.toLowerCase().includes('ictericia'));
    const hasSopro = allFindings.some((f) => f.finding.toLowerCase().includes('sopro'));
    assert.ok(hasPalidez, 'Deve abordar palidez de mucosas');
    assert.ok(hasIctericia, 'Deve abordar icterícia');
    assert.ok(hasSopro, 'Deve abordar sopro anêmico sistólico funcional');
  });

  await t.test('deve estruturar diagnosis como ARRAY sequencial e conter padrão ouro na contagem absoluta de reticulócitos e esfregaço', () => {
    assert.ok(Array.isArray(record?.diagnosis), 'diagnosis deve ser um ARRAY');
    assert.ok(record.diagnosis.length >= 6, 'Deve conter pelo menos 6 etapas diagnósticas');

    const goldStandardStep = record.diagnosis.find((step) => step.isGoldStandard === true);
    assert.ok(goldStandardStep, 'Deve possuir pelo menos uma etapa com isGoldStandard: true');
    assert.equal(goldStandardStep.stepNumber, 2, 'Etapa 2 deve ser o padrão ouro (contagem absoluta de reticulócitos)');
    assert.ok(goldStandardStep.title.toLowerCase().includes('reticulócitos'), 'Título da etapa deve mencionar reticulócitos');
  });

  await t.test('deve conter etiopatogenia profunda, fisiopatologia do DO2 e diretrizes de hemoterapia', () => {
    const etio = record?.etiology as Record<string, any>;
    const treat = record?.treatment as Record<string, any>;
    assert.ok(etio, 'Etiologia deve estar presente');
    assert.ok(treat, 'Tratamento deve estar presente');

    assert.ok(
      etio.fisiologiaDoTransporteOxigenioDO2ECaO2.includes('DO2 = DC x CaO2'),
      'Deve documentar a equação de entrega tecidual de oxigênio DO2'
    );

    assert.ok(
      etio.anemiaAbsolutaVsAnemiaDilucional.includes('dilucional') &&
      etio.anemiaAbsolutaVsAnemiaDilucional.includes('absoluta'),
      'Deve diferenciar anemia absoluta de anemia relativa dilucional'
    );

    assert.ok(
      treat.hemoterapiaEIndicacoesTransfusionais.includes('lactato') ||
      treat.hemoterapiaEIndicacoesTransfusionais.includes('hipóxia') ||
      treat.hemoterapiaEIndicacoesTransfusionais.includes('hematócrito'),
      'Deve conter indicações transfusionais fisiológicas e individualizadas'
    );

    assert.ok(
      treat.rejeicaoDePreMedicacaoAntiHistaminicaRotineira.includes('difenidramina') ||
      treat.rejeicaoDePreMedicacaoAntiHistaminicaRotineira.includes('TRACS'),
      'Deve documentar recomendação AVHTM TRACS sobre pré-medicação transfusional'
    );
  });

  await t.test('deve conter 5 figuras clínicas reais verificadas no disco em public/consulta-vet/anemia/', () => {
    assert.ok(record?.figures && record.figures.length === 5, 'Deve conter exatamente 5 figuras');
    for (const fig of record.figures) {
      assert.ok(fig.url.startsWith('/consulta-vet/anemia/'), 'URL deve apontar para /consulta-vet/anemia/: ' + fig.url);
      const relativePath = fig.url.replace(/^\/+/, '');
      const diskPath = path.join(process.cwd(), 'public', relativePath);
      assert.ok(fs.existsSync(diskPath), 'Arquivo de imagem deve existir no disco: ' + diskPath);
    }
  });

  await t.test('não deve conter asteriscos duplos em nenhum campo do seed', () => {
    const seedFilePath = path.join(
      process.cwd(),
      'modules/consulta-vet/data/seed/diseases.anemia-caes-gatos.seed.ts'
    );
    const content = fs.readFileSync(seedFilePath, 'utf8');
    const hasDoubleAsterisk = content.includes('**');
    assert.equal(hasDoubleAsterisk, false, 'O arquivo seed não pode conter asteriscos duplos');
  });
});
