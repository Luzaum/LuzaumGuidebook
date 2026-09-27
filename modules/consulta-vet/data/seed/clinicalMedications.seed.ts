import type { MedicationRecord } from '../../types/medication';
import { medicationsSeed as publicMedicationsSeed } from './medications.seed';
import { medicationsSeed as legacyClinicalMedicationsSeed } from './medications.seed.legacy-archive';

const SHARED_CLINICAL_REFERENCES: NonNullable<MedicationRecord['references']> = [
  {
    id: 'ref-bsava-10th',
    citationText: 'Allerton F, ed. BSAVA Small Animal Formulary, Part A: Canine and Feline. 10th ed. BSAVA; 2020.',
    sourceType: 'Formulário veterinário',
    evidenceLevel: 'Referência terciária especializada',
  },
  {
    id: 'ref-plumbs-10th',
    citationText: 'Budde JA, McCluskey DM. Plumb’s Veterinary Drug Handbook. 10th ed. VetMedux/Wiley-Blackwell; 2023.',
    sourceType: 'Formulário veterinário',
    url: 'https://search.worldcat.org/isbn/9781394172207',
    evidenceLevel: 'Referência terciária especializada',
  },
  {
    id: 'ref-lumb-jones-6th',
    citationText: 'Lamont L, Grimm K, Robertson S, et al., eds. Veterinary Anesthesia and Analgesia: The Sixth Edition of Lumb and Jones. Wiley; 2024.',
    sourceType: 'Livro-texto de anestesia',
    evidenceLevel: 'Referência terciária especializada',
  },
  {
    id: 'ref-nelson-couto-6th',
    citationText: 'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. Elsevier; 2020.',
    sourceType: 'Livro-texto de medicina interna',
    evidenceLevel: 'Referência terciária especializada',
  },
  {
    id: 'ref-talavera-2023',
    citationText: 'Talavera-López J, Sáez-Mengual O, Fernández-del-Palacio MJ. Comparative Study of Inhaled Fluticasone Versus Oral Prednisone in 30 Dogs with Cough and Tracheal Collapse. Vet Sci. 2023;10:548.',
    sourceType: 'Estudo comparativo',
    url: 'https://doi.org/10.3390/vetsci10090548',
    evidenceLevel: 'Evidência clínica publicada',
  },
  {
    id: 'ref-leemans-2010',
    citationText: 'Leemans J, Kirschvink N, Clercx C, et al. Functional response to inhaled salbutamol and/or ipratropium bromide in Ascaris suum-sensitised cats with allergen-induced bronchospasms. Vet J. 2010;186:76-83.',
    sourceType: 'Ensaio clínico felino',
    url: 'https://doi.org/10.1016/j.tvjl.2009.07.016',
    evidenceLevel: 'Evidência clínica publicada',
  },
  {
    id: 'ref-drobatz-2019',
    citationText: 'Drobatz KJ, Hopper K, Rozanski E, Silverstein DC, eds. Textbook of Small Animal Emergency Medicine. Wiley-Blackwell; 2019.',
    sourceType: 'Livro-texto de emergência',
    evidenceLevel: 'Referência terciária especializada',
  },
  {
    id: 'ref-iscaid-uti-2019',
    citationText: 'Weese JS, Blondeau J, Boothe D, et al. ISCAID guidelines for the diagnosis and management of bacterial urinary tract infections in dogs and cats. Vet J. 2019;247:8-25.',
    sourceType: 'Diretriz clínica',
    url: 'https://pubmed.ncbi.nlm.nih.gov/30971357/',
    evidenceLevel: 'Consenso internacional',
  },
];

/**
 * Catálogo interno usado pelos modelos do Receituário.
 *
 * A listagem pública permanece deliberadamente menor, mas os protocolos
 * clínicos ainda referenciam moléculas do catálogo editorial anterior. Os
 * registros recadastrados têm precedência e os legados entram somente quando
 * o slug ainda não possui uma versão nova.
 */
function mergeUnique<T>(preferred: T[], fallback: T[], key: (item: T) => string): T[] {
  const seen = new Set(preferred.map(key));
  return [...preferred, ...fallback.filter((item) => !seen.has(key(item)))];
}

function mergeClinicalMedication(
  current: MedicationRecord,
  legacy: MedicationRecord | undefined,
): MedicationRecord {
  if (!legacy) return current;
  return {
    ...legacy,
    ...current,
    tradeNames: [...new Set([...(current.tradeNames || []), ...(legacy.tradeNames || [])])],
    tags: [...new Set([...(current.tags || []), ...(legacy.tags || [])])],
    indications: [...new Set([...(current.indications || []), ...(legacy.indications || [])])],
    doses: mergeUnique(current.doses || [], legacy.doses || [], (dose) => dose.id),
    presentations: mergeUnique(current.presentations || [], legacy.presentations || [], (presentation) => presentation.id),
    references: mergeUnique(
      current.references || [],
      legacy.references || [],
      (reference) => reference.id || reference.url || reference.citationText || reference.citation || '',
    ),
  };
}

function attachReferencedSharedSources(medication: MedicationRecord): MedicationRecord {
  const referencedIds = new Set(
    (medication.doses || []).flatMap((dose) => dose.referenceIds || []),
  );
  const existingIds = new Set((medication.references || []).map((reference) => reference.id));
  const missingSharedReferences = SHARED_CLINICAL_REFERENCES.filter(
    (reference) => Boolean(reference.id && referencedIds.has(reference.id) && !existingIds.has(reference.id)),
  );
  return missingSharedReferences.length
    ? { ...medication, references: [...(medication.references || []), ...missingSharedReferences] }
    : medication;
}

const legacyBySlug = new Map(legacyClinicalMedicationsSeed.map((medication) => [medication.slug, medication]));
const publicSlugs = new Set(publicMedicationsSeed.map((medication) => medication.slug));

export const clinicalMedicationsSeed: MedicationRecord[] = [
  ...publicMedicationsSeed.map((medication) => mergeClinicalMedication(medication, legacyBySlug.get(medication.slug))),
  ...legacyClinicalMedicationsSeed.filter((medication) => !publicSlugs.has(medication.slug)),
].map(attachReferencedSharedSources);
