/**
 * Master Sync & Enrichment Script — Auditoria NutriçãoVET 2026-09-07
 * Executa a atualização integral de genutri-dataset.json e commercialDietMedia.seed.ts
 */

import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

const projectRoot = 'c:/Users/luzau/OneDrive/Documentos/GitHub/LuzaumGuidebook';

// Import audit modules
const { QUATREE_AUDIT } = await import(pathToFileURL(path.join(projectRoot, 'scripts/data/audit-quatree.mjs')).href);
const { PREMIER_AUDIT } = await import(pathToFileURL(path.join(projectRoot, 'scripts/data/audit-premier.mjs')).href);
const { GUABI_AUDIT } = await import(pathToFileURL(path.join(projectRoot, 'scripts/data/audit-guabi.mjs')).href);
const { FARMINA_AUDIT } = await import(pathToFileURL(path.join(projectRoot, 'scripts/data/audit-farmina.mjs')).href);
const { PURINA_AUDIT } = await import(pathToFileURL(path.join(projectRoot, 'scripts/data/audit-purina.mjs')).href);
const { OTHER_AND_HILLS_AUDIT } = await import(pathToFileURL(path.join(projectRoot, 'scripts/data/audit-other-and-hills.mjs')).href);
const { ROYAL_CANIN_AUDITED_MAINTENANCE, ROYAL_CANIN_NEW_SKUS } = await import(pathToFileURL(path.join(projectRoot, 'scripts/data/audit-royal-canin.mjs')).href);
const { BRAZILIAN_INGREDIENTS_AUDIT } = await import(pathToFileURL(path.join(projectRoot, 'scripts/data/audit-brazilian-ingredients.mjs')).href);

// Load image manifest
const manifestPath = path.join(projectRoot, 'scripts/data/image-manifest.json');
const manifest = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, 'utf8')) : {};

// Load genutri dataset
const datasetPath = path.join(projectRoot, 'modules/energia-vet/data/genutri-dataset.json');
const dataset = JSON.parse(fs.readFileSync(datasetPath, 'utf8'));

console.log('Original foods in dataset:', dataset.foods.length);

function r6(v) {
  if (v == null || typeof v !== 'number' || Number.isNaN(v)) return v;
  return Math.round(v * 1e6) / 1e6;
}

const auditMap = new Map();
for (const p of [
  ...QUATREE_AUDIT,
  ...PREMIER_AUDIT,
  ...GUABI_AUDIT,
  ...FARMINA_AUDIT,
  ...PURINA_AUDIT,
  ...OTHER_AND_HILLS_AUDIT,
  ...ROYAL_CANIN_AUDITED_MAINTENANCE
]) {
  auditMap.set(p.id, p);
}

const brIngredientsMap = new Map();
for (const ing of BRAZILIAN_INGREDIENTS_AUDIT) {
  brIngredientsMap.set(ing.id, ing);
}

let commercialAuditedUpdated = 0;
let brIngredientsUpdated = 0;

for (const food of dataset.foods) {
  if (auditMap.has(food.id)) {
    const audit = auditMap.get(food.id);
    commercialAuditedUpdated++;

    food.name = audit.canonicalName || food.name;
    food.dietClass = audit.dietClass;
    food.productStatus = audit.productStatus || 'active';
    food.clinicalUseStatus = audit.productStatus === 'consolidated_alias' ? 'consolidated_alias' : 'active';
    food.isCompleteAndBalanced = audit.isCompleteAndBalanced ?? (audit.dietClass === 'maintenance' || audit.dietClass === 'therapeutic');
    food.productionLicenseOk = true;
    food.brand = audit.brand || food.brand;
    food.manufacturer = audit.manufacturer || food.manufacturer;
    food.officialSourceUrl = audit.productUrl || food.officialSourceUrl;
    food.productUrl = audit.productUrl || food.productUrl;
    if (audit.speciesScope && audit.speciesScope !== 'unknown') {
      food.speciesScope = audit.speciesScope;
    }

    if (audit.aliases) {
      food.aliases = Array.from(new Set([...(food.aliases || []), ...audit.aliases]));
    }
    if (audit.canonicalTargetId) {
      food.canonicalTargetId = audit.canonicalTargetId;
    }

    const imgEntry = manifest[food.id] || (food.id === 'guabi-natural-racao-caes-adulto-medio-cordeiro-aveia' ? manifest['racao-guabi-natural-cao-adulto-medio-cordeiro-aveia'] : null);
    if (imgEntry) {
      food.photoUrl = imgEntry.localAssetPath;
      food.imageUrl = imgEntry.localAssetPath;
    }

    if (food.id.includes('anallergenic')) {
      food.dietClass = 'therapeutic';
      food.isTherapeutic = true;
      food.therapeuticIndications = ['ALLERGY'];
      food.notes = (food.notes || []).filter(n => !n.includes('isTherapeutic'));
      food.notes.push('diet_class=therapeutic', 'isTherapeutic=true', 'therapeutic_indication=ALLERGY');
    }

    if (audit.guaranteed) {
      const g = audit.guaranteed;
      const moisturePct = g.moistureMax ?? food.nutrientsAsFed?.moisturePct ?? 10;
      const crudeProteinPct = g.proteinMin ?? food.nutrientsAsFed?.crudeProteinPct ?? null;
      const etherExtractPct = g.fatMin ?? food.nutrientsAsFed?.etherExtractPct ?? null;
      const crudeFiberPct = g.fiberMax ?? food.nutrientsAsFed?.crudeFiberPct ?? null;
      const ashPct = g.ashMax ?? food.nutrientsAsFed?.ashPct ?? null;
      const calciumPct = g.calciumMin ?? food.nutrientsAsFed?.calciumPct ?? null;
      const phosphorusPct = g.phosphorusMin ?? food.nutrientsAsFed?.phosphorusPct ?? null;
      const energyKcalPer100g = g.energyKcalKg != null ? r6(g.energyKcalKg / 10) : food.nutrientsAsFed?.energyKcalPer100g ?? null;

      let nfe = null;
      if (moisturePct != null && crudeProteinPct != null && etherExtractPct != null) {
        const sum = moisturePct + crudeProteinPct + etherExtractPct + (ashPct ?? 0) + (crudeFiberPct ?? 0);
        if (sum < 100) nfe = r6(100 - sum);
      }

      food.nutrientsAsFed = {
        ...(food.nutrientsAsFed || {}),
        moisturePct,
        dryMatterPct: r6(100 - moisturePct),
        crudeProteinPct,
        etherExtractPct,
        crudeFiberPct,
        ashPct,
        nitrogenFreeExtractPct: nfe ?? food.nutrientsAsFed?.nitrogenFreeExtractPct ?? null,
        calciumPct,
        phosphorusPct,
        energyKcalPer100g
      };

      const dmFactor = 100 / (100 - moisturePct);
      const dm = { ...(food.nutrientsDryMatter || {}) };
      dm.moisturePct = 0;
      dm.dryMatterPct = 100;
      for (const [k, v] of Object.entries(food.nutrientsAsFed)) {
        if (k === 'moisturePct' || k === 'dryMatterPct') continue;
        dm[k] = v == null ? null : r6(v * dmFactor);
      }
      food.nutrientsDryMatter = dm;
      food.dataOrigin = 'label_guarantee';
      food.dryMatterDerivation = 'calculated';
    }

    const extraNotes = [
      'diet_class=' + food.dietClass,
      'is_complete_and_balanced=' + food.isCompleteAndBalanced,
      'audited_reference_date=2026-09-07',
      ...(audit.notes || [])
    ];
    food.notes = Array.from(new Set([...(food.notes || []), ...extraNotes]));
  }

  if (brIngredientsMap.has(food.id)) {
    const ing = brIngredientsMap.get(food.id);
    brIngredientsUpdated++;

    food.name = ing.canonicalName || food.name;
    food.scientificName = ing.scientificName;
    food.clinicalUseStatus = ing.clinicalUseStatus;
    food.productionLicenseOk = ing.productionLicenseOk;
    food.licenseType = ing.licenseType;

    if (ing.sourceReference) {
      food.sourceReference = ing.sourceReference;
    }

    if (ing.nutrientsAsFed) {
      food.nutrientsAsFed = { ...(food.nutrientsAsFed || {}), ...ing.nutrientsAsFed };
      const dmFactor = 100 / (100 - ing.nutrientsAsFed.moisturePct);
      const dm = { ...(food.nutrientsDryMatter || {}) };
      dm.moisturePct = 0;
      dm.dryMatterPct = 100;
      for (const [k, v] of Object.entries(food.nutrientsAsFed)) {
        if (k === 'moisturePct' || k === 'dryMatterPct') continue;
        dm[k] = v == null ? null : r6(v * dmFactor);
      }
      food.nutrientsDryMatter = dm;
      food.dataOrigin = 'scielo_open_access_souza_2010';
      food.dryMatterDerivation = 'calculated';
    }

    food.notes = (food.notes || []).filter(
      n => !n.startsWith('clinical_use_status=') && !n.startsWith('production_license_ok=') && !n.startsWith('source_type=')
    );
    food.notes.push(
      'source_type=' + (ing.sourceType || 'BRAZILIAN_COMPOSITION_REQUIRED'),
      'clinical_use_status=' + ing.clinicalUseStatus,
      'production_license_ok=' + ing.productionLicenseOk,
      'audited_reference_date=2026-09-07',
      ...(ing.notes || [])
    );
    food.notes = Array.from(new Set(food.notes));
  }
}

let newSkusAdded = 0;
for (const sku of ROYAL_CANIN_NEW_SKUS) {
  if (!dataset.foods.some(f => f.id === sku.id)) {
    dataset.foods.push({
      id: sku.id,
      slug: sku.id,
      name: sku.canonicalName,
      category: sku.category,
      categoryNormalized: sku.category,
      sourceSheet: 'Alimentos MN',
      sourceReference: {
        workbook: 'Royal Canin Brasil — Snapshot Oficial 2026-09-05',
        mnRow: 0,
        msRow: null
      },
      speciesScope: sku.speciesScope,
      foodType: 'commercial',
      dietClass: 'maintenance',
      clinicalUseStatus: 'blocked_pending_exact_sku',
      productStatus: 'newly_added_pending_data',
      isCompleteAndBalanced: false,
      productionLicenseOk: false,
      presentation: sku.presentation,
      brand: 'Royal Canin',
      manufacturer: 'Royal Canin',
      officialSourceUrl: sku.sourceUrl,
      productUrl: sku.sourceUrl,
      photoUrl: manifest[sku.id]?.localAssetPath || sku.imageUrl,
      imageUrl: manifest[sku.id]?.localAssetPath || sku.imageUrl,
      nutrientsAsFed: {
        moisturePct: null,
        dryMatterPct: null,
        energyKcalPer100g: null,
        crudeProteinPct: null,
        etherExtractPct: null,
        ashPct: null,
        crudeFiberPct: null,
        nitrogenFreeExtractPct: null,
        calciumPct: null,
        phosphorusPct: null
      },
      nutrientsDryMatter: {
        moisturePct: 0,
        dryMatterPct: 100,
        energyKcalPer100g: null,
        crudeProteinPct: null,
        etherExtractPct: null,
        ashPct: null,
        crudeFiberPct: null,
        nitrogenFreeExtractPct: null,
        calciumPct: null,
        phosphorusPct: null
      },
      missingNutrients: [
        'moisturePct', 'crudeProteinPct', 'etherExtractPct', 'ashPct', 'crudeFiberPct',
        'calciumPct', 'phosphorusPct', 'energyKcalPer100g'
      ],
      notes: sku.notes
    });
    newSkusAdded++;
  }
}

console.log('Audited commercial items updated:', commercialAuditedUpdated);
console.log('Brazilian ingredients updated:', brIngredientsUpdated);
console.log('New Royal Canin SKUs added:', newSkusAdded);
console.log('Total foods in dataset now:', dataset.foods.length);

fs.writeFileSync(datasetPath, JSON.stringify(dataset, null, 2), 'utf8');
console.log('genutri-dataset.json written successfully.');

const mediaSeedPath = path.join(projectRoot, 'modules/energia-vet/data/commercialDietMedia.seed.ts');
let mediaSeedTxt = fs.readFileSync(mediaSeedPath, 'utf8');

const regex = /"([^"]+)":\s*\{\s*brand:\s*([^,]+),\s*imageUrl:\s*([^,]+),\s*productUrl:\s*([^,]+),\s*alt:\s*([^,]+),\s*verified:\s*([^,\s}]+),?\s*\}/g;
const mediaMap = new Map();
let match;
while ((match = regex.exec(mediaSeedTxt)) !== null) {
  mediaMap.set(match[1], {
    brand: match[2].trim(),
    imageUrl: match[3].trim(),
    productUrl: match[4].trim(),
    alt: match[5].trim(),
    verified: match[6].trim()
  });
}

for (const [id, m] of Object.entries(manifest)) {
  const audit = auditMap.get(id) || ROYAL_CANIN_NEW_SKUS.find(s => s.id === id);
  mediaMap.set(id, {
    brand: JSON.stringify(m.brand || audit?.brand || 'Comercial'),
    imageUrl: JSON.stringify(m.localAssetPath),
    productUrl: JSON.stringify(audit?.productUrl || audit?.sourceUrl || 'https://consultavet.com.br'),
    alt: JSON.stringify(m.name || audit?.canonicalName || id),
    verified: 'true'
  });
}

let out = `export interface CommercialDietMedia {
  imageUrl: string
  productUrl: string
  brand: string
  alt: string
  verified: boolean
}

/**
 * Mapeamento curado de mídia e links oficiais de fabricantes para rações comerciais.
 */
export const COMMERCIAL_DIET_MEDIA_SEED: Record<string, CommercialDietMedia> = {
`;

for (const [k, v] of mediaMap.entries()) {
  out += `  "${k}": {\n`;
  out += `    brand: ${v.brand},\n`;
  out += `    imageUrl: ${v.imageUrl},\n`;
  out += `    productUrl: ${v.productUrl},\n`;
  out += `    alt: ${v.alt},\n`;
  out += `    verified: ${v.verified},\n`;
  out += `  },\n`;
}
out += `};\n`;

fs.writeFileSync(mediaSeedPath, out, 'utf8');
console.log('commercialDietMedia.seed.ts updated successfully with unique media entries.');

console.log('Master sync complete!');