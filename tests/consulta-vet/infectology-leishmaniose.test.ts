import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';

test('Leishmaniose em Cães e Gatos — Validação Padrão Ouro Vetius', async (t) => {
  const slug = 'leishmaniose-caes-gatos';
  const record = diseasesSeed.find((d) => d.slug === slug);

  await t.test('deve estar devidamente cadastrado no diseasesSeed e conter metadados corretos', () => {
    assert.ok(record, 'Registro da doença deve existir no diseasesSeed');
    assert.equal(record.id, 'disease-leishmaniose-caes-gatos');
    assert.equal(record.slug, slug);
    assert.equal(record.title, 'Leishmaniose em Cães e Gatos');
    assert.deepEqual(record.species, ['dog', 'cat']);
    assert.equal(record.category, 'infectologia');
    assert.ok(record.categories?.includes('infectologia'));
    assert.ok(record.categories?.includes('dermatologia'));
    assert.ok(record.categories?.includes('nefrologia'));
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
    assert.equal(card.id, 'disease-leishmaniose-caes-gatos');
    assert.equal(card.category, 'infectologia');
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
        assert.ok(finding.finding, 'Deve ter descrição do sinal clínico');
        assert.ok(finding.mechanism, 'Deve ter mecanismo fisiopatológico');
        assert.ok(finding.clinicalMeaning, 'Deve ter significado clínico');
        assert.ok(finding.priority, 'Deve ter prioridade clínica');
      }
    }

    const allFindings = record.clinicalSignsPathophysiology.flatMap((g) => g.findings);
    const hasDermatite = allFindings.some((f) => f.finding.toLowerCase().includes('esfoliativa') || f.finding.toLowerCase().includes('descamação'));
    const hasOnicogrifose = allFindings.some((f) => f.finding.toLowerCase().includes('onicogrifose'));
    const hasUveite = allFindings.some((f) => f.finding.toLowerCase().includes('uveíte') || f.finding.toLowerCase().includes('uveite'));
    const hasProteinuria = allFindings.some((f) => f.finding.toLowerCase().includes('proteinúria') || f.finding.toLowerCase().includes('proteinuria'));
    const hasFelino = allFindings.some((f) => f.finding.toLowerCase().includes('nódulos') || f.mechanism.toLowerCase().includes('gatos'));

    assert.ok(hasDermatite, 'Deve abordar dermatite esfoliativa');
    assert.ok(hasOnicogrifose, 'Deve abordar onicogrifose');
    assert.ok(hasUveite, 'Deve abordar uveíte granulomatosa');
    assert.ok(hasProteinuria, 'Deve abordar proteinúria e glomerulonefrite');
    assert.ok(hasFelino, 'Deve abordar particularidades clínicas em felinos');
  });

  await t.test('deve estruturar diagnosis como ARRAY sequencial e conter padrão ouro na citologia direta de amastigotas', () => {
    assert.ok(Array.isArray(record?.diagnosis), 'diagnosis deve ser um ARRAY');
    assert.ok(record.diagnosis.length >= 5, 'Deve conter pelo menos 5 etapas diagnósticas');

    const goldStandardStep = record.diagnosis.find((step) => step.isGoldStandard === true);
    assert.ok(goldStandardStep, 'Deve possuir pelo menos uma etapa com isGoldStandard: true');
    assert.equal(goldStandardStep.stepNumber, 2, 'Etapa 2 deve ser o padrão ouro (citologia direta)');
    assert.ok(goldStandardStep.title.toLowerCase().includes('citologia') || goldStandardStep.title.toLowerCase().includes('parasitológica'), 'Título da etapa deve mencionar citologia ou demonstração parasitológica');
  });

  await t.test('deve conter etiopatogenia profunda, consensos CLWG 2026, WAVD 2025 e farmacologia brasileira MAPA', () => {
    const etio = record?.etiology as Record<string, any>;
    const treat = record?.treatment as Record<string, any>;
    const prev = record?.prevention as Record<string, any>;
    assert.ok(etio, 'Etiologia deve estar presente');
    assert.ok(treat, 'Tratamento deve estar presente');
    assert.ok(prev, 'Prevenção deve estar presente');

    assert.ok(
      etio.mudancaDeConceitoCLWG2026InfeccaoVsDoenca.includes('CLWG') ||
      etio.mudancaDeConceitoCLWG2026InfeccaoVsDoenca.includes('doença ativa'),
      'Deve documentar mudança de conceito do CLWG 2026 entre infecção e doença ativa'
    );

    assert.ok(
      etio.respostaImunocelularVsHumoralTh1Th2.includes('Th1') &&
      etio.respostaImunocelularVsHumoralTh1Th2.includes('Th2'),
      'Deve documentar dicotomia imunológica Th1 protetora vs Th2 lesiva'
    );

    assert.ok(
      treat.protocoloMiltefosinaMecanismoEPosologia.includes('2 mg/kg') &&
      treat.protocoloMiltefosinaMecanismoEPosologia.includes('28 dias'),
      'Deve documentar posologia validada de Miltefosina (2 mg/kg/dia por 28 dias)'
    );

    assert.ok(
      treat.protocoloAlopurinolManejoDaXantinuria.includes('alopurinol') &&
      treat.protocoloAlopurinolManejoDaXantinuria.includes('xantina'),
      'Deve documentar alopurinol e manejo preventivo de xantinúria'
    );

    assert.ok(
      treat.legislacaoBrasileiraERegulamentacaoMAPA.includes('MAPA') ||
      treat.legislacaoBrasileiraERegulamentacaoMAPA.includes('1.426/2008'),
      'Deve documentar legislação sanitária brasileira do MAPA'
    );

    assert.ok(
      prev.alertaToxicologicoCriticoPermetrinaEmFelinos.toLowerCase().includes('fatal') ||
      prev.alertaToxicologicoCriticoPermetrinaEmFelinos.toLowerCase().includes('contraindicad'),
      'Deve conter alerta crítico de toxicidade letal por permetrina em gatos'
    );
  });

  await t.test('deve conter 5 figuras clínicas reais verificadas no disco em public/consulta-vet/leishmaniose/', () => {
    assert.ok(record?.figures && record.figures.length === 5, 'Deve conter exatamente 5 figuras');
    for (const fig of record.figures) {
      assert.ok(fig.url.startsWith('/consulta-vet/leishmaniose/'), 'URL deve apontar para /consulta-vet/leishmaniose/: ' + fig.url);
      const relativePath = fig.url.replace(/^\/+/, '');
      const diskPath = path.join(process.cwd(), 'public', relativePath);
      assert.ok(fs.existsSync(diskPath), 'Arquivo de imagem deve existir no disco: ' + diskPath);
    }
  });

  await t.test('não deve conter asteriscos duplos em nenhum campo do seed', () => {
    const seedFilePath = path.join(
      process.cwd(),
      'modules/consulta-vet/data/seed/diseases.leishmaniose-caes-gatos.seed.ts'
    );
    const content = fs.readFileSync(seedFilePath, 'utf8');
    const hasDoubleAsterisk = content.includes('**');
    assert.equal(hasDoubleAsterisk, false, 'O arquivo seed não pode conter asteriscos duplos');
  });

  await t.test('deve conter referências acadêmicas fundamentais incluindo CLWG 2026, WAVD 2025 e ABCD 2026', () => {
    assert.ok(record?.references && record.references.length >= 10, 'Deve ter pelo menos 10 referências');
    const refIds = record.references.map((r) => r.id);
    assert.ok(refIds.includes('ref-roura-2026'), 'Deve citar CLWG 2026 Roura et al.');
    assert.ok(refIds.includes('ref-solano-gallego-2025'), 'Deve citar WAVD 2025 Solano-Gallego et al.');
    assert.ok(refIds.includes('ref-pennisi-2026'), 'Deve citar ABCD Felino 2026 Pennisi et al.');
    assert.ok(refIds.includes('ref-nelson-couto-6ed'), 'Deve citar Nelson & Couto 6a ed.');
  });
});
