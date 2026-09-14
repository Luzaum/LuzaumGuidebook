import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { cistiteEnfisematosaCaesGatosSeed } from '../../modules/consulta-vet/data/seed/diseases.cistite-enfisematosa-caes-gatos.seed';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';

describe('Cistite Enfisematosa em Cães e Gatos — Validação Padrão Ouro Vetius', () => {
  const seed = cistiteEnfisematosaCaesGatosSeed;

  it('deve estar devidamente cadastrado no diseasesSeed e conter metadados corretos', () => {
    const found = diseasesSeed.find((d) => d.slug === 'cistite-enfisematosa-caes-gatos');
    assert.ok(found, 'Doença deve estar presente no diseasesSeed');
    assert.equal(seed.id, 'disease-cistite-enfisematosa-caes-gatos');
    assert.equal(seed.slug, 'cistite-enfisematosa-caes-gatos');
    assert.equal(seed.title, 'Cistite Enfisematosa em Cães e Gatos');
    assert.deepEqual(seed.species, ['dog', 'cat']);
    assert.equal(seed.category, 'nefrologia');
    assert.ok(seed.categories.includes('nefrologia'));
    assert.ok(seed.categories.includes('urgencia-emergencia'));
    assert.ok(seed.categories.includes('infectologia'));
    assert.equal(seed.isPublished, true);
  });

  it('deve estar registrado no catálogo público e possuir card stub correspondente', () => {
    assert.ok(
      CONSULTA_VET_PUBLIC_DISEASE_SLUGS.includes('cistite-enfisematosa-caes-gatos' as any),
      'Slug deve constar no CONSULTA_VET_PUBLIC_DISEASE_SLUGS'
    );
    const card = PUBLIC_CATALOG_DISEASE_CARD_STUBS.find((c) => c.slug === 'cistite-enfisematosa-caes-gatos');
    assert.ok(card, 'Card stub deve existir no PUBLIC_CATALOG_DISEASE_CARD_STUBS');
    assert.equal(card.id, 'disease-cistite-enfisematosa-caes-gatos');
    assert.ok(card.quickSummary.length > 100);
  });

  it('deve possuir linguagem simples completa para tutores', () => {
    const plain = DISEASE_PLAIN_LANGUAGE['cistite-enfisematosa-caes-gatos'];
    assert.ok(plain, 'Entrada deve existir em DISEASE_PLAIN_LANGUAGE');
    assert.ok(plain.whatIsIt.length > 80);
    assert.ok(plain.keyPoints.length >= 5);
    assert.ok(seed.plainLanguage, 'Seed deve possuir bloco plainLanguage');
    assert.ok(seed.plainLanguage.whatIs.length > 50);
    assert.ok(seed.plainLanguage.warningSigns.length > 50);
  });

  it('deve estruturar clinicalSignsPathophysiology como ARRAY de grupos com achados detalhados', () => {
    assert.ok(Array.isArray(seed.clinicalSignsPathophysiology), 'Deve ser um array de grupos');
    assert.ok(seed.clinicalSignsPathophysiology.length >= 2, 'Deve conter pelo menos 2 grupos');
    
    const uriGroup = seed.clinicalSignsPathophysiology.find((g) => g.system === 'Trato Urinário Inferior');
    assert.ok(uriGroup, 'Grupo Trato Urinário Inferior deve existir');
    assert.ok(uriGroup.findings.length >= 3, 'Deve conter pelo menos 3 achados');

    for (const group of seed.clinicalSignsPathophysiology) {
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

  it('deve estruturar diagnosis como ARRAY sequencial e conter padrão ouro na ultrassonografia', () => {
    assert.ok(Array.isArray(seed.diagnosis), 'Diagnosis deve ser um array');
    assert.ok(seed.diagnosis.length >= 5, 'Deve conter pelo menos 5 etapas');

    const goldSteps = seed.diagnosis.filter((s) => s.isGoldStandard === true);
    assert.equal(goldSteps.length, 1, 'Deve haver exatamente 1 exame padrão ouro');
    assert.ok(
      goldSteps[0].title.toLowerCase().includes('ultrassonografia'),
      'Padrão ouro de triagem na rotina deve ser a ultrassonografia'
    );
  });

  it('deve conter etiopatogenia, microbiologia e fatores de risco aprofundados', () => {
    assert.ok(seed.etiology, 'Deve conter etiology');
    assert.ok(seed.etiology.diferenciacaoConceitualPneumaturiaVsCistiteEnfisematosa);
    assert.ok(seed.etiology.microbiologiaUropatogenosFermentadores);
    assert.ok(seed.etiology.substratosFermentaveisGlicoseVsProteinas);
    assert.ok(seed.etiology.tabelaComparativaCaesVsGatos);
    assert.equal(seed.etiology.tabelaComparativaCaesVsGatos.kind, 'clinicalTable');

    assert.ok(seed.epidemiology);
    assert.ok(seed.epidemiology.distribuicaoPorEspecieESexo);
    assert.ok(seed.epidemiology.desmistificacaoMitosHistoricos);

    assert.ok(seed.pathogenesisTransmission);
    assert.ok(Array.isArray(seed.pathogenesisTransmission.cascata));
    assert.ok(seed.pathogenesisTransmission.cascata.length >= 5);

    assert.ok(seed.pathophysiology);
    assert.ok(seed.pathophysiology.mecanismosFermentacaoProducaoGas);
    assert.ok(seed.pathophysiology.dissecacaoMuralEComprometimentoVascular);
  });

  it('deve referenciar formalmente estudos seminais e livros-texto fundamentais', () => {
    assert.ok(seed.references.length >= 10, 'Deve conter pelo menos 10 referências');
    const refText = JSON.stringify(seed.references);
    assert.ok(refText.includes('Weese'), 'Deve citar Weese & Weese 2026');
    assert.ok(refText.includes('Merkel'), 'Deve citar Merkel et al. 2017');
    assert.ok(refText.includes('Lippi'), 'Deve citar Lippi et al. 2019');
    assert.ok(refText.includes('Lee'), 'Deve citar Lee et al. 2023');
    assert.ok(refText.includes('ISCAID') || refText.includes('Weese JS, Blondeau J'), 'Deve citar guideline ISCAID');
    assert.ok(refText.includes('Nelson'), 'Deve citar Nelson & Couto');
    assert.ok(refText.includes('BSAVA'), 'Deve citar BSAVA');
    assert.ok(refText.includes("Plumb"), 'Deve citar Plumb');
  });

  it('deve possuir 4 figuras clínicas reais e validadas em disco em public/consulta-vet/cistite-enfisematosa/', () => {
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

  it('NÃO deve conter asteriscos duplos (**) em nenhuma string do seed', () => {
    const seedJson = JSON.stringify(seed);
    assert.ok(!seedJson.includes('**'), 'Seed não deve conter marcadores literais **');
  });
});
