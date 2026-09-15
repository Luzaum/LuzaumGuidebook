import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';

test('Trombocitopenia em Cães e Gatos — Validação Padrão Ouro Vetius', async (t) => {
  const slug = 'trombocitopenia-caes-gatos';
  const record = diseasesSeed.find((d) => d.slug === slug);

  await t.test('deve estar devidamente cadastrado no diseasesSeed e conter metadados corretos', () => {
    assert.ok(record, 'Registro da doença deve existir no diseasesSeed');
    assert.equal(record.id, 'disease-trombocitopenia-caes-gatos');
    assert.equal(record.slug, slug);
    assert.equal(record.title, 'Trombocitopenia em Cães e Gatos');
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
    assert.equal(card.id, 'disease-trombocitopenia-caes-gatos');
    assert.equal(card.category, 'hematologia');
    assert.ok(card.quickSummary.length > 50);
  });

  await t.test('deve possuir linguagem simples completa para tutores', () => {
    assert.ok(record?.plainLanguage, 'Deve ter plainLanguage definido');
    assert.ok(record.plainLanguage.whatIs.length > 50, 'whatIs deve ser explicativo');
    assert.ok(record.plainLanguage.warningSigns.length > 50, 'warningSigns deve alertar tutores');
    assert.ok(record.plainLanguage.diagnosis.length > 50, 'diagnosis deve ser didático');
    assert.ok(record.plainLanguage.homeCare.length > 50, 'homeCare deve orientar cuidados e desmame');
  });

  await t.test('deve estruturar clinicalSignsPathophysiology como ARRAY de grupos com achados detalhados', () => {
    assert.ok(Array.isArray(record?.clinicalSignsPathophysiology), 'clinicalSignsPathophysiology deve ser um ARRAY');
    assert.ok(record.clinicalSignsPathophysiology.length >= 3, 'Deve conter pelo menos 3 grupos sindrômicos');

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
    const hasMelena = allFindings.some((f) => f.finding.toLowerCase().includes('melena') || f.mechanism.toLowerCase().includes('melena'));
    const hasPetequias = allFindings.some((f) => f.finding.toLowerCase().includes('petéquia'));
    assert.ok(hasMelena, 'Deve abordar melena e hemorragia gastrointestinal');
    assert.ok(hasPetequias, 'Deve abordar petéquias e hemostasia primária');
  });

  await t.test('deve estruturar diagnosis como ARRAY sequencial e conter padrão ouro no esfregaço sanguíneo', () => {
    assert.ok(Array.isArray(record?.diagnosis), 'diagnosis deve ser um ARRAY');
    assert.ok(record.diagnosis.length >= 6, 'Deve conter pelo menos 6 etapas diagnósticas');

    const goldStandardStep = record.diagnosis.find((step) => step.isGoldStandard === true);
    assert.ok(goldStandardStep, 'Deve possuir pelo menos uma etapa com isGoldStandard: true');
    assert.equal(goldStandardStep.stepNumber, 1, 'Etapa 1 deve ser o padrão ouro (esfregaço e exclusão de pseudotrombocitopenia)');
    assert.ok(goldStandardStep.title.toLowerCase().includes('esfregaço'), 'Título da etapa 1 deve mencionar esfregaço');
  });

  await t.test('deve conter etiopatogenia profunda, farmacologia contemporânea e alertas toxicológicos', () => {
    const etio = record?.etiology as Record<string, any>;
    const treat = record?.treatment as Record<string, any>;
    assert.ok(etio, 'Etiologia deve estar presente');
    assert.ok(treat, 'Tratamento deve estar presente');

    assert.ok(
      etio.pseudotrombocitopeniaEDTADependente.includes('71%') ||
      etio.pseudotrombocitopeniaEDTADependente.includes('Riond'),
      'Deve documentar pseudotrombocitopenia felina e dados de Riond et al.'
    );

    assert.ok(
      etio.particularidadesRaciaisEGeneticas.toLowerCase().includes('cavalier') &&
      etio.particularidadesRaciaisEGeneticas.includes('TUBB1'),
      'Deve documentar mutação TUBB1 e macroplaquetopenia benigna em Cavalier King Charles'
    );

    assert.ok(
      treat.protocoloVincristinaDoseUnica.includes('0,02 mg/kg') &&
      treat.protocoloVincristinaDoseUnica.includes('Balog'),
      'Deve documentar protocolo de vincristina 0,02 mg/kg dose única com evidência Balog et al. 2013'
    );

    assert.ok(
      treat.alertaMaximoAzatioprinaToxicidadeFelina.toLowerCase().includes('contraindicada') &&
      treat.alertaMaximoAzatioprinaToxicidadeFelina.includes('TPMT'),
      'Deve conter contraindicação formal e absoluta de azatioprina em felinos por carência de TPMT'
    );

    assert.ok(
      treat.terapiaImunossupressoraPrimeiraLinhaGlicocorticoides.includes('2 mg/kg/dia'),
      'Deve documentar dose de indução de 2 mg/kg/dia recomendada pelo consenso ACVIM'
    );
  });

  await t.test('deve referenciar formalmente estudos seminais e livros-texto fundamentais', () => {
    assert.ok(record?.references, 'Deve ter referências bibliográficas');
    assert.ok(record.references.length >= 10, 'Deve ter pelo menos 10 referências');

    const refs = record.references.map((r) => r.id);
    assert.ok(refs.includes('ref-garden-2019'), 'Deve citar consenso ACVIM Garden et al. 2019');
    assert.ok(refs.includes('ref-balog-2013'), 'Deve citar ensaio clínico de vincristina Balog et al. 2013');
    assert.ok(refs.includes('ref-makielski-2018'), 'Deve citar DOGiBAT Makielski et al. 2018');
    assert.ok(refs.includes('ref-omarra-2011'), 'Deve citar O Marra et al. 2011');
    assert.ok(refs.includes('ref-courtney-2026'), 'Deve citar coorte felina Courtney et al. 2026');
    assert.ok(refs.includes('ref-logtenberg-2026'), 'Deve citar Logtenberg et al. 2026');
    assert.ok(refs.includes('ref-nelson-couto-6ed'), 'Deve citar Nelson & Couto 6a ed.');
  });

  await t.test('deve possuir 5 figuras clínicas reais e validadas em disco em public/consulta-vet/trombocitopenia/', () => {
    assert.ok(record?.figures, 'Deve possuir figuras cadastradas');
    assert.equal(record.figures.length, 5, 'Deve possuir exatamente 5 figuras cadastradas');

    for (const fig of record.figures) {
      assert.ok(fig.url.startsWith('/consulta-vet/trombocitopenia/'), 'URL deve estar no diretório correto: ' + fig.url);
      assert.ok(fig.caption.length > 30, 'Legenda deve ser descritiva e detalhada');
      assert.ok(fig.source.length > 10, 'Fonte deve citar autor e licença');

      const diskPath = path.join(process.cwd(), 'public', fig.url.replace(/^\//, ''));
      assert.ok(fs.existsSync(diskPath), 'Arquivo de imagem deve existir fisicamente no disco: ' + diskPath);
      const stats = fs.statSync(diskPath);
      assert.ok(stats.size > 10000, 'Arquivo de imagem deve ter tamanho válido (>10 kB): ' + stats.size + ' bytes');
    }
  });

  await t.test('NÃO deve conter asteriscos duplos (**) em nenhuma string do seed', () => {
    const seedFilePath = path.join(
      process.cwd(),
      'modules/consulta-vet/data/seed/diseases.trombocitopenia-caes-gatos.seed.ts'
    );
    const content = fs.readFileSync(seedFilePath, 'utf8');
    assert.equal(content.includes('**'), false, 'Seed file NÃO pode conter asteriscos duplos (**) em nenhum lugar');
  });
});