import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';

test('Doença do Disco Intervertebral (DDIV) — Cães — Contrato estrutural e conteúdo científico', () => {
  const dogSeed = diseasesSeed.find((d) => d.slug === 'doenca-do-disco-intervertebral-caes');
  assert.ok(dogSeed, 'DDIV Canina deve existir em diseasesSeed');
  assert.equal(dogSeed.title, 'Doença do Disco Intervertebral — Cães');
  assert.deepEqual(dogSeed.species, ['dog']);
  assert.equal(dogSeed.category, 'neurologia');

  // Catálogo público e stubs
  assert.ok((CONSULTA_VET_PUBLIC_DISEASE_SLUGS as readonly string[]).includes('doenca-do-disco-intervertebral-caes'));
  const stub = PUBLIC_CATALOG_DISEASE_CARD_STUBS.find((s) => s.slug === 'doenca-do-disco-intervertebral-caes');
  assert.ok(stub, 'Stub de DDIV Canina deve existir');
  assert.equal(stub.title, dogSeed.title);

  // Linguagem simples
  assert.ok(DISEASE_PLAIN_LANGUAGE['doenca-do-disco-intervertebral-caes']);

  // Conteúdo científico canino (ACVIM 2022, FGF4, dor profunda, corticoides)
  assert.ok(/hansen/i.test(dogSeed.quickSummary));
  assert.ok(dogSeed.quickDecisionStrip.some((s) => /ACVIM 2022/i.test(s) && /48h/i.test(s)));
  assert.ok(dogSeed.quickDecisionStrip.some((s) => /NOCICEPÇÃO PROFUNDA/i.test(s) && /REFLEXO DE RETIRADA/i.test(s)));
  assert.ok(dogSeed.quickDecisionStrip.some((s) => /12-FGF4RG|CDDY/i.test(s)));
  assert.ok(dogSeed.quickDecisionStrip.some((s) => /CORTICOIDES NÃO SÃO NEUROPROETORES|CORTICOIDES/i.test(s)));

  // Validação de referências (ACVIM 2022, VIN 2023, Brown 2017, Bach 2022)
  const refIds = dogSeed.references.map((r) => r.id);
  assert.ok(refIds.includes('ref-vin-ivdd-dog-2023'), 'Deve incluir VIN Canino 2023');
  assert.ok(refIds.includes('ref-acvim-consensus-ivde-2022'), 'Deve incluir Consenso ACVIM 2022');
  assert.ok(refIds.includes('ref-brown-fgf4-pnas-2017'), 'Deve incluir estudo genético FGF4 Brown 2017');
  assert.ok(refIds.includes('ref-bach-ventral-slot-2022'), 'Deve incluir Bach Ventral Slot 2022');
});

test('Doença do Disco Intervertebral (DDIV) — Gatos — Contrato estrutural e conteúdo científico', () => {
  const catSeed = diseasesSeed.find((d) => d.slug === 'doenca-do-disco-intervertebral-gatos');
  assert.ok(catSeed, 'DDIV Felina deve existir em diseasesSeed');
  assert.equal(catSeed.title, 'Doença do Disco Intervertebral — Gatos');
  assert.deepEqual(catSeed.species, ['cat']);
  assert.equal(catSeed.category, 'neurologia');

  // Catálogo público e stubs
  assert.ok((CONSULTA_VET_PUBLIC_DISEASE_SLUGS as readonly string[]).includes('doenca-do-disco-intervertebral-gatos'));
  const stub = PUBLIC_CATALOG_DISEASE_CARD_STUBS.find((s) => s.slug === 'doenca-do-disco-intervertebral-gatos');
  assert.ok(stub, 'Stub de DDIV Felina deve existir');
  assert.equal(stub.title, catSeed.title);

  // Linguagem simples
  assert.ok(DISEASE_PLAIN_LANGUAGE['doenca-do-disco-intervertebral-gatos']);

  // Conteúdo científico felino (Alerta de não extrapolar ACVIM, Mimetizadores Linfoma/PIF, Gabapentina)
  assert.ok(/gatos|felinos/i.test(catSeed.quickSummary));
  assert.ok(catSeed.quickDecisionStrip.some((s) => /NÃO EXTRAPOLAR/i.test(s) && /ACVIM/i.test(s)));
  assert.ok(catSeed.quickDecisionStrip.some((s) => /Linfoma|PIF/i.test(s)));
  assert.ok(catSeed.quickDecisionStrip.some((s) => /GABAPENTINA/i.test(s)));

  // Referências felinas (VIN Feline 2023, Fowler 2022, De Decker 2017)
  const refIds = catSeed.references.map((r) => r.id);
  assert.ok(refIds.includes('ref-vin-ivdd-cat-2023'), 'Deve incluir VIN Felino 2023');
  assert.ok(refIds.includes('ref-fowler-feline-ivdd-2022'), 'Deve incluir estudo Fowler JFMS 2022');
  assert.ok(refIds.includes('ref-dedecker-feline-predisposition-2017'), 'Deve incluir De Decker 2017');
});
