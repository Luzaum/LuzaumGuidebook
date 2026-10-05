import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { UltrasoundReportInterpretation } from '../../modules/consulta-vet/components/UltrasoundReportInterpretation';
import { ULTRASOUND_ORGANS } from '../../modules/consulta-vet/data/ultrasoundReferenceData';
import { ULTRASOUND_REPORT_PATTERNS, getUltrasoundReportPatterns } from '../../modules/consulta-vet/data/ultrasoundInterpretationData';
import { ULTRASOUND_CLINICAL_IMAGES, getUltrasoundClinicalImage } from '../../modules/consulta-vet/data/ultrasoundClinicalImages';
import { getUltrasoundDifferentialExplanations } from '../../modules/consulta-vet/data/ultrasoundClinicalMechanisms';

test('cada achado tem mecanismos expansíveis e raciocínio clínico, em todos os órgãos', () => {
  for (const organ of ULTRASOUND_ORGANS) {
    for (const row of ULTRASOUND_REPORT_PATTERNS[organ.id]) {
      const explanations = getUltrasoundDifferentialExplanations(organ.id, row.differentials);
      assert.ok(explanations.length, row.id);
      assert.equal(new Set(explanations.map(x => x.name)).size, explanations.length, row.id);
      for (const explanation of explanations) {
        for (const field of ['pathophysiology', 'appearance', 'clinical'] as const) assert.ok(explanation[field].length > 60, `${row.id}: ${field}`);
      }
    }
  }
});

test('imagens veterinárias de todos os órgãos têm arquivo, legenda e atribuição reutilizável', () => {
  assert.deepEqual(Object.keys(ULTRASOUND_CLINICAL_IMAGES).sort(), ULTRASOUND_ORGANS.map(x => x.id).sort());
  for (const image of Object.values(ULTRASOUND_CLINICAL_IMAGES)) {
    assert.ok(fs.existsSync(`public${image.src}`), image.src);
    assert.ok(image.width > 0 && image.height > 0, 'Reserva de espaço antes de carregar imagem');
    assert.ok(fs.statSync(`public${image.src}`).size > 4000);
    assert.match(image.license, /^CC BY (3|4)\.0$/);
    assert.match(image.licenseUrl, /^https:\/\/creativecommons.org\/licenses\/by\//);
    assert.ok(image.author && image.article && image.caption && image.speciesLabel);
    assert.ok(!image.license.includes('NC'));
  }
  for (const organ of ULTRASOUND_ORGANS) for (const species of ['dog', 'cat'] as const) {
    const image = getUltrasoundClinicalImage(organ.id, species);
    if (image.panel) {
      const { x, y, width, height } = image.panel;
      assert.ok(x >= 0 && y >= 0 && width > 0 && height > 0);
      assert.ok(x + width <= image.width && y + height <= image.height, organ.id);
    }
  }
  assert.equal(ULTRASOUND_CLINICAL_IMAGES.ovaries.panel?.x, 404, 'Somente ultrassom, sem CT ou peça anatômica');
  assert.equal(ULTRASOUND_CLINICAL_IMAGES.gallbladder.panel?.x, 45, 'Somente painel A de ultrassom');
  assert.equal(ULTRASOUND_CLINICAL_IMAGES.ureters.panel?.y, 151, 'Somente ureteres E/F, sem radiografia ou rim');
  assert.match(getUltrasoundClinicalImage('small-intestine', 'cat').speciesLabel, /Gato.*jejuno/);
  assert.match(getUltrasoundClinicalImage('small-intestine', 'dog').speciesLabel, /Cão.*duodeno/);
});

test('leitura progride de imagem a mecanismo, diferenciais e raciocínio sem contagem ou páginas', () => {
  for (const organ of ULTRASOUND_ORGANS) for (const species of ['dog', 'cat'] as const) {
    const html = renderToStaticMarkup(<UltrasoundReportInterpretation organ={organ.id} species={species} />);
    assert.equal((html.match(/<table\b/g) ?? []).length, 1, 'Tabela real em todos os órgãos');
    assert.equal((html.match(/scope="col"/g) ?? []).length, 5, 'Cinco colunas na ordem solicitada');
    assert.equal((html.match(/scope="row"/g) ?? []).length, getUltrasoundReportPatterns(organ.id, species).length);
    assert.equal((html.match(/<td\b/g) ?? []).length, getUltrasoundReportPatterns(organ.id, species).length * 4);
    assert.ok(html.indexOf('Como vejo no ultrassom') < html.indexOf('Como a alteração se forma'));
    assert.ok(html.indexOf('Como a alteração se forma') < html.indexOf('Diferenciais'));
    assert.ok(html.indexOf('Diferenciais') < html.indexOf('O que o clínico deve pensar'));
    assert.match(html, /Explicar mecanismo/);
    assert.doesNotMatch(html, /cadastrad|\d+ de \d+ padrões|PDF|BSAVA|Thrall|capítulo|p\. \d/);
  }
});

test('busca acessa mecanismos, sem misturar achados específicos de outra espécie', () => {
  assert.ok(getUltrasoundReportPatterns('liver', 'dog', 'speckle').some(x => x.id === 'liver-0'));
  assert.ok(getUltrasoundReportPatterns('pancreas', 'cat', 'idade').some(x => x.id === 'pancreas-extended-0'));
  assert.ok(!getUltrasoundReportPatterns('pancreas', 'dog', 'idade').some(x => x.id === 'pancreas-extended-0'));
  assert.ok(!getUltrasoundReportPatterns('small-intestine', 'dog').some(x => x.id === 'small-intestine-extended-0'));
  assert.ok(getUltrasoundReportPatterns('small-intestine', 'cat', 'eosinofilica').some(x => x.id === 'small-intestine-extended-0'));
});
