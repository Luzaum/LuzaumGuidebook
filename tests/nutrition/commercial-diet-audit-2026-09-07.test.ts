import assert from 'node:assert/strict'
import test from 'node:test'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { getFoodById, filterFoods } from '../../modules/energia-vet/lib/genutriData'
import { isFoodCatalogHidden } from '../../modules/energia-vet/lib/catalogVisibility'

// Listas da auditoria
import { QUATREE_AUDIT } from '../../scripts/data/audit-quatree.mjs'
import { PREMIER_AUDIT } from '../../scripts/data/audit-premier.mjs'
import { GUABI_AUDIT } from '../../scripts/data/audit-guabi.mjs'
import { FARMINA_AUDIT } from '../../scripts/data/audit-farmina.mjs'
import { PURINA_AUDIT } from '../../scripts/data/audit-purina.mjs'
import { OTHER_AND_HILLS_AUDIT } from '../../scripts/data/audit-other-and-hills.mjs'
import { ROYAL_CANIN_AUDITED_MAINTENANCE, ROYAL_CANIN_NEW_SKUS } from '../../scripts/data/audit-royal-canin.mjs'
import { BRAZILIAN_INGREDIENTS_AUDIT } from '../../scripts/data/audit-brazilian-ingredients.mjs'

const ALL_COMMERCIAL_AUDIT = [
  ...QUATREE_AUDIT,
  ...PREMIER_AUDIT,
  ...GUABI_AUDIT,
  ...FARMINA_AUDIT,
  ...PURINA_AUDIT,
  ...OTHER_AND_HILLS_AUDIT,
  ...ROYAL_CANIN_AUDITED_MAINTENANCE,
]

test('Auditoria 2026-09-07 — Todos os 211 produtos comerciais auditados existem no dataset', () => {
  for (const item of ALL_COMMERCIAL_AUDIT) {
    const food = getFoodById(item.id)
    assert.ok(food, `Alimento comercial ${item.id} não encontrado no dataset`)
    assert.equal(food.brand, item.brand, `Marca divergente para ${item.id}`)
  }
})

test('Regra Comercial 1 & 2 — Formato de ID kebab-case e nome canônico estruturado', () => {
  const KEBAB_REGEX = /^[a-z0-9]+(-[a-z0-9]+)*$/
  for (const item of ALL_COMMERCIAL_AUDIT) {
    assert.match(item.id, KEBAB_REGEX, `ID ${item.id} não está em kebab-case`)
    assert.ok(item.canonicalName.length >= 5, `Nome canônico muito curto para ${item.id}`)
    assert.ok(
      item.canonicalName.includes('—') || item.canonicalName.includes('-') || item.canonicalName.includes(item.brand),
      `Nome canônico não estruturado para ${item.id}: ${item.canonicalName}`,
    )
  }
})

test('Regra Comercial 3 & 4 — Classificação dietética e completude nutricional consistentes', () => {
  const VALID_DIET_CLASSES = new Set(['maintenance', 'therapeutic', 'supplemental', 'treat'])
  for (const item of ALL_COMMERCIAL_AUDIT) {
    const food = getFoodById(item.id)!
    assert.ok(VALID_DIET_CLASSES.has(food.dietClass), `dietClass inválida em ${food.id}: ${food.dietClass}`)

    if (food.dietClass === 'maintenance' || food.dietClass === 'therapeutic') {
      assert.equal(food.isCompleteAndBalanced, true, `Alimento completo ${food.id} deve ter isCompleteAndBalanced=true`)
    } else {
      assert.equal(
        food.isCompleteAndBalanced,
        false,
        `Alimento complementar/petisco ${food.id} deve ter isCompleteAndBalanced=false`,
      )
    }
  }
})

test('Regra Comercial 5 — Alimentos terapêuticos possuem isTherapeutic=true e indicações', () => {
  for (const item of ALL_COMMERCIAL_AUDIT) {
    const food = getFoodById(item.id)!
    if (food.dietClass === 'therapeutic') {
      assert.equal(food.isTherapeutic, true, `Alimento terapêutico ${food.id} deve ter isTherapeutic=true`)
      assert.ok(
        Array.isArray(food.therapeuticIndications) && food.therapeuticIndications.length > 0,
        `Alimento terapêutico ${food.id} deve declarar indicações terapêuticas`,
      )
    }
  }
})

test('Regra Comercial 6 & 7 — speciesScope e apresentação válidos', () => {
  const VALID_SPECIES = new Set(['dog', 'cat', 'both'])
  for (const item of ALL_COMMERCIAL_AUDIT) {
    const food = getFoodById(item.id)!
    assert.ok(VALID_SPECIES.has(food.speciesScope), `speciesScope inválido em ${food.id}: ${food.speciesScope}`)
    assert.ok(typeof food.presentation === 'string' && food.presentation.length > 0, `presentation vazia em ${food.id}`)
  }
})

test('Regra Comercial 8 — Links oficiais válidos e sem protocolo inseguro desnecessário', () => {
  for (const item of ALL_COMMERCIAL_AUDIT) {
    if (item.productStatus === 'consolidated_alias') continue
    const food = getFoodById(item.id)!
    assert.ok(food.officialSourceUrl, `Falta officialSourceUrl em ${food.id}`)
    assert.match(food.officialSourceUrl, /^https?:\/\//, `officialSourceUrl inválida em ${food.id}`)
  }
})

test('Regra Comercial 9 — Imagens locais salvas e versionadas (sem hotlinks externos em produção)', () => {
  for (const item of ALL_COMMERCIAL_AUDIT) {
    if (item.productStatus === 'consolidated_alias') continue
    const food = getFoodById(item.id)!
    assert.ok(food.photoUrl || food.imageUrl, `Falta foto local em ${food.id}`)
    const relativeAssetPath = (food.photoUrl || food.imageUrl)!
    assert.ok(
      relativeAssetPath.startsWith('/assets/nutricao/commercial-diets/'),
      `Asset path não é local em ${food.id}: ${relativeAssetPath}`,
    )

    const diskPath = path.join(process.cwd(), 'public', relativeAssetPath)
    assert.ok(existsSync(diskPath), `Arquivo de imagem não existe no disco: ${diskPath}`)
  }
})

test('Regra Comercial 10 & 11 — Aliases e consolidação de duplicatas coerentes', () => {
  for (const item of ALL_COMMERCIAL_AUDIT) {
    if (item.productStatus === 'consolidated_alias') {
      const food = getFoodById(item.id)!
      assert.equal(food.clinicalUseStatus, 'consolidated_alias')
      assert.ok(isFoodCatalogHidden(food), `Alias consolidado ${food.id} deve estar oculto na busca do catálogo`)
      assert.ok(item.canonicalTargetId, `Alias consolidado ${food.id} deve apontar para canonicalTargetId`)
      const target = getFoodById(item.canonicalTargetId!)
      assert.ok(target, `Target ${item.canonicalTargetId} do alias ${food.id} deve existir`)
    }
  }
})

test('Regras Nutricionais 1 a 5 — Umidade, PB, EE, Matéria Seca e limites biológicos', () => {
  for (const item of ALL_COMMERCIAL_AUDIT) {
    if (item.productStatus === 'consolidated_alias') continue
    const food = getFoodById(item.id)!
    const asFed = food.nutrientsAsFed

    assert.ok(asFed.moisturePct > 0 && asFed.moisturePct < 99, `Umidade fora de limites em ${food.id}`)
    assert.ok(
      Math.abs(asFed.moisturePct + asFed.dryMatterPct - 100) < 0.01,
      `Soma de umidade e MS != 100 em ${food.id}`,
    )

    if (food.isCompleteAndBalanced) {
      assert.ok(asFed.crudeProteinPct != null && asFed.crudeProteinPct > 0, `PB inválida em ${food.id}`)
      assert.ok(asFed.etherExtractPct != null && asFed.etherExtractPct > 0, `EE inválido em ${food.id}`)
    }

    if (asFed.ashPct != null) {
      assert.ok(asFed.ashPct >= 0 && asFed.ashPct <= 20, `Cinzas anormais em ${food.id}`)
    }
    if (asFed.crudeFiberPct != null) {
      assert.ok(asFed.crudeFiberPct >= 0 && asFed.crudeFiberPct <= 35, `Fibra bruta anormal em ${food.id}`)
    }
  }
})

test('Regras Nutricionais 6 & 7 — Conversão MS e coerência energética', () => {
  for (const item of ALL_COMMERCIAL_AUDIT) {
    if (item.productStatus === 'consolidated_alias') continue
    const food = getFoodById(item.id)!
    const asFed = food.nutrientsAsFed
    const dm = food.nutrientsDryMatter

    if (asFed.crudeProteinPct != null && dm.crudeProteinPct != null) {
      const expectedPbMs = (asFed.crudeProteinPct * 100) / asFed.dryMatterPct
      assert.ok(
        Math.abs(dm.crudeProteinPct - expectedPbMs) < 0.1,
        `Conversão PB MS divergente em ${food.id}: obtido ${dm.crudeProteinPct}, esperado ${expectedPbMs}`,
      )
    }

    if (asFed.energyKcalPer100g != null) {
      if (asFed.moisturePct <= 14) {
        assert.ok(
          asFed.energyKcalPer100g >= 250 && asFed.energyKcalPer100g <= 550,
          `Energia fora do padrão seco em ${food.id}: ${asFed.energyKcalPer100g} kcal/100g`,
        )
      } else {
        assert.ok(
          asFed.energyKcalPer100g >= 15 && asFed.energyKcalPer100g <= 250,
          `Energia fora do padrão úmido em ${food.id}: ${asFed.energyKcalPer100g} kcal/100g`,
        )
      }
    }
  }
})

test('Governança dos 17 Ingredientes Brasileiros — Licenças e Desbloqueio Científico', () => {
  assert.equal(BRAZILIAN_INGREDIENTS_AUDIT.length, 17)

  const active = BRAZILIAN_INGREDIENTS_AUDIT.filter((i) => i.clinicalUseStatus === 'active')
  const licenseReview = BRAZILIAN_INGREDIENTS_AUDIT.filter((i) => i.clinicalUseStatus === 'blocked_license_review')
  const pendingData = BRAZILIAN_INGREDIENTS_AUDIT.filter((i) => i.clinicalUseStatus === 'blocked_pending_data')

  assert.equal(active.length, 2, 'Devem existir exatamente 2 ingredientes desbloqueados via literatura aberta')
  assert.equal(licenseReview.length, 10, 'Devem existir 10 ingredientes bloqueados por revisão de licença TBCA')
  assert.equal(pendingData.length, 5, 'Devem existir 5 ingredientes mantidos como blocked_pending_data')

  for (const item of active) {
    const food = getFoodById(item.id)!
    assert.equal(food.clinicalUseStatus, 'active')
    assert.equal(food.productionLicenseOk, true)
    assert.ok(food.nutrientsAsFed.energyKcalPer100g != null && food.nutrientsAsFed.energyKcalPer100g > 0)
    assert.ok(food.notes.some((n) => n.includes('CC_BY_4.0')))
  }

  for (const item of licenseReview) {
    const food = getFoodById(item.id)!
    assert.equal(food.clinicalUseStatus, 'blocked_license_review')
    assert.equal(food.productionLicenseOk, false)
    assert.ok(isFoodCatalogHidden(food), `${food.id} deve estar oculto na busca do catálogo`)
    assert.ok(food.notes.some((n) => n.includes('TBCA_CC_BY_NC_ND_4.0')))
  }

  for (const item of pendingData) {
    const food = getFoodById(item.id)!
    assert.equal(food.clinicalUseStatus, 'blocked_pending_data')
    assert.equal(food.productionLicenseOk, false)
    assert.ok(isFoodCatalogHidden(food), `${food.id} deve estar oculto na busca do catálogo`)
  }
})

test('Conciliação Royal Canin 145 SKUs — Anallergenic, Novos SKUs e Bloqueio Preventivo', () => {
  const anallCanine = getFoodById('royal-canin-vet-anallergenic-canine-seco-2kg')
  if (anallCanine) {
    assert.equal(anallCanine.dietClass, 'therapeutic')
    assert.equal(anallCanine.isTherapeutic, true)
    assert.ok(anallCanine.therapeuticIndications.includes('ALLERGY'))
  }

  const anallFeline = getFoodById('royal-canin-vet-anallergenic-feline-seco-2kg')
  if (anallFeline) {
    assert.equal(anallFeline.dietClass, 'therapeutic')
    assert.equal(anallFeline.isTherapeutic, true)
    assert.ok(anallFeline.therapeuticIndications.includes('ALLERGY'))
  }

  assert.equal(ROYAL_CANIN_NEW_SKUS.length, 84)
  for (const sku of ROYAL_CANIN_NEW_SKUS) {
    const food = getFoodById(sku.id)!
    assert.ok(food, `SKU ${sku.id} não encontrado no dataset`)
    assert.equal(food.clinicalUseStatus, 'blocked_pending_exact_sku')
    assert.equal(food.productionLicenseOk, false)
    assert.ok(isFoodCatalogHidden(food), `SKU bloqueado preventivamente ${food.id} deve estar oculto`)
  }
})
