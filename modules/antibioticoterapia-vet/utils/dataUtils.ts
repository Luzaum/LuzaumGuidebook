
import { Antibiotic, AntibioticClass, Disease, DiseaseSystem } from '../types';
import { canonicalDrugName, canonicalDiseaseName } from './textUtils';

export const safeList = <T,>(v: T[] | undefined, fb: T[] = []): T[] => Array.isArray(v) ? v : fb;

const mergeTextPref = (a: string | undefined, b: string | undefined): string => {
  const strA = String(a || '').trim();
  const strB = String(b || '').trim();
  return strB.length > strA.length ? strB : strA;
}

// Deduplicates a list of drug names, respecting aliases.
export const uniqDrugList = (arr: string[]): string[] => {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const s of arr || []) {
    const key = canonicalDrugName(s);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(s);
  }
  return out;
};

// Merges and deduplicates antibiotic dictionaries.
export function dedupeABDict(dict: AntibioticClass): AntibioticClass {
  const map = new Map<string, { cls: string, data: Antibiotic }>();
  for (const cls of Object.keys(dict || {})) {
    for (const d of dict[cls] || []) {
      const key = canonicalDrugName(d.name);
      if (!key) continue;
      const prev = map.get(key);
      const merged = prev ? {
        cls: prev.cls || cls,
        data: {
          name: (prev.data.name || '').length >= (d.name || '').length ? prev.data.name : d.name,
          spectrum: mergeTextPref(prev.data.spectrum, d.spectrum),
          dose_dog: mergeTextPref(prev.data.dose_dog, d.dose_dog),
          dose_cat: mergeTextPref(prev.data.dose_cat, d.dose_cat),
          indications: mergeTextPref(prev.data.indications, d.indications),
          cautions: mergeTextPref(prev.data.cautions, d.cautions),
          mechanism: mergeTextPref(prev.data.mechanism, d.mechanism),
          prep_admin: mergeTextPref(prev.data.prep_admin, d.prep_admin),
          infusion: mergeTextPref(prev.data.infusion, d.infusion),
          infusion_why: mergeTextPref(prev.data.infusion_why, d.infusion_why),
          duration: mergeTextPref(prev.data.duration, d.duration),
          contraindications: mergeTextPref(prev.data.contraindications, d.contraindications),
          adverse_effects: mergeTextPref(prev.data.adverse_effects, d.adverse_effects)
        }
      } : { cls, data: { ...d } };
      map.set(key, merged);
    }
  }
  const out: AntibioticClass = {};
  for (const { cls, data } of map.values()) {
    out[cls] = out[cls] || [];
    out[cls].push(data);
  }
  for (const k of Object.keys(out)) {
    out[k].sort((a, b) => a.name.localeCompare(b.name, 'pt'));
  }
  return out;
}

// Merges and deduplicates disease dictionaries.
export function dedupeDZDict(dict: DiseaseSystem): DiseaseSystem {
  const map = new Map<string, { sys: string, data: Disease }>();
  for (const sys of Object.keys(dict || {})) {
    for (const dz of dict[sys] || []) {
      const key = canonicalDiseaseName(dz.name);
      if (!key) continue;
      const prev = map.get(key);
      if (!prev) {
        map.set(key, { sys, data: { ...dz, first_line: uniqDrugList(dz.first_line), alternatives: uniqDrugList(dz.alternatives) } });
      } else {
        const score = (o: object) => JSON.stringify(o || '').length;
        const keepPrev = score(prev.data) >= score(dz);
        const base = keepPrev ? prev.data : dz;
        const other = keepPrev ? dz : prev.data;
        const merged: Disease = {
          name: base.name,
          pathogens: mergeTextPref(base.pathogens, other.pathogens),
          first_line: uniqDrugList([...safeList(base.first_line), ...safeList(other.first_line)]),
          alternatives: uniqDrugList([...safeList(base.alternatives), ...safeList(other.alternatives)]),
          duration: mergeTextPref(base.duration, other.duration),
          notes: mergeTextPref(base.notes, other.notes)
        };
        map.set(key, { sys: keepPrev ? prev.sys : sys, data: merged });
      }
    }
  }
  const out: DiseaseSystem = {};
  for (const { sys, data } of map.values()) {
    out[sys] = out[sys] || [];
    out[sys].push(data);
  }
  for (const k of Object.keys(out)) {
    out[k].sort((a, b) => a.name.localeCompare(b.name, 'pt'));
  }
  return out;
}
