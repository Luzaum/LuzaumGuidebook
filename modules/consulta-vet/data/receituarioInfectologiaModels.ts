import type {
  ClinicalMedicationDefinition,
  ClinicalMedicationDose,
  ClinicalRecipeModel,
  DocumentTemplate,
} from '../types/receituario';
import { POTASSIUM_IODIDE_ORAL_PRODUCTS } from './potassiumIodideCommercialProducts.seed';
import { getDefaultClinicalOptionKeys, renderClinicalRecipe } from '../utils/receituarioClinicalModels';

const NOW = '2026-08-02T00:00:00.000Z';

const ITRACONAZOLE_ORAL_PRODUCTS = [
  'itl-cepav',
  'itraconazol-ems-100mg',
  'itraconazol-eurofarma-100mg',
  'itraconazol-geolab-100mg',
  'itraspor-ems-100mg',
  'itralex-ems-100mg',
];

type MedicationOptions = {
  canonicalId?: string | null;
  presentations?: string[];
  linkedDoseIds?: string[];
  doseAlternatives?: ClinicalMedicationDefinition['doseAlternatives'];
  presentationFilter?: ClinicalMedicationDefinition['presentationFilter'];
  alert?: string;
  linkedProtocolKey?: string;
};

function medication(
  key: string,
  name: string,
  dose: ClinicalMedicationDose,
  prescriptionText: string,
  options: MedicationOptions = {},
): ClinicalMedicationDefinition {
  return {
    key,
    name,
    canonicalMedicationId: options.canonicalId ?? null,
    canonicalLookupName: name,
    presentationIds: options.presentations || [],
    linkedDoseIds: options.linkedDoseIds || [],
    doseAlternatives: options.doseAlternatives,
    presentationFilter: options.presentationFilter || 'none',
    dose,
    doseSourceLabel: 'Modelo clínico do ConsultaVet',
    sourceReviewStatus: 'Revisão de fonte pendente',
    prescriptionText,
    internalAlert: options.alert,
    linkedProtocolKey: options.linkedProtocolKey,
  };
}

function template(
  id: string,
  title: string,
  category: string,
  species: 'cão' | 'gato',
  model: ClinicalRecipeModel,
): DocumentTemplate {
  return {
    id,
    title,
    category,
    document_type: 'recipe',
    species,
    body_plain_text: renderClinicalRecipe(model, getDefaultClinicalOptionKeys(model), null),
    structured_defaults: { clinical_model: model },
    medication_ids: Array.from(new Set(model.options.flatMap((option) =>
      (option.medications || []).map((item) => item.canonicalMedicationId).filter((value): value is string => Boolean(value)),
    ))),
    is_global: true,
    is_active: true,
    created_at: NOW,
    updated_at: NOW,
  };
}

const CAT_SPOROTRICHOSIS: ClinicalRecipeModel = {
  schemaVersion: 1,
  careSetting: 'ambulatorial',
  categoryPath: 'Infectologia > Doenças fúngicas',
  selectionMode: 'single',
  selectorLabel: 'Variante do tratamento',
  defaultOptionKey: 'initial',
  options: [
    {
      key: 'initial',
      label: 'Tratamento inicial',
      medications: [medication('itraconazole-cat', 'Itraconazol', {
        min: 10, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 24 horas',
        duration: 'Até a cicatrização completa de todas as lesões e por, no mínimo, mais 30 dias após a cura clínica.',
      }, `1. ITRACONAZOL — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via oral, a cada 24 horas, diariamente e sem interrupções.

Manter o tratamento até a cicatrização completa de todas as lesões e por, no mínimo, mais 30 dias após a cura clínica.`, {
        presentations: ITRACONAZOLE_ORAL_PRODUCTS,
        presentationFilter: 'oral',
      })],
      medicationPrecautions: [
        'Administrar as cápsulas de itraconazol junto com alimento',
        'Evitar omeprazol, antiácidos e antagonistas H2 durante o uso de cápsulas de itraconazol',
        'Realizar avaliação das enzimas hepáticas antes e durante o tratamento',
      ],
    },
    {
      key: 'refractory',
      label: 'Caso refratário, disseminado ou com comprometimento nasal',
      description: 'Mantém o itraconazol e acrescenta iodeto de potássio.',
      medications: [
        medication('itraconazole-cat-associated', 'Itraconazol', {
          min: 10, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 24 horas',
          duration: 'Até a cura clínica e por mais 30 dias.',
        }, `1. ITRACONAZOL — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via oral, a cada 24 horas, diariamente e sem interrupções.

Manter o tratamento até a cura clínica e por mais 30 dias.`, {
          presentations: ITRACONAZOLE_ORAL_PRODUCTS,
          presentationFilter: 'oral',
        }),
        medication('potassium-iodide-cat', 'Iodeto de potássio', {
          min: 2.5, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 24 horas',
          duration: 'Até a cura clínica e por mais 30 dias.', maximumMgKg: 20,
        }, `2. IODETO DE POTÁSSIO — APRESENTAÇÃO A SELECIONAR

Administrar inicialmente A PREENCHER por via oral, a cada 24 horas.

A dose poderá ser aumentada gradualmente em incrementos de 2,5 mg/kg, conforme resposta e tolerância, sem ultrapassar 20 mg/kg a cada 24 horas.

Manter a associação até a cura clínica e por mais 30 dias.`, {
          presentationFilter: 'oral',
          presentations: POTASSIUM_IODIDE_ORAL_PRODUCTS,
        }),
      ],
      medicationPrecautions: [
        'Administrar as cápsulas de itraconazol junto com alimento',
        'Evitar omeprazol, antiácidos e antagonistas H2 durante o uso de cápsulas de itraconazol',
        'Realizar avaliação das enzimas hepáticas antes e durante o tratamento',
        'Durante o uso de iodeto de potássio, observar anorexia, vômitos, diarreia, lacrimejamento, secreção nasal, tosse, tremores, hipertermia e descamação cutânea',
        'Utilizar o iodeto de potássio com cautela em pacientes com doença renal, desidratação, hipercalemia ou que recebam IECA, telmisartana, espironolactona ou suplementos de potássio',
      ],
    },
    {
      key: 'intolerance',
      label: 'Intolerância ao itraconazol',
      medications: [medication('terbinafine-cat-fixed', 'Terbinafina', {
        min: 30, unit: 'mg/animal', basis: 'per_animal', route: 'oral', frequency: 'a cada 24 horas',
        duration: 'Até a cura clínica e por mais 30 dias.',
      }, `1. TERBINAFINA — APRESENTAÇÃO A SELECIONAR

Administrar 30 mg por gato, por via oral, a cada 24 horas.`, {
        presentationFilter: 'oral', alert: 'A dose é de 30 mg por animal, e não 30 mg/kg.',
      })],
    },
  ],
  diseaseRecommendations: [
    'Administrar as medicações diariamente e sem interrupções',
    'Não suspender o tratamento quando as lesões começarem a melhorar',
    'Manter o gato exclusivamente dentro de casa',
    'Utilizar luvas para manipular o animal, limpar lesões ou administrar medicamentos',
    'Evitar contato com secreções, exsudatos e crostas',
    'Evitar arranhaduras e mordeduras',
    'Não espremer nem manipular agressivamente as lesões',
  ],
  medicationPrecautions: [],
  returnSigns: ['Anorexia persistente', 'Vômitos', 'Prostração', 'Icterícia', 'Piora respiratória', 'Aumento das lesões'],
};

const DOG_SPOROTRICHOSIS: ClinicalRecipeModel = {
  schemaVersion: 1,
  careSetting: 'ambulatorial',
  categoryPath: 'Infectologia > Doenças fúngicas',
  selectionMode: 'single',
  selectorLabel: 'Variante do tratamento',
  defaultOptionKey: 'initial',
  options: [
    {
      key: 'initial', label: 'Tratamento inicial', medications: [medication('itraconazole-dog', 'Itraconazol', {
        min: 10, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 24 horas',
        duration: 'Até a resolução completa das lesões e por, no mínimo, mais 30 dias após a cura clínica.',
      }, `1. ITRACONAZOL — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via oral, a cada 24 horas, diariamente e sem interrupções.

Manter o tratamento até a resolução completa das lesões e por, no mínimo, mais 30 dias após a cura clínica.`, {
        presentations: ITRACONAZOLE_ORAL_PRODUCTS,
        presentationFilter: 'oral',
      })],
      medicationPrecautions: [
        'Administrar as cápsulas de itraconazol junto com alimento',
        'Evitar omeprazol, antiácidos e antagonistas H2 durante o uso de cápsulas de itraconazol',
        'Realizar avaliação hepática antes e periodicamente durante o tratamento',
      ],
    },
    {
      key: 'refractory', label: 'Intolerante ou refratário', medications: [medication('terbinafine-dog', 'Terbinafina', {
        min: 30, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 24 horas', duration: 'Período definido na prescrição.',
      }, `1. TERBINAFINA — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via oral, a cada 24 horas.

Utilizar como alternativa ou em associação ao itraconazol, conforme avaliação clínica, pelo período determinado na prescrição.`, { presentationFilter: 'oral' })],
    },
    {
      key: 'potassium-iodide', label: 'Alternativa com iodeto de potássio', medications: [medication('potassium-iodide-dog', 'Iodeto de potássio', {
        min: 40, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 12 horas', duration: 'Até a cura clínica e por mais 30 dias.',
      }, `1. IODETO DE POTÁSSIO — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via oral, a cada 12 horas, junto com alimento.`, {
        presentationFilter: 'oral',
        presentations: POTASSIUM_IODIDE_ORAL_PRODUCTS,
      })],
    },
  ],
  diseaseRecommendations: [
    'Não interromper o tratamento após melhora parcial',
    'Utilizar luvas ao manipular lesões e secreções',
    'Evitar contato das secreções com pele lesionada ou mucosas',
    'Investigar comprometimento osteoarticular, pulmonar ou disseminado quando houver sinais compatíveis',
    'Não utilizar tratamento tópico isoladamente como terapia principal',
  ],
  medicationPrecautions: [],
  returnSigns: ['Anorexia', 'Vômitos', 'Diarreia', 'Prostração', 'Icterícia', 'Piora respiratória', 'Progressão das lesões'],
};

const DISTEMPER: ClinicalRecipeModel = {
  schemaVersion: 1,
  careSetting: 'ambulatorial',
  categoryPath: 'Infectologia > Doenças virais',
  selectionMode: 'multiple',
  selectorLabel: 'Protocolo e condutas complementares',
  defaultOptionKey: 'experimental-adjuvant-protocol',
  options: [
    {
      key: 'experimental-adjuvant-protocol', label: 'Protocolo experimental adjuvante',
      medications: [
        medication('ribavirin-distemper', 'Ribavirina', {
          min: 20, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 24 horas', duration: '21 dias',
        }, `1. RIBAVIRINA

Dose clínica: 20 mg/kg.

Administrar A PREENCHER por via oral, a cada 24 horas, durante 21 dias.`),
        medication('dmso-distemper', 'Dimetilsulfóxido — DMSO', {
          min: 50, unit: 'mg/kg', basis: 'weight', route: 'definir manualmente', frequency: 'a cada 24 horas', duration: '21 dias',
        }, `2. DIMETILSULFÓXIDO — DMSO

Dose clínica: 50 mg/kg.

Administrar A PREENCHER a cada 24 horas, durante 21 dias, associado à ribavirina.`),
      ],
      formula: {
        title: 'FÓRMULA VITAMÍNICA E ANTIOXIDANTE', route: 'oral', frequency: 'a cada 24 horas', durationDays: 30,
        requiresPatientSize: true,
        referenceLabel: 'FMVZ Unesp',
        referenceUrl: 'https://www2.fmvz.unesp.br/etica/protocolo.aspx?chave_email=1d6dde31-53d2-4f6e-8e00-2ed4f1c2eac1',
        components: [
          { key: 'zinc', name: 'Zinco', amount: 2, unit: 'mg/kg' },
          { key: 'vitamin-a', name: 'Vitamina A', amount: 40, unit: 'UI/kg' },
          { key: 'vitamin-b1', name: 'Vitamina B1', amount: 3, unit: 'mg/kg' },
          { key: 'vitamin-b6', name: 'Vitamina B6', amount: 100, unit: 'mg/animal' },
          { key: 'vitamin-b12', name: 'Vitamina B12', amount: 200, unit: 'mcg/animal' },
          { key: 'vitamin-d', name: 'Vitamina D', amount: 30, unit: 'UI/kg' },
          { key: 'vitamin-e', name: 'Vitamina E', amount: 10, unit: 'mg/kg' },
          { key: 'selenium', name: 'Selênio', amount: 50, unit: 'mcg/animal' },
          { key: 'coq10-small', name: 'Coenzima Q10', amount: 15, maxAmount: 20, unit: 'mg/animal-small' },
          { key: 'coq10-large', name: 'Coenzima Q10', amount: 30, unit: 'mg/animal-large' },
        ],
      },
    },
    {
      key: 'nausea', label: 'Controle de náusea ou vômito', optional: true,
      medications: [medication('ondansetron-distemper', 'Ondansetrona', {
        min: 0.5, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 8 a 12 horas', duration: '3 a 5 dias',
      }, `1. ONDANSETRONA — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via oral, a cada 8 a 12 horas, durante 3 a 5 dias.`, {
        canonicalId: 'med-ondansetron',
        presentations: ['vonau-vet-avert', 'vonau-flash-biolab', 'emedron-agener'],
        linkedDoseIds: ['dose-ondansetron-dog-po-caution'],
        presentationFilter: 'oral',
      })],
    },
    {
      key: 'respiratory-infection', label: 'Infecção bacteriana respiratória secundária', optional: true,
      medications: [medication('doxycycline-distemper', 'Doxiciclina', {
        min: 5, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 12 horas', duration: '7 a 10 dias',
      }, `1. DOXICICLINA — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via oral, a cada 12 horas, durante 7 a 10 dias.`, {
        presentations: ['doxiven-dechra', 'doxitrat-agener'], presentationFilter: 'oral',
        doseAlternatives: [
          {
            key: 'doxy-5-q12',
            label: '5 mg/kg a cada 12 horas',
            dose: { min: 5, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 12 horas', duration: '7 a 10 dias' },
            prescriptionText: `1. DOXICICLINA — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via oral, a cada 12 horas, durante 7 a 10 dias.`,
          },
          {
            key: 'doxy-10-q24',
            label: '10 mg/kg a cada 24 horas',
            dose: { min: 10, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 24 horas', duration: '7 a 10 dias' },
            prescriptionText: `1. DOXICICLINA — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via oral, a cada 24 horas, durante 7 a 10 dias.`,
          },
        ],
      })],
      medicationPrecautions: ['Administrar a doxiciclina seguida de alimento ou água; não oferecer comprimidos ou cápsulas secos'],
    },
    {
      key: 'seizures', label: 'Controle de convulsões', optional: true,
      medications: [medication('levetiracetam-immediate', 'Levetiracetam de liberação imediata', {
        min: 20, max: 30, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 8 horas', duration: 'Continuamente até reavaliação.',
      }, `1. LEVETIRACETAM DE LIBERAÇÃO IMEDIATA — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via oral, a cada 8 horas, continuamente até reavaliação.`, { presentationFilter: 'immediate_release' })],
      medicationPrecautions: [
        'Não interromper anticonvulsivantes abruptamente',
        'Utilizar somente apresentações de levetiracetam de liberação imediata neste protocolo',
      ],
    },
  ],
  recipeInformation: [
    'Protocolo de caráter experimental e adjuvante. A eficácia clínica da associação completa ainda não está definitivamente comprovada',
    'O protocolo não substitui fluidoterapia, suporte nutricional, controle gastrointestinal, suporte respiratório, anticonvulsivantes, antimicrobianos quando indicados e demais tratamentos de suporte',
    'Recomenda-se realizar hemograma completo, contagem de reticulócitos, avaliação renal, avaliação hepática e urinálise antes do início do tratamento',
    'Durante o uso da ribavirina, repetir o hemograma após aproximadamente 5 a 7 dias, entre 10 e 14 dias e ao término do protocolo',
    'Reavaliar ou suspender a ribavirina diante de icterícia, urina escura, vômitos persistentes, anorexia, perda de peso ou piora clínica',
    'Utilizar luvas ao manipular a ribavirina. Pessoas gestantes ou tentando engravidar não devem manipular cápsulas abertas, pós, urina ou vômito do paciente',
  ],
  veterinarianNotes: [
    'Antes da emissão, definir manualmente a via de administração, a concentração, a diluição e o volume final do DMSO',
  ],
  diseaseRecommendations: [],
  medicationPrecautions: [],
  returnSigns: [],
};

const PARVO_HOSPITAL: ClinicalRecipeModel = {
  schemaVersion: 1,
  careSetting: 'hospitalar',
  categoryPath: 'Emergência e terapia intensiva > Doenças infecciosas',
  selectionMode: 'multiple',
  selectorLabel: 'Condutas hospitalares',
  hospitalWarning: 'USO HOSPITALAR — NÃO É RECEITA DOMICILIAR',
  options: [
    { key: 'maropitant', label: 'Antiemético principal', optional: true, medications: [medication('maropitant-hospital', 'Maropitant', { min: 1, unit: 'mg/kg', basis: 'weight', route: 'intravenosa ou subcutânea', frequency: 'a cada 24 horas', duration: 'Conforme reavaliação hospitalar.' }, `1. MAROPITANT — APRESENTAÇÃO HOSPITALAR

Administrar A PREENCHER por via intravenosa ou subcutânea, a cada 24 horas.`, { canonicalId: 'med-maropitant', presentations: ['pres-maro-inj-20'], linkedDoseIds: ['dose-maro-dog-sc'], presentationFilter: 'injectable' })] },
    { key: 'ondansetron', label: 'Antiemético adicional', optional: true, medications: [medication('ondansetron-hospital', 'Ondansetrona', { min: 0.3, max: 0.5, unit: 'mg/kg', basis: 'weight', route: 'intravenosa ou subcutânea', frequency: 'a cada 8 horas', duration: 'Conforme reavaliação hospitalar.' }, `1. ONDANSETRONA — APRESENTAÇÃO HOSPITALAR

Administrar A PREENCHER por via intravenosa ou subcutânea, a cada 8 horas.`, { canonicalId: 'med-ondansetron', linkedDoseIds: ['dose-ondansetron-dog-iv-nausea'], presentations: ['emedron-agener'], presentationFilter: 'injectable' })] },
    { key: 'metoclopramide', label: 'Pró-cinético', optional: true, medications: [medication('metoclopramide-cri', 'Metoclopramida', { min: 1, max: 2, unit: 'mg/kg/dia', basis: 'weight_per_day', route: 'infusão intravenosa contínua', frequency: 'por dia', duration: 'Conforme reavaliação hospitalar.' }, `1. METOCLOPRAMIDA — APRESENTAÇÃO HOSPITALAR

Administrar A PREENCHER por infusão intravenosa contínua. Não administrar automaticamente como bolus.`, { presentationFilter: 'injectable' })] },
    { key: 'ampicillin-sulbactam', label: 'Antimicrobiano principal', optional: true, medications: [medication('ampicillin-sulbactam', 'Ampicilina com sulbactam', { min: 30, unit: 'mg/kg', basis: 'weight', route: 'intravenosa', frequency: 'a cada 8 horas', duration: '5 a 7 dias' }, `1. AMPICILINA COM SULBACTAM — APRESENTAÇÃO HOSPITALAR

Administrar A PREENCHER por via intravenosa, a cada 8 horas, durante 5 a 7 dias.`, { canonicalId: 'med-ampicilina-sulbactam', linkedDoseIds: ['dose-amp-sulb-dog-iv-standard'], presentationFilter: 'injectable' })] },
    { key: 'ampicillin', label: 'Antimicrobiano alternativo', optional: true, medications: [medication('ampicillin', 'Ampicilina', { min: 22, unit: 'mg/kg', basis: 'weight', route: 'intravenosa', frequency: 'a cada 8 horas', duration: '5 a 7 dias' }, `1. AMPICILINA — APRESENTAÇÃO HOSPITALAR

Administrar A PREENCHER por via intravenosa, a cada 8 horas, durante 5 a 7 dias.`, { canonicalId: 'med-ampicilina', linkedDoseIds: ['dose-ampicilina-dog-iv-general'], presentationFilter: 'injectable' })] },
    { key: 'enrofloxacin', label: 'Cobertura adicional para sepse ou neutropenia grave', optional: true, medications: [medication('enrofloxacin-sepsis', 'Enrofloxacina', { min: 10, unit: 'mg/kg', basis: 'weight', route: 'intravenosa', frequency: 'a cada 24 horas', duration: '5 a 7 dias' }, `1. ENROFLOXACINA — APRESENTAÇÃO HOSPITALAR

Administrar A PREENCHER por via intravenosa, a cada 24 horas, durante 5 a 7 dias.`, { presentations: ['enrofloxacino-dechra-injetavel'], presentationFilter: 'injectable', alert: 'Incluir somente após seleção clínica explícita para sepse ou neutropenia grave.' })] },
  ],
  diseaseRecommendations: [
    'Instituir fluidoterapia intravenosa conforme perfusão, déficit de desidratação, manutenção e perdas contínuas',
    'Monitorar glicemia, potássio, sódio, albumina, peso corporal e débito urinário',
    'Iniciar nutrição enteral em pequenas quantidades assim que o vômito estiver controlado',
    'Considerar sonda nasoesofágica ou nasogástrica em pacientes que não se alimentem voluntariamente',
    'Não manter jejum prolongado',
    'Realizar ultrassonografia abdominal em caso de vômitos persistentes, dor abdominal ou suspeita de intussuscepção',
    'Manter o paciente em isolamento rigoroso',
  ],
  medicationPrecautions: ['Não utilizar aminoglicosídeos antes da correção da desidratação e da perfusão renal'],
  returnSigns: [],
};

const PARVO_OUTPATIENT: ClinicalRecipeModel = {
  schemaVersion: 1,
  careSetting: 'ambulatorial',
  categoryPath: 'Infectologia > Doenças virais',
  selectionMode: 'fixed',
  hospitalWarning: 'PROTOCOLO AMBULATORIAL — REAVALIAÇÃO CLÍNICA DIÁRIA',
  options: [
    { key: 'maropitant', label: 'Medicação na clínica', medications: [medication('maropitant-outpatient', 'Maropitant', { min: 1, unit: 'mg/kg', basis: 'weight', route: 'subcutânea', frequency: 'a cada 24 horas', duration: 'Com reavaliação clínica diária.' }, `1. MAROPITANT — APRESENTAÇÃO INJETÁVEL

Administrar A PREENCHER por via subcutânea, a cada 24 horas, com reavaliação clínica diária.`, { canonicalId: 'med-maropitant', presentations: ['pres-maro-inj-20'], linkedDoseIds: ['dose-maro-dog-sc'], presentationFilter: 'injectable' })] },
    { key: 'ondansetron', label: 'Uso domiciliar após controle do vômito', medications: [medication('ondansetron-outpatient', 'Ondansetrona', { min: 0.5, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 8 a 12 horas', duration: '3 a 5 dias' }, `2. ONDANSETRONA — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via oral, a cada 8 a 12 horas, durante 3 a 5 dias.`, { canonicalId: 'med-ondansetron', linkedDoseIds: ['dose-ondansetron-dog-po-caution'], presentations: ['vonau-vet-avert', 'vonau-flash-biolab', 'emedron-agener'], presentationFilter: 'oral' })] },
  ],
  diseaseRecommendations: [
    'Realizar reavaliação veterinária diária até estabilização',
    'Oferecer dieta altamente digestível em pequenas porções frequentes',
    'Não forçar alimentação enquanto houver náusea ou vômito',
    'Manter água fresca disponível',
    'Manter isolamento rigoroso de outros cães',
    'Remover toda a matéria orgânica antes da desinfecção',
    'Desinfetar superfícies compatíveis com hipoclorito de sódio diluído aproximadamente em 1:30, mantendo contato por pelo menos 10 minutos',
    'Não utilizar antidiarreicos que reduzam a motilidade intestinal',
    'Não utilizar oseltamivir como tratamento de rotina',
  ],
  medicationPrecautions: ['O tratamento ambulatorial exige seleção criteriosa do paciente e reavaliação frequente'],
  returnSigns: ['Prostração intensa', 'Vômitos persistentes', 'Fraqueza', 'Palidez', 'Extremidades frias', 'Dor abdominal', 'Recusa completa de alimento e água'],
};

const EHRLICHIA_ANAPLASMA: ClinicalRecipeModel = {
  schemaVersion: 1,
  careSetting: 'ambulatorial',
  categoryPath: 'Infectologia > Doenças transmitidas por vetores',
  selectionMode: 'single',
  selectorLabel: 'Indicação por dose',
  defaultOptionKey: 'doxy-10',
  options: [
    { key: 'doxy-10', label: '10 mg/kg a cada 24 horas', medications: [medication('doxycycline-ehrlichia-10', 'Doxiciclina', { min: 10, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 24 horas', duration: '28 dias' }, `1. DOXICICLINA — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via oral, a cada 24 horas, durante 28 dias.`, { presentations: ['doxiven-dechra', 'doxitrat-agener'], presentationFilter: 'oral' })] },
    { key: 'doxy-5', label: '5 mg/kg a cada 12 horas', medications: [medication('doxycycline-ehrlichia-5', 'Doxiciclina', { min: 5, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 12 horas', duration: '28 dias' }, `1. DOXICICLINA — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via oral, a cada 12 horas, durante 28 dias.`, { presentations: ['doxiven-dechra', 'doxitrat-agener'], presentationFilter: 'oral' })] },
  ],
  diseaseRecommendations: [
    'Manter controle rigoroso e contínuo de carrapatos',
    'Repetir hemograma e contagem de plaquetas em 7 a 14 dias',
    'Reavaliar o hemograma ao final dos 28 dias',
    'Se não houver melhora clínica e hematológica durante a primeira semana, reconsiderar o diagnóstico e investigar coinfecções',
    'Não utilizar imidocarb rotineiramente para erliquiose isolada',
    'Não administrar corticosteroides automaticamente; reservar para complicações imunomediadas documentadas',
  ],
  medicationPrecautions: [
    'Administrar a doxiciclina junto com pequena quantidade de alimento',
    'Oferecer água ou alimento após a administração',
    'Não administrar simultaneamente com ferro, cálcio, magnésio, antiácidos ou sucralfato',
  ],
  returnSigns: ['Sangramento', 'Palidez', 'Fraqueza', 'Dificuldade respiratória', 'Febre persistente', 'Piora clínica'],
};

export const RECEITUARIO_INFECTOLOGIA_MODELS: DocumentTemplate[] = [
  template('seed-infectologia-esporotricose-gatos', 'Esporotricose — Gatos', 'Infectologia', 'gato', CAT_SPOROTRICHOSIS),
  template('seed-infectologia-esporotricose-caes', 'Esporotricose — Cães', 'Infectologia', 'cão', DOG_SPOROTRICHOSIS),
  template('seed-infectologia-cinomose-caes', 'Cinomose — Cães', 'Infectologia', 'cão', DISTEMPER),
  template('seed-infectologia-erliquiose-anaplasmose', 'Erliquiose/Anaplasmose — Cães', 'Infectologia', 'cão', EHRLICHIA_ANAPLASMA),
];
