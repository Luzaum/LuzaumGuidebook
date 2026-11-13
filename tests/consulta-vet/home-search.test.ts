import assert from 'node:assert/strict';
import test from 'node:test';
import { localConsensoRepository } from '../../modules/consulta-vet/services/adapters/local/localConsensoRepository';
import { localDiseaseRepository } from '../../modules/consulta-vet/services/adapters/local/localDiseaseRepository';
import { localMedicationRepository } from '../../modules/consulta-vet/services/adapters/local/localMedicationRepository';
import { filterAndRankCommercialProducts } from '../../modules/consulta-vet/services/commercialCatalogSearch';
import {
  homeNavigationIndex,
  indexClinicalSearch,
  loadAdditionalHomeSearchIndex,
  searchHomeIndex,
} from '../../modules/consulta-vet/services/homeSearch';

test('a busca inicial encontra conteúdo dos catálogos clínicos, guias, mini-apps e comerciais', async () => {
  const [diseases, medications, consensos, additional] = await Promise.all([
    localDiseaseRepository.list(),
    localMedicationRepository.list(),
    localConsensoRepository.list(),
    loadAdditionalHomeSearchIndex(),
  ]);
  assert.equal(additional.partial, false);
  const index = [...homeNavigationIndex, ...indexClinicalSearch({ diseases, medications, consensos }), ...additional.entries];
  const search = (query: string) => searchHomeIndex(index, query);

  assert.equal(search('but')[0]?.to, '/consulta-vet/medicamentos/butorfanol');
  assert.equal(search('butorfnol')[0]?.to, '/consulta-vet/medicamentos/butorfanol');
  assert.ok(search('torbugesic').some((result) => result.to.endsWith('/medicamentos/butorfanol')));
  assert.ok(search('CAD').some((result) => result.to === '/consulta-vet/manejo-emergencial/cetoacidose-diabetica'));
  assert.equal(search('incisional biopsia')[0]?.to, '/consulta-vet/guias-rapidos/biopsia-incisional-caes-gatos');
  assert.equal(search('transfusao sanguinea')[0]?.to, '/transfusao-sanguinea');
  assert.equal(search('ARDS')[0]?.to, '/consulta-vet/referencias-rapidas/sara');
  assert.ok(search('leishmaniose visceral canina').some((result) => result.section === 'Doença'));
  assert.ok(search('leishmaniose visceral canina').some((result) => result.section === 'Consenso'));

  const commercial = search('cerenia').find((result) => result.section === 'Comercial');
  assert.ok(commercial);
  const commercialQuery = new URL(commercial.to, 'https://vetius.test').searchParams.get('q');
  const { commercialOticProductsSeed } = await import('../../modules/consulta-vet/data/commercialOticProducts.seed');
  assert.ok(filterAndRankCommercialProducts(commercialOticProductsSeed, commercialQuery ?? '')
    .some((product) => product.name === commercial.title));

  assert.deepEqual(search('   '), []);
  assert.deepEqual(search('zzqxxwvz'), []);
});
