import { diseasesSeed } from '../modules/consulta-vet/data/seed/diseases.seed';

console.log(`Auditing all ${diseasesSeed.length} diseases in diseasesSeed...\n`);

interface DiseaseAudit {
  slug: string;
  title: string;
  category: string;
  species: string[];
  hasQuickSummaryRich: boolean;
  hasPlainLanguage: boolean;
  missingSections: string[];
  referenceCount: number;
  wordCountTotal: number;
  treatmentLength: number;
  diagnosisLength: number;
  qualityTier: 'gold' | 'silver' | 'bronze' | 'legacy';
}

const audits: DiseaseAudit[] = diseasesSeed.map((d) => {
  const missing: string[] = [];
  
  const checkSection = (name: string, val: any) => {
    if (!val) {
      missing.push(name);
      return 0;
    }
    if (typeof val === 'string') {
      if (val.trim().length === 0) missing.push(name);
      return val.length;
    }
    if (Array.isArray(val)) {
      if (val.length === 0) missing.push(name);
      return JSON.stringify(val).length;
    }
    if (typeof val === 'object') {
      const keys = Object.keys(val);
      if (keys.length === 0) missing.push(name);
      return JSON.stringify(val).length;
    }
    return 0;
  };

  checkSection('etiology', d.etiology);
  checkSection('epidemiology', d.epidemiology);
  checkSection('pathogenesisTransmission', d.pathogenesisTransmission);
  checkSection('pathophysiology', d.pathophysiology);
  checkSection('clinicalSignsPathophysiology', d.clinicalSignsPathophysiology);
  const diagLen = checkSection('diagnosis', d.diagnosis);
  const treatLen = checkSection('treatment', d.treatment);
  checkSection('complications', d.complications);
  checkSection('prevention', d.prevention);

  const totalStr = JSON.stringify(d);
  const wordCount = totalStr.split(/\s+/).length;

  const hasRich = !!(d.quickSummaryRich && d.quickSummaryRich.lead);
  const hasPlain = !!(d.plainLanguage && d.plainLanguage.whatIsIt);
  const refCount = d.references?.length ?? 0;

  let qualityTier: 'gold' | 'silver' | 'bronze' | 'legacy' = 'legacy';
  if (wordCount > 3500 && hasRich && refCount >= 5 && missing.length === 0) {
    qualityTier = 'gold';
  } else if (wordCount > 2000 && refCount >= 3 && missing.length <= 1) {
    qualityTier = 'silver';
  } else if (wordCount > 1000) {
    qualityTier = 'bronze';
  }

  return {
    slug: d.slug,
    title: d.title.slice(0, 30),
    category: d.category,
    species: d.species,
    hasQuickSummaryRich: hasRich,
    hasPlainLanguage: hasPlain,
    missingSections: missing,
    referenceCount: refCount,
    wordCountTotal: wordCount,
    treatmentLength: treatLen,
    diagnosisLength: diagLen,
    qualityTier,
  };
});

// Resumo por qualidade
const byTier = {
  gold: audits.filter((a) => a.qualityTier === 'gold'),
  silver: audits.filter((a) => a.qualityTier === 'silver'),
  bronze: audits.filter((a) => a.qualityTier === 'bronze'),
  legacy: audits.filter((a) => a.qualityTier === 'legacy'),
};

console.log(`TIER COUNTS:`);
console.log(`- Gold: ${byTier.gold.length}`);
console.log(`- Silver: ${byTier.silver.length}`);
console.log(`- Bronze: ${byTier.bronze.length}`);
console.log(`- Legacy: ${byTier.legacy.length}\n`);

console.log(`LEGACY / LOW CONTENT DISEASES (< 1500 words or missing critical sections):`);
for (const a of [...byTier.bronze, ...byTier.legacy]) {
  console.log(`- [${a.slug}] "${a.title}": ${a.wordCountTotal} words, missing: [${a.missingSections.join(', ')}], refs: ${a.referenceCount}, rich: ${a.hasQuickSummaryRich}`);
}

console.log(`\nDISEASES WITH MISSING SECTIONS:`);
const withMissing = audits.filter((a) => a.missingSections.length > 0);
for (const a of withMissing) {
  console.log(`- [${a.slug}]: missing [${a.missingSections.join(', ')}]`);
}

console.log(`\nDISEASES WITH < 3 REFERENCES:`);
const lowRefs = audits.filter((a) => a.referenceCount < 3);
for (const a of lowRefs) {
  console.log(`- [${a.slug}]: only ${a.referenceCount} references`);
}
