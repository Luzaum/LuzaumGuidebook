import type { CommercialMedicationProduct } from '../types/commercialMedication';
import {
  MILTEFORAN_CONTROL_NOTICE,
  MILTEFORAN_LABEL_DOSE,
  MILTEFORAN_LEAFLET_URL,
  MILTEFORAN_PRODUCT_URL,
} from './seed/medications.miltefosina.seed';

export const milteforanCommercialProductSeed: CommercialMedicationProduct[] = [
  {
    id: 'milteforan-virbac',
    slug: 'milteforan',
    name: 'Milteforan® 20 mg/mL (Miltefosina)',
    manufacturer: 'Virbac Brasil',
    commercialClass: 'infectious',
    commercialSubclass: 'infectious_leishmaniasis',
    commercialSubclasses: ['infectious_leishmaniasis'],
    productPageUrl: MILTEFORAN_PRODUCT_URL,
    labelUrl: MILTEFORAN_LEAFLET_URL,
    species: ['dog'],
    presentations: ['Solução oral 20 mg/mL — frasco de 30 mL', 'Solução oral 20 mg/mL — frasco de 60 mL', 'Solução oral 20 mg/mL — frasco de 90 mL'],
    activeComponents: ['Miltefosina'],
    searchAliases: ['milteforan', 'miltefosina', 'miltefosine', 'leishmanicida', 'leishmaniose', 'calazar', 'virbac', 'lvc'],
    labelCompositionSummary: 'Cada mL contém 20 mg de miltefosina (2% m/v).',
    labelDirections: MILTEFORAN_LABEL_DOSE,
    dosageGuidance: {
      labelDose: MILTEFORAN_LABEL_DOSE,
      notes: [
        'Pesar o cão e medir com a seringa dosadora. O volume total do ciclo é 2,8 mL/kg.',
        'Exemplo para 12 kg: 24 mg por dose correspondem a 1,2 mL por dia. Para completar 28 dias são necessários 33,6 mL. Calcule o volume total antes de definir a apresentação na NRV.',
        'Aplique a dose em uma porção pequena da refeição. Confira se o cão consumiu toda a porção antes de oferecer o restante. Em caso de vômito ou dose perdida, consulte o prescritor antes de repetir.',
        'Conservar de 15 a 30 °C, ao abrigo da luz solar, e usar em até 28 dias após a abertura.',
        'Evitar agitar o frasco para não formar espuma.',
      ],
    },
    plumbsContext: 'Plumb’s Veterinary Drug Handbook (10ª ed., pp. 887–888) e BSAVA Small Animal Formulary (10ª ed., pp. 268–269) descrevem o ciclo canino de 28 dias e a administração com alimento. A carga parasitária pode diminuir, com persistência da infecção.',
    clinicalUse: 'Tratamento registrado da leishmaniose visceral canina. Confirme a doença e o estágio antes de prescrever. Se houver doença renal, hepática ou cardíaca, faça avaliação individual de risco e benefício. O medicamento pode reduzir a carga parasitária e melhorar sinais, com persistência possível da infecção e da transmissão aos flebotomíneos. Mantenha proteção vetorial e seguimento.',
    reassessment: 'Registre peso, apetite, lesões, hemograma, função renal e hepática, urinálise e UPC antes da primeira dose. Durante o ciclo, acompanhe a ingestão do medicamento, vômitos, diarreia e hidratação. Reavalie no fim do ciclo e mais cedo se houver instabilidade ou intolerância. Programe retornos conforme o estágio e a resposta.',
    prescriptionExample: 'Exemplo de posologia para a NRV oficial, cão de 10 kg. Administrar 1 mL de Milteforan® 20 mg/mL por via oral a cada 24 horas, com alimento, durante 28 dias. Volume necessário: 28 mL (1 frasco de 30 mL).',
    safetyAlert: MILTEFORAN_CONTROL_NOTICE + ' Contraindicado em hipersensibilidade, prenhez, lactação e animais destinados à reprodução. Usar luvas e óculos de proteção. Gestantes e pessoas tentando engravidar ou com suspeita de gravidez devem delegar a administração.',
    price: {
      averageLabel: 'R$ 1.057,34 (30 mL)',
      rangeLabel: 'Preço de referência do frasco de 30 mL',
      sourceDate: '2026-11-06',
      notes: 'Valor publicado pela Virbac Brasil, sujeito a alteração.',
    },
    evidenceLevel: 'Bula brasileira, Plumb’s e BSAVA, consensos WAVD 2025 e CLWG 2026, e estudos clínicos.',
    isControlled: true,
    catalogMedicationId: 'editorial:miltefosina',
  },
];
