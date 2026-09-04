import assert from 'node:assert/strict'
import test from 'node:test'
import { getCatalogDatasetStats, legacyGenutriCatalogAdapter } from '../../modules/energia-vet/lib/catalog'
import { filterFoods } from '../../modules/energia-vet/lib/genutriData'
import { convertPercentMnToMs, normalizeNutrientValue } from '../../modules/energia-vet/lib/catalog/nutrientNormalizer'
import {
  clearNutritionFeatureOverrides,
  getNutritionFeatureFlags,
  isLegacyNutritionMode,
  isNutritionFeatureEnabled,
  setNutritionFeatureOverride,
} from '../../modules/energia-vet/lib/featureFlags'
import { ensureReportProvenance, migrateReportV4ToV5 } from '../../modules/energia-vet/lib/reportMigration'
import { REPORT_V4_SAMPLE } from './fixtures/report-v4-sample'

test.afterEach(() => {
  clearNutritionFeatureOverrides()
})

test('feature flags desligadas por padrão', () => {
  const flags = getNutritionFeatureFlags()
  assert.equal(flags.nutrition_catalog_v2, false)
  assert.equal(isLegacyNutritionMode(), true)
})

test('feature flag pode ser sobrescrita em runtime', () => {
  setNutritionFeatureOverride('nutrition_catalog_v2', true)
  assert.equal(isNutritionFeatureEnabled('nutrition_catalog_v2'), true)
  assert.equal(isLegacyNutritionMode(), false)
})

test('migração v4→v5 é idempotente e preserva payload', () => {
  const first = migrateReportV4ToV5(REPORT_V4_SAMPLE)
  assert.equal(first.provenance?.schemaVersion, 5)
  assert.equal(first.provenance?.sourceReportId, REPORT_V4_SAMPLE.id)
  assert.equal(first.patient.name, REPORT_V4_SAMPLE.patient.name)
  assert.equal(first.diet.targetEnergy, REPORT_V4_SAMPLE.diet.targetEnergy)

  const second = migrateReportV4ToV5(first)
  assert.deepEqual(second.provenance, first.provenance)
})

test('ensureReportProvenance não altera relatório já v5', () => {
  const migrated = ensureReportProvenance(migrateReportV4ToV5(REPORT_V4_SAMPLE))
  const again = ensureReportProvenance(migrated)
  assert.equal(again.provenance?.schemaVersion, 5)
})

test('catálogo legado retorna alimentos visíveis na busca', async () => {
  const visibleCount = filterFoods({}).length
  const result = await legacyGenutriCatalogAdapter.search({})
  assert.equal(result.total, visibleCount)
  assert.equal(result.source, 'legacy_genutri')
})

test('getCatalogDatasetStats reflete dataset real', () => {
  const stats = getCatalogDatasetStats()
  assert.equal(stats.foods, 618)
  assert.equal(stats.bySource.legacy_genutri, 618)
})

test('normalizer não converte ausente em zero', () => {
  assert.equal(normalizeNutrientValue(null), null)
  assert.equal(normalizeNutrientValue(undefined), null)
  assert.equal(normalizeNutrientValue(Number.NaN), null)
})

test('conversão MN→MS via normalizer', () => {
  const ms = convertPercentMnToMs(22, 90)
  assert.ok(ms != null)
  assert.ok(Math.abs(ms - 24.444444) < 0.001)
})
