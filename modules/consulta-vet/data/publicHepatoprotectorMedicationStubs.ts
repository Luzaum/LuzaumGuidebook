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
    title: 'SAMe / S-adenosilmetionina',
    activeIngredient: 'S-adenosil-L-metionina',
    tradeNames: ['Nutri SAMe 100 / 200', 'Sanus 100 mg / 200 mg', 'HEP SAMe Pet Tabs'],
    pharmacologicClass: 'Hepatoprotetor nutraceutico; precursor de glutationa',
    species: ['dog', 'cat'],
    category: 'gastroenterologia',
    tags: ['SAMe', 'Hepatobiliar', 'Antioxidante', 'Glutationa', 'Nutraceutico'],
    indications: ['Suporte antioxidante adjuvante em hepatopatias e colestase quando ha plano diagnostico e tratamento da causa.'],
  }),
  medicationListCard({
    id: 'med-suplementos-hepaticos-silimarina',
    slug: 'suplementos-hepaticos-silimarina',
    title: 'Silimarina / suplementos hepaticos mistos',
    activeIngredient: 'Silimarina, cardo-mariano, colina, aminoacidos, vitaminas e outros nutraceuticos hepaticos',
    tradeNames: ['Hepvet', 'Hepguard', 'Prohep Cat', 'Prohep Dog Pasta', 'Hep Vita', 'Vitasil Hep', 'Trihepat'],
    pharmacologicClass: 'Nutraceuticos hepaticos mistos',
    species: ['dog', 'cat'],
    category: 'gastroenterologia',
    tags: ['Silimarina', 'Cardo-mariano', 'Hepatobiliar', 'Colina', 'Alcachofra', 'Nutraceutico'],
    indications: ['Suporte nutricional adjuvante em hepatopatias, convalescenca e uso de farmacos potencialmente hepatotoxicos.'],
  }),
  medicationListCard({
    id: 'med-acido-ursodesoxicolico',
    slug: 'acido-ursodesoxicolico',
    title: 'Acido ursodesoxicolico (UDCA / Ursacol)',
    activeIngredient: 'Acido ursodesoxicolico',
    tradeNames: ['Ursacol 50 mg', 'Ursacol 150 mg', 'Ursacol 300 mg'],
    pharmacologicClass: 'Acido biliar hidrofilico; coleretico/citoprotetor biliar',
    species: ['dog', 'cat'],
    category: 'gastroenterologia',
    tags: ['UDCA', 'Ursodiol', 'Colestase', 'Vesicula biliar', 'Extra-label'],
    indications: ['Colestase e hepatopatias biliares selecionadas sem obstrucao biliar completa.'],
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
