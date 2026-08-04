import assert from 'node:assert/strict'
import test from 'node:test'
import {
  getSupplementCatalogStats,
  getSupplementProducts,
  searchSupplementCatalog,
  assertPremixPrescriptionAllowed,
} from '../../modules/energia-vet/lib/supplementCatalog/catalogService'
import {
  canActivateFromSourceTier,
  inferMedicineStatusFromName,
  isInjectableDosageForm,
  isPremixProduct,
  isTopicalProduct,
  missingNutrientToNull,
  resolveCatalogEligibility,
} from '../../modules/energia-vet/lib/supplementCatalog/regulatoryValidation'
import { evaluateSupplementPrescription } from '../../modules/energia-vet/lib/supplementCatalog/prescriptionGuard'
import {
  clearNutritionFeatureOverrides,
  isNutritionFeatureEnabled,
  setNutritionFeatureOverride,
} from '../../modules/energia-vet/lib/featureFlags'
import { legacyGenutriCatalogAdapter } from '../../modules/energia-vet/lib/catalog'
import { filterFoods } from '../../modules/energia-vet/lib/genutriData'

test.afterEach(() => {
  clearNutritionFeatureOverrides()
})

test('feature flag nutrition_supplement_catalog desligada por padrão', () => {
  assert.equal(isNutritionFeatureEnabled('nutrition_supplement_catalog'), false)
})

test('feature flag supplement catalog pode ser ligada em runtime', () => {
  setNutritionFeatureOverride('nutrition_supplement_catalog', true)
  assert.equal(isNutritionFeatureEnabled('nutrition_supplement_catalog'), true)
})

test('medicamentos não entram como elegíveis', () => {
  const status = inferMedicineStatusFromName('Antibiótico Vet Plus')
  const eligibility = resolveCatalogEligibility({ medicineStatus: status, slug: 'antibiotico-vet-plus' })
  assert.equal(status, 'possible_medicine')
  assert.equal(eligibility, 'staging_only')
})

test('produtos incertos permanecem em staging', () => {
  const unknown = getSupplementProducts().filter((p) => p.medicineStatus === 'unknown')
  assert.ok(unknown.length > 0)
  assert.ok(unknown.every((p) => p.catalogEligibility !== 'eligible'))
})

test('produtos tópicos detectados pelo nome', () => {
  assert.equal(isTopicalProduct('Shampoo Derm Pet'), true)
  assert.equal(isTopicalProduct('Condroplex 500'), false)
})

test('formas injetáveis bloqueadas', () => {
  assert.equal(isInjectableDosageForm('solução injetável'), true)
  assert.equal(isInjectableDosageForm('comprimido'), false)
})

test('premixes não podem ser prescritos isoladamente', () => {
  const premix = getSupplementProducts().find((p) => p.productClass === 'premix_balanceador')
  assert.ok(premix)
  assert.ok(isPremixProduct(premix!.productClass))
  const guard = evaluateSupplementPrescription(premix!)
  assert.equal(guard.allowed, false)
  assert.ok(assertPremixPrescriptionAllowed(premix!))
})

test('leite substituto não é multivitamínico genérico', () => {
  const milk = getSupplementProducts().find((p) => p.commercialName === 'Pet Milk')
  assert.ok(milk)
  assert.equal(milk!.productClass, 'substituto_do_leite')
  assert.notEqual(milk!.primaryCategory, 'vitaminas_e_minerais')
})

test('ausência de nutriente não vira zero', () => {
  assert.equal(missingNutrientToNull(undefined), null)
  assert.equal(missingNutrientToNull(null), null)
  assert.equal(missingNutrientToNull(Number.NaN), null)
  assert.equal(missingNutrientToNull(12.5), 12.5)
})

test('marketplace não libera produto clinicamente', () => {
  assert.equal(canActivateFromSourceTier('F_MARKETPLACE_DISCOVERY'), false)
  assert.equal(canActivateFromSourceTier('A_OFFICIAL_LABEL'), true)
})

test('suplemento canino/gato respeita espécie no filtro', () => {
  const dogPremix = searchSupplementCatalog({ manufacturerSlug: 'botupharma', species: 'cat' })
  assert.ok(dogPremix.items.every((p) => p.species.includes('cat')))
})

test('prescrição bloqueada para staging e unknown', () => {
  const staging = getSupplementProducts().find((p) => p.catalogEligibility === 'staging_only')
  assert.ok(staging)
  const guard = evaluateSupplementPrescription(staging!)
  assert.equal(guard.allowed, false)
  assert.ok(guard.reasons.length > 0)
})

test('catálogo seed contém fabricantes prioritários fase 2', () => {
  const stats = getSupplementCatalogStats()
  assert.ok(stats.manufacturers >= 18)
  assert.ok(stats.productsTotal >= 150)
  assert.ok(stats.productsStaging > 0)
})

test('modo legado permanece com flag supplement desligada', async () => {
  assert.equal(isNutritionFeatureEnabled('nutrition_supplement_catalog'), false)
  const legacy = await legacyGenutriCatalogAdapter.search({})
  assert.equal(legacy.source, 'legacy_genutri')
  assert.equal(legacy.total, filterFoods({}).length)
})

test('SKUs distintos por produto no seed', () => {
  const stats = getSupplementCatalogStats()
  assert.equal(stats.skus, stats.productsTotal)
})

test('produtos Happy Med ficam sem recomendação clínica', () => {
  const happy = getSupplementProducts().filter((p) => p.manufacturerSlug === 'happy-med')
  assert.ok(happy.length > 0)
  assert.ok(happy.every((p) => p.clinicalRecommendationEnabled === false))
  assert.ok(happy.every((p) => p.requiresSixMonthReaudit === true))
})

test('FortiFlora permanece importado pendente', () => {
  const fortiflora = getSupplementProducts().filter((p) => p.manufacturerSlug === 'purina-fortiflora')
  assert.ok(fortiflora.length >= 2)
  assert.ok(fortiflora.every((p) => p.marketStatus === 'imported_pending_confirmation'))
})
