import type { MedicationRecord } from '../types/medication';

function medicationListCard(
  partial: Pick<
    MedicationRecord,
    | 'id'
    | 'slug'
    | 'title'
    | 'activeIngredient'
    | 'tradeNames'
    | 'pharmacologicClass'
    | 'species'
    | 'category'
    | 'tags'
    | 'indications'
  >
): MedicationRecord {
  return {
    ...partial,
    mechanismOfAction: '',
    contraindications: [],
    cautions: [],
    adverseEffects: [],
    interactions: [],
    routes: [],
    doses: [],
    presentations: [],
    clinicalNotesRichText: '',
    relatedDiseaseSlugs: [],
  };
}

export const PUBLIC_HEPATOPROTECTOR_MEDICATION_CARD_STUBS: MedicationRecord[] = [
  medicationListCard({
    id: 'med-same-sadenosilmetionina',
    slug: 'same-sadenosilmetionina',
    title: 'S-adenosil-L-metionina (SAMe)',
    activeIngredient: 'S-adenosil-L-metionina',
    tradeNames: ['Nutri SAMe 100 / 200', 'Sanus 100 mg / 200 mg', 'HEP SAMe Pet Tabs', 'Denamarin®'],
    pharmacologicClass: 'Precursor de glutationa; citoprotetor hepático adjuvante',
    species: ['dog', 'cat'],
    category: 'gastroenterologia',
    tags: ['SAMe', 'Hepatobiliar', 'Antioxidante', 'Glutationa', 'Nutracêutico'],
    indications: [
      'Suporte antioxidante adjuvante em hepatopatias — 20 mg/kg/dia em jejum (cães e gatos).',
      'Adjuvante em hepatotoxicidade por lomustina (evidência Skorupski 2011).',
    ],
  }),
  medicationListCard({
    id: 'med-suplementos-hepaticos-silimarina',
    slug: 'suplementos-hepaticos-silimarina',
    title: 'Silimarina, silibina e suplementos hepáticos',
    activeIngredient: 'Silimarina / silibina / fitossomas',
    tradeNames: ['Hepvet', 'Hepguard', 'Prohep', 'Denamarin®', 'Silimarina isolada'],
    pharmacologicClass: 'Antioxidante hepatobiliar; extrato vs silibina ≠ doses intercambiáveis',
    species: ['dog', 'cat'],
    category: 'gastroenterologia',
    tags: ['Silimarina', 'Silibina', 'Cardo-mariano', 'Fitossoma', 'Nutracêutico'],
    indications: [
      'Adjuvante antioxidante — doses distintas para extrato, silibina e silibina-fosfatidilcolina.',
      'Não converter mg entre formulações automaticamente.',
    ],
  }),
  medicationListCard({
    id: 'med-acido-ursodesoxicolico',
    slug: 'acido-ursodesoxicolico',
    title: 'Ácido ursodesoxicolico (UDCA / Ursacol)',
    activeIngredient: 'Ácido ursodesoxicolico',
    tradeNames: ['Ursacol 50 mg', 'Ursacol 150 mg', 'Ursacol 300 mg'],
    pharmacologicClass: 'Ácido biliar hidrofilico; coleretico/citoprotetor biliar',
    species: ['dog', 'cat'],
    category: 'gastroenterologia',
    tags: ['UDCA', 'Ursodiol', 'Colestase', 'Vesicula biliar', 'Extra-label'],
    indications: ['Colestase e hepatopatias biliares selecionadas sem obstrução biliar completa.'],
  }),
  medicationListCard({
    id: 'med-n-acetilcisteina',
    slug: 'n-acetilcisteina',
    title: 'N-acetilcisteina (NAC / Fluimucil injetavel)',
    activeIngredient: 'Acetilcisteina',
    tradeNames: ['Fluimucil injetavel 100 mg/mL'],
    pharmacologicClass: 'Precursor de glutationa; antidoto em intoxicacao por paracetamol',
    species: ['dog', 'cat'],
    category: 'emergencia',
    tags: ['NAC', 'Acetilcisteina', 'Fluimucil', 'Paracetamol', 'Intoxicacao', 'Hospitalar'],
    indications: ['Intoxicacao por paracetamol e hepatotoxicidade aguda selecionada em ambiente hospitalar.'],
  }),
];
