import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { UltrasoundReportInterpretation } from '../../modules/consulta-vet/components/UltrasoundReportInterpretation';
import { ULTRASOUND_ORGANS } from '../../modules/consulta-vet/data/ultrasoundReferenceData';
import { ULTRASOUND_REPORT_PATTERNS, getUltrasoundReportPatterns } from '../../modules/consulta-vet/data/ultrasoundInterpretationData';
import { ULTRASOUND_CLINICAL_IMAGES } from '../../modules/consulta-vet/data/ultrasoundClinicalImages';
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
    assert.ok(fs.statSync(`public${image.src}`).size > 4000);
    assert.match(image.license, /^CC BY (3|4)\.0$/);
    assert.match(image.licenseUrl, /^https:\/\/creativecommons.org\/licenses\/by\//);
    assert.ok(image.author && image.article && image.caption && image.speciesLabel);
    assert.ok(!image.license.includes('NC'));
  }
  assert.match(ULTRASOUND_CLINICAL_IMAGES.ovaries.caption, /painel C é ultrassom/);
  assert.match(ULTRASOUND_CLINICAL_IMAGES.ureters.caption, /A e B são radiografias/);
});

test('leitura progride de imagem a mecanismo, diferenciais e raciocínio sem contagem ou páginas', () => {
  for (const organ of ULTRASOUND_ORGANS) for (const species of ['dog', 'cat'] as const) {
    const html = renderToStaticMarkup(<UltrasoundReportInterpretation organ={organ.id} species={species} />);
    assert.ok(html.indexOf('Como vejo no ultrassom') < html.indexOf('Como a alteração se forma'));
    assert.ok(html.indexOf('Como a alteração se forma') < html.indexOf('Diferenciais'));
    assert.ok(html.indexOf('Diferenciais') < html.indexOf('O que o clínico deve pensar'));
    assert.match(html, /explicar mecanismo/);
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
