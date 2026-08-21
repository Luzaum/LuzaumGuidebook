import type { CommercialMedicationProduct } from '../types/commercialMedication';

export const convlessCommercialProductSeed: CommercialMedicationProduct[] = [
  {
    id: 'convless-agener',
    slug: 'convless-agener',
    name: 'Convless®',
    manufacturer: 'Agener União',
    commercialClass: 'neurologic',
    commercialSubclass: 'neuro_anticonvulsant',
    species: ['dog'],
    presentations: ['Solução oral palatável 20 mg/mL (2%) — frasco 60 mL com seringa dosadora'],
    activeComponents: ['fenobarbital 20 mg/mL'],
    labelCompositionSummary: 'Cada 1 mL contém 20 mg de fenobarbital. Solução oral veterinária palatável, pronta para uso e indicada exclusivamente para cães.',
    labelDirections: 'Cães: 1,3 a 6 mg/kg por via oral a cada 12 horas, ou a critério do médico-veterinário. Volume por dose (mL) = peso (kg) × dose (mg/kg) ÷ 20.',
    dosageGuidance: {
      labelDose: 'Dose de bula — cães: 1,3 a 6 mg/kg VO q12h. Convless® 20 mg/mL: 0,065 a 0,30 mL/kg por dose.',
      plumbs: {
        dog: [{
          title: 'Dose inicial usual do fenobarbital na literatura',
          dose: '2,5 a 3 mg/kg VO q12h',
          note: 'Titular conforme controle das crises, efeitos adversos e concentração sérica; não confundir esta faixa inicial com toda a faixa de bula do produto.',
        }],
      },
      notes: ['Volume por dose (mL) = peso × dose ÷ 20. Ex.: 10 kg a 2,5 mg/kg = 1,25 mL por dose.'],
    },
    plumbsContext: 'Fenobarbital é anticonvulsivante de primeira linha em cães e gatos. Para cães, uma dose inicial usual é 2,5–3 mg/kg VO q12h, com monitorização sérica aproximadamente 10–14 dias após início/ajuste e novamente em cerca de 6 semanas por autoindução. Convless®, porém, tem indicação comercial somente para cães.',
    clinicalUse: 'Formulação veterinária líquida padronizada para controle crônico de crises epilépticas em cães, especialmente quando a apresentação oral líquida facilita a administração e o ajuste de dose.',
    reassessment: 'Avaliar concentração sérica e tolerância em aproximadamente 10–14 dias após início ou ajuste; repetir por volta de 6 semanas e, quando estável, monitorar concentração, hemograma e bioquímica aproximadamente a cada 6 meses.',
    prescriptionExample: 'CONVLESS® 20 mg/mL — solução oral. Administrar ___ mL por via oral a cada 12 horas, continuamente. Não interromper abruptamente. Agitar antes de usar e medir com a seringa dosadora. Após aberto, utilizar em até 60 dias.',
    safetyAlert: 'MEDICAMENTO DE CONTROLE ESPECIAL. Uso exclusivamente canino conforme a indicação comercial atual. Não extrapolar para gatos. Contraindicado em hepatopatia grave/hipersensibilidade a barbitúricos; cautela em doença renal, respiratória, hipovolemia, anemia, cardiopatia e hipofunção adrenal. Não suspender abruptamente. Confirmar regras regulatórias vigentes.',
    price: {
      averageLabel: 'Preço não cadastrado',
      rangeLabel: 'Produto recém-lançado; consultar canal veterinário habilitado',
      sourceDate: '2026-08-19',
    },
    evidenceLevel: 'Faixa de dose e apresentação conforme fabricante; farmacologia e monitorização conforme literatura veterinária. Sem afirmação de superioridade clínica.',
    productPageUrl: 'https://agener.com.br/produtos/pequenos-animais/suplementos/convless/',
    labelUrl: 'https://agener.com.br/produtos/pequenos-animais/suplementos/convless/',
    isControlled: true,
    catalogMedicationId: 'editorial:fenobarbital',
  },
];
