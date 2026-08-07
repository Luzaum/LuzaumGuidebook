import assert from 'node:assert/strict';
import test from 'node:test';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';

test('todas as doenças públicas têm bloco em palavras simples', () => {
  for (const slug of CONSULTA_VET_PUBLIC_DISEASE_SLUGS) {
    const disease = diseasesSeed.find((item) => item.slug === slug);
    assert.ok(disease, `esperava seed para ${slug}`);
    const plain = disease!.plainLanguage ?? DISEASE_PLAIN_LANGUAGE[slug];
    assert.ok(plain?.whatIsIt, `${slug} deveria ter plainLanguage.whatIsIt`);
    assert.ok(plain!.keyPoints.length >= 3, `${slug} deveria ter ao menos 3 keyPoints`);
  }
});
